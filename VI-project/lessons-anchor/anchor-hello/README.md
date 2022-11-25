# anchor-hello

1) how did I create this project ?
2) please ask for help if you don't know answers of `p.s` questions

## backend
- first install `yarn` (better npm)
````shell
npm install -g yarn
````

- then for a new `anchor` project
````shell
anchor init anchor-hello # find a better name :)
```` 

- then install `minimist` (an args parser for js)
_p.s_: find `minimist` in [npmjs](https://www.npmjs.com/), read it

````shell
npm install minimist
````

- tell `solana` we are using `local`
````shell
solana config set --url localhost
````

- run your `test-validator`
_p.s_:mine is here, remember. where is yours ?
````shell
cd ~/Code/tmp 
solana-test-validator
````

- use your old `account`
_p.s_: mine was at `V-blockchain/lessons-solana/program-hello/README.md`. where is yours ? 
````shell
==========================================================================
pubkey: EEuXCi19KFBk6Yb9fEVi6ubxLrwczytEs6hQUq1NESUd
==========================================================================
Save this seed phrase and your BIP39 passphrase to recover your new keypair:
enough jealous owner dune bracket rural oven kick clarify jar three unveil
==========================================================================
````

- let's `airdrop` more
````shell
solana airdrop 2 # how to airdrop to some other address ?
````

- for `anchor` to use same address, you need to set it in an environment variable

1) goto your home `cd ~`
2) open your `.zshrc` file either using `vim` or `gedit` or `code`
3) set ANCHOR_WALLET environment variable
_p.s_: mine was like below. where is yours ?
````shell
export ANCHOR_WALLET=$HOME/.config/solana/id.json
````

- let's have a look at `program/anchor-hello/src/lib.rs`

- let's build it
````shell
anchor build
````

- let's get the `program id`
````shell
solana address -k ./target/deploy/anchor_hello-keypair.json
````

- change the `program-id` in `lib.rs`
_p.s_: we will generate `idl` and need the deployed `program-id`

- let's re-build it, because we changed the `program-id`
````shell
anchor build
````

- let's deploy it
````shell
anchor deploy
````

- keep the result
```text
Deploying workspace: http://localhost:8899
Upgrade authority: /home/borag/.config/solana/id.json
Deploying program "anchor-hello"...
Program path: /home/borag/Code/work/solana-bootcamp/VI-project/lessons-anchor/anchor-hello/target/deploy/anchor_hello.so...
Program Id: 62rvHGofBUPkfEX7igrci4AA9txzemq8CMyVijLBbzzC
```

well done :)

## frontend

- create a new file at `app` folder called `client.js`
- let's read the code

- let's run the `client`
_p.s_: whoever describes me how this program is working will be in name here !
````shell
cd app
node client.js --program 62rvHGofBUPkfEX7igrci4AA9txzemq8CMyVijLBbzzC --name <FIGHT_FOR_YOUR_NAME>
````