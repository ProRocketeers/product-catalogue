<script lang="ts">
	import ProSvgIcon from './ProSvgIcon.svelte'

	export let feature: {
		title: string
		description: string
	}
</script>

<div class="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
	<div class="flex items-center gap-3 mb-3">
		<div class="w-6 h-6 flex items-center justify-center flex-shrink-0" style="color: #2196F3;">
			<ProSvgIcon name="light/right-from-bracket" size="20px" />
		</div>
		<h3 class="text-xl font-bold text-gray-900">{feature.title}</h3>
	</div>
	<p class="text-gray-600 leading-relaxed">{feature.description}</p>
</div>
