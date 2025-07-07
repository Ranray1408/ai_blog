import { IHttpClient } from "./factoryInterfaces";

export class FetchHttpClient implements IHttpClient {
	async get(url: string) {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error('Error download data.');
		}

		return await res.json();
	}

	async post(url: string, data: unknown ) {
		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
		});
		return res.json();
	}
}
