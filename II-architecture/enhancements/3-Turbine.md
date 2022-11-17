Given that the Solana consensus layer has no dependencies on peer-to-peer messages, Solana is able to optimize how blocks are transmitted through the network independently of consensus. **Turbine**, Solana’s block-propagation technique, borrows heavily from BitTorrent. As a block is streamed, it is broken up into small packets along with erasure codes, and then fanned out across a large set of random peers. With a fan-out of 200, the second layer of the network can cover 40,000 validators. Thus, validators are able to propagate blocks with a log200(n) impact to finality. For all practical purposes, if each connection is 100 ms, replication can be achieved in 400 ms, and finality in 500 ms for a 40,000 node network.

The fanout mechanism must be resistant to faults. As such, validators encode data using Reed-Solomon erasure codes, providing a degree of fault tolerance.

## Details

One of the challenges to high-performance blockchains is how the network propagates large amounts of data to a large number of peers. Let’s consider, for example, a network of 20,000 validators. The leader needs to transmit a 128 MB block (about 500,000 transactions @ 250 bytes / transaction) to all 20,000 validators. The naive implementation would require the leader to have a unique connection to each validator and transmit the full 128 MB 20,000 times. There simply isn’t enough bandwidth to accommodate that many connections.

Our solution to this problem, Turbine, borrows heavily from BitTorrent — although a few major technical details differentiate the two. Turbine is optimized for streaming, and transmits data using UDP only, and implements a random path per packet through the network as leaders (block producers) stream their data. The leader breaks the block into packets up to 64KB in size. For a 128MB block, the leader produces 2,000 64KB packets, and transmits each packet to a different validator. 

![Image](https://miro.medium.com/max/1100/1*IuaWcY17zIdSTB-g8Sd4TA.jpeg)

In turn, each validator retransmits the packet to a group of peers that we call a neighborhood. You can visualize the network as a tree of neighborhoods, allowing the network to grow well beyond 1,000 validators:

![Image](https://miro.medium.com/max/1100/1*pTDMBLbXEKQxfMmSgLEfHg.jpeg)

Each neighborhood is responsible for transmitting a portion of its data to each neighborhood below it.

![Image](https://miro.medium.com/max/1100/1*vZYagCC7O6SJJcSgGuBfrQ.jpeg)

If each neighborhood is comprised of 200 nodes, a 3-level network, starting with a single leader at the root, can reach 40,000 validators in 2 hops — or roughly 200 milliseconds assuming each network link is 100ms on average.

The challenge we face with this technique is security. For example: adversarial nodes can choose not to rebroadcast data, or to rebroadcast incorrect data. To handle adversarial nodes, the leader generates Reed-Solomon [erasure codes](http://smahesh.com/blog/2012/07/01/dummies-guide-to-erasure-coding/). Erasure codes allow each validator to reconstruct the entire block without receiving all the packets.

![Image](https://miro.medium.com/max/1100/1*lK2hV3_GFtiUlwA0mscdRA.jpeg)

If the leader transmits 33% of the block’s packets as erasure codes, then the network can drop any 33% of the packets without losing the block. Leaders can even adjust this number dynamically based on network conditions. These determinations are made by the leaders’ observed packet drop rate from the previous blocks.

Not all validators are created equal. The most important validators are those with the most stake. We therefore prioritize propagation accordingly. A stake-weighted selection algorithm constructs the tree such that the higher staked validators are at neighborhoods closer to the leader. Each validator independently computes the same tree. While erasure codes can repair failures, it’s possible for adversarial nodes to position themselves in the tree such that they can induce a failure higher than their combined stake size, especially when combined with a denial of service attacks.

How do we deal with this kind of [eclipse attack](https://www.radixdlt.com/post/what-is-an-eclipse-attack/)? Our fanout algorithm generates a stake-weighted tree for every packet using a random source based on the digital signature of the packet. Since each packet takes a different path, and the path is not known in advance, a neighborhood-level eclipse attack would require nearly full control of the network.

With one level, this technique scales somewhere between 200 and 1,000 nodes. Network cards that support 1 Gbps can transmit one million packets per second. A single validator can send packets of up to 64 KB to 1,000 machines within one second if the network connection allows it.