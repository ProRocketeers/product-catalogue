<script lang="ts">
	import TeamMember from './TeamMember.svelte'
	
	export let teamMembers: Array<{
		name: string
		role: string
		avatar: string
	}>
	export let teamDescription: string
</script>

<section class="pt-16 text-white">
	<div class="container mx-auto px-6">
		<div class="flex flex-col lg:flex-row items-center gap-12 mb-16">
			<div class="flex-1">
				<h2 class="text-3xl lg:text-4xl font-bold mb-4">Kdo stojí za vývojem</h2>
				<p class="text-gray-300 leading-relaxed">
					{teamDescription}
				</p>
			</div>
			<div class="flex-1 flex justify-center">
				<div class="text-8xl">✈️</div>
			</div>
		</div>

		<div>
			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
				{#each teamMembers as member}
					<TeamMember {member} />
				{/each}
			</div>
		</div>
	</div>
</section>
