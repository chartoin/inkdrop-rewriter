'use babel';

import {SelectionOperator} from './selection-operator';

export class SentenceLines extends SelectionOperator {

	constructor() {
		super();
		this.paragraphRegex = /\. [A-za-z0-9]/;
	}

	handleSelection(selection) {
		return this.isParagraph(selection) ? selection.replaceAll('. ', '.\n') : selection.replaceAll('\n', ' ');
	}

	isParagraph(selection) {
		return this.paragraphRegex.test(selection);
	}

}
