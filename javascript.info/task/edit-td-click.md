EN

-   <a href="https://ar.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/edit-td-click" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/edit-td-click" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/edit-td-click" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/task/edit-td-click" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/edit-td-click" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/edit-td-click" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/edit-td-click" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/edit-td-click" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/edit-td-click" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fedit-td-click" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fedit-td-click" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/ui" class="breadcrumbs__link"><span>Browser: Document, Events, Interfaces</span></a>

<a href="/forms-controls" class="breadcrumbs__link"><span>Forms, controls</span></a>

<a href="/focus-blur" class="breadcrumbs__link"><span>Focusing: focus/blur</span></a>

<a href="/focus-blur" class="task-single__back"><span>back to the lesson</span></a>

## Edit TD on click

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Make table cells editable on click.

-   On click – the cell should become “editable” (textarea appears inside), we can change HTML. There should be no resize, all geometry should remain the same.
-   Buttons OK and CANCEL appear below the cell to finish/cancel the editing.
-   Only one cell may be editable at a moment. While a `<td>` is in “edit mode”, clicks on other cells are ignored.
-   The table may have many cells. Use event delegation.

The demo:

Click on a table cell to edit it. Press OK or CANCEL when you finish.

<table id="bagua-table"><colgroup><col style="width: 33%" /><col style="width: 33%" /><col style="width: 33%" /></colgroup><thead><tr class="header"><th colspan="3"><em>Bagua</em> Chart: Direction, Element, Color, Meaning</th></tr></thead><tbody><tr class="odd"><td class="nw"><strong>Northwest</strong><br />
Metal<br />
Silver<br />
Elders</td><td class="n"><strong>North</strong><br />
Water<br />
Blue<br />
Change</td><td class="ne"><strong>Northeast</strong><br />
Earth<br />
Yellow<br />
Direction</td></tr><tr class="even"><td class="w"><strong>West</strong><br />
Metal<br />
Gold<br />
Youth</td><td class="c"><strong>Center</strong><br />
All<br />
Purple<br />
Harmony</td><td class="e"><strong>East</strong><br />
Wood<br />
Blue<br />
Future</td></tr><tr class="odd"><td class="sw"><strong>Southwest</strong><br />
Earth<br />
Brown<br />
Tranquility</td><td class="s"><strong>South</strong><br />
Fire<br />
Orange<br />
Fame</td><td class="se"><strong>Southeast</strong><br />
Wood<br />
Green<br />
Romance</td></tr></tbody></table>

[Open a sandbox for the task.](https://plnkr.co/edit/8svbkXOrvh6EAMhR?p=preview)

solution

1.  On click – replace `innerHTML` of the cell by `<textarea>` with same sizes and no border. Can use JavaScript or CSS to set the right size.
2.  Set `textarea.value` to `td.innerHTML`.
3.  Focus on the textarea.
4.  Show buttons OK/CANCEL under the cell, handle clicks on them.

[Open the solution in a sandbox.](https://plnkr.co/edit/GJlVn2ir1dhNilFc?p=preview)

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
