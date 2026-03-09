<script lang="ts">
	import { generateAvataaarsUrl } from '$lib/utils/avataaars'
	
	export let member: {
		name: string
		role: string
		avatar: string
	}
	
	$: avatarUrl = member.avatar || generateAvataaarsUrl(member.name)
</script>

<div class="text-center">
	<img 
		src={avatarUrl}
		alt={`${member.name} avatar`}
		class="w-24 h-24 mx-auto mb-3 shadow-lg rounded-full"
	/>
	<h4 class="font-semibold text-white mb-1">{member.name}</h4>
	<p class="text-sm text-gray-300">{member.role}</p>
</div>
