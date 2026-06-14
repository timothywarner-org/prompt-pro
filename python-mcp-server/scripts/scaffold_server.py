#!/usr/bin/env python3
"""
MCP Server Project Scaffolder

Generates a complete, production-ready FastMCP 3.0 server project
with proper structure, tests, Docker config, and CI workflow.

Usage:
    python scaffold_server.py <server-name> --path <output-dir>

Examples:
    python scaffold_server.py weather-api --path ./projects
    python scaffold_server.py doc-search --path /home/user/mcp-servers

Creates:
    <output-dir>/<server-name>/
    ├── pyproject.toml
    ├── README.md
    ├── Dockerfile
    ├── .env.example
    ├── .github/
    │   └── workflows/
    │       └── test.yml
    ├── src/
    │   └── <module_name>/
    │       ├── __init__.py
    │       ├── server.py
    │       ├── tools.py
    │       ├── resources.py
    │       └── prompts.py
    └── tests/
        ├── conftest.py
        └── test_tools.py
"""

import sys
import textwrap
from pathlib import Path


def to_module_name(server_name: str) -> str:
    """Convert kebab-case server name to snake_case module name."""
    return server_name.replace("-", "_")


def to_title(server_name: str) -> str:
    """Convert kebab-case to Title Case."""
    return " ".join(word.capitalize() for word in server_name.split("-"))


def create_pyproject(server_name: str, module_name: str) -> str:
    return textwrap.dedent(f"""\
        [project]
        name = "{server_name}"
        version = "0.1.0"
        description = "MCP server built with FastMCP 3.0"
        requires-python = ">=3.10"
        dependencies = [
            "fastmcp>=2.0",
            "httpx>=0.27",
        ]

        [project.optional-dependencies]
        dev = [
            "pytest>=8.0",
            "pytest-asyncio>=0.24",
        ]

        [build-system]
        requires = ["hatchling"]
        build-backend = "hatchling.build"

        [tool.pytest.ini_options]
        asyncio_mode = "auto"
        testpaths = ["tests"]

        [tool.ruff]
        target-version = "py310"
        line-length = 88

        [tool.ruff.lint]
        select = ["E", "F", "I", "N", "W", "UP"]
    """)


def create_server(server_name: str, module_name: str) -> str:
    title = to_title(server_name)
    return textwrap.dedent(f"""\
        \"\"\"
        {title} MCP Server

        A FastMCP 3.0 server exposing tools, resources, and prompts.
        Run with: mcp dev src/{module_name}/server.py
        \"\"\"

        from fastmcp import FastMCP

        from .tools import register_tools
        from .resources import register_resources
        from .prompts import register_prompts

        mcp = FastMCP(
            "{title}",
            mask_error_details=True,
        )

        register_tools(mcp)
        register_resources(mcp)
        register_prompts(mcp)

        if __name__ == "__main__":
            mcp.run()
    """)


def create_init(module_name: str) -> str:
    return textwrap.dedent(f"""\
        \"\"\"
        {to_title(module_name.replace("_", "-"))} MCP Server package.
        \"\"\"

        from .server import mcp

        __all__ = ["mcp"]
    """)


def create_tools() -> str:
    return textwrap.dedent("""\
        \"\"\"
        Tool definitions for the MCP server.

        Tools are functions the LLM can call to perform actions.
        Always use async for I/O operations and accept Context for logging.
        \"\"\"

        from fastmcp import FastMCP, Context


        def register_tools(mcp: FastMCP) -> None:
            \"\"\"Register all tools with the server.\"\"\"

            @mcp.tool()
            async def hello(name: str, ctx: Context) -> str:
                \"\"\"Greet someone by name.\"\"\"
                await ctx.info(f"Greeting {name}")
                return f"Hello, {name}! Welcome to the MCP server."

            @mcp.tool()
            async def add(a: int, b: int) -> int:
                \"\"\"Add two numbers together.\"\"\"
                return a + b
    """)


def create_resources() -> str:
    return textwrap.dedent("""\
        \"\"\"
        Resource definitions for the MCP server.

        Resources expose data the LLM can read (similar to GET endpoints).
        Use static URIs for fixed data and URI templates for dynamic data.
        \"\"\"

        import os
        from fastmcp import FastMCP


        def register_resources(mcp: FastMCP) -> None:
            \"\"\"Register all resources with the server.\"\"\"

            @mcp.resource("config://app")
            def get_config() -> dict:
                \"\"\"Current server configuration.\"\"\"
                return {
                    "version": "0.1.0",
                    "env": os.getenv("ENV", "development"),
                }

            @mcp.resource("greeting://{name}")
            def personalized_greeting(name: str) -> str:
                \"\"\"A personalized greeting for the given name.\"\"\"
                return f"Hello, {name}! Welcome aboard."
    """)


def create_prompts() -> str:
    return textwrap.dedent("""\
        \"\"\"
        Prompt definitions for the MCP server.

        Prompts are reusable templates that help the LLM approach tasks
        with specific instructions or context.
        \"\"\"

        from fastmcp import FastMCP


        def register_prompts(mcp: FastMCP) -> None:
            \"\"\"Register all prompts with the server.\"\"\"

            @mcp.prompt()
            def summarize(text: str, style: str = "concise") -> str:
                \"\"\"Generate a summary of the provided text.\"\"\"
                styles = {
                    "concise": "Be brief and highlight only key points.",
                    "detailed": "Be thorough and cover all major points.",
                    "bullet": "Use bullet points for each key finding.",
                }
                instruction = styles.get(style, styles["concise"])
                return f"Summarize the following text. {instruction}\\n\\n{text}"
    """)


def create_conftest(module_name: str) -> str:
    return textwrap.dedent(f"""\
        \"\"\"
        Shared test fixtures for MCP server tests.

        Uses the in-memory Client pattern: no subprocess, no network,
        just direct Python calls -- fast and reliable.
        \"\"\"

        import pytest
        from fastmcp import Client

        from {module_name}.server import mcp


        @pytest.fixture
        async def client():
            \"\"\"Create an in-memory MCP client bound to the test server.\"\"\"
            async with Client(mcp) as c:
                yield c
    """)


def create_test_tools() -> str:
    return textwrap.dedent("""\
        \"\"\"
        Tests for MCP server tools.

        Each test uses the in-memory client fixture from conftest.py.
        No subprocess or network overhead -- tests run in milliseconds.
        \"\"\"

        import pytest


        @pytest.mark.asyncio
        async def test_hello_tool(client):
            \"\"\"Test the hello tool returns a greeting.\"\"\"
            result = await client.call_tool("hello", {"name": "World"})
            assert "Hello, World!" in str(result)


        @pytest.mark.asyncio
        async def test_add_tool(client):
            \"\"\"Test the add tool with basic arithmetic.\"\"\"
            result = await client.call_tool("add", {"a": 2, "b": 3})
            assert result[0].text == "5"


        @pytest.mark.asyncio
        @pytest.mark.parametrize("a,b,expected", [
            (0, 0, "0"),
            (-1, 1, "0"),
            (100, 200, "300"),
        ])
        async def test_add_parametrized(client, a, b, expected):
            \"\"\"Test the add tool with various inputs.\"\"\"
            result = await client.call_tool("add", {"a": a, "b": b})
            assert result[0].text == expected
    """)


def create_dockerfile(module_name: str) -> str:
    return textwrap.dedent(f"""\
        FROM python:3.12-slim

        WORKDIR /app

        COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

        COPY pyproject.toml uv.lock* ./

        RUN uv sync --frozen --no-dev

        COPY src/ ./src/

        EXPOSE 8000

        CMD ["uv", "run", "mcp", "run", "src/{module_name}/server.py", \\
             "--transport", "http", "--host", "0.0.0.0", "--port", "8000"]
    """)


def create_env_example() -> str:
    return textwrap.dedent("""\
        # Server configuration
        ENV=development

        # Add your environment variables here
        # API_KEY=your-key-here
        # DATABASE_URL=postgresql://localhost:5432/mydb
    """)


def create_github_workflow(server_name: str) -> str:
    return textwrap.dedent(f"""\
        name: Test {to_title(server_name)}

        on: [push, pull_request]

        jobs:
          test:
            runs-on: ubuntu-latest
            steps:
              - uses: actions/checkout@v4
              - uses: astral-sh/setup-uv@v4
              - run: uv sync --dev
              - run: uv run pytest tests/ -v
    """)


def create_readme(server_name: str, module_name: str) -> str:
    title = to_title(server_name)
    return textwrap.dedent(f"""\
        # {title}

        An MCP server built with [FastMCP 3.0](https://gofastmcp.com).

        ## Quick Start

        ```bash
        # Install dependencies
        uv sync

        # Run with MCP Inspector (development)
        mcp dev src/{module_name}/server.py

        # Run in production mode
        mcp run src/{module_name}/server.py --transport http --host 0.0.0.0 --port 8000
        ```

        ## Testing

        ```bash
        uv run pytest tests/ -v
        ```

        ## Project Structure

        ```
        src/{module_name}/
        ├── server.py      # FastMCP instance and startup
        ├── tools.py       # Tool definitions (actions the LLM can call)
        ├── resources.py   # Resource definitions (data the LLM can read)
        └── prompts.py     # Prompt templates
        ```

        ## Adding a New Tool

        Edit `src/{module_name}/tools.py`:

        ```python
        @mcp.tool()
        async def my_tool(arg: str, ctx: Context) -> str:
            \"\"\"Description of what this tool does.\"\"\"
            await ctx.info(f"Processing {{arg}}")
            return f"Result: {{arg}}"
        ```

        Then add a test in `tests/test_tools.py`:

        ```python
        @pytest.mark.asyncio
        async def test_my_tool(client):
            result = await client.call_tool("my_tool", {{"arg": "test"}})
            assert "Result: test" in str(result)
        ```
    """)


def scaffold(server_name: str, output_path: str) -> Path:
    """Create a complete MCP server project."""
    module_name = to_module_name(server_name)
    project_dir = Path(output_path).resolve() / server_name

    if project_dir.exists():
        print(f"Error: {project_dir} already exists")
        return None

    # Create directory structure
    dirs = [
        project_dir / "src" / module_name,
        project_dir / "tests",
        project_dir / ".github" / "workflows",
    ]
    for d in dirs:
        d.mkdir(parents=True, exist_ok=True)

    # Write all files
    files = {
        "pyproject.toml": create_pyproject(server_name, module_name),
        "README.md": create_readme(server_name, module_name),
        "Dockerfile": create_dockerfile(module_name),
        ".env.example": create_env_example(),
        ".github/workflows/test.yml": create_github_workflow(server_name),
        f"src/{module_name}/__init__.py": create_init(module_name),
        f"src/{module_name}/server.py": create_server(server_name, module_name),
        f"src/{module_name}/tools.py": create_tools(),
        f"src/{module_name}/resources.py": create_resources(),
        f"src/{module_name}/prompts.py": create_prompts(),
        "tests/conftest.py": create_conftest(module_name),
        "tests/test_tools.py": create_test_tools(),
    }

    for rel_path, content in files.items():
        file_path = project_dir / rel_path
        file_path.write_text(content, encoding="utf-8")

    print(f"Created MCP server project: {project_dir}")
    print(f"\nNext steps:")
    print(f"  cd {project_dir}")
    print(f"  uv sync")
    print(f"  mcp dev src/{module_name}/server.py")
    return project_dir


def main():
    if len(sys.argv) < 4 or sys.argv[2] != "--path":
        print("Usage: scaffold_server.py <server-name> --path <output-dir>")
        print()
        print("Examples:")
        print("  scaffold_server.py weather-api --path ./projects")
        print("  scaffold_server.py doc-search --path .")
        sys.exit(1)

    server_name = sys.argv[1]
    output_path = sys.argv[3]

    result = scaffold(server_name, output_path)
    sys.exit(0 if result else 1)


if __name__ == "__main__":
    main()
