EN


<!-- -->


We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!



Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregexp-catastrophic-backtracking" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-catastrophic-backtracking" class="share share_fb"></a>


1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/regular-expressions" class="breadcrumbs__link"><span>Regular expressions</span></a></span>

15th May 2021

# Catastrophic backtracking

Some regular expressions are looking simple, but can execute a veeeeeery long time, and even “hang” the JavaScript engine.

Sooner or later most developers occasionally face such behavior. The typical symptom – a regular expression works fine sometimes, but for certain strings it “hangs”, consuming 100% of CPU.

In such case a web-browser suggests to kill the script and reload the page. Not a good thing for sure.

For server-side JavaScript such a regexp may hang the server process, that’s even worse. So we definitely should take a look at it.

## <a href="#example" id="example" class="main__anchor">Example</a>

Let’s say we have a string, and we’d like to check if it consists of words `\w+` with an optional space `\s?` after each.

An obvious way to construct a regexp would be to take a word followed by an optional space `\w+\s?` and then repeat it with `*`.

That leads us to the regexp `^(\w+\s?)*$`, it specifies zero or more such words, that start at the beginning `^` and finish at the end `$` of the line.

In action:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /^(\w+\s?)*$/;

    alert( regexp.test("A good string") ); // true
    alert( regexp.test("Bad characters: $@#") ); // false

The regexp seems to work. The result is correct. Although, on certain strings it takes a lot of time. So long that JavaScript engine “hangs” with 100% CPU consumption.

If you run the example below, you probably won’t see anything, as JavaScript will just “hang”. A web-browser will stop reacting on events, the UI will stop working (most browsers allow only scrolling). After some time it will suggest to reload the page. So be careful with this:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /^(\w+\s?)*$/;
    let str = "An input string that takes a long time or even makes this regexp hang!";

    // will take a very long time
    alert( regexp.test(str) );

To be fair, let’s note that some regular expression engines can handle such a search effectively, for example V8 engine version starting from 8.8 can do that (so Google Chrome 88 doesn’t hang here), while Firefox browser does hang.

## <a href="#simplified-example" id="simplified-example" class="main__anchor">Simplified example</a>

What’s the matter? Why does the regular expression hang?

To understand that, let’s simplify the example: remove spaces `\s?`. Then it becomes `^(\w+)*$`.

And, to make things more obvious, let’s replace `\w` with `\d`. The resulting regular expression still hangs, for instance:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /^(\d+)*$/;

    let str = "012345678901234567890123456789z";

    // will take a very long time (careful!)
    alert( regexp.test(str) );

So what’s wrong with the regexp?

First, one may notice that the regexp `(\d+)*` is a little bit strange. The quantifier `*` looks extraneous. If we want a number, we can use `\d+`.

Indeed, the regexp is artificial; we got it by simplifying the previous example. But the reason why it is slow is the same. So let’s understand it, and then the previous example will become obvious.

What happens during the search of `^(\d+)*$` in the line `123456789z` (shortened a bit for clarity, please note a non-digit character `z` at the end, it’s important), why does it take so long?

Here’s what the regexp engine does:

1.  First, the regexp engine tries to find the content of the parentheses: the number `\d+`. The plus `+` is greedy by default, so it consumes all digits:

        \d+.......
        (123456789)z

    After all digits are consumed, `\d+` is considered found (as `123456789`).

    Then the star quantifier `(\d+)*` applies. But there are no more digits in the text, so the star doesn’t give anything.

    The next character in the pattern is the string end `$`. But in the text we have `z` instead, so there’s no match:

                   X
        \d+........$
        (123456789)z

2.  As there’s no match, the greedy quantifier `+` decreases the count of repetitions, backtracks one character back.

    Now `\d+` takes all digits except the last one (`12345678`):

        \d+.......
        (12345678)9z

3.  Then the engine tries to continue the search from the next position (right after `12345678`).

    The star `(\d+)*` can be applied – it gives one more match of `\d+`, the number `9`:

        \d+.......\d+
        (12345678)(9)z

    The engine tries to match `$` again, but fails, because it meets `z` instead:

                     X
        \d+.......\d+
        (12345678)(9)z

4.  There’s no match, so the engine will continue backtracking, decreasing the number of repetitions. Backtracking generally works like this: the last greedy quantifier decreases the number of repetitions until it reaches the minimum. Then the previous greedy quantifier decreases, and so on.

    All possible combinations are attempted. Here are their examples.

    The first number `\d+` has 7 digits, and then a number of 2 digits:

                     X
        \d+......\d+
        (1234567)(89)z

    The first number has 7 digits, and then two numbers of 1 digit each:

                       X
        \d+......\d+\d+
        (1234567)(8)(9)z

    The first number has 6 digits, and then a number of 3 digits:

                     X
        \d+.......\d+
        (123456)(789)z

    The first number has 6 digits, and then 2 numbers:

                       X
        \d+.....\d+ \d+
        (123456)(78)(9)z

    …And so on.

There are many ways to split a sequence of digits `123456789` into numbers. To be precise, there are `2n-1`, where `n` is the length of the sequence.

-   For `123456789` we have `n=9`, that gives 511 combinations.
-   For a longer sequence with `n=20` there are about one million (1048575) combinations.
-   For `n=30` – a thousand times more (1073741823 combinations).

Trying each of them is exactly the reason why the search takes so long.

## <a href="#back-to-words-and-strings" id="back-to-words-and-strings" class="main__anchor">Back to words and strings</a>

The similar thing happens in our first example, when we look for words by pattern `^(\w+\s?)*$` in the string `An input that hangs!`.

The reason is that a word can be represented as one `\w+` or many:

    (input)
    (inpu)(t)
    (inp)(u)(t)
    (in)(p)(ut)
    ...

For a human, it’s obvious that there may be no match, because the string ends with an exclamation sign `!`, but the regular expression expects a wordly character `\w` or a space `\s` at the end. But the engine doesn’t know that.

It tries all combinations of how the regexp `(\w+\s?)*` can “consume” the string, including variants with spaces `(\w+\s)*` and without them `(\w+)*` (because spaces `\s?` are optional). As there are many such combinations (we’ve seen it with digits), the search takes a lot of time.

What to do?

Should we turn on the lazy mode?

Unfortunately, that won’t help: if we replace `\w+` with `\w+?`, the regexp will still hang. The order of combinations will change, but not their total count.

Some regular expression engines have tricky tests and finite automations that allow to avoid going through all combinations or make it much faster, but most engines don’t, and it doesn’t always help.

## <a href="#how-to-fix" id="how-to-fix" class="main__anchor">How to fix?</a>

There are two main approaches to fixing the problem.

The first is to lower the number of possible combinations.

Let’s make the space non-optional by rewriting the regular expression as `^(\w+\s)*\w*$` – we’ll look for any number of words followed by a space `(\w+\s)*`, and then (optionally) a final word `\w*`.

This regexp is equivalent to the previous one (matches the same) and works well:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /^(\w+\s)*\w*$/;
    let str = "An input string that takes a long time or even makes this regex hang!";

    alert( regexp.test(str) ); // false

Why did the problem disappear?

That’s because now the space is mandatory.

The previous regexp, if we omit the space, becomes `(\w+)*`, leading to many combinations of `\w+` within a single word

So `input` could be matched as two repetitions of `\w+`, like this:

    \w+  \w+
    (inp)(ut)

The new pattern is different: `(\w+\s)*` specifies repetitions of words followed by a space! The `input` string can’t be matched as two repetitions of `\w+\s`, because the space is mandatory.

The time needed to try a lot of (actually most of) combinations is now saved.

## <a href="#preventing-backtracking" id="preventing-backtracking" class="main__anchor">Preventing backtracking</a>

It’s not always convenient to rewrite a regexp though. In the example above it was easy, but it’s not always obvious how to do it.

Besides, a rewritten regexp is usually more complex, and that’s not good. Regexps are complex enough without extra efforts.

Luckily, there’s an alternative approach. We can forbid backtracking for the quantifier.

The root of the problem is that the regexp engine tries many combinations that are obviously wrong for a human.

E.g. in the regexp `(\d+)*$` it’s obvious for a human, that `+` shouldn’t backtrack. If we replace one `\d+` with two separate `\d+\d+`, nothing changes:

    \d+........
    (123456789)!

    \d+...\d+....
    (1234)(56789)!

And in the original example `^(\w+\s?)*$` we may want to forbid backtracking in `\w+`. That is: `\w+` should match a whole word, with the maximal possible length. There’s no need to lower the repetitions count in `\w+` or to split it into two words `\w+\w+` and so on.

Modern regular expression engines support possessive quantifiers for that. Regular quantifiers become possessive if we add `+` after them. That is, we use `\d++` instead of `\d+` to stop `+` from backtracking.

Possessive quantifiers are in fact simpler than “regular” ones. They just match as many as they can, without any backtracking. The search process without backtracking is simpler.

There are also so-called “atomic capturing groups” – a way to disable backtracking inside parentheses.

…But the bad news is that, unfortunately, in JavaScript they are not supported.

We can emulate them though using a “lookahead transform”.

### <a href="#lookahead-to-the-rescue" id="lookahead-to-the-rescue" class="main__anchor">Lookahead to the rescue!</a>

So we’ve come to real advanced topics. We’d like a quantifier, such as `+` not to backtrack, because sometimes backtracking makes no sense.

The pattern to take as many repetitions of `\w` as possible without backtracking is: `(?=(\w+))\1`. Of course, we could take another pattern instead of `\w`.

That may seem odd, but it’s actually a very simple transform.

Let’s decipher it:

-   Lookahead `?=` looks forward for the longest word `\w+` starting at the current position.
-   The contents of parentheses with `?=...` isn’t memorized by the engine, so wrap `\w+` into parentheses. Then the engine will memorize their contents
-   …And allow us to reference it in the pattern as `\1`.

That is: we look ahead – and if there’s a word `\w+`, then match it as `\1`.

Why? That’s because the lookahead finds a word `\w+` as a whole and we capture it into the pattern with `\1`. So we essentially implemented a possessive plus `+` quantifier. It captures only the whole word `\w+`, not a part of it.

For instance, in the word `JavaScript` it may not only match `Java`, but leave out `Script` to match the rest of the pattern.

Here’s the comparison of two patterns:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( "JavaScript".match(/\w+Script/)); // JavaScript
    alert( "JavaScript".match(/(?=(\w+))\1Script/)); // null

1.  In the first variant `\w+` first captures the whole word `JavaScript` but then `+` backtracks character by character, to try to match the rest of the pattern, until it finally succeeds (when `\w+` matches `Java`).
2.  In the second variant `(?=(\w+))` looks ahead and finds the word `JavaScript`, that is included into the pattern as a whole by `\1`, so there remains no way to find `Script` after it.

We can put a more complex regular expression into `(?=(\w+))\1` instead of `\w`, when we need to forbid backtracking for `+` after it.

<span class="important__type">Please note:</span>

There’s more about the relation between possessive quantifiers and lookahead in articles [Regex: Emulate Atomic Grouping (and Possessive Quantifiers) with LookAhead](http://instanceof.me/post/52245507631/regex-emulate-atomic-grouping-with-lookahead) and [Mimicking Atomic Groups](http://blog.stevenlevithan.com/archives/mimic-atomic-groups).

Let’s rewrite the first example using lookahead to prevent backtracking:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /^((?=(\w+))\2\s?)*$/;

    alert( regexp.test("A good string") ); // true

    let str = "An input string that takes a long time or even makes this regex hang!";

    alert( regexp.test(str) ); // false, works and fast!

Here `\2` is used instead of `\1`, because there are additional outer parentheses. To avoid messing up with the numbers, we can give the parentheses a name, e.g. `(?<word>\w+)`.

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // parentheses are named ?<word>, referenced as \k<word>
    let regexp = /^((?=(?<word>\w+))\k<word>\s?)*$/;

    let str = "An input string that takes a long time or even makes this regex hang!";

    alert( regexp.test(str) ); // false

    alert( regexp.test("A correct string") ); // true

The problem described in this article is called “catastrophic backtracking”.

We covered two ways how to solve it:

-   Rewrite the regexp to lower the possible combinations count.
-   Prevent backtracking.

<a href="/regexp-lookahead-lookbehind" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/regexp-sticky" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregexp-catastrophic-backtracking" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-catastrophic-backtracking" class="share share_fb"></a>

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

-   <a href="#example" class="sidebar__link">Example</a>
-   <a href="#simplified-example" class="sidebar__link">Simplified example</a>
-   <a href="#back-to-words-and-strings" class="sidebar__link">Back to words and strings</a>
-   <a href="#how-to-fix" class="sidebar__link">How to fix?</a>
-   <a href="#preventing-backtracking" class="sidebar__link">Preventing backtracking</a>

-   <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregexp-catastrophic-backtracking" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-catastrophic-backtracking" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/9-regular-expressions/15-regexp-catastrophic-backtracking" class="sidebar__link">Edit on GitHub</a>

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
