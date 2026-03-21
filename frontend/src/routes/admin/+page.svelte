<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { token, isAuthenticated, logout } from '$lib/stores/auth'
	import { getApiUrl } from '$lib/config/api'
	import ProductTable from '$lib/components/ProductTable.svelte'
	import ProductFormModal from '$lib/components/ProductFormModal.svelte'

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
			const response = await fetch(getApiUrl('admin/products'))
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
				response = await authFetch(getApiUrl(`admin/products/${editingProduct.id}`), {
					method: 'PUT',
					body: JSON.stringify(body),
				})
			} else {
				response = await authFetch(getApiUrl('admin/products'), {
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
			const response = await authFetch(getApiUrl(`admin/products/${product.id}`), {
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

		<ProductTable
			{products}
			{loading}
			on:edit={(e) => openEditForm(e.detail)}
			on:delete={(e) => handleDelete(e.detail)}
		/>
	</div>
</div>

{#if showForm}
	<ProductFormModal
		bind:form
		isEditing={!!editingProduct}
		{saving}
		{error}
		on:save={handleSave}
		on:close={closeForm}
	/>
{/if}
