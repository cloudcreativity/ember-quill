import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | quill', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Quill as |Ql|>
        <Ql.toolbar as |Tb|>
          <Tb.bold />
          <Tb.italic />
        </Ql.toolbar>
        <Ql.editor
          @onChange={{action (mut this.delta)}}
          @onText={{action (mut this.text)}}
        />
        <p data-test-length>{{Ql.length}}</p>
        <p data-test-characters>{{Ql.characters}}</p>
        <p data-test-words>{{Ql.words}}</p>
      </Quill>
    `);

    assert.dom('.ql-toolbar > button').exists({ count: 2 });

    await fillIn('.ql-editor', 'An epic story.');

    assert.equal(this.text.trim(), 'An epic story.');
    assert.dom('[data-test-length]').hasText('15');
    assert.dom('[data-test-characters]').hasText('14');
    assert.dom('[data-test-words]').hasText('3');
    assert.deepEqual(this.delta.ops, [
      { insert: 'An epic story.\n'},
    ]);
  });
});
