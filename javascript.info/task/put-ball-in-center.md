EN

-   <a href="https://ar.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/put-ball-in-center" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/put-ball-in-center" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/put-ball-in-center" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/put-ball-in-center" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/put-ball-in-center" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/put-ball-in-center" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/put-ball-in-center" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fput-ball-in-center" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fput-ball-in-center" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/ui" class="breadcrumbs__link"><span>Browser: Document, Events, Interfaces</span></a>

<a href="/document" class="breadcrumbs__link"><span>Document</span></a>

<a href="/size-and-scroll" class="breadcrumbs__link"><span>Element size and scrolling</span></a>

<a href="/size-and-scroll" class="task-single__back"><span>back to the lesson</span></a>

## Place the ball in the field center

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Here’s how the source document looks:

<a href="https://en.js.cx/task/put-ball-in-center/source/" class="toolbar__button toolbar__button_external" title="open in new window"></a>

<a href="https://plnkr.co/edit/xkru9S3bh1Ihfr9y?p=preview" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

<img src="https://en.js.cx/clipart/ball.svg" id="ball" /> . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

What are coordinates of the field center?

Calculate them and use to place the ball into the center of the green field:

<img src="https://en.js.cx/clipart/ball.svg" id="ball" width="40" height="40" /> . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

-   The element should be moved by JavaScript, not CSS.
-   The code should work with any ball size (`10`, `20`, `30` pixels) and any field size, not be bound to the given values.

P.S. Sure, centering could be done with CSS, but here we want exactly JavaScript. Further we’ll meet other topics and more complex situations when JavaScript must be used. Here we do a “warm-up”.

[Open a sandbox for the task.](https://plnkr.co/edit/xkru9S3bh1Ihfr9y?p=preview)

solution

The ball has `position:absolute`. It means that its `left/top` coordinates are measured from the nearest positioned element, that is `#field` (because it has `position:relative`).

The coordinates start from the inner left-upper corner of the field:

<figure><img src="/task/put-ball-in-center/field.svg" width="233" height="156" /></figure>

The inner field width/height is `clientWidth/clientHeight`. So the field center has coordinates `(clientWidth/2, clientHeight/2)`.

…But if we set `ball.style.left/top` to such values, then not the ball as a whole, but the left-upper edge of the ball would be in the center:

    ball.style.left = Math.round(field.clientWidth / 2) + 'px';
    ball.style.top = Math.round(field.clientHeight / 2) + 'px';

Here’s how it looks:

<img src="https://js.cx/clipart/ball.svg" id="ball" width="40" height="40" /> . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

To align the ball center with the center of the field, we should move the ball to the half of its width to the left and to the half of its height to the top:

    ball.style.left = Math.round(field.clientWidth / 2 - ball.offsetWidth / 2) + 'px';
    ball.style.top = Math.round(field.clientHeight / 2 - ball.offsetHeight / 2) + 'px';

Now the ball is finally centered.

<span class="important__type">Attention: the pitfall!</span>

The code won’t work reliably while `<img>` has no width/height:

    <img src="ball.png" id="ball">

When the browser does not know the width/height of an image (from tag attributes or CSS), then it assumes them to equal `0` until the image finishes loading.

So the value of `ball.offsetWidth` will be `0` until the image loads. That leads to wrong coordinates in the code above.

After the first load, the browser usually caches the image, and on reloads it will have the size immediately. But on the first load the value of `ball.offsetWidth` is `0`.

We should fix that by adding `width/height` to `<img>`:

    <img src="ball.png" width="40" height="40" id="ball">

…Or provide the size in CSS:

    #ball {
      width: 40px;
      height: 40px;
    }

[Open the solution in a sandbox.](https://plnkr.co/edit/Tthd4Zdyvyxku03K?p=preview)

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
