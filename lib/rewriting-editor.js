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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Disposable, CompositeDisposable } from 'event-kit';
import { Definition } from "./core/actions/definition";
import { MultilineDefinition } from "./core/actions/multiline-definition";
import { Table } from "./core/actions/table";
import { SentenceLines } from "./core/actions/sentence-lines";
import { EnlistedPhrases } from "./core/actions/enlisted-phrases";
var NAMESPACE = 'rewriter';
var RewritingEditor = /** @class */ (function (_super) {
    __extends(RewritingEditor, _super);
    function RewritingEditor(cm) {
        var _this = _super.call(this, function () { return _this.destroy(); }) || this;
        _this.cm = cm;
        _this.subscriptions = new CompositeDisposable();
        _this.registerCommand('toggle-definition', function () { return _this.executeOperationOnSelection(Definition, ['*', '* -']); });
        _this.registerCommand('toggle-multiline-definition', function () { return _this.executeOperationOnSelection(MultilineDefinition); });
        _this.registerCommand('toggle-table-row', function () { return _this.executeOperationOnSelection(Table); });
        _this.registerCommand('toggle-sentence-lines', function () { return _this.executeOperationOnSelection(SentenceLines); });
        _this.registerCommand('toggle-enlisted-phrases', function () { return _this.executeOperationOnSelection(EnlistedPhrases); });
        return _this;
    }
    RewritingEditor.prototype.registerCommand = function (command, cb) {
        var _a;
        var targetElem = this.cm.getWrapperElement();
        this.subscriptions.add(inkdrop.commands.add(targetElem, (_a = {},
            _a["".concat(NAMESPACE, ":").concat(command)] = cb,
            _a)));
    };
    /* ------------------------------------- */
    /* -------- Selection Operators -------- */
    /* ------------------------------------- */
    RewritingEditor.prototype.executeOperationOnSelection = function (operatorClass, args) {
        var operator = (args === null || typeof args === 'undefined')
            ? new operatorClass()
            : new (operatorClass.bind.apply(operatorClass, __spreadArray([void 0], args, false)))();
        this.cm.replaceSelections(operator.execute(this.cm.getSelections()));
    };
    RewritingEditor.prototype.destroy = function () {
        this.subscriptions.dispose();
    };
    return RewritingEditor;
}(Disposable));
export { RewritingEditor };
