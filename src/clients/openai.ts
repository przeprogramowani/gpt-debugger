import OpenAI from 'openai';
import { AI_MODELS } from '../models';

export const openAIDebugRequest: DebugRequest = async (apiKey: string, prompt: string) => {
  const openai = new OpenAI({
    apiKey,
  });

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: AI_MODELS.openai.gpt4o,
  });

  return chatCompletion.choices[0].message.content!;
};
