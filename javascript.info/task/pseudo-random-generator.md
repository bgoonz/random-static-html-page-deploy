EN

-   <a href="https://ar.javascript.info/task/pseudo-random-generator" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/pseudo-random-generator" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/pseudo-random-generator" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/pseudo-random-generator" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/pseudo-random-generator" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/pseudo-random-generator" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/pseudo-random-generator" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/task/pseudo-random-generator" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/pseudo-random-generator" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fpseudo-random-generator" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fpseudo-random-generator" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a>

<a href="/generators-iterators" class="breadcrumbs__link"><span>Generators, advanced iteration</span></a>

<a href="/generators" class="breadcrumbs__link"><span>Generators</span></a>

<a href="/generators" class="task-single__back"><span>back to the lesson</span></a>

## Pseudo-random generator

There are many areas where we need random data.

One of them is testing. We may need random data: text, numbers, etc. to test things out well.

In JavaScript, we could use `Math.random()`. But if something goes wrong, we’d like to be able to repeat the test, using exactly the same data.

For that, so called “seeded pseudo-random generators” are used. They take a “seed”, the first value, and then generate the next ones using a formula so that the same seed yields the same sequence, and hence the whole flow is easily reproducible. We only need to remember the seed to repeat it.

An example of such formula, that generates somewhat uniformly distributed values:

    next = previous * 16807 % 2147483647

If we use `1` as the seed, the values will be:

1.  `16807`
2.  `282475249`
3.  `1622650073`
4.  …and so on…

The task is to create a generator function `pseudoRandom(seed)` that takes `seed` and creates the generator with this formula.

Usage example:

    let generator = pseudoRandom(1);

    alert(generator.next().value); // 16807
    alert(generator.next().value); // 282475249
    alert(generator.next().value); // 1622650073

[Open a sandbox with tests.](https://plnkr.co/edit/kOtrsvIqz7nbmz2b?p=preview)

solution

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function* pseudoRandom(seed) {
      let value = seed;

      while(true) {
        value = value * 16807 % 2147483647
        yield value;
      }

    };

    let generator = pseudoRandom(1);

    alert(generator.next().value); // 16807
    alert(generator.next().value); // 282475249
    alert(generator.next().value); // 1622650073

Please note, the same can be done with a regular function, like this:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function pseudoRandom(seed) {
      let value = seed;

      return function() {
        value = value * 16807 % 2147483647;
        return value;
      }
    }

    let generator = pseudoRandom(1);

    alert(generator()); // 16807
    alert(generator()); // 282475249
    alert(generator()); // 1622650073

That also works. But then we lose ability to iterate with `for..of` and to use generator composition, that may be useful elsewhere.

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/TeK9a1txAdOhsWUb?p=preview)

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
