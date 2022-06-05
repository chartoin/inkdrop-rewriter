'use babel';
var RXHelper = /** @class */ (function () {
    function RXHelper() {
    }
    RXHelper.escape = function (str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };
    return RXHelper;
}());
export { RXHelper };
var String = /** @class */ (function () {
    function String() {
    }
    String.wrap = function (str, c, suffix) {
        suffix = (suffix === null || typeof suffix === 'undefined') ? c : suffix;
        return c + str + suffix;
    };
    return String;
}());
export { String };
