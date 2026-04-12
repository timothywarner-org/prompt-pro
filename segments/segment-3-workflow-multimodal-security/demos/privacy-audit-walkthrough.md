# Privacy Audit Walkthrough

**Law covered:** 22 (Privacy)
**Time:** 10 minutes
**Platforms:** ChatGPT, Claude, Gemini, Microsoft 365 Copilot

## Scenario

Contoso Robotics' IT administrator, James Okafor, has been asked by CEO Maria Chen to audit the company's AI tool usage. Specifically, she wants to know:

1. Where does each tool store conversation data?
2. Is company data being used to train the provider's models?
3. How can employees delete their conversation history?
4. What controls exist to prevent accidental data leakage?

James needs to check the settings in each platform the company uses. This walkthrough follows his audit.

## Platform 1: ChatGPT (OpenAI)

### Data Controls Location

**Settings > Data Controls**

### Key Settings to Review

| Setting | Path | What It Controls |
|---------|------|-----------------|
| Improve the model for everyone | Settings > Data Controls | Whether your conversations are used for model training. **Turn OFF for corporate use.** |
| Chat history and training | Settings > Data Controls | Whether conversations are saved in history. Disabling also opts out of training. |
| Shared links | Settings > Data Controls > Shared Links | Manage all publicly shared conversation links. Review and revoke as needed. |
| Export data | Settings > Data Controls > Export Data | Request a full export of your account data (delivered via email within 24 hours). |
| Delete account | Settings > Data Controls > Delete Account | Permanent deletion of all data. |

### Enterprise and Team Tier Differences

- ChatGPT Team and Enterprise accounts are **opted out of training by default**.
- Workspace admins can enforce data controls across all seats.
- Enterprise adds SSO, SCIM provisioning, and a dedicated data processing agreement.

### Audit Action Items

- [ ] Verify "Improve the model for everyone" is OFF for all Contoso accounts
- [ ] Review and revoke any shared conversation links
- [ ] Confirm Team/Enterprise workspace admin settings match corporate policy

---

## Platform 2: Claude (Anthropic)

### Data Controls Location

**Settings > Privacy** (web) or **Account Settings** (API)

### Key Settings to Review

| Setting | Path | What It Controls |
|---------|------|-----------------|
| Allow training | Settings > Privacy | Whether your conversations may be used for model improvement. Pro/Team accounts default to OFF. |
| Delete conversations | Conversation sidebar > Delete | Remove individual conversations permanently. |
| Delete all conversations | Settings > Account > Delete All Chats | Bulk deletion of entire conversation history. |
| Usage data | Settings > Privacy | Controls whether anonymized usage metadata is shared. |

### Pro and Team Tier Differences

- Claude Pro and Team users' conversations are **not used for training by default**.
- Team admins can manage member settings centrally.
- API usage (via Anthropic Console) has separate data retention policies -- review at console.anthropic.com > Settings.

### Audit Action Items

- [ ] Confirm "Allow training" is OFF for all Contoso Pro/Team accounts
- [ ] Review API data retention settings in Anthropic Console
- [ ] Document Anthropic's data processing terms for compliance file

---

## Platform 3: Gemini (Google)

### Data Controls Location

**Gemini app > Activity > Gemini Apps Activity** or **myactivity.google.com**

### Key Settings to Review

| Setting | Path | What It Controls |
|---------|------|-----------------|
| Gemini Apps Activity | myactivity.google.com > Gemini Apps Activity | Master toggle for whether Gemini conversations are saved and reviewed. |
| Auto-delete | Gemini Apps Activity > Auto-delete | Set conversations to auto-delete after 3 months, 18 months, or 36 months. |
| Individual deletion | Gemini Apps Activity > Select items > Delete | Remove specific conversations from history. |
| Workspace settings | Google Admin Console > Apps > Google Workspace > Gemini | Enterprise controls for Workspace-licensed users. |

### Workspace Tier Differences

- Google Workspace with Gemini Enterprise: conversations are **not used for training**.
- Consumer Gemini accounts: conversations with Gemini Apps Activity ON **may be reviewed by humans** and used for improvement.
- Admin Console allows Workspace admins to disable Gemini entirely or restrict to specific OUs.

### Audit Action Items

- [ ] Verify Gemini Apps Activity is configured per corporate policy (OFF or auto-delete at 3 months)
- [ ] Check Google Admin Console restrictions for Workspace users
- [ ] Ensure consumer Google accounts are not being used for company work

---

## Platform 4: Microsoft 365 Copilot

### Data Controls Location

**Microsoft 365 Admin Center > Settings > Copilot** and **Microsoft Purview**

### Key Settings to Review

| Setting | Path | What It Controls |
|---------|------|-----------------|
| Copilot data residency | M365 Admin Center > Settings > Org settings > Copilot | Where Copilot data is processed and stored (follows your M365 tenant geography). |
| Copilot interaction history | M365 Admin Center > Settings > Copilot | Whether users can view their Copilot interaction history. |
| Web search grounding | M365 Admin Center > Settings > Copilot | Whether Copilot can use Bing web results to ground responses. Review for data leakage concerns. |
| Sensitivity labels | Microsoft Purview > Information Protection | Copilot respects existing sensitivity labels -- it will not surface content a user lacks permission to view. |
| Audit logs | Microsoft Purview > Audit | Search for Copilot interaction events across the tenant. |
| Retention policies | Microsoft Purview > Data Lifecycle Management | Set retention and deletion policies for Copilot interactions. |

### Key Assurances

- M365 Copilot conversations are **never used to train foundation models**.
- All data stays within the Microsoft 365 trust boundary.
- Copilot inherits existing permissions -- it cannot access files a user does not already have access to.
- Prompts and responses are encrypted in transit and at rest.

### Audit Action Items

- [ ] Review Copilot settings in M365 Admin Center
- [ ] Verify web search grounding policy aligns with data handling requirements
- [ ] Confirm sensitivity labels are applied to confidential content
- [ ] Set up Purview audit log alerts for Copilot usage
- [ ] Establish retention policies for Copilot interaction data

---

## Summary Comparison

| Dimension | ChatGPT | Claude | Gemini | M365 Copilot |
|-----------|---------|--------|--------|--------------|
| Training opt-out | Manual (consumer), default OFF (Team/Enterprise) | Default OFF (Pro/Team) | Via Activity toggle (consumer), default OFF (Workspace) | Never trains on customer data |
| Conversation deletion | Per-conversation or bulk | Per-conversation or bulk | Per-item or auto-delete schedule | Via Purview retention policies |
| Admin controls | Team/Enterprise admin panel | Team admin settings | Google Admin Console | M365 Admin Center + Purview |
| Data residency | US (default), EU available for Enterprise | US, EU options available | Follows Google Cloud region settings | Follows M365 tenant geography |
| Audit logging | Limited (Enterprise only) | API-level logging available | Google Workspace audit logs | Full Purview audit support |

## Exercise for Learners

Open each platform you have access to and locate the settings described above. For each one, answer:

1. Is the training opt-out currently enabled or disabled on your account?
2. Can you find and delete a specific past conversation?
3. If you are an admin, what tenant-wide controls are available?

Record your findings. This is the same audit James would produce for Maria Chen.

## Instructor Notes

- Settings paths change frequently. Verify the paths listed here against the live platforms before delivery.
- Not all learners will have admin access. Pair admin-access learners with non-admin learners for the M365 and Workspace sections.
- The most impactful takeaway is the training opt-out difference between consumer and enterprise tiers. Emphasize that consumer accounts are the risk vector.
