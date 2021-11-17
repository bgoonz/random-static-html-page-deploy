EN

-   <a href="https://ar.javascript.info/task/primitive-conversions-questions" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/primitive-conversions-questions" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/primitive-conversions-questions" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/primitive-conversions-questions" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/task/primitive-conversions-questions" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/primitive-conversions-questions" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/primitive-conversions-questions" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/primitive-conversions-questions" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/primitive-conversions-questions" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/primitive-conversions-questions" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fprimitive-conversions-questions" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fprimitive-conversions-questions" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a>

<a href="/first-steps" class="breadcrumbs__link"><span>JavaScript Fundamentals</span></a>

<a href="/operators" class="breadcrumbs__link"><span>Basic operators, maths</span></a>

<a href="/operators" class="task-single__back"><span>back to the lesson</span></a>

## Type conversions

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

What are results of these expressions?

    "" + 1 + 0
    "" - 1 + 0
    true + false
    6 / "3"
    "2" * "3"
    4 + 5 + "px"
    "$" + 4 + 5
    "4" - 2
    "4px" - 2
    "  -9  " + 5
    "  -9  " - 5
    null + 1
    undefined + 1
    " \t \n" - 2

Think well, write down and then compare with the answer.

solution

    "" + 1 + 0 = "10" // (1)
    "" - 1 + 0 = -1 // (2)
    true + false = 1
    6 / "3" = 2
    "2" * "3" = 6
    4 + 5 + "px" = "9px"
    "$" + 4 + 5 = "$45"
    "4" - 2 = 2
    "4px" - 2 = NaN
    "  -9  " + 5 = "  -9  5" // (3)
    "  -9  " - 5 = -14 // (4)
    null + 1 = 1 // (5)
    undefined + 1 = NaN // (6)
    " \t \n" - 2 = -2 // (7)

1.  The addition with a string `"" + 1` converts `1` to a string: `"" + 1 = "1"`, and then we have `"1" + 0`, the same rule is applied.
2.  The subtraction `-` (like most math operations) only works with numbers, it converts an empty string `""` to `0`.
3.  The addition with a string appends the number `5` to the string.
4.  The subtraction always converts to numbers, so it makes `" -9 "` a number `-9` (ignoring spaces around it).
5.  `null` becomes `0` after the numeric conversion.
6.  `undefined` becomes `NaN` after the numeric conversion.
7.  Space characters, are trimmed off string start and end when a string is converted to a number. Here the whole string consists of space characters, such as `\t`, `\n` and a “regular” space between them. So, similarly to an empty string, it becomes `0`.

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
