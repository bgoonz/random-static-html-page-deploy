EN

-   <a href="https://ar.javascript.info/task/yellow-links" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/yellow-links" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/yellow-links" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/yellow-links" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/yellow-links" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/yellow-links" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/yellow-links" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/yellow-links" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/yellow-links" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fyellow-links" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fyellow-links" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/ui" class="breadcrumbs__link"><span>Browser: Document, Events, Interfaces</span></a>

<a href="/document" class="breadcrumbs__link"><span>Document</span></a>

<a href="/dom-attributes-and-properties" class="breadcrumbs__link"><span>Attributes and properties</span></a>

<a href="/dom-attributes-and-properties" class="task-single__back"><span>back to the lesson</span></a>

## Make external links orange

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

Make all external links orange by altering their `style` property.

A link is external if:

-   Its `href` has `://` in it
-   But doesn’t start with `http://internal.com`.

Example:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <a name="list">the list</a>
    <ul>
      <li><a href="http://google.com">http://google.com</a></li>
      <li><a href="/tutorial">/tutorial.html</a></li>
      <li><a href="local/path">local/path</a></li>
      <li><a href="ftp://ftp.com/my.zip">ftp://ftp.com/my.zip</a></li>
      <li><a href="http://nodejs.org">http://nodejs.org</a></li>
      <li><a href="http://internal.com/test">http://internal.com/test</a></li>
    </ul>

    <script>
      // setting style for a single link
      let link = document.querySelector('a');
      link.style.color = 'orange';
    </script>

The result should be:

<span id="list">The list:</span>

-   <http://google.com>
-   [/tutorial.html](/tutorial)
-   [local/path](local/path)
-   <ftp://ftp.com/my.zip>
-   <http://nodejs.org>
-   <http://internal.com/test>

[Open a sandbox for the task.](https://plnkr.co/edit/P633iMGyfcQ6DCdF?p=preview)

solution

First, we need to find all external references.

There are two ways.

The first is to find all links using `document.querySelectorAll('a')` and then filter out what we need:

    let links = document.querySelectorAll('a');

    for (let link of links) {
      let href = link.getAttribute('href');
      if (!href) continue; // no attribute

      if (!href.includes('://')) continue; // no protocol

      if (href.startsWith('http://internal.com')) continue; // internal

      link.style.color = 'orange';
    }

Please note: we use `link.getAttribute('href')`. Not `link.href`, because we need the value from HTML.

…Another, simpler way would be to add the checks to CSS selector:

    // look for all links that have :// in href
    // but href doesn't start with http://internal.com
    let selector = 'a[href*="://"]:not([href^="http://internal.com"])';
    let links = document.querySelectorAll(selector);

    links.forEach(link => link.style.color = 'orange');

[Open the solution in a sandbox.](https://plnkr.co/edit/zrwKuNxvROq8nxsg?p=preview)

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
