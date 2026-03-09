<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	export let value = ''

	const dispatch = createEventDispatcher<{ change: string }>()

	const options: Record<string, string[]> = {
		topType: [
			'NoHair', 'Eyepatch', 'Hat', 'Hijab', 'Turban', 'WinterHat1', 'WinterHat2',
			'WinterHat3', 'WinterHat4', 'LongHairBigHair', 'LongHairBob', 'LongHairBun',
			'LongHairCurly', 'LongHairCurvy', 'LongHairDreads', 'LongHairFrida',
			'LongHairFro', 'LongHairFroBand', 'LongHairNotTooLong', 'LongHairShavedSides',
			'LongHairMiaWallace', 'LongHairStraight', 'LongHairStraight2',
			'LongHairStraightStrand', 'ShortHairDreads01', 'ShortHairDreads02',
			'ShortHairFrizzle', 'ShortHairShaggyMullet', 'ShortHairShortCurly',
			'ShortHairShortFlat', 'ShortHairShortRound', 'ShortHairShortWaved',
			'ShortHairSides', 'ShortHairTheCaesar', 'ShortHairTheCaesarSidePart'
		],
		accessoriesType: [
			'Blank', 'Kurt', 'Prescription01', 'Prescription02', 'Round', 'Sunglasses', 'Wayfarers'
		],
		hairColor: [
			'Auburn', 'Black', 'Blonde', 'BlondeGolden', 'Brown', 'BrownDark',
			'PastelPink', 'Platinum', 'Red', 'SilverGray'
		],
		facialHairType: [
			'Blank', 'BeardMedium', 'BeardLight', 'BeardMajestic',
			'MoustacheFancy', 'MoustacheMagnum'
		],
		facialHairColor: [
			'Auburn', 'Black', 'Blonde', 'BlondeGolden', 'Brown', 'BrownDark',
			'Platinum', 'Red'
		],
		clotheType: [
			'BlazerShirt', 'BlazerSweater', 'CollarSweater', 'GraphicShirt',
			'Hoodie', 'Overall', 'ShirtCrewNeck', 'ShirtScoopNeck', 'ShirtVNeck'
		],
		clotheColor: [
			'Black', 'Blue01', 'Blue02', 'Blue03', 'Gray01', 'Gray02',
			'Heather', 'PastelBlue', 'PastelGreen', 'PastelOrange',
			'PastelRed', 'PastelYellow', 'Pink', 'Red', 'White'
		],
		eyeType: [
			'Close', 'Cry', 'Default', 'Dizzy', 'EyeRoll', 'Happy',
			'Hearts', 'Side', 'Squint', 'Surprised', 'Wink', 'WinkWacky'
		],
		eyebrowType: [
			'Angry', 'AngryNatural', 'Default', 'DefaultNatural', 'FlatNatural',
			'RaisedExcited', 'RaisedExcitedNatural', 'SadConcerned',
			'SadConcernedNatural', 'UnibrowNatural', 'UpDown', 'UpDownNatural'
		],
		mouthType: [
			'Concerned', 'Default', 'Disbelief', 'Eating', 'Grimace',
			'Sad', 'ScreamOpen', 'Serious', 'Smile', 'Tongue', 'Twinkle', 'Vomit'
		],
		skinColor: [
			'Tanned', 'Yellow', 'Pale', 'Light', 'Brown', 'DarkBrown', 'Black'
		]
	}

	const labels: Record<string, string> = {
		topType: 'Vlasy / Čepice',
		accessoriesType: 'Doplňky',
		hairColor: 'Barva vlasů',
		facialHairType: 'Vousy',
		facialHairColor: 'Barva vousů',
		clotheType: 'Oblečení',
		clotheColor: 'Barva oblečení',
		eyeType: 'Oči',
		eyebrowType: 'Obočí',
		mouthType: 'Ústa',
		skinColor: 'Barva pleti'
	}

	function parseUrl(url: string): Record<string, string> {
		const defaults: Record<string, string> = {
			avatarStyle: 'Circle',
			topType: 'ShortHairShortFlat',
			accessoriesType: 'Blank',
			hairColor: 'Brown',
			facialHairType: 'Blank',
			facialHairColor: 'Brown',
			clotheType: 'ShirtCrewNeck',
			clotheColor: 'Blue03',
			eyeType: 'Default',
			eyebrowType: 'Default',
			mouthType: 'Smile',
			skinColor: 'Light'
		}

		if (!url || !url.includes('avataaars.io')) return defaults

		try {
			const urlObj = new URL(url)
			const params = Object.fromEntries(urlObj.searchParams.entries())
			return { ...defaults, ...params }
		} catch {
			return defaults
		}
	}

	let config = parseUrl(value)

	function buildUrl(): string {
		const params = new URLSearchParams(config)
		return `https://avataaars.io/?${params.toString()}`
	}

	$: previewUrl = (config, buildUrl())

	function handleChange() {
		config = config
		const url = buildUrl()
		dispatch('change', url)
	}

	function randomize() {
		for (const [key, vals] of Object.entries(options)) {
			config[key] = vals[Math.floor(Math.random() * vals.length)]
		}
		config = config
		handleChange()
	}
</script>

<div class="border border-gray-200 rounded-xl p-4 bg-white">
	<div class="flex flex-col sm:flex-row gap-4">
		<div class="flex flex-col items-center gap-3 sm:w-48 flex-shrink-0">
			<div class="w-32 h-32 rounded-full bg-gray-100 overflow-hidden shadow-md">
				<img src={previewUrl} alt="Avatar preview" class="w-full h-full" />
			</div>
			<button
				type="button"
				on:click={randomize}
				class="px-3 py-1.5 text-xs font-medium text-purple-600 border border-purple-300 rounded-lg hover:bg-purple-50 transition-colors"
			>
				Náhodný
			</button>
		</div>

		<div class="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
			{#each Object.entries(options) as [key, vals]}
				<div>
					<label for="avatar-{key}" class="block text-xs font-medium text-gray-600 mb-1">
						{labels[key] || key}
					</label>
					<select
						id="avatar-{key}"
						bind:value={config[key]}
						on:change={handleChange}
						class="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
					>
						{#each vals as val}
							<option value={val}>{val}</option>
						{/each}
					</select>
				</div>
			{/each}
		</div>
	</div>
</div>
