'use babel';
var SelectionOperator = /** @class */ (function () {
    function SelectionOperator() {
    }
    SelectionOperator.prototype.execute = function (selections) {
        return selections.map(this.handleSelection, this);
    };
    SelectionOperator.prototype.handleSelection = function (selection) {
        return selection.split('\n').map(this.handleLine, this).join('\n');
    };
    SelectionOperator.prototype.handleLine = function (line) {
        return line;
    };
    return SelectionOperator;
}());
export { SelectionOperator };
