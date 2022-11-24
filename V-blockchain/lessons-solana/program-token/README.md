# program-token

- try to understand it
- i will tell it next time

## backend

````shell
cargo build-bpf --manifest-path=./Cargo.toml --bpf-out-dir=dist/program
solana program deploy dist/program/program_token.so
````

## frontend

````shell
npm install
npm run start
````