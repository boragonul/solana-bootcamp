import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { AnchorHelloFriends } from "../target/types/anchor_hello_friends";
import assert from "assert";

const { SystemProgram } = anchor.web3;

describe("anchor-hello-friends", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.AnchorHelloFriends as Program<AnchorHelloFriends>;

  let _messages: anchor.web3.Keypair;

  it("initialize the contract", async () => {
    const messages = anchor.web3.Keypair.generate();

    // call
    const tx = await program.rpc.initialize({
      accounts: {
        messages: messages.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [messages],
    });

    // find
    const messagesFound = await program.account.messages.fetch(
      messages.publicKey
    );

    assert.equal(messagesFound.count.toString(), "0");

    // keep messages
    _messages = messages;
  });

  it("access contract and say something", async () => {
    const message = "hello friends";
    const user = provider.wallet.publicKey;

    // before
    const messagesBefore = await program.account.messages.fetch(
      _messages.publicKey
    );
    const messagesCountBefore = messagesBefore.count;

    // call
    const tx = await program.rpc.say(message, {
      accounts: {
        messages: _messages.publicKey,
        user,
      },
    });

    // after
    const messagesAfter = await program.account.messages.fetch(
      _messages.publicKey
    );

    // assertions
    const messagesCountAfter = messagesAfter.count;
    assert.equal(messagesCountAfter.sub(messagesCountBefore).toString(), "1");

    
    const messageList = messagesAfter.list;
    assert.equal(messageList[0].message, message);
    assert.equal(messageList[0].user.equals(user), true);
    assert.equal(messageList[0].timestamp.gt(new anchor.BN(0)), true);
  });
});
