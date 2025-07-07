import axios from 'axios';
import { IHttpClient } from './factoryInterfaces';

export class AxiosHttpClient implements IHttpClient {
	async get(url: string) {
		const res = await axios.get(url);
		return res.data;
	}

	async post(url: string, data: never) {
		const res = await axios.post(url, data);
		return res.data;
	}
}
