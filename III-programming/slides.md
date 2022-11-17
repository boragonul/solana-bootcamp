---

transition: slide
---

<grid align="left">

#### Solana Programming Model <!-- element style="color: cyan" -->


Bora Gönül ©2022  
me@boragonul.com

Most of the credits should go to;

- https://www.chain.link
- https://www.solana.com 

Thanks for the content !<!-- element style="color: yellow" -->

</grid>

---
<grid align="left">
#### Programs & Accounts <!--element style="color: cyan" -->

- `Program` is an `on-chain` smart contract (stateless, no global variables)
- `Program ID` is the `address/account` program stored in
- `Account` stores data for programs
1) is actually a buffer
2) is like a file in an `o/s`
3) includes `metadata` for runtime to check `access` and `how`
4) held in validator memory and pay `rent` to stay there
</grid>

---
<grid align="left">
Accounts <!--element style="color: cyan"-->
````rust
pub struct AccountInfo {
	pub key: Pubkey,
	pub is_signer: bool,
	pub is_writable: bool,
	pub lamports: mut u64, // mutable
	pub data: mut [u8], // mutable
	pub owner: Pubkey,
	pub executable: bool,
	pub rent_epoch: Epoch,
}
````

---
<grid align="left">
Instructions & Txns <!--element style="color: cyan" -->

- Basic operational unit is an instruction
- Instructions are split into `three` different parts
1) Program ID
2) Accounts
3) Instruction Data
- Txns are  a list of instructions
- Clients submit txns and fetch data via the RPC API

</grid>

---
<grid align="left">
Instructions & Txns (Sample) <!-- element style="color: cyan" -->

Instruction-1
````rust
Program ID: abcdefg12345
Accounts: <Acct1, Acct2>
Data: [1,2,3,4,5,6]
````
Instruction-2
````rust
Program ID: abcdefg12345
Accounts: <Acct3, Acct4>
Data: [9,8,7,6,5,4]
````

Txn-1
````rust
[Instruction-1, Instruction-2]
````
</grid>

---
<grid align="left">
Instructions: Accounts <!--element style="color: cyan"-->

Each `Account` element  in the array contains 3 fields

- Public Key
- is_signer: boolean
- is_writeable: boolean
</grid>

---
<grid align="left">
Instructions: Accounts (Sample) <!--element style="color: cyan" -->

Account-1
````rust
Public Key: abcdefg12345
is_signer: false
is_writeable: false
````

Account-2
````rust
Public Key: zyx987654
is_signer: true
is_writeable: true
````
</grid>

---
<grid align="left">
Instructions: Data <!--element style="color: cyan" -->

- Byte array (of a certain size)
- Used for sending input data to `on-chain` programs

````rust
0c 00 00 47 6c 61 73 73 20 43 68 65 77 65 72
````
</grid>

---
<grid align="left">
Instructions: Flow <!--element style="color: cyan" -->

![[flow.excalidraw.svg]]]

</grid>

---
<grid align="left">
Economics & Rent <!--element style="color: cyan" -->

- Validators get paid txn fees + inflationary rewards
- Stakers are rewarded for delegations
- Inflation max %8
- Each txn submitted to ledger costs
1) txn fees only cover processing
2) storing is not included !!
- Storing rent covers the cost of storing data in accounts
1) Set and Forget
2) Pay per Byte

[Inflation Schedule](https://docs.solana.com/inflation/inflation_schedule) <!-- element style="color: yellow" -->
</grid>

---
<grid align="left">
Writing & Compiling <!-- element style="color: cyan" -->

- Solana programs are compiled to [BPF](https://ebpf.io/what-is-ebpf/)
- When called program must be passed to [BPF Loader](https://docs.solana.com/developing/on-chain-programs/overview#loaders)
- Programs can be written in any language compiles to `BPF`
- Currently Rust, C, C++ is supported

Berkeley Packet Filter <!--element style="color: yellow"-->

</grid>

---
<grid align="left">
Developing on Solana <!--element style="color: cyan" -->
More difficult compared to EVM chains.

- Many things usually abstracted away need to be done by developer
- Added complexities around storage and retrieval of data
- Seperation of state and logic adds complexity
- Libraries and frameworks help to fix some of this

</grid>

---
<grid align="left">
#### Finally <!--element style="color: cyan" -->

Let's move on to `Rust Fundementals`
</grid>