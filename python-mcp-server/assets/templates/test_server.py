"""
MCP Server Test Template

Uses FastMCP's in-memory Client for zero-overhead testing.
No subprocess, no network -- just direct Python calls.

Run with: uv run pytest tests/ -v
"""

import pytest
from fastmcp import Client

# Import your server instance
from my_server.server import mcp


@pytest.fixture
async def client():
    """Create an in-memory MCP client."""
    async with Client(mcp) as c:
        yield c


@pytest.mark.asyncio
async def test_hello_tool(client):
    """Tool returns a greeting with the given name."""
    result = await client.call_tool("hello", {"name": "World"})
    assert "Hello, World!" in str(result)


@pytest.mark.asyncio
async def test_config_resource(client):
    """Config resource returns version info."""
    result = await client.read_resource("config://app")
    assert result[0].content


@pytest.mark.asyncio
async def test_tools_are_discoverable(client):
    """All expected tools are listed."""
    tools = await client.list_tools()
    names = [t.name for t in tools]
    assert "hello" in names


@pytest.mark.asyncio
async def test_summarize_prompt(client):
    """Summarize prompt includes the input text."""
    result = await client.get_prompt("summarize", {"text": "Hello world"})
    assert "Hello world" in result.messages[0].content.text
