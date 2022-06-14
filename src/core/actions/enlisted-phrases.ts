'use babel';

import {MultiSelectionAction} from '../actions';

export class EnlistedPhrases extends MultiSelectionAction {
	enlistedRegex: RegExp = /.*\([0-9]+\).*/;

	constructor(enlistedRegex?: RegExp) {
		super();
		this.enlistedRegex = (enlistedRegex === null || typeof enlistedRegex === 'undefined') ? this.enlistedRegex : enlistedRegex;
	}

	handleSelection(selection: string) {
		return this.isEnlisted(selection) ? this.makeUnenlisted(selection) : this.makeEnlisted(selection);
	}

	makeEnlisted(text: string): string {
		let phrases: string[] = text.split(',').map((p: string) => { return p.trim(); });
		return phrases.map((p: string, ii: number) => {
			return `(${ii+1}) ${p}`;
		}).join(', ');
	}

	makeUnenlisted(text: string) {
		let phrases: string[] = text.split(',').map((p: string) => { return p.trim(); });
		return phrases.map((p: string) => {
			return p.replace(/\([0-9]+\) /, '');
		}).join(', ');
	}

	isEnlisted(selection: string): boolean {
		return this.enlistedRegex.test(selection);
	}

}
