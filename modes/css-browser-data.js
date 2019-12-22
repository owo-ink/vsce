/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const rawData = require('vscode-css-languageservice/lib/umd/data/browsers').cssData;
module.exports = {
  properties: rawData.properties || [],
  atDirectives: rawData.atDirectives || [],
  pseudoClasses: rawData.pseudoClasses || [],
  pseudoElements: rawData.pseudoElements || []
};


