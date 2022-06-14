'use babel';

import CodeMirror from 'codemirror';
import {Disposable} from 'event-kit';

export interface Inkdrop {
  window: any;
  commands: any;
  config: any;
  components: any;
  layouts: any;
  store: any;
  getActiveEditor(): Editor;
  onEditorLoad(callback: (e: Editor) => void): Disposable;
  onEditorUnload(callback: (e: Editor) => void): Disposable;
}

export interface Editor {
  cm: CodeMirror.Editor;
  forceUpdate(): any;
}

export interface Action {
	execute(input: any): any;
}
