import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | quill/toolbar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" class="foo">
        template block text
      </Quill::Toolbar>
    `);

    assert.dom('div#my-toolbar')
      .hasClass('foo')
      .hasText('template block text');
  });

  test('it yields a bold button', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.bold />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > button').hasClass('ql-bold');
  });

  test('it yields an italic button', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.italic />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > button').hasClass('ql-italic');
  });

  test('it yields a script button', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.script value="sub" />
        <Tb.script value="super" />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > button.ql-script').exists({ count: 2 });

    let buttons = findAll('.ql-script');

    assert.dom(buttons[0]).hasAttribute('value', 'sub');
    assert.dom(buttons[1]).hasAttribute('value', 'super');
  });

  test('it yields a group', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.group>
          <Tb.bold />
          <Tb.italic />
        </Tb.group>
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > div.ql-formats > button').exists({ count: 2 });
  });
});
