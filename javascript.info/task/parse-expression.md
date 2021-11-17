EN

-   <a href="https://ar.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/parse-expression" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/parse-expression" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/parse-expression" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/parse-expression" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/parse-expression" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fparse-expression" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fparse-expression" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/regular-expressions" class="breadcrumbs__link"><span>Regular expressions</span></a>

<a href="/regexp-groups" class="breadcrumbs__link"><span>Capturing groups</span></a>

<a href="/regexp-groups" class="task-single__back"><span>back to the lesson</span></a>

## Parse an expression

An arithmetical expression consists of 2 numbers and an operator between them, for instance:

-   `1 + 2`
-   `1.2 * 3.4`
-   `-3 / -6`
-   `-2 - 2`

The operator is one of: `"+"`, `"-"`, `"*"` or `"/"`.

There may be extra spaces at the beginning, at the end or between the parts.

Create a function `parse(expr)` that takes an expression and returns an array of 3 items:

1.  The first number.
2.  The operator.
3.  The second number.

For example:

    let [a, op, b] = parse("1.2 * 3.4");

    alert(a); // 1.2
    alert(op); // *
    alert(b); // 3.4

solution

A regexp for a number is: `-?\d+(\.\d+)?`. We created it in the previous task.

An operator is `[-+*/]`. The hyphen `-` goes first in the square brackets, because in the middle it would mean a character range, while we just want a character `-`.

The slash `/` should be escaped inside a JavaScript regexp `/.../`, we’ll do that later.

We need a number, an operator, and then another number. And optional spaces between them.

The full regular expression: `-?\d+(\.\d+)?\s*[-+*/]\s*-?\d+(\.\d+)?`.

It has 3 parts, with `\s*` between them:

1.  `-?\d+(\.\d+)?` – the first number,
2.  `[-+*/]` – the operator,
3.  `-?\d+(\.\d+)?` – the second number.

To make each of these parts a separate element of the result array, let’s enclose them in parentheses: `(-?\d+(\.\d+)?)\s*([-+*/])\s*(-?\d+(\.\d+)?)`.

In action:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /(-?\d+(\.\d+)?)\s*([-+*\/])\s*(-?\d+(\.\d+)?)/;

    alert( "1.2 + 12".match(regexp) );

The result includes:

-   `result[0] == "1.2 + 12"` (full match)
-   `result[1] == "1.2"` (first group `(-?\d+(\.\d+)?)` – the first number, including the decimal part)
-   `result[2] == ".2"` (second group`(\.\d+)?` – the first decimal part)
-   `result[3] == "+"` (third group `([-+*\/])` – the operator)
-   `result[4] == "12"` (forth group `(-?\d+(\.\d+)?)` – the second number)
-   `result[5] == undefined` (fifth group `(\.\d+)?` – the last decimal part is absent, so it’s undefined)

We only want the numbers and the operator, without the full match or the decimal parts, so let’s “clean” the result a bit.

The full match (the arrays first item) can be removed by shifting the array `result.shift()`.

Groups that contain decimal parts (number 2 and 4) `(.\d+)` can be excluded by adding `?:` to the beginning: `(?:\.\d+)?`.

The final solution:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function parse(expr) {
      let regexp = /(-?\d+(?:\.\d+)?)\s*([-+*\/])\s*(-?\d+(?:\.\d+)?)/;

      let result = expr.match(regexp);

      if (!result) return [];
      result.shift();

      return result;
    }

    alert( parse("-1.23 * 3.45") );  // -1.23, *, 3.45

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
