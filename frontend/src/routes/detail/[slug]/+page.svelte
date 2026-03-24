<script lang="ts">
    import ErrorState from '$lib/components/ErrorState.svelte'
    import HeroSection from '$lib/components/HeroSection.svelte'
    import FeaturesSection from '$lib/components/FeaturesSection.svelte'
    import TeamSection from '$lib/components/TeamSection.svelte'
    import TechnicalInfo from '$lib/components/TechnicalInfo.svelte'
    import ContactForm from '$lib/components/ContactForm.svelte'
    
    export let data

    // Get icon color based on product name
    function getIconColor(name: string): string {
        const firstLetter = name.charAt(0).toUpperCase()
        const colors: Record<string, string> = {
            'W': 'bg-blue-500',
            'M': 'bg-orange-500',
            'O': 'bg-cyan-500',
            'P': 'bg-pink-500',
            'D': 'bg-gray-600',
            'G': 'bg-gray-700',
            'U': 'bg-purple-500',
            'Q': 'bg-teal-500'
        }
        return colors[firstLetter] || 'bg-indigo-500'
    }

    $: features = data.product?.features || []
    $: teamMembers = data.product?.teamMembers || []
    $: teamDescription = data.product?.teamDescription || 'Náš tým zkušených vývojářů a designérů pracuje na vytváření nejlepších nástrojů pro vaši produktivitu. Věříme v open-source a komunitní přístup k vývoji softwaru.'
    $: iconColor = data.product ? getIconColor(data.product.name) : ''
</script>

<div class="min-h-screen bg-gray-50">
    {#if data.error}
        <ErrorState message={data.error} />
    {:else if !data.product}
        <ErrorState title="Produkt nenalezen" message="Produkt nenalezen." />
    {:else}
        <HeroSection product={data.product} {iconColor} />
        <FeaturesSection {features} />
        <div class="bg-gradient-to-br from-[#0a1f44] to-[#1a3a6e]">
            <TeamSection {teamMembers} {teamDescription} />
            <TechnicalInfo product={data.product} />
        </div>
        <ContactForm />
    {/if}
</div>
