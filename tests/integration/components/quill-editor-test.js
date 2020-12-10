import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | quill-editor', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with a delta', async function (assert) {
    const delta = {
      ops: [
        { insert: 'This is my story.\n'}
      ],
    };

    this.set('delta', delta);

    await render(hbs`
      <QuillEditor
        @delta={{this.delta}}
        @onChange={{action (mut this.delta)}}
        class="foo"
      />
    `);

    assert.dom('.foo').exists();
    assert.dom('.ql-editor').hasText('This is my story.');

    await fillIn('.ql-editor', 'This is my other story.');

    assert.deepEqual(this.delta.ops, [
      { insert: 'This is my other story.\n' },
    ]);

    this.set('delta', delta);

    assert.dom('.ql-editor').hasText('This is my story.');
  });

  test('it renders with text', async function (assert) {
    this.set('text', 'This is my story.');
    this.set('update', text => this.set('text', text.trim()));

    await render(hbs`
      <QuillEditor
        @text={{this.text}}
        @onText={{this.update}}
      />
    `);

    assert.dom('.ql-editor').hasText('This is my story.');

    await fillIn('.ql-editor', 'This is my other story.');

    assert.equal(this.text, 'This is my other story.');
  });
});
