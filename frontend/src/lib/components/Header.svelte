<script lang="ts">
	import { isAuthenticated, logout } from '$lib/stores/auth'
	import LoginModal from './LoginModal.svelte'

	export let showBackButton = false

	let showLoginModal = false

	function handleLogout() {
		logout()
	}
</script>

<header class="bg-white border-b border-gray-200">
	<div class="container mx-auto px-6 py-4 flex items-center justify-between">
		<a href="/">
			<img src="/header_logo.png" alt="Prorocketeers Logo" class="h-[36px] w-auto" />
		</a>
		<div class="flex items-center gap-4">
			{#if showBackButton}
				<a href="/" class="text-sm font-semibold text-blue-600 hover:text-blue-800 uppercase tracking-wide">
					← ZPĚT NA KATALOG
				</a>
			{/if}

			{#if $isAuthenticated}
				<a
					href="/admin"
					class="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
				>
					ADMIN
				</a>
				<button
					on:click={handleLogout}
					class="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
				>
					ODHLÁSIT
				</button>
			{:else}
				<button
					on:click={() => (showLoginModal = true)}
					class="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
					</svg>
					PŘIHLÁSIT
				</button>
			{/if}
		</div>
	</div>
</header>

{#if showLoginModal}
	<LoginModal on:close={() => (showLoginModal = false)} />
{/if}
