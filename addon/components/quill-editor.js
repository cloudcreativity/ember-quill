import Component from '@glimmer/component';
import Quill from 'quill';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { schedule } from '@ember/runloop';

export default class QuillEditorComponent extends Component {
  @service('quill') quillService;
  quill = null;

  get id() {
    return this.args.id ?? guidFor(this);
  }

  get name() {
    return this.args.name ?? this.id;
  }

  get modules() {
    let modules = this.args.modules ?? {};

    if (this.args._toolbar) {
      modules.toolbar = this.args._toolbar;
    }

    return modules;
  }

  @action
  initQuill(element) {
    this.quill = new Quill(element, {
      bounds: this.args.bounds,
      debug: this.args.debug ?? 'warn',
      formats: this.args.formats,
      modules: this.modules,
      placeholder: this.args.placeholder,
      readOnly: this.args.readOnly ?? false,
      scrollingContainer: this.args.scrollingContainer ?? null,
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
    this.doWords();

    /** Native Quill Events */
    this.quill.on('text-change', this.doTextChange);
    this.quill.on('selection-change', this.doSelectionChange);
    this.quill.on('editor-change', this.doEditorChange);

    /** Custom Events */
    this.quill.on('text-change', this.doLength);
    this.quill.on('text-change', this.doWords);
    this.quill.on('text-change', this.doContent);
    this.quill.on('text-change', this.doText);

    this.quillService.register(this.name, this.quill);
  }

  @action
  updateQuill(el, args, { enabled }) {
    if (this.quill) {
      this.quill.enable(enabled ?? true);
    }
  }

  @action
  doTextChange(delta, oldDelta, source) {
    if (this.args.onTextChange) {
      schedule('actions', this, this._handleEvent, 'onTextChange', delta, oldDelta, source);
    }
  }

  @action
  doSelectionChange(range, oldRange, source) {
    if (this.args.onSelectionChange) {
      schedule('actions', this, this._handleEvent, 'onSelectionChange', range, oldRange, source);
    }
  }

  @action
  doEditorChange(eventName, ...args) {
    if (this.args.onEditorChange) {
      schedule('actions', this, this._handleEvent, 'onEditorChange', eventName, ...args);
    }
  }

  @action
  doLength() {
    if (this.quill && this.args.onLength) {
      schedule('actions', this, this._handleEvent, 'onLength', this.quill.getLength());
    }
  }

  @action
  doContent() {
    if (this.quill && this.args.onContent) {
      schedule('actions', this, this._handleEvent, 'onContent', this.quill.getContents());
    }
  }

  @action
  doText() {
    if (this.quill && this.args.onText) {
      schedule('actions', this, this._handleEvent, 'onText', this.quill.getText());
    }
  }

  @action
  doWords() {
    if (this.quill && this.args.onWords) {
      let text = this.quill.getText();
      schedule('actions', this, this._handleEvent, 'onWords', this._calculateWords(text));
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
    this.quill.off('text-change', this.doWords);
    this.quill.off('text-change', this.doContent);
    this.quill.off('text-change', this.onText);

    this.quill = null;
    this.quillService.deregister(this.name);
  }

  _handleEvent(callback, ...args) {
    if (!this.isDestroying && !this.isDestroyed && this.args[callback]) {
      this.args[callback](...args);
    }
  }

  _calculateWords(text) {
    text = text.trim();

    return text.length > 0 ? text.split(/\s+/).length : 0;
  }
}
