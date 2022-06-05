"use babel";

import {CompositeDisposable} from 'event-kit';
import {RewritingEditor} from "./rewriting-editor";
import {Inkdrop,Editor} from './core/types';

let editor: Editor | null = null;
declare var inkdrop: Inkdrop;

class Plugin {
	subscriptions: CompositeDisposable = new CompositeDisposable();
	activeEditor: Editor = inkdrop.getActiveEditor();
	rewritingEditor: RewritingEditor | null = null;

  activate() {
		if (this.activeEditor !== undefined) {
			this.rewritingEditor = new RewritingEditor(this.activeEditor.cm);
		} else {
			this.subscriptions.add( inkdrop.onEditorLoad(e => { 
				this.rewritingEditor = new RewritingEditor(e.cm); 
			}));
		}

		this.subscriptions.add( inkdrop.onEditorUnload(() => { 
			if(this.rewritingEditor !== null) { this.rewritingEditor.dispose(); }
		}));
  }

  deactivate() {
		this.subscriptions.dispose();
		if(this.rewritingEditor !== null) { this.rewritingEditor.dispose(); }
  }

}

const plugin = new Plugin();
module.exports = {

  activate() {
		plugin.activate();
  },

  deactivate() {
		plugin.deactivate();
  }

};
