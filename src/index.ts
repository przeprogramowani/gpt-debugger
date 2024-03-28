import OpenAI from 'openai';
import * as core from '@actions/core';

const OPENAI_MODEL_VERSION = 'gpt-4-0125-preview';

const INPUTS = {
  OPENAI_API_KEY: 'openai-token',
  DEBUG_LOG: 'debug-log',
};

async function run(): Promise<void> {
  core.setSecret(INPUTS.OPENAI_API_KEY);

  const openai = new OpenAI({
    apiKey: core.getInput(INPUTS.OPENAI_API_KEY),
  });

  core.info(process.env['GPT_DEBUG_LOG']!);

  core.info('🔮 Calling GPT-4 to explain the issue...');

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
    ${core.getInput(INPUTS.DEBUG_LOG)}
    </ERROR_LOG>
  `;

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: OPENAI_MODEL_VERSION,
  });

  const modelResponse = chatCompletion.choices[0].message.content!;

  core.info(modelResponse);
}

run();
