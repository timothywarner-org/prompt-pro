import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Application configuration
 * Centralized config management following Tim's pattern
 */
export const config = {
  // OpenAI Configuration
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
    maxTokens: 1000,
    temperature: 0.7
  },

  // Azure OpenAI Configuration (optional)
  azure: {
    endpoint: process.env.AZURE_OPENAI_ENDPOINT,
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    deploymentName: process.env.AZURE_OPENAI_DEPLOYMENT_NAME
  },

  // Application Settings
  app: {
    maxContextLength: 4000,
    defaultSystemPrompt: 'You are a helpful AI assistant.',
    retryAttempts: 3,
    retryDelay: 1000 // ms
  }
};

/**
 * Validate required configuration
 */
export function validateConfig() {
  const errors = [];

  if (!config.openai.apiKey) {
    errors.push('OPENAI_API_KEY is required');
  }

  if (errors.length > 0) {
    throw new Error(`Configuration errors: ${errors.join(', ')}`);
  }

  return true;
}
