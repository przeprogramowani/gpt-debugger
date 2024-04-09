import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { buildPrompt } from './prompt';
import { generateDebugResponse } from './clients/request';

const ERROR_LOG_FILE_NAME = 'gpt_error.log';

async function main(): Promise<void> {
  const logPath = join(process.cwd(), ERROR_LOG_FILE_NAME);

  if (!existsSync(logPath)) {
    console.error(`❌ Error log file not found at ${logPath}`);
    process.exit(1);
  }

  const errorLog = readFileSync(logPath, 'utf8');
  const prompt = buildPrompt(errorLog);

  const debugResponse = await generateDebugResponse(prompt);

  console.log('🧑‍⚕️ Presenting issue analysis:');
  console.log(debugResponse);
}

main();
