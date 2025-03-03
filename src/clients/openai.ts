import OpenAI from 'openai';

const OPENAI_MODEL_VERSION = 'gpt-4o';

export const openAIDebugRequest: DebugRequest = async (apiKey: string, prompt: string) => {
  const openai = new OpenAI({
    apiKey,
  });

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: OPENAI_MODEL_VERSION,
  });

  return chatCompletion.choices[0].message.content!;
};
