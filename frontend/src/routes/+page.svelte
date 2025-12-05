<script>
	import { onMount } from 'svelte'

	/**
     * @type {any[]}
     */
	let products = []
	let loading = true
	let error = ''

	onMount(async () => {
		console.log('Fetching products from backend...')
		try {
			const response = await fetch('http://localhost:3002/products')
			console.log('Response status:', response.status)
			if (!response.ok) {
				throw new Error('Failed to fetch products')
			}
			products = await response.json()
			console.log('Products loaded:', products.length)
		} catch (e) {
			error = e instanceof Error ? e.message : 'Unknown error'
			console.error('Error fetching products:', e)
		} finally {
			loading = false
		}
	})
</script>

<div class="min-h-screen bg-gray-50">
	<header class="bg-white border-b border-gray-200">
		<div class="container mx-auto px-6 py-4">
			<h1 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">PRODUKT KATALOG</h1>
		</div>
	</header>

	<div class="container mx-auto px-6 py-12">
		<div class="text-center mb-8">
			Produkt catalog title text
		</div>


		{#if loading}
			<div class="bg-white rounded-lg shadow-sm p-12 text-center">
				<p class="text-lg text-gray-600">Načítání produktů...</p>
			</div>
		{:else if error}
			<div class="bg-red-50 border border-red-200 rounded-lg p-12 text-center">
				<p class="text-lg text-red-600">Chyba: {error}</p>
			</div>
		{:else}

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each products as product}
					<div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
						<div class="flex items-start gap-4 mb-4">
							<div class="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
								{product.name}
							</div>
							<div class="flex-1 min-w-0">
								<h3 class="font-bold text-gray-900 mb-2">{product.name}</h3>
								<p class="text-sm text-gray-600">{product.description}</p>
							</div>
						</div>

						<div class="flex gap-2">
							{#if product.url}
								<a 
									href={product.url} 
									target="_blank" 
									rel="noopener noreferrer"
									class="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
								>
									DETAIL
								</a>
							{/if}
								<button
									class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
								>
								<a 
									href={product.id} 
									rel="noopener noreferrer"
								>
									INSTALOVAT
								</a>
								</button>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
