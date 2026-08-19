import {
	INodeType,
	INodeTypeDescription,
	NodeConnectionTypes,
	IExecuteSingleFunctions,
	INodeExecutionData,
	IN8nHttpFullResponse,
} from 'n8n-workflow';

export class Kickcall implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Kickcall AI',
		name: 'kickcall',
		icon: 'file:../../icons/kickcall.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'AI Receptionist for Care — End-to-End Phone Workflows',
		usableAsTool: true,
		defaults: {
			name: 'Kickcall AI',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'kickcallApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api-app.kickcall.ai',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Call',
						value: 'call',
					},
				],
				default: 'call',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['call'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new outbound phone call',
						action: 'Create a phone call',
						routing: {
							request: {
								method: 'POST',
								url: '/api/v1/marketplace/n8n/outbound_calls',
							},
							output: {
								postReceive: [
									async function (
										this: IExecuteSingleFunctions,
										items: INodeExecutionData[],
										response: IN8nHttpFullResponse,
									): Promise<INodeExecutionData[]> {
										// eslint-disable-next-line @typescript-eslint/no-explicit-any
										const body = response.body as any;
										const data = body.data || {};
										const meta = body.meta || {};
										return [
											{
												json: {
													...data,
													message: meta.message,
												},
											},
										];
									},
								],
							},
						},
					},
					{
						name: 'Get Summary',
						value: 'getSummary',
						description: 'Retrieve call summary of a specific call',
						action: 'Get a call summary',
						routing: {
							request: {
								method: 'POST',
								url: '/api/v1/marketplace/n8n/interactions',
							},
							output: {
								postReceive: [
									async function (
										this: IExecuteSingleFunctions,
										items: INodeExecutionData[],
										response: IN8nHttpFullResponse,
									): Promise<INodeExecutionData[]> {
										// eslint-disable-next-line @typescript-eslint/no-explicit-any
										const body = response.body as any;
										const data = body.data || {};
										
										return [
											{
												json: {
													'interaction_id': data.id,
													'duration': data.details?.duration,
													'hangup_reason': data.details?.hangup_reason?.friendly_end_reason,
													'agent_id': data.agent_id,
													'direction': data.direction,
													'start_at': data.start_at,
													'status': data.status,
													'persona': data.persona,
													'summary': data.summary,
												},
											},
										];
									},
								],
							},
						},
					},
				],
				default: 'create',
			},
			// CREATE CALL FIELDS
			{
				displayName: 'Location ID',
				name: 'kickcall_location',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['call'],
						operation: ['create'],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'kickcall_location',
					},
				},
				description: 'The ID of the location',
			},
			{
				displayName: 'Agent ID',
				name: 'kickcall_agent_id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['call'],
						operation: ['create'],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'kickcall_agent_id',
					},
				},
				description: 'The ID of the AI agent to use for the call',
			},
			{
				displayName: 'To Number',
				name: 'to_number',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['call'],
						operation: ['create'],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'to_number',
					},
				},
				description: 'The phone number to call (e.g. +1234567890)',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['call'],
						operation: ['create'],
					},
				},
				options: [
					{
						displayName: 'LLM Dynamic Variables',
						name: 'kickcall_llm_dynamic',
						type: 'json',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'kickcall_llm_dynamic',
							},
						},
						description: 'Add optional dynamic variables in key value pairs of string (JSON) that injects into your Response Engine prompt and tool description. Only applicable for Response Engine. Example: { "customer_name": "{{contact.name}}", "version": "2" }',
					},
					{
						displayName: 'Metadata',
						name: 'metadata',
						type: 'json',
						default: '',
						routing: {
							send: {
								type: 'body',
								property: 'metadata',
							},
						},
						description: 'An arbitrary object (JSON) for storage purpose only. You can put anything here like your internal customer ID associated with the call. Not used for processing. You can later get this field from the call object. Example: {"source":"n8n workflow"}',
					},
				],
			},

			// GET CALL DETAILS FIELDS
			{
				displayName: 'Location ID',
				name: 'location_id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['call'],
						operation: ['getSummary'],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'location_id',
					},
				},
				description: 'The ID of the location',
			},
			{
				displayName: 'Agent ID',
				name: 'agent_id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['call'],
						operation: ['getSummary'],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'agent_id',
					},
				},
				description: 'The ID of the AI agent',
			},
			{
				displayName: 'Interaction ID',
				name: 'interaction_id',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['call'],
						operation: ['getSummary'],
					},
				},
				routing: {
					send: {
						type: 'body',
						property: 'interaction_id',
					},
				},
				description: 'The Interaction ID of the call to retrieve details for',
			},
		],
	};
}
