// Server address. Default is the local Docker/dev server; override with VITE_SERVER_URL at build time.
const SERVER_PATH = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:5000';

const API_ENDPOINTS = {
	API_PATH: `${SERVER_PATH}/api`,
	SERVER_PATH,
};

export default API_ENDPOINTS;
