<script lang="ts">
	export let product: {
		category?: string
		tags?: string[]
	}
</script>

<section class="pt-16 pb-16 text-white">
	<div class="container mx-auto px-6">
		<div>
			<h2 class="text-3xl lg:text-4xl font-bold mb-4">Jaké máme technologie<br/>pro raketový start?</h2>
			<p class="text-gray-300 leading-relaxed mb-8">
				Abychom naplno využili naše schopnosti, navrhujeme projekty v oblasti digitálních systémů a aplikací na míru. Využíváme jsme sestavení týmů vývojářů, kteří díky vzájemné spolupráci a zkušenostem dokáží zvládnout více práce za méně času.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<h3 class="font-semibold text-gray-200 mb-2">Kategorie</h3>
					<p class="text-gray-300">{product.category || 'Ostatní'}</p>
				</div>
				{#if product.tags && product.tags.length > 0}
					<div class="md:col-span-2">
						<h3 class="font-semibold text-gray-200 mb-2">Tagy</h3>
						<div class="flex flex-wrap gap-2">
							{#each product.tags as tag}
								<span class="px-3 py-1 bg-white/10 text-white rounded-full text-sm">
									{tag}
								</span>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
