import { AxiosHttpClient } from "./AxiosHttpClient";
import { IHttpClient, IHttpClientType } from "./factoryInterfaces";
import { FetchHttpClient } from "./FetchHttpClient";

export class HttpClientFactory {
	static create(type: IHttpClientType): IHttpClient {
		switch (type) {
			case 'fetch':
				return new FetchHttpClient();
			case 'axios':
				return new AxiosHttpClient();
			default:
				throw new Error('Unknown type');
		}
	}
}
