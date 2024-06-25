
# SendCodeTerminal

Send code to the terminal in a language-agnostic manner.

## Features

- **Send Selection to Terminal:** Quickly send selected code or the current line to the terminal. If no text is selected, the current line will be sent and the cursor will advance to the next line.

## Installation

1. Clone this repository or download the source code.
2. Open the source code in VS Code.
3. Run `npm install` to install the dependencies.
4. Run `npm run compile` to compile the extension.
5. Press `F5` to open a new VS Code window with the extension loaded.

## Usage

### Commands

The extension provides the following command:

1. **Send Selection to Terminal**
   - Command ID: `sendcodeterminal.sendSelection`
   - Description: Sends the selected text or the current line of code to the terminal. If no text is selected, the current line will be sent and the cursor will advance to the next line.
   - How to use: Select the text or place the cursor on the line you want to send, then run the command.

## Development

### Scripts

- `npm run compile`: Compiles the TypeScript code.
- `npm run watch`: Compiles the TypeScript code in watch mode.
- `npm run lint`: Lints the TypeScript code.
- `npm run test`: Runs tests for the extension.

### DevDependencies

- `@types/vscode`: VS Code type definitions.
- `@types/mocha`: Mocha type definitions.
- `@types/node`: Node.js type definitions.
- `@typescript-eslint/eslint-plugin`: ESLint plugin for TypeScript.
- `@typescript-eslint/parser`: ESLint parser for TypeScript.
- `eslint`: Pluggable JavaScript linter.
- `typescript`: TypeScript language.
- `@vscode/test-cli`: VS Code test CLI.
- `@vscode/test-electron`: VS Code test with Electron.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Citation and Credit

This code was developed from the source code from the 'Terminal Send' extension (Copyright (c) 2023 Samuel S. Watson) and a conversation between Scott Furlan and ChatGPT-4o on June 24th 2024.

## Exporting and Publishing

The package was published using the following code

```sh
vsce package
vsce publish
```

---
