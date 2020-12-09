import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | quill/toolbar/button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders inline', async function (assert) {
    await render(hbs`
      <Quill::Toolbar::Button @type="bold" />
    `);

    assert.dom('button')
      .hasClass('ql-bold')
      .hasAttribute('type', 'button');

    await render(hbs`
      <Quill::Toolbar::Button @type="script" value="sub" />
    `);

    assert.dom('button').hasClass('ql-script').hasAttribute('value', 'sub');
  });

  test('it renders as block', async function (assert) {
    await render(hbs`
      <Quill::Toolbar::Button @type="bold">
        Bold!
      </Quill::Toolbar::Button>
    `);

    assert.dom('button')
      .hasClass('ql-bold')
      .hasText('Bold!')
      .hasAttribute('type', 'button');
  });
});
