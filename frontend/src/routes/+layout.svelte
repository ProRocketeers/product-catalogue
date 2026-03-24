<script lang="ts">
import '../app.postcss'
import { page } from '$app/stores'
import Header from '$lib/components/Header.svelte'
import Footer from '$lib/components/Footer.svelte'

$: showBackButton = $page.url.pathname.startsWith('/detail')
</script>

<Header {showBackButton} />
<slot />
<div class="bg-white">
	<Footer />
</div>
