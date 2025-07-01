import { MultiServerMCPClient } from "@langchain/mcp-adapters";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Creates and configures the MCP client with multiple server connections
 */
export async function createMCPClient() {
  // Load MCP server configurations from JSON file
  const configPath = path.join(__dirname, 'mcp-servers.json');
  let mcpServers = {};
  
  try {
    const configData = fs.readFileSync(configPath, 'utf8');
    mcpServers = JSON.parse(configData);
    console.log(`[MCP] Loaded server configurations from ${configPath}`);
  } catch (error) {
    console.error(`[MCP] Error loading server configurations from ${configPath}:`, error);
    console.warn('[MCP] No MCP servers will be available');
    // Empty object means no servers will be configured
    mcpServers = {};
  }

  // Create client and connect to server
  const client = new MultiServerMCPClient({
    // Global tool configuration options
    throwOnLoadError: true,
    prefixToolNameWithServerName: true,
    additionalToolNamePrefix: "mcp",
    useStandardContentBlocks: true,

    // Server configuration loaded from JSON
    mcpServers
  });

  // Get all available tools from the connected servers
  const tools = await client.getTools();
  console.log(`[MCP] Loaded ${tools.length} tools from MCP servers`);

  return { client, tools };
}
