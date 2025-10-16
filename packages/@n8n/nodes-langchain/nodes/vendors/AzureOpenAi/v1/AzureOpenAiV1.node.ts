import {
	NodeConnectionTypes,
	type IExecuteFunctions,
	type INodeType,
	type INodeTypeBaseDescription,
	type INodeTypeDescription,
} from 'n8n-workflow';

import { listSearch, loadOptions } from '../methods';
import { router } from './actions/router';
import { configureNodeInputs } from '../helpers/description';

import * as assistant from './actions/assistant';

export class AzureOpenAiV1 implements INodeType {
	description: INodeTypeDescription;

	constructor(baseDescription: INodeTypeBaseDescription) {
		this.description = {
			...baseDescription,
			version: 1,
			defaults: {
				name: 'Azure OpenAI',
			},
			inputs: `={{(${configureNodeInputs})($parameter.resource, $parameter.operation, $parameter.hideTools, $parameter.memory ?? undefined)}}`,
			outputs: [NodeConnectionTypes.Main],
			credentials: [
				{
					name: 'azureOpenAiApi',
					required: true,
				},
			],
			properties: [
				{
					displayName: 'Resource',
					name: 'resource',
					type: 'options',
					noDataExpression: true,
					options: [
						{
							name: 'Assistant',
							value: 'assistant',
						},
					],
					default: 'assistant',
				},
				...assistant.description,
			],
		};
	}

	methods = {
		listSearch,
		loadOptions,
	};

	async execute(this: IExecuteFunctions) {
		return await router.call(this);
	}
}
