import { PromptManager } from './promptManager.js';

/**
 * Simple test suite for prompt template functionality
 * Tests template loading, variable substitution, and context management
 */
class PromptTemplateTests {
  constructor() {
    this.promptManager = new PromptManager();
    this.testResults = [];
  }

  /**
   * Test template loading
   */
  async testTemplateLoading() {
    console.log('🧪 Testing template loading...');

    try {
      const template = await this.promptManager.loadTemplate('code-review');
      const hasContent = template && template.length > 0;

      this.testResults.push({
        test: 'Template Loading',
        passed: hasContent,
        message: hasContent ? 'Template loaded successfully' : 'Template is empty'
      });

      console.log(`✅ Template loaded: ${template.length} characters`);
    } catch (error) {
      this.testResults.push({
        test: 'Template Loading',
        passed: false,
        message: `Failed to load template: ${error.message}`
      });
      console.log(`❌ Template loading failed: ${error.message}`);
    }
  }

  /**
   * Test variable substitution
   */
  testVariableSubstitution() {
    console.log('🧪 Testing variable substitution...');

    const template = 'Hello {{name}}, your {{role}} is {{status}}!';
    const variables = {
      name: 'Tim',
      role: 'developer',
      status: 'awesome'
    };

    const result = this.promptManager.substituteVariables(template, variables);
    const expected = 'Hello Tim, your developer is awesome!';
    const passed = result === expected;

    this.testResults.push({
      test: 'Variable Substitution',
      passed,
      message: passed ? 'Variables substituted correctly' : `Expected "${expected}", got "${result}"`
    });

    console.log(`✅ Variable substitution: ${passed ? 'PASSED' : 'FAILED'}`);
  }

  /**
   * Test context management
   */
  testContextManagement() {
    console.log('🧪 Testing context management...');

    // Test adding context
    this.promptManager.addContext('user', 'Tim Warner');
    this.promptManager.addContext('role', 'AI Developer');

    const user = this.promptManager.getContext('user');
    const role = this.promptManager.getContext('role');
    const nonExistent = this.promptManager.getContext('nonExistent');

    const passed = user === 'Tim Warner' && role === 'AI Developer' && nonExistent === undefined;

    this.testResults.push({
      test: 'Context Management',
      passed,
      message: passed ? 'Context management working correctly' : 'Context management failed'
    });

    console.log(`✅ Context management: ${passed ? 'PASSED' : 'FAILED'}`);
  }

  /**
   * Test prompt building with context
   */
  async testPromptBuilding() {
    console.log('🧪 Testing prompt building...');

    try {
      // Set up context
      this.promptManager.addContext('language', 'JavaScript');
      this.promptManager.addContext('experienceLevel', 'Senior');

      const variables = {
        fileName: 'test.js',
        functionName: 'testFunction',
        purpose: 'Testing purposes',
        code: 'console.log("Hello World");'
      };

      const prompt = await this.promptManager.buildPrompt('code-review', variables);

      // Check if context variables are included
      const hasLanguage = prompt.includes('JavaScript');
      const hasExperience = prompt.includes('Senior');
      const hasCode = prompt.includes('console.log("Hello World")');

      const passed = hasLanguage && hasExperience && hasCode;

      this.testResults.push({
        test: 'Prompt Building',
        passed,
        message: passed ? 'Prompt built successfully with context' : 'Prompt building failed'
      });

      console.log(`✅ Prompt building: ${passed ? 'PASSED' : 'FAILED'}`);

    } catch (error) {
      this.testResults.push({
        test: 'Prompt Building',
        passed: false,
        message: `Prompt building failed: ${error.message}`
      });
      console.log(`❌ Prompt building failed: ${error.message}`);
    }
  }

  /**
   * Run all tests
   */
  async runTests() {
    console.log('🚀 **Running Prompt Template Tests**\n');

    await this.testTemplateLoading();
    this.testVariableSubstitution();
    this.testContextManagement();
    await this.testPromptBuilding();

    this.printResults();
  }

  /**
   * Print test results
   */
  printResults() {
    console.log('\n📊 **Test Results Summary**');
    console.log('─'.repeat(50));

    const passed = this.testResults.filter(r => r.passed).length;
    const total = this.testResults.length;

    this.testResults.forEach(result => {
      const status = result.passed ? '✅' : '❌';
      console.log(`${status} ${result.test}: ${result.message}`);
    });

    console.log('─'.repeat(50));
    console.log(`Overall: ${passed}/${total} tests passed`);

    if (passed === total) {
      console.log('🎉 All tests passed!');
    } else {
      console.log('⚠️  Some tests failed. Check the output above.');
    }
  }
}

// Run tests
const tests = new PromptTemplateTests();
tests.runTests().catch(error => {
  console.error('❌ Test suite failed:', error.message);
  process.exit(1);
});
