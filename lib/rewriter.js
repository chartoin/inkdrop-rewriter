"use babel";
import { CompositeDisposable } from 'event-kit';
import { RewritingEditor } from "./rewriting-editor";
var logger = require('inkdrop').logger;
var editor = null;
var Plugin = /** @class */ (function () {
    function Plugin() {
        this.subscriptions = new CompositeDisposable();
        this.activeEditor = inkdrop.getActiveEditor();
        this.rewritingEditor = null;
    }
    Plugin.prototype.activate = function () {
        var _this = this;
        if (this.activeEditor !== undefined) {
            this.rewritingEditor = new RewritingEditor(this.activeEditor.cm);
        }
        else {
            this.subscriptions.add(inkdrop.onEditorLoad(function (e) {
                _this.rewritingEditor = new RewritingEditor(e.cm);
            }));
        }
        this.subscriptions.add(inkdrop.onEditorUnload(function () {
            if (_this.rewritingEditor !== null) {
                _this.rewritingEditor.dispose();
            }
        }));
    };
    Plugin.prototype.deactivate = function () {
        this.subscriptions.dispose();
        if (this.rewritingEditor !== null) {
            this.rewritingEditor.dispose();
        }
    };
    return Plugin;
}());
var plugin = new Plugin();
module.exports = {
    activate: function () {
        plugin.activate();
    },
    deactivate: function () {
        plugin.deactivate();
    }
};
