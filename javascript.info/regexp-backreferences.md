EN


<!-- -->


We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!



Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregexp-backreferences" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-backreferences" class="share share_fb"></a>


1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/regular-expressions" class="breadcrumbs__link"><span>Regular expressions</span></a></span>

19th May 2020

# Backreferences in pattern: \\N and \\k&lt;name>

We can use the contents of capturing groups `(...)` not only in the result or in the replacement string, but also in the pattern itself.

## <a href="#backreference-by-number-n" id="backreference-by-number-n" class="main__anchor">Backreference by number: \N</a>

A group can be referenced in the pattern using `\N`, where `N` is the group number.

To make clear why that’s helpful, let’s consider a task.

We need to find quoted strings: either single-quoted `'...'` or a double-quoted `"..."` – both variants should match.

How to find them?

We can put both kinds of quotes in the square brackets: `['"](.*?)['"]`, but it would find strings with mixed quotes, like `"...'` and `'..."`. That would lead to incorrect matches when one quote appears inside other ones, like in the string `"She's the one!"`:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = `He said: "She's the one!".`;

    let regexp = /['"](.*?)['"]/g;

    // The result is not what we'd like to have
    alert( str.match(regexp) ); // "She'

As we can see, the pattern found an opening quote `"`, then the text is consumed till the other quote `'`, that closes the match.

To make sure that the pattern looks for the closing quote exactly the same as the opening one, we can wrap it into a capturing group and backreference it: `(['"])(.*?)\1`.

Here’s the correct code:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = `He said: "She's the one!".`;

    let regexp = /(['"])(.*?)\1/g;

    alert( str.match(regexp) ); // "She's the one!"

Now it works! The regular expression engine finds the first quote `(['"])` and memorizes its content. That’s the first capturing group.

Further in the pattern `\1` means “find the same text as in the first group”, exactly the same quote in our case.

Similar to that, `\2` would mean the contents of the second group, `\3` – the 3rd group, and so on.

<span class="important__type">Please note:</span>

If we use `?:` in the group, then we can’t reference it. Groups that are excluded from capturing `(?:...)` are not memorized by the engine.

<span class="important__type">Don’t mess up: in the pattern `\1`, in the replacement: `$1`</span>

In the replacement string we use a dollar sign: `$1`, while in the pattern – a backslash `\1`.

## <a href="#backreference-by-name-k" id="backreference-by-name-k" class="main__anchor">Backreference by name: <code>\k&lt;name&gt;</code></a>

If a regexp has many parentheses, it’s convenient to give them names.

To reference a named group we can use `\k<name>`.

In the example below the group with quotes is named `?<quote>`, so the backreference is `\k<quote>`:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = `He said: "She's the one!".`;

    let regexp = /(?<quote>['"])(.*?)\k<quote>/g;

    alert( str.match(regexp) ); // "She's the one!"

<a href="/regexp-groups" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/regexp-alternation" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregexp-backreferences" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-backreferences" class="share share_fb"></a>

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

## <a href="#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

-   If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
-   If you can't understand something in the article – please elaborate.
-   To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="/tutorial/map" class="map"></a>

#### Chapter

-   <a href="/regular-expressions" class="sidebar__link">Regular expressions</a>

#### Lesson navigation

-   <a href="#backreference-by-number-n" class="sidebar__link">Backreference by number: \N</a>
-   <a href="#backreference-by-name-k" class="sidebar__link">Backreference by name: <code>\k&lt;name&gt;</code></a>

-   <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregexp-backreferences" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-backreferences" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/9-regular-expressions/12-regexp-backreferences" class="sidebar__link">Edit on GitHub</a>

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
