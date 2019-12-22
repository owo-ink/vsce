import { cssData, LoadedCSSData } from './css-browser-data';

import {
  CompletionItem,
  CompletionItemKind,
  TextDocument,
  Position,
  CompletionList
} from 'vscode-languageserver-types';



/**
 * Formats property name
 * @param {String} currentWord
 * @return {String}
 */
export function getPropertyName(currentWord: string): string {
  return currentWord
    .trim()
    .replace(':', ' ')
    .split(' ')[0];
}


/**
 * Search for property in cssSchema
 * @param {Object} data
 * @param {String} property
 * @return {Object}
 */
export function findPropertySchema(data: LoadedCSSData, property: string) {
  return data.properties.find(item => item.name === property);
}

/**
 * Returns values for current property for completion list
 * @param {Object} data
 * @param {String} currentWord
 * @return {CompletionItem}
 */
export function getValues(data: LoadedCSSData, currentWord: string): CompletionItem[] {
  const property = getPropertyName(currentWord);
  const result = findPropertySchema(data, property);
  const values = result && result.values;

  if (!values) {
    return [];
  }

  return values.map(property => {
    const completionItem = CompletionItem.create(property.name);

    completionItem.documentation = property.description;
    completionItem.kind = CompletionItemKind.Value;

    return completionItem;
  });
}