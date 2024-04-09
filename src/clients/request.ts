import { openAIDebugRequest } from './openai';
import { anthropicDebugRequest } from './anthropic';

export async function generateDebugResponse(prompt: string) {
  if (process.env['OPENAI_API_KEY'] != null) {
    return await openAIDebugRequest(process.env['OPENAI_API_KEY'], prompt);
  }

  if (process.env['ANTHROPIC_API_KEY'] != null) {
    return await anthropicDebugRequest(process.env['ANTHROPIC_API_KEY'], prompt);
  }

  throw new Error('Provide one of the supported API Keys to get started.');
}
