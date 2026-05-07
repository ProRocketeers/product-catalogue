<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import AvatarEditor from '$lib/components/AvatarEditor.svelte'
	import FontAwesomeIconPicker from './FontAwesomeIconPicker.svelte'
	import ProSvgIcon from './ProSvgIcon.svelte'

	export let form: {
		name: string
		description: string
		extendedDescription: string
		url: string
		icon: string
		category: string
		tags: string
		heroImage: string
		teamDescription: string
		teamMembers: Array<{ name: string; role: string; avatar?: string }>
		features: Array<{ icon: string; title: string; description: string }>
	}
	export let isEditing = false
	export let saving = false
	export let error = ''

	const dispatch = createEventDispatcher<{
		save: void
		close: void
	}>()

	function addTeamMember() {
		form.teamMembers = [...form.teamMembers, { name: '', role: '', avatar: '' }]
	}

	function removeTeamMember(index: number) {
		form.teamMembers = form.teamMembers.filter((_, i) => i !== index)
	}

	function addFeature() {
		form.features = [...form.features, { icon: '', title: '', description: '' }]
	}

	function removeFeature(index: number) {
		form.features = form.features.filter((_, i) => i !== index)
	}

	function handleClose() {
		dispatch('close')
	}
</script>

<button type="button" class="fixed inset-0 bg-black/50 flex items-start justify-center z-50 overflow-y-auto py-8 cursor-default" on:click|self={handleClose} aria-label="Zavřít modal">
	<div class="bg-white rounded-xl shadow-2xl w-full max-w-3xl mx-4 p-8 text-left">
		<div class="flex items-center justify-between mb-6">
			<h2 class="text-2xl font-bold text-gray-900">
				{isEditing ? 'Upravit produkt' : 'Nový produkt'}
			</h2>
			<button on:click={handleClose} class="text-gray-400 hover:text-gray-600" aria-label="Zavřít">
				<ProSvgIcon name="solid/xmark" size="20px" />
			</button>
		</div>

		{#if error}
			<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
				{error}
			</div>
		{/if}

		<form on:submit|preventDefault={() => dispatch('save')} class="space-y-6">
			<div>
				<h3 class="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Základní informace</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label for="form-name" class="block text-sm font-medium text-gray-700 mb-1">Název *</label>
						<input id="form-name" type="text" bind:value={form.name} required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
					</div>
					<div>
						<label for="form-url" class="block text-sm font-medium text-gray-700 mb-1">URL</label>
						<input id="form-url" type="url" bind:value={form.url} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
					</div>
					<div>
						<FontAwesomeIconPicker id="form-icon" label="Ikona" bind:value={form.icon} />
					</div>
					<div>
						<label for="form-category" class="block text-sm font-medium text-gray-700 mb-1">Kategorie</label>
						<input id="form-category" type="text" bind:value={form.category} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
					</div>
				</div>
			</div>

			<div>
				<h3 class="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Popis</h3>
				<div class="space-y-4">
					<div>
						<label for="form-description" class="block text-sm font-medium text-gray-700 mb-1">Krátký popis</label>
						<textarea id="form-description" bind:value={form.description} rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"></textarea>
					</div>
					<div>
						<label for="form-ext-description" class="block text-sm font-medium text-gray-700 mb-1">Rozšířený popis</label>
						<textarea id="form-ext-description" bind:value={form.extendedDescription} rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"></textarea>
					</div>
				</div>
			</div>

			<div>
				<h3 class="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Tagy</h3>
				<div>
					<label for="form-tags" class="block text-sm font-medium text-gray-700 mb-1">Tagy (oddělené čárkou)</label>
					<input id="form-tags" type="text" bind:value={form.tags} placeholder="tag1, tag2, tag3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
				</div>
			</div>

			<div>
				<div class="flex items-center justify-between mb-3 border-b pb-2">
					<h3 class="text-lg font-semibold text-gray-800">Funkce</h3>
					<button
						type="button"
						on:click={addFeature}
						class="px-3 py-1 text-sm font-medium text-green-600 border border-green-300 rounded-lg hover:bg-green-50 transition-colors"
					>
						+ Přidat funkci
					</button>
				</div>
				{#each form.features as feature, i}
					<div class="border border-gray-200 rounded-lg p-4 mb-3 bg-gray-50">
						<div class="flex justify-between items-center mb-2">
							<span class="text-sm font-medium text-gray-600">Funkce {i + 1}</span>
							<button
								type="button"
								on:click={() => removeFeature(i)}
								class="text-red-500 hover:text-red-700 text-sm"
							>
								Odebrat
							</button>
						</div>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-3">
							<div class="md:col-span-3">
								<label for="feat-title-{i}" class="block text-xs text-gray-500 mb-1">Název</label>
								<input id="feat-title-{i}" type="text" bind:value={feature.title} class="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
							</div>
						</div>
						<div class="mt-2">
							<label for="feat-desc-{i}" class="block text-xs text-gray-500 mb-1">Popis</label>
							<textarea id="feat-desc-{i}" bind:value={feature.description} rows="2" class="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"></textarea>
						</div>
					</div>
				{/each}
			</div>

			<div>
				<div class="flex items-center justify-between mb-3 border-b pb-2">
					<h3 class="text-lg font-semibold text-gray-800">Členové týmu</h3>
					<button
						type="button"
						on:click={addTeamMember}
						class="px-3 py-1 text-sm font-medium text-green-600 border border-green-300 rounded-lg hover:bg-green-50 transition-colors"
					>
						+ Přidat člena
					</button>
				</div>
				{#each form.teamMembers as member, i}
					<div class="border border-gray-200 rounded-lg p-4 mb-3 bg-gray-50">
						<div class="flex justify-between items-center mb-2">
							<span class="text-sm font-medium text-gray-600">Člen {i + 1}</span>
							<button
								type="button"
								on:click={() => removeTeamMember(i)}
								class="text-red-500 hover:text-red-700 text-sm"
							>
								Odebrat
							</button>
						</div>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
							<div>
								<label for="member-name-{i}" class="block text-xs text-gray-500 mb-1">Jméno</label>
								<input id="member-name-{i}" type="text" bind:value={member.name} class="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
							</div>
							<div>
								<label for="member-role-{i}" class="block text-xs text-gray-500 mb-1">Role</label>
								<input id="member-role-{i}" type="text" bind:value={member.role} class="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
							</div>
						</div>
						<div>
							<span class="block text-xs text-gray-500 mb-1">Avatar</span>
							<AvatarEditor
								value={member.avatar || ''}
								on:change={(e) => { member.avatar = e.detail; form.teamMembers = form.teamMembers }}
							/>
						</div>
					</div>
				{/each}

				<div>
					<label for="form-team-desc" class="block text-sm font-medium text-gray-700 mb-1">Popis týmu</label>
					<textarea id="form-team-desc" bind:value={form.teamDescription} rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"></textarea>
				</div>
			</div>

			<div class="flex justify-end gap-3 pt-4 border-t">
				<button
					type="button"
					on:click={handleClose}
					class="px-5 py-2.5 text-sm font-semibold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
				>
					Zrušit
				</button>
				<button
					type="submit"
					disabled={saving}
					class="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
				>
					{#if saving}
						Ukládání...
					{:else}
						{isEditing ? 'Uložit změny' : 'Vytvořit produkt'}
					{/if}
				</button>
			</div>
		</form>
	</div>
</button>
