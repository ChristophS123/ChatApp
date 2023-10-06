<script>
	import { goto } from "$app/navigation";

	function goBack() {
		goto('/');
	}

</script>

<body class="mx-auto">
	<header>
		<div class="p-4 text-center">
			<button on:click={goBack}>←</button>
			<h1 class="text-2xl font-bold">Chat erstellen</h1>
		</div>
	</header>
	<form method="POST" action="?/create" class="mt-4 p-2 pb-8 m-6 rounded-lg pt-8 text-white bg-gray-400">
		<input
		  type="text"
		  name="name"
		  class="pl-10 pr-10 py-1 border rounded-md text-black focus:outline-none focus:ring focus:border-gray-400"
		  placeholder="Name des Chats"
		  required
		/>
		<button
		  type="submit"
		  class="mt-4 pr-24 pl-24 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 hover:text-white transition duration-300"
		>
		  Erstellen
		</button>
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