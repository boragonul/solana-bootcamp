;const anchor = require('@project-serum/anchor');
const provider = anchor.AnchorProvider.local();

anchor.setProvider(provider);
const args = require('minimist')(process.argv.slice(2));

async function main() {
    const idl = JSON.parse(
        require("fs").readFileSync("../target/idl/anchor_hello.json", "utf-8")
    );

    const programId = new anchor.web3.PublicKey(args['program']);
    const name = args['name'] || "Bora Gönül";

    const program = new anchor.Program(idl, programId);

    const helloAccount = anchor.web3.Keypair.generate();

    console.log('Hello Account => public key:' + helloAccount.publicKey)
    console.log('User Account  => public key:' + provider.wallet.publicKey);

    let tx = await program.rpc.execute(name, {
        accounts: {
            helloAccount: helloAccount.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId
        },
        options: { commitment: "confirmed" },
        signers: [helloAccount]
    });

    console.log("fetching => tx ...")
    let t = await provider.connection.getConfirmedTransaction(tx, "confirmed");
    console.log(t.meta.logMessages);

    console.log("fetching => details ...")
    const storedName = await program.account.helloAccount.fetch(helloAccount.publicKey);
    console.log(storedName.name);

}

console.log("running...")
main().then(() => console.log("success"));
