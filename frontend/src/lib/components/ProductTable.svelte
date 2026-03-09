<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	export let products: Array<{
		id: string
		name: string
		description: string
		extendedDescription?: string
		url: string
		icon?: string
		category?: string
		tags?: string[]
		heroImage?: string
		features?: Array<{ icon: string; title: string; description: string }>
		teamMembers?: Array<{ name: string; role: string; avatar?: string }>
		teamDescription?: string
	}> = []
	export let loading = false

	const dispatch = createEventDispatcher<{
		edit: typeof products[number]
		delete: typeof products[number]
	}>()
</script>

{#if loading}
	<div class="flex justify-center py-12">
		<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
	</div>
{:else if products.length === 0}
	<div class="text-center py-12 text-gray-500">
		<p class="text-lg">Žádné produkty</p>
		<p class="text-sm mt-1">Přidejte první produkt kliknutím na tlačítko výše</p>
	</div>
{:else}
	<div class="bg-white rounded-xl shadow-sm overflow-hidden">
		<table class="w-full">
			<thead class="bg-gray-50 border-b border-gray-200">
				<tr>
					<th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Produkt</th>
					<th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kategorie</th>
					<th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tagy</th>
					<th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tým</th>
					<th class="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Akce</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-100">
				{#each products as product}
					<tr class="hover:bg-gray-50 transition-colors">
						<td class="px-6 py-4">
							<div class="flex items-center gap-3">
								<div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
									{product.icon || product.name.charAt(0)}
								</div>
								<div>
									<div class="font-semibold text-gray-900">{product.name}</div>
									<div class="text-sm text-gray-500 truncate max-w-xs">{product.description || ''}</div>
								</div>
							</div>
						</td>
						<td class="px-6 py-4 text-sm text-gray-600">
							{product.category || '—'}
						</td>
						<td class="px-6 py-4">
							<div class="flex flex-wrap gap-1">
								{#each (product.tags || []).slice(0, 3) as tag}
									<span class="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{tag}</span>
								{/each}
								{#if (product.tags || []).length > 3}
									<span class="text-xs text-gray-400">+{(product.tags || []).length - 3}</span>
								{/if}
							</div>
						</td>
						<td class="px-6 py-4 text-sm text-gray-600">
							{(product.teamMembers || []).length} členů
						</td>
						<td class="px-6 py-4 text-right">
							<div class="flex justify-end gap-2">
								<button
									on:click={() => dispatch('edit', product)}
									class="px-3 py-1.5 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
								>
									Upravit
								</button>
								<button
									on:click={() => dispatch('delete', product)}
									class="px-3 py-1.5 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
								>
									Smazat
								</button>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
