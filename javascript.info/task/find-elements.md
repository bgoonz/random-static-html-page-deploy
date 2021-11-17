EN

-   <a href="https://ar.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/find-elements" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/find-elements" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/task/find-elements" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/find-elements" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/find-elements" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/find-elements" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/find-elements" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/task/find-elements" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/find-elements" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Ffind-elements" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Ffind-elements" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/ui" class="breadcrumbs__link"><span>Browser: Document, Events, Interfaces</span></a>

<a href="/document" class="breadcrumbs__link"><span>Document</span></a>

<a href="/searching-elements-dom" class="breadcrumbs__link"><span>Searching: getElement*, querySelector*</span></a>

<a href="/searching-elements-dom" class="task-single__back"><span>back to the lesson</span></a>

## Search for elements

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Here’s the document with the table and form.

How to find?…

1.  The table with `id="age-table"`.
2.  All `label` elements inside that table (there should be 3 of them).
3.  The first `td` in that table (with the word “Age”).
4.  The `form` with `name="search"`.
5.  The first `input` in that form.
6.  The last `input` in that form.

Open the page [table.html](/task/find-elements/table.html) in a separate window and make use of browser tools for that.

solution

There are many ways to do it.

Here are some of them:

    // 1. The table with `id="age-table"`.
    let table = document.getElementById('age-table')

    // 2. All label elements inside that table
    table.getElementsByTagName('label')
    // or
    document.querySelectorAll('#age-table label')

    // 3. The first td in that table (with the word "Age")
    table.rows[0].cells[0]
    // or
    table.getElementsByTagName('td')[0]
    // or
    table.querySelector('td')

    // 4. The form with the name "search"
    // assuming there's only one element with name="search" in the document
    let form = document.getElementsByName('search')[0]
    // or, form specifically
    document.querySelector('form[name="search"]')

    // 5. The first input in that form.
    form.getElementsByTagName('input')[0]
    // or
    form.querySelector('input')

    // 6. The last input in that form
    let inputs = form.querySelectorAll('input') // find all inputs
    inputs[inputs.length-1] // take the last one

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
