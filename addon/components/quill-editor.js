import Component from '@glimmer/component';
import Quill from 'quill';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';

export default class QuillEditorComponent extends Component {
  quill = null;

  @action
  initQuill(element) {
    this.quill = new Quill(element, {
      debug: this.args.debug ?? 'warn',
      formats: this.args.formats,
      modules: this.args.modules,
      placeholder: this.args.placeholder,
      readOnly: this.args.readOnly ?? false,
      theme: this.args.theme,
    });

    if (false === this.args.enabled) {
      this.quill.enable(false);
    }

    if (true === this.args.focused) {
      this.quill.focus();
    }

    if (this.args.delta) {
      this.quill.setContents(this.args.delta);
      this.doText();
    } else if (this.args.text) {
      this.quill.setText(this.args.text);
      this.doContent();
    }

    // emit the length on start-up
    this.doLength();

    /** Native Quill Events */
    this.quill.on('text-change', this.doTextChange);
    this.quill.on('selection-change', this.doSelectionChange);
    this.quill.on('editor-change', this.doEditorChange);

    /** Custom Events */
    this.quill.on('text-change', this.doLength);
    this.quill.on('text-change', this.doContent);
    this.quill.on('text-change', this.doText);
  }

  @action
  updateQuill(el, args, { enabled }) {
    if (this.quill) {
      this.quill.enable(enabled ?? true);
    }
  }

  @action
  doTextChange(delta, oldDelta, source) {
    schedule('actions', this, this._handleEvent, 'onTextChange', delta, oldDelta, source);
  }

  @action
  doSelectionChange(range, oldRange, source) {
    schedule('actions', this, this._handleEvent, 'onSelectionChange', range, oldRange, source);
  }

  @action
  doEditorChange(eventName, ...args) {
    schedule('actions', this, this._handleEvent, 'onEditorChange', eventName, ...args);
  }

  @action
  doLength() {
    if (this.quill) {
      schedule('actions', this, this._handleEvent, 'onLength', this.quill.getLength());
    }
  }

  @action
  doContent() {
    if (this.quill) {
      schedule('actions', this, this._handleEvent, 'onContent', this.quill.getContents());
    }
  }

  @action
  doText() {
    if (this.quill) {
      schedule('actions', this, this._handleEvent, 'onText', this.quill.getText());
    }
  }

  willDestroy() {
    super.willDestroy(...arguments);

    /** Native Quill Events */
    this.quill.off('text-change', this.doTextChange);
    this.quill.off('selection-change', this.doSelectionChange);
    this.quill.off('editor-change', this.doEditorChange);

    /** Custom Events */
    this.quill.off('text-change', this.doLength);
    this.quill.off('text-change', this.doContent);
    this.quill.off('text-change', this.onText);

    this.quill = null;
  }

  _handleEvent(callback, ...args) {
    if (!this.isDestroying && !this.isDestroyed && this.args[callback]) {
      this.args[callback](...args);
    }
  }
}
