export const buildPrompt = (errorLog: string): string => `
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
