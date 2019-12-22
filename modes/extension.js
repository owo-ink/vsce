'use strict';
let languageclient = require('vscode-languageclient');
let languageserver = require('vscode-languageserver');
const cssData = require('./css-browser-data.js')
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const _ = require('lodash');
let Position = languageserver.Position


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

	// 注册鼠标悬停提示
	// context.subscriptions.push(vscode.languages.registerHoverProvider('owo', {
  //   provideHover(document, position, token) {
	// 		// console.log(document)
	// 		return new vscode.Hover('I am a hover!');
  //   }
	// }))

	function getPropertyName (currentWord) {
		return currentWord
    .trim()
    .replace(':', ' ')
    .split(' ')[0];
	}

	function findPropertySchema(data, property) {
		return _.find(data.properties, item => item.name === property);
	}

	function getValues (data, currentWord) {
		const property = getPropertyName(currentWord);
		const result = findPropertySchema(data, property);
		const values = result && result.values;

		if (!values) {
			return [];
		}

		return values.map(property => {
			const completionItem = languageserver.CompletionItem.create(property.name);

			completionItem.documentation = property.description;
			completionItem.kind = languageserver.CompletionItemKind.Value;

			return completionItem;
		});
	}

	context.subscriptions.push(vscode.languages.registerCompletionItemProvider('owo', {
    provideCompletionItems(document, position) {
			const text = document.lineAt(position).text.substr(0, position.character)
			const currentWord = text.trim()
			let returnList = []
			switch (currentWord) {
				case 'this.': {
					returnList = returnList.concat([new vscode.CompletionItem('$el', vscode.CompletionItemKind.Field)])
					break
				}
				case 'this.$el.': {
					returnList = returnList.concat([
						new vscode.CompletionItem('getElementsByClassName', vscode.CompletionItemKind.Function),
						new vscode.CompletionItem('getElementsByTagName', vscode.CompletionItemKind.Function),
						new vscode.CompletionItem('getElementById', vscode.CompletionItemKind.Function),
						new vscode.CompletionItem('querySelector', vscode.CompletionItemKind.Function),
						new vscode.CompletionItem('querySelectorAll', vscode.CompletionItemKind.Function),
					])
					break
				}
				case 'owo.': {
					returnList = returnList.concat([
						new vscode.CompletionItem('tool', vscode.CompletionItemKind.Field),
						new vscode.CompletionItem('query', vscode.CompletionItemKind.Function),
						new vscode.CompletionItem('go', vscode.CompletionItemKind.Function),
						new vscode.CompletionItem('data', vscode.CompletionItemKind.Function),
					])
					break
				}
				case 'document.': {
					returnList = returnList.concat([
						new vscode.CompletionItem('getElementsByClassName', vscode.CompletionItemKind.Function),
						new vscode.CompletionItem('getElementsByTagName', vscode.CompletionItemKind.Function),
						new vscode.CompletionItem('getElementById', vscode.CompletionItemKind.Function),
						new vscode.CompletionItem('querySelector', vscode.CompletionItemKind.Function),
						new vscode.CompletionItem('querySelectorAll', vscode.CompletionItemKind.Function),
					])
					break
				}
			}
			return returnList
		}
	}, '.'))
	// css匹配
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider('owo', {
    provideCompletionItems(document, position) {
			const text = document.lineAt(position).text.substr(0, position.character)
			const currentWord = text.trim()
			let returnList = []
			const values = getValues(cssData, currentWord);
			values.forEach(element => {
				returnList.push(new vscode.CompletionItem(` ${element.label};`, vscode.CompletionItemKind.Variable))
			});
			return returnList
		}
	}, ':'))
	// css匹配
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider('owo', {
    provideCompletionItems(document, position) {
			const text = document.lineAt(position).text.substr(0, position.character)
			const currentWord = text.trim()
			let returnList = []
			cssData.properties.forEach(element => {
				if (element.name.startsWith(currentWord)) {
					returnList.push(new vscode.CompletionItem(element.name, vscode.CompletionItemKind.Variable))
				}
			});
			// console.log(returnList)
			return returnList
		}
	}))
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}


module.exports = {
	activate,
	deactivate
}
