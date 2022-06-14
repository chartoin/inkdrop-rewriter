'use babel';

import {MultiSelectionAction} from '../actions';
import {RXHelper,String} from '../utils';

export class Definition extends MultiSelectionAction {
	prefix: string = '';
	suffix: string = '';
	defregex: RegExp = new RegExp('');
	
	constructor(prefix: string, suffix?: string) {
		super();
		this.prefix = (prefix === null || typeof prefix === 'undefined') ? '*' : prefix;
		this.suffix = (suffix === null || typeof suffix === 'undefined') ? prefix : suffix;
		let rprefix = RXHelper.escape(this.prefix);
		let rsuffix = RXHelper.escape(this.suffix);
		this.defregex = new RegExp(`^${rprefix}(.*)${rsuffix}(.*)`);
	}

	handleLine(line: string){
		if(line === '') { return line; }
		return this.isDefinition(line) ? this.unwrapTerm(line) : this.wrapTerm(line);
	}

	isDefinition(line: string) {
		return this.defregex.test(line);
	}

	wrapTerm(line: string) {
		let words = line.split(' ');
		words[0] = String.wrap(words[0], this.prefix, this.suffix);
		return words.join(' ');
	} 

	unwrapTerm(line: string) {
		let matches = line.match(this.defregex)
		if(matches !== null) { return matches.slice(1).join(''); }
		return line;
	}
		
} 
