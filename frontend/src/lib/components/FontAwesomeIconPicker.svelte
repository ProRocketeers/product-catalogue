<script context="module" lang="ts">
	import fontAwesomeCss from '@fortawesome/fontawesome-free/css/all.min.css?raw'

	type CachedIconOption = { name: string; value: string; className: string; style: string; nameValue: string }

	let cachedFontAwesomeIcons: CachedIconOption[] | null = null

	const FONT_AWESOME_SHEET_PATTERN = /fontawesome|font-awesome|fa-(solid|regular|brands|all)/i
	const CSS_ICON_RULE_PATTERN = /([^{}]+)\{[^{}]*--fa:\s*"\\([a-f0-9]{1,6})\s?"[^{}]*\}/gi
	const CSS_STYLE_RULE_PATTERN = /([^{}]+)\{[^{}]*--fa-style\s*:\s*(400|900)[^{}]*\}/gi
</script>

<script lang="ts">
	import { onMount } from 'svelte'
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton'
	import {
		getFontAwesomeRender,
		ignoredFontAwesomeClasses,
		normalizeFontAwesomeIcon,
		type FontAwesomeStyle,
		type FontAwesomeStyleAlias,
	} from '$lib/utils/fontawesome'

	export let value = ''
	export let id = 'fontawesome-icon-picker'
	export let label = 'Ikona'

	type IconOption = CachedIconOption

	const styleToAlias: Record<FontAwesomeStyle, FontAwesomeStyleAlias> = {
		solid: 's',
		regular: 'r',
		brands: 'b',
	}

	let isOpen = false
	let search = ''
	let icons: IconOption[] = []
	let hasLoadedIcons = false
	type StyleMarker = { index: number; style: FontAwesomeStyle }

	onMount(() => {
		icons = getFontAwesomeIcons()
		hasLoadedIcons = true
		value = getPickerValue(value)
	})

	function getIconCode(faValue: string) {
		return faValue.match(/\\([a-f0-9]{1,6})\s?/i)?.[1]?.toLowerCase() ?? ''
	}

	function getStyleMarkers(rules: CSSStyleRule[]): StyleMarker[] {
		return rules.flatMap<StyleMarker>((rule, index) => {
			if (!rule.style.getPropertyValue('--fa-style')) return []

			const selector = rule.selectorText
			if (selector.includes('.fa-brands') || selector.includes('.fab')) return [{ index, style: 'brands' }]
			if (selector.includes('.fa-regular') || selector.includes('.far')) return [{ index, style: 'regular' }]
			if (selector.includes('.fa-solid') || selector.includes('.fas')) return [{ index, style: 'solid' }]

			return []
		})
	}

	function getRuleStyle(ruleIndex: number, markers: StyleMarker[]) {
		return markers.findLast((marker) => marker.index < ruleIndex)?.style ?? 'solid'
	}

	function getCssStyleMarkers(css: string): StyleMarker[] {
		return Array.from(css.matchAll(CSS_STYLE_RULE_PATTERN)).flatMap<StyleMarker>((match) => {
			const selector = match[1]
			const index = match.index ?? 0

			if (selector.includes('.fa-brands') || selector.includes('.fab')) return [{ index, style: 'brands' }]
			if (selector.includes('.fa-regular') || selector.includes('.far')) return [{ index, style: 'regular' }]
			if (selector.includes('.fa-solid') || selector.includes('.fas')) return [{ index, style: 'solid' }]

			return []
		})
	}

	function getIconOptionsFromCss(css: string) {
		const iconMap = new Map<string, IconOption>()
		const styleMarkers = getCssStyleMarkers(css)

		for (const match of css.matchAll(CSS_ICON_RULE_PATTERN)) {
			const selector = match[1]
			const code = match[2].toLowerCase()
			const ruleStyle = getRuleStyle(match.index ?? 0, styleMarkers)

			for (const selectorPart of selector.split(',')) {
				const iconClass = selectorPart.trim().match(/^\.([a-z0-9-]+)$/)?.[1]
				if (!iconClass || !iconClass.startsWith('fa-') || ignoredFontAwesomeClasses.has(iconClass)) continue

				const name = iconClass.replace('fa-', '')
				const value = `${styleToAlias[ruleStyle]}:${code}`
				iconMap.set(value, {
					name,
					value,
					className: `fa-${ruleStyle}`,
					style: `--fa: "\\${code}"`,
					nameValue: `${styleToAlias[ruleStyle]}:${name}`,
				})
			}
		}

		return Array.from(iconMap.values()).sort((a, b) => a.name.localeCompare(b.name))
	}

	function getAccessibleStyleRules(sheet: CSSStyleSheet) {
		try {
			return Array.from(sheet.cssRules).filter((rule): rule is CSSStyleRule => rule instanceof CSSStyleRule)
		} catch {
			return []
		}
	}

	function isFontAwesomeSheet(sheet: CSSStyleSheet, rules: CSSStyleRule[]) {
		if (sheet.href && FONT_AWESOME_SHEET_PATTERN.test(sheet.href)) return true

		return rules.some((rule) => {
			const selector = rule.selectorText
			return selector.includes('.fa-') && (
				rule.style.getPropertyValue('--fa')
				|| rule.style.getPropertyValue('--fa-style')
				|| rule.style.getPropertyValue('--fa-family')
			)
		})
	}

	function getFontAwesomeIcons() {
		if (cachedFontAwesomeIcons) return cachedFontAwesomeIcons

		cachedFontAwesomeIcons = getIconOptionsFromCss(fontAwesomeCss)
		if (cachedFontAwesomeIcons.length > 0) return cachedFontAwesomeIcons

		const iconMap = new Map<string, IconOption>()

		for (const sheet of Array.from(document.styleSheets)) {
			const styleRules = getAccessibleStyleRules(sheet)
			if (!isFontAwesomeSheet(sheet, styleRules)) continue

			const styleMarkers = getStyleMarkers(styleRules)

			for (const [ruleIndex, rule] of styleRules.entries()) {
				const selector = rule.selectorText
				const ruleStyle = getRuleStyle(ruleIndex, styleMarkers)

				const faValue = rule.style.getPropertyValue('--fa')
				if (!faValue) continue

				const code = getIconCode(faValue)
				if (!code) continue

				for (const selectorPart of selector.split(',')) {
					const iconClass = selectorPart.trim().match(/^\.([a-z0-9-]+)$/)?.[1]
					if (!iconClass || !iconClass.startsWith('fa-') || ignoredFontAwesomeClasses.has(iconClass)) continue

					const name = iconClass.replace('fa-', '')
					const value = `${styleToAlias[ruleStyle]}:${code}`
					iconMap.set(value, {
						name,
						value,
						className: `fa-${ruleStyle}`,
						style: `--fa: "\\${code}"`,
						nameValue: `${styleToAlias[ruleStyle]}:${name}`,
					})
				}
			}
		}

		cachedFontAwesomeIcons = Array.from(iconMap.values()).sort((a, b) => a.name.localeCompare(b.name))

		return cachedFontAwesomeIcons
	}

	function getPickerValue(iconValue: string) {
		const normalizedIcon = normalizeFontAwesomeIcon(iconValue)
		if (/^[srb]:[a-f0-9]{1,6}$/.test(normalizedIcon)) return normalizedIcon

		return icons.find((icon) => icon.nameValue === normalizedIcon)?.value ?? iconValue
	}

	function selectIcon(iconValue: string) {
		value = iconValue
		search = ''
		isOpen = false
	}

	function togglePicker() {
		isOpen = !isOpen
		if (isOpen) {
			value = getPickerValue(value)
			search = ''
		}
	}

	function clearIcon() {
		value = ''
		search = ''
		isOpen = false
	}

	$: normalizedValue = getPickerValue(value)
	$: previewIcon = getFontAwesomeRender(normalizedValue)
	$: searchTerm = search.trim().toLowerCase()
	$: filteredIcons = icons.filter((icon) => !searchTerm || icon.value.includes(searchTerm) || icon.name.includes(searchTerm))
	$: iconEmptyMessage = hasLoadedIcons ? 'Ikony se nepodařilo načíst.' : 'Načítám ikony…'
</script>

<svelte:window on:keydown={(event) => event.key === 'Escape' && isOpen && (isOpen = false)} />

<div class="relative">
	<label for={id} class="block text-sm font-medium text-gray-700 mb-1">{label}</label>
	<div class="flex items-center gap-2">
		<button
			id={id}
			type="button"
			class="w-14 h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white hover:bg-gray-50 transition-colors text-gray-800 flex items-center justify-center"
			on:click={togglePicker}
			aria-haspopup="listbox"
			aria-expanded={isOpen}
			title={value || 'Vybrat FontAwesome ikonu'}
		>
			<i class={previewIcon.className || 'fa-solid fa-icons'} style={previewIcon.style}></i>
		</button>
		<span class="flex-1"></span>
		{#if value}
			<button
				type="button"
				class="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
				on:click={clearIcon}
			>
				Vymazat
			</button>
		{/if}
	</div>

	{#if isOpen}
		<div
			class="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-xl p-3"
			role="dialog"
			aria-label="Výběr FontAwesome ikony"
		>
			<input
				type="search"
				bind:value={search}
				placeholder="Hledat ikonu…"
				class="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
			/>

			<div class="max-h-72 overflow-y-auto pr-1">
				{#if filteredIcons.length > 0}
					<ListBox
						spacing="grid grid-cols-6 sm:grid-cols-8 gap-2"
						active="border-blue-500 bg-blue-50"
						hover="hover:border-blue-300 hover:bg-blue-50"
						padding="p-0"
						regionDefault="flex-none"
						labelledby={id}
					>
						{#each filteredIcons as icon}
							<ListBoxItem
								group={normalizedValue}
								name={`${id}-option`}
								value={icon.value}
								class="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors"
								on:change={() => selectIcon(icon.value)}
								aria-label={icon.name}
								title={icon.name}
							>
								<i class={icon.className} style={icon.style}></i>
							</ListBoxItem>
						{/each}
					</ListBox>
				{:else if !searchTerm}
					<p class="text-sm text-gray-500 text-center py-8">{iconEmptyMessage}</p>
				{:else}
					<p class="text-sm text-gray-500 text-center py-8">Žádné ikony neodpovídají hledání.</p>
				{/if}
			</div>
		</div>
	{/if}
</div>
