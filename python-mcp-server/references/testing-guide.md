# Testing MCP Servers

## Table of Contents

- [In-Memory Testing (Primary Pattern)](#in-memory-testing-primary-pattern)
- [Testing Tools](#testing-tools)
- [Testing Resources](#testing-resources)
- [Testing Prompts](#testing-prompts)
- [Mocking External Dependencies](#mocking-external-dependencies)
- [Parameterized Tests](#parameterized-tests)
- [MCP Inspector (Development)](#mcp-inspector-development)

## In-Memory Testing (Primary Pattern)

FastMCP's `Client` class connects directly to a server in-memory. No subprocess, no network, no port conflicts. Tests run in milliseconds.

### Setup with conftest.py

```python
import pytest
from fastmcp import Client
from my_server.server import mcp

@pytest.fixture
async def client():
    async with Client(mcp) as c:
        yield c
```

### pyproject.toml Configuration

```toml
[tool.pytest.ini_options]
asyncio_mode = "auto"
testpaths = ["tests"]
```

## Testing Tools

### Basic Tool Test

```python
@pytest.mark.asyncio
async def test_hello(client):
    result = await client.call_tool("hello", {"name": "Alice"})
    assert "Hello, Alice!" in str(result)
```

### Testing Error Cases

```python
@pytest.mark.asyncio
async def test_divide_by_zero(client):
    with pytest.raises(Exception, match="non-zero"):
        await client.call_tool("divide", {"a": 10, "b": 0})
```

### Testing Tool Discovery

```python
@pytest.mark.asyncio
async def test_tools_listed(client):
    tools = await client.list_tools()
    tool_names = [t.name for t in tools]
    assert "hello" in tool_names
    assert "add" in tool_names
```

## Testing Resources

### Read a Static Resource

```python
@pytest.mark.asyncio
async def test_config_resource(client):
    result = await client.read_resource("config://app")
    assert result[0].content  # Has content
```

### Read a Dynamic Resource

```python
@pytest.mark.asyncio
async def test_user_resource(client):
    result = await client.read_resource("users://alice")
    data = json.loads(result[0].content)
    assert data["name"] == "alice"
```

### List Available Resources

```python
@pytest.mark.asyncio
async def test_resources_listed(client):
    resources = await client.list_resources()
    uris = [r.uri for r in resources]
    assert "config://app" in uris
```

## Testing Prompts

```python
@pytest.mark.asyncio
async def test_summarize_prompt(client):
    result = await client.get_prompt("summarize", {"text": "Hello world"})
    assert "Hello world" in result.messages[0].content.text
```

## Mocking External Dependencies

### Mocking HTTP Calls

```python
from unittest.mock import AsyncMock, patch

@pytest.mark.asyncio
@patch("my_server.tools.httpx.AsyncClient")
async def test_fetch_with_mock(mock_client_class, client):
    mock_response = AsyncMock()
    mock_response.json.return_value = {"data": "mocked"}
    mock_response.status_code = 200

    mock_instance = AsyncMock()
    mock_instance.get.return_value = mock_response
    mock_instance.__aenter__ = AsyncMock(return_value=mock_instance)
    mock_instance.__aexit__ = AsyncMock(return_value=False)
    mock_client_class.return_value = mock_instance

    result = await client.call_tool("fetch_data", {"url": "https://example.com"})
    assert "mocked" in str(result)
```

### Mocking Database Calls

```python
@pytest.mark.asyncio
@patch("my_server.tools.db")
async def test_search_with_mock_db(mock_db, client):
    mock_db.search = AsyncMock(return_value=[
        {"id": 1, "title": "Result 1"},
        {"id": 2, "title": "Result 2"},
    ])
    result = await client.call_tool("search", {"query": "test"})
    assert len(result) > 0
```

## Parameterized Tests

Test multiple inputs efficiently:

```python
@pytest.mark.asyncio
@pytest.mark.parametrize("a,b,expected", [
    (1, 2, "3"),
    (0, 0, "0"),
    (-5, 5, "0"),
    (100, 200, "300"),
])
async def test_add_various(client, a, b, expected):
    result = await client.call_tool("add", {"a": a, "b": b})
    assert result[0].text == expected
```

## MCP Inspector (Development)

The MCP Inspector is a browser-based tool for interactive testing during development.

### Launch

```bash
mcp dev src/my_server/server.py
# Opens http://127.0.0.1:6274
```

### Usage

1. Click "Connect" in the browser
2. Navigate tabs: Tools, Resources, Prompts
3. Click any tool to test it interactively
4. View request/response JSON for debugging

### When to Use Each

| Method | Best For |
| ------ | -------- |
| pytest + Client | Automated CI/CD, regression testing, TDD |
| MCP Inspector | Exploratory testing, debugging, demos |
| Both | Development workflow: Inspector to explore, pytest to lock in |
