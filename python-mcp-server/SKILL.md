---
name: python-mcp-server
description: "Build production-grade Python MCP (Model Context Protocol) servers using FastMCP 3.0. Use when creating new MCP servers, adding tools/resources/prompts to existing servers, debugging MCP server issues, writing tests for MCP servers, or deploying MCP servers. Covers project scaffolding, FastMCP decorators, Context object, transport selection (stdio/HTTP/SSE), JWT authentication, error handling, in-memory testing, and Docker deployment."
---

# Python MCP Server Builder

Build MCP servers in Python using FastMCP 3.0 -- the fast, Pythonic framework for the Model Context Protocol.

## Workflow Decision Tree

Determine the task type first:

1. **Creating a new MCP server from scratch?**
   - Run `scripts/scaffold_server.py` to generate project structure
   - Follow "New Server Workflow" below

2. **Adding capabilities to an existing server?**
   - Read `references/fastmcp-api.md` for decorator patterns
   - Add tools, resources, or prompts as needed

3. **Writing or fixing tests?**
   - Read `references/testing-guide.md` for in-memory testing patterns
   - Use `Client(server)` for fast, subprocess-free tests

4. **Setting up authentication?**
   - Read `references/auth-patterns.md` for JWT/OAuth patterns

5. **Deploying to production?**
   - Read `references/deployment.md` for transport, Docker, and CI/CD

## New Server Workflow

### Step 1: Scaffold

Run the scaffolding script to generate a working project:

```bash
python scripts/scaffold_server.py my-server --path ./output
```

This creates a complete project with `pyproject.toml`, server module, tests, Dockerfile, and CI workflow.

### Step 2: Define Components

FastMCP 3.0 has three component types. Add them in the server module:

**Tools** -- Functions the LLM can call to take actions:

```python
@mcp.tool()
async def search_docs(query: str, limit: int = 10, ctx: Context) -> list[dict]:
    """Search documentation by keyword."""
    await ctx.info(f"Searching for: {query}")
    results = await db.search(query, limit=limit)
    await ctx.report_progress(progress=100, total=100)
    return results
```

**Resources** -- Data the LLM can read (like GET endpoints):

```python
@mcp.resource("config://app")
def get_config() -> dict:
    """Current application configuration."""
    return {"version": "1.0", "env": os.getenv("ENV", "dev")}
```

**Prompts** -- Reusable prompt templates:

```python
@mcp.prompt()
def summarize(text: str, style: str = "concise") -> str:
    """Generate a summary prompt."""
    return f"Summarize the following text in a {style} style:\n\n{text}"
```

### Step 3: Test

Write tests using the in-memory client pattern (no subprocess needed):

```python
import pytest
from fastmcp import Client

@pytest.mark.asyncio
async def test_search():
    async with Client(mcp) as client:
        result = await client.call_tool("search_docs", {"query": "hello"})
        assert len(result) > 0
```

Run with: `uv run pytest tests/ -v`

### Step 4: Run

```bash
# Development (with MCP Inspector at http://127.0.0.1:6274)
mcp dev src/server.py

# Production
mcp run src/server.py --transport http --host 0.0.0.0 --port 8000
```

## Key Patterns

### Context Object

Always accept `ctx: Context` for logging, progress, and resource access. The Context is injected automatically -- just add it as a parameter:

```python
@mcp.tool()
async def process(data: str, ctx: Context) -> str:
    await ctx.info("Starting")           # Client sees this
    await ctx.report_progress(50, 100)   # Progress bar
    content = await ctx.read_resource("config://app")  # Read resources
    result = await ctx.sample(f"Summarize: {data}")    # Use client LLM
    return result.text
```

### Async for I/O

Use `async def` for any tool that does I/O. Use `httpx` instead of `requests`:

```python
@mcp.tool()
async def fetch_data(url: str) -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        return response.json()
```

### Error Handling

Validate inputs. Mask errors in production:

```python
mcp = FastMCP("MyServer", mask_error_details=True)

@mcp.tool()
def divide(a: float, b: float) -> float:
    """Divide two numbers."""
    if b == 0:
        raise ValueError("Divisor must be non-zero")
    return a / b
```

### Composing Servers

Mount sub-servers under namespaces for modular design:

```python
main = FastMCP("Main")
db_server = FastMCP("Database")
api_server = FastMCP("API")

main.mount(db_server, namespace="db")
main.mount(api_server, namespace="api")
# Tools become: db/query, api/fetch, etc.
```

## Common Pitfalls

| Pitfall | Fix |
| ------- | --- |
| Using `print()` for logging | Use `await ctx.info()` -- clients see Context logs, not stdout |
| Blocking I/O with `requests` | Use `async def` + `httpx.AsyncClient` |
| Mutating input parameters | Return new objects: `{**config, "key": val}` |
| Missing input validation | Validate at tool boundary before processing |
| Leaking error details | Set `mask_error_details=True` in production |
| No tests before deploy | Use in-memory `Client(server)` pattern -- zero overhead |
| Hardcoded secrets | Use `os.getenv()` with validation, never inline keys |

## Resources

- **`scripts/scaffold_server.py`** -- Generate a complete MCP server project
- **`references/fastmcp-api.md`** -- FastMCP 3.0 API: decorators, Context, middleware
- **`references/testing-guide.md`** -- In-memory testing, mocking, MCP Inspector
- **`references/auth-patterns.md`** -- JWT validation, OAuth proxy, token patterns
- **`references/deployment.md`** -- Transports, Docker, CI/CD, environment config
- **`assets/templates/`** -- Ready-to-use project templates (pyproject.toml, Dockerfile, etc.)
