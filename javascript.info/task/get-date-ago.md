EN

-   <a href="https://ar.javascript.info/task/get-date-ago" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/get-date-ago" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/get-date-ago" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/get-date-ago" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/task/get-date-ago" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/get-date-ago" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/get-date-ago" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/get-date-ago" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/get-date-ago" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/task/get-date-ago" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/get-date-ago" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fget-date-ago" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fget-date-ago" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a>

<a href="/data-types" class="breadcrumbs__link"><span>Data types</span></a>

<a href="/date" class="breadcrumbs__link"><span>Date and time</span></a>

<a href="/date" class="task-single__back"><span>back to the lesson</span></a>

## Which day of month was many days ago?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Create a function `getDateAgo(date, days)` to return the day of month `days` ago from the `date`.

For instance, if today is 20th, then `getDateAgo(new Date(), 1)` should be 19th and `getDateAgo(new Date(), 2)` should be 18th.

Should work reliably for `days=365` or more:

    let date = new Date(2015, 0, 2);

    alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
    alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
    alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)

P.S. The function should not modify the given `date`.

[Open a sandbox with tests.](https://plnkr.co/edit/JogMR3esB6Sl8Xme?p=preview)

solution

The idea is simple: to substract given number of days from `date`:

    function getDateAgo(date, days) {
      date.setDate(date.getDate() - days);
      return date.getDate();
    }

…But the function should not change `date`. That’s an important thing, because the outer code which gives us the date does not expect it to change.

To implement it let’s clone the date, like this:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function getDateAgo(date, days) {
      let dateCopy = new Date(date);

      dateCopy.setDate(date.getDate() - days);
      return dateCopy.getDate();
    }

    let date = new Date(2015, 0, 2);

    alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
    alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
    alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/e9YXEeEDmGiuit3w?p=preview)

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
