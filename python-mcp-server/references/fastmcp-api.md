# FastMCP 3.0 API Reference

## Table of Contents

- [Server Initialization](#server-initialization)
- [Tools](#tools)
- [Resources](#resources)
- [Prompts](#prompts)
- [Context Object](#context-object)
- [Middleware](#middleware)
- [Server Composition](#server-composition)

## Server Initialization

```python
from fastmcp import FastMCP

mcp = FastMCP(
    name="MyServer",              # Server name shown to clients
    mask_error_details=True,      # Hide internal errors in production
)
```

Environment-based configuration:

| Variable | Purpose |
| -------- | ------- |
| `FASTMCP_SERVER_HOST` | Bind address (default: `127.0.0.1`) |
| `FASTMCP_SERVER_PORT` | Port number (default: `8000`) |
| `FASTMCP_SERVER_AUTH_JWT_ISSUER` | JWT issuer for validation |
| `FASTMCP_SERVER_AUTH_JWT_AUDIENCE` | JWT audience for validation |
| `FASTMCP_SERVER_AUTH_JWT_JWKS_URI` | JWKS endpoint for key retrieval |

## Tools

Tools are functions the LLM calls to perform actions. They are the most common component.

### Basic Tool

```python
@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers."""
    return a + b
```

### Async Tool with Context

```python
@mcp.tool()
async def search(query: str, limit: int = 10, ctx: Context) -> list[dict]:
    """Search the database."""
    await ctx.info(f"Searching for: {query}")
    results = await db.search(query, limit=limit)
    await ctx.report_progress(progress=100, total=100)
    return results
```

### Tool with Tags and Metadata

```python
@mcp.tool(
    tags={"database", "read-only"},
    meta={"version": "2.0", "team": "backend"},
)
async def get_user(user_id: str) -> dict:
    """Retrieve user by ID."""
    ...
```

### Key Rules

- Use `async def` for any I/O (database, HTTP, file system)
- Accept `ctx: Context` to access logging, progress, resource reading
- Return JSON-serializable types (dict, list, str, int, float, bool)
- Type hints drive the tool's input schema -- be precise
- Docstrings become the tool's description -- be clear and specific

## Resources

Resources expose data the LLM can read. Think of them as GET endpoints.

### Static Resource (Fixed URI)

```python
@mcp.resource("config://app")
def get_config() -> dict:
    """Application configuration."""
    return {"version": "1.0", "env": "production"}
```

### Dynamic Resource (URI Template)

```python
@mcp.resource("users://{user_id}")
def get_user(user_id: str) -> dict:
    """User profile by ID."""
    return db.get_user(user_id)
```

### With Full Metadata

```python
@mcp.resource(
    uri="data://metrics",
    name="SystemMetrics",
    description="Current system performance metrics.",
    mime_type="application/json",
    tags={"monitoring"},
)
def get_metrics() -> dict:
    return {"cpu": 45.2, "memory": 72.1}
```

### Key Rules

- Static URIs (`config://app`) for fixed data
- URI templates (`users://{id}`) for parameterized data
- Return JSON-serializable types or plain strings
- Set `mime_type` when returning non-JSON data

## Prompts

Prompts are reusable templates that guide the LLM's approach to a task.

```python
@mcp.prompt()
def code_review(code: str, language: str = "python") -> str:
    """Generate a code review prompt."""
    return (
        f"Review this {language} code for bugs, security issues, "
        f"and style problems:\n\n```{language}\n{code}\n```"
    )
```

### Multi-Message Prompt

```python
from fastmcp.prompts import UserMessage, AssistantMessage

@mcp.prompt()
def debug_session(error: str) -> list:
    """Start a debugging session."""
    return [
        UserMessage(f"I'm seeing this error:\n\n{error}"),
        AssistantMessage("Let me analyze this error step by step."),
        UserMessage("What are the most likely root causes?"),
    ]
```

## Context Object

The Context object is injected automatically when a tool or prompt accepts a `ctx: Context` parameter.

### Logging

```python
await ctx.debug("Verbose detail")
await ctx.info("Normal operation")
await ctx.warning("Something unexpected")
await ctx.error("Something failed")
```

### Progress Reporting

```python
for i, item in enumerate(items):
    await ctx.report_progress(progress=i + 1, total=len(items))
    process(item)
```

### Reading Resources

```python
content = await ctx.read_resource("config://app")
data = content[0].content  # Access the content string/bytes
```

### LLM Sampling

Ask the client's LLM to process something:

```python
result = await ctx.sample(f"Summarize in 10 words: {text}")
summary = result.text
```

### Request-Scoped State

```python
ctx.set_state("user_id", "abc123")
user_id = ctx.get_state("user_id")
```

### Accessing Context in Nested Functions

```python
from fastmcp.server.dependencies import get_context

async def helper():
    ctx = get_context()  # Only works within a request
    await ctx.info("Called from helper")
```

## Middleware

### Built-In Error Handling

```python
from fastmcp.server.middleware.error_handling import (
    ErrorHandlingMiddleware,
    RetryMiddleware,
)

mcp.add_middleware(ErrorHandlingMiddleware(
    include_traceback=True,
    transform_errors=True,
))

mcp.add_middleware(RetryMiddleware(
    max_retries=3,
    retry_exceptions=(ConnectionError, TimeoutError),
))
```

### Custom Middleware

```python
import logging
from fastmcp.server.middleware import Middleware, MiddlewareContext

class RequestLogger(Middleware):
    def __init__(self):
        self.logger = logging.getLogger("mcp.requests")

    async def process(self, ctx: MiddlewareContext, next_handler):
        self.logger.info(f"Request: {ctx.request}")
        result = await next_handler(ctx)
        self.logger.info(f"Response: {result}")
        return result

mcp.add_middleware(RequestLogger())
```

## Server Composition

### Mounting Sub-Servers

```python
main = FastMCP("Main")
db = FastMCP("Database")
search = FastMCP("Search")

main.mount(db, namespace="db")
main.mount(search, namespace="search")
# Tools: db/query, search/find, etc.
```

### Disabling Components

```python
# Disable by tag
mcp.disable(tags={"internal"})

# Disable by key
mcp.disable(keys=["tool:debug_info"])
```

### Component Versioning (FastMCP 3.0)

```python
@mcp.tool(meta={"version": "2.0"})
async def improved_search(query: str) -> list:
    ...
```
