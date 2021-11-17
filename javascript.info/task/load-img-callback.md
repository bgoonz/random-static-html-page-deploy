EN

-   <a href="https://ar.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/load-img-callback" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/load-img-callback" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/load-img-callback" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/load-img-callback" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/load-img-callback" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/load-img-callback" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/load-img-callback" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fload-img-callback" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fload-img-callback" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/ui" class="breadcrumbs__link"><span>Browser: Document, Events, Interfaces</span></a>

<a href="/loading" class="breadcrumbs__link"><span>Document and resource loading</span></a>

<a href="/onload-onerror" class="breadcrumbs__link"><span>Resource loading: onload and onerror</span></a>

<a href="/onload-onerror" class="task-single__back"><span>back to the lesson</span></a>

## Load images with a callback

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Normally, images are loaded when they are created. So when we add `<img>` to the page, the user does not see the picture immediately. The browser needs to load it first.

To show an image immediately, we can create it “in advance”, like this:

    let img = document.createElement('img');
    img.src = 'my.jpg';

The browser starts loading the image and remembers it in the cache. Later, when the same image appears in the document (no matter how), it shows up immediately.

**Create a function `preloadImages(sources, callback)` that loads all images from the array `sources` and, when ready, runs `callback`.**

For instance, this will show an `alert` after the images are loaded:

    function loaded() {
      alert("Images loaded")
    }

    preloadImages(["1.jpg", "2.jpg", "3.jpg"], loaded);

In case of an error, the function should still assume the picture “loaded”.

In other words, the `callback` is executed when all images are either loaded or errored out.

The function is useful, for instance, when we plan to show a gallery with many scrollable images, and want to be sure that all images are loaded.

In the source document you can find links to test images, and also the code to check whether they are loaded or not. It should output `300`.

[Open a sandbox for the task.](https://plnkr.co/edit/dZ22M5URaGd0Dx0Q?p=preview)

solution

The algorithm:

1.  Make `img` for every source.
2.  Add `onload/onerror` for every image.
3.  Increase the counter when either `onload` or `onerror` triggers.
4.  When the counter value equals to the sources count – we’re done: `callback()`.

[Open the solution in a sandbox.](https://plnkr.co/edit/D31flNmxdXwV2g8G?p=preview)

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
