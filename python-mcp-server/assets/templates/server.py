"""
Minimal FastMCP 3.0 Server Template

Copy this as a starting point. Run with:
    mcp dev server.py          # Development (with Inspector)
    mcp run server.py          # Production stdio
    mcp run server.py --transport http --port 8000  # Production HTTP
"""

import os
from fastmcp import FastMCP, Context

mcp = FastMCP(
    "MyServer",
    mask_error_details=(os.getenv("ENV", "development") == "production"),
)


@mcp.tool()
async def hello(name: str, ctx: Context) -> str:
    """Greet someone by name."""
    await ctx.info(f"Greeting {name}")
    return f"Hello, {name}!"


@mcp.resource("config://app")
def get_config() -> dict:
    """Current server configuration."""
    return {
        "version": "0.1.0",
        "env": os.getenv("ENV", "development"),
    }


@mcp.prompt()
def summarize(text: str, style: str = "concise") -> str:
    """Generate a summary of the provided text."""
    styles = {
        "concise": "Be brief and highlight only key points.",
        "detailed": "Be thorough and cover all major points.",
    }
    instruction = styles.get(style, styles["concise"])
    return f"Summarize the following text. {instruction}\n\n{text}"


if __name__ == "__main__":
    mcp.run()
