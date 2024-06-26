# CI/CD Debugger

Debug flaky CI/CD pipelines with models such as GPT-4 or Claude 3.

## Inputs

By providing one of the inputs, the action will use the specified model to analyze the error log:

- `OPENAI_API_KEY` - OpenAI API key. You can get it from [OpenAI Console](https://platform.openai.com/account/api-keys). When provided, the action will use GPT-4 Turbo model to analyze the error message.

- `ANTHROPIC_API_KEY` - Anthropic API key. You can get it from [Anthropic console](https://console.anthropic.com/). When provided, the action will use Claude 3 model to analyze the error message.

## How to

1. Redirect error log of one of your failing steps to `gpt_error.log` file:
2. Add new step to your workflow and mark it with either `always()` or `failure()` expression:

```yaml
jobs:
  tests:
    runs-on: ubuntu-latest
    steps:
      - name: Run e2e
        id: e2e
        run: npm run e2e 2> gpt_error.log

      - uses: przeprogramowani/gpt-debugger@main
        if: ${{ failure() }}
        with:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

## Output

Example output from the action:

```txt
🧑‍⚕️ Presenting GPT-4 issue analysis:

The error indicates that an "e2e" script is expected but not defined in the package.json file. To fix this issue, ensure you have an "e2e" script specified in your package.json file under the "scripts" section. If your intention was to run end-to-end tests, you might need something like:

"scripts": {
"e2e": "your-e2e-test-command here"
}

Replace "your-e2e-test-command here" with the actual command you use to run your end-to-end tests.

Relevant file:
- package.json
```

## Authors

- [Przeprogramowani](https://przeprogramowani.pl)
- [Opanuj Frontend](https://opanujfrontend.pl)
