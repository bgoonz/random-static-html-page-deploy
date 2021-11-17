EN

-   <a href="https://ar.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/move-ball-field" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/move-ball-field" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/move-ball-field" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/move-ball-field" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/move-ball-field" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/move-ball-field" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fmove-ball-field" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fmove-ball-field" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/ui" class="breadcrumbs__link"><span>Browser: Document, Events, Interfaces</span></a>

<a href="/events" class="breadcrumbs__link"><span>Introduction to Events</span></a>

<a href="/introduction-browser-events" class="breadcrumbs__link"><span>Introduction to browser events</span></a>

<a href="/introduction-browser-events" class="task-single__back"><span>back to the lesson</span></a>

## Move the ball across the field

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Move the ball across the field to a click. Like this:

<a href="https://en.js.cx/task/move-ball-field/solution/" class="toolbar__button toolbar__button_external" title="open in new window"></a>

Click on a field to move the ball there.  

<img src="https://en.js.cx/clipart/ball.svg" id="ball" /> . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

Requirements:

-   The ball center should come exactly under the pointer on click (if possible without crossing the field edge).
-   CSS-animation is welcome.
-   The ball must not cross field boundaries.
-   When the page is scrolled, nothing should break.

Notes:

-   The code should also work with different ball and field sizes, not be bound to any fixed values.
-   Use properties `event.clientX/event.clientY` for click coordinates.

[Open a sandbox for the task.](https://plnkr.co/edit/yi6xXY3XkYDiZbeD?p=preview)

solution

First we need to choose a method of positioning the ball.

We can’t use `position:fixed` for it, because scrolling the page would move the ball from the field.

So we should use `position:absolute` and, to make the positioning really solid, make `field` itself positioned.

Then the ball will be positioned relatively to the field:

    #field {
      width: 200px;
      height: 150px;
      position: relative;
    }

    #ball {
      position: absolute;
      left: 0; /* relative to the closest positioned ancestor (field) */
      top: 0;
      transition: 1s all; /* CSS animation for left/top makes the ball fly */
    }

Next we need to assign the correct `ball.style.left/top`. They contain field-relative coordinates now.

Here’s the picture:

<figure><img src="/task/move-ball-field/move-ball-coords.svg" width="521" height="330" /></figure>

We have `event.clientX/clientY` – window-relative coordinates of the click.

To get field-relative `left` coordinate of the click, we can substract the field left edge and the border width:

    let left = event.clientX - fieldCoords.left - field.clientLeft;

Normally, `ball.style.left` means the “left edge of the element” (the ball). So if we assign that `left`, then the ball edge, not center, would be under the mouse cursor.

We need to move the ball half-width left and half-height up to make it center.

So the final `left` would be:

    let left = event.clientX - fieldCoords.left - field.clientLeft - ball.offsetWidth/2;

The vertical coordinate is calculated using the same logic.

Please note that the ball width/height must be known at the time we access `ball.offsetWidth`. Should be specified in HTML or CSS.

[Open the solution in a sandbox.](https://plnkr.co/edit/8dwHzsyytfPDr08F?p=preview)

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
