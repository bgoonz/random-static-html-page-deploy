EN

-   <a href="https://ar.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/sort-table" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/sort-table" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/sort-table" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/sort-table" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/sort-table" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/sort-table" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/sort-table" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/task/sort-table" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/sort-table" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fsort-table" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fsort-table" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/ui" class="breadcrumbs__link"><span>Browser: Document, Events, Interfaces</span></a>

<a href="/document" class="breadcrumbs__link"><span>Document</span></a>

<a href="/modifying-document" class="breadcrumbs__link"><span>Modifying the document</span></a>

<a href="/modifying-document" class="task-single__back"><span>back to the lesson</span></a>

## Sort the table

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There’s a table:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <table>
    <thead>
      <tr>
        <th>Name</th><th>Surname</th><th>Age</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John</td><td>Smith</td><td>10</td>
      </tr>
      <tr>
        <td>Pete</td><td>Brown</td><td>15</td>
      </tr>
      <tr>
        <td>Ann</td><td>Lee</td><td>5</td>
      </tr>
      <tr>
        <td>...</td><td>...</td><td>...</td>
      </tr>
    </tbody>
    </table>

There may be more rows in it.

Write the code to sort it by the `"name"` column.

[Open a sandbox for the task.](https://plnkr.co/edit/f1KNlHsEaWriLawH?p=preview)

solution

The solution is short, yet may look a bit tricky, so here I provide it with extensive comments:

    let sortedRows = Array.from(table.tBodies[0].rows) // 1
      .sort((rowA, rowB) => rowA.cells[0].innerHTML.localeCompare(rowB.cells[0].innerHTML));

    table.tBodies[0].append(...sortedRows); // (3)

The step-by-step algorthm:

1.  Get all `<tr>`, from `<tbody>`.
2.  Then sort them comparing by the content of the first `<td>` (the name field).
3.  Now insert nodes in the right order by `.append(...sortedRows)`.

We don’t have to remove row elements, just “re-insert”, they leave the old place automatically.

P.S. In our case, there’s an explicit `<tbody>` in the table, but even if HTML table doesn’t have `<tbody>`, the DOM structure always has it.

[Open the solution in a sandbox.](https://plnkr.co/edit/5xHStBMfV5AVtoxR?p=preview)

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
