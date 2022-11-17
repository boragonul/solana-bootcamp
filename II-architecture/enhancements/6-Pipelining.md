The process of transaction validation on the Solana network makes extensive use of an optimization common in CPU design called pipelining. Pipelining is appropriate process when there’s a stream of input data that needs to be processed by a sequence of steps and there’s different hardware responsible for each.

On the Solana network, the pipeline mechanism — Transaction Processing Unit — progresses through Data Fetching at the kernel level, Signature Verification at the GPU level, Banking at the CPU level, and Writing at the kernel space. By the time the TPU starts to send blocks out to the validators, it’s already fetched in the next set of packets, verified their signatures, and begun crediting tokens.

![Image](https://miro.medium.com/max/1100/1*e0HE3BV4nfJAx_qOElC9ZQ.png)

Between the GPU parallelization in this four-stage pipeline, at any given moment, The Solana TPU can be making progress on 50,000 transactions simultaneously. This can all be achieved with an off-the-shelf computer for under $5000. With the GPU offloading onto Solana’s Transaction Processing Unit, the network can affect single node efficiency.