# Identity Awareness Checklist

**Law 2: Identity Awareness** -- Your signed-in identity determines what data and capabilities the AI can access.

---

## Why This Matters

When Maria Chen (CEO of Contoso Robotics) signs into Microsoft 365 Copilot with her `mchen@contosorobotics.com` account, the AI can access her email, calendar, SharePoint sites, and Teams conversations. If she signs in with a personal account, none of that organizational data is available.

The same principle applies across every AI platform. Your identity is not just authentication -- it is context.

---

## Platform-by-Platform Checklist

### Microsoft 365 Copilot

| Factor | Work Account (mchen@contosorobotics.com) | Personal Account (mchen@outlook.com) |
|--------|------------------------------------------|--------------------------------------|
| Email access | Contoso Robotics Exchange mailbox | Personal Outlook.com inbox |
| File access | SharePoint, OneDrive for Business, Teams files | Personal OneDrive |
| Calendar | Contoso org calendar, room bookings | Personal calendar only |
| People data | Contoso org chart, colleague profiles | None |
| Compliance | Contoso data retention and DLP policies apply | Consumer terms of service |
| Copilot agents | Contoso-deployed agents in Copilot Studio | None |
| Sensitivity labels | Enforced per Contoso IT policy | Not available |

**Contoso example:** When a Contoso engineer asks Copilot "summarize last week's project updates," the response pulls from Teams channels and SharePoint documents scoped to their Contoso identity. Switching to a personal account returns nothing useful.

---

### ChatGPT (OpenAI)

| Factor | ChatGPT Team/Enterprise (Contoso workspace) | Personal ChatGPT account |
|--------|----------------------------------------------|--------------------------|
| Conversation privacy | Not used for model training | May be used for training (unless opted out) |
| Shared workspace | Team members see shared conversations and projects | Private to individual |
| Custom GPTs | Access to Contoso-published internal GPTs | Public GPT Store only |
| File uploads | Governed by Contoso workspace policies | Personal use terms |
| Admin controls | Contoso IT can set usage policies | User manages own settings |
| Memory | Workspace-scoped memory | Personal memory |

**Contoso example:** The Contoso Robotics sales team shares a "Contoso Deal Analyzer" custom GPT in their Team workspace. A salesperson who logs in with a personal account cannot see or use it.

---

### Claude (Anthropic)

| Factor | Claude Team/Enterprise (Contoso org) | Individual Claude account |
|--------|---------------------------------------|---------------------------|
| Conversation privacy | Not used for model training | Not used for training (Pro); free tier may differ |
| Projects | Shared team projects with persistent context | Personal projects only |
| Usage limits | Org-managed seat allocation | Individual plan limits |
| Admin controls | Contoso admin sets policies, reviews usage | Self-managed |
| SSO | Contoso SSO/SAML integration | Email/password or Google |

**Contoso example:** Contoso's engineering team maintains a Claude Project pre-loaded with hardware specs and API documentation. Team members see it; personal account holders do not.

---

### Google Gemini

| Factor | Google Workspace (mchen@contosorobotics.com) | Personal Google account |
|--------|-----------------------------------------------|------------------------|
| Drive access | Contoso Shared Drives and team files | Personal Google Drive |
| Gmail context | Contoso business email | Personal Gmail |
| Gems | Org-deployed Gems with company context | Personal Gems only |
| Admin policies | Contoso Workspace admin controls apply | Consumer terms |
| Data residency | Per Contoso Workspace configuration | Google default |

**Contoso example:** A Contoso product manager asks Gemini to "find the latest logistics market research in our Drive." With the Workspace account, Gemini searches Contoso Shared Drives. With a personal account, it searches only personal files.

---

## Quick Self-Check Before Prompting

Before you enter a prompt, verify:

- [ ] Which account am I signed into right now?
- [ ] Does this task require access to organizational data?
- [ ] Am I comfortable with this platform's data handling policy for my current account type?
- [ ] If I am using a personal account for work tasks, am I manually providing context the AI would otherwise have access to?
- [ ] Does my organization have policies about which AI tools I can use with work data?

---

## Key Takeaway

Your identity is the first layer of context. Switching accounts does not just change your name in the corner of the screen -- it changes what the AI can see, what policies govern the interaction, and whether your prompts are grounded in organizational knowledge or operating blind.

Always know which identity you are using before you prompt.
