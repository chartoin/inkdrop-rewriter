'use babel';

import {MultiSelectionAction} from '../actions';
import {String} from '../utils';

export class Table extends MultiSelectionAction {
	tableRegex: RegExp = /^\|.*\|$/;

	constructor(tableRegex?: RegExp) {
		super();
		this.tableRegex = (tableRegex === null || typeof tableRegex === 'undefined') ? this.tableRegex : tableRegex;
	}

	handleLine(line: string) {
		if(this.isCSV(line)) {
			return this.makeTableRow(line);
		} else if(this.isTableRow(line)) {
			return this.makeCSV(line);
		} else {
			return line;
		}
	}

	makeTableRow(line: string) {
		return String.wrap(line.replaceAll(',', '|'), '|');
	}

	makeCSV(line: string) {
		return line.slice(1,-1).replaceAll('|',',');
	}

	isTableRow(line: string) {
		return this.tableRegex.test(line);	
	}

	isCSV(line: string) {
		return line.includes(',');
	}

}
