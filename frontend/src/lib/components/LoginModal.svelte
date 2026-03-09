<script lang="ts">
	import { login } from '$lib/stores/auth'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	let username = ''
	let password = ''
	let error = ''
	let loading = false

	async function handleLogin() {
		error = ''
		loading = true
		const result = await login(username, password)
		loading = false

		if (result.success) {
			dispatch('close')
		} else {
			error = result.error || 'Přihlášení selhalo'
		}
	}

	function handleClose() {
		dispatch('close')
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') handleClose()
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<button type="button" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 cursor-default" on:click|self={handleClose} aria-label="Zavřít modal">
	<div class="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-8">
		<div class="flex items-center justify-between mb-6">
			<h2 class="text-2xl font-bold text-gray-900">Přihlášení</h2>
			<button
				on:click={handleClose}
				class="text-gray-400 hover:text-gray-600 transition-colors"
				aria-label="Zavřít"
			>
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

		<form on:submit|preventDefault={handleLogin} class="space-y-4">
			<div>
				<label for="username" class="block text-sm font-medium text-gray-700 mb-1">
					Uživatelské jméno
				</label>
				<input
					id="username"
					type="text"
					bind:value={username}
					required
					autocomplete="username"
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
					placeholder="admin"
				/>
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-gray-700 mb-1">
					Heslo
				</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					required
					autocomplete="current-password"
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
					placeholder="••••••••"
				/>
			</div>

			<button
				type="submit"
				disabled={loading}
				class="w-full py-2.5 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
			>
				{#if loading}
					Přihlašování...
				{:else}
					Přihlásit se
				{/if}
			</button>
		</form>
	</div>
</button>
