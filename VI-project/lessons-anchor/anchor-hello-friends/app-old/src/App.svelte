<script lang="ts">
	import { onMount } from "svelte";
	
	let wallet: any;
	let account = "";

	$: account && console.log(`Connected: ${account}`);

	const onLoad = async() => {
		const { solana } = window as any;
		wallet = solana;

		wallet.on("connect", () => (account = wallet.publicKey.toString()));
		wallet.on("disconnect", () => (account = ""));

		const resp = await wallet.connect({ onlyIfTrusted: true});
	};

	onMount(() => {
		window.addEventListener("load", onLoad);

		return () => window.removeEventListener("load", onLoad);
	});

	const handleConnect = async() => {
		const resp = await wallet.connect();
	};
	
</script>

<main>
	<h1>Hello Friends :)</h1>
	{#if account}
		<h3>Your wallet:</h3>
		<p>{account}</p>		
	{:else if wallet} 
		{#if wallet.isPhantom}
		<h2>Phantom found !</h2>
		<button on:click="{handleConnect}">Connect to Wallet</button>
		{:else}
		<h2>Solana wallet found but not supported !</h2>
		{/if}
	{:else}
		<h2>Solana wallet not found !</h2>
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