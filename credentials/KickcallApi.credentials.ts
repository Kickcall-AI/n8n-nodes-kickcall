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
	// Docs URL for the Keragon app was https://knowledge-base.kickcall.ai/articles/6275887-keragon
	documentationUrl = 'https://www.kickcall.ai';
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
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'options',
			options: [
				{
					name: 'Production',
					value: 'production',
				},
				{
					name: 'Development',
					value: 'development',
				},
			],
			default: 'production',
			required: true,
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
			baseURL: '={{$credentials.environment === "development" ? "https://api-test.kickcall.ai" : "https://api-app.kickcall.ai"}}',
			url: '/api/v1/public/api_keys/validate',
			method: 'POST',
			body: {
				api_key: '={{$credentials.apiKey}}',
				email: '={{$credentials.email}}',
			},
		},
	};
}
