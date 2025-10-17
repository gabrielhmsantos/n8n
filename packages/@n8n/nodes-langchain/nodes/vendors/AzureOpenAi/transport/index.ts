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
	let baseUrl: string;
	if (customEndpoint) {
		// Remove trailing slash if exists
		const cleanEndpoint = (customEndpoint as string).endsWith('/')
			? (customEndpoint as string).slice(0, -1)
			: (customEndpoint as string);

		// Add /openai if not present (similar to LangChain behavior)
		baseUrl = cleanEndpoint.endsWith('/openai') ? cleanEndpoint : `${cleanEndpoint}/openai`;
	} else {
		baseUrl = `https://${resourceName}.openai.azure.com/openai`;
	}

	const uri = `${baseUrl}${endpoint}`;

	// Add api-version to query string (required for Azure)
	const queryString = {
		...qs,
		'api-version': apiVersion as string,
	};

	const headers = parameters?.headers ?? {};

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
