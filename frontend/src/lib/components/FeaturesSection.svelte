<script lang="ts">
	import FeatureCard from './FeatureCard.svelte'
	
	export let features: Array<{
		title: string
		description: string
	}>
</script>

<section class="py-16 bg-white">
	<div class="container mx-auto px-6">
		<div class="text-center mb-12">
			<h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
				Hlavní funkce produktu
			</h2>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each features as feature}
				<FeatureCard {feature} />
			{/each}
		</div>
	</div>
</section>
