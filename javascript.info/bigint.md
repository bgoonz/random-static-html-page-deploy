EN

<!-- -->

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fbigint" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fbigint" class="share share_fb"></a>

1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="/js-misc" class="breadcrumbs__link"><span>Miscellaneous</span></a></span>

21st September 2020

# BigInt

<span class="important__type">A recent addition</span>

This is a recent addition to the language. You can find the current state of support at <https://caniuse.com/#feat=bigint>.

`BigInt` is a special numeric type that provides support for integers of arbitrary length.

A bigint is created by appending `n` to the end of an integer literal or by calling the function `BigInt` that creates bigints from strings, numbers etc.

    const bigint = 1234567890123456789012345678901234567890n;

    const sameBigint = BigInt("1234567890123456789012345678901234567890");

    const bigintFromNumber = BigInt(10); // same as 10n

## <a href="#math-operators" id="math-operators" class="main__anchor">Math operators</a>

`BigInt` can mostly be used like a regular number, for example:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert(1n + 2n); // 3

    alert(5n / 2n); // 2

Please note: the division `5/2` returns the result rounded towards zero, without the decimal part. All operations on bigints return bigints.

We can’t mix bigints and regular numbers:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert(1n + 2); // Error: Cannot mix BigInt and other types

We should explicitly convert them if needed: using either `BigInt()` or `Number()`, like this:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let bigint = 1n;
    let number = 2;

    // number to bigint
    alert(bigint + BigInt(number)); // 3

    // bigint to number
    alert(Number(bigint) + number); // 3

The conversion operations are always silent, never give errors, but if the bigint is too huge and won’t fit the number type, then extra bits will be cut off, so we should be careful doing such conversion.

<span class="important__type">The unary plus is not supported on bigints</span>

The unary plus operator `+value` is a well-known way to convert `value` to a number.

In order to avoid confusion, it’s not supported on bigints:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let bigint = 1n;

    alert( +bigint ); // error

So we should use `Number()` to convert a bigint to a number.

## <a href="#comparisons" id="comparisons" class="main__anchor">Comparisons</a>

Comparisons, such as `<`, `>` work with bigints and numbers just fine:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( 2n > 1n ); // true

    alert( 2n > 1 ); // true

Please note though, as numbers and bigints belong to different types, they can be equal `==`, but not strictly equal `===`:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( 1 == 1n ); // true

    alert( 1 === 1n ); // false

## <a href="#boolean-operations" id="boolean-operations" class="main__anchor">Boolean operations</a>

When inside `if` or other boolean operations, bigints behave like numbers.

For instance, in `if`, bigint `0n` is falsy, other values are truthy:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    if (0n) {
      // never executes
    }

Boolean operators, such as `||`, `&&` and others also work with bigints similar to numbers:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( 1n || 2 ); // 1 (1n is considered truthy)

    alert( 0n || 2 ); // 2 (0n is considered falsy)

## <a href="#polyfills" id="polyfills" class="main__anchor">Polyfills</a>

Polyfilling bigints is tricky. The reason is that many JavaScript operators, such as `+`, `-` and so on behave differently with bigints compared to regular numbers.

For example, division of bigints always returns a bigint (rounded if necessary).

To emulate such behavior, a polyfill would need to analyze the code and replace all such operators with its functions. But doing so is cumbersome and would cost a lot of performance.

So, there’s no well-known good polyfill.

Although, the other way around is proposed by the developers of [JSBI](https://github.com/GoogleChromeLabs/jsbi) library.

This library implements big numbers using its own methods. We can use them instead of native bigints:

<table><thead><tr class="header"><th>Operation</th><th>native <code>BigInt</code></th><th>JSBI</th></tr></thead><tbody><tr class="odd"><td>Creation from Number</td><td><code>a = BigInt(789)</code></td><td><code>a = JSBI.BigInt(789)</code></td></tr><tr class="even"><td>Addition</td><td><code>c = a + b</code></td><td><code>c = JSBI.add(a, b)</code></td></tr><tr class="odd"><td>Subtraction</td><td><code>c = a - b</code></td><td><code>c = JSBI.subtract(a, b)</code></td></tr><tr class="even"><td>…</td><td>…</td><td>…</td></tr></tbody></table>

…And then use the polyfill (Babel plugin) to convert JSBI calls to native bigints for those browsers that support them.

In other words, this approach suggests that we write code in JSBI instead of native bigints. But JSBI works with numbers as with bigints internally, emulates them closely following the specification, so the code will be “bigint-ready”.

We can use such JSBI code “as is” for engines that don’t support bigints and for those that do support – the polyfill will convert the calls to native bigints.

## <a href="#references" id="references" class="main__anchor">References</a>

- [MDN docs on BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).
- [Specification](https://tc39.es/ecma262/#sec-bigint-objects).

<a href="/reference-type" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/ui" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fbigint" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fbigint" class="share share_fb"></a>

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

- <a href="#math-operators" class="sidebar__link">Math operators</a>
- <a href="#comparisons" class="sidebar__link">Comparisons</a>
- <a href="#boolean-operations" class="sidebar__link">Boolean operations</a>
- <a href="#polyfills" class="sidebar__link">Polyfills</a>
- <a href="#references" class="sidebar__link">References</a>

- <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fbigint" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fbigint" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/99-js-misc/05-bigint" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="/about" class="page-footer__link">about the project</a>
- <a href="/about#contact-us" class="page-footer__link">contact us</a>
- <a href="/terms" class="page-footer__link">terms of usage</a>
- <a href="/privacy" class="page-footer__link">privacy policy</a>
