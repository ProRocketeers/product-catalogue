<script lang="ts">
    import { onMount } from 'svelte'

    onMount(() => {
        const script = document.createElement('script')
        script.src = 'https://app-cdn.clickup.com/assets/js/forms-embed/v1.js'
        script.async = true
        document.body.appendChild(script)
    })
</script>

<section class="py-16 px-4 bg-white">
    <div class="w-full mx-auto">
        <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-1">
                Nechte nám vzkaz,
            </h2>
            <p class="text-3xl font-bold text-blue-500">
                odpovíme co nejdříve
            </p>
        </div>
        
        <div class="bg-gray-50 rounded-lg shadow-sm clickup-outer">
            <div class="clickup-wrapper">
                <iframe
                    class="clickup-embed clickup-dynamic-height"
                    src="https://forms.clickup.com/4501577/f/49c29-14955/VX7IWFRXD9AQP03S1V"
                    width="100%"
                    height="100%"
                    style="background: transparent; border: none;"
                    title="Kontaktní formulář"
                />
            </div>
        </div>
    </div>
</section>

<style>
    .clickup-outer {
        overflow: hidden !important;
    }

    .clickup-wrapper {
        position: relative;
    }

    .clickup-wrapper::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 270px;
        background: white;
        z-index: 10;
        pointer-events: none;
    }

    .clickup-wrapper :global(iframe) {
        margin-top: -280px;
        min-height: 1100px;
    }

    @media (max-width: 768px) {
        .clickup-wrapper :global(iframe) {
            min-height: 1350px;
        }
    }
</style>
