import { validateConfig } from './config.js';
import { PromptManager } from './promptManager.js';
import { AIClient } from './aiClient.js';

/**
 * Main application demonstrating prompt templates and context management
 * Enterprise-grade prompt engineering with minimal dependencies
 */
class PromptTemplateDemo {
  constructor() {
    this.promptManager = new PromptManager();
    this.aiClient = new AIClient();
  }

  /**
   * Initialize the application
   */
  async initialize() {
    try {
      validateConfig();
      console.log('✅ Configuration validated successfully');
      console.log('🚀 Prompt Template Demo initialized\n');
    } catch (error) {
      console.error('❌ Configuration error:', error.message);
      process.exit(1);
    }
  }

  /**
   * Demo: Code Review with Context Management
   */
  async demoCodeReview() {
    console.log('🔍 **Demo: Code Review with Context Management**\n');

    // Set up context
    this.promptManager.addContext('experienceLevel', 'Intermediate');
    this.promptManager.addContext('language', 'JavaScript');

    const codeToReview = `
function processUserData(userData) {
  const result = {};
  for (let key in userData) {
    result[key] = userData[key].toUpperCase();
  }
  return result;
}
    `.trim();

    const variables = {
      fileName: 'userProcessor.js',
      functionName: 'processUserData',
      purpose: 'Process user input data and convert to uppercase',
      code: codeToReview
    };

    try {
      const prompt = await this.promptManager.buildPrompt('code-review', variables, {
        systemPrompt: 'You are an expert JavaScript developer with 10+ years of experience.'
      });

      console.log('📝 Generated Prompt:');
      console.log('─'.repeat(50));
      console.log(prompt);
      console.log('─'.repeat(50));

      const response = await this.aiClient.sendMessage(prompt);

      console.log('\n🤖 AI Response:');
      console.log('─'.repeat(50));
      console.log(response);
      console.log('─'.repeat(50));

    } catch (error) {
      console.error('❌ Error in code review demo:', error.message);
    }
  }

  /**
   * Demo: Email Composition with Template Variables
   */
  async demoEmailComposition() {
    console.log('\n📧 **Demo: Email Composition with Template Variables**\n');

    const variables = {
      recipient: 'john.doe@company.com',
      subject: 'Project Update - Q4 2024',
      purpose: 'Provide status update on the AI integration project',
      tone: 'Professional and collaborative',
      keyPoints: 'Project is 75% complete, on track for December delivery, need stakeholder feedback on UI mockups',
      callToAction: 'Schedule a review meeting next week',
      additionalContext: 'This is a follow-up to our previous discussion about the AI integration timeline.'
    };

    try {
      const prompt = await this.promptManager.buildPrompt('email-composer', variables);

      console.log('📝 Generated Prompt:');
      console.log('─'.repeat(50));
      console.log(prompt);
      console.log('─'.repeat(50));

      const response = await this.aiClient.sendMessage(prompt);

      console.log('\n🤖 AI Response:');
      console.log('─'.repeat(50));
      console.log(response);
      console.log('─'.repeat(50));

    } catch (error) {
      console.error('❌ Error in email composition demo:', error.message);
    }
  }

  /**
   * Demo: Technical Documentation with Context Persistence
   */
  async demoTechnicalWriting() {
    console.log('\n📚 **Demo: Technical Documentation with Context Persistence**\n');

    // Add persistent context
    this.promptManager.addContext('company', 'TechCorp Solutions');
    this.promptManager.addContext('styleGuide', 'Microsoft Writing Style Guide');

    const variables = {
      documentType: 'API Reference',
      targetAudience: 'Senior developers and system architects',
      topic: 'User Authentication API',
      scope: 'Complete API documentation including endpoints, authentication, and error handling',
      keyInformation: 'OAuth 2.0 implementation, JWT tokens, rate limiting, error codes'
    };

    try {
      const prompt = await this.promptManager.buildPrompt('technical-writer', variables);

      console.log('📝 Generated Prompt:');
      console.log('─'.repeat(50));
      console.log(prompt);
      console.log('─'.repeat(50));

      const response = await this.aiClient.sendMessage(prompt);

      console.log('\n🤖 AI Response:');
      console.log('─'.repeat(50));
      console.log(response);
      console.log('─'.repeat(50));

    } catch (error) {
      console.error('❌ Error in technical writing demo:', error.message);
    }
  }

  /**
   * Demo: Conversation History Management
   */
  async demoConversationHistory() {
    console.log('\n💬 **Demo: Conversation History Management**\n');

    // Simulate a conversation
    const conversation = [
      { role: 'user', content: 'What is the best way to handle errors in Node.js?' },
      { role: 'assistant', content: 'In Node.js, you should use try-catch blocks for synchronous code and .catch() for promises. Always log errors and provide meaningful error messages.' },
      { role: 'user', content: 'Can you show me an example?' },
      { role: 'assistant', content: 'Here\'s an example:\n\n```javascript\nasync function processData() {\n  try {\n    const result = await someAsyncOperation();\n    return result;\n  } catch (error) {\n    console.error(\'Processing failed:\', error.message);\n    throw new Error(\'Data processing failed\');\n  }\n}\n```' }
    ];

    this.aiClient.setHistory(conversation);

    const followUpQuestion = 'How should I handle different types of errors differently?';

    try {
      const response = await this.aiClient.sendMessage(followUpQuestion);

      console.log('💬 Follow-up Question:', followUpQuestion);
      console.log('🤖 AI Response (with context):');
      console.log('─'.repeat(50));
      console.log(response);
      console.log('─'.repeat(50));

      console.log('\n📊 Conversation History Length:', this.aiClient.getHistory().length);

    } catch (error) {
      console.error('❌ Error in conversation history demo:', error.message);
    }
  }

  /**
   * Run all demos
   */
  async runDemos() {
    await this.initialize();

    console.log('🎯 **Tim\'s Prompt Template Demo**');
    console.log('Demonstrating enterprise-grade prompt engineering with minimal dependencies\n');

    await this.demoCodeReview();
    await this.demoEmailComposition();
    await this.demoTechnicalWriting();
    await this.demoConversationHistory();

    console.log('\n🎉 **Demo Complete!**');
    console.log('This demonstrates:');
    console.log('✅ Template-based prompt generation');
    console.log('✅ Context management and persistence');
    console.log('✅ Conversation history handling');
    console.log('✅ Error handling and retry logic');
    console.log('✅ Enterprise-grade architecture patterns');
  }
}

// Run the demo
const demo = new PromptTemplateDemo();
demo.runDemos().catch(error => {
  console.error('❌ Demo failed:', error.message);
  process.exit(1);
});
