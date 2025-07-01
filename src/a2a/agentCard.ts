import { AgentCard, AgentSkill, AgentCapabilities } from "@a2a-js/sdk";

const skills = [
  {
    id: 'react-reactor',
    name: 'React ReAct Agent',
    description: 'Handles Q&A via LangGraph ReAct loops',
    tags: ['react','langgraph','react_agent'],
  } as AgentSkill,
];

export const agentCard: AgentCard = {
  name: 'React ReAct Agent',
  description: 'LangGraph-powered ReAct agent exposed over A2A',
  url: 'http://localhost:3000/',
  version: '1.0.0',
  defaultInputModes: ['text'],
  defaultOutputModes: ['text'],
  capabilities: { streaming: true } as AgentCapabilities,
  skills,
};
