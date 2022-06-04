'use babel';

export class SelectionOperator {

	constructor() {}

	execute(selections) {
		return selections.map(this.handleSelection, this);
	}

	handleSelection(selection) {
		return selection.split('\n').map(this.handleLine, this).join('\n');
	}

	handleLine(line){
		return line;
	}

}
