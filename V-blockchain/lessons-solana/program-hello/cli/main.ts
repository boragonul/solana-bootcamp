import {
    establishConnection,
    establishPayer,
    checkProgram,
    sayHello,
    reportHello,
  } from './program';

  async function main() {
    console.log("Let's say Hello anon...");

    // Establish connection to the cluster
    await establishConnection();

    // Determine who pays for the fees
    await establishPayer();

    // Check if the program has been deployed
    await checkProgram();

    // Say hello to an account
    await sayHello();

    // Find out how many times that account has been greeted
    await reportHello();

    console.log('Success');
  }

  main().then(
    () => process.exit(),
    err => {
      console.error(err);
      process.exit(-1);
    },
  );