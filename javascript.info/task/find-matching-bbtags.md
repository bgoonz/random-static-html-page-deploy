EN

-   <a href="https://ar.javascript.info/task/find-matching-bbtags" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/find-matching-bbtags" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/find-matching-bbtags" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/find-matching-bbtags" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/task/find-matching-bbtags" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/find-matching-bbtags" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/find-matching-bbtags" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/find-matching-bbtags" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/find-matching-bbtags" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/task/find-matching-bbtags" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/find-matching-bbtags" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Ffind-matching-bbtags" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Ffind-matching-bbtags" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/regular-expressions" class="breadcrumbs__link"><span>Regular expressions</span></a>

<a href="/regexp-alternation" class="breadcrumbs__link"><span>Alternation (OR) |</span></a>

<a href="/regexp-alternation" class="task-single__back"><span>back to the lesson</span></a>

## Find bbtag pairs

A “bb-tag” looks like `[tag]...[/tag]`, where `tag` is one of: `b`, `url` or `quote`.

For instance:

    [b]text[/b]
    [url]http://google.com[/url]

BB-tags can be nested. But a tag can’t be nested into itself, for instance:

    Normal:
    [url] [b]http://google.com[/b] [/url]
    [quote] [b]text[/b] [/quote]

    Can't happen:
    [b][b]text[/b][/b]

Tags can contain line breaks, that’s normal:

    [quote]
      [b]text[/b]
    [/quote]

Create a regexp to find all BB-tags with their contents.

For instance:

    let regexp = /your regexp/flags;

    let str = "..[url]http://google.com[/url]..";
    alert( str.match(regexp) ); // [url]http://google.com[/url]

If tags are nested, then we need the outer tag (if we want we can continue the search in its content):

    let regexp = /your regexp/flags;

    let str = "..[url][b]http://google.com[/b][/url]..";
    alert( str.match(regexp) ); // [url][b]http://google.com[/b][/url]

solution

Opening tag is `\[(b|url|quote)]`.

Then to find everything till the closing tag – let’s use the pattern `.*?` with flag `s` to match any character including the newline and then add a backreference to the closing tag.

The full pattern: `\[(b|url|quote)\].*?\[/\1]`.

In action:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let regexp = /\[(b|url|quote)].*?\[\/\1]/gs;

    let str = `
      [b]hello![/b]
      [quote]
        [url]http://google.com[/url]
      [/quote]
    `;

    alert( str.match(regexp) ); // [b]hello![/b],[quote][url]http://google.com[/url][/quote]

Please note that besides escaping `[`, we had to escape a slash for the closing tag `[\/\1]`, because normally the slash closes the pattern.

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
