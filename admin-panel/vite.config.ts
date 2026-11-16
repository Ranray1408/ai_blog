import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	resolve: {
		// Same "@/..." import style as in the client
		alias: { '@': '/src' },
	},
	server: { port: 3001 },
	preview: { port: 3001 },
});
