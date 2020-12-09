import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | quill/toolbar/button-or-select', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a button', async function (assert) {
    await render(hbs`
      <Quill::Toolbar::ButtonOrSelect
        @type="header"
        value="1"
        class="foo"
      />
    `);

    assert.dom('button').hasClass('ql-header').hasClass('foo').hasValue('1');
  });

  test('it renders a select', async function (assert) {
    await render(hbs`
      <Quill::Toolbar::ButtonOrSelect
        @selected="large"
        @type="header"
        @values={{array "small" false "large" "huge"}}
        class="foo"
      />
    `);

    assert.dom('select').hasClass('ql-header').hasClass('foo');
    assert.dom('select > option').exists({ count: 4 });

    let options = findAll('select > option');

    assert.dom(options[0]).hasValue('small').hasProperty('selected', false);
    assert.dom(options[1]).hasNoValue().hasProperty('selected', false);
    assert.dom(options[2]).hasValue('large').hasProperty('selected', true);
    assert.dom(options[3]).hasValue('huge').hasProperty('selected', false);
  });

  test('it renders as a block button', async function (assert) {
    await render(hbs`
      <Quill::Toolbar::ButtonOrSelect
        @controlType="button"
        @type="header"
        value="1"
        class="foo"
      >
        Click Me!
      </Quill::Toolbar::ButtonOrSelect>
    `);

    assert.dom('button')
      .hasClass('ql-header')
      .hasClass('foo')
      .hasValue('1')
      .hasText('Click Me!');
  });

  test('it renders as a block select', async function (assert) {
    await render(hbs`
      <Quill::Toolbar::ButtonOrSelect
        @controlType="select"
        @type="header"
        class="foo"
      >
        <option value="1"></option>
        <option value="2"></option>
      </Quill::Toolbar::ButtonOrSelect>
    `);

    assert.dom('select').hasClass('ql-header').hasClass('foo');
    assert.dom('select > option').exists({ count: 2 });
  });
});
