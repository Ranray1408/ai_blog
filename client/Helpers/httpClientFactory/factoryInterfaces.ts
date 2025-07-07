
// Genral interfaces ***********************

// Http structure intarface
export interface IHttpClient {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	get(url: string): Promise<any>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	post(url: string, data: any): Promise<any>;
}

// Inbox params type
export type IHttpClientType = 'fetch' | 'axios';
