import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';

// Define a calculator tool
export const calculatorTool = new DynamicStructuredTool({
  name: 'calculator',
  description: 'Useful for performing mathematical calculations',
  schema: z.object({
    operation: z.enum(['add', 'subtract', 'multiply', 'divide']),
    a: z.number().describe('First number'),
    b: z.number().describe('Second number'),
  }),
  func: async ({ operation, a, b }) => {
    let result: number;
    switch (operation) {
      case 'add':
        result = a + b;
        break;
      case 'subtract':
        result = a - b;
        break;
      case 'multiply':
        result = a * b;
        break;
      case 'divide':
        if (b === 0) {
          throw new Error('Division by zero is not allowed');
        }
        result = a / b;
        break;
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
    return `Result of ${operation}(${a}, ${b}) = ${result}`;
  },
});

// Define a tool to get the current time
export const getCurrentTimeTool = new DynamicStructuredTool({
  name: 'getCurrentTime',
  description: 'Get the current date and time',
  schema: z.object({}),
  func: async () => {
    const now = new Date();
    return `Current time: ${now.toLocaleString()}`;
  },
});

// Export all tools as an array
export const tools = [
  calculatorTool,
  getCurrentTimeTool,
];
