'use babel';

import {SentenceLines} from '../../../src/core/actions/sentence-lines';

let obj: SentenceLines;
beforeEach(() => { obj = new SentenceLines(); });

/* -------- isParagraph -------- */
test('sequence of sentences are recognized as a paragraph', () => {
	expect(obj.isParagraph('This. That. And. The. Other.')).toBe(true);
});

test('newline separated sentences are recognized as not paragraph', () => {
	expect(obj.isParagraph('This.\nThat.\nAnd.\nThe.\nOther.')).toBe(false);
});

/* -------- handleSelection -------- */
test('convert paragraph to newline sentences', () => {
	expect(obj.handleSelection('This. That. And. The. Other.')).toMatch('This.\nThat.\nAnd.\nThe.\nOther.');
});

test('convert newline sentences to paragraph', () => {
	expect(obj.handleSelection('This.\nThat.\nAnd.\nThe.\nOther.')).toMatch('This. That. And. The. Other.');
});

