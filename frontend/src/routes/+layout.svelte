<script lang="ts">
import '../app.postcss'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { page } from '$app/stores'
import Header from '$lib/components/Header.svelte'
import Footer from '$lib/components/Footer.svelte'

$: showBackButton = $page.url.pathname.startsWith('/detail')
</script>

<div class="flex flex-col min-h-screen">
	<Header {showBackButton} />
	<main class="flex-1">
		<slot />
	</main>
	<div class="bg-white">
		<Footer />
	</div>
</div>
