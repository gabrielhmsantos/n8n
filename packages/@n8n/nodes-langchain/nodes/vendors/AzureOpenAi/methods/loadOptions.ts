import type { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { apiRequest } from '../transport';

export async function getFiles(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const files = (await apiRequest.call(this, 'GET', '/files', {
		qs: { purpose: 'assistants' },
	})) as { data: Array<{ id: string; filename: string }> };

	return files.data.map((file) => ({
		name: file.filename,
		value: file.id,
	}));
}
