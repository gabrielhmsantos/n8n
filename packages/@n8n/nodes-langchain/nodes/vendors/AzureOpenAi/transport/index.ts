import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
} from 'n8n-workflow';

type RequestParameters = {
	headers?: IDataObject;
	body?: IDataObject | string;
	qs?: IDataObject;
	uri?: string;
	option?: IDataObject;
};

export async function apiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	parameters?: RequestParameters,
) {
	const { body, qs, option } = parameters ?? {};

	const credentials = await this.getCredentials('azureOpenAiApi');
	const { resourceName, apiVersion, endpoint: customEndpoint } = credentials;

	// Construct Azure URL
	const baseUrl = (customEndpoint as string) || `https://${resourceName}.openai.azure.com/openai`;

	const uri = `${baseUrl}${endpoint}`;

	// Add api-version to query string (required for Azure)
	const queryString = {
		...qs,
		'api-version': apiVersion as string,
	};

	let headers = parameters?.headers ?? {};

	const options = {
		headers,
		method,
		body,
		qs: queryString,
		uri,
		json: true,
	};

	if (option && Object.keys(option).length !== 0) {
		Object.assign(options, option);
	}

	// The api-key header is automatically added via the authenticate() method in the credential
	return await this.helpers.requestWithAuthentication.call(this, 'azureOpenAiApi', options);
}
