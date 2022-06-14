'use babel';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { MultiSelectionAction } from '../actions';
import { String } from '../utils';
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table(tableRegex) {
        var _this = _super.call(this) || this;
        _this.tableRegex = /^\|.*\|$/;
        _this.tableRegex = (tableRegex === null || typeof tableRegex === 'undefined') ? _this.tableRegex : tableRegex;
        return _this;
    }
    Table.prototype.handleLine = function (line) {
        if (this.isCSV(line)) {
            return this.makeTableRow(line);
        }
        else if (this.isTableRow(line)) {
            return this.makeCSV(line);
        }
        else {
            return line;
        }
    };
    Table.prototype.makeTableRow = function (line) {
        return String.wrap(line.replaceAll(',', '|'), '|');
    };
    Table.prototype.makeCSV = function (line) {
        return line.slice(1, -1).replaceAll('|', ',');
    };
    Table.prototype.isTableRow = function (line) {
        return this.tableRegex.test(line);
    };
    Table.prototype.isCSV = function (line) {
        return line.includes(',');
    };
    return Table;
}(MultiSelectionAction));
export { Table };
