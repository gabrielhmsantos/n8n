import {
	type INodeTypeBaseDescription,
	type IVersionedNodeType,
	VersionedNodeType,
} from 'n8n-workflow';

import { AzureOpenAiV1 } from './v1/AzureOpenAiV1.node';

export class AzureOpenAi extends VersionedNodeType {
	constructor() {
		const baseDescription: INodeTypeBaseDescription = {
			displayName: 'Azure OpenAI',
			name: 'azureOpenAi',
			icon: 'file:azure.svg',
			group: ['transform'],
			description: 'Interact with Azure OpenAI Assistants',
			defaultVersion: 1,
			codex: {
				alias: ['assistant', 'LangChain'],
				categories: ['AI'],
				subcategories: {
					AI: ['Agents', 'Root Nodes'],
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

		const nodeVersions: IVersionedNodeType['nodeVersions'] = {
			1: new AzureOpenAiV1(baseDescription),
		};

		super(nodeVersions, baseDescription);
	}
}
