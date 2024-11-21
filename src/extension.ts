import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  markExtensionActive(true);

  vscode.workspace.getConfiguration().update("terminalSend.template", "");

  function wrapTemplate(text: string) {
    const template = vscode.workspace.getConfiguration().get("terminalSend.template") as string;
    if (!template) {
      return text;
    }
    return template.replace("{}", text);
  }

  let sendCommandDisposable = vscode.commands.registerCommand("sendcodeterminal.sendSelection", () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage("No active editor");
      return;
    }

    let selection = editor.selection;
    let text = editor.document.getText(selection);

    // If no selection, send the current line
    if (!text) {
      const position = editor.selection.active;
      const lineText = editor.document.lineAt(position.line).text;
      text = lineText.trim();
      editor.selection = new vscode.Selection(position.line, 0, position.line, lineText.length);
    }

    const terminal = vscode.window.activeTerminal;

    if (!terminal) {
      vscode.window.showErrorMessage("No active terminal");
      return;
    }

    terminal.sendText(wrapTemplate(dedent(text)), true);
    terminal.show();

    // Move the cursor to the next line
    const nextLine = selection.end.line + 1;
    if (nextLine < editor.document.lineCount) {
      const newPosition = new vscode.Position(nextLine, 0);
      editor.selection = new vscode.Selection(newPosition, newPosition);
      editor.revealRange(new vscode.Range(newPosition, newPosition));
    }

    // Ensure the editor stays visible
    setTimeout(() => {
      if (editor) {
        vscode.window.showTextDocument(editor.document, editor.viewColumn);
      }
    }, 200);
  });

  context.subscriptions.push(sendCommandDisposable);
}

export function deactivate() {
  markExtensionActive(false);
}

function markExtensionActive(val: boolean) {
  vscode.workspace.getConfiguration().update("terminalSend.isActive", val, vscode.ConfigurationTarget.Global);
}

function dedent(text: string) {
  let min = Infinity;
  for (let line of text.split("\n")) {
    if (!line.trim()) {
      continue;
    }
    const leadingSpaces = line.length - line.trimStart().length;
    if (leadingSpaces < min) {
      min = leadingSpaces;
    }
  }
  return text
    .split("\n")
    .map((line) => {
      if (!line.trim()) {
        return "";
      }
      return line.slice(min);
    })
    .join("\n");
}
