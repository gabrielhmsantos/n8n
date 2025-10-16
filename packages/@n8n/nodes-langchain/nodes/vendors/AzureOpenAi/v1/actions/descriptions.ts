import type { INodeProperties } from 'n8n-workflow';

export const modelRLC = (searchListMethod: string = 'modelSearch'): INodeProperties => ({
	displayName: 'Deployment Name',
	name: 'modelId',
	type: 'resourceLocator',
	default: { mode: 'list', value: '' },
	required: true,
	description: 'The name of the Azure OpenAI deployment to use',
	modes: [
		{
			displayName: 'From List',
			name: 'list',
			type: 'list',
			typeOptions: {
				searchListMethod,
				searchable: true,
			},
		},
		{
			displayName: 'Name',
			name: 'id',
			type: 'string',
			placeholder: 'e.g. my-gpt4-deployment',
		},
	],
});

export const assistantRLC: INodeProperties = {
	displayName: 'Assistant',
	name: 'assistantId',
	type: 'resourceLocator',
	description:
		'Assistant to respond to the message. You can manage assistants in the <a href="https://portal.azure.com" target="_blank">Azure Portal</a>.',
	default: { mode: 'list', value: '' },
	required: true,
	modes: [
		{
			displayName: 'From List',
			name: 'list',
			type: 'list',
			typeOptions: {
				searchListMethod: 'assistantSearch',
				searchable: true,
			},
		},
		{
			displayName: 'ID',
			name: 'id',
			type: 'string',
			placeholder: 'e.g. asst_abc123',
		},
	],
};
