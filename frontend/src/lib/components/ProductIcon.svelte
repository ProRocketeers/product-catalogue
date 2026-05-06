<script lang="ts">
	import { getFontAwesomeRender } from '$lib/utils/fontawesome'

	export let icon = ''
	export let fallback = ''

	$: renderedIcon = getFontAwesomeRender(icon)
</script>

{#if renderedIcon.className}
	<i class={renderedIcon.className} style={renderedIcon.style} aria-hidden="true"></i>
{:else}
	{fallback}
{/if}
