import { 
  DefaultRequestHandler,
  InMemoryTaskStore,
  A2AExpressApp, 
  TaskStore
} from '@a2a-js/sdk';
import { ReactAgentExecutor } from './a2a/executor.js';
import { agentCard } from './a2a/agentCard.js';
import express from "express";

async function main() {
  // 1. Create TaskStore
  const taskStore: TaskStore = new InMemoryTaskStore();

  // 2. Create AgentExecutor with MCP support
  const agentExecutor: ReactAgentExecutor = new ReactAgentExecutor();

  // 3. Create DefaultRequestHandler
  const requestHandler = new DefaultRequestHandler(
    agentCard,
    taskStore,
    agentExecutor
  );

  // 4. Create and setup A2AExpressApp
  const app = express();
  const appBuilder = new A2AExpressApp(requestHandler);
  // Use type assertion to work around Express type incompatibility
  const expressApp = appBuilder.setupRoutes(app as any);

  // 5. Start the server
  const PORT = process.env.PORT || 3000;
  const server = expressApp.listen(PORT, () => {
    console.log(`[ReactAgent] Server using langchain framework and A2A started on http://localhost:${PORT}`);
    console.log(`[ReactAgent] Agent Card: http://localhost:${PORT}/.well-known/agent.json`);
    console.log('[ReactAgent] Press Ctrl+C to stop the server');
  });

  // 6. Setup graceful shutdown
  const shutdown = async () => {
    console.log('\n[ReactAgent] Shutting down server...');
    
    // Close the HTTP server
    server.close(() => {
      console.log('[ReactAgent] HTTP server closed');
    });
    
    // Clean up the agent executor (which will close MCP connections)
    try {
      await agentExecutor.cleanup();
      console.log('[ReactAgent] Agent executor cleaned up');
    } catch (error) {
      console.error('[ReactAgent] Error during cleanup:', error);
    }
    
    process.exit(0);
  };

  // Handle termination signals
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

// Call the main function to start the server
main().catch(error => {
  console.error('Error starting server:', error);
  process.exit(1);
});
