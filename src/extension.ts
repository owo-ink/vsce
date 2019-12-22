"use strict";
import * as vscode from 'vscode';

import { cssData } from './css-browser-data';

import { getValues } from './tips';



export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "owo" is now active!');

	context.subscriptions.push(vscode.languages.registerCompletionItemProvider('owo', {
    provideCompletionItems(document, position) {
			const text = document.lineAt(position).text.substr(0, position.character);
			const currentWord = text.trim();
			let returnList:Array<vscode.CompletionItem> = [];
			switch (currentWord) {
				case 'this.': {
					returnList = returnList.concat([new vscode.CompletionItem('$el', vscode.CompletionItemKind.Field)]);
					break;
				}
				case 'this.$el.': {
					returnList = returnList.concat([
						new vscode.CompletionItem('getElementsByClassName', vscode.CompletionItemKind.Function),
						new vscode.CompletionItem('getElementsByTagName', vscode.CompletionItemKind.Function),
						new vscode.CompletionItem('getElementById', vscode.CompletionItemKind.Function),
						new vscode.CompletionItem('querySelector', vscode.CompletionItemKind.Function),
						new vscode.CompletionItem('querySelectorAll', vscode.CompletionItemKind.Function),
					]);
					break;
				}
				case 'owo.': {
					returnList = returnList.concat([
						new vscode.CompletionItem('tool', vscode.CompletionItemKind.Field),
						new vscode.CompletionItem('query', vscode.CompletionItemKind.Function),
						new vscode.CompletionItem('go', vscode.CompletionItemKind.Function),
						new vscode.CompletionItem('data', vscode.CompletionItemKind.Function),
					]);
					break;
				}
				case 'document.': {
					returnList = returnList.concat([
						new vscode.CompletionItem('getElementsByClassName', vscode.CompletionItemKind.Function),
						new vscode.CompletionItem('getElementsByTagName', vscode.CompletionItemKind.Function),
						new vscode.CompletionItem('getElementById', vscode.CompletionItemKind.Function),
						new vscode.CompletionItem('querySelector', vscode.CompletionItemKind.Function),
						new vscode.CompletionItem('querySelectorAll', vscode.CompletionItemKind.Function),
					]);
					break;
				}
			}
			return returnList;
		}
	}, '.'));
	
	// css匹配
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider('owo', {
    provideCompletionItems(document, position) {
			const text = document.lineAt(position).text.substr(0, position.character);
			const currentWord = text.trim();
			let returnList:Array<vscode.CompletionItem> = [];
			cssData.properties.forEach(element => {
				if (element.name.startsWith(currentWord)) {
					returnList.push(new vscode.CompletionItem(element.name, vscode.CompletionItemKind.Variable));
				}
			});
			// console.log(returnList)
			return returnList;
		}
	}));
  
  context.subscriptions.push(vscode.languages.registerCompletionItemProvider('owo', {
    provideCompletionItems(document, position) {
			const text = document.lineAt(position).text.substr(0, position.character);
			const currentWord = text.trim();
			let returnList:Array<vscode.CompletionItem> = [];
			const values = getValues(cssData, currentWord);
			values.forEach(element => {
				returnList.push(new vscode.CompletionItem(` ${element.label};`, vscode.CompletionItemKind.Variable));
			});
			return returnList;
		}
	}, ':'));
	
}

// this method is called when your extension is deactivated
export function deactivate() {}
