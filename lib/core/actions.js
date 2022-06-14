'use babel';
var MultiSelectionAction = /** @class */ (function () {
    function MultiSelectionAction() {
    }
    MultiSelectionAction.prototype.execute = function (selections) {
        return selections.map(this.handleSelection, this);
    };
    MultiSelectionAction.prototype.handleSelection = function (selection) {
        return selection.split('\n').map(this.handleLine, this).join('\n');
    };
    MultiSelectionAction.prototype.handleLine = function (line) {
        return line;
    };
    return MultiSelectionAction;
}());
export { MultiSelectionAction };
var SelectionAction = /** @class */ (function () {
    function SelectionAction() {
    }
    SelectionAction.prototype.execute = function (selection) {
        return this.handleSelection(selection);
    };
    SelectionAction.prototype.handleSelection = function (selection) {
        return selection.split('\n').map(this.handleLine, this).join('\n');
    };
    SelectionAction.prototype.handleLine = function (line) {
        return line;
    };
    return SelectionAction;
}());
export { SelectionAction };
var LineAction = /** @class */ (function () {
    function LineAction() {
    }
    LineAction.prototype.execute = function (line) {
        return this.handleLine(line);
    };
    LineAction.prototype.handleLine = function (line) {
        return line;
    };
    return LineAction;
}());
export { LineAction };
