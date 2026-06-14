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
