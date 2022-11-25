import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { AnchorHello } from "../target/types/anchor_hello";

describe("anchor-hello", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.AnchorHello as Program<AnchorHello>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
