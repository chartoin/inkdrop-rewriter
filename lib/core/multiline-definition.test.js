'use babel';

import {MultilineDefinition} from './multiline-definition';

let definition;

beforeEach(() => { definition = new MultilineDefinition(); });
afterEach(() => { definition = null; });

/* -------- isTerm -------- */
test('valid term is detected as term', () => {
	expect(definition.isTerm('Words with spaces:')).toBe(true);
});

test('invalid term is detected as not a term', () => {
	expect(definition.isTerm('Words with spaces')).toBe(false);
});

/* -------- isEmphasized -------- */
test('emphasized line is detected', () => {
	expect(definition.isEmphasized('*Words with spaces:*')).toBe(true);
});

test('unemphasized line is not detected', () => {
	expect(definition.isEmphasized('Words with spaces:')).toBe(false);
});

test('partial emphasis are ignored', () => {
	expect(definition.isEmphasized('*Words* with spaces:')).toBe(false);
});

test('non term emphasis are ignored', () => {
	expect(definition.isEmphasized('*Words with spaces*')).toBe(false);
});

/* -------- handleLine -------- */
test('return unemphasized non-terms with no change', () => {
	expect(definition.handleLine('Words with spaces')).toMatch('Words with spaces');
});

test('unemphasize emphasized term', () => {
	expect(definition.handleLine('*Words with spaces:*')).toMatch('Words with spaces:');
});

test('leave unchanced emphasized non-term', () => {
	expect(definition.handleLine('*Words with spaces*')).toMatch('*Words with spaces*');
});

test('emphasize unemphasized term', () => {
	expect(definition.handleLine('Words with spaces:')).toMatch('*Words with spaces:*');
});

/* -------- handleSelection -------- */
test('handle multiline terms', () => {
	expect(definition.handleSelection('Word1:\nWord2:')).toMatch('*Word1:*\n*Word2:*');
});

test('handle multiline non-terms', () => {
	expect(definition.handleSelection('Word1\nWord2')).toMatch('Word1\nWord2');
});

test('handle multiline combo terms', () => {
	expect(definition.handleSelection('Word1:\nWord2')).toMatch('*Word1:*\nWord2');
});

/* -------- execute -------- */
test('handle multiple selections', () => {
	expect(definition.execute(['Word1:\nWord2:', 'Word3:\nWord4'])).toEqual(['*Word1:*\n*Word2:*','*Word3:*\nWord4']);
});
