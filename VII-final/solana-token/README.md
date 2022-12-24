# how to create a token

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


- install [rust](https://www.rust-lang.org/tools/install)

````bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
````

_p.s_: Please update your PATH environment variable to include the `rust`

````bash
rustc --version
````

- let's install [solana token program](https://spl.solana.com/token)
_p.s_: i prefer the command-line-interface
````bash
cargo install spl-token-cli
spl-token --help
````

- check the configuration (shares with `solana`)
````bash
solana config get
````

- create a token (same with ERC20)
_p.s_: we already have a wallet ! please see `solana-nft` first

````bash
spl-token create-token
````

_p.s_: how much did you pay for it ?
_p.s_: `solana balance GU6Bzn8iZNKrmAVHmYfLN2hzCk2LU9nHhozRYCTfrLMU`

output

````bash
Creating token HQgqNxq6XqGi3uUh1TitLWUzHepRwq3SpJDcssVKutoN under program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA

Address:  HQgqNxq6XqGi3uUh1TitLWUzHepRwq3SpJDcssVKutoN
Decimals:  9

Signature: 3Bypus1AzfcGBfG7Lky62cvkP4KtiBvckHGLYq3LQYXbqJ53ZqbMA2QWNvzNqW6VZEPVgJQhBRp8GhmNdjah1qWU
````

done ! thank you `spl-token`
nooo ! you have to `mint`, but first remember how `solana` works

- create an account to `hold` state of tokens
````bash
spl-token create-account HQgqNxq6XqGi3uUh1TitLWUzHepRwq3SpJDcssVKutoN
````

_p.s_: how much did you pay for it ?
_p.s_: `solana balance GU6Bzn8iZNKrmAVHmYfLN2hzCk2LU9nHhozRYCTfrLMU`

output
````bash
Creating account 3QG8ss3fu9zAVsMbxT6jd7CwEFxqW7Di2ZxAdVXz3YXi

Signature: 3Cr1oFrKHoAsKhtkBbMdfBQpe6bG6DeE8j5zAcVSZbYBVRv3U8S6fXt7VMKBUKJ42wESFDmtPLgr8Cnp2HQCrT61
````

-- now we can `mint` 
_p._s: we are sending to `creator` account address from `solana-nft` sample
````bash
spl-token mint HQgqNxq6XqGi3uUh1TitLWUzHepRwq3SpJDcssVKutoN 5000
````

output
_p.s_: where did they go ? recipient: 3QG8ss3fu9zAVsMbxT6jd7CwEFxqW7Di2ZxAdVXz3YXi
_p.s_: `to address we created to hold this token` !!
_p.s_: how much did you pay for it ?
_p.s_: `solana balance GU6Bzn8iZNKrmAVHmYfLN2hzCk2LU9nHhozRYCTfrLMU`


````bash
Minting 5000 tokens
  Token: HQgqNxq6XqGi3uUh1TitLWUzHepRwq3SpJDcssVKutoN
  Recipient: 3QG8ss3fu9zAVsMbxT6jd7CwEFxqW7Di2ZxAdVXz3YXi

Signature: 5xh4qMZU4HEGQVqYerHYPFmN6RNK4MhjMVCEPXQpjzUCDP8rWYBuZJM5TxW9CAfd9u4fBHYeb6xpxfMuP78sDk61
````

- check your tokens
_p.s_: who owns them ? account: HQgqNxq6XqGi3uUh1TitLWUzHepRwq3SpJDcssVKutoN
_p.s_: why doesn't recipient own them ? recipient: 3QG8ss3fu9zAVsMbxT6jd7CwEFxqW7Di2ZxAdVXz3YXi

````bash
spl-token balance HQgqNxq6XqGi3uUh1TitLWUzHepRwq3SpJDcssVKutoN
````

- how do we limit max ???
_p.s_: for economics you know to whom you should go (Tansel Hoca)

````bash
spl-token mint HQgqNxq6XqGi3uUh1TitLWUzHepRwq3SpJDcssVKutoN 5000
spl-token mint HQgqNxq6XqGi3uUh1TitLWUzHepRwq3SpJDcssVKutoN 4999

spl-token authorize HQgqNxq6XqGi3uUh1TitLWUzHepRwq3SpJDcssVKutoN mint --disable
spl-token mint HQgqNxq6XqGi3uUh1TitLWUzHepRwq3SpJDcssVKutoN 1 # nope doesn't work anymore
````

- see details

````bash
spl-token account-info HQgqNxq6XqGi3uUh1TitLWUzHepRwq3SpJDcssVKutoN               
````

output

````bash
SPL Token Account
  Address: 3QG8ss3fu9zAVsMbxT6jd7CwEFxqW7Di2ZxAdVXz3YXi
  Program: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
  Balance: 14999
  Decimals: 9
  Mint: HQgqNxq6XqGi3uUh1TitLWUzHepRwq3SpJDcssVKutoN
  Owner: GU6Bzn8iZNKrmAVHmYfLN2hzCk2LU9nHhozRYCTfrLMU
  State: Initialized
  Delegation: (not set)
  Close authority: (not set)
````

- what about burning tokens
_p.s_: why need recipient address now ?

````bash
spl-token burn 3QG8ss3fu9zAVsMbxT6jd7CwEFxqW7Di2ZxAdVXz3YXi 9
````
_p.s_: i cant mint anymore but burned them
_p.s_: check again `spl-token account-info HQgqNxq6XqGi3uUh1TitLWUzHepRwq3SpJDcssVKutoN`

output

````bash
Burn 9 tokens
  Source: 3QG8ss3fu9zAVsMbxT6jd7CwEFxqW7Di2ZxAdVXz3YXi

Signature: 3sutVmY5Aakv6Fn3pC7aR39x3xqsrKb7PshhooGQXztJCJTeJ44iXoirCP6Xi1DYFLW6BaXK8ApbKxYjL96baZjN
````

- how to send them to someone ?
_p.s_: let's try to send `creator` from `solana-nft` demo

````bash
spl-token transfer --fund-recipient HQgqNxq6XqGi3uUh1TitLWUzHepRwq3SpJDcssVKutoN 1000 6hwuoyLEtJHWPxwyEutA8dmwkPDpkczPUaEfo3sJkYWv
````
_p.s_: created an account for him `2jJQ8qd7PEMRGTRrneXFqyRUuynypBLVdeeJHYWcuWQb`
_p.s_: what is your balance ?
_p.s_: `spl-token balance HQgqNxq6XqGi3uUh1TitLWUzHepRwq3SpJDcssVKutoN`

output

````bash
Transfer 1000 tokens
  Sender: 3QG8ss3fu9zAVsMbxT6jd7CwEFxqW7Di2ZxAdVXz3YXi
  Recipient: 6hwuoyLEtJHWPxwyEutA8dmwkPDpkczPUaEfo3sJkYWv
  Recipient associated token account: 2jJQ8qd7PEMRGTRrneXFqyRUuynypBLVdeeJHYWcuWQb
  Funding recipient: 2jJQ8qd7PEMRGTRrneXFqyRUuynypBLVdeeJHYWcuWQb

Signature: ruraqErCNXzqcxJVF7Tf3uyVKJTFR6JZvQvwwkCD6ta71g32m57qX4aRSXGMqum8FAqEvhKy5fkhS1dMu3nuJ7Y
````
