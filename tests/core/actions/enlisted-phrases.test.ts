'use babel';

import {EnlistedPhrases} from '../../../src/core/actions/enlisted-phrases';

let obj: EnlistedPhrases;
beforeEach(() => { obj = new EnlistedPhrases(); });

/* -------- isParagraph -------- */
test('phrases are recognized as enlisted', () => {
	expect(obj.isEnlisted('(1) one, (2) two, (3) three.')).toBe(true);
});

test('normal comma separated phrases are recognized', () => {
	expect(obj.isEnlisted('one, two, three.')).toBe(false);
});

/* -------- handleSelection -------- */
test('convert comma phrases to enlisted', () => {
	expect(obj.handleSelection('one, two, three.')).toMatch('(1) one, (2) two, (3) three.');
});

test('convert enlisted phrases to comma phrases', () => {
	expect(obj.handleSelection('(1) one, (2) two, (3) three.')).toMatch('one, two, three.');
});

