EN

-   <a href="https://ar.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/hoverintent" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/hoverintent" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/hoverintent" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/hoverintent" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/hoverintent" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/hoverintent" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/task/hoverintent" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/hoverintent" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fhoverintent" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fhoverintent" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/ui" class="breadcrumbs__link"><span>Browser: Document, Events, Interfaces</span></a>

<a href="/event-details" class="breadcrumbs__link"><span>UI Events</span></a>

<a href="/mousemove-mouseover-mouseout-mouseenter-mouseleave" class="breadcrumbs__link"><span>Moving the mouse: mouseover/out, mouseenter/leave</span></a>

<a href="/mousemove-mouseover-mouseout-mouseenter-mouseleave" class="task-single__back"><span>back to the lesson</span></a>

## "Smart" tooltip

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write a function that shows a tooltip over an element only if the visitor moves the mouse *to it*, but not *through it*.

In other words, if the visitor moves the mouse to the element and stops there – show the tooltip. And if they just moved the mouse through, then no need, who wants extra blinking?

Technically, we can measure the mouse speed over the element, and if it’s slow then we assume that it comes “over the element” and show the tooltip, if it’s fast – then we ignore it.

Make a universal object `new HoverIntent(options)` for it.

Its `options`:

-   `elem` – element to track.
-   `over` – a function to call if the mouse came to the element: that is, it moves slowly or stopped over it.
-   `out` – a function to call when the mouse leaves the element (if `over` was called).

An example of using such object for the tooltip:

    // a sample tooltip
    let tooltip = document.createElement('div');
    tooltip.className = "tooltip";
    tooltip.innerHTML = "Tooltip";

    // the object will track mouse and call over/out
    new HoverIntent({
      elem,
      over() {
        tooltip.style.left = elem.getBoundingClientRect().left + 'px';
        tooltip.style.top = elem.getBoundingClientRect().bottom + 5 + 'px';
        document.body.append(tooltip);
      },
      out() {
        tooltip.remove();
      }
    });

The demo:

<span class="hours">12</span> : <span class="minutes">30</span> : <span class="seconds">00</span>

Tooltip

If you move the mouse over the “clock” fast then nothing happens, and if you do it slow or stop on them, then there will be a tooltip.

Please note: the tooltip doesn’t “blink” when the cursor moves between the clock subelements.

[Open a sandbox with tests.](https://plnkr.co/edit/vaC7qQoEslRkWWZ7?p=preview)

solution

The algorithm looks simple:

1.  Put `onmouseover/out` handlers on the element. Also can use `onmouseenter/leave` here, but they are less universal, won’t work if we introduce delegation.
2.  When a mouse cursor entered the element, start measuring the speed on `mousemove`.
3.  If the speed is slow, then run `over`.
4.  When we’re going out of the element, and `over` was executed, run `out`.

But how to measure the speed?

The first idea can be: run a function every `100ms` and measure the distance between previous and new coordinates. If it’s small, then the speed is small.

Unfortunately, there’s no way to get “current mouse coordinates” in JavaScript. There’s no function like `getCurrentMouseCoordinates()`.

The only way to get coordinates is to listen for mouse events, like `mousemove`, and take coordinates from the event object.

So let’s set a handler on `mousemove` to track coordinates and remember them. And then compare them, once per `100ms`.

P.S. Please note: the solution tests use `dispatchEvent` to see if the tooltip works right.

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/n8OtYNISvRNcwCcm?p=preview)

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
