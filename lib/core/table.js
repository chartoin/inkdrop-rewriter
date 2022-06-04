'use babel';

import {SelectionOperator} from './selection-operator';
import {String} from './utils';

export class Table extends SelectionOperator {
	constructor() {
		super();
		this.tableRegex = /^\|.*\|$/;
	}

	handleLine(line) {
		if(this.isCSV(line)) {
			return this.makeTableRow(line);
		} else if(this.isTableRow(line)) {
			return this.makeCSV(line);
		} else {
			return line;
		}
	}

	makeTableRow(line) {
		return String.wrap(line.replaceAll(',', '|'), '|');
	}

	makeCSV(line) {
		return line.slice(1,-1).replaceAll('|',',');
	}

	isTableRow(line) {
		return this.tableRegex.test(line);	
	}

	isCSV(line) {
		return line.includes(',');
	}

}
