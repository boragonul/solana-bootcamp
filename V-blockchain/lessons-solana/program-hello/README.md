# program-hello

how did I create this project ?

1) backend
- create a new project using `cargo`
````shell
cargo new program-hello --lib
````

- modified `Cargo.toml` according to mey needs
````toml
[package]
name = "program-hello"
version = "0.1.0"
edition = "2021"

[features]
no-entrypoint = []

[dependencies]
borsh = "0.9.3"
borsh-derive = "0.9.3"
solana-program = "1.14.8"

[dev-dependencies]
solana-program-test = "1.14.8"
solana-sdk = "1.14.8"

[lib]
name = "program_hello"
crate-type = ["cdylib", "lib"]
````

- tell `solana` that we want to use a `local` cluster

````shell
solana config set --url localhost
````

- let's create a `keypair`

````shell
solana-keygen new
````

- output
````text
Generating a new keypair

For added security, enter a BIP39 passphrase

NOTE! This passphrase improves security of the recovery seed phrase NOT the
keypair file itself, which is stored as insecure plain text

BIP39 Passphrase (empty for none): 

Wrote new keypair to /home/borag/.config/solana/id.json
==========================================================================
pubkey: EEuXCi19KFBk6Yb9fEVi6ubxLrwczytEs6hQUq1NESUd
==========================================================================
Save this seed phrase and your BIP39 passphrase to recover your new keypair:
enough jealous owner dune bracket rural oven kick clarify jar three unveil
==========================================================================

````

- start your `local` cluster and keep it open

````shell
cd ~/Code/tmp # i'm keeping my data here decide yours
solana-test-cluster 
````

- airdrop yourself some `solana`
````shell
solana airdrop 2
````

- let's move on to program :)

2) program

- code is here `src/lib.rs` 
- explanation is inside it
- let's deploy it

````shell
cargo build-bpf --manifest-path=./Cargo.toml --bpf-out-dir=dist/program
solana program deploy dist/program/program_hello.so
````

- output (we will need the program id)
````texxt
Program Id: 94CBkQR8t12Jubbqr8i6289xroainuu8hgAonb8aJ1zx
````

- there is a problem with some `ssl` versions on ubuntu, if you can't build try this first
````shell
wget http://nz2.archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2.16_amd64.deb 
sudo dpkg -i libssl1.1_1.1.1f-1ubuntu2.16_amd64.deb
````

2) frontend

- add a client project using `npm`
````shell
cd program-hello
npm init -y
````

- then modified `package.json` according to my needs
````text
{
    "name": "hello-client",
    "version": "1.0.0",
    "scripts": {
      "start": "ts-node ./cli/main.ts"
    },
    "dependencies": {
      "@solana/buffer-layout": "^4.0.0",
      "@solana/web3.js": "^1.66.2",
      "borsh": "^0.7.0",
      "buffer": "^6.0.3",
      "mz": "^2.7.0",
      "yaml": "^2.1.3"
    },
    "devDependencies": {
      "@tsconfig/recommended": "^1.0.1",
      "@types/eslint": "^8.4.10",
      "@types/eslint-plugin-prettier": "^3.1.0",
      "@types/mz": "^2.7.4",
      "@types/prettier": "^2.7.1",
      "@types/yaml": "^1.9.7",
      "@typescript-eslint/eslint-plugin": "^5.44.0",
      "@typescript-eslint/parser": "^5.44.0",
      "eslint": "^8.28.0",
      "eslint-config-prettier": "^8.5.0",
      "eslint-plugin-prettier": "^4.2.1",
      "prettier": "^2.8.0",
      "ts-node": "^10.9.1",
      "typescript": "^4.9.3"
    },
    "engines": {
      "node": ">=14.0.0"
    }
  }
````

- code is here `cli/main.ts`
- explanation is inside it
- let's run it

````shell
npm install # install dependencies
````

````shell
npm run start
````