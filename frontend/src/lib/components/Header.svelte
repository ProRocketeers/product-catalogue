<script lang="ts">
	import { isAuthenticated, logout } from '$lib/stores/auth'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import LoginModal from './LoginModal.svelte'
	import ProSvgIcon from './ProSvgIcon.svelte'

	export let showBackButton = false

	let showLoginModal = false

	function handleLogout() {
		logout()
		if ($page.url.pathname.startsWith('/admin')) {
			goto('/')
		}
	}
</script>

<header class="bg-white border-b border-gray-200">
	<div class="container mx-auto px-4 py-3 sm:px-6 sm:py-4 flex flex-wrap items-center gap-x-2 gap-y-3 sm:gap-x-4">
		<a href="/" class="order-1 flex-shrink-0">
			<img src="/header_logo.png" alt="Prorocketeers Logo" class="h-8 sm:h-[36px] w-auto max-w-[88px] sm:max-w-none object-contain" />
		</a>
		{#if showBackButton}
			<a href="/" class="order-3 w-full text-center sm:order-2 sm:w-auto sm:ml-auto text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 uppercase tracking-wide whitespace-nowrap">
				← ZPĚT NA KATALOG
			</a>
		{/if}

		<div class={`order-2 ml-auto flex items-center gap-2 sm:gap-4 ${showBackButton ? 'sm:order-3 sm:ml-0' : 'sm:order-2 sm:ml-auto'}`}>

			{#if $isAuthenticated}
				<a
					href="/admin"
					class="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
				>
					ADMIN
				</a>
				<button
					on:click={handleLogout}
					class="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
				>
					ODHLÁSIT
				</button>
			{:else}
				<button
					on:click={() => (showLoginModal = true)}
					class="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap"
				>
					<ProSvgIcon name="solid/user" size="14px" />
					PŘIHLÁSIT SE
				</button>
			{/if}
		</div>
	</div>
</header>

{#if showLoginModal}
	<LoginModal on:close={() => (showLoginModal = false)} />
{/if}
