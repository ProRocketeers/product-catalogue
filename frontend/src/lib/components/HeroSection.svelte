<script lang="ts">
	import ProductIcon from './ProductIcon.svelte'

	export let product: {
		name: string
		description: string
		extendedDescription?: string
		url: string
		icon?: string
	}
	export let iconColor: string
</script>

<section class="bg-gradient-to-br from-[#0a1f44] to-[#1a3a6e] text-white py-20">
	<div class="container mx-auto px-6">
		<div class="flex flex-col lg:flex-row items-center gap-12">
			<div class="flex-1 space-y-6">
				<div class="flex items-center gap-4">
					<div class="{iconColor} w-20 h-20 rounded-xl flex items-center justify-center text-white font-bold text-3xl shadow-lg">
						<ProductIcon icon={product.icon || ''} fallback={product.icon || product.name.charAt(0)} />
					</div>
					<h1 class="text-4xl lg:text-5xl font-bold">{product.name}</h1>
				</div>
				
				<p class="text-lg text-gray-200 leading-relaxed max-w-2xl">
					{product.description}
				</p>

				{#if product.extendedDescription}
					<p class="text-gray-300 leading-relaxed max-w-2xl">
						{product.extendedDescription}
					</p>
				{/if}

				<div class="flex gap-4 pt-4">
					<a 
						href={product.url}
						target="_blank"
						rel="noopener noreferrer"
						class="px-6 py-3 bg-white text-blue-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold shadow-lg"
					>
						VYZKOUŠET
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
