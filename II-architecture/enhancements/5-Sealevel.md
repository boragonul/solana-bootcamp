
To take advantage of Solana’s high-performance network, we built **Sealevel**, a hyper parallelized transaction processing engine designed to scale horizontally across GPUs and SSDs. Note that all other blockchains are single-threaded computers. Solana is the only chain to support parallel transaction execution (not just signature verification) in a single shard.

The solution to this problem borrows heavily from an operating system driver technique called scatter-gather. Transactions specify up front what state they will read and write while executing. The runtime is able to find all the non-overlapping state transition functions occurring in a block and execute them in parallel — what is called parallel execution — while optimizing how read and writes to the state are scheduled across an array of RAID 0 SSDs.

Although Sealevel itself is a VM that schedules transactions, Sealevel doesn’t actually execute transactions in the VM. Instead, Sealevel hands off transactions to be executed on hardware natively using an industry-proven bytecode called the Berkeley Packet Filter (BPF), which is designed for high-performance packet filters. This bytecode has been optimized since the early 90s, and has been deployed in production in millions of switches worldwide to handle 60 million packets per second on a 40-gigabit network in a single switch.

Every time Nvidia doubles the number of SIMD lanes available, our network will double in computational capacity. Virtually all other blockchains, which are single-threaded computers by design, can never scale in this way.

Using LLVM, the same compiler that targets WASM, we provide a great set of tools for developers to write high-performance smart contracts in C/C++ and Rust that execute contracts on GPUs. Although Solana isn’t using WASM, developers can re-compile C and Rust code written for WASM compilers in the Solana compiler with minimal changes. Thus, developers can easily migrate their applications from other major WASM chains like Dfinity, EOS, Polkadot and Ethereum 2.0.

Ethereum has had a history of bugs resulting from the software architecture. Two relevant examples:

-   Multiple [parity hacks](https://blog.zeppelin.solutions/on-the-parity-wallet-multisig-hack-405a8c12e8f7) through [Delegate Call](https://github.com/paritytech/parity-ethereum/issues/6995)
-   The [DAO rentrancy bug](https://medium.com/@MyPaoG/explaining-the-dao-exploit-for-beginners-in-solidity-80ee84f0d470) through ‘call’

It’s definitely possible to write safe Solidity code, just like it’s possible to write complex software in C without memory protection. But as long as unsafe behavior is easy to add and hard to detect, it becomes geometrically harder to verify the behavior of complex software. Both Solana and the Libra team recognized this problem early on and developed architectures that maintain a strict separation of state between different modules.

The Move language introduced Resources and Scripts as high level concepts. Both fit naturally into the Solana Sealevel Runtime, and how we have been designing our native programs. Our goal is to support Move as a first level language, such that Resources behave as native Solana programs, and can be developed and composed through Move, or through our own native Rust ABI without any compromises to performance or security.