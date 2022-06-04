'use babel';

import { Disposable, CompositeDisposable } from 'event-kit';
import {logger} from 'inkdrop';

import {Definition} from "./core/definition";
import {MultilineDefinition} from "./core/multiline-definition";
import {Table} from "./core/table";

const NAMESPACE='rewriter';

export class Editor extends Disposable {
	constructor(cm) {
		super(() => this.destroy());
		this.cm = cm;
		this.subscriptions = new CompositeDisposable();
		this.registerCommand('toggle-definition', () => this.executeOperationOnSelection(Definition, ['*', '* -']));
		this.registerCommand('toggle-multiline-definition', () => this.executeOperationOnSelection(MultilineDefinition));
		this.registerCommand('toggle-table-row', () => this.executeOperationOnSelection(Table));
	}

	registerCommand(command, cb) {
		const targetElem = this.cm.display.wrapper;
		this.subscriptions.add(
			inkdrop.commands.add(targetElem, {
				[`${NAMESPACE}:${command}`]: () => {
					cb();
				}
			}),
		);
	}

	/* ------------------------------------- */
	/* -------- Selection Operators -------- */
	/* ------------------------------------- */
	executeOperationOnSelection(operatorClass, args) {
		let operator = (args === null || typeof args === 'undefined')	? new operatorClass() : new operatorClass(...args);
		this.cm.replaceSelections(operator.execute(this.cm.getSelections()));
	}

	destroy() {
		this.subscriptions.dispose();
	}
}
