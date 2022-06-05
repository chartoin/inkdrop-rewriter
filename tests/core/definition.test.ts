'use babel';

import {Definition} from '../../src/core/definition';

let definition: Definition;

beforeEach(() => { definition = new Definition('*', '* -'); });

/* -------- isDefinition -------- */
test('recognize definition line', () => {
	expect(definition.isDefinition('*Word* - this is a definition')).toBe(true);
});

test('definition term can have spaces', () => {
	expect(definition.isDefinition('*Word with space* - this is a definition')).toBe(true);
});

test('definition line without hyphen after star 2 is not a definition', () => {
	expect(definition.isDefinition('*Word* this is a definition')).toBe(false);
});

test('definition line without hyphen after star but elsewhere is not a definition', () => {
	expect(definition.isDefinition('*Word* this - is a definition')).toBe(false);
});

/* -------- wrapTerm -------- */
test('wrap first word with prefix and suffix', () => {
	definition = new Definition('ABBA', 'ACCA');
	expect(definition.wrapTerm('word')).toMatch(/ABBAwordACCA/);
});

test('wrap first word with prefix when suffix is not given', () => {
	definition = new Definition('ABBA');
	expect(definition.wrapTerm('word')).toMatch(/ABBAwordABBA/);
});

/* -------- unwrapTerm -------- */
test('unwrap definition term', () => {
	expect(definition.unwrapTerm('*Word* - this is a definition')).toMatch('Word this is a definition');
});

test('unwrap definition term with spaces', () => {
	expect(definition.unwrapTerm('*Word with spaces* - this is a definition')).toMatch('Word with spaces this is a definition');
});

/* -------- handleLine -------- */
test('return empty if line is empty', () => {
	expect(definition.handleLine('')).toMatch('');
});

test('make a non-definition into a definition', () => {
	expect(definition.handleLine('Word definition')).toMatch('*Word* - definition');
});

test('make a definition into a non-definition', () => {
	expect(definition.handleLine('*Word* - definition')).toMatch('Word definition');
});

test('make a definition with spaces into a non-definition', () => {
	expect(definition.handleLine('*Word with spaces* - definition with spaces')).toMatch('Word with spaces definition with spaces');
});

/* -------- handleSelection -------- */
test('handle single line selection', () => {
	expect(definition.handleSelection('*Word* - definition')).toMatch('Word definition');
});

test('handle two line selection', () => {
	expect(definition.handleSelection('*Word* - definition\n*Word2* - definition2')).toMatch('Word definition\nWord2 definition2');
});

test('handle multi line selection', () => {
	expect(definition.handleSelection('*Word* - definition\n*Word2* - definition2\n*Word3* - definition3')).toMatch('Word definition\nWord2 definition2\nWord3 definition3');
});

/* -------- execute -------- */
test('handle multiple selections', () => {
	expect(definition.execute(['*Word* - definition\n*Word2* - definition2','*Word3* - definition3\n*Word4* - definition4'])).toEqual(['Word definition\nWord2 definition2','Word3 definition3\nWord4 definition4']);
});
