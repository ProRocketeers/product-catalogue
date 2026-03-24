<script lang="ts">
	export let feature: {
		icon: string
		title: string
		description: string
	}
</script>

<div class="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
	<div class="text-4xl mb-4">{feature.icon}</div>
	<h3 class="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
	<p class="text-gray-600 leading-relaxed">{feature.description}</p>
</div>
