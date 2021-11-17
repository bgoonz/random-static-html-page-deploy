EN

-   <a href="https://ar.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/find-webcolor-3-or-6" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/find-webcolor-3-or-6" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/find-webcolor-3-or-6" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/find-webcolor-3-or-6" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/find-webcolor-3-or-6" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Ffind-webcolor-3-or-6" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Ffind-webcolor-3-or-6" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/regular-expressions" class="breadcrumbs__link"><span>Regular expressions</span></a>

<a href="/regexp-groups" class="breadcrumbs__link"><span>Capturing groups</span></a>

<a href="/regexp-groups" class="task-single__back"><span>back to the lesson</span></a>

## Find color in the format #abc or #abcdef

Write a RegExp that matches colors in the format `#abc` or `#abcdef`. That is: `#` followed by 3 or 6 hexadecimal digits.

Usage example:

    let regexp = /your regexp/g;

    let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

    alert( str.match(regexp) ); // #3f3 #AA00ef

P.S. This should be exactly 3 or 6 hex digits. Values with 4 digits, such as `#abcd`, should not match.

solution

A regexp to search 3-digit color `#abc`: `/#[a-f0-9]{3}/i`.

We can add exactly 3 more optional hex digits. We don’t need more or less. The color has either 3 or 6 digits.

Let’s use the quantifier `{1,2}` for that: we’ll have `/#([a-f0-9]{3}){1,2}/i`.

Here the pattern `[a-f0-9]{3}` is enclosed in parentheses to apply the quantifier `{1,2}`.

In action:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /#([a-f0-9]{3}){1,2}/gi;

    let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

    alert( str.match(regexp) ); // #3f3 #AA00ef #abc

There’s a minor problem here: the pattern found `#abc` in `#abcd`. To prevent that we can add `\b` to the end:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /#([a-f0-9]{3}){1,2}\b/gi;

    let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

    alert( str.match(regexp) ); // #3f3 #AA00ef

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
