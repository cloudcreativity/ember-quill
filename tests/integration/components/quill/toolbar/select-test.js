import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | quill/toolbar/select', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders inline', async function (assert) {
    await render(hbs`
      <Quill::Toolbar::Select
        @selected={{false}}
        @type="size"
        @values={{array "small" false "large" "huge"}}
        class="foo"
      />
    `);

    assert.dom('select').hasClass('ql-size').hasClass('foo');
    assert.dom('select > option').exists({ count: 4 });

    let options = findAll('select > option');

    assert.dom(options[0]).hasAttribute('value', 'small').hasProperty('selected', false);
    assert.dom(options[1]).doesNotHaveAttribute('value').hasProperty('selected', true);
    assert.dom(options[2]).hasAttribute('value', 'large').hasProperty('selected', false);
    assert.dom(options[3]).hasAttribute('value', 'huge').hasProperty('selected', false);
  });

  test('it renders as block', async function (assert) {
    await render(hbs`
      <Quill::Toolbar::Select @type="size" class="foo">
        <option value="small"></option>
        <option selected></option>
        <option value="large"></option>
        <option value="huge"></option>
      </Quill::Toolbar::Select>
    `);

    assert.dom('select').hasClass('ql-size').hasClass('foo');
    assert.dom('select > option').exists({ count: 4 });

    let options = findAll('select > option');

    assert.dom(options[0]).hasAttribute('value', 'small').hasProperty('selected', false);
    assert.dom(options[1]).doesNotHaveAttribute('value').hasProperty('selected', true);
    assert.dom(options[2]).hasAttribute('value', 'large').hasProperty('selected', false);
    assert.dom(options[3]).hasAttribute('value', 'huge').hasProperty('selected', false);
  });
});
