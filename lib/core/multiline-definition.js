'use babel';

import {SelectionOperator} from './selection-operator';
import {String} from './utils';

export class MultilineDefinition extends SelectionOperator {
	constructor() {
		super();
		this.emRegex = /^\*.+:\*$/;
		this.termRegex = /^.+:$/;
	}

	handleLine(line) {
		if(this.isEmphasized(line)) {
			return line.trim().slice(1, -1);
		}
		if(this.isTerm(line)) {
			return String.wrap(line, '*');
		}
		return line;
	}

	isEmphasized(line) {
		return this.emRegex.test(line);
	}

	isTerm(line) {
		return this.termRegex.test(line);
	}

}
