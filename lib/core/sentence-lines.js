'use babel';

import {SelectionOperator} from './selection-operator';

export class SentenceLines extends SelectionOperator {

	constructor() {
		super();
		this.paragraphRegex = /\. [A-za-z0-9]/;
	}

	handleSelection(selection) {
		if(this.isParagraph(selection)) {
			return selection.replaceAll('. ', '.\n');
		}	else {
			return selection.replaceAll('\n', ' ');
		}
	}

	isParagraph(selection) {
		return this.paragraphRegex.test(selection);
	}

}
