EN

-   <a href="https://ar.javascript.info/task/find-point-coordinates" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/find-point-coordinates" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/find-point-coordinates" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/find-point-coordinates" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/find-point-coordinates" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/find-point-coordinates" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/find-point-coordinates" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/task/find-point-coordinates" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/find-point-coordinates" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Ffind-point-coordinates" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Ffind-point-coordinates" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/ui" class="breadcrumbs__link"><span>Browser: Document, Events, Interfaces</span></a>

<a href="/document" class="breadcrumbs__link"><span>Document</span></a>

<a href="/coordinates" class="breadcrumbs__link"><span>Coordinates</span></a>

<a href="/coordinates" class="task-single__back"><span>back to the lesson</span></a>

## Find window coordinates of the field

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

In the iframe below you can see a document with the green “field”.

Use JavaScript to find window coordinates of corners pointed by with arrows.

There’s a small feature implemented in the document for convenience. A click at any place shows coordinates there.

<a href="https://en.js.cx/task/find-point-coordinates/source/" class="toolbar__button toolbar__button_external" title="open in new window"></a>

<a href="https://plnkr.co/edit/EDtjdNk6S43g1SAB?p=preview" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

Click anywhere to get window coordinates.  
That's for testing, to check the result you get by JavaScript.  

(click coordinates show up here)

. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

1

3

4

2

Your code should use DOM to get window coordinates of:

1.  Upper-left, outer corner (that’s simple).
2.  Bottom-right, outer corner (simple too).
3.  Upper-left, inner corner (a bit harder).
4.  Bottom-right, inner corner (there are several ways, choose one).

The coordinates that you calculate should be the same as those returned by the mouse click.

P.S. The code should also work if the element has another size or border, not bound to any fixed values.

[Open a sandbox for the task.](https://plnkr.co/edit/EDtjdNk6S43g1SAB?p=preview)

solution

Outer corners

#### Outer corners

Outer corners are basically what we get from [elem.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/DOM/element.getBoundingClientRect).

Coordinates of the upper-left corner `answer1` and the bottom-right corner `answer2`:

    let coords = elem.getBoundingClientRect();

    let answer1 = [coords.left, coords.top];
    let answer2 = [coords.right, coords.bottom];

Left-upper inner corner

#### Left-upper inner corner

That differs from the outer corner by the border width. A reliable way to get the distance is `clientLeft/clientTop`:

    let answer3 = [coords.left + field.clientLeft, coords.top + field.clientTop];

Right-bottom inner corner

#### Right-bottom inner corner

In our case we need to substract the border size from the outer coordinates.

We could use CSS way:

    let answer4 = [
      coords.right - parseInt(getComputedStyle(field).borderRightWidth),
      coords.bottom - parseInt(getComputedStyle(field).borderBottomWidth)
    ];

An alternative way would be to add `clientWidth/clientHeight` to coordinates of the left-upper corner. That’s probably even better:

    let answer4 = [
      coords.left + elem.clientLeft + elem.clientWidth,
      coords.top + elem.clientTop + elem.clientHeight
    ];

[Open the solution in a sandbox.](https://plnkr.co/edit/K35otM66PlWyBgbb?p=preview)

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
