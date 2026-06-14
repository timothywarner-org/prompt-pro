# Demo: Building a Contoso Robotics Customer Support Agent in Copilot Studio

**Law 26 -- Expect Breaking Changes**

Agentic platforms evolve rapidly. This walkthrough uses Microsoft Copilot Studio as it exists in early 2026. Screen layouts, feature names, and menu paths may shift between platform updates. The underlying design principles -- topic triggers, knowledge grounding, and test utterances -- remain stable even as the UI changes. Build for adaptability.

## What You Will Build

A customer support agent for Contoso Robotics that can:

- Answer product questions using a company knowledge base
- Troubleshoot common issues with WarehouseBot Pro, WarehouseBot Lite, and LogiMover 500
- Escalate complex issues to a human support representative

**Agent Name:** Contoso Robotics Support Assistant

**Agent Description:** Helps customers with product information, troubleshooting, and support requests for Contoso Robotics warehouse automation products.

## Prerequisites

- Microsoft 365 account with Copilot Studio license
- The knowledge base document at `../data/contoso-agent-knowledge-base.md`
- A web browser

## Step 1: Create the Agent

1. Navigate to [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com).
2. On the **Home** page, in the describe-your-agent box, enter a description of what the agent should do. Copilot Studio provisions the agent and opens its **Overview** page.
3. On the **Overview** page, refine the AI-generated details:
   - **Name:** Contoso Robotics Support Assistant
   - **Description:** Helps customers with product information, troubleshooting, and support requests for Contoso Robotics warehouse automation products.
   - **Instructions:** You are a friendly and knowledgeable customer support agent for Contoso Robotics. You help customers with product information about WarehouseBot Pro, WarehouseBot Lite, and LogiMover 500. You answer questions about pricing, specifications, warranty, and support policies. If you cannot answer a question, escalate to a human agent. Always be professional and concise.
4. Save your changes. (To skip the natural-language flow and fill in a form directly, use the manual "skip to configure" option on the Home page instead.)

## Step 2: Add the Knowledge Source

1. In the agent editor, open the **Knowledge** page.
2. Select **Add knowledge**.
3. Choose **File upload** as the source type.
4. Upload the file `../data/contoso-agent-knowledge-base.md` (or copy its contents into a document that you upload), then provide a name and description.
5. Select **Add** to confirm.

The agent will now use this document to ground its responses. When a customer asks about pricing, warranty terms, or product specs, the agent retrieves relevant passages from this knowledge base rather than generating answers from its training data alone.

## Step 3: Create Topic Triggers

Create three custom topics to handle the most common customer interactions.

### Topic 1: Product Information

1. Open the **Topics** page, select **Add a topic**, and choose **From blank**.
2. Name the topic: **Product Information**
3. Add these trigger phrases:
   - "Tell me about your products"
   - "What robots do you sell"
   - "WarehouseBot specifications"
   - "How much does LogiMover cost"
   - "Compare your robot models"
4. Add a **Message** node with the text: "I can help you with information about our product line. Let me look that up for you."
5. Add a **Create generative answers** node configured to search the uploaded knowledge base.
6. Save the topic.

### Topic 2: Troubleshooting

1. Add another topic from blank.
2. Name the topic: **Troubleshooting**
3. Add these trigger phrases:
   - "My robot is not working"
   - "WarehouseBot error code"
   - "Robot is stuck"
   - "Navigation problem"
   - "Battery not charging"
4. Add a **Question** node asking: "Which product are you experiencing issues with?" with options:
   - WarehouseBot Pro
   - WarehouseBot Lite
   - LogiMover 500
5. Add a **Question** node asking: "Please describe the issue you are experiencing."
6. Add a **Create generative answers** node to search the knowledge base for troubleshooting guidance.
7. Add a **Message** node: "If this does not resolve your issue, I can connect you with a support specialist."
8. Save the topic.

### Topic 3: Escalation to Human Agent

Escalation is handled through the built-in **Escalate** system topic rather than a custom topic.

1. On the **Topics** page, open the **System** tab and select the **Escalate** topic.
2. Add a **Message** node: "I understand you would like to speak with a support specialist. Let me transfer you now."
3. Add a transfer node via **Add node > Topic management > Transfer conversation**, then choose the **Transfer to agent** option (or **External phone number transfer**) for your organization's live agent system. If you have no live-agent hub, use **Go to another topic** with a support message and URL instead.
4. Save the topic.

## Step 4: Configure Suggested Prompts

1. Return to the agent **Overview** page.
2. In the **Suggested prompts** section, select **Add suggested prompts** and add these:
   - "Tell me about WarehouseBot Pro"
   - "I need help troubleshooting my robot"
   - "What is your warranty policy?"

Note: suggested prompts appear on the agent's welcome surface in Teams and Microsoft 365 Copilot. They do not show in the Copilot Studio test panel, so you will not see them while testing in Step 5.

## Step 5: Test the Agent

Use the built-in **Test** panel on the right side of the editor. Send each of the following utterances and verify the response:

| Test Utterance | Expected Behavior |
|----------------|-------------------|
| "What is the price of WarehouseBot Pro?" | Routes to Product Information topic; returns pricing from knowledge base |
| "My WarehouseBot Lite keeps losing Wi-Fi" | Routes to Troubleshooting topic; asks which product, then searches knowledge base |
| "Can I talk to a real person?" | Routes to Escalate to Support topic; shows transfer message |
| "Do you offer bulk discounts?" | Routes to Product Information or generative fallback; references pricing section |
| "What is the warranty on LogiMover 500?" | Routes to Product Information topic; returns warranty terms from knowledge base |
| "The navigation sensors on my robot are giving error E-401" | Routes to Troubleshooting topic; attempts to find relevant guidance |

## Step 6: Publish (Optional)

If you have a test environment available:

1. Select **Publish** from the top navigation.
2. Choose your target channel (Teams, web chat, or a custom website).
3. Follow the channel-specific configuration steps.

For this course exercise, testing in the built-in panel is sufficient.

## Connecting to Law 26

This agent was built using the Copilot Studio interface as it exists in early 2026. Here is what may change:

- **Menu paths** may be renamed or reorganized in future updates
- **Create generative answers** configuration options may expand
- **New channel options** (WhatsApp, Slack) may become available
- **Model selection** (the GPT models offered) will change as new models ship
- **MCP integration** may replace or supplement some knowledge source patterns

The design principles stay constant: define clear triggers, ground responses in authoritative knowledge, test with representative utterances, and provide an escalation path. When the UI changes, apply these principles to the new interface.

## Discussion Questions

1. What would you change about the trigger phrases to reduce misrouting?
2. How would you measure whether this agent is actually helping customers versus frustrating them?
3. What additional knowledge sources would improve the agent's responses?
4. How does the "expect breaking changes" mindset apply to maintaining this agent over the next 12 months?
