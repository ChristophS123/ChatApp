<script>
	import { goto } from '$app/navigation';

	export let form;

	function loadSignInPage() {
		goto('/signin');
	}

</script>

<body class="mx-auto">
	<header>
		<div class="p-4 text-center">
			<h1 class="text-2xl font-bold">Registrieren</h1>
		</div>
	</header>
</body>

<form method="POST" action="?/signup" class="mt-4 p-2 pb-8 m-6 rounded-lg pt-8 text-white bg-gray-400">
	{#if form?.error}
		<p class="mt-3 p-2">Fehler bei beim registrieren</p>
	{/if}
	{#if form?.signup}
		<p class="mt-3 p-2">Erfolgreich registriert. Du kannst dich nun anmelden</p>
	{/if}
	<input
	  type="text"
	  name="name"
	  class="pl-10 pr-10 py-1 border rounded-md text-black focus:outline-none focus:ring focus:border-gray-400"
	  placeholder="Name"
	  required
	/>
	<br/>
	<input
	  type="text"
	  name="email"
	  class="mt-5 pl-10 pr-10 py-1 border rounded-md text-black focus:outline-none focus:ring focus:border-gray-400"
	  placeholder="Email"
	  required
	/>
	<br/>
	<input
	  type="password"
	  name="password"
	  class="mt-5 pl-10 pr-10 py-1 border rounded-md text-black focus:outline-none focus:ring focus:border-gray-400"
	  placeholder="Passwort"
	  required
	/>
	<br/>
	<button
	  type="submit"
	  class="mt-8 pr-24 pl-24 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 hover:text-white transition duration-300"
	>
	  Registrieren
	</button>
	<p class="mt-8">
		Du hast bereits ein Konto? <b><button on:click={loadSignInPage}>*Anmelden</button></b>
	</p>
</form>

<style>
	header {
		background-color: #100b1f;
		padding-top: 24px;
		color:white;
		padding-bottom: 24px;
	}

	body {
		text-align: center;
	}

	
</style>
