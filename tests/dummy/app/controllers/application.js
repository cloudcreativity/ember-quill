import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @tracked enabled = true;
  @tracked delta = null;
  original = null;

  constructor() {
    super(...arguments);
    this.delta = {
      ops: [
        { insert: 'Hello ' },
        { insert: 'World!', attributes: { bold: true } },
        { insert: '\n' },
      ],
    }

    this.original = this.delta;
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
  reset() {
    this.delta = this.original;
  }
}
