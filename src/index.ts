import OpenAI from 'openai';
import { readFileSync } from 'fs';
import { join } from 'path';

const GPT_DEBUG_LOG = 'gpt_debug.log';
const OPENAI_MODEL_VERSION = 'gpt-4-0125-preview';

async function main(): Promise<void> {
  const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
  });

  const errorLog = readFileSync(join(process.cwd(), GPT_DEBUG_LOG), 'utf8');

  console.log('🔮 Calling GPT-4 to explain the issue...');

  const prompt = `
    Explain an error that occurred during the CI/CD workflow and suggest a solution to fix it.

    Follow these rules:
    - Be concise and to the point.
    - Avoid repeating my question in the answer.
    - Do not include any sensitive information.
    - Do not repeat the same information.
    - List files that are relevant to the error.
    - If the log is empty, do not provide a solution. Terminate the conversation.
    - Instead of Markdown, use format readable in bash terminal.

    The error log is wrapped with the tag ERROR_LOG.

    <ERROR_LOG>
    ${errorLog}
    </ERROR_LOG>
  `;

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: OPENAI_MODEL_VERSION,
  });

  const modelResponse = chatCompletion.choices[0].message.content!;

  console.log(modelResponse);
}

main();
