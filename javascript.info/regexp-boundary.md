EN

<!-- -->

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregexp-boundary" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-boundary" class="share share_fb"></a>

1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/regular-expressions" class="breadcrumbs__link"><span>Regular expressions</span></a></span>

7th December 2020

# Word boundary: \\b

A word boundary `\b` is a test, just like `^` and `$`.

When the regexp engine (program module that implements searching for regexps) comes across `\b`, it checks that the position in the string is a word boundary.

There are three different positions that qualify as word boundaries:

- At string start, if the first string character is a word character `\w`.
- Between two characters in the string, where one is a word character `\w` and the other is not.
- At string end, if the last string character is a word character `\w`.

For instance, regexp `\bJava\b` will be found in `Hello, Java!`, where `Java` is a standalone word, but not in `Hello, JavaScript!`.

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( "Hello, Java!".match(/\bJava\b/) ); // Java
    alert( "Hello, JavaScript!".match(/\bJava\b/) ); // null

In the string `Hello, Java!` following positions correspond to `\b`:

<figure><img src="/article/regexp-boundary/hello-java-boundaries.svg" width="245" height="74" /></figure>

So, it matches the pattern `\bHello\b`, because:

1.  At the beginning of the string matches the first test `\b`.
2.  Then matches the word `Hello`.
3.  Then the test `\b` matches again, as we’re between `o` and a comma.

So the pattern `\bHello\b` would match, but not `\bHell\b` (because there’s no word boundary after `l`) and not `Java!\b` (because the exclamation sign is not a wordly character `\w`, so there’s no word boundary after it).

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( "Hello, Java!".match(/\bHello\b/) ); // Hello
    alert( "Hello, Java!".match(/\bJava\b/) );  // Java
    alert( "Hello, Java!".match(/\bHell\b/) );  // null (no match)
    alert( "Hello, Java!".match(/\bJava!\b/) ); // null (no match)

We can use `\b` not only with words, but with digits as well.

For example, the pattern `\b\d\d\b` looks for standalone 2-digit numbers. In other words, it looks for 2-digit numbers that are surrounded by characters different from `\w`, such as spaces or punctuation (or text start/end).

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
    alert( "12,34,56".match(/\b\d\d\b/g) ); // 12,34,56

<span class="important__type">Word boundary `\b` doesn’t work for non-latin alphabets</span>

The word boundary test `\b` checks that there should be `\w` on the one side from the position and "not `\w`" – on the other side.

But `\w` means a latin letter `a-z` (or a digit or an underscore), so the test doesn’t work for other characters, e.g. cyrillic letters or hieroglyphs.

## <a href="#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="#find-the-time" id="find-the-time" class="main__anchor">Find the time</a>

<a href="/task/find-time-hh-mm" class="task__open-link"></a>

The time has a format: `hours:minutes`. Both hours and minutes has two digits, like `09:00`.

Make a regexp to find time in the string: `Breakfast at 09:00 in the room 123:456.`

P.S. In this task there’s no need to check time correctness yet, so `25:99` can also be a valid result.

P.P.S. The regexp shouldn’t match `123:456`.

solution

The answer: `\b\d\d:\d\d\b`.

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( "Breakfast at 09:00 in the room 123:456.".match( /\b\d\d:\d\d\b/ ) ); // 09:00

<a href="/regexp-multiline-mode" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/regexp-escaping" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregexp-boundary" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-boundary" class="share share_fb"></a>

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

## <a href="#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="/tutorial/map" class="map"></a>

#### Chapter

- <a href="/regular-expressions" class="sidebar__link">Regular expressions</a>

- <a href="#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregexp-boundary" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-boundary" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/9-regular-expressions/06-regexp-boundary" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="/about" class="page-footer__link">about the project</a>
- <a href="/about#contact-us" class="page-footer__link">contact us</a>
- <a href="/terms" class="page-footer__link">terms of usage</a>
- <a href="/privacy" class="page-footer__link">privacy policy</a>
