# Deployment Guide

## Table of Contents

- [Transport Options](#transport-options)
- [Running the Server](#running-the-server)
- [Docker Deployment](#docker-deployment)
- [CI/CD with GitHub Actions](#cicd-with-github-actions)
- [Claude Desktop Integration](#claude-desktop-integration)

## Transport Options

FastMCP supports three transports. Choose based on your deployment target:

| Transport | Command | Best For |
| --------- | ------- | -------- |
| **stdio** | `python server.py` | Claude Desktop, local CLI tools |
| **Streamable HTTP** | `--transport http` | Production APIs, remote access |
| **SSE** | `--transport sse` | Legacy compatibility only |

### Streamable HTTP (Recommended for Production)

Full bidirectional communication over HTTP. Supports auth headers, load balancing, and standard HTTP infrastructure.

```python
mcp.run(transport="http", host="0.0.0.0", port=8000)
```

### stdio (Recommended for Desktop)

The default. Server communicates via stdin/stdout. Used by Claude Desktop and VS Code extensions.

```python
mcp.run()  # Defaults to stdio
```

### SSE (Legacy)

Server-Sent Events. Maintained for backward compatibility. Use Streamable HTTP for new projects.

```python
mcp.run(transport="sse", host="0.0.0.0", port=8000)
```

## Running the Server

### Development

```bash
# With MCP Inspector (interactive browser debugger)
mcp dev src/my_server/server.py

# Direct stdio mode
python -m my_server.server

# Direct HTTP mode
mcp run src/my_server/server.py --transport http --port 8000
```

### Production

```bash
# Environment-based configuration
export FASTMCP_SERVER_HOST=0.0.0.0
export FASTMCP_SERVER_PORT=8000
export ENV=production

mcp run src/my_server/server.py --transport http
```

## Docker Deployment

### Dockerfile

```dockerfile
FROM python:3.12-slim

WORKDIR /app

# Install uv for fast dependency resolution
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

# Install dependencies first (layer caching)
COPY pyproject.toml uv.lock* ./
RUN uv sync --frozen --no-dev

# Copy application code
COPY src/ ./src/

EXPOSE 8000

CMD ["uv", "run", "mcp", "run", "src/my_server/server.py", \
     "--transport", "http", "--host", "0.0.0.0", "--port", "8000"]
```

### Build and Run

```bash
docker build -t my-mcp-server .
docker run -p 8000:8000 -e ENV=production my-mcp-server
```

### Docker Compose (with dependencies)

```yaml
services:
  mcp-server:
    build: .
    ports:
      - "8000:8000"
    environment:
      - ENV=production
      - DATABASE_URL=postgresql://db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      POSTGRES_DB: mydb
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

## CI/CD with GitHub Actions

### Test Workflow

```yaml
name: Test MCP Server

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: astral-sh/setup-uv@v4
      - run: uv sync --dev
      - run: uv run pytest tests/ -v

  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: astral-sh/setup-uv@v4
      - run: uv sync --dev
      - run: uv run ruff check src/ tests/
      - run: uv run ruff format --check src/ tests/
```

### Deploy Workflow

```yaml
name: Deploy MCP Server

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v6
        with:
          push: true
          tags: ghcr.io/${{ github.repository }}:latest
```

## Claude Desktop Integration

### claude_desktop_config.json

```json
{
  "mcpServers": {
    "my-server": {
      "command": "uv",
      "args": ["run", "--directory", "/path/to/my-server", "mcp", "run", "src/my_server/server.py"],
      "env": {
        "ENV": "development"
      }
    }
  }
}
```

### Config File Locations

| OS | Path |
| -- | ---- |
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json` |
