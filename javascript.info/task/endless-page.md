EN

-   <a href="https://ar.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/endless-page" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/endless-page" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/endless-page" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/endless-page" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/endless-page" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/endless-page" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/task/endless-page" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/endless-page" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fendless-page" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fendless-page" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/ui" class="breadcrumbs__link"><span>Browser: Document, Events, Interfaces</span></a>

<a href="/event-details" class="breadcrumbs__link"><span>UI Events</span></a>

<a href="/onscroll" class="breadcrumbs__link"><span>Scrolling</span></a>

<a href="/onscroll" class="task-single__back"><span>back to the lesson</span></a>

## Endless page

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create an endless page. When a visitor scrolls it to the end, it auto-appends current date-time to the text (so that a visitor can scroll more).

Like this:

# Scroll me

Please note two important features of the scroll:

1.  **The scroll is “elastic”.** We can scroll a little beyond the document start or end in some browsers/devices (empty space below is shown, and then the document will automatically “bounces back” to normal).
2.  **The scroll is imprecise.** When we scroll to page end, then we may be in fact like 0-50px away from the real document bottom.

So, “scrolling to the end” should mean that the visitor is no more than 100px away from the document end.

P.S. In real life we may want to show “more messages” or “more goods”.

[Open a sandbox for the task.](https://plnkr.co/edit/9og7bth6RKWq4fnw?p=preview)

solution

The core of the solution is a function that adds more dates to the page (or loads more stuff in real-life) while we’re at the page end.

We can call it immediately and add as a `window.onscroll` handler.

The most important question is: “How do we detect that the page is scrolled to bottom?”

Let’s use window-relative coordinates.

The document is represented (and contained) within `<html>` tag, that is `document.documentElement`.

We can get window-relative coordinates of the whole document as `document.documentElement.getBoundingClientRect()`, the `bottom` property will be window-relative coordinate of the document bottom.

For instance, if the height of the whole HTML document is `2000px`, then:

    // when we're on the top of the page
    // window-relative top = 0
    document.documentElement.getBoundingClientRect().top = 0

    // window-relative bottom = 2000
    // the document is long, so that is probably far beyond the window bottom
    document.documentElement.getBoundingClientRect().bottom = 2000

If we scroll `500px` below, then:

    // document top is above the window 500px
    document.documentElement.getBoundingClientRect().top = -500
    // document bottom is 500px closer
    document.documentElement.getBoundingClientRect().bottom = 1500

When we scroll till the end, assuming that the window height is `600px`:

    // document top is above the window 1400px
    document.documentElement.getBoundingClientRect().top = -1400
    // document bottom is below the window 600px
    document.documentElement.getBoundingClientRect().bottom = 600

Please note that the `bottom` can’t be `0`, because it never reaches the window top. The lowest limit of the `bottom` coordinate is the window height (we assumed it to be `600`), we can’t scroll it any more up.

We can obtain the window height as `document.documentElement.clientHeight`.

For our task, we need to know when the document bottom is not no more than `100px` away from it (that is: `600-700px`, if the height is `600`).

So here’s the function:

    function populate() {
      while(true) {
        // document bottom
        let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

        // if the user hasn't scrolled far enough (>100px to the end)
        if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;

        // let's add more data
        document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
      }
    }

[Open the solution in a sandbox.](https://plnkr.co/edit/VVJZRWimYbGiMkqJ?p=preview)

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
