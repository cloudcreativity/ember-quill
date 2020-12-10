import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default class QuillComponent extends Component {
  @tracked length;
  @tracked characters;
  @tracked words;

  get id() {
    return guidFor(this);
  }

  get toolbarId() {
    return `${this.id}-toolbar`;
  }

  get editorId() {
    return `${this.id}-editor`;
  }

  @action
  setLength(length) {
    this.length = length;
    this.characters = length - 1;
  }

  @action
  setWords(words) {
    this.words = words;
  }
}
