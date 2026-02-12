# MCP Server Demo Guide

## Prerequisites

- Node.js 18+ installed (`node --version`)
- VS Code with GitHub Copilot extension (for the Copilot demo)
- Internet access (for installing npm packages and MCP Inspector)

## Quick Setup

```bash
cd segments/segment-4-agentic-ai/mcp-demos/weather-server
npm install
```

## Demo 1: MCP Inspector

MCP Inspector is a browser-based tool for exploring any MCP server interactively.

```bash
cd segments/segment-4-agentic-ai/mcp-demos/weather-server
npx @modelcontextprotocol/inspector node server.js
```

This opens a browser UI. Walk through each tab:

### Tools tab

1. Select **get_weather** -- note the description and input schema
2. Enter `Seattle` in the `city` field and click **Run**
3. Show the result: temperature, condition, humidity, wind, forecast
4. Select **compare_weather** -- enter `Miami` and `Chicago`, click **Run**
5. Point out the side-by-side output and the "warmer" summary

### Resources tab

1. Click **weather://cities** -- show the JSON array of all available cities
2. Click **weather://alerts** -- show the three active alerts with severity levels
3. Explain: resources are *read-only data* the server exposes, unlike tools which perform actions

### Prompts tab

1. Select **weather-report** -- enter `Denver` for the city argument
2. Click **Get Prompt** -- show the generated message that would be sent to the LLM
3. Select **travel-advisory** -- enter `Seattle` as origin, `Miami` as destination
4. Click **Get Prompt** -- point out how it includes conditions for both cities plus active alerts
5. Explain: prompts are *reusable templates* that shape how the LLM responds

### Error Handling

1. Go back to **Tools**, select **get_weather**
2. Enter `Paris` and click **Run**
3. Show the error response listing available cities

## Demo 2: VS Code with GitHub Copilot

The repo includes `.vscode/mcp.json` which registers the weather server automatically.

1. Open this repo in VS Code
2. Make sure `npm install` has been run in the weather-server directory
3. Open Copilot Chat (Ctrl+Shift+I)
4. Look for the MCP tools icon (hammer) -- the weather server tools should appear

### Demo prompts to try

- *"What's the weather in Seattle?"* -- basic tool call
- *"Compare the weather in Miami and Chicago"* -- multi-parameter tool
- *"What cities have weather data?"* -- tests whether the LLM uses get_weather, compare_weather, or the cities resource
- *"What's the weather in Paris?"* -- error handling demo
- *"I'm traveling from Seattle to Miami -- what should I pack?"* -- tests whether the LLM chains multiple tool calls or uses the travel-advisory prompt

## How MCP Works (teaching summary)

1. **Server** -- A process (here, `node server.js`) that implements the MCP protocol over stdio
2. **Client** -- The host application (VS Code Copilot, Inspector, Claude Desktop) that connects to the server
3. **Tools** -- Actions the LLM can invoke (like function calling)
4. **Resources** -- Read-only data the client can fetch (like a GET endpoint)
5. **Prompts** -- Reusable prompt templates with arguments (like stored procedures for LLMs)
6. **Configuration** -- `.vscode/mcp.json` tells VS Code which servers to run and how

## Troubleshooting

- **Tools don't appear in Copilot** -- Restart VS Code after running `npm install`
- **Inspector won't start** -- Make sure you're running the command from the `weather-server` directory
- **Server crashes on startup** -- Check `node --version` is 18+
- **"Cannot find module" error** -- Run `npm install` in the `weather-server` directory

## Server Architecture

```text
server.js
  McpServer (from @modelcontextprotocol/sdk)
    registerTool('get_weather', ...)      -- Zod schema for input validation
    registerTool('compare_weather', ...)
    registerResource('city-list', 'weather://cities', ...)
    registerResource('weather-alerts', 'weather://alerts', ...)
    registerPrompt('weather-report', ...)
    registerPrompt('travel-advisory', ...)
  StdioServerTransport                    -- communicates via stdin/stdout
```

All weather data is hardcoded in `WEATHER_DATA` and `WEATHER_ALERTS` objects at the top of `server.js`. No API keys or network calls needed.
