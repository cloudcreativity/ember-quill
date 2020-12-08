'use strict';

const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');

module.exports = {
  name: require('./package').name,

  included(app) {
    this._super.included.apply(this, arguments);
    app.import('vendor/quill.core.css');
    app.import('vendor/quill.snow.css');
  },

  treeForVendor(tree) {
    let styles = new Funnel(`${this.project.root}/node_modules/quill/dist`, {
      files: ['quill.core.css', 'quill.snow.css'],
    });

    return mergeTrees([tree, styles]);
  }
};
