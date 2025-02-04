import type { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class AzureOpenAiApi implements ICredentialType {
	name = 'azureOpenAiApi';

	displayName = 'Azure Open AI';

	documentationUrl = 'azureopenai';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: false,
			default: 'dummykey',
		},
		{
			displayName: 'Ocp-Apim-Subscription Key',
			name: 'Apim-apiKey', // Notice it is not used anywhere
			type: 'string',
			typeOptions: { password: true },
			required: false,
			default: 'dummykey',
		},
		{
			displayName: 'Resource Name',
			name: 'resourceName',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: 'API Version',
			name: 'apiVersion',
			type: 'string',
			required: true,
			default: '2023-07-01-preview',
		},
		{
			displayName: 'Endpoint',
			name: 'endpoint',
			type: 'string',
			default: undefined,
			placeholder: 'https://llm-api.amd.com/azure',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'api-key': '={{$credentials.apiKey}}',
				// If the user also sets a Subscription Key, pass it through:
				'Ocp-Apim-Subscription-Key': '={{$credentials["Apim-apiKey"]}}',
			},
		},
	};
}
