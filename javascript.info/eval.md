EN

<!-- -->

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Feval" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Feval" class="share share_fb"></a>

1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="/js-misc" class="breadcrumbs__link"><span>Miscellaneous</span></a></span>

25th September 2019

# Eval: run a code string

The built-in `eval` function allows to execute a string of code.

The syntax is:

    let result = eval(code);

For example:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let code = 'alert("Hello")';
    eval(code); // Hello

A string of code may be long, contain line breaks, function declarations, variables and so on.

The result of `eval` is the result of the last statement.

For example:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let value = eval('1+1');
    alert(value); // 2

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let value = eval('let i = 0; ++i');
    alert(value); // 1

The eval’ed code is executed in the current lexical environment, so it can see outer variables:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let a = 1;

    function f() {
      let a = 2;

      eval('alert(a)'); // 2
    }

    f();

It can change outer variables as well:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let x = 5;
    eval("x = 10");
    alert(x); // 10, value modified

In strict mode, `eval` has its own lexical environment. So functions and variables, declared inside eval, are not visible outside:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // reminder: 'use strict' is enabled in runnable examples by default

    eval("let x = 5; function f() {}");

    alert(typeof x); // undefined (no such variable)
    // function f is also not visible

Without `use strict`, `eval` doesn’t have its own lexical environment, so we would see `x` and `f` outside.

## <a href="#using-eval" id="using-eval" class="main__anchor">Using “eval”</a>

In modern programming `eval` is used very sparingly. It’s often said that “eval is evil”.

The reason is simple: long, long time ago JavaScript was a much weaker language, many things could only be done with `eval`. But that time passed a decade ago.

Right now, there’s almost no reason to use `eval`. If someone is using it, there’s a good chance they can replace it with a modern language construct or a [JavaScript Module](/modules).

Please note that its ability to access outer variables has side-effects.

Code minifiers (tools used before JS gets to production, to compress it) rename local variables into shorter ones (like `a`, `b` etc) to make the code smaller. That’s usually safe, but not if `eval` is used, as local variables may be accessed from eval’ed code string. So minifiers don’t do that renaming for all variables potentially visible from `eval`. That negatively affects code compression ratio.

Using outer local variables inside `eval` is also considered a bad programming practice, as it makes maintaining the code more difficult.

There are two ways how to be totally safe from such problems.

**If eval’ed code doesn’t use outer variables, please call `eval` as `window.eval(...)`:**

This way the code is executed in the global scope:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let x = 1;
    {
      let x = 5;
      window.eval('alert(x)'); // 1 (global variable)
    }

**If eval’ed code needs local variables, change `eval` to `new Function` and pass them as arguments:**

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let f = new Function('a', 'alert(a)');

    f(5); // 5

The `new Function` construct is explained in the chapter [The "new Function" syntax](/new-function). It creates a function from a string, also in the global scope. So it can’t see local variables. But it’s so much clearer to pass them explicitly as arguments, like in the example above.

## <a href="#summary" id="summary" class="main__anchor">Summary</a>

A call to `eval(code)` runs the string of code and returns the result of the last statement.

- Rarely used in modern JavaScript, as there’s usually no need.
- Can access outer local variables. That’s considered bad practice.
- Instead, to `eval` the code in the global scope, use `window.eval(code)`.
- Or, if your code needs some data from the outer scope, use `new Function` and pass it as arguments.

## <a href="#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="#eval-calculator" id="eval-calculator" class="main__anchor">Eval-calculator</a>

<a href="/task/eval-calculator" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Create a calculator that prompts for an arithmetic expression and returns its result.

There’s no need to check the expression for correctness in this task. Just evaluate and return the result.

[Run the demo](#)

solution

Let’s use `eval` to calculate the maths expression:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let expr = prompt("Type an arithmetic expression?", '2*3+2');

    alert( eval(expr) );

The user can input any text or code though.

To make things safe, and limit it to arithmetics only, we can check the `expr` using a [regular expression](/regular-expressions), so that it only may contain digits and operators.

<a href="/proxy" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/currying-partials" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Feval" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Feval" class="share share_fb"></a>

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

## <a href="#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="/tutorial/map" class="map"></a>

#### Chapter

- <a href="/js-misc" class="sidebar__link">Miscellaneous</a>

#### Lesson navigation

- <a href="#using-eval" class="sidebar__link">Using “eval”</a>
- <a href="#summary" class="sidebar__link">Summary</a>

- <a href="#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Feval" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Feval" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/99-js-misc/02-eval" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="/about" class="page-footer__link">about the project</a>
- <a href="/about#contact-us" class="page-footer__link">contact us</a>
- <a href="/terms" class="page-footer__link">terms of usage</a>
- <a href="/privacy" class="page-footer__link">privacy policy</a>
