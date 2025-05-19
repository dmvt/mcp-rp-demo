<script lang="ts">
	import { onMount } from 'svelte';

	interface Item {
		id: number;
		name: string;
		description: string;
	}

	let items: Item[] = [];
	let loading = true;
	let error = false;

	onMount(async () => {
		try {
			const response = await fetch('/api/items');
			if (!response.ok) {
				throw new Error('Failed to fetch items');
			}
			items = await response.json();
		} catch (e) {
			console.error('Error fetching items:', e);
			error = true;
		} finally {
			loading = false;
		}
	});
</script>

<div class="min-h-screen bg-gray-100 p-6">
	<div class="mx-auto max-w-4xl">
		<h1 class="mb-6 text-3xl font-bold text-gray-800">Items List (Supabase Example)</h1>

		{#if loading}
			<div class="flex justify-center rounded-lg bg-white p-6 shadow-md">
				<p class="text-gray-600">Loading items...</p>
			</div>
		{:else if error}
			<div class="rounded-lg border border-red-200 bg-red-50 p-6">
				<p class="text-red-600">Failed to load items. Please try again later.</p>
			</div>
		{:else if items.length === 0}
			<div class="rounded-lg bg-white p-6 shadow-md">
				<p class="text-gray-600">No items found.</p>
			</div>
		{:else}
			<div class="grid gap-4 md:grid-cols-2">
				{#each items as item (item.id)}
					<div
						class="rounded-lg bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg"
					>
						<h2 class="mb-2 text-xl font-semibold text-gray-800">{item.name}</h2>
						<p class="text-gray-600">{item.description}</p>
					</div>
				{/each}
			</div>
		{/if}

		<div class="mt-6">
			<a
				href="/"
				class="inline-block rounded-md bg-indigo-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-indigo-700"
			>
				Back to Home
			</a>
		</div>
	</div>
</div>
