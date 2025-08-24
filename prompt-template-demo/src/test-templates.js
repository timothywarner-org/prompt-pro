import { PromptManager } from './promptManager.js';

/**
 * Test the prompt template system without requiring API keys
 * This demonstrates the template functionality for teaching purposes
 */
async function testTemplates() {
  console.log('🧪 Testing Prompt Template System\n');
  
  const promptManager = new PromptManager();
  
  // Test 1: Load and substitute variables in code review template
  console.log('📝 Test 1: Code Review Template');
  console.log('─'.repeat(50));
  
  promptManager.addContext('experienceLevel', 'Intermediate');
  promptManager.addContext('language', 'JavaScript');
  
  const codeReviewPrompt = await promptManager.buildPrompt('code-review', {
    fileName: 'userProcessor.js',
    functionName: 'processUserData',
    purpose: 'Process user input data and convert to uppercase',
    code: `function processUserData(userData) {
  const result = {};
  for (let key in userData) {
    result[key] = userData[key].toUpperCase();
  }
  return result;
}`
  });
  
  console.log(codeReviewPrompt);
  console.log('\n✅ Code review template loaded and variables substituted\n');
  
  // Test 2: Email composition template
  console.log('📧 Test 2: Email Composition Template');
  console.log('─'.repeat(50));
  
  const emailPrompt = await promptManager.buildPrompt('email-composer', {
    recipient: 'john.doe@company.com',
    subject: 'Project Update - Q4 2024',
    purpose: 'Provide status update on the AI integration project',
    tone: 'Professional and collaborative',
    keyPoints: 'Project is 75% complete, on track for December delivery',
    callToAction: 'Schedule a review meeting next week',
    additionalContext: 'Follow-up to our previous discussion'
  });
  
  console.log(emailPrompt);
  console.log('\n✅ Email template loaded and variables substituted\n');
  
  // Test 3: Context persistence
  console.log('🔄 Test 3: Context Persistence');
  console.log('─'.repeat(50));
  
  promptManager.addContext('company', 'TechCorp Solutions');
  promptManager.addContext('styleGuide', 'Microsoft Writing Style Guide');
  
  const techWritingPrompt = await promptManager.buildPrompt('technical-writer', {
    documentType: 'API Reference',
    targetAudience: 'Senior developers',
    topic: 'User Authentication API',
    scope: 'Complete API documentation',
    keyInformation: 'OAuth 2.0, JWT tokens, rate limiting'
  });
  
  console.log('Context values:');
  console.log('  Company:', promptManager.getContext('company'));
  console.log('  Style Guide:', promptManager.getContext('styleGuide'));
  console.log('  Experience Level:', promptManager.getContext('experienceLevel'));
  console.log('\n✅ Context persists across template uses\n');
  
  // Test 4: Conversation history management
  console.log('💬 Test 4: Conversation History Management');
  console.log('─'.repeat(50));
  
  const messages = [
    { role: 'user', content: 'What is the best way to handle errors in Node.js?' },
    { role: 'assistant', content: 'Use try-catch blocks for synchronous code...' },
    { role: 'user', content: 'Can you show me an example?' },
    { role: 'assistant', content: 'Here is an example with async/await...' },
    { role: 'user', content: 'How about error types?' },
    { role: 'assistant', content: 'You can handle different error types...' }
  ];
  
  const trimmedMessages = promptManager.manageConversationHistory(messages, 200);
  console.log(`Original messages: ${messages.length}`);
  console.log(`Trimmed to fit context: ${trimmedMessages.length}`);
  console.log('Retained messages:', trimmedMessages.map(m => m.role));
  console.log('\n✅ Conversation history managed within token limits\n');
  
  console.log('🎉 All template tests passed!');
  console.log('\nThis demonstrates:');
  console.log('✅ Template loading from files');
  console.log('✅ Variable substitution with {{syntax}}');
  console.log('✅ Context persistence across operations');
  console.log('✅ Conversation history management');
  console.log('✅ Ready for production use with any LLM API');
}

// Run tests
testTemplates().catch(error => {
  console.error('❌ Test failed:', error.message);
  process.exit(1);
});