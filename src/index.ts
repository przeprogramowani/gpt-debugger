import OpenAI from 'openai';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { buildPrompt } from './prompt';

const ERROR_LOG_FILE_NAME = 'gpt_error.log';
const OPENAI_MODEL_VERSION = 'gpt-4-0125-preview';

async function main(): Promise<void> {
  const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
  });

  const logPath = join(process.cwd(), ERROR_LOG_FILE_NAME);

  if (!existsSync(logPath)) {
    console.error(`❌ Error log file not found at ${logPath}`);
    process.exit(1);
  }

  const errorLog = readFileSync(logPath, 'utf8');

  const prompt = buildPrompt(errorLog);

  console.log('🔮 Calling GPT-4 to explain the issue...');
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: OPENAI_MODEL_VERSION,
  });

  const modelResponse = chatCompletion.choices[0].message.content!;

  console.log('🤖 Presenting GPT-4 analysis:');
  console.log(modelResponse);
}

main();
