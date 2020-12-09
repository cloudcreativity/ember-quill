import Service from '@ember/service';
import Quill from 'quill';
import { assert } from '@ember/debug';

export default class QuillService extends Service {
  instances = {};

  /**
   * Register a Quill instance by name.
   */
  register(name, instance) {
    assert('Quill instance must not already be registered.', false === Boolean(this.instances[name]));
    this.instances[name] = instance;
  }

  /**
   * De-register a Quill instance by name.
   *
   * @returns {void}
   */
  deregister(name) {
    delete this.instances[name];
  }

  /**
   * Get a Quill instance by name.
   *
   * @returns {(Quill|null)}
   */
  instance(name) {
    return this.instances[name] ?? null;
  }

  /**
   * Delete text from the named editor.
   *
   * @param {string} name the named editor.
   * @param {number} index
   * @param {number} length
   * @param {string} source
   * @returns {(Delta|null)}
   */
  deleteText(name, index, length, source = Quill.sources.API) {
    if (this.instances[name]) {
      return this.instances[name].deleteText(index, length, source);
    }

    return null;
  }

  /**
   * Retrieve the contents of the named editor.
   *
   * @param {string} name the named editor.
   * @returns {(Delta|null)}
   */
  getContents(name) {
    if (this.instances[name]) {
      return this.instances[name].getContents();
    }

    return null;
  }

  /**
   * Retrieve the length of the editor contents.
   *
   * @param {string} name the named editor.
   * @returns {(number|null)}
   */
  getLength(name) {
    if (this.instances[name]) {
      return this.instances[name].getLength();
    }

    return null;
  }

  /**
   * Retrieve the string content of the editor.
   *
   * @param {string} name the named editor.
   * @param {number} index
   * @param {number} length
   * @returns {(string|null)}
   */
  getText(name, index = 0, length = undefined) {
    if (this.instances[name]) {
      return this.instances[name].getText(index, length);
    }

    return null;
  }

  /**
   * Insert embedded content into the named editor.
   *
   * @param {string} name the named editor.
   * @param {number} index
   * @param {string} type
   * @param value
   * @param {string} source
   * @returns {(Delta|null)}
   */
  insertEmbed(name, index, type, value, source = Quill.sources.API) {
    if (this.instances[name]) {
      return this.instances[name].insertEmbed(index, type, value, source);
    }

    return null;
  }

  /**
   * Insert text into the named editor.
   *
   * @param {string} name the named editor.
   * @param args
   * @returns {(Delta|null)}
   */
  insertText(name, ...args) {
    if (this.instances[name]) {
      return this.instances[name].insertText(...args);
    }

    return null;
  }

  /**
   * Set contents on the named editor.
   *
   * @param {string} name the named editor.
   * @param {Delta} delta
   * @returns {(Delta|null)}
   */
  setContents(name, delta, source = Quill.sources.API) {
    if (this.instances[name]) {
      return this.instances[name].setContents(delta, source);
    }

    return null;
  }

  /**
   * Set text contents on the named editor.
   *
   * @param {string} name the named editor.
   * @param {string} text
   * @param {string} source
   * @returns {(Delta|null)}
   */
  setText(name, text, source = Quill.sources.API) {
    if (this.instances[name]) {
      return this.instances[name].setText(text, source);
    }

    return null;
  }

  /**
   * Apply delta to the named editor's contents.
   *
   * @param {string} name the named editor.
   * @param {Delta} delta
   * @param {string} source
   * @returns {(Delta|null)}
   */
  updateContents(name, delta, source = Quill.sources.API) {
    if (this.instances[name]) {
      return this.instances[name].updateContents(delta, source);
    }

    return null;
  }

  /**
   * Format text at the user's current selection in the named editor.
   *
   * @param {string} name the editor name
   * @param {string} formatName
   * @param value
   * @param {string} source
   * @returns {(Delta|null)}
   */
  format(name, formatName, value, source = Quill.sources.API) {
    if (this.instances[name]) {
      return this.instances[name].format(formatName, value, source);
    }

    return null;
  }

  /**
   * Formats all lines in a given range in the named editor.
   *
   * @param {string} name the named editor.
   * @param args
   * @returns {(Delta|null)}
   */
  formatLine(name, ...args) {
    if (this.instances[name]) {
      return this.instances[name].formatLine(...args);
    }

    return null;
  }

  /**
   * Format text in the named editor.
   *
   * @param {string} name the named editor.
   * @param args
   * @returns {(Delta|null)}
   */
  formatText(name, ...args) {
    if (this.instances[name]) {
      return this.instances[name].formatText(...args);
    }

    return null;
  }

  /**
   * Retrieves common formating of the text in the named editor.
   *
   * @param {string} name the named editor.
   * @param args
   * @returns {(String[]|null)}
   */
  getFormat(name, ...args) {
    if (this.instances[name]) {
      return this.instances[name].getFormat(...args);
    }

    return null;
  }

  /**
   * Removes all formating and embeds within the given range, in the named editor.
   *
   * @param {string} name the editor name.
   * @param {number} index
   * @param {number} length
   * @param {string} source
   * @returns {(Delta|null)}
   */
  removeFormat(name, index, length, source = Quill.sources.API) {
    if (this.instances[name]) {
      return this.instances[name].removeFormat(index, length, source);
    }

    return null;
  }

  /**
   * Retrieves the pixel position and dimensions of a selection in the named editor.
   *
   * @param {string} name the named editor.
   * @param {number} index
   * @param {number} length
   * @returns {(Object|null)}
   */
  getBounds(name, index, length = 0) {
    if (this.instances[name]) {
      return this.instances[name].getBounds(index, length);
    }

    return null;
  }

  /**
   * Retrieves the user's selection range in the named editor.
   *
   * @param {string} name the named editor.
   * @param {boolean} focus
   * @returns {(Object|null)}
   */
  getSelection(name, focus = false) {
    if (this.instances[name]) {
      return this.instances[name].getSelection(name, focus);
    }

    return null;
  }

  /**
   * Remove focus from the named editor.
   *
   * @param {string} name the named editor.
   */
  blur(name) {
    if (this.instances[name]) {
      this.instances[name].blur();
    }
  }

  /**
   * Disable from the named editor.
   *
   * @param {string} name the named editor.
   */
  disable(name) {
    if (this.instances[name]) {
      this.instances[name].disable();
    }
  }

  /**
   * Enable the named editor.
   *
   * @param {string} name the named editor.
   */
  enable(name) {
    if (this.instances[name]) {
      this.instances[name].enable();
    }
  }

  /**
   * Focuses the named editor.
   *
   * @param {string} name the named editor.
   */
  focus(name) {
    if (this.instances[name]) {
      this.instances[name].focus();
    }
  }

  /**
   * Does the named editor have focus?
   *
   * @return {(boolean|null)}
   */
  hasFocus(name) {
    if (this.instances[name]) {
      return this.instances[name].hasFocus();
    }

    return null;
  }

  /**
   * Synchronously check the named editor for user updates.
   *
   * @param {string} name the named editor
   * @param {string} source
   */
  update(name, source = Quill.sources.USER) {
    if (this.instances[name]) {
      this.instances[name].update(source);
    }
  }
}
