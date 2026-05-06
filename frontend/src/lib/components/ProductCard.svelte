<script lang="ts">
	import ProductIcon from './ProductIcon.svelte'

	export let product: {
		id: number
		name: string
		description: string
		url: string
		icon?: string
	}

	function getIconColor(name: string): string {
		const firstLetter = name.charAt(0).toUpperCase()
		const colors: Record<string, string> = {
			'W': 'bg-blue-500',
			'M': 'bg-orange-500',
			'O': 'bg-cyan-500',
			'P': 'bg-pink-500',
			'D': 'bg-gray-600',
			'G': 'bg-gray-700',
			'U': 'bg-purple-500',
			'Q': 'bg-teal-500'
		}
		return colors[firstLetter] || 'bg-indigo-500'
	}

	$: iconColor = getIconColor(product.name)
</script>

<div class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full">
	<div class="flex items-start gap-4 mb-4 flex-1">
		<div class="{iconColor} w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
			<ProductIcon icon={product.icon || ''} fallback={product.icon || product.name.charAt(0)} />
		</div>
		<div class="flex-1 min-w-0">
			<h3 class="font-bold text-gray-900 mb-2">{product.name}</h3>
			<p class="text-sm text-gray-600">{product.description}</p>
		</div>
	</div>

	<div class="flex gap-2 mt-auto">
		<a 
			href={`/detail/${product.id}`}
			class="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
		>
			DETAIL
		</a>
		<a 
			href={product.url} 
			target="_blank"
			rel="noopener noreferrer"
			class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors text-center"
		>
			VYZKOUŠET
		</a>
	</div>
</div>
