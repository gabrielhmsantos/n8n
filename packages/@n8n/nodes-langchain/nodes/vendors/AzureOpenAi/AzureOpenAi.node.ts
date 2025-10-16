import type { INodeTypeBaseDescription, IVersionedNodeType } from 'n8n-workflow';

import { AzureOpenAiV1 } from './v1/AzureOpenAiV1.node';

export class AzureOpenAi implements IVersionedNodeType {
	nodeVersions: IVersionedNodeType['nodeVersions'];

	constructor() {
		const baseDescription: INodeTypeBaseDescription = {
			displayName: 'Azure OpenAI',
			name: 'azureOpenAi',
			icon: 'file:azure.svg',
			group: ['transform'],
			description: 'Interact with Azure OpenAI Assistants',
			defaultVersion: 1,
			codex: {
				categories: ['AI', 'LangChain'],
				subcategories: {
					AI: ['Assistants'],
					LangChain: ['Assistants'],
				},
				resources: {
					primaryDocumentation: [
						{
							url: 'https://learn.microsoft.com/en-us/azure/ai-services/openai/assistants-reference',
						},
					],
				},
			},
		};

		this.nodeVersions = {
			1: new AzureOpenAiV1(baseDescription),
		};
	}
}
