EN

-   <a href="https://ar.javascript.info/task/sum-many-brackets" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/sum-many-brackets" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/sum-many-brackets" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/sum-many-brackets" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/task/sum-many-brackets" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/sum-many-brackets" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/sum-many-brackets" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/sum-many-brackets" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/sum-many-brackets" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/task/sum-many-brackets" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/sum-many-brackets" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fsum-many-brackets" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fsum-many-brackets" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a>

<a href="/advanced-functions" class="breadcrumbs__link"><span>Advanced working with functions</span></a>

<a href="/function-object" class="breadcrumbs__link"><span>Function object, NFE</span></a>

<a href="/function-object" class="task-single__back"><span>back to the lesson</span></a>

## Sum with an arbitrary amount of brackets

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 2</span>

Write function `sum` that would work like this:

    sum(1)(2) == 3; // 1 + 2
    sum(1)(2)(3) == 6; // 1 + 2 + 3
    sum(5)(-1)(2) == 6
    sum(6)(-1)(-2)(-3) == 0
    sum(0)(1)(2)(3)(4)(5) == 15

P.S. Hint: you may need to setup custom object to primitive conversion for your function.

[Open a sandbox with tests.](https://plnkr.co/edit/kVNFxRy62DeMwhnX?p=preview)

solution

1.  For the whole thing to work *anyhow*, the result of `sum` must be function.
2.  That function must keep in memory the current value between calls.
3.  According to the task, the function must become the number when used in `==`. Functions are objects, so the conversion happens as described in the chapter [Object to primitive conversion](/object-toprimitive), and we can provide our own method that returns the number.

Now the code:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function sum(a) {

      let currentSum = a;

      function f(b) {
        currentSum += b;
        return f;
      }

      f.toString = function() {
        return currentSum;
      };

      return f;
    }

    alert( sum(1)(2) ); // 3
    alert( sum(5)(-1)(2) ); // 6
    alert( sum(6)(-1)(-2)(-3) ); // 0
    alert( sum(0)(1)(2)(3)(4)(5) ); // 15

Please note that the `sum` function actually works only once. It returns function `f`.

Then, on each subsequent call, `f` adds its parameter to the sum `currentSum`, and returns itself.

**There is no recursion in the last line of `f`.**

Here is what recursion looks like:

    function f(b) {
      currentSum += b;
      return f(); // <-- recursive call
    }

And in our case, we just return the function, without calling it:

    function f(b) {
      currentSum += b;
      return f; // <-- does not call itself, returns itself
    }

This `f` will be used in the next call, again return itself, as many times as needed. Then, when used as a number or a string – the `toString` returns the `currentSum`. We could also use `Symbol.toPrimitive` or `valueOf` here for the conversion.

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/XFpaXCfIlo3c6IwB?p=preview)

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
