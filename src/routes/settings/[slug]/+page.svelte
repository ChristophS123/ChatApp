<script lang=ts>
	import { goto } from '$app/navigation';


    export let form;

    type Data = {
		chatID: string
	}

  export let data:Data;

  function goBack() {
    goto('/chat/' + data.chatID);
  }

</script>

<body>
    <header>
		<div class="p-4 text-center">
      <button on:click={goBack}>🡸</button>
			<h1 class="text-2xl font-bold">Einstellungen</h1>
		</div>
	</header>
  {#if form?.error}
		<p class="mt-8 mb-0">Dieser Benutzer hat keinen Account</p>
	{/if}
  <form method="POST" action="?/send" class="flex items-center p-4 mt-16">
    <input
      type="email"
      id="email"
      name="email"
      class="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring focus:border-blue-300"
      placeholder="Email eingeben..."
      required/>
    <button 
      name="submit"
      id="submit"
      type="submit"
      class="px-4 py-2 bg-gray-500 text-white rounded-r-lg hover:bg-gray-600 transition duration-300">
      Einladen
    </button>
  </form>
  <form class="mt-8" method="POST" action="?/leave">
    <button type="submit">Chat Verlassen</button>
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