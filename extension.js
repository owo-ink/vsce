// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const util = require('./util');




// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	
	// 注册命令
	context.subscriptions.push(vscode.commands.registerCommand('extension.demo.getCurrentFilePath', (uri) => {
		vscode.window.showInformationMessage(`当前文件(夹)路径是：${uri ? uri.path : '空'}`);
	}))

	// context.subscriptions.push(vscode.languages.registerDefinitionProvider(['owo'], {
	// 	provideDefinition
	// }))
	// 注册鼠标悬停提示
	context.subscriptions.push(vscode.languages.registerHoverProvider('owo', {
    provideHover(document, position, token) {
			// console.log(document)
			return new vscode.Hover('I am a hover!');
    }
	}))

	context.subscriptions.push(vscode.languages.registerCompletionItemProvider('owo', {
    provideCompletionItems(document, position, token) {
			
			const character = document.lineAt(position).text.substr(0, position.character)
			switch (character) {
				case 'this.': {
					return [new vscode.CompletionItem('$el', vscode.CompletionItemKind.Field)]
				}
				case 'owo.': {
					return [
						new vscode.CompletionItem('tool', vscode.CompletionItemKind.Field),
						new vscode.CompletionItem('query', vscode.CompletionItemKind.Function),
						new vscode.CompletionItem('go', vscode.CompletionItemKind.Function),
					]
				}
			}
		},
		resolveCompletionItem () {
			return null
		},
		triggerCharacters: ['.']
	}, '.'))
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
