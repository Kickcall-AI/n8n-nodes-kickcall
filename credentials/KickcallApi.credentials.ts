import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class KickcallApi implements ICredentialType {
	name = 'kickcallApi';
	displayName = 'Kickcall API';
	icon: Icon = 'file:../icons/kickcall.svg';
	documentationUrl = 'https://support.kickcall.ai/help/articles/4414396-n8n';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: "Don't have a Kickcall account? Visit https://www.kickcall.ai/contact-us to sign up and get your API key.",
		},
		{
			displayName: 'Kickcall Business Email',
			name: 'email',
			type: 'string',
			default: '',
			required: true,
			description: 'The email address associated with your Kickcall account',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api-app.kickcall.ai',
			url: '/api/v1/public/api_keys/validate',
			method: 'POST',
			body: {
				api_key: '={{$credentials.apiKey}}',
				email: '={{$credentials.email}}',
			},
		},
	};
}
