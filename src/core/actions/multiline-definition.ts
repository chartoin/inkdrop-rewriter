'use babel';

import {MultiSelectionAction} from '../actions';
import {String} from '../utils';

export class MultilineDefinition extends MultiSelectionAction {
	emRegex: RegExp = /^\*.+:\*$/;
	termRegex: RegExp = /^.+:$/;

	constructor(emphasisRegex?: RegExp, termRegex?: RegExp) {
		super();
		this.emRegex = (emphasisRegex === null || typeof emphasisRegex === 'undefined') ? this.emRegex : emphasisRegex;
		this.termRegex = (termRegex === null || typeof termRegex === 'undefined') ? this.termRegex : termRegex;
	}

	handleLine(line: string) {
		if(this.isEmphasized(line)) {
			return line.trim().slice(1, -1);
		}
		if(this.isTerm(line)) {
			return String.wrap(line, '*');
		}
		return line;
	}

	isEmphasized(line: string) {
		return this.emRegex.test(line);
	}

	isTerm(line: string) {
		return this.termRegex.test(line);
	}

}
