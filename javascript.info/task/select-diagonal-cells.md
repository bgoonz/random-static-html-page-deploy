EN

-   <a href="https://ar.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/select-diagonal-cells" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/select-diagonal-cells" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/select-diagonal-cells" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/select-diagonal-cells" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/select-diagonal-cells" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/select-diagonal-cells" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/select-diagonal-cells" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/select-diagonal-cells" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fselect-diagonal-cells" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fselect-diagonal-cells" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/ui" class="breadcrumbs__link"><span>Browser: Document, Events, Interfaces</span></a>

<a href="/document" class="breadcrumbs__link"><span>Document</span></a>

<a href="/dom-navigation" class="breadcrumbs__link"><span>Walking the DOM</span></a>

<a href="/dom-navigation" class="task-single__back"><span>back to the lesson</span></a>

## Select all diagonal cells

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write the code to paint all diagonal table cells in red.

You’ll need to get all diagonal `<td>` from the `<table>` and paint them using the code:

    // td should be the reference to the table cell
    td.style.backgroundColor = 'red';

The result should be:

<table><tbody><tr class="odd"><td>1:1</td><td>2:1</td><td>3:1</td><td>4:1</td><td>5:1</td></tr><tr class="even"><td>1:2</td><td>2:2</td><td>3:2</td><td>4:2</td><td>5:2</td></tr><tr class="odd"><td>1:3</td><td>2:3</td><td>3:3</td><td>4:3</td><td>5:3</td></tr><tr class="even"><td>1:4</td><td>2:4</td><td>3:4</td><td>4:4</td><td>5:4</td></tr><tr class="odd"><td>1:5</td><td>2:5</td><td>3:5</td><td>4:5</td><td>5:5</td></tr></tbody></table>

[Open a sandbox for the task.](https://plnkr.co/edit/nuNlB97squ4Hgwrg?p=preview)

solution

We’ll be using `rows` and `cells` properties to access diagonal table cells.

[Open the solution in a sandbox.](https://plnkr.co/edit/mT7Hlxa5XBhtHzLt?p=preview)

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
