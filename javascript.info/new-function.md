EN

<!-- -->

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fnew-function" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fnew-function" class="share share_fb"></a>

1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="/advanced-functions" class="breadcrumbs__link"><span>Advanced working with functions</span></a></span>

22nd October 2020

# The "new Function" syntax

There’s one more way to create a function. It’s rarely used, but sometimes there’s no alternative.

## <a href="#syntax" id="syntax" class="main__anchor">Syntax</a>

The syntax for creating a function:

    let func = new Function ([arg1, arg2, ...argN], functionBody);

The function is created with the arguments `arg1...argN` and the given `functionBody`.

It’s easier to understand by looking at an example. Here’s a function with two arguments:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let sum = new Function('a', 'b', 'return a + b');

    alert( sum(1, 2) ); // 3

And here there’s a function without arguments, with only the function body:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let sayHi = new Function('alert("Hello")');

    sayHi(); // Hello

The major difference from other ways we’ve seen is that the function is created literally from a string, that is passed at run time.

All previous declarations required us, programmers, to write the function code in the script.

But `new Function` allows to turn any string into a function. For example, we can receive a new function from a server and then execute it:

    let str = ... receive the code from a server dynamically ...

    let func = new Function(str);
    func();

It is used in very specific cases, like when we receive code from a server, or to dynamically compile a function from a template, in complex web-applications.

## <a href="#closure" id="closure" class="main__anchor">Closure</a>

Usually, a function remembers where it was born in the special property `[[Environment]]`. It references the Lexical Environment from where it’s created (we covered that in the chapter [Variable scope, closure](/closure)).

But when a function is created using `new Function`, its `[[Environment]]` is set to reference not the current Lexical Environment, but the global one.

So, such function doesn’t have access to outer variables, only to the global ones.

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function getFunc() {
      let value = "test";

      let func = new Function('alert(value)');

      return func;
    }

    getFunc()(); // error: value is not defined

Compare it with the regular behavior:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function getFunc() {
      let value = "test";

      let func = function() { alert(value); };

      return func;
    }

    getFunc()(); // "test", from the Lexical Environment of getFunc

This special feature of `new Function` looks strange, but appears very useful in practice.

Imagine that we must create a function from a string. The code of that function is not known at the time of writing the script (that’s why we don’t use regular functions), but will be known in the process of execution. We may receive it from the server or from another source.

Our new function needs to interact with the main script.

What if it could access the outer variables?

The problem is that before JavaScript is published to production, it’s compressed using a _minifier_ – a special program that shrinks code by removing extra comments, spaces and – what’s important, renames local variables into shorter ones.

For instance, if a function has `let userName`, minifier replaces it with `let a` (or another letter if this one is occupied), and does it everywhere. That’s usually a safe thing to do, because the variable is local, nothing outside the function can access it. And inside the function, minifier replaces every mention of it. Minifiers are smart, they analyze the code structure, so they don’t break anything. They’re not just a dumb find-and-replace.

So if `new Function` had access to outer variables, it would be unable to find renamed `userName`.

**If `new Function` had access to outer variables, it would have problems with minifiers.**

Besides, such code would be architecturally bad and prone to errors.

To pass something to a function, created as `new Function`, we should use its arguments.

## <a href="#summary" id="summary" class="main__anchor">Summary</a>

The syntax:

    let func = new Function ([arg1, arg2, ...argN], functionBody);

For historical reasons, arguments can also be given as a comma-separated list.

These three declarations mean the same:

    new Function('a', 'b', 'return a + b'); // basic syntax
    new Function('a,b', 'return a + b'); // comma-separated
    new Function('a , b', 'return a + b'); // comma-separated with spaces

Functions created with `new Function`, have `[[Environment]]` referencing the global Lexical Environment, not the outer one. Hence, they cannot use outer variables. But that’s actually good, because it insures us from errors. Passing parameters explicitly is a much better method architecturally and causes no problems with minifiers.

<a href="/function-object" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/settimeout-setinterval" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fnew-function" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fnew-function" class="share share_fb"></a>

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

## <a href="#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="/tutorial/map" class="map"></a>

#### Chapter

- <a href="/advanced-functions" class="sidebar__link">Advanced working with functions</a>

#### Lesson navigation

- <a href="#syntax" class="sidebar__link">Syntax</a>
- <a href="#closure" class="sidebar__link">Closure</a>
- <a href="#summary" class="sidebar__link">Summary</a>

- <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fnew-function" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fnew-function" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/06-advanced-functions/07-new-function" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="/about" class="page-footer__link">about the project</a>
- <a href="/about#contact-us" class="page-footer__link">contact us</a>
- <a href="/terms" class="page-footer__link">terms of usage</a>
- <a href="/privacy" class="page-footer__link">privacy policy</a>
