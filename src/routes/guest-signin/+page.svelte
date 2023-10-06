<script lang=ts>
	import { goto } from '$app/navigation';

	export let form;

	function loadSignUpPage() {
		goto('/signup')
	}

</script>

<body>
	<header>
		<div class="p-4 text-center">
			<h1 class="text-2xl font-bold">Gast Login</h1>
		</div>
	</header>

<form method="POST" action="?/signup" class="mt-4 p-2 pb-8 m-6 rounded-lg pt-8 text-white bg-gray-400">
	<input
	  type="text"
	  name="name"
	  class="pl-10 pr-10 py-1 border rounded-md text-black focus:outline-none focus:ring focus:border-gray-400"
	  placeholder="Gebe einen Namen ein..."
	  required
	/>
	<br/>
	<button
	  type="submit"
	  class="mt-8 pr-24 pl-24 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 hover:text-white transition duration-300"
	>
	  Gast Login
	</button>
	<p class="mt-8">
		Konto erstellen? <b><button on:click={loadSignUpPage}>*Registrieren</button></b>
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
