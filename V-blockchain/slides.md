---

transition: slide
---

<grid align="left">

#### Programming Solana <!-- element style="color: cyan" -->


Bora Gönül ©2022  
me@boragonul.com

Most of the credits should go to;

- https://www.chain.link
- https://www.rust-lang.org

Thanks for the content !<!-- element style="color: yellow" -->

</grid>

---
<grid align="left">
Compiling Solana Programs <!--element style="color: cyan"-->

- Solana programs are compiled to [BPF](https://ebpf.io/what-is-ebpf/)
- When called a program must be passed to something called [BPF Loader](https://docs.solana.com/developing/on-chain-programs/overview#loaders) 
- Programs can be written in any language supporting `BPF` 
- We will be using [Rust](https://www.rust-lang.org/) :)

Berkley Packet Filter<!--element style="color: yellow"-->

</grid>

---
<grid align="left">
Solana Project Layout <!--element style="color: cyan" -->

````shell
/examples/
/inc/
/src/
- lib.rs
- entrypoint.rs/main.rs
- error.rs
- instruction.rs
- processor.rs
- state.rs
/tests/
/Cargo.lock
/Cargo.toml
````
Typical structure<!--element style="color: yellow"-->
 

---
<grid align="left">
Solana Project Layout<!--element style="color: cyan"-->

- `entrypoint.rs/main.rs` => first entry  
- `processing.rs` => minimal call logic
- `instruction.rs` => data structure to send
-  `error.rs` => defining error messages
- `state.rs` => serialize, deserialize etc.
- `lib.rs` => contract logic

Just a Rust project<!--element style="color: yellow"-->
</grid>

---
<grid align="left">
Native Programs<!--element style="color: cyan"-->

- Builtin to the protocol
- Deployed to cluster to run the network
- Like an `O/S`
- Part of validator impl
- Can be upgraded

Each Program has an ID  <!--element style="color: yellow"-->
</grid>

---
<grid align="left">
Native Programs<!--element style="color: cyan"-->

- System Program: accounts, transfers etc
- Config Program: chain config
- Stake Program: stake and awards
- Vote Program: consensus voting
- BPF Loader: low level
- Ed25519 Program: cryptography
- Secp256k1 Program: cryptography
</grid>

---
<grid align="left">
Let's Install Solana :)<!--element style="color: cyan"-->



````shell
# goto home
cd ~

# install solana (testnet latest)
sh -c "$(curl -sSfL https://release.solana.com/v1.14.6/install)"

# append solana to path
# add to .zshrc

export SOLANA_HOME=$HOME/.local/share/solana/install/active_release
export PATH=$SOLANA_HOME/bin:$PATH

# refresh
source .zshrc

# hello solana
solana help
````

[Change with latest version](https://github.com/solana-labs/solana/releases)<!--element style="color: yellow"-->

</grid>

---
<grid align="left">
Run a Local Test Validator :)<!--element style="color: cyan"-->

````shell
# goto tmp (migh be different for you)
mkdir -p ~/Code/tmp
cd ~/Code/tmp

# check version
solana --version

# run a test validator
solana-test-validator
````

- Local full featured single node cluster
1) No RPC rate limits
2) No airdrop limits
3) Other configurable options
- Comes with `Solana-CLI`
- This will create `test-ledger`
- Keep this, open a new tab<!--element style="color: yellow"-->

</grid>

---
<grid align="left">
Configure Solana<!--element style="color: cyan"-->

````shell
# goto home
cd ~

# set local
solana config set --url localhost

# generate your local key pair
# 1) check if you have it
solana address

# 2) run this if get an error, you will :)
solana-keygen new
````

- Default is Mainnet !
- Copy and Save your keys !
<!--element style="color: yellow"-->
</grid>

---
<grid align="left">
Solana Tools<!--element style="color: cyan"-->

- [explorer](https://explorer.solana.com/): select local :) 
- [json-rpc](https://docs.solana.com/developing/clients/jsonrpc-api)
- [web3.js](https://github.com/solana-labs/solana-web3.js): play with it :)

Send Transaction: Read it<!--element style="color: yellow"-->
</grid>

---
<grid align="left">
Serialization/Deserialization<!--element style="color: cyan"-->

- Serialize => convert object in memory into stream of bytes
- Deserialize => convert stream of bytes into a readable object in memory
- JSON-RPC needs this

````rust
Program ID: abcdefg12345
Accounts: <Acct1, Acct2>
Data: [1,2,3,4,5,6]
````

````shell
obj => stream of bytes => JSON/RPC => stream of bytes => obj  
````

Instruction is being sent<!--element style="color: yellow"-->

</grid>

---
<grid align="left">
Serialization/Deserialization<!--element style="color: cyan"-->

- [Borsh](https://borsh.io/) is the most common
1) integers are little endian
2) sizes of dynamic containers are written before values as u32
3) structs are serialization in the order of fields

</grid>

---
<grid align="left">
Client: Serializes(prepare)<!--element style="color: cyan"-->

````js
//client code
import * as borsh from "@project-serum/borsh";
const PARAMS = borsh.struct([
	borsh.u8("uint 8"),
	borsh.publicKey("key property"),
	borsh.str("string"),
]);
````

</grid>
---
<grid align="left">
Client: Serializes (define)<!--element style="color: cyan"-->

````js
//client code
import { PublicKey } from "@solana/web3.js";
const payload = {
	u8: 7
	publickey: new PublicKey("..."),
	str: "eat_glass",
};
//start with a big enough buffer
Const buffer = Buffer.alloc(1000);
//Serialize the data into the buffer
PARAMS.encode(payload, buffer);
//Remove the unused bytes from the buffer
Const serializedData = buffer.slice(0, PARAMS.getSpan(buffer));
````

Send to JSON/RPC<!--element style="color: yellow"-->
</grid>

---
<grid align="left">
Solana: Deserializes(define)<!--element style="color: cyan"-->

````rust
//on-chain program
use borsh::{BorshSerialize, BorshDeserialize};
use solana_program::pubkey::Pubkey;
#[derive(BorshSerialize, BorshDeserialize, Debug, Clone)]
pub struct Params {
	pub u8_int: u8,
	pub public_key: Pubkey,
	pub string_param: String
}
````
</grid>

---
<grid align="left">
Solana: Deserializes(try to read)<!--element style="color: cyan"-->

````rust
//on-chain program
use solana_program::borsh::try_from_slice_unchecked;
//data is of type &[u8]
//this will fail
let d = Params::try_from_slice(data)?;
//this will pass
let d = try_from_slice_unchecked::Params>(data).unwrap();
````

</grid>

---
<grid align="left">
Solana: Deserializes (process)<!--element style="color: cyan"-->

````rust
//on-chain program
use solana_program::borsh::try_from_slice_unchecked;
//data is of type &[u8]
d.serialize(&mut &mut data.borrow_mut()[..])?
````

JSON/RPC response<!--element style="color: yellow"-->
</grid>

---
<grid align="left">
Client: Deserialize (i got my response)

````js
//client program
const paramData = PARAM.decode(buffer);
````
</grid>

---
<grid align="left">
Solana Program Library (SPL)<!--element style="color: cyan" -->

- [spl](https://github.com/solana-labs/solana-program-library) for on-chain programs targeting
- [sealevel](https://medium.com/solana-labs/sealevel-parallel-processing-thousands-of-smart-contracts-d814b378192) parallel runtime

Optimized programs for specific use-cases<!--element style="color: yellow" -->
</grid>

---
<grid align="left">
Solana Program Library (SPL)<!--element style="color: cyan" -->

- Token Program
- Token Swap Program
- Token Lending Program
- Associated Token Account Program
- Memo Program
- Name Service
- Shared Memory Program
- Stake Pool
- Feature Proposal Program

</grid>

---
<grid align="left">
Solana Program Derived Address (PDA)<!--element style="color: cyan"-->

- Accounts whose owner is a program
- Thus is not controlled by private keys
- Derived from a collection of seeds
- Program ID using a 256-bit hash function
- Allows programs to sign for certain addresses

Without needing a private key<!--element style="color: yellow"-->
</grid>

---
<grid align="left">
Solana Program Derived Address (PDA Use-Case)<!--element style="color: cyan"-->

Allow clients to programmatically derive account addresses for a particular program, negating the need to store public/private keys off-chain

````js
await anchor.web3.PublicKey.findProgramAddress(
[Buffer.from("some_seed_string")],
program.programId
);
````
</grid>

---
<grid align="left">

Thanks<!--element style="color: red"-->

Next
- Do this without Anchor :(
- Do this with Anchor :)

Because it's always similar<!--element style="color: yellow"-->
</grid>

---
<grid align="left">
Exercise-1: Hello World Contract<!--element style="color: cyan"-->

- Program that accepts a 'name'
- Says 'hello world' and stores the 'name' in an account
- Client reads the account contents

We will do it together<!--element style="color: yellow"-->
</grid>

---
<grid align="left">
Exercise-2: Token Contract<!--element style="color: cyan" -->

- Simplified version of [spl](https://github.com/solana-labs/solana-program-library)
- Create Token
- Create Token Account
- Mint Tokens
- Transfer Tokens

We will do it together<!--element style="color: yellow"-->
</grid>