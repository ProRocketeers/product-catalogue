<script>
	import { onMount } from 'svelte'
	import Loader from '$lib/components/Loader.svelte'
	import ProductCard from '$lib/components/ProductCard.svelte'
	import { getApiUrl } from '$lib/config/api'

	/**
     * @type {any[]}
     */
	let products = []
	let loading = true

	onMount(async () => {
		console.log('Fetching products from backend...')
		try {
			const response = await fetch(getApiUrl('products'))
			if (!response.ok) {
				throw new Error('Failed to fetch products')
			}
			products = await response.json()
		} catch (e) {
			console.error('Error fetching products:', e)
		} finally {
			loading = false
		}
	})
</script>

<div>
	<div class="py-12 text-center" style="background-color: #F5F6FA;">
		<div class="container mx-auto px-6">
			<h1 class="text-4xl font-bold text-gray-900 mb-4">Produkt katalog</h1>
			<p class="text-lg text-gray-600">Nezjednoduší vám něco nabídky nástrojů a aplikací Pro Labs život?</p>
		</div>
	</div>

	<div class="container mx-auto px-6 py-12">

		{#if loading}
			<Loader />
		{:else}

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each products as product}
					<ProductCard {product} />
				{/each}
			</div>
		{/if}
	</div>
</div>
