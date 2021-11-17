EN

-   <a href="https://ar.javascript.info/task/insert-after-head" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/insert-after-head" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/insert-after-head" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/insert-after-head" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/insert-after-head" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/insert-after-head" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/task/insert-after-head" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/insert-after-head" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Finsert-after-head" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Finsert-after-head" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/regular-expressions" class="breadcrumbs__link"><span>Regular expressions</span></a>

<a href="/regexp-lookahead-lookbehind" class="breadcrumbs__link"><span>Lookahead and lookbehind</span></a>

<a href="/regexp-lookahead-lookbehind" class="task-single__back"><span>back to the lesson</span></a>

## Insert After Head

We have a string with an HTML Document.

Write a regular expression that inserts `<h1>Hello</h1>` immediately after `<body>` tag. The tag may have attributes.

For instance:

    let regexp = /your regular expression/;

    let str = `
    <html>
      <body style="height: 200px">
      ...
      </body>
    </html>
    `;

    str = str.replace(regexp, `<h1>Hello</h1>`);

After that the value of `str` should be:

    <html>
      <body style="height: 200px"><h1>Hello</h1>
      ...
      </body>
    </html>

solution

In order to insert after the `<body>` tag, we must first find it. We can use the regular expression pattern `<body.*?>` for that.

In this task we don’t need to modify the `<body>` tag. We only need to add the text after it.

Here’s how we can do it:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = '...<body style="...">...';
    str = str.replace(/<body.*?>/, '$&<h1>Hello</h1>');

    alert(str); // ...<body style="..."><h1>Hello</h1>...

In the replacement string `$&` means the match itself, that is, the part of the source text that corresponds to `<body.*?>`. It gets replaced by itself plus `<h1>Hello</h1>`.

An alternative is to use lookbehind:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let str = '...<body style="...">...';
    str = str.replace(/(?<=<body.*?>)/, `<h1>Hello</h1>`);

    alert(str); // ...<body style="..."><h1>Hello</h1>...

As you can see, there’s only lookbehind part in this regexp.

It works like this:

-   At every position in the text.
-   Check if it’s preceeded by `<body.*?>`.
-   If it’s so then we have the match.

The tag `<body.*?>` won’t be returned. The result of this regexp is literally an empty string, but it matches only at positions preceeded by `<body.*?>`.

So it replaces the “empty line”, preceeded by `<body.*?>`, with `<h1>Hello</h1>`. That’s the insertion after `<body>`.

P.S. Regexp flags, such as `s` and `i` can also be useful: `/<body.*?>/si`. The `s` flag makes the dot `.` match a newline character, and `i` flag makes `<body>` also match `<BODY>` case-insensitively.

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
