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
import { SelectionOperator } from './selection-operator';
import { String } from './utils';
var MultilineDefinition = /** @class */ (function (_super) {
    __extends(MultilineDefinition, _super);
    function MultilineDefinition() {
        var _this = _super.call(this) || this;
        _this.emRegex = new RegExp('');
        _this.termRegex = new RegExp('');
        _this.emRegex = /^\*.+:\*$/;
        _this.termRegex = /^.+:$/;
        return _this;
    }
    MultilineDefinition.prototype.handleLine = function (line) {
        if (this.isEmphasized(line)) {
            return line.trim().slice(1, -1);
        }
        if (this.isTerm(line)) {
            return String.wrap(line, '*');
        }
        return line;
    };
    MultilineDefinition.prototype.isEmphasized = function (line) {
        return this.emRegex.test(line);
    };
    MultilineDefinition.prototype.isTerm = function (line) {
        return this.termRegex.test(line);
    };
    return MultilineDefinition;
}(SelectionOperator));
export { MultilineDefinition };
