# Weather MCP Server Demo

A sample Model Context Protocol (MCP) server that provides weather data using **tools**, **resources**, and **prompts** -- the three core MCP primitives. All data is hardcoded so no API keys are needed.

## What This Server Exposes

### Tools (actions the LLM can call)

- **`get_weather`** -- Return temperature, condition, humidity, wind, and forecast for a city
- **`compare_weather`** -- Side-by-side comparison of two cities

### Resources (data the client can read)

- **`weather://cities`** -- JSON list of available cities with current temp and condition
- **`weather://alerts`** -- JSON list of active weather alerts (Miami, Chicago, Denver)

### Prompts (reusable prompt templates)

- **`weather-report`** (args: `city`) -- Asks the LLM to write a friendly weather report
- **`travel-advisory`** (args: `origin`, `destination`) -- Travel advisory with packing tips and alerts

### Available Cities

Seattle, Los Angeles, New York, Miami, Chicago, Denver

## Setup

```bash
cd segments/segment-4-agentic-ai/mcp-demos/weather-server
npm install
```

## Running in VS Code with GitHub Copilot

The repo includes `.vscode/mcp.json` which registers this server automatically. After running `npm install`:

1. Open this repo in VS Code
2. Open Copilot Chat (Ctrl+Shift+I)
3. The weather server tools appear under the MCP tools icon
4. Try: *"What's the weather in Seattle?"*

## Running in MCP Inspector

```bash
npx @modelcontextprotocol/inspector node server.js
```

This opens a browser UI where you can:

- Browse and call each **tool** with test inputs
- Read each **resource** URI
- List and invoke each **prompt** with arguments
- See the raw JSON-RPC messages

## Teaching Points

1. **Three MCP primitives** -- Tools, Resources, and Prompts each serve a different purpose
2. **No external dependencies** -- Hardcoded data keeps demos reliable
3. **Rich descriptions** -- Every tool, resource, and prompt has a description that helps the LLM (and Inspector) understand what it does
4. **Error handling** -- Requesting an unknown city returns a helpful error with available options
5. **High-level API** -- Uses `McpServer.registerTool`, `registerResource`, and `registerPrompt` (the current recommended SDK pattern)
