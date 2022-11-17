
As a result of these 8 major innovations, the Solana network is a lightning fast distributed ledger technology that will _always_ keep going. It is not slowed down by consensus. Moreover, the system optimizes data propagation, leverages parallel GPUs massively for transaction processing, and does not weigh down validators with massive stored chain history.

Solana’s software is designed to get out of the way and let the hardware operate at capacity. As such, Solana scales naturally with bandwidth, SSDs, and GPU cores. It is the only blockchain that does, and is how Solana achieves 50,000 TPS on a network of 200 physically distinct nodes around the world.

For deeper explanation of the 8 innovations that make the Solana network possible, please refer to the blog posts below:

-   [**Proof of History (POH)**](https://medium.com/solana-labs/proof-of-history-a-clock-for-blockchain-cf47a61a9274?source=post_page---------------------------) — a clock before consensus;
-   [**Tower BFT**](https://medium.com/solana-labs/tower-bft-solanas-high-performance-implementation-of-pbft-464725911e79?source=post_page---------------------------) — a PoH-optimized version of PBFT;
-   [**Turbine**](https://medium.com/solana-labs/turbine-solanas-block-propagation-protocol-solves-the-scalability-trilemma-2ddba46a51db?source=post_page---------------------------) — a block propagation protocol;
-   [**Gulf Stream**](https://medium.com/solana-labs/gulf-stream-solanas-mempool-less-transaction-forwarding-protocol-d342e72186ad?source=post_page---------------------------) — Mempool-less transaction forwarding protocol;
-   [**Sealevel**](https://medium.com/solana-labs/sealevel-parallel-processing-thousands-of-smart-contracts-d814b378192) — Parallel smart contracts run-time;
-   [**Cloudbreak**](https://medium.com/solana-labs/cloudbreak-solanas-horizontally-scaled-state-architecture-9a86679dcbb1?source=post_page---------------------------) — Horizontally-Scaled Accounts Database; and
-   [**Archivers**](https://solana.com/archivers/) — Distributed ledger store

# **State of the Network**

Solana’s testnet is live today. You can see it at [testnet.solana.com](https://testnet.solana.com/). For cost purposes, we are only running a handful of nodes. However, we have spun it up on many instances to over 200 physically distinct nodes (not on shared hardware) across 23 data centers on AWS, GCE, and Azure for benchmarking.

The runtime is functioning today, and developers can deploy code on the testnow now. Developers can build smart contracts in C today, and we are aggressively working on the Rust toolchain. Rust will be the flagship language for Solana smart contract development. The [Rust toolchain is publicly available](https://github.com/solana-labs/solana-web3.js) as part of the Solana Javascript SDK, and we are further iterating on the Software Development Kit.

Solana will soon launch a public beta incentivizing validators to run nodes via [Tour de SOL](https://medium.com/solana-labs/solana-announces-tour-de-sol-an-incentivized-testnet-event-b26372a58a51) — analogous to Cosmos’ Game of Stakes — that challenges the public at large to test the limits of the Solana network while earning tokens.
