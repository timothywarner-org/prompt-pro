import fs from 'fs/promises';
import path from 'path';

/**
 * Prompt Template Manager
 * Handles template loading, variable substitution, and context management
 */
export class PromptManager {
  constructor(templatesDir = './templates') {
    this.templatesDir = templatesDir;
    this.templates = new Map();
    this.context = new Map();
  }

  /**
   * Load a template from file
   * @param {string} templateName - Name of the template file (without extension)
   * @returns {Promise<string>} Template content
   */
  async loadTemplate(templateName) {
    if (this.templates.has(templateName)) {
      return this.templates.get(templateName);
    }

    try {
      const templatePath = path.join(this.templatesDir, `${templateName}.txt`);
      const content = await fs.readFile(templatePath, 'utf-8');
      this.templates.set(templateName, content);
      return content;
    } catch (error) {
      throw new Error(`Failed to load template '${templateName}': ${error.message}`);
    }
  }

  /**
   * Substitute variables in template
   * @param {string} template - Template content
   * @param {Object} variables - Variables to substitute
   * @returns {string} Processed template
   */
  substituteVariables(template, variables = {}) {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return variables[key] !== undefined ? variables[key] : match;
    });
  }

  /**
   * Add context to the conversation
   * @param {string} key - Context key
   * @param {any} value - Context value
   */
  addContext(key, value) {
    this.context.set(key, value);
  }

  /**
   * Get context value
   * @param {string} key - Context key
   * @returns {any} Context value
   */
  getContext(key) {
    return this.context.get(key);
  }

  /**
   * Clear all context
   */
  clearContext() {
    this.context.clear();
  }

  /**
   * Build a complete prompt with context
   * @param {string} templateName - Template to use
   * @param {Object} variables - Template variables
   * @param {Object} options - Additional options
   * @returns {Promise<string>} Complete prompt
   */
  async buildPrompt(templateName, variables = {}, options = {}) {
    const template = await this.loadTemplate(templateName);

    // Merge context with variables
    const allVariables = {
      ...Object.fromEntries(this.context),
      ...variables
    };

    let prompt = this.substituteVariables(template, allVariables);

    // Add system prompt if provided
    if (options.systemPrompt) {
      prompt = `${options.systemPrompt}\n\n${prompt}`;
    }

    return prompt;
  }

  /**
   * Manage conversation history
   * @param {Array} messages - Array of message objects
   * @param {number} maxLength - Maximum context length
   * @returns {Array} Trimmed messages
   */
  manageConversationHistory(messages, maxLength = 4000) {
    let totalLength = 0;
    const trimmedMessages = [];

    // Start from the most recent messages
    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      const messageLength = JSON.stringify(message).length;

      if (totalLength + messageLength <= maxLength) {
        trimmedMessages.unshift(message);
        totalLength += messageLength;
      } else {
        break;
      }
    }

    return trimmedMessages;
  }
}
