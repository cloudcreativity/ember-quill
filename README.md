# @cloudcreativity/ember-quill

The [Quill](https://quilljs.com/) rich text editor for Ember.


## Compatibility

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


## Installation

```
ember install @cloudcreativity/ember-quill
```

## Usage

### Introduction

This addon provides components for working with the [Quill](https://quilljs.com)
rich text editor in Ember.

### Examples

Use the `<Quill>` component to create your toolbar and editor:

```hbs
<Quill as |Ql|>
  <Ql.toolbar as |Tb|>
    <Tb.group>
      <Tb.bold />
      <Tb.italic />
      <Tb.underline />
    </Tb.group>
    <Tb.group>
      <Tb.list value="ordered" />
      <Tb.list value="bullet" />
    </Tb.group>
  </Ql.toolbar>

  <Ql.editor
    @delta={{this.delta}}
    @focused={{true}}
    @onChange={{this.setDelta}}
    @placeholder="Tell us your story."
    @theme="snow"
  />

  <div>
    Characters: {{Ql.characters}}<br>
    Words: {{Ql.words}}
  </div>
</Quill>
```

Or just use the `<QuillEditor>` component by itself:

```hbs
<QuillEditor
  @delta={{this.delta}}
  @onChange={{this.setDelta}}
  @placeholder="Tell us your story."
  @theme="snow"
/>
```

### Quill Component

The `<Quill>` component is a wrapper component that allows you to create the
editor's toolbar via HTML. It ensures that the editor is wired correctly
to use the HTML toolbar.

In addition, the `<Quill>` component yields the length and number of words
of the editor contents, so that you can display these to the user if
desired.

#### Toolbar

Use the yielded `toolbar` to build your
[editor's toolbar](https://quilljs.com/docs/modules/toolbar/),
for example:

```hbs
<Quill as |Ql|>
  <Ql.toolbar as |Tb|>
    <Tb.bold />
    <Tb.italic />
  </Ql.toolbar>
</Quill>
```

The toolbar yields components for all the toolbar controls supported by
Quill. These are either `<button>` and/or `<select>` elements. The
supported controls are:

| Control | Type |
| --- | --- |
| `align` | `<button>` or `<select>` |
| `background` | `<select>` |
| `blockquote` | `<button>` |
| `bold` | `<button>` |
| `clean` | `<button>` |
| `code-block` | `<button>` |
| `code` | `<button>` |
| `color` | `<select>` |
| `direction` | `<button>` |
| `font` | `<select>` |
| `formula` | `<button>` |
| `header` | `<button>` or `<select>` |
| `image` | `<button>` |
| `indent` | `<button>` |
| `italic` | `<button>` |
| `link` | `<button>` |
| `list` | `<button>` |
| `script` | `<button>` |
| `size` | `<select>` |
| `strike` | `<button>` |
| `underline` | `<button>` |
| `video` | `<button>` |

For `<button>` elements, set the `value` attribute if required. For example,
the `bold` button does not need a `value`, but the `list` button does:

```hbs
<Tb.bold />
<Tb.list value="ordered" />
<Tb.list value="bullet" />
```

For `<select>` elements, provide the list of values using the `@value`
argument with the `{{array}}` helper:

```hbs
<Tb.size @values={{array "small" false "large" "huge"}} />
```

Provide an empty value if you want to use the theme's default values.
For example, the *Snow* theme provides a list of 35 colors for the
`color` and `background` toolbar options. To use the defaults:

```hbs
<Tb.color />
<Tb.background />
```

Some controls, e.g. `header`, work as either `<button>` or `<select>`
elements. For these, you **must** provide a `@values` argument if you
want to use a `<select>`. Otherwise a `<button>` will be used. For example:

```hbs
<!-- Header Buttons -->
<Tb.header value="1" />
<Tb.header value="2" />

<!-- Header Select -->
<Tb.header @values={{array 1 2 3 4}} />

<!-- Header Select with Theme Defaults -->
<Tb.header @values={{array}} />
```

The `group` component allows you to group controls, i.e. add space between
sets of controls. This is done by using a `<span>` with the `ql-formats`
class:

```hbs
<Tb.group>
  <Tb.bold />
  <Tb.italic />
</Tb.group>
<Tb.group>
  <Tb.list value="ordered" />
  <Tb.list value="bullet" />
</Tb.group>
```

#### Editor

Use the yielded `editor` to create the container `<div>` for the Quill Editor.
This is automatically configured with the selector for your HTML toolbar:

```hbs
<Quill as |Ql|>
  <Ql.toolbar>
    <!-- toolbar -->
  </Ql.toolbar>
  <Ql.editor @theme="snow" />
</Quill>
```

The yielded `<Ql.editor>` is an instance of the `<QuillEditor>` component.
This component, along with all of its options,
[is described below.](#quill-editor-component)

#### Values

The `<Quill>` components also yields the following values:

| Value | Description |
| --- | --- |
| `length` | The length of editor content, provided by Quill's `getLength` method. |
| `characters` | The length minus one. |
| `words` | The number of words in the editor content. |

> When the Quill Editor is empty, there is always a blank line representated by
> `\n`. This means Quill's `getLength` method always returns `1` for an empty
> editor. Typically if you want to display the length to users, you would need
> to subtract 1 from the length. This is why we yield both the `length` and
> the `characters` values.

For example, to display the number of words to the user:

```hbs
<Quill as |Ql|>
  <!-- Toolbar and Editor -->

  Words: {{Ql.words}}
</Quill>
```

### Quill Editor Component

The `<QuillEditor>` component can be used by itself if you do not want to
define your toolbar in HTML. All the options described here can also be used
when displaying the editor within the `<Quill>` component.

#### Configuration

The following [Quill configuration](https://quilljs.com/docs/configuration/)
options are supported when initialising Quill:

- `bounds`
- `debug`
- `formats`
- `modules`
- `placeholder`
- `readOnly`
- `scrollingContainer`
- `theme`

For example:

```hbs
<QuillEditor @formats={{array "bold" "italic"}} @theme="snow" />
```

> Quill does not provide a way of changing these values *after* initialisation.
> Therefore, changing these values after the component has been rendered is
> not supported.

#### Enabled

The `<QuillEditor>` component accepts an `@enabled` argument. Changing this
value allows you to toggle whether the editor is enabled or not.

For example:

```hbs
<QuillEditor @enabled={{not this.formIsDisabled}} />
```

> The `{{not}}` helper is provided by the
[Ember Truth Helpers addon.](https://github.com/jmurphyau/ember-truth-helpers)

#### Focused

The `@focused` argument allows you to give the editor focus when it is
rendered. For example:

```hbs
<QuillEditor @focused={{true}} />
```

#### Delta

Use the `@delta` argument to provide the initial value of the editor using
a Quill Delta. This is one-way bound: to subscribe to changes to the
delta, use the `onChange` action:

```hbs
<QuillEditor @delta={{this.delta}} @onChange={{this.setDelta}} />
```

> The value you provide for the `@delta` argument does not need to be a
Quill Delta instance. The editor's `setContents` method that is used to
set the delta does accept the delta JSON.

#### Text

If you want to use plain text to set the initial value of the editor, use
the `@text` argument. This is one-way bound: to subscribe to changes to
the text, use the `onText` action:

```hbs
<QuillEditor @text={{this.text}} @onText={{this.setText}} />
```

> If you provide a value to the `@delta` argument, the `@text` argument
will be ignored.

#### Events

To subscribe to [Quill events](https://quilljs.com/docs/api/#events),
use the following actions:

| Quill Event | Action |
| --- | --- |
| `text-change` | `@onTextChange` |
| `selection-change` | `@onSelectionChange` |
| `editor-change` | `@onEditorChange` |

We also provide the following custom events:

| Action | Description |
| --- | --- |
| `@onChange` | Provides the updated delta for the editor, provided by Quill's `getContents` method. |
| `@onText` | Provides the updated editor text, provided by Quill's `getText` method. |
| `@onLength` | Provides the length of the editor content, provided by Quill's `getLength` method. |
| `@onWords` | Provides the number of words in the editor content. |

> **Warning**: If you are using the `<Quill>` component, the `@onLength` and
`@onWords` actions are already wired up to provide the yielded `length`,
`characters` and `words` values. If you use the `@onLength` or `@onWords`
actions, the yielded values will NOT update.

### Quill Service

If you need to interact with a Quill editor programmatically, you can do this
via the Quill service.

All Quill instances are registered with the service using a name. To interact
with an instance, provide the `@name` argument to the `<QuillEditor>` component,
making sure that the name is unique for each editor you have rendered.

For example:

```hbs
<Quill as |Ql|>
  <!-- Toolbar -->
  <Ql.editor @name="my-editor" />
</Quill>

<QuillEditor @name="other-editor" />
```

Then inject the service, for example:

```js
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class CustomComponent extends Component {
  @service('quill') quillService;

  @action
  resetEditor() {
    this.quillService.setText('my-editor', '');
  }
}
```

The service provides all the following Quill methods. Each takes the name
of the editor instance, followed by the arguments as defined in the
[Quill API documentation.](https://quilljs.com/docs/api/)

- `deleteText`
- `getContents`
- `getLength`
- `insertEmbed`
- `insertText`
- `setContents`
- `setText`
- `updateContents`
- `format`
- `formatLine`
- `formatText`
- `getFormat`
- `removeFormat`
- `getBounds`
- `getSelection`
- `blur`
- `disable`
- `enable`
- `focus`
- `hasFocus`
- `update`

> If you use the `disable` or `enable` methods, the `@enabled` argument
on the `<QuillEditor>` component will get out-of-sync. We recommend using
the `@enabled` argument rather than the methods via the service.

As Quill editor instances are deregistered from the service when the
`<QuillEditor>` component is being destroyed, any methods that return values
will return `null` if the named editor does not exist on the Quill service.

If you need to call multiple methods on a Quill instance, you can use the
service's `instance` method to retrieve the named editor. This will return
`null` if the editor is no longer registered:

```js
const quill = this.quillService.instance('my-editor');

if (quill) {
  // ...
}
```

### Quill Static Methods

To call static Quill methods, import Quill as follows:

```js
import Quill from 'quill';

var Module = Quill.import('core/module');

class CustomModule extends Module {}

Quill.register('modules/custom-module', CustomModule);
```

### Testing

All Quill event handlers are executed via the Ember runloop, to ensure that
you can easily use your Quill components in tests.

Use the `fillIn` test helper with the `.ql-editor` selector:

```js
test('it renders', async function (assert) {
  this.set('delta', {
    ops: [
      { insert: 'This is my story.\n'}
    ],
  });

  await render(hbs`
    <QuillEditor
      @delta={{this.delta}}
      @onChange={{action (mut this.delta)}}
    />
  `);

  assert.dom('.ql-editor').hasText('This is my story.');

  await fillIn('.ql-editor', 'This is my other story.');

  assert.deepEqual(this.delta.ops, [
    { insert: 'This is my other story.\n' },
  ]);
});
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
