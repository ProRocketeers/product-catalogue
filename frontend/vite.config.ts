import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, '.', '')
	const port = Number.parseInt(env.PORT, 10) || 3000

	return {
		plugins: [sveltekit()],
		server: {
			port,
			strictPort: true
		},
		preview: {
			allowedHosts: env.PREVIEW_ALLOWED_HOSTS ? env.PREVIEW_ALLOWED_HOSTS.split(',') : []
		}
	}
})
