# n8n-nodes-kickcall

This is an n8n community node for [Kickcall AI](https://kickcall.ai) — the AI Receptionist for Care.

Kickcall AI helps healthcare and service businesses build end-to-end phone workflows, allowing you to easily automate outbound voice agent calls and retrieve call interaction summaries.

[n8n](https://n8n.io/) is a fair-code licensed workflow automation tool.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

To install this node, you can either:
1. Open your n8n workflow canvas, search for **Kickcall AI**, and click on it to install.
2. OR go to **Settings > Community Nodes** in your n8n instance and enter the npm package name: `n8n-nodes-kickcall`.

## Operations

* **Create Phone Call:** Create and initiate a new outbound phone call using a specific AI agent and location.
* **Get Summary:** Retrieve the interaction summary, call status, duration, hangup reason, and metadata of a specific phone call.

## Credentials

1. Get your API Key from your Kickcall AI dashboard.
2. In n8n, create a new credential for **Kickcall API**.
3. Select your Environment (Production or Development).
4. Enter your API Key.

## Usage

Once installed, you can use the node inside your workflow:
1. Open your n8n workflow canvas.
2. Search for **Kickcall AI** to add the node to your workflow.
3. Provide the following fields:
* The phone number you want to dial.
* Your Location ID.
* Your Agent ID.
* (Optional) LLM Dynamic Variables to dynamically inject context into your voice agent.
* (Optional) Metadata for tracking internal identifiers (e.g., customer IDs).

## Resources

* [Kickcall AI Website](https://kickcall.ai)
* [Kickcall n8n Integration Guide](https://support.kickcall.ai/help/articles/4414396-n8n)
* [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE.md)
