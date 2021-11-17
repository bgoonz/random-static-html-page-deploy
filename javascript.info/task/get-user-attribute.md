EN

-   <a href="https://ar.javascript.info/task/get-user-attribute" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/get-user-attribute" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/get-user-attribute" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/get-user-attribute" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/get-user-attribute" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/get-user-attribute" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/get-user-attribute" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/get-user-attribute" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/get-user-attribute" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fget-user-attribute" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fget-user-attribute" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/ui" class="breadcrumbs__link"><span>Browser: Document, Events, Interfaces</span></a>

<a href="/document" class="breadcrumbs__link"><span>Document</span></a>

<a href="/dom-attributes-and-properties" class="breadcrumbs__link"><span>Attributes and properties</span></a>

<a href="/dom-attributes-and-properties" class="task-single__back"><span>back to the lesson</span></a>

## Get the attribute

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write the code to select the element with `data-widget-name` attribute from the document and to read its value.

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <!DOCTYPE html>
    <html>
    <body>

      <div data-widget-name="menu">Choose the genre</div>

      <script>
        /* your code */
      </script>
    </body>
    </html>

solution

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <!DOCTYPE html>
    <html>
    <body>

      <div data-widget-name="menu">Choose the genre</div>

      <script>
        // getting it
        let elem = document.querySelector('[data-widget-name]');

        // reading the value
        alert(elem.dataset.widgetName);
        // or
        alert(elem.getAttribute('data-widget-name'));
      </script>
    </body>
    </html>

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
