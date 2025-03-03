import Anthropic from '@anthropic-ai/sdk';
import { AI_MODELS } from '../models';

export const anthropicDebugRequest: DebugRequest = async (apiKey: string, prompt: string) => {
  const anthropic = new Anthropic({
    apiKey,
  });

  const chatCompletion = await anthropic.messages.create({
    model: AI_MODELS.anthropic.claudeSonnet,
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  });

  if (chatCompletion.content[0].type === 'text') {
    return chatCompletion.content[0].text;
  } else {
    return 'Unsupported content type';
  }
};
