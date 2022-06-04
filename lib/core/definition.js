'use babel';

import {SelectionOperator} from './selection-operator';
import {RXHelper,String} from './utils';

export class Definition extends SelectionOperator {
	constructor(prefix, suffix) {
		super();
		this.prefix = (prefix === null || typeof prefix === 'undefined') ? '*' : prefix;
		this.suffix = (suffix === null || typeof suffix === 'undefined') ? prefix : suffix;
		let rprefix = RXHelper.escape(this.prefix);
		let rsuffix = RXHelper.escape(this.suffix);
		this.defregex = new RegExp(`^${rprefix}(.*)${rsuffix}(.*)`);
	}

	handleLine(line){
		if(line === '') { return line; }
		return this.isDefinition(line) ? this.unwrapTerm(line) : this.wrapTerm(line);
	}

	isDefinition(line) {
		return this.defregex.test(line);
	}

	wrapTerm(line) {
		let words = line.split(' ');
		words[0] = String.wrap(words[0], this.prefix, this.suffix);
		return words.join(' ');
	} 

	unwrapTerm(line) {
		return line.match(this.defregex).slice(1).join('');
	}
		
} 
