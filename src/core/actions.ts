'use babel';

import {Action} from './types';

export class MultiSelectionAction implements Action {

	constructor() {}

	execute(selections: string[]) {
		return selections.map(this.handleSelection, this);
	}

	handleSelection(selection: string) {
		return selection.split('\n').map(this.handleLine, this).join('\n');
	}

	handleLine(line: string){
		return line;
	}

}

export class SelectionAction implements Action {

	constructor() {}

	execute(selection: string) {
		return this.handleSelection(selection);
	}

	handleSelection(selection: string) {
		return selection.split('\n').map(this.handleLine, this).join('\n');
	}

	handleLine(line: string){
		return line;
	}

}

export class LineAction implements Action {

	constructor() {}

	execute(line: string) {
		return this.handleLine(line);
	}

	handleLine(line: string){
		return line;
	}

}
