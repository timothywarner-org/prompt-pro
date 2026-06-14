# Authentication Patterns

## Table of Contents

- [Overview](#overview)
- [Pattern 1: JWT Token Validation](#pattern-1-jwt-token-validation)
- [Pattern 2: Symmetric JWT (Shared Secret)](#pattern-2-symmetric-jwt-shared-secret)
- [Pattern 3: OAuth Proxy](#pattern-3-oauth-proxy)
- [Choosing a Pattern](#choosing-a-pattern)

## Overview

FastMCP 3.0 supports three authentication approaches. All patterns work with the Streamable HTTP transport (authentication is not applicable to stdio transport).

## Pattern 1: JWT Token Validation

Validate JWTs issued by an external identity provider (Auth0, Entra ID, Okta, etc.). The most common production pattern.

### Server Configuration

```python
mcp = FastMCP(
    "SecureServer",
    auth={
        "provider": "jwt",
        "jwks_uri": "https://idp.example.com/.well-known/jwks.json",
        "issuer": "https://idp.example.com",
        "audience": "my-mcp-server",
    },
    mask_error_details=True,
)
```

### Environment Variable Configuration

```bash
FASTMCP_SERVER_AUTH_JWT_JWKS_URI=https://idp.example.com/.well-known/jwks.json
FASTMCP_SERVER_AUTH_JWT_ISSUER=https://idp.example.com
FASTMCP_SERVER_AUTH_JWT_AUDIENCE=my-mcp-server
```

### Client Usage

```python
from fastmcp import Client
from fastmcp.client.transports import StreamableHttpTransport

transport = StreamableHttpTransport(
    url="https://api.example.com/mcp",
    headers={"Authorization": "Bearer <jwt-token>"},
)
async with Client(transport) as client:
    result = await client.call_tool("protected_tool", {})
```

### Supported Algorithms

Asymmetric (recommended): RS256, RS384, RS512, ES256, ES384, ES512, PS256, PS384, PS512

## Pattern 2: Symmetric JWT (Shared Secret)

For internal services where both sides share a secret. Simpler but less secure than asymmetric.

```python
mcp = FastMCP(
    "InternalServer",
    auth={
        "provider": "jwt",
        "algorithm": "HS256",
        "secret": os.getenv("JWT_SECRET"),
    },
)
```

## Pattern 3: OAuth Proxy

FastMCP validates tokens while an external IdP handles login, MFA, and token issuance. Best for enterprise scenarios.

```python
mcp = FastMCP(
    "EnterpriseServer",
    auth={
        "provider": "jwt",
        "jwks_uri": "https://login.microsoftonline.com/{tenant}/discovery/v2.0/keys",
        "issuer": "https://login.microsoftonline.com/{tenant}/v2.0",
        "audience": "api://my-mcp-server",
    },
)
```

## Choosing a Pattern

| Scenario | Pattern | Why |
| -------- | ------- | --- |
| External IdP (Auth0, Entra, Okta) | JWT Validation | Standard, secure, scalable |
| Internal microservices | Symmetric JWT | Simple, fast, no IdP needed |
| Enterprise with SSO/MFA | OAuth Proxy | Delegates complex auth to IdP |
| Local development / stdio | None | stdio transport is inherently local |

### Security Checklist

- Always use `mask_error_details=True` in production
- Store secrets in environment variables, never in code
- Use asymmetric algorithms (RS256+) for external-facing servers
- Validate `issuer` and `audience` claims to prevent token reuse attacks
- Rotate signing keys regularly via JWKS endpoint
