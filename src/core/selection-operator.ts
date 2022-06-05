'use babel';

export class SelectionOperator {

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
