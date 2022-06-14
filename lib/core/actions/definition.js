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
import { RXHelper, String } from '../utils';
var Definition = /** @class */ (function (_super) {
    __extends(Definition, _super);
    function Definition(prefix, suffix) {
        var _this = _super.call(this) || this;
        _this.prefix = '';
        _this.suffix = '';
        _this.defregex = new RegExp('');
        _this.prefix = (prefix === null || typeof prefix === 'undefined') ? '*' : prefix;
        _this.suffix = (suffix === null || typeof suffix === 'undefined') ? prefix : suffix;
        var rprefix = RXHelper.escape(_this.prefix);
        var rsuffix = RXHelper.escape(_this.suffix);
        _this.defregex = new RegExp("^".concat(rprefix, "(.*)").concat(rsuffix, "(.*)"));
        return _this;
    }
    Definition.prototype.handleLine = function (line) {
        if (line === '') {
            return line;
        }
        return this.isDefinition(line) ? this.unwrapTerm(line) : this.wrapTerm(line);
    };
    Definition.prototype.isDefinition = function (line) {
        return this.defregex.test(line);
    };
    Definition.prototype.wrapTerm = function (line) {
        var words = line.split(' ');
        words[0] = String.wrap(words[0], this.prefix, this.suffix);
        return words.join(' ');
    };
    Definition.prototype.unwrapTerm = function (line) {
        var matches = line.match(this.defregex);
        if (matches !== null) {
            return matches.slice(1).join('');
        }
        return line;
    };
    return Definition;
}(MultiSelectionAction));
export { Definition };
