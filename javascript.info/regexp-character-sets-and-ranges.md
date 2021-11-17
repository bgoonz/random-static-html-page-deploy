EN


<!-- -->


We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!



Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregexp-character-sets-and-ranges" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-character-sets-and-ranges" class="share share_fb"></a>


1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/regular-expressions" class="breadcrumbs__link"><span>Regular expressions</span></a></span>

13th December 2020

# Sets and ranges \[...\]

Several characters or character classes inside square brackets `[…]` mean to “search for any character among given”.

## <a href="#sets" id="sets" class="main__anchor">Sets</a>

For instance, `[eao]` means any of the 3 characters: `'a'`, `'e'`, or `'o'`.

That’s called a *set*. Sets can be used in a regexp along with regular characters:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // find [t or m], and then "op"
    alert( "Mop top".match(/[tm]op/gi) ); // "Mop", "top"

Please note that although there are multiple characters in the set, they correspond to exactly one character in the match.

So the example below gives no matches:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // find "V", then [o or i], then "la"
    alert( "Voila".match(/V[oi]la/) ); // null, no matches

The pattern searches for:

-   `V`,
-   then *one* of the letters `[oi]`,
-   then `la`.

So there would be a match for `Vola` or `Vila`.

## <a href="#ranges" id="ranges" class="main__anchor">Ranges</a>

Square brackets may also contain *character ranges*.

For instance, `[a-z]` is a character in range from `a` to `z`, and `[0-5]` is a digit from `0` to `5`.

In the example below we’re searching for `"x"` followed by two digits or letters from `A` to `F`:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( "Exception 0xAF".match(/x[0-9A-F][0-9A-F]/g) ); // xAF

Here `[0-9A-F]` has two ranges: it searches for a character that is either a digit from `0` to `9` or a letter from `A` to `F`.

If we’d like to look for lowercase letters as well, we can add the range `a-f`: `[0-9A-Fa-f]`. Or add the flag `i`.

We can also use character classes inside `[…]`.

For instance, if we’d like to look for a wordly character `\w` or a hyphen `-`, then the set is `[\w-]`.

Combining multiple classes is also possible, e.g. `[\s\d]` means “a space character or a digit”.

<span class="important__type">Character classes are shorthands for certain character sets</span>

For instance:

-   **\\d** – is the same as `[0-9]`,
-   **\\w** – is the same as `[a-zA-Z0-9_]`,
-   **\\s** – is the same as `[\t\n\v\f\r ]`, plus few other rare Unicode space characters.

### <a href="#example-multi-language-w" id="example-multi-language-w" class="main__anchor">Example: multi-language \w</a>

As the character class `\w` is a shorthand for `[a-zA-Z0-9_]`, it can’t find Chinese hieroglyphs, Cyrillic letters, etc.

We can write a more universal pattern, that looks for wordly characters in any language. That’s easy with Unicode properties: `[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]`.

Let’s decipher it. Similar to `\w`, we’re making a set of our own that includes characters with following Unicode properties:

-   `Alphabetic` (`Alpha`) – for letters,
-   `Mark` (`M`) – for accents,
-   `Decimal_Number` (`Nd`) – for digits,
-   `Connector_Punctuation` (`Pc`) – for the underscore `'_'` and similar characters,
-   `Join_Control` (`Join_C`) – two special codes `200c` and `200d`, used in ligatures, e.g. in Arabic.

An example of use:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/gu;

    let str = `Hi 你好 12`;

    // finds all letters and digits:
    alert( str.match(regexp) ); // H,i,你,好,1,2

Of course, we can edit this pattern: add Unicode properties or remove them. Unicode properties are covered in more details in the article [Unicode: flag "u" and class \\p{...}](/regexp-unicode).

<span class="important__type">Unicode properties aren’t supported in IE</span>

Unicode properties `p{…}` are not implemented in IE. If we really need them, we can use library [XRegExp](http://xregexp.com/).

Or just use ranges of characters in a language that interests us, e.g. `[а-я]` for Cyrillic letters.

## <a href="#excluding-ranges" id="excluding-ranges" class="main__anchor">Excluding ranges</a>

Besides normal ranges, there are “excluding” ranges that look like `[^…]`.

They are denoted by a caret character `^` at the start and match any character *except the given ones*.

For instance:

-   `[^aeyo]` – any character except `'a'`, `'e'`, `'y'` or `'o'`.
-   `[^0-9]` – any character except a digit, the same as `\D`.
-   `[^\s]` – any non-space character, same as `\S`.

The example below looks for any characters except letters, digits and spaces:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( "alice15@gmail.com".match(/[^\d\sA-Z]/gi) ); // @ and .

## <a href="#escaping-in-" id="escaping-in-" class="main__anchor">Escaping in […]</a>

Usually when we want to find exactly a special character, we need to escape it like `\.`. And if we need a backslash, then we use `\\`, and so on.

In square brackets we can use the vast majority of special characters without escaping:

-   Symbols `. + ( )` never need escaping.
-   A hyphen `-` is not escaped in the beginning or the end (where it does not define a range).
-   A caret `^` is only escaped in the beginning (where it means exclusion).
-   The closing square bracket `]` is always escaped (if we need to look for that symbol).

In other words, all special characters are allowed without escaping, except when they mean something for square brackets.

A dot `.` inside square brackets means just a dot. The pattern `[.,]` would look for one of characters: either a dot or a comma.

In the example below the regexp `[-().^+]` looks for one of the characters `-().^+`:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // No need to escape
    let regexp = /[-().^+]/g;

    alert( "1 + 2 - 3".match(regexp) ); // Matches +, -

…But if you decide to escape them “just in case”, then there would be no harm:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // Escaped everything
    let regexp = /[\-\(\)\.\^\+]/g;

    alert( "1 + 2 - 3".match(regexp) ); // also works: +, -

## <a href="#ranges-and-flag-u" id="ranges-and-flag-u" class="main__anchor">Ranges and flag “u”</a>

If there are surrogate pairs in the set, flag `u` is required for them to work correctly.

For instance, let’s look for `[𝒳𝒴]` in the string `𝒳`:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( '𝒳'.match(/[𝒳𝒴]/) ); // shows a strange character, like [?]
    // (the search was performed incorrectly, half-character returned)

The result is incorrect, because by default regular expressions “don’t know” about surrogate pairs.

The regular expression engine thinks that `[𝒳𝒴]` – are not two, but four characters:

1.  left half of `𝒳` `(1)`,
2.  right half of `𝒳` `(2)`,
3.  left half of `𝒴` `(3)`,
4.  right half of `𝒴` `(4)`.

We can see their codes like this:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    for(let i=0; i<'𝒳𝒴'.length; i++) {
      alert('𝒳𝒴'.charCodeAt(i)); // 55349, 56499, 55349, 56500
    };

So, the example above finds and shows the left half of `𝒳`.

If we add flag `u`, then the behavior will be correct:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert( '𝒳'.match(/[𝒳𝒴]/u) ); // 𝒳

The similar situation occurs when looking for a range, such as `[𝒳-𝒴]`.

If we forget to add flag `u`, there will be an error:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    '𝒳'.match(/[𝒳-𝒴]/); // Error: Invalid regular expression

The reason is that without flag `u` surrogate pairs are perceived as two characters, so `[𝒳-𝒴]` is interpreted as `[<55349><56499>-<55349><56500>]` (every surrogate pair is replaced with its codes). Now it’s easy to see that the range `56499-55349` is invalid: its starting code `56499` is greater than the end `55349`. That’s the formal reason for the error.

With the flag `u` the pattern works correctly:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // look for characters from 𝒳 to 𝒵
    alert( '𝒴'.match(/[𝒳-𝒵]/u) ); // 𝒴

## <a href="#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="#java-script" id="java-script" class="main__anchor">Java[^script]</a>

<a href="/task/find-range-1" class="task__open-link"></a>

We have a regexp `/Java[^script]/`.

Does it match anything in the string `Java`? In the string `JavaScript`?

solution

Answers: **no, yes**.

-   In the script `Java` it doesn’t match anything, because `[^script]` means “any character except given ones”. So the regexp looks for `"Java"` followed by one such symbol, but there’s a string end, no symbols after it.

    <a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

    <a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        alert( "Java".match(/Java[^script]/) ); // null

-   Yes, because the `[^script]` part matches the character `"S"`. It’s not one of `script`. As the regexp is case-sensitive (no `i` flag), it treats `"S"` as a different character from `"s"`.

    <a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

    <a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        alert( "JavaScript".match(/Java[^script]/) ); // "JavaS"

### <a href="#find-the-time-as-hh-mm-or-hh-mm" id="find-the-time-as-hh-mm-or-hh-mm" class="main__anchor">Find the time as hh:mm or hh-mm</a>

<a href="/task/find-time-2-formats" class="task__open-link"></a>

The time can be in the format `hours:minutes` or `hours-minutes`. Both hours and minutes have 2 digits: `09:00` or `21-30`.

Write a regexp to find time:

    let regexp = /your regexp/g;
    alert( "Breakfast at 09:00. Dinner at 21-30".match(regexp) ); // 09:00, 21-30

P.S. In this task we assume that the time is always correct, there’s no need to filter out bad strings like “45:67”. Later we’ll deal with that too.

solution

Answer: `\d\d[-:]\d\d`.

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /\d\d[-:]\d\d/g;
    alert( "Breakfast at 09:00. Dinner at 21-30".match(regexp) ); // 09:00, 21-30

Please note that the dash `'-'` has a special meaning in square brackets, but only between other characters, not when it’s in the beginning or at the end, so we don’t need to escape it.

<a href="/regexp-escaping" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/regexp-quantifiers" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregexp-character-sets-and-ranges" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-character-sets-and-ranges" class="share share_fb"></a>

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

-   <a href="#sets" class="sidebar__link">Sets</a>
-   <a href="#ranges" class="sidebar__link">Ranges</a>
-   <a href="#excluding-ranges" class="sidebar__link">Excluding ranges</a>
-   <a href="#escaping-in-" class="sidebar__link">Escaping in […]</a>
-   <a href="#ranges-and-flag-u" class="sidebar__link">Ranges and flag “u”</a>

-   <a href="#tasks" class="sidebar__link">Tasks (2)</a>
-   <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregexp-character-sets-and-ranges" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregexp-character-sets-and-ranges" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/9-regular-expressions/08-regexp-character-sets-and-ranges" class="sidebar__link">Edit on GitHub</a>

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
