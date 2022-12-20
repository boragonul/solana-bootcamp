<script lang="ts">
	import { onMount } from "svelte";
	import * as idlJson from "../lib/anchor_hello_friends.json";
	import { Connection, PublicKey } from "@solana/web3.js";
	import type { Idl } from "@project-serum/anchor";
	import {
		AnchorProvider,
		Program,
		web3,
	} from "@project-serum/anchor";
	import type { AnchorHelloFriends } from "$lib/anchor_hello_friends";
	const { SystemProgram, Keypair } = web3;

	// ------------------------------
	// state (wallet, account)
	// ------------------------------
	let wallet: any;
	let account = "";

	$: account && console.log(`Connected: ${account}`);

	const onLoad = async () => {
		const { solana } = window as any;
		wallet = solana;

		wallet.on("connect", () => (account = wallet.publicKey.toString()));
		wallet.on("disconnect", () => (account = ""));

		const resp = await wallet.connect({ onlyIfTrusted: true });
	};

	onMount(async () => {
		window.addEventListener("load", onLoad);

		return () => window.removeEventListener("load", onLoad);
	});

	const handleConnect = async () => {
		const resp = await wallet.connect();
	};

	// ------------------------------
	// connection (program, provider)
	// ------------------------------
	const programID = new PublicKey(idlJson.metadata.address);
	console.log(programID);
	const network = "http://127.0.0.1:8899";
	const connection = new Connection(network, "confirmed");

	const getProvider = () => {
		const provider = new AnchorProvider(connection, wallet, {
			preflightCommitment: "confirmed",
		});
		return provider;
	};

	const getProgram = () => {
		const program = new Program(
			idlJson as Idl,
			programID,
			getProvider()
		);
		console.log("Program: " + program)
		return program;
	};
	// ------------------------------
	// account (initialize, load)
	// ------------------------------
	let messagesPublicKey: any;
	let messagesPublicKeyInput = "";

	const initialize = async () => {
		const provider = getProvider();
		const program = getProgram();
		const messages = Keypair.generate();
		Keypair;

		await program.rpc.initialize({
			accounts: {
				messages: messages.publicKey,
				user: provider.wallet.publicKey,
				systemProgram: SystemProgram.programId,
			},
			signers: [messages],
		});
		messagesPublicKey = messages.publicKey;
		console.log("New Messages:", messagesPublicKey.toString());

		await fetchMessageList();
	};

	const load = async () => {
		messagesPublicKey = new PublicKey(messagesPublicKeyInput);
		console.log("Loaded Messages:", messagesPublicKey.toString());
		await fetchMessageList();
	};

	// ------------------------------
	// state (ui)
	// ------------------------------
	let messageList: any = [];
	let message = "";

	// ------------------------------
	// program
	// ------------------------------
	const fetchMessageList = async () => {
		const program = getProgram();
		const account = await program.account.messages.fetch(messagesPublicKey);
		console.log("Got the account", account);
		messageList = account.list as any[];
	};

	const say = async () => {
		const provider = getProvider();
		const program = getProgram();
		await program.rpc.say(message, {
			accounts: {
				messages: messagesPublicKey,
				user: provider.wallet.publicKey,
			},
		});
		console.log("Say called with: ", message);
		message = "";
		await fetchMessageList();
	};
	$: console.log("messageList:", messageList);
	$: console.log("messagesPublicKey:", messagesPublicKey);
</script>

<main>
	<h1>Hello Friends :)</h1>

	<!-- prepare -->
	{#if account}
		<h3>Your wallet:</h3>
		<p>{account}</p>
	{:else if wallet}
		{#if wallet.isPhantom}
			<h2>Phantom found !</h2>
			<button on:click={handleConnect}>Connect to Wallet</button>
		{:else}
			<h2>Solana wallet found but not supported !</h2>
		{/if}
	{:else}
		<h2>Solana wallet not found !</h2>
	{/if}

	<!-- view -->
	{#if account}
	{#if !messagesPublicKey}
	<button on:click={initialize}>Initialize</button>
	or
	<input
		type="text"
		placeholder="use existing ..."
		bind:value={messagesPublicKeyInput}
	/>
	<button on:click={load}>Load</button>
	{:else}
	Using messages: {messagesPublicKey.toString()}
	{/if}
{/if}

{#if messagesPublicKey}
	<div>
	<h3>Message List:</h3>
	<ul>
		{#each messageList as messageItem}
		<li>
			<b>{messageItem.message}</b>, said {messageItem.user.toString().slice(0, 6)}... at {new Date(
			messageItem.timestamp.toNumber() * 1000
			).toLocaleTimeString()}
		</li>
		{/each}
	</ul>
	<button on:click={fetchMessageList}>Refresh!</button>
	</div>

	<div>
	<h3>Say something:</h3>
	<input
		type="text"
		placeholder="write something..."
		bind:value={message}
	/>
	<button on:click={say} disabled={!message}>Say !</button>
	</div>
{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: red;
		font-size: 4em;
		font-weight: 100;
	}
</style>
