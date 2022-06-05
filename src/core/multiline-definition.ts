'use babel';

import {SelectionOperator} from './selection-operator';
import {String} from './utils';

export class MultilineDefinition extends SelectionOperator {
	emRegex: RegExp = new RegExp('');
	termRegex: RegExp = new RegExp('');

	constructor() {
		super();
		this.emRegex = /^\*.+:\*$/;
		this.termRegex = /^.+:$/;
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
