---

transition: slide
---

<grid align="left">

#### Programming Anchor <!-- element style="color: cyan" -->


Bora Gönül ©2022  
me@boragonul.com

Most of the credits should go to;

- https://www.chain.link
- https://www.rust-lang.org

Thanks for the content !<!-- element style="color: yellow" -->

</grid>

---
<grid align="left">
Introduction to Anchor<!--element style="color: cyan"-->

- is a developer framework to write better `Solana` programs
- like Java + Spring or Ruby + Rails
- similar to Truffle or Hardhat in Ethereum ecosystem

To improve productivity and to write less boilerplate code<!--element style="color: yellow"-->
</grid>

---
<grid align="left">
Let's Install Anchor :)<!--element style="color: cyan"-->

- Nodejs: [Ok]
- Rust: [Ok]
- Solana: [Ok]
- VSCode: [Ok]

https://www.anchor-lang.com/

````shell
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
````

Use this [install-link](https://www.anchor-lang.com/docs/installation) if it fails<!--element style="color: yellow"-->
</grid>

---
<grid align="left">
Anchor Projects<!--element style="color: cyan"--> 

- [Serum](https://www.projectserum.com/): Defi
- [Metaplex](https://www.metaplex.com/): NFT Platform
- [SolFarm](https://tulip.garden/leverage): Yield Platform
- [Saber](https://app.saber.so): Auto Market Maker
- [Synthetify](https://synthetify.io/): Bridge

Many more now use `Anchor`<!--element style="color: yellow"-->

It's becoming a standard for `Solana`<!--element style="color:pink"-->
</grid>

---
<grid align="left">
Anchor Tools<!--element style="color: cyan" -->

- Rust Smart Contracts
- Interface Description Language
- Client Generators
- Command Line Interface 

![[flow.excalidraw.flow]]]
</grid>

---
<grid align="left">
Anchor Highlevel<!--element style="color: cyan"-->

- Program Module: Where logic is written
- Account Structs: Where accounts are validated
- Declare ID(Macro): Stores the address of program

````rust
use anchor_lang::prelude::*;

// declare an id for your program
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

// write your business logic here
#[program]
mod hello_anchor {
	use super::*;
	pub fn initialize(_ctx: Context<Initialize>) -> ProgramResult {
		Ok(())
	}
}

// validate incoming accounts here
#[derive(Accounts)]
pub struct Initialize {}
````
</grid>

---
<grid align="left">
Anchor: Accounts-1<!--element style="color: cyan"-->

- is where you define the `accounts` you expect
- and define your `constraints` these `accounts` to obey
- and some rules for acccess control

[account-types](https://docs.rs/anchor-lang/latest/anchor_lang/accounts/index.html)<!--element style="color: yellow"--> used when you are interested in deserialized data  
</grid>

---
<grid align="left">
Anchor: Accounts-2<!--element style="color: cyan"-->

````rust
use anchor_lang::prelude::*;
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
mod hello_anchor {
	use super::*;
	pub fn set_data(ctx: Context<SetData>, data: u64) -> ProgramResult {
		ctx.accounts.my_account.data = data;
		Ok(())
	}
}
#[account]
#[derive(Default)]
pub struct MyAccount {
	data: u64
}

#[derive(Accounts)]
pub struct SetData<'info> {
	#[account(mut)]
	pub my_account: Account<'info, MyAccount>
}
````

account for the program id holds a data like this struct<!--element style="color: yellow"-->
</grid>

---
<grid align="left">
Anchor: Accounts-3 (Context)<!--element style="color: cyan"-->

- Every function has this `Context` and `parameters`
- Refers to `SetData`
- Says here are the `Accounts` we are expecting

No serialize/deserialize logic is needed <!--element style="color: yellow"-->

</grid>


---
<grid align="left">
Anchor :Accounts-4 (Constraints)<!--element style="color: cyan"-->

````rust
#[derive(Accounts)]
pub struct SetData<'info> {
	#[account(mut)]
	pub my_account: Account<'info, MyAccount>,
	#[account(
		constraint = my_account.mint == token_account.mint,
		has_one = owner
	)]
	pub token_account: Account<'info, TokenAccount>,
	pub owner: Signer<'info>
}
````

this referred block can also define `constraints`<!--element style="color:pink"--> 

for `accounts` input <!--element style="color: yellow"-->
</grid>

---
<grid align="left">
Anchor: Program Module<!--element style="color: cyan"-->
- instruction `context`
1) provides access to accountt
2) provides access to program id

````rust
#[program]
mod hello_anchor {
	use super::*;
	pub fn set_data(ctx: Context<SetData>, data: u64) -> ProgramResult {
		if ctx.accounts.token_account.amount > 0 {
			ctx.accounts.my_account.data = data;
		}
		Ok(())
	}
}
````
write functions to be called by clients/programs<!--element style="color: yellow"-->
</grid>

---
<grid align="left">
Anchor: Instruction Data<!--element style="color: cyan"-->
- instruction data
1) can be added by adding args after `Context`
2) anchor auto deserialize this args

````rust
#[program]
mod hello_anchor {
	use super::*;
	pub fn set_data(ctx: Context<SetData>, data: u64) -> ProgramResult {
		if ctx.accounts.token_account.amount > 0 {
			ctx.accounts.my_account.data = data;
		}
		Ok(())
	}
}
````
auto deserialize thx `anchor` !<!--element style="color: yellow"-->
</grid>

---
<grid align="left">
Anchor Re-check Code<!--element style="color: cyan"-->
````rust
use anchor_lang::prelude::*;
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
mod hello_anchor {
	use super::*;
	pub fn set_data(ctx: Context<SetData>, data: u64) -> ProgramResult {
		ctx.accounts.my_account.data = data;
		Ok(())
	}
}
#[account]
#[derive(Default)]
pub struct MyAccount {
	data: u64
}

#[derive(Accounts)]
pub struct SetData<'info> {
	#[account(mut)]
	pub my_account: Account<'info, MyAccount>
	#[account( constraint = my_account.mint == token_account.mint, has_one = owner )] 
	pub token_account: Account<'info, TokenAccount>, 
	pub owner: Signer<'info>	
}
````

nicely done<!--element style="color: yellow"-->
</grid>

---
<grid align="left">
Anchor: Interface Definition Language (IDL)<!--element style="color: cyan"-->

- generates and IDL for programs (like EVM's ABI)
- used by clients to interact with programs
- simplifies calling functions
- simplifies sending/receiving data

acts as a glue code for `on-chain` programs `off-chain` clients<!--element style="color: yellow"-->
</grid>

---
<grid align="left">
Anchor: Program <!--element style="color: cyan"-->

````rust
use anchor_lang::prelude::*;
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
mod basic_1 {
	use super::*;
	pub fn initialize(ctx: Context<Initialize>, data: u64) -> ProgramResult {
		let my_account = &mut ctx.accounts.my_account;
		my_account.data = data;
		Ok(())
	}
}

#[derive(Accounts)]
pub struct Initialize<'info> {
	#[account(init, payer = user, space = 8 + 8)]
	pub my_account: Account<'info, MyAccount>,
	#[account(mut)]
	pub user: Signer<'info>,
	pub system_program: Program<'info, System>,
}

#[account]
pub struct MyAccount {
	pub data: u64,
}
````

let's repeat (nearly same don't worry)<!--element style="color: yellow"-->
</grid>

---
<grid align="left">
Anchor: Program => IDL<!--element style="color: cyan"-->

````json
{
	"version": "0.1.0",
	"name": "basic_1",
	"instructions": [
		{
			"name": "initialize",
			"accounts": [
				{"name": "myAccount", "isMut": true,"isSigner": true},
				{"name": "user", "isMut": true,"isSigner": true}
				{"name": "systemProgram", "isMut": true,"isSigner": true}
			],
			"args": [
				{
					"name": "data",
					"type": "u64"
				}
			]
		}
	],
	"accounts": [
		{
			"name": "MyAccount",
			"type": {
				"kind": "struct",
				"fields": [
					{"name": "data","type": "u64"}
				]
			}
		}
	]
}
````

</grid>

---
<grid align="left">
Anchor: IDL => Client<!--element style="color: cyan"-->

````js
// Read the generated IDL.
const idl = JSON.parse(
	require("fs").readFileSync("./target/idl/basic_1.json", "utf8")
);

// Address of the deployed program.
const programId = new anchor.web3.PublicKey("<YOUR-PROGRAM-ID>");

// Generate the program client from IDL.
const program = new anchor.Program(idl, programId);

// The Account to create.
const myAccount = anchor.web3.Keypair.generate();

// Create the new account and initialize it with the program.
await program.rpc.initialize(new anchor.BN(1234), {
	accounts: {
		myAccount: myAccount.publicKey,
		user: provider.wallet.publicKey,
		systemProgram: SystemProgram.programId,
	},
	signers: [myAccount],
});
````
this will be filled with `wallet` in `ui`<!--element style="color: yellow"-->

phantom<!--element style="color: pink"-->
</grid>

---
<grid align="left">
Anchor: Build & Deploy<!--element style="color: cyan"-->

build targeting `bpf` and emits `idl` files
````shell
anchor build # no cargo build
````
deploy the program(s) to dev, test, main, local
````shell
anchor deploy [cluster]
````
verifies on-chain bytecode with local
````shell
anchor verify [program-id]
````
tests the program
````shell
anchor test
````
</grid>

---
<grid align="left">
Anchor: Let's create a project<!--element style="color: cyan"-->

````shell
anchor new [program-name]
````

will create
````shell
/Anchor.toml # anchor config file
/Cargo.toml # rust workspace config file
/package.json # js/ts config file
/programs/ # program crates
/app/ # frontend :)
/tests/ # js/ts integration tests
/migrations/deploy.js # deploy script
````

</grid>

---
<grid align="left">
Video: Anchor-1 (this slides)<!--element style="color: cyan"-->

<iframe src="https://customer-icirg9ue15wb0ia7.cloudflarestream.com/2fc8652b84548b16286c5f9707e23037/iframe?poster=https%3A%2F%2Fcustomer-icirg9ue15wb0ia7.cloudflarestream.com%2F2fc8652b84548b16286c5f9707e23037%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600" style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe><!--element style="position: relative; padding-top: 20;"-->

[Link](https://customer-icirg9ue15wb0ia7.cloudflarestream.com/2fc8652b84548b16286c5f9707e23037/watch)


</grid>
---
<grid align="left">
Video: Anchor-2 (hello world)<!--element style="color: cyan"-->

<iframe src="https://customer-icirg9ue15wb0ia7.cloudflarestream.com/4c68815734767e8708491487f46a6fe4/iframe?poster=https%3A%2F%2Fcustomer-icirg9ue15wb0ia7.cloudflarestream.com%2F4c68815734767e8708491487f46a6fe4%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600" style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe><!--element style="position: relative; padding-top: 20;"-->

[Link](https://customer-icirg9ue15wb0ia7.cloudflarestream.com/4c68815734767e8708491487f46a6fe4/watch)
</grid>
---
<grid align="left">

Thanks<!--element style="color: red"-->

I love `anchor` <!--element style="color: yellow"-->
</grid>

