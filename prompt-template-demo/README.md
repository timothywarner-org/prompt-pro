# Prompt Template Demo

> **Enterprise-grade prompt engineering with minimal dependencies** - Tim Warner

A **production-ready Node.js solution** demonstrating **prompt templates** and **context management** for LLM applications. Built with **minimal dependencies** and **enterprise patterns**.

## 🎯 **What This Demo Shows**

- ✅ **Template-based prompt generation** with variable substitution
- ✅ **Context management** and persistence across conversations
- ✅ **Conversation history** handling with intelligent trimming
- ✅ **Error handling** and retry logic for production reliability
- ✅ **Enterprise architecture** patterns for scalable AI applications
- ✅ **Testing framework** for prompt template validation

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+
- OpenAI API key

### **Installation**
```bash
# Clone and navigate
cd prompt-template-demo

# Install dependencies (only 2 packages!)
npm install

# Copy environment file
cp env.example .env

# Add your OpenAI API key to .env
OPENAI_API_KEY=your_api_key_here
```

### **Run the Demo**
```bash
# Run the full demo
npm start

# Run tests only
npm test

# Development mode with auto-restart
npm run dev
```

## 🏗️ **Architecture**

### **Core Components**

```
src/
├── config.js          # Centralized configuration management
├── promptManager.js   # Template loading and context management
├── aiClient.js        # OpenAI client with retry logic
├── index.js          # Main demo application
└── test.js           # Test suite

templates/
├── code-review.txt    # Code review prompt template
├── email-composer.txt # Email composition template
└── technical-writer.txt # Technical documentation template
```

### **Key Features**

#### **1. Prompt Manager (`promptManager.js`)**
- **Template loading** from files with caching
- **Variable substitution** using `{{variable}}` syntax
- **Context persistence** across conversations
- **Conversation history** management with length limits

#### **2. AI Client (`aiClient.js`)**
- **Retry logic** with exponential backoff
- **Error handling** for network and API issues
- **Function calling** support for structured outputs
- **Conversation history** management

#### **3. Configuration (`config.js`)**
- **Environment-based** configuration
- **Validation** of required settings
- **Azure OpenAI** support (optional)
- **Centralized** config management

## 📝 **Template System**

### **Template Syntax**
Templates use **mustache-style** variable substitution:

```txt
Hello {{name}}, your {{role}} is {{status}}!
```

### **Available Templates**

#### **Code Review Template**
```bash
# Template: templates/code-review.txt
# Variables: language, fileName, functionName, purpose, code, experienceLevel
```

#### **Email Composer Template**
```bash
# Template: templates/email-composer.txt
# Variables: recipient, subject, purpose, tone, keyPoints, callToAction
```

#### **Technical Writer Template**
```bash
# Template: templates/technical-writer.txt
# Variables: documentType, targetAudience, topic, scope, keyInformation
```

## 🔧 **Usage Examples**

### **Basic Template Usage**
```javascript
import { PromptManager } from './src/promptManager.js';

const promptManager = new PromptManager();

// Add context
promptManager.addContext('user', 'Tim Warner');
promptManager.addContext('role', 'Developer');

// Build prompt
const prompt = await promptManager.buildPrompt('code-review', {
  fileName: 'app.js',
  functionName: 'processData',
  code: 'console.log("Hello World");'
});
```

### **AI Client Usage**
```javascript
import { AIClient } from './src/aiClient.js';

const aiClient = new AIClient();

// Send message with retry logic
const response = await aiClient.sendMessage(prompt, {
  temperature: 0.7,
  maxTokens: 1000
});

// Use function calling
const functions = [{
  name: 'process_data',
  description: 'Process user data',
  parameters: {
    type: 'object',
    properties: {
      action: { type: 'string' }
    }
  }
}];

const result = await aiClient.sendMessageWithFunctions(prompt, functions);
```

## 🧪 **Testing**

### **Run Tests**
```bash
npm test
```

### **Test Coverage**
- ✅ Template loading and caching
- ✅ Variable substitution
- ✅ Context management
- ✅ Prompt building with context
- ✅ Error handling

## 🔒 **Security & Best Practices**

### **Environment Variables**
- **Never commit** API keys to version control
- Use `.env` file for local development
- Use **Azure Key Vault** or **AWS Secrets Manager** for production

### **Error Handling**
- **Retry logic** for transient failures
- **Graceful degradation** when AI services are unavailable
- **Comprehensive logging** for debugging

### **Rate Limiting**
- **Built-in delays** between retries
- **Configurable** retry attempts and delays
- **Respect** API rate limits

## 🚀 **Production Deployment**

### **Environment Setup**
```bash
# Production environment variables
OPENAI_API_KEY=your_production_key
OPENAI_MODEL=gpt-4-turbo-preview
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your_azure_key
```

### **Docker Support**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["npm", "start"]
```

### **Azure Deployment**
```bash
# Deploy to Azure App Service
az webapp up --name your-app-name --resource-group your-rg
```

## 📊 **Performance Considerations**

### **Template Caching**
- Templates are **cached in memory** after first load
- **File system** access minimized for performance

### **Context Management**
- **Automatic trimming** of conversation history
- **Configurable** maximum context length
- **Memory-efficient** context storage

### **API Optimization**
- **Batch processing** support for multiple prompts
- **Connection pooling** for HTTP requests
- **Response streaming** for large outputs

## 🤝 **Contributing**

### **Adding New Templates**
1. Create template file in `templates/` directory
2. Use `{{variable}}` syntax for dynamic content
3. Update documentation with variable descriptions
4. Add tests for new template functionality

### **Extending Functionality**
1. Follow **existing patterns** for consistency
2. Add **comprehensive error handling**
3. Include **unit tests** for new features
4. Update **documentation** and examples

## 📚 **Resources**

### **Related Documentation**
- [Context Engineering Guide](../context-engineering.md) - Comprehensive prompt engineering resources
- [OpenAI API Documentation](https://platform.openai.com/docs) - Official OpenAI guides
- [Azure OpenAI Service](https://learn.microsoft.com/en-us/azure/ai-services/openai/) - Enterprise AI platform

### **Best Practices**
- **Start simple** - Complex prompts often fail more than simple ones
- **Test iteratively** - Small changes can have big impacts
- **Use examples** - Few-shot prompting is incredibly powerful
- **Be specific** - Vague prompts get vague results

## 📄 **License**

MIT License - see [LICENSE](../LICENSE) for details.

---

**Built with ❤️ by Tim Warner** - Microsoft MVP & AI Developer

*"In the world of AI, the prompt is the interface between human intent and machine capability. Master it, and you master the future."*
