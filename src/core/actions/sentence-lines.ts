'use babel';

import {MultiSelectionAction} from '../actions';

export class SentenceLines extends MultiSelectionAction {
	paragraphRegex: RegExp = /\. [A-za-z0-9]/;

	constructor(paragraphRegex?: RegExp) {
		super();
		this.paragraphRegex = (paragraphRegex === null || typeof paragraphRegex === 'undefined') ? this.paragraphRegex : paragraphRegex;
	}

	handleSelection(selection: string) {
		return this.isParagraph(selection) ? selection.replaceAll('. ', '.\n') : selection.replaceAll('\n', ' ');
	}

	isParagraph(selection: string) {
		return this.paragraphRegex.test(selection);
	}

}
