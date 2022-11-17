---

transition: slide
---

<grid align="left">

#### Introduction to Solana Architecture <!-- element style="color: cyan" -->


Bora Gönül ©2022  
me@boragonul.com

Most of the credits should go to;

- https://www.chain.link
- https://www.solana.com 

Thanks for the content !<!-- element style="color: yellow" -->

</grid>

---

<grid align="left">
#### High-Level Overview (Definition) <!-- element style="color: cyan" -->

- Open source,  `permissionless` blockchain
- Unit of Account: `SOL` and `Lamports`. 
- `1 Lamport=0.000000001 SOL`
- Approximately 1500 nodes and capable of 50k TPS

https://solanabeach.io/validators <!-- element style="color: yellow" --> 

---
<grid align="left">
#### 8 important enhancements <!-- element style="color: cyan" -->

1) `Proof of History (POH)`: a clock before consensus
2) `Tower BFT`: a POH-optimized version of PBFT
3) `Turbine`: a block propogation protocol
4) `Gulf Stream`: Mempool-less txn forwarding protocol
5) `Sealevel`: Parallel smart contracts run-time
6) `Pipelining`: a Transaction Processing Unit for validation optimization
7) `Cloudbreak`: Horizontally-Scaled Accounts Db
8) `Archivers`: Distributed ledger store

Let's explain each of them (quickly) <!-- element style="color: yellow" -->
</grid>

---
<grid align="left">
1-Proof Of History <!-- element style="color: cyan" -->

<iframe width="675" height="389" src="https://www.youtube.com/embed/rywOYfGu4EA" title="Proof of History Explainer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</grid>

---
<grid align="left">
2-Tower Byzantine Fault Tolerance <!--element style="color: cyan" -->

Imagine that you are on an island, and a bottle floats by with a thumb drive. Inside the drive is a Solana ledger. If you just look at the ledger itself, you will see that each node can compute the number of validators present, the state of each validator, and critically, the timeout each validator has committed to any block in the network. Based on the data structure alone, without any peer-to-peer messages, a validator can make the decision to vote, and the network can come to consensus.

[Solana Proof of Stake + Proof of History](https://www.shinobi-systems.com/primer.html) <!--element style="color: yellow" -->
</grid>

---
<grid align="left">
3-Turbine <!--element style="color: cyan" -->

Given that the Solana consensus layer has no dependencies on peer-to-peer messages, Solana is able to optimize how blocks are transmitted through the network independently of consensus. **Turbine**, Solana’s block-propagation technique, borrows heavily from BitTorrent. As a block is streamed, it is broken up into small packets along with erasure codes, and then fanned out across a large set of random peers.
</grid>

---
<grid align="left">
4-Gulf Stream <!--element style="color: cyan"-->

In a high performance network, mempool management is a new class of problem that other chains don’t really have to address. **Gulf Stream** functions by pushing transaction caching and forwarding to the edge of the network.
</grid>

---
<grid align="left">
5-Sealevel <!--element style="color: cyan"-->

To take advantage of Solana’s high-performance network, we built **Sealevel**, a hyper parallelized transaction processing engine designed to scale horizontally across GPUs and SSDs. Note that all other blockchains are single-threaded computers. Solana is the only chain to support parallel transaction execution (not just signature verification) in a single shard.

</grid>

---
<grid align="left">
6-Pipelining <!--element style="color: cyan"-->

The process of transaction validation on the Solana network makes extensive use of an optimization common in CPU design called pipelining. Pipelining is appropriate process when there’s a stream of input data that needs to be processed by a sequence of steps and there’s different hardware responsible for each.

Transaction Processing Unit for validation optimization <!--element style="color: yellow" -->

</grid>

---
<grid align="left">
7-Cloudbreak <!--element style="color: cyan" -->

It is not enough to simply scale computation. Memory that is used to keep track of accounts quickly becomes a bottleneck in both size and access speeds. For example, it’s generally understood that LevelDB, the local database engine that many modern chains use, cannot support more than about 5,000 TPS.


Horizontally Scaled Memory <!--element style="color: cyan" -->

</grid>

---
<grid align="left">
8-Archivers <!--element style="color: cyan" -->

At 1GBPS, a blockchain network will generate 4 petabytes of data a year for the ledger. Storing the data would quickly become the primary centralization vector, defeating the very purpose of blockchain implementation in the process.

</grid>

---
<grid align="left">
#### Summary <!--element style="color: cyan" -->

As a result of these 8 major innovations, the Solana network is a lightning fast distributed ledger technology that will _always_ keep going. It is not slowed down by consensus. Moreover, the system optimizes data propagation, leverages parallel GPUs massively for transaction processing, and does not weigh down validators with massive stored chain history.

</grid>

---
<grid align="left">
#### High-Level (Network) <!--element style="color: cyan" -->

- Comprimised of multiplel clusters
	1) `Devnet`: for development
	2) `Testnet`: similar to mainnet in terms of infrastructure, ledger and programs
	3) `Mainnet`: where `Money` is :)
	4) `Localnet`: local full featured cluster :)

</grid>

---
<grid align="left">
#### High-Level (Overview) <!--element style="color: cyan" -->

- Uses a BFT, POS consensus mechanism and `Proof of History` to maintain state
- Doesn't have a mempool. Uses `Gulf-Stream` to forward transactions to future `leaders`
- Clients or `off-chain`, `dApps` can communicate with `on-chain` programs via the JSON RPC
</grid>

---
<grid align="left">
1-Sending txns to cluster <!--element style="color: cyan" -->

- Clients send txns to any validator (ends up to designated leader)
- Leader bundles txns, timestamps, creates an entry, pushes to clusters data plane
- Txns are validated by validator nodes, appending to the ledger

</grid>

---
<grid align="left">
2-Consensus Mechanism <!--element style="color: cyan" -->

- Blocks are broken up into smaller sets of txns called entries
- Node generates the block is called leader, others validators
- PoH used to determine the order of incoming txns (like puzzle solving)
- Tower BFT uses PoH as a `clock` before consensus to reduce communication overhead and latency
</grid>

---
<grid align="left">
#### Finally <!--element style="color: cyan" -->

Let's move on to `Programming Model`
</grid>