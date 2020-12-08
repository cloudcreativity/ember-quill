import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @tracked enabled = true;
  @tracked delta = null;
  @tracked length = 0;
  @tracked text = null;

  constructor() {
    super(...arguments);
    this.delta = {
      ops: [
        { insert: 'Hello ' },
        { insert: 'World!', attributes: { bold: true } },
        { insert: '\n' },
      ],
    }
  }

  @action
  toggleEnabled() {
    this.enabled = !this.enabled;
  }

  @action
  setDelta(delta) {
    this.delta = delta;
  }

  @action
  setLength(length) {
    this.length = length - 1;
  }

  @action
  setText(text) {
    this.text = text;
  }
}
