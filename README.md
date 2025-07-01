# A2A LangGraph ReAct Agent

A TypeScript project that implements an A2A-compatible agent using LangGraph's ReAct agent with Model Context Protocol (MCP) integration.

## Project Structure

```
a2a-langgraph-agent/
├── src/                      # TypeScript source files
│   ├── index.ts              # Server entry point
│   ├── cli.ts                # CLI client for interacting with the agent
│   └── a2a/                  # A2A implementation
│       ├── executor.ts       # LangGraph React agent executor
│       ├── agentCard.ts      # Agent card definition
│       ├── tools.ts          # Local tool definitions
│       └── mcp/              # Model Context Protocol integration
│           ├── client.ts     # MCP client implementation
│           └── mcp-servers.json # MCP server configurations
├── dist/                     # Compiled JavaScript output (generated)
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project configuration and dependencies
└── README.md                 # This file
```

## Prerequisites

- Node.js (v16 or higher recommended)
- npm (comes with Node.js)

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd a2a-langgraph-agent
npm install
```

### OpenAI API Key Configuration

The agent uses OpenAI's models through LangChain. You'll need to set up your OpenAI API key as an environment variable:

```bash
# For Linux/macOS
export OPENAI_API_KEY=your-api-key-here

# For Windows (Command Prompt)
set OPENAI_API_KEY=your-api-key-here

# For Windows (PowerShell)
$env:OPENAI_API_KEY="your-api-key-here"
```

Alternatively, you can create a `.env` file in the project root:

```
OPENAI_API_KEY=your-api-key-here
```

## Running the Agent

### Start the Agent Server

In one terminal, start the agent server:

```bash
npm run dev
```

This will start the A2A server on http://localhost:3000.

### Use the CLI Client

In another terminal, use the CLI client to interact with the agent:

```bash
npm run cli
```

You can also specify a different server URL:

```bash
npm run cli http://localhost:3000
```

## CLI Commands

- Type your message and press Enter to send it to the agent
- `/new` - Start a new session (clears task and context IDs)
- `/exit` - Exit the CLI

## Available Scripts

In the project directory, you can run:

### `npm run build`

Compiles the TypeScript code to JavaScript in the `dist` directory.

### `npm run start`

Runs the compiled JavaScript from the `dist` directory.

### `npm run dev`

Runs the agent server directly using tsx without compiling.

### `npm run cli`

Runs the CLI client to interact with the agent.

## Features

- **A2A Protocol Support**: Implements the A2A protocol for agent communication
- **LangGraph React Agent**: Uses LangChain's React agent for reasoning and tool use
- **Built-in Tools**: Includes calculator and time tools out of the box
- **MCP Integration**: Connects to external Model Context Protocol servers
- **CLI Client**: Interactive command-line interface for testing the agent

## Built-in Tools

The agent comes with several built-in tools defined in `src/a2a/tools.ts`:

### Calculator Tool

Performs basic mathematical operations:
- Addition
- Subtraction
- Multiplication
- Division

Example usage: "Calculate 25 divided by 5" or "What's 123 + 456?"

### Current Time Tool

Returns the current date and time.

Example usage: "What time is it?" or "Tell me the current date"

## MCP Integration

### Configuring MCP Servers

The agent can connect to external Model Context Protocol (MCP) servers to extend its capabilities. MCP servers are configured in the `src/a2a/mcp/mcp-servers.json` file.

Example configuration:

```json
{
  "github": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-github"
    ],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "your-github-token"
    }
  }
}
```

Each entry in the JSON file represents an MCP server with:
- A unique name (e.g., "github")
- The command to run the server
- Command arguments
- Environment variables needed by the server

The agent will automatically start these MCP servers when it initializes and make their tools available to the LangGraph React agent.

### Available MCP Servers

The project is configured to work with various MCP servers, including:

- **GitHub**: Interact with GitHub repositories, issues, and pull requests
- **Weather**: Get weather forecasts and conditions
- **Search**: Perform web searches
- **File System**: Access and manipulate files

To use these servers, you'll need to configure them in the `mcp-servers.json` file with appropriate credentials.

## Dependencies

- **@a2a-js/sdk**: A2A JavaScript SDK
- **@langchain/langgraph**: LangChain's LangGraph library for agent workflows
- **@langchain/openai**: LangChain's OpenAI integration
- **@langchain/mcp-adapters**: Model Context Protocol adapters for LangChain
- **express**: Web server framework
- **uuid**: For generating unique IDs
- **zod**: Schema validation for tool definitions

## License

MIT
