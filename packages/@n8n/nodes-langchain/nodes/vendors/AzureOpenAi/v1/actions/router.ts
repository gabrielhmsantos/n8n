import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import * as assistant from './assistant';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const returnData: INodeExecutionData[] = [];

	const resource = this.getNodeParameter('resource', 0);
	const operation = this.getNodeParameter('operation', 0);

	for (let i = 0; i < items.length; i++) {
		try {
			let execute;

			switch (resource) {
				case 'assistant':
					execute = assistant[operation].execute;
					break;
				default:
					throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not known`, {
						itemIndex: i,
					});
			}

			const executionData = await execute.call(this, i);
			returnData.push(...executionData);
		} catch (error) {
			if (this.continueOnFail()) {
				returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
				continue;
			}
			throw error;
		}
	}

	return [returnData];
}
