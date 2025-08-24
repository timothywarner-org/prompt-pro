console.log('🚀 Debug test starting...');

try {
  console.log('📁 Current directory:', process.cwd());
  console.log('📦 Node version:', process.version);

  // Test basic import
  const fs = await import('fs/promises');
  console.log('✅ fs/promises imported successfully');

  // Test our modules
  const { PromptManager } = await import('./src/promptManager.js');
  console.log('✅ PromptManager imported successfully');

  const pm = new PromptManager();
  console.log('✅ PromptManager instantiated successfully');

  // Test template loading
  const template = await pm.loadTemplate('code-review');
  console.log('✅ Template loaded:', template.length, 'characters');

  console.log('🎉 All tests passed!');

} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('Stack:', error.stack);
  process.exit(1);
}
