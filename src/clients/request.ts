import { openAIDebugRequest } from './openai';
import { anthropicDebugRequest } from './anthropic';

export async function generateDebugResponse(prompt: string) {
  if (process.env['OPENAI_API_KEY'] != null) {
    console.log('Using OpenAI model to debug the error log.');
    return await openAIDebugRequest(process.env['OPENAI_API_KEY'], prompt);
  }

  if (process.env['ANTHROPIC_API_KEY'] != null) {
    console.log('Using Anthropic model to debug the error log.');
    return await anthropicDebugRequest(process.env['ANTHROPIC_API_KEY'], prompt);
  }

  throw new Error('Provide one of the supported API Keys to get started.');
}
