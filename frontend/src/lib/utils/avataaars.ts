
const customAvatars: Record<string, Record<string, string>> = {
	'Ondřej Sýkora': {
		avatarStyle: 'Circle',
		topType: 'ShortHairShortFlat',
		accessoriesType: 'Blank',
		hairColor: 'Brown',
		facialHairType: 'BeardMedium',
		facialHairColor: 'Brown',
		clotheType: 'ShirtCrewNeck',
		clotheColor: 'Blue03',
		eyeType: 'Happy',
		eyebrowType: 'DefaultNatural',
		mouthType: 'Smile',
		skinColor: 'Light'
	},
	'Roman Hvizdak': {
		avatarStyle: 'Circle',
		topType: 'NoHair',
		accessoriesType:'Prescription02',
		hairColor: 'none',
		facialHairType: 'none',
		clotheType: 'ShirtCrewNeck',
		clotheColor: 'Gray02',
		eyeType: 'Happy',
		eyebrowType: 'DefaultNatural',
		mouthType: 'Smile',
		skinColor: 'Light'
	},
	'Jan Breitkopf': {
		avatarStyle: 'Circle',
		topType: 'ShortHairShortWaved',
		accessoriesType: 'Blank',
		hairColor: 'Brown',
		facialHairType: 'Blank',
		clotheType: 'ShirtCrewNeck',
		clotheColor: 'Blue02',
		eyeType: 'Happy',
		eyebrowType: 'Default',
		mouthType: 'Smile',
		skinColor: 'Light'
	},
	'Jakub Kleberc': {
		avatarStyle: 'Circle',
		topType: 'ShortHairShortFlat',
		accessoriesType: 'Prescription02',
		hairColor: 'Black',
		facialHairType: 'BeardMedium',
		facialHairColor: 'Black',
		clotheType: 'ShirtCrewNeck',
		clotheColor: 'White',
		eyeType: 'Default',
		eyebrowType: 'DefaultNatural',
		mouthType: 'Smile',
		skinColor: 'Light'
	},
	'Lukáš Stuchlík': {
		avatarStyle: 'Circle',
		topType: 'ShortHairShortWaved',
		accessoriesType: 'Blank',
		hairColor: 'Brown',
		facialHairType: 'Blank',
		clotheType: 'ShirtCrewNeck',
		clotheColor: 'Gray02',
		eyeType: 'Happy',
		eyebrowType: 'DefaultNatural',
		mouthType: 'Smile',
		skinColor: 'Light'
	},
	'Patrik Ludvik': {
		avatarStyle: 'Circle',
		topType: 'ShortHairShortFlat',
		accessoriesType: 'Prescription01',
		hairColor: 'Blonde',
		facialHairType: 'Blank',
		clotheType: 'Hoodie',
		clotheColor: 'Black',
		eyeType: 'Happy',
		eyebrowType: 'Default',
		mouthType: 'Smile',
		skinColor: 'Light'
	},
	'Vojtěch Jíra': {
		avatarStyle: 'Circle',
		topType: 'ShortHairShortFlat',
		accessoriesType: 'Prescription02',
		hairColor: 'BrownDark',
		facialHairType: 'BeardMedium',
		facialHairColor: 'BrownDark',
		clotheType: 'ShirtCrewNeck',
		clotheColor: 'Black',
		eyeType: 'Happy',
		eyebrowType: 'DefaultNatural',
		mouthType: 'Smile',
		skinColor: 'Light'
	}
};

export function generateAvataaarsUrl(name: string): string {
	const config = customAvatars[name];
	if (!config) {
		const hash = Array.from(name).reduce((acc, c) => acc + c.charCodeAt(0), 0)
		const topTypes = ['ShortHairShortFlat', 'ShortHairShortWaved', 'ShortHairShortCurly', 'ShortHairShortRound', 'LongHairStraight', 'LongHairBob']
		const hairColors = ['Auburn', 'Black', 'Blonde', 'Brown', 'BrownDark', 'Red']
		const clotheColors = ['Blue01', 'Blue02', 'Blue03', 'Gray01', 'Gray02', 'Red', 'Black']
		const skinColors = ['Tanned', 'Pale', 'Light', 'Brown']

		const defaults: Record<string, string> = {
			avatarStyle: 'Circle',
			topType: topTypes[hash % topTypes.length],
			accessoriesType: 'Blank',
			hairColor: hairColors[hash % hairColors.length],
			facialHairType: 'Blank',
			clotheType: 'ShirtCrewNeck',
			clotheColor: clotheColors[hash % clotheColors.length],
			eyeType: 'Default',
			eyebrowType: 'Default',
			mouthType: 'Smile',
			skinColor: skinColors[hash % skinColors.length]
		}
		const params = new URLSearchParams(defaults)
		return `https://avataaars.io/?${params.toString()}`
	}

	const params = new URLSearchParams(config);
	return `https://avataaars.io/?${params.toString()}`;
}
