EN


<!-- -->


We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!



Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fcurrying-partials" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcurrying-partials" class="share share_fb"></a>


1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="/js-misc" class="breadcrumbs__link"><span>Miscellaneous</span></a></span>

10th January 2021

# Currying

[Currying](https://en.wikipedia.org/wiki/Currying) is an advanced technique of working with functions. It’s used not only in JavaScript, but in other languages as well.

Currying is a transformation of functions that translates a function from callable as `f(a, b, c)` into callable as `f(a)(b)(c)`.

Currying doesn’t call a function. It just transforms it.

Let’s see an example first, to better understand what we’re talking about, and then practical applications.

We’ll create a helper function `curry(f)` that performs currying for a two-argument `f`. In other words, `curry(f)` for two-argument `f(a, b)` translates it into a function that runs as `f(a)(b)`:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function curry(f) { // curry(f) does the currying transform
      return function(a) {
        return function(b) {
          return f(a, b);
        };
      };
    }

    // usage
    function sum(a, b) {
      return a + b;
    }

    let curriedSum = curry(sum);

    alert( curriedSum(1)(2) ); // 3

As you can see, the implementation is straightforward: it’s just two wrappers.

-   The result of `curry(func)` is a wrapper `function(a)`.
-   When it is called like `curriedSum(1)`, the argument is saved in the Lexical Environment, and a new wrapper is returned `function(b)`.
-   Then this wrapper is called with `2` as an argument, and it passes the call to the original `sum`.

More advanced implementations of currying, such as [\_.curry](https://lodash.com/docs#curry) from lodash library, return a wrapper that allows a function to be called both normally and partially:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function sum(a, b) {
      return a + b;
    }

    let curriedSum = _.curry(sum); // using _.curry from lodash library

    alert( curriedSum(1, 2) ); // 3, still callable normally
    alert( curriedSum(1)(2) ); // 3, called partially

## <a href="#currying-what-for" id="currying-what-for" class="main__anchor">Currying? What for?</a>

To understand the benefits we need a worthy real-life example.

For instance, we have the logging function `log(date, importance, message)` that formats and outputs the information. In real projects such functions have many useful features like sending logs over the network, here we’ll just use `alert`:

    function log(date, importance, message) {
      alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
    }

Let’s curry it!

    log = _.curry(log);

After that `log` works normally:

    log(new Date(), "DEBUG", "some debug"); // log(a, b, c)

…But also works in the curried form:

    log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)

Now we can easily make a convenience function for current logs:

    // logNow will be the partial of log with fixed first argument
    let logNow = log(new Date());

    // use it
    logNow("INFO", "message"); // [HH:mm] INFO message

Now `logNow` is `log` with fixed first argument, in other words “partially applied function” or “partial” for short.

We can go further and make a convenience function for current debug logs:

    let debugNow = logNow("DEBUG");

    debugNow("message"); // [HH:mm] DEBUG message

So:

1.  We didn’t lose anything after currying: `log` is still callable normally.
2.  We can easily generate partial functions such as for today’s logs.

## <a href="#advanced-curry-implementation" id="advanced-curry-implementation" class="main__anchor">Advanced curry implementation</a>

In case you’d like to get in to the details, here’s the “advanced” curry implementation for multi-argument functions that we could use above.

It’s pretty short:

    function curry(func) {

      return function curried(...args) {
        if (args.length >= func.length) {
          return func.apply(this, args);
        } else {
          return function(...args2) {
            return curried.apply(this, args.concat(args2));
          }
        }
      };

    }

Usage examples:

    function sum(a, b, c) {
      return a + b + c;
    }

    let curriedSum = curry(sum);

    alert( curriedSum(1, 2, 3) ); // 6, still callable normally
    alert( curriedSum(1)(2,3) ); // 6, currying of 1st arg
    alert( curriedSum(1)(2)(3) ); // 6, full currying

The new `curry` may look complicated, but it’s actually easy to understand.

The result of `curry(func)` call is the wrapper `curried` that looks like this:

    // func is the function to transform
    function curried(...args) {
      if (args.length >= func.length) { // (1)
        return func.apply(this, args);
      } else {
        return function(...args2) { // (2)
          return curried.apply(this, args.concat(args2));
        }
      }
    };

When we run it, there are two `if` execution branches:

1.  If passed `args` count is the same or more than the original function has in its definition (`func.length`) , then just pass the call to it using `func.apply`.
2.  Otherwise, get a partial: we don’t call `func` just yet. Instead, another wrapper is returned, that will re-apply `curried` providing previous arguments together with the new ones.

Then, if we call it, again, we’ll get either a new partial (if not enough arguments) or, finally, the result.

<span class="important__type">Fixed-length functions only</span>

The currying requires the function to have a fixed number of arguments.

A function that uses rest parameters, such as `f(...args)`, can’t be curried this way.

<span class="important__type">A little more than currying</span>

By definition, currying should convert `sum(a, b, c)` into `sum(a)(b)(c)`.

But most implementations of currying in JavaScript are advanced, as described: they also keep the function callable in the multi-argument variant.

## <a href="#summary" id="summary" class="main__anchor">Summary</a>

*Currying* is a transform that makes `f(a,b,c)` callable as `f(a)(b)(c)`. JavaScript implementations usually both keep the function callable normally and return the partial if the arguments count is not enough.

Currying allows us to easily get partials. As we’ve seen in the logging example, after currying the three argument universal function `log(date, importance, message)` gives us partials when called with one argument (like `log(date)`) or two arguments (like `log(date, importance)`).

<a href="/eval" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/reference-type" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fcurrying-partials" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcurrying-partials" class="share share_fb"></a>

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

## <a href="#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

-   If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
-   If you can't understand something in the article – please elaborate.
-   To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="/tutorial/map" class="map"></a>

#### Chapter

-   <a href="/js-misc" class="sidebar__link">Miscellaneous</a>

#### Lesson navigation

-   <a href="#currying-what-for" class="sidebar__link">Currying? What for?</a>
-   <a href="#advanced-curry-implementation" class="sidebar__link">Advanced curry implementation</a>
-   <a href="#summary" class="sidebar__link">Summary</a>

-   <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fcurrying-partials" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcurrying-partials" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/99-js-misc/03-currying-partials" class="sidebar__link">Edit on GitHub</a>

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
