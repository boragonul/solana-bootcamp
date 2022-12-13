# setup

install rust

````shell
curl https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env
rustup component add rustfmt
````

install solana

````shell
sh -c "$(curl -sSfL https://release.solana.com/v1.14.8/install)"
````

install anchor
````shell
cargo install --git https://github.com/project-serum/anchor --tag v0.25.0
````

check your $PATH, solana, rust
````shell
echo $PATH

solana --version
rustc --version
anchor --version
````

_p.s_: please also install `node.js` either using `nvm`, `fnm` e.g.
_p.s_: please also install `yarn` *better than `npm`
_p.s_: please also install `vs-code` 

# wallet
please install `phantom` wallet `https://phantom.app/download`

# project

let's create a new project

````shell
anchor init anchor-hello-friends
````

let's create our keys
````shell
solana-keygen new 
````
````text
Wrote new keypair to /home/borag/.config/solana/id.json
=====================================================================
pubkey: EKBgsZNhTSDDBqeRiDZnh3YnonXdy5rsr4eVc61P4PE6
=====================================================================
Save this seed phrase and your BIP39 passphrase to recover your new keypair:
alert tired cliff hen enable penalty radio spy miss across wave couch
=====================================================================
````

let's configure solana 
````shell
solana config set --url localhost
solana config get
````

let's build project
````shell
anchor build
anchor test
````