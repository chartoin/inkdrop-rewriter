'use babel';

import {Table} from '../../../src/core/actions/table';

let table: Table;
beforeEach(() => { table = new Table(); });

/* -------- isCSV -------- */
test('line with a comma is a csv', () => {
	expect(table.isCSV('1,2,3')).toBe(true);
});

test('line without a comma is not a csv', () => {
	expect(table.isCSV('1 2 3')).toBe(false);
});

/* -------- isTableRow -------- */
test('line with a pipes is a table row', () => {
	expect(table.isTableRow('|123|abs|')).toBe(true);
});

test('line without pipes is not a table row', () => {
	expect(table.isTableRow('123|abs')).toBe(false);
});

test('line without leading pipe is not a table row', () => {
	expect(table.isTableRow('123|abs|')).toBe(false);
});

test('line without trailing pipe is not a table row', () => {
	expect(table.isTableRow('|123|abs')).toBe(false);
});

/* -------- isTableRow -------- */
test('convert CSV to table row', () => {
	expect(table.makeTableRow('1,2,3')).toMatch('|1|2|3|');
});

test('convert table row to CSV', () => {
	expect(table.makeCSV('|1|2|3|')).toMatch('1,2,3');
});

/* -------- handleLine -------- */
test('dont change non-table non-csv line', () => {
	expect(table.handleLine('1 2 3')).toMatch('1 2 3');
});

test('convert CSV to table row', () => {
	expect(table.handleLine('1,2,3')).toMatch('|1|2|3|');
});

test('convert table row to CSV', () => {
	expect(table.handleLine('|1|2|3|')).toMatch('1,2,3');
});
