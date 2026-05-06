export type FontAwesomeStyle = 'solid' | 'regular' | 'brands'
export type FontAwesomeStyleAlias = 's' | 'r' | 'b'
export type FontAwesomeRender = { className: string; style: string }

export const fontAwesomeStyleAliases: Record<string, FontAwesomeStyleAlias> = {
	'fa-solid': 's',
	fas: 's',
	'fa-regular': 'r',
	far: 'r',
	'fa-brands': 'b',
	fab: 'b',
}

export const fontAwesomeStyleClasses: Record<FontAwesomeStyleAlias, string> = {
	s: 'fa-solid',
	r: 'fa-regular',
	b: 'fa-brands',
}

export const ignoredFontAwesomeClasses = new Set([
	'fa',
	'fa-classic',
	'fa-fw',
	'fa-spin',
	'fa-pulse',
	'fa-beat',
	'fa-bounce',
	'fa-fade',
	'fa-flip',
	'fa-shake',
])

export function normalizeFontAwesomeIcon(icon: string) {
	const trimmedIcon = icon.trim()
	const compactMatch = trimmedIcon.match(/^([srb]):([a-z0-9-]+)$/)

	if (compactMatch) return trimmedIcon

	const classes = trimmedIcon.split(/\s+/).filter(Boolean)
	let style: FontAwesomeStyleAlias = 's'
	let iconName = ''

	for (const className of classes) {
		if (fontAwesomeStyleAliases[className]) {
			style = fontAwesomeStyleAliases[className]
			continue
		}

		if (className.startsWith('fa-') && !ignoredFontAwesomeClasses.has(className)) {
			iconName = className.replace('fa-', '')
		}
	}

	return iconName ? `${style}:${iconName}` : trimmedIcon
}

export function getFontAwesomeClass(icon: string) {
	return getFontAwesomeRender(icon).className
}

export function getFontAwesomeRender(icon: string): FontAwesomeRender {
	const normalizedIcon = normalizeFontAwesomeIcon(icon)
	const unicodeMatch = normalizedIcon.match(/^([srb]):([a-f0-9]{1,6})$/)

	if (unicodeMatch) {
		const [, style, unicode] = unicodeMatch as [string, FontAwesomeStyleAlias, string]

		return {
			className: fontAwesomeStyleClasses[style],
			style: `--fa: "\\${unicode}"`,
		}
	}

	const nameMatch = normalizedIcon.match(/^([srb]):([a-z0-9-]+)$/)

	if (nameMatch) {
		const [, style, name] = nameMatch as [string, FontAwesomeStyleAlias, string]

		return {
			className: `${fontAwesomeStyleClasses[style]} fa-${name}`,
			style: '',
		}
	}

	return {
		className: icon.startsWith('fa-') ? icon : '',
		style: '',
	}
}
