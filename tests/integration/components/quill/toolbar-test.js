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

  test('it yields an align button', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.align value="left" />
        <Tb.align value="center" />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > button.ql-align').exists({ count: 2 });

    let buttons = findAll('.ql-align');

    assert.dom(buttons[0]).hasValue('left');
    assert.dom(buttons[1]).hasValue('center');
  });

  test('it yields an align select', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.align @values={{array false "left" "center"}} />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > select').hasClass('ql-align');
    assert.dom('select > option').exists({ count: 3 });
  });

  test('it yields a background select', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.background @values={{array "#000000" "#ffff00"}} />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > select').hasClass('ql-background');
    assert.dom('select > option').exists({ count: 2 });
  });

  test('it yields a blockquote button', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.blockquote />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > button').hasClass('ql-blockquote');
  });

  test('it yields a bold button', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.bold />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > button').hasClass('ql-bold');
  });

  test('it yields a clean button', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.clean />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > button').hasClass('ql-clean');
  });

  test('it yields a code-block button', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.code-block />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > button').hasClass('ql-code-block');
  });

  test('it yields a code button', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.code />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > button').hasClass('ql-code');
  });

  test('it yields a color select', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.color @values={{array "#000000" "#ffff00"}} />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > select').hasClass('ql-color');
    assert.dom('select > option').exists({ count: 2 });
  });

  test('it yields a direction button', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.direction value="rtl" />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > button').hasClass('ql-direction').hasValue('rtl');
  });

  test('it yields a font select', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.font @values={{array "Foo" "Bar" "Baz" "Bat"}} />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > select').hasClass('ql-font');
    assert.dom('select > option').exists({ count: 4 });
  });

  test('it yields a formula button', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.formula />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > button').hasClass('ql-formula');
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

  test('it yields a header button', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.header value="1" />
        <Tb.header value="2" />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > button.ql-header').exists({ count: 2 });

    let buttons = findAll('.ql-header');

    assert.dom(buttons[0]).hasValue('1');
    assert.dom(buttons[1]).hasValue('2');
  });

  test('it yields a header select', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.header @values={{array 1 2 3 false}} />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > select').hasClass('ql-header');
    assert.dom('select > option').exists({ count: 4 });
  });

  test('it yields an image button', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.image />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > button').hasClass('ql-image');
  });

  test('it yields an indent button', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.indent value="-1" />
        <Tb.indent value="+1" />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > button.ql-indent').exists({ count: 2 });

    let buttons = findAll('.ql-indent');

    assert.dom(buttons[0]).hasValue('-1');
    assert.dom(buttons[1]).hasValue('+1');
  });

  test('it yields an italic button', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.italic />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > button').hasClass('ql-italic');
  });

  test('it yields a link button', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.link />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > button').hasClass('ql-link');
  });

  test('it yields a list button', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.list value="ordered" />
        <Tb.list value="bullet" />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > button.ql-list').exists({ count: 2 });

    let buttons = findAll('.ql-list');

    assert.dom(buttons[0]).hasValue('ordered');
    assert.dom(buttons[1]).hasValue('bullet');
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

    assert.dom(buttons[0]).hasValue('sub');
    assert.dom(buttons[1]).hasValue('super');
  });

  test('it yields a size select', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.size @values={{array "small" false "large" "huge"}} />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > select').hasClass('ql-size');
    assert.dom('select > option').exists({ count: 4 });
  });

  test('it yields a strike button', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.strike />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > button').hasClass('ql-strike');
  });

  test('it yields an underline button', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.underline />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > button').hasClass('ql-underline');
  });

  test('it yields a video button', async function (assert) {
    await render(hbs`
      <Quill::Toolbar @id="my-toolbar" as |Tb|>
        <Tb.video />
      </Quill::Toolbar>
    `);

    assert.dom('#my-toolbar > button').hasClass('ql-video');
  });

});
