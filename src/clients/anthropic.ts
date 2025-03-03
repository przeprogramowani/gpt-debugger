import Anthropic from '@anthropic-ai/sdk';

const CLAUDE_MODEL_VERSION = 'claude-3-7-sonnet-20250219';

export const anthropicDebugRequest: DebugRequest = async (apiKey: string, prompt: string) => {
  const anthropic = new Anthropic({
    apiKey,
  });

  const chatCompletion = await anthropic.messages.create({
    model: CLAUDE_MODEL_VERSION,
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  });

  return chatCompletion.content[0].text;
};
