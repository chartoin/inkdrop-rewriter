'use babel';

import {SelectionOperator} from './selection-operator';

export class SentenceLines extends SelectionOperator {
	paragraphRegex: RegExp = new RegExp('');

	constructor() {
		super();
		this.paragraphRegex = /\. [A-za-z0-9]/;
	}

	handleSelection(selection: string) {
		return this.isParagraph(selection) ? selection.replaceAll('. ', '.\n') : selection.replaceAll('\n', ' ');
	}

	isParagraph(selection: string) {
		return this.paragraphRegex.test(selection);
	}

}