import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | quill/toolbar/group', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Quill::Toolbar::Group class="foo">
        template block text
      </Quill::Toolbar::Group>
    `);

    assert.dom('span')
      .hasClass('ql-formats')
      .hasClass('foo')
      .hasText('template block text');
  });
});
