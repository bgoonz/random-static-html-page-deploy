EN


<!-- -->


We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!



Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fshadow-dom-style" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fshadow-dom-style" class="share share_fb"></a>


1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/web-components" class="breadcrumbs__link"><span>Web components</span></a></span>

17th May 2021

# Shadow DOM styling

Shadow DOM may include both `<style>` and `<link rel="stylesheet" href="…">` tags. In the latter case, stylesheets are HTTP-cached, so they are not redownloaded for multiple components that use same template.

As a general rule, local styles work only inside the shadow tree, and document styles work outside of it. But there are few exceptions.

## <a href="#host" id="host" class="main__anchor">:host</a>

The `:host` selector allows to select the shadow host (the element containing the shadow tree).

For instance, we’re making `<custom-dialog>` element that should be centered. For that we need to style the `<custom-dialog>` element itself.

That’s exactly what `:host` does:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <template id="tmpl">
      <style>
        /* the style will be applied from inside to the custom-dialog element */
        :host {
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: inline-block;
          border: 1px solid red;
          padding: 10px;
        }
      </style>
      <slot></slot>
    </template>

    <script>
    customElements.define('custom-dialog', class extends HTMLElement {
      connectedCallback() {
        this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
      }
    });
    </script>

    <custom-dialog>
      Hello!
    </custom-dialog>

## <a href="#cascading" id="cascading" class="main__anchor">Cascading</a>

The shadow host (`<custom-dialog>` itself) resides in the light DOM, so it’s affected by document CSS rules.

If there’s a property styled both in `:host` locally, and in the document, then the document style takes precedence.

For instance, if in the document we had:

    <style>
    custom-dialog {
      padding: 0;
    }
    </style>

…Then the `<custom-dialog>` would be without padding.

It’s very convenient, as we can setup “default” component styles in its `:host` rule, and then easily override them in the document.

The exception is when a local property is labelled `!important`, for such properties, local styles take precedence.

## <a href="#host-selector" id="host-selector" class="main__anchor">:host(selector)</a>

Same as `:host`, but applied only if the shadow host matches the `selector`.

For example, we’d like to center the `<custom-dialog>` only if it has `centered` attribute:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <template id="tmpl">
      <style>
        :host([centered]) {
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-color: blue;
        }

        :host {
          display: inline-block;
          border: 1px solid red;
          padding: 10px;
        }
      </style>
      <slot></slot>
    </template>

    <script>
    customElements.define('custom-dialog', class extends HTMLElement {
      connectedCallback() {
        this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
      }
    });
    </script>


    <custom-dialog centered>
      Centered!
    </custom-dialog>

    <custom-dialog>
      Not centered.
    </custom-dialog>

Now the additional centering styles are only applied to the first dialog: `<custom-dialog centered>`.

To summarize, we can use `:host`-family of selectors to style the main element of the component. These styles (unless `!important`) can be overridden by the document.

## <a href="#styling-slotted-content" id="styling-slotted-content" class="main__anchor">Styling slotted content</a>

Now let’s consider the situation with slots.

Slotted elements come from light DOM, so they use document styles. Local styles do not affect slotted content.

In the example below, slotted `<span>` is bold, as per document style, but does not take `background` from the local style:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <style>
      span { font-weight: bold }
    </style>

    <user-card>
      <div slot="username"><span>John Smith</span></div>
    </user-card>

    <script>
    customElements.define('user-card', class extends HTMLElement {
      connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
          <style>
          span { background: red; }
          </style>
          Name: <slot name="username"></slot>
        `;
      }
    });
    </script>

The result is bold, but not red.

If we’d like to style slotted elements in our component, there are two choices.

First, we can style the `<slot>` itself and rely on CSS inheritance:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <user-card>
      <div slot="username"><span>John Smith</span></div>
    </user-card>

    <script>
    customElements.define('user-card', class extends HTMLElement {
      connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
          <style>
          slot[name="username"] { font-weight: bold; }
          </style>
          Name: <slot name="username"></slot>
        `;
      }
    });
    </script>

Here `<p>John Smith</p>` becomes bold, because CSS inheritance is in effect between the `<slot>` and its contents. But in CSS itself not all properties are inherited.

Another option is to use `::slotted(selector)` pseudo-class. It matches elements based on two conditions:

1.  That’s a slotted element, that comes from the light DOM. Slot name doesn’t matter. Just any slotted element, but only the element itself, not its children.
2.  The element matches the `selector`.

In our example, `::slotted(div)` selects exactly `<div slot="username">`, but not its children:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <user-card>
      <div slot="username">
        <div>John Smith</div>
      </div>
    </user-card>

    <script>
    customElements.define('user-card', class extends HTMLElement {
      connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
          <style>
          ::slotted(div) { border: 1px solid red; }
          </style>
          Name: <slot name="username"></slot>
        `;
      }
    });
    </script>

Please note, `::slotted` selector can’t descend any further into the slot. These selectors are invalid:

    ::slotted(div span) {
      /* our slotted <div> does not match this */
    }

    ::slotted(div) p {
      /* can't go inside light DOM */
    }

Also, `::slotted` can only be used in CSS. We can’t use it in `querySelector`.

## <a href="#css-hooks-with-custom-properties" id="css-hooks-with-custom-properties" class="main__anchor">CSS hooks with custom properties</a>

How do we style internal elements of a component from the main document?

Selectors like `:host` apply rules to `<custom-dialog>` element or `<user-card>`, but how to style shadow DOM elements inside them?

There’s no selector that can directly affect shadow DOM styles from the document. But just as we expose methods to interact with our component, we can expose CSS variables (custom CSS properties) to style it.

**Custom CSS properties exist on all levels, both in light and shadow.**

For example, in shadow DOM we can use `--user-card-field-color` CSS variable to style fields, and the outer document can set its value:

    <style>
      .field {
        color: var(--user-card-field-color, black);
        /* if --user-card-field-color is not defined, use black color */
      }
    </style>
    <div class="field">Name: <slot name="username"></slot></div>
    <div class="field">Birthday: <slot name="birthday"></slot></div>

Then, we can declare this property in the outer document for `<user-card>`:

    user-card {
      --user-card-field-color: green;
    }

Custom CSS properties pierce through shadow DOM, they are visible everywhere, so the inner `.field` rule will make use of it.

Here’s the full example:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <style>
      user-card {
        --user-card-field-color: green;
      }
    </style>

    <template id="tmpl">
      <style>
        .field {
          color: var(--user-card-field-color, black);
        }
      </style>
      <div class="field">Name: <slot name="username"></slot></div>
      <div class="field">Birthday: <slot name="birthday"></slot></div>
    </template>

    <script>
    customElements.define('user-card', class extends HTMLElement {
      connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.shadowRoot.append(document.getElementById('tmpl').content.cloneNode(true));
      }
    });
    </script>

    <user-card>
      <span slot="username">John Smith</span>
      <span slot="birthday">01.01.2001</span>
    </user-card>

## <a href="#summary" id="summary" class="main__anchor">Summary</a>

Shadow DOM can include styles, such as `<style>` or `<link rel="stylesheet">`.

Local styles can affect:

-   shadow tree,
-   shadow host with `:host` and `:host()` pseudoclasses,
-   slotted elements (coming from light DOM), `::slotted(selector)` allows to select slotted elements themselves, but not their children.

Document styles can affect:

-   shadow host (as it lives in the outer document)
-   slotted elements and their contents (as that’s also in the outer document)

When CSS properties conflict, normally document styles have precedence, unless the property is labelled as `!important`. Then local styles have precedence.

CSS custom properties pierce through shadow DOM. They are used as “hooks” to style the component:

1.  The component uses a custom CSS property to style key elements, such as `var(--component-name-title, <default value>)`.
2.  Component author publishes these properties for developers, they are same important as other public component methods.
3.  When a developer wants to style a title, they assign `--component-name-title` CSS property for the shadow host or above.
4.  Profit!

<a href="/slots-composition" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/shadow-dom-events" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fshadow-dom-style" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fshadow-dom-style" class="share share_fb"></a>

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

## <a href="#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

-   If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
-   If you can't understand something in the article – please elaborate.
-   To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="/tutorial/map" class="map"></a>

#### Chapter

-   <a href="/web-components" class="sidebar__link">Web components</a>

#### Lesson navigation

-   <a href="#host" class="sidebar__link">:host</a>
-   <a href="#cascading" class="sidebar__link">Cascading</a>
-   <a href="#host-selector" class="sidebar__link">:host(selector)</a>
-   <a href="#styling-slotted-content" class="sidebar__link">Styling slotted content</a>
-   <a href="#css-hooks-with-custom-properties" class="sidebar__link">CSS hooks with custom properties</a>
-   <a href="#summary" class="sidebar__link">Summary</a>

-   <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fshadow-dom-style" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fshadow-dom-style" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/8-web-components/6-shadow-dom-style" class="sidebar__link">Edit on GitHub</a>

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
