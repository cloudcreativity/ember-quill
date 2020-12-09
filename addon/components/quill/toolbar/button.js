import Component from '@glimmer/component';

export default class QuillToolbarButtonComponent extends Component {
  get qlClass() {
    if (this.args.type) {
      return `ql-${this.args.type}`;
    }
  }
}
