EN

-   <a href="https://ar.javascript.info/task/filter-through-function" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/filter-through-function" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/filter-through-function" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/filter-through-function" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/task/filter-through-function" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/filter-through-function" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/filter-through-function" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/filter-through-function" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/filter-through-function" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/task/filter-through-function" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/filter-through-function" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Ffilter-through-function" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Ffilter-through-function" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a>

<a href="/advanced-functions" class="breadcrumbs__link"><span>Advanced working with functions</span></a>

<a href="/closure" class="breadcrumbs__link"><span>Variable scope, closure</span></a>

<a href="/closure" class="task-single__back"><span>back to the lesson</span></a>

## Filter through function

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

We have a built-in method `arr.filter(f)` for arrays. It filters all elements through the function `f`. If it returns `true`, then that element is returned in the resulting array.

Make a set of “ready to use” filters:

-   `inBetween(a, b)` – between `a` and `b` or equal to them (inclusively).
-   `inArray([...])` – in the given array.

The usage must be like this:

-   `arr.filter(inBetween(3,6))` – selects only values between 3 and 6.
-   `arr.filter(inArray([1,2,3]))` – selects only elements matching with one of the members of `[1,2,3]`.

For instance:

    /* .. your code for inBetween and inArray */
    let arr = [1, 2, 3, 4, 5, 6, 7];

    alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

    alert( arr.filter(inArray([1, 2, 10])) ); // 1,2

[Open a sandbox with tests.](https://plnkr.co/edit/TYqFVjCctR5V4gpt?p=preview)

solution

Filter inBetween

#### Filter inBetween

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function inBetween(a, b) {
      return function(x) {
        return x >= a && x <= b;
      };
    }

    let arr = [1, 2, 3, 4, 5, 6, 7];
    alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

Filter inArray

#### Filter inArray

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function inArray(arr) {
      return function(x) {
        return arr.includes(x);
      };
    }

    let arr = [1, 2, 3, 4, 5, 6, 7];
    alert( arr.filter(inArray([1, 2, 10])) ); // 1,2

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/qDqXk2C7FrIUTdOP?p=preview)

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
