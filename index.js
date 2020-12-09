'use strict';

const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');

module.exports = {
  name: require('./package').name,

  included(app) {
    this._super.included.apply(this, arguments);
    app.import('node_modules/quill/dist/quill.snow.css');
    app.import('node_modules/quill/dist/quill.bubble.css');
  },
};
