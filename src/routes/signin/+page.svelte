<script lang=ts>
	import { goto } from '$app/navigation';

	export let form;

	function loadSignUpPage() {
		goto('/signup')
	}

</script>

<body class="mx-auto">
	<header>
		<div class="p-4 text-center">
			<h1 class="text-2xl font-bold">Anmelden</h1>
		</div>
	</header>

<form method="POST" action="?/signin" class="mt-4 p-2 pb-8 m-6 rounded-lg pt-8 text-white bg-gray-400">
	{#if form?.error}
		<p>Fehler bei der Anmeldung</p>
	{/if}
	<input
	  type="text"
	  name="email"
	  class="pl-10 pr-10 py-1 border rounded-md text-black focus:outline-none focus:ring focus:border-gray-400"
	  placeholder="Email"
	  required
	/>
	<br/>
	<input
	  type="password"
	  name="password"
	  class="mt-3 pl-10 pr-10 py-1 border rounded-md text-black focus:outline-none focus:ring focus:border-gray-400"
	  placeholder="Passwort"
	  required
	/>
	<br/>
	<button
	  type="submit"
	  class="mt-8 pr-24 pl-24 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 hover:text-white transition duration-300"
	>
	  Erstellen
	</button>
	<p class="mt-8">
		Du hast noch kein Konto? <b><button on:click={loadSignUpPage}>*Registrieren</button></b>
	</p>
  </form>

	

</body>

<style>
	header {
		background-color: #100b1f;
		padding-top: 24px;
		color:white;
		padding-bottom: 24px;
	}

	body {
		text-align: center;
		max-width: 800px;
	}

	
</style>
