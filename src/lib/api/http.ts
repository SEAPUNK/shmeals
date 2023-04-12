import axios, { type AxiosRequestConfig } from 'axios';

export type Config = Partial<AxiosRequestConfig>;

const BASE_API = 'https://structurehouse.api.nutrislice.com';

export async function makeRequest(endpoint: string, config: Partial<AxiosRequestConfig> = {}) {
	const url = new URL(endpoint, BASE_API);

	return (
		await axios({
			...config,
			params: {
				...config.params,
				format: 'json'
			},
			method: 'get',
			url: url.toString()
		})
	).data;
}
