import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

export default class QuillComponent extends Component {
  get id() {
    return guidFor(this);
  }

  get toolbarId() {
    return `${this.id}-toolbar`;
  }

  get editorId() {
    return `${this.id}-editor`;
  }
}
