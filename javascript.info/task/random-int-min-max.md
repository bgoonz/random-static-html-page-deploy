EN

-   <a href="https://ar.javascript.info/task/random-int-min-max" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/random-int-min-max" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/random-int-min-max" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/random-int-min-max" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/task/random-int-min-max" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/random-int-min-max" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/random-int-min-max" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/random-int-min-max" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/task/random-int-min-max" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/random-int-min-max" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Frandom-int-min-max" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Frandom-int-min-max" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a>

<a href="/data-types" class="breadcrumbs__link"><span>Data types</span></a>

<a href="/number" class="breadcrumbs__link"><span>Numbers</span></a>

<a href="/number" class="task-single__back"><span>back to the lesson</span></a>

## A random integer from min to max

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 2</span>

Create a function `randomInteger(min, max)` that generates a random *integer* number from `min` to `max` including both `min` and `max` as possible values.

Any number from the interval `min..max` must appear with the same probability.

Examples of its work:

    alert( randomInteger(1, 5) ); // 1
    alert( randomInteger(1, 5) ); // 3
    alert( randomInteger(1, 5) ); // 5

You can use the solution of the [previous task](/task/random-min-max) as the base.

solution

The simple but wrong solution

#### The simple but wrong solution

The simplest, but wrong solution would be to generate a value from `min` to `max` and round it:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function randomInteger(min, max) {
      let rand = min + Math.random() * (max - min);
      return Math.round(rand);
    }

    alert( randomInteger(1, 3) );

The function works, but it is incorrect. The probability to get edge values `min` and `max` is two times less than any other.

If you run the example above many times, you would easily see that `2` appears the most often.

That happens because `Math.round()` gets random numbers from the interval `1..3` and rounds them as follows:

    values from 1    ... to 1.4999999999  become 1
    values from 1.5  ... to 2.4999999999  become 2
    values from 2.5  ... to 2.9999999999  become 3

Now we can clearly see that `1` gets twice less values than `2`. And the same with `3`.

The correct solution

#### The correct solution

There are many correct solutions to the task. One of them is to adjust interval borders. To ensure the same intervals, we can generate values from `0.5 to 3.5`, thus adding the required probabilities to the edges:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function randomInteger(min, max) {
      // now rand is from  (min-0.5) to (max+0.5)
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    }

    alert( randomInteger(1, 3) );

An alternative way could be to use `Math.floor` for a random number from `min` to `max+1`:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function randomInteger(min, max) {
      // here rand is from min to (max+1)
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }

    alert( randomInteger(1, 3) );

Now all intervals are mapped this way:

    values from 1  ... to 1.9999999999  become 1
    values from 2  ... to 2.9999999999  become 2
    values from 3  ... to 3.9999999999  become 3

All intervals have the same length, making the final distribution uniform.

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
