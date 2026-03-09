<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { token, isAuthenticated, logout } from '$lib/stores/auth'
	import { getApiUrl } from '$lib/config/api'
	import AvatarEditor from '$lib/components/AvatarEditor.svelte'

	interface TeamMember {
		name: string
		role: string
		avatar?: string
	}

	interface Feature {
		icon: string
		title: string
		description: string
	}

	interface ProductForm {
		name: string
		description: string
		extendedDescription: string
		url: string
		icon: string
		category: string
		tags: string
		heroImage: string
		teamDescription: string
		teamMembers: TeamMember[]
		features: Feature[]
	}

	interface Product {
		id: string
		name: string
		description: string
		extendedDescription?: string
		url: string
		icon?: string
		category?: string
		tags?: string[]
		heroImage?: string
		features?: Feature[]
		teamMembers?: TeamMember[]
		teamDescription?: string
	}

	function createEmptyForm(): ProductForm {
		return {
			name: '',
			description: '',
			extendedDescription: '',
			url: '',
			icon: '',
			category: '',
			tags: '',
			heroImage: '',
			teamDescription: '',
			teamMembers: [],
			features: [],
		}
	}

	let products: Product[] = []
	let loading = true
	let editingProduct: Product | null = null
	let showForm = false
	let saving = false
	let error = ''
	let successMessage = ''
	let form: ProductForm = createEmptyForm()

	onMount(() => {
		if (!$isAuthenticated) {
			goto('/')
			return
		}
		loadProducts()
	})

	async function authFetch(url: string, options: RequestInit = {}) {
		return fetch(url, {
			...options,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${$token}`,
				...options.headers,
			},
		})
	}

	async function loadProducts() {
		loading = true
		try {
			const response = await fetch(getApiUrl('products'))
			if (response.ok) {
				products = await response.json()
			}
		} catch {
			error = 'Nepodařilo se načíst produkty'
		} finally {
			loading = false
		}
	}

	function openNewForm() {
		editingProduct = null
		form = createEmptyForm()
		showForm = true
		error = ''
		successMessage = ''
	}

	function openEditForm(product: Product) {
		editingProduct = product
		form = {
			name: product.name,
			description: product.description || '',
			extendedDescription: product.extendedDescription || '',
			url: product.url || '',
			icon: product.icon || '',
			category: product.category || '',
			tags: (product.tags || []).join(', '),
			heroImage: product.heroImage || '',
			teamDescription: product.teamDescription || '',
			teamMembers: (product.teamMembers || []).map((m) => ({ ...m })),
			features: (product.features || []).map((f) => ({ ...f })),
		}
		showForm = true
		error = ''
		successMessage = ''
	}

	function closeForm() {
		showForm = false
		editingProduct = null
		error = ''
	}

	async function handleSave() {
		saving = true
		error = ''
		successMessage = ''

		const body: Record<string, unknown> = {
			name: form.name,
			description: form.description || undefined,
			extendedDescription: form.extendedDescription || undefined,
			url: form.url || undefined,
			icon: form.icon || undefined,
			category: form.category || undefined,
			tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : undefined,
			heroImage: form.heroImage || undefined,
			teamDescription: form.teamDescription || undefined,
			features: form.features.length > 0 ? form.features : undefined,
			teamMembers: form.teamMembers.length > 0 ? form.teamMembers : undefined,
		}

		Object.keys(body).forEach((key) => {
			if (body[key] === undefined) delete body[key]
		})

		try {
			let response: Response
			if (editingProduct) {
				response = await authFetch(getApiUrl(`products/${editingProduct.id}`), {
					method: 'PUT',
					body: JSON.stringify(body),
				})
			} else {
				response = await authFetch(getApiUrl('products'), {
					method: 'POST',
					body: JSON.stringify(body),
				})
			}

			if (response.ok) {
				successMessage = editingProduct ? 'Produkt byl upraven' : 'Produkt byl vytvořen'
				showForm = false
				editingProduct = null
				await loadProducts()
			} else {
				const data = await response.json().catch(() => ({}))
				error = data.message || 'Nepodařilo se uložit produkt'
			}
		} catch {
			error = 'Chyba připojení k serveru'
		} finally {
			saving = false
		}
	}

	async function handleDelete(product: Product) {
		if (!confirm(`Opravdu chcete smazat produkt "${product.name}"?`)) return

		try {
			const response = await authFetch(getApiUrl(`products/${product.id}`), {
				method: 'DELETE',
			})

			if (response.ok) {
				successMessage = `Produkt "${product.name}" byl smazán`
				await loadProducts()
			} else {
				error = 'Nepodařilo se smazat produkt'
			}
		} catch {
			error = 'Chyba připojení k serveru'
		}
	}

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
</script>

<div class="bg-gray-50 min-h-screen">
	<div class="container mx-auto px-6 py-8">
		<div class="flex items-center justify-between mb-8">
			<div>
				<h1 class="text-3xl font-bold text-gray-900">Administrace</h1>
				<p class="text-gray-600 mt-1">Správa produktů v katalogu</p>
			</div>
			<button
				on:click={openNewForm}
				class="px-5 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
				Přidat produkt
			</button>
		</div>

		{#if successMessage}
			<div class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm">
				{successMessage}
			</div>
		{/if}

		{#if error && !showForm}
			<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
				{error}
			</div>
		{/if}

		{#if loading}
			<div class="flex justify-center py-12">
				<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
			</div>
		{:else if products.length === 0}
			<div class="text-center py-12 text-gray-500">
				<p class="text-lg">Žádné produkty</p>
				<p class="text-sm mt-1">Přidejte první produkt kliknutím na tlačítko výše</p>
			</div>
		{:else}
			<div class="bg-white rounded-xl shadow-sm overflow-hidden">
				<table class="w-full">
					<thead class="bg-gray-50 border-b border-gray-200">
						<tr>
							<th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Produkt</th>
							<th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kategorie</th>
							<th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tagy</th>
							<th class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tým</th>
							<th class="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Akce</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-100">
						{#each products as product}
							<tr class="hover:bg-gray-50 transition-colors">
								<td class="px-6 py-4">
									<div class="flex items-center gap-3">
										<div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
											{product.icon || product.name.charAt(0)}
										</div>
										<div>
											<div class="font-semibold text-gray-900">{product.name}</div>
											<div class="text-sm text-gray-500 truncate max-w-xs">{product.description || ''}</div>
										</div>
									</div>
								</td>
								<td class="px-6 py-4 text-sm text-gray-600">
									{product.category || '—'}
								</td>
								<td class="px-6 py-4">
									<div class="flex flex-wrap gap-1">
										{#each (product.tags || []).slice(0, 3) as tag}
											<span class="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{tag}</span>
										{/each}
										{#if (product.tags || []).length > 3}
											<span class="text-xs text-gray-400">+{(product.tags || []).length - 3}</span>
										{/if}
									</div>
								</td>
								<td class="px-6 py-4 text-sm text-gray-600">
									{(product.teamMembers || []).length} členů
								</td>
								<td class="px-6 py-4 text-right">
									<div class="flex justify-end gap-2">
										<button
											on:click={() => openEditForm(product)}
											class="px-3 py-1.5 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
										>
											Upravit
										</button>
										<button
											on:click={() => handleDelete(product)}
											class="px-3 py-1.5 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
										>
											Smazat
										</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>

{#if showForm}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="fixed inset-0 bg-black/50 flex items-start justify-center z-50 overflow-y-auto py-8" on:click|self={closeForm}>
		<div class="bg-white rounded-xl shadow-2xl w-full max-w-3xl mx-4 p-8">
			<div class="flex items-center justify-between mb-6">
				<h2 class="text-2xl font-bold text-gray-900">
					{editingProduct ? 'Upravit produkt' : 'Nový produkt'}
				</h2>
				<button on:click={closeForm} class="text-gray-400 hover:text-gray-600" aria-label="Zavřít">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			{#if error}
				<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
					{error}
				</div>
			{/if}

			<form on:submit|preventDefault={handleSave} class="space-y-6">
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
							<label for="form-icon" class="block text-sm font-medium text-gray-700 mb-1">Ikona (písmeno)</label>
							<input id="form-icon" type="text" bind:value={form.icon} maxlength="5" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
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
					<label for="form-hero" class="block text-sm font-medium text-gray-700 mb-1">Hero obrázek (URL)</label>
					<input id="form-hero" type="url" bind:value={form.heroImage} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
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
								<div>
									<label for="feat-icon-{i}" class="block text-xs text-gray-500 mb-1">Ikona (emoji)</label>
									<input id="feat-icon-{i}" type="text" bind:value={feature.icon} class="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
								</div>
								<div class="md:col-span-2">
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
								<label class="block text-xs text-gray-500 mb-1">Avatar</label>
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
						on:click={closeForm}
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
							{editingProduct ? 'Uložit změny' : 'Vytvořit produkt'}
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
