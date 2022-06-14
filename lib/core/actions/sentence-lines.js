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
var SentenceLines = /** @class */ (function (_super) {
    __extends(SentenceLines, _super);
    function SentenceLines(paragraphRegex) {
        var _this = _super.call(this) || this;
        _this.paragraphRegex = /\. [A-za-z0-9]/;
        _this.paragraphRegex = (paragraphRegex === null || typeof paragraphRegex === 'undefined') ? _this.paragraphRegex : paragraphRegex;
        return _this;
    }
    SentenceLines.prototype.handleSelection = function (selection) {
        return this.isParagraph(selection) ? selection.replaceAll('. ', '.\n') : selection.replaceAll('\n', ' ');
    };
    SentenceLines.prototype.isParagraph = function (selection) {
        return this.paragraphRegex.test(selection);
    };
    return SentenceLines;
}(MultiSelectionAction));
export { SentenceLines };
