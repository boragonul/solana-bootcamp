# how to create a nft marketplace ?

let's setup our environment for this, no code today !

- install [solana](https://docs.solana.com/cli/install-solana-cli-tools)

````bash
sh -c "$(curl -sSfL https://release.solana.com/v1.14.11/install)"
````

_p.s_: Please update your PATH environment variable to include the solana programs

````bash
solana --version
solana-keygen --version
````

- install [sugar-v3](https://github.com/metaplex-foundation/sugar/releases)

_p.s_: run under `solana-bootcamp/VII-final/solana-nft` 

````bash
wget https://github.com/metaplex-foundation/sugar/releases/download/sugar-cmv3-alpha.3/sugar-ubuntu-latest
mv sugar-ubuntu-latest sugar
chmod +x sugar

./sugar --version
````

- setup wallets and network

_p.s_: please use [phantom](https://phantom.app/)
_p.s_: please copy the output pubkey and mnemonics (passphrase)

````bash
solana-keygen new --outfile ./owner.json 
solana-keygen new --outfile ./creator.json
````

- configure `solana`

````bash
solana config set --keypair $PWD/owner.json
solana config set --url https://metaplex.devnet.rpcpool.com/
solana config get
````

- try to airdrop `sol`

_p.s_: this might fail don't worry, goto https://solfaucet.com (1/2 SOL is enough for both)

````bash
solana airdrop 2 <your_owner_pub_key>
solana airdrop 2 <your_creator_pub_key>
````

- import wallets into `phantom`

````text
1) copy everything in `owner.json` 
2) intoo into `phantom` wallet
3) name it `owner`

do the same for `creator`
````

- download [assets](https://docs.metaplex.com/assets/files/assets-ff6bd873ecd07b49c86faf3c7aab82d2.zip)

_p.s_: link may change check from [here](https://docs.metaplex.com/developer-tools/sugar/guides/preparing-assets)
````bash
wget https://docs.metaplex.com/assets/files/assets-ff6bd873ecd07b49c86faf3c7aab82d2.zip
mv assets-ff6bd873ecd07b49c86faf3c7aab82d2.zip assets.zip

unzip assets.zip
rm -fr __MACOS # it is zipped in macOS no problem
````

- generate a config file

````bash
./sugar create-config 
````

and my inputs for the config prompt
````bash
[1/2] 🍬 Sugar interactive config maker

Found metadata file(s) in folder 'assets':
  -> Loading values from file '0.json'

Check out our Candy Machine config docs to learn about the options:
  -> https://docs.metaplex.com/developer-tools/sugar/guides/configuration

? Found 10 file pairs in "assets". Is this how many NFTs you will have in your c✔ Found 10 file pairs in "assets". Is this how many NFTs you will have in your candy machine? · yes
✔ Found symbol "NB" in your metadata file. Is this value correct? · yes
✔ What is the seller fee basis points? · 500
? Do you want to use a sequential mint index generation? We recommend you choose✔ Do you want to use a sequential mint index generation? We recommend you choose no. · no
✔ How many creator wallets do you have? (max limit of 4) · 1
✔ Enter creator wallet address #1 · 6hwuoyLEtJHWPxwyEutA8dmwkPDpkczPUaEfo3sJkYWv
? Enter royalty percentage share for creator #1 (e.g., 70). Total shares must ad✔ Enter royalty percentage share for creator #1 (e.g., 70). Total shares must add to 100. · 100
✔ Which extra features do you want to use? (use [SPACEBAR] to select options you want and hit [ENTER] when done) · 
✔ What upload method do you want to use? · Bundlr
✔ Do you want your NFTs to remain mutable? We HIGHLY recommend you choose yes. · yes

[2/2] 📝 Saving config file

Saving config to file: "config.json"

Successfully generated the config file. 🎉 

✅ Command successful.

````

_p.s_: check `config.json` file

- upload assets using `sugar`

````bash
./sugar upload
````

output
````bash
[1/4] 🗂  Loading assets
Found 11 asset pair(s), uploading files:
+--------------------+
| images    |     11 |
| metadata  |     11 |
+--------------------+

[2/4] 🖥  Initializing upload
▪▪▪▪▪ Connected
Funding address:
  -> pubkey: GU6Bzn8iZNKrmAVHmYfLN2hzCk2LU9nHhozRYCTfrLMU
  -> lamports: 277880 (◎ 0.00027788)
Signature: 2WvxrM4vWCeMzyvcWhxHJUmUwCocP8Up32tUSCQ3jnA9zeVvryAgZAhr7WjzTq12z1QQFJmsNjSZ8ifenaa1pQzq

[3/4] 📤 Uploading image files 

Sending data: (Ctrl+C to abort)
[00:00:00] Upload successful ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████ 11/11

[4/4] 📤 Uploading metadata files 

Sending data: (Ctrl+C to abort)
[00:00:00] Upload successful ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████ 11/11

11/11 asset pair(s) uploaded.

✅ Command successful.
````

_p.s_: check `cache.json` file

- let's deploy using `sugar`
````bash
./sugar deploy
````

output

````bash

[1/3] 📦 Creating collection NFT for candy machine
Collection mint ID: 8RuCq2cGwGjATxHUezYMFFZZp8Qu3LoG3H1KBiguNThC

[2/3] 🍬 Creating candy machine
Candy machine ID: GngztwQ7z67VXFY6nWgzKBtWj2Q493E69cfpYenSBH2x

[3/3] 📝 Writing config lines
Sending config line(s) in 1 transaction(s): (Ctrl+C to abort)
[00:00:01] Write config lines successful ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████ 1/1

✅ Command successful.
````

_p.s_: keep your `collection-id` and `mint-id`

- verify your deployment
````bash
./sugar verify
````

output
````bash
[1/2] 🍬 Loading candy machine
▪▪▪▪▪ Completed

[2/2] 📝 Verification
Verifying 10 config line(s): (Ctrl+C to abort)
[00:00:01] Config line verification successful ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████ 10/10

Verification successful. You're good to go!

See your candy machine at:
  -> https://www.solaneyes.com/address/GngztwQ7z67VXFY6nWgzKBtWj2Q493E69cfpYenSBH2x?cluster=devnet

✅ Command successful.

````

_p.s_: go and check the url

- you can add some rules (guards) _**only in v3**_

````text
1) open config.json
2) "guards": {
    "default": {
        "mintLimit": {
            "id": 1,
            "limit": 1
        },
        "solPayment": {
            "value": 0.2,
            "destination": "GU6Bzn8iZNKrmAVHmYfLN2hzCk2LU9nHhozRYCTfrLMU"
        },
        "startDate": {
            "date": "2022-12-24T18:00:00Z"
        },
        "botTax": {
            "value": 0.01,
            "lastInstruction": true
        }
    }
}
````

now run them

````bash
./sugar guard add
````

output

````bash
[1/3] 🔍 Looking up candy machine

Candy machine ID: GngztwQ7z67VXFY6nWgzKBtWj2Q493E69cfpYenSBH2x

[2/3] 🛡  Initializing a candy guard
Signature: 617kc87L1h1VB6AhGbQYMbRzrVF1FEkPQiJQ34PyAUfiAwiysCGKHizRzRD1tiLWzsuHHY3w1w4zpZf3L9QeRyPx

Candy guard ID: 2KMovgE4NiVbwGcVghXh6d2Rp58T1QRC8jGarhXbtGyc

[3/3] 📦 Wrapping
Signature: 3fpShCeWsxKfyfLud4ykXGJhuiBcaTSDZVtNbbZno5FseR9KfHG8djBESX6sQnYf2dn4xHqynjpvQgtPLtj1UCHk

The candy guard is now the mint authority of the candy machine.

✅ Command successful.

````

view them

````bash
./sugar guard show
````

- let's create an `ui`
_p.s_: please install `nodejs` and `yarn`
_p.s_: use your own way to install them :)

````bash
git clone git@github.com:Solana-Studio/Candy-Machine-V3-UI.git ui

yarn install
cp examples.env .env
````

- now edit `.env`

````text
NEXT_PUBLIC_CANDY_MACHINE_ID=<your_candy_machine_id>
````

- hello marketplace
````bash
yarn dev
````