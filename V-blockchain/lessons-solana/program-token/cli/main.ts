import {
    establishConnection,
    establishPayer,
    checkProgram,
    createToken,
    createTokenAccounts,
    mint,
    transfer
  } from './program';

  async function main() {
    console.log("Let's create a token...");

    // Establish connection to the cluster
    await establishConnection();

    // Determine who pays for the fees
    await establishPayer();

    // Check if the program has been deployed
    await checkProgram();

    // Create the master token
    await createToken();

    // Create two accounts to mint and receive tokens
    await createTokenAccounts();

    // mint some tokens to one of the two accounts
    await mint();

    // Send some tokens from the account that recieved the mint to the second account
    await transfer();

    console.log('Success');
  }

  main().then(
    () => process.exit(),
    err => {
      console.error(err);
      process.exit(-1);
    },
  );
