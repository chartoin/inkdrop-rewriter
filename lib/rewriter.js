"use babel"

import {CompositeDisposable} from 'event-kit';
import {Editor} from "./editor";

let subscriptions = null;
let editor = null;

module.exports = {

  activate() {
		subscriptions = new CompositeDisposable();
		const activeEditor = inkdrop.getActiveEditor();
		if (activeEditor !== undefined) {
			editor = new Editor(activeEditor.cm);
		} else {
			subscriptions.add(
				inkdrop.onEditorLoad(e => {
					editor = new Editor(e.cm);
				}),
			);
		}

		subscriptions.add(
			inkdrop.onEditorUnload(() => {
				editor.dispose();
			}),
		);
  },

  deactivate() {
		subscriptions.dispose();
		editor.dispose();
  }

};
