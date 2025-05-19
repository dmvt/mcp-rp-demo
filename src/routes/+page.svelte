<script lang="ts">
	let count = 0;

	function increment() {
		count += 1;
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
		<h1 class="mb-6 text-center text-3xl font-bold text-gray-800">
			Welcome to SvelteKit with Tailwind
		</h1>

		<p class="mb-6 text-center text-gray-600">
			This is a sample component demonstrating Tailwind CSS styling.
		</p>

		<div class="flex flex-col items-center gap-4">
			<p class="text-xl font-semibold text-indigo-600">Count: {count}</p>

			<button
				on:click={increment}
				class="rounded-md bg-indigo-600 px-6 py-2 font-bold text-white transition-colors duration-200 hover:bg-indigo-700"
			>
				Increment
			</button>

			<a
				href="/items"
				class="mt-2 rounded-md bg-emerald-600 px-6 py-2 font-bold text-white transition-colors duration-200 hover:bg-emerald-700"
			>
				View Items (Supabase Example)
			</a>

			<a
				href="https://svelte.dev/docs/kit"
				target="_blank"
				class="mt-4 text-indigo-600 underline hover:text-indigo-800"
			>
				Learn more about SvelteKit
			</a>
		</div>
	</div>
</div>
