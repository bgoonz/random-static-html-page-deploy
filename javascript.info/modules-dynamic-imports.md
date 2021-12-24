EN

<!-- -->

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fmodules-dynamic-imports" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmodules-dynamic-imports" class="share share_fb"></a>

1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="/modules" class="breadcrumbs__link"><span>Modules</span></a></span>

8th February 2020

# Dynamic imports

Export and import statements that we covered in previous chapters are called “static”. The syntax is very simple and strict.

First, we can’t dynamically generate any parameters of `import`.

The module path must be a primitive string, can’t be a function call. This won’t work:

    import ... from getModuleName(); // Error, only from "string" is allowed

Second, we can’t import conditionally or at run-time:

    if(...) {
      import ...; // Error, not allowed!
    }

    {
      import ...; // Error, we can't put import in any block
    }

That’s because `import`/`export` aim to provide a backbone for the code structure. That’s a good thing, as code structure can be analyzed, modules can be gathered and bundled into one file by special tools, unused exports can be removed (“tree-shaken”). That’s possible only because the structure of imports/exports is simple and fixed.

But how can we import a module dynamically, on-demand?

## <a href="#the-import-expression" id="the-import-expression" class="main__anchor">The import() expression</a>

The `import(module)` expression loads the module and returns a promise that resolves into a module object that contains all its exports. It can be called from any place in the code.

We can use it dynamically in any place of the code, for instance:

    let modulePath = prompt("Which module to load?");

    import(modulePath)
      .then(obj => <module object>)
      .catch(err => <loading error, e.g. if no such module>)

Or, we could use `let module = await import(modulePath)` if inside an async function.

For instance, if we have the following module `say.js`:

    // 📁 say.js
    export function hi() {
      alert(`Hello`);
    }

    export function bye() {
      alert(`Bye`);
    }

…Then dynamic import can be like this:

    let {hi, bye} = await import('./say.js');

    hi();
    bye();

Or, if `say.js` has the default export:

    // 📁 say.js
    export default function() {
      alert("Module loaded (export default)!");
    }

…Then, in order to access it, we can use `default` property of the module object:

    let obj = await import('./say.js');
    let say = obj.default;
    // or, in one line: let {default: say} = await import('./say.js');

    say();

Here’s the full example:

Result

say.js

index.html

<a href="/article/modules-dynamic-imports/say/" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/QF12tn1vwxvDT1Qw?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    export function hi() {
      alert(`Hello`);
    }

    export function bye() {
      alert(`Bye`);
    }

    export default function() {
      alert("Module loaded (export default)!");
    }

    <!doctype html>
    <script>
      async function load() {
        let say = await import('./say.js');
        say.hi(); // Hello!
        say.bye(); // Bye!
        say.default(); // Module loaded (export default)!
      }
    </script>
    <button onclick="load()">Click me</button>

<span class="important__type">Please note:</span>

Dynamic imports work in regular scripts, they don’t require `script type="module"`.

<span class="important__type">Please note:</span>

Although `import()` looks like a function call, it’s a special syntax that just happens to use parentheses (similar to `super()`).

So we can’t copy `import` to a variable or use `call/apply` with it. It’s not a function.

<a href="/import-export" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/js-misc" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fmodules-dynamic-imports" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmodules-dynamic-imports" class="share share_fb"></a>

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

## <a href="#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="/tutorial/map" class="map"></a>

#### Chapter

- <a href="/modules" class="sidebar__link">Modules</a>

#### Lesson navigation

- <a href="#the-import-expression" class="sidebar__link">The import() expression</a>

- <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fmodules-dynamic-imports" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmodules-dynamic-imports" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/13-modules/03-modules-dynamic-imports" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="/about" class="page-footer__link">about the project</a>
- <a href="/about#contact-us" class="page-footer__link">contact us</a>
- <a href="/terms" class="page-footer__link">terms of usage</a>
- <a href="/privacy" class="page-footer__link">privacy policy</a>
