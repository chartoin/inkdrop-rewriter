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
var EnlistedPhrases = /** @class */ (function (_super) {
    __extends(EnlistedPhrases, _super);
    function EnlistedPhrases(enlistedRegex) {
        var _this = _super.call(this) || this;
        _this.enlistedRegex = /.*\([0-9]+\).*/;
        _this.enlistedRegex = (enlistedRegex === null || typeof enlistedRegex === 'undefined') ? _this.enlistedRegex : enlistedRegex;
        return _this;
    }
    EnlistedPhrases.prototype.handleSelection = function (selection) {
        return this.isEnlisted(selection) ? this.makeUnenlisted(selection) : this.makeEnlisted(selection);
    };
    EnlistedPhrases.prototype.makeEnlisted = function (text) {
        var phrases = text.split(',').map(function (p) { return p.trim(); });
        return phrases.map(function (p, ii) {
            return "(".concat(ii + 1, ") ").concat(p);
        }).join(', ');
    };
    EnlistedPhrases.prototype.makeUnenlisted = function (text) {
        var phrases = text.split(',').map(function (p) { return p.trim(); });
        return phrases.map(function (p) {
            return p.replace(/\([0-9]+\) /, '');
        }).join(', ');
    };
    EnlistedPhrases.prototype.isEnlisted = function (selection) {
        return this.enlistedRegex.test(selection);
    };
    return EnlistedPhrases;
}(MultiSelectionAction));
export { EnlistedPhrases };
