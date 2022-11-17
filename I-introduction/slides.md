---

transition: slide
---

<grid align="left">

#### Introduction to Solana <!-- element style="color: cyan" -->


Bora Gönül ©2022  
me@boragonul.com

Most of the credits should go to;

- https://www.encode.club/solana
- https://www.solana.com 

Thanks for the content !<!-- element style="color: yellow" -->

</grid>



---

<grid align="left">
#### Bootcamp <!-- element style="color: cyan" -->

##### Part-1 <!-- element style="color: yellow" -->
- Introduction to Solana
- Technical overview of Solana  
- Introduction to Rust for Solana  
- Introduction to Anchor  

##### Part-2 <!-- element style="color: yellow" -->
- Solana Program Library  
- Solana Program Mental Model  
- Solana Ecosystem  

##### Part-3 <!-- element style="color: yellow" -->
7- Solana Sample Project (with React)      
8- Recap    

</grid>

---
<grid align="left">
#### What is Solana ? <!-- element style="color: cyan"-->

- Open-source project implementing a high performance, permissionless blockchain.  

- Trying to be a kind of '*Money*' using decentralized databases and distributed systems   
</grid>

---
<grid align="left">
#### What is Money ? <!-- element style="color: cyan" -->

- '*Money*' is a database
- '*Money*' needs a central authority

How can we replace this authority with code ? <!-- element style="color: yellow" -->

</grid>

---

<grid align="left">
#### Why not Bitcoin or Ethereum ? <!-- element style="color: cyan" -->

- We are searching for the holy-grail of scalibity, security and decentralization
- We need a 'fast', 'scalable', 'cheap' and 'secure' database

Ethereum is not fast and not cheap <!-- element style="color: yellow" -->
 </grid>

---
<grid align="left">

#### History <!-- element style="color: cyan" -->

###### November 2017, Whitepaper by *Anatoly Yakavenko*

Proof Of History

"A reliable clock makes network synchronisation very simple and therefore fast" 

Bitcoin and Ethereum don't have clocks and struggle to produce more then 15 txn per-second <!-- element style="color: yellow" --> 

</grid>

---
<grid align="left">
#### Solana  <!-- element style="color: cyan" -->

- It's is fast and cheap
- It's single-sharded 
- It's architecture enables txns to be ordered as they enter the network rather than by block
- Proof of History is a cryptographic way to reliability order txns
- No problem of agreeing on time, with instant finality

PoH is not a consensus mechanism, it improves the performance of PoS <!-- element style="color: yellow" -->
</grid>

---
<grid align="left">
#### Solana<!-- element style="color: cyan" -->

- Blocks are broken into smaller batch of txns known as entries
- Blocks are just sequences of entries that validators vote on to achieve confirmation
- Validators are the entities responsible for confirming if these entries are valid

Different then Ethereum Blocks <!-- element style="color: yellow" -->
</grid>

---
<grid align="left">
#### Solana<!-- element style="color: cyan" -->

"What is being traded against, dear developer, is your time and sanity. 
Much of the complexity that Solana requires to achieve the TPS it does is simply placed on your doorstep"   

2501 babestep <!-- element style="color: yellow" -->
</grid>

---

<grid align="left">
#### Anchor <!-- element style="color: cyan" -->

- '*Anchor*' is used to abstract this complexity
- '*Anchor*' is a framework for making Solana programs more intuitive (e.g: Solidity)

Rust is needed for the full experience <!-- element style="color: yellow" -->
</grid>

---

<grid align="left">
#### Rust <!-- element style="color: cyan" -->

- Rust is chosen, since it offers safety guarantees
- Rust's type system is very strong
- Rust's solution to Stack, Heap and Static memory which is like RAII(C++) is elegant

We will learn Rust for Solana but Rust is deep <!-- element style="color: yellow" -->
</grid>

---
<grid align="left">
#### Cluster <!-- element style="color: cyan" -->

- Cluster is a set of validators working together to serve client transactions and maintain the integrity of ledger
- They can co-exist or ignore each other
</grid>

---
<grid align="left">
#### Programs & Accounts <!-- element style="color: cyan" -->

Biggest practical difference between Solana and Ethereum is that it very aggresively seperates code and data.

- Programs are '*stateless*' contracts <!-- element style="color: yellow" -->
- No '*class variables, globals*'  like in Solidity  <!-- element style="color: yellow" -->
- Accounts are '*buffers*' owned by the system program by default <!-- element style="color: yellow" -->
- Accounts are used to store '*state and data*' <!-- element style="color: yellow" -->

Advantage is having one generic program that operates on various data <!-- element style="color: yellow" -->
</grid>

---
<grid align="left">
#### Solana Program Library (Token Program) <!-- element style="color: cyan" -->

- No need to deploy code, you can create an account that can mint tokens
- Mint address uniquely determines the token type
- They all are passed as arguments to one static program instance

Easier programming mental model once you understand it <!-- element style="color: yellow" -->
</grid>

---
<grid align="left">

#### Solana Program Library (Program Derived Addresses) <!-- element style="color: cyan" -->

- Home accounts designed to be controlled by a specific program
- Programs can programmaticaly sign for certain addresses without needing a private key

They allow Solana apps to be composable with one another <!-- element style="color: yellow" -->
</grid>

---
<grid align="left">
#### Transactions & Instructions <!-- element style="color: cyan" -->

- An instruction is one call into a programme
- One or more instructions can be bundled into a message
- A message plus an array of signatures constitues a txn

This has huge consequences and can be very tricky <!-- element style="color: yellow" -->
</grid>

---

<grid align="left">
#### Finally <!--element style="color: cyan" -->

- This is just a taste
- There are lots of innovations 
- There is a big ecosystem 

Next time; Tower BFT, Turbine, Gulf Stream, Sealevel, Pipelining, Cloudbreaking, Archivers <!-- element style="color: yellow" -->
</grid>

---
<grid align="left">

#### Thanks ! <!-- element style="color: red" -->

- Please visit https://docs.solana.com/
- Setup your computers
- https://github.com/boragonul/solana-bootcamp
</grid>
