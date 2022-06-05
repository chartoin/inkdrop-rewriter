'use babel';

import { Disposable, CompositeDisposable } from 'event-kit';
import CodeMirror from 'codemirror';
import {Inkdrop} from './core/types';

import {Definition} from "./core/definition";
import {MultilineDefinition} from "./core/multiline-definition";
import {Table} from "./core/table";
import {SentenceLines} from "./core/sentence-lines";

const NAMESPACE='rewriter';
declare var inkdrop: Inkdrop;

export class RewritingEditor extends Disposable {
	cm: CodeMirror.Editor;
	subscriptions: CompositeDisposable;

	constructor(cm: CodeMirror.Editor) {
		super(() => this.dispose());
		this.cm = cm;
		this.subscriptions = new CompositeDisposable();
		this.registerCommand('toggle-definition', () => this.executeOperationOnSelection(Definition, ['*', '* -']));
		this.registerCommand('toggle-multiline-definition', () => this.executeOperationOnSelection(MultilineDefinition));
		this.registerCommand('toggle-table-row', () => this.executeOperationOnSelection(Table));
		this.registerCommand('toggle-sentence-lines', () => this.executeOperationOnSelection(SentenceLines));
	}

	registerCommand(command: string, cb: () => void) {
		const targetElem = this.cm.getWrapperElement();
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
	executeOperationOnSelection(operatorClass: any, args?: string[]) {
		let operator = (args === null || typeof args === 'undefined')	? new operatorClass() : new operatorClass(...args);
		this.cm.replaceSelections(operator.execute(this.cm.getSelections()));
	}

	dispose() {
		this.subscriptions.dispose();
	}
}
