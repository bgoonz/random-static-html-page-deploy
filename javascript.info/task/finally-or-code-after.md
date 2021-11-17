EN

-   <a href="https://ar.javascript.info/task/finally-or-code-after" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/finally-or-code-after" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/finally-or-code-after" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/finally-or-code-after" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/task/finally-or-code-after" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/finally-or-code-after" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/finally-or-code-after" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/finally-or-code-after" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/finally-or-code-after" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/task/finally-or-code-after" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/finally-or-code-after" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Ffinally-or-code-after" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Ffinally-or-code-after" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a>

<a href="/error-handling" class="breadcrumbs__link"><span>Error handling</span></a>

<a href="/try-catch" class="breadcrumbs__link"><span>Error handling, "try...catch"</span></a>

<a href="/try-catch" class="task-single__back"><span>back to the lesson</span></a>

## Finally or just the code?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Compare the two code fragments.

1.  The first one uses `finally` to execute the code after `try...catch`:

        try {
          work work
        } catch (err) {
          handle errors
        } finally {
          cleanup the working space
        }

2.  The second fragment puts the cleaning right after `try...catch`:

        try {
          work work
        } catch (err) {
          handle errors
        }

        cleanup the working space

We definitely need the cleanup after the work, doesn’t matter if there was an error or not.

Is there an advantage here in using `finally` or both code fragments are equal? If there is such an advantage, then give an example when it matters.

solution

The difference becomes obvious when we look at the code inside a function.

The behavior is different if there’s a “jump out” of `try...catch`.

For instance, when there’s a `return` inside `try...catch`. The `finally` clause works in case of *any* exit from `try...catch`, even via the `return` statement: right after `try...catch` is done, but before the calling code gets the control.

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function f() {
      try {
        alert('start');
        return "result";
      } catch (err) {
        /// ...
      } finally {
        alert('cleanup!');
      }
    }

    f(); // cleanup!

…Or when there’s a `throw`, like here:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function f() {
      try {
        alert('start');
        throw new Error("an error");
      } catch (err) {
        // ...
        if("can't handle the error") {
          throw err;
        }

      } finally {
        alert('cleanup!')
      }
    }

    f(); // cleanup!

It’s `finally` that guarantees the cleanup here. If we just put the code at the end of `f`, it wouldn’t run in these situations.

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
