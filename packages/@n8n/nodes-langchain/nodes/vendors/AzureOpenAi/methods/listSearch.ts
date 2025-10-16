import type { IDataObject, ILoadOptionsFunctions, INodeListSearchResult } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function assistantSearch(
	this: ILoadOptionsFunctions,
	filter?: string,
	paginationToken?: string,
): Promise<INodeListSearchResult> {
	const qs: IDataObject = {
		limit: 100,
	};

	if (paginationToken) {
		qs.after = paginationToken;
	}

	const response = (await apiRequest.call(this, 'GET', '/assistants', {
		headers: {
			'OpenAI-Beta': 'assistants=v2',
		},
		qs,
	})) as {
		data: Array<{ id: string; name: string }>;
		has_more: boolean;
		last_id: string;
	};

	return {
		results: response.data
			.map((assistant) => ({ name: assistant.name, value: assistant.id }))
			.filter(
				(assistant) => !filter || assistant.name.toLowerCase().includes(filter.toLowerCase()),
			),
		paginationToken: response.has_more ? response.last_id : undefined,
	};
}

export async function modelSearch(
	this: ILoadOptionsFunctions,
	filter?: string,
): Promise<INodeListSearchResult> {
	// For Azure OpenAI, models are deployment names configured in Azure Portal
	// These are common deployment patterns, but users should use their actual deployment names
	const azureModels = [
		{ name: 'GPT-4', value: 'gpt-4' },
		{ name: 'GPT-4 Turbo', value: 'gpt-4-turbo' },
		{ name: 'GPT-4 Turbo (1106)', value: 'gpt-4-1106-preview' },
		{ name: 'GPT-4 Turbo (0125)', value: 'gpt-4-0125-preview' },
		{ name: 'GPT-4o', value: 'gpt-4o' },
		{ name: 'GPT-4o Mini', value: 'gpt-4o-mini' },
		{ name: 'GPT-3.5 Turbo', value: 'gpt-35-turbo' },
		{ name: 'GPT-3.5 Turbo (1106)', value: 'gpt-35-turbo-1106' },
	];

	return {
		results: azureModels.filter(
			(model) => !filter || model.name.toLowerCase().includes(filter.toLowerCase()),
		),
	};
}
