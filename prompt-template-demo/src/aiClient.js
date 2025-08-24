import OpenAI from 'openai';
import { config } from './config.js';

/**
 * AI Client with retry logic and error handling
 * Enterprise-grade wrapper for OpenAI API
 */
export class AIClient {
  constructor() {
    this.client = new OpenAI({
      apiKey: config.openai.apiKey,
      maxRetries: config.app.retryAttempts
    });

    this.conversationHistory = [];
  }

  /**
   * Send a message to the AI with retry logic
   * @param {string} prompt - The prompt to send
   * @param {Object} options - Additional options
   * @returns {Promise<string>} AI response
   */
  async sendMessage(prompt, options = {}) {
    const {
      systemPrompt = config.app.defaultSystemPrompt,
      temperature = config.openai.temperature,
      maxTokens = config.openai.maxTokens,
      retryAttempts = config.app.retryAttempts
    } = options;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...this.conversationHistory,
      { role: 'user', content: prompt }
    ];

    for (let attempt = 1; attempt <= retryAttempts; attempt++) {
      try {
        const response = await this.client.chat.completions.create({
          model: config.openai.model,
          messages,
          temperature,
          max_tokens: maxTokens
        });

        const aiResponse = response.choices[0]?.message?.content;

        if (!aiResponse) {
          throw new Error('No response content received from AI');
        }

        // Update conversation history
        this.conversationHistory.push(
          { role: 'user', content: prompt },
          { role: 'assistant', content: aiResponse }
        );

        return aiResponse;

      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error.message);

        if (attempt === retryAttempts) {
          throw new Error(`Failed after ${retryAttempts} attempts: ${error.message}`);
        }

        // Wait before retrying
        await this.delay(config.app.retryDelay * attempt);
      }
    }
  }

  /**
   * Send a message with structured output (function calling)
   * @param {string} prompt - The prompt to send
   * @param {Array} functions - Array of function definitions
   * @param {Object} options - Additional options
   * @returns {Promise<Object>} Structured response
   */
  async sendMessageWithFunctions(prompt, functions, options = {}) {
    const {
      systemPrompt = config.app.defaultSystemPrompt,
      temperature = config.openai.temperature,
      maxTokens = config.openai.maxTokens
    } = options;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...this.conversationHistory,
      { role: 'user', content: prompt }
    ];

    try {
      const response = await this.client.chat.completions.create({
        model: config.openai.model,
        messages,
        functions,
        function_call: 'auto',
        temperature,
        max_tokens: maxTokens
      });

      const choice = response.choices[0];

      if (choice.finish_reason === 'function_call') {
        return {
          type: 'function_call',
          functionName: choice.message.function_call.name,
          arguments: JSON.parse(choice.message.function_call.arguments)
        };
      }

      return {
        type: 'message',
        content: choice.message.content
      };

    } catch (error) {
      throw new Error(`Function calling failed: ${error.message}`);
    }
  }

  /**
   * Clear conversation history
   */
  clearHistory() {
    this.conversationHistory = [];
  }

  /**
   * Get conversation history
   * @returns {Array} Conversation history
   */
  getHistory() {
    return [...this.conversationHistory];
  }

  /**
   * Set conversation history
   * @param {Array} history - New conversation history
   */
  setHistory(history) {
    this.conversationHistory = [...history];
  }

  /**
   * Utility delay function
   * @param {number} ms - Milliseconds to delay
   * @returns {Promise} Promise that resolves after delay
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
