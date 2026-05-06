<script lang="ts">
	export let name: string
	export let size = '1em'

	const ICON_NAME_PATTERN = /^[a-z0-9/-]+$/
	const CSS_SIZE_PATTERN = /^(\d+(\.\d+)?(px|rem|em|%)|1em)$/

	function sanitizeIconName(value: string) {
		return ICON_NAME_PATTERN.test(value) ? value : ''
	}

	function sanitizeSize(value: string) {
		return CSS_SIZE_PATTERN.test(value) ? value : '1em'
	}

	$: safeName = sanitizeIconName(name)
	$: safeSize = sanitizeSize(size)
	$: src = safeName ? `/icons/fa-pro/${safeName}.svg` : ''
	$: maskStyle = `width: ${safeSize}; height: ${safeSize}; background-color: currentColor; mask: url('${src}') center / contain no-repeat; -webkit-mask: url('${src}') center / contain no-repeat;`
</script>

<span class="inline-block align-[-0.125em]" style={maskStyle} aria-hidden="true"></span>
