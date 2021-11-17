EN

-   <a href="https://ar.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/pow-test-wrong" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/pow-test-wrong" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/pow-test-wrong" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/task/pow-test-wrong" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/pow-test-wrong" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/pow-test-wrong" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/pow-test-wrong" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/pow-test-wrong" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/task/pow-test-wrong" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/pow-test-wrong" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fpow-test-wrong" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fpow-test-wrong" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a>

<a href="/code-quality" class="breadcrumbs__link"><span>Code quality</span></a>

<a href="/testing-mocha" class="breadcrumbs__link"><span>Automated testing with Mocha</span></a>

<a href="/testing-mocha" class="task-single__back"><span>back to the lesson</span></a>

## What's wrong in the test?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

What’s wrong in the test of `pow` below?

    it("Raises x to the power n", function() {
      let x = 5;

      let result = x;
      assert.equal(pow(x, 1), result);

      result *= x;
      assert.equal(pow(x, 2), result);

      result *= x;
      assert.equal(pow(x, 3), result);
    });

P.S. Syntactically the test is correct and passes.

solution

The test demonstrates one of the temptations a developer meets when writing tests.

What we have here is actually 3 tests, but layed out as a single function with 3 asserts.

Sometimes it’s easier to write this way, but if an error occurs, it’s much less obvious what went wrong.

If an error happens in the middle of a complex execution flow, then we’ll have to figure out the data at that point. We’ll actually have to *debug the test*.

It would be much better to break the test into multiple `it` blocks with clearly written inputs and outputs.

Like this:

    describe("Raises x to power n", function() {
      it("5 in the power of 1 equals 5", function() {
        assert.equal(pow(5, 1), 5);
      });

      it("5 in the power of 2 equals 25", function() {
        assert.equal(pow(5, 2), 25);
      });

      it("5 in the power of 3 equals 125", function() {
        assert.equal(pow(5, 3), 125);
      });
    });

We replaced the single `it` with `describe` and a group of `it` blocks. Now if something fails we would see clearly what the data was.

Also we can isolate a single test and run it in standalone mode by writing `it.only` instead of `it`:

    describe("Raises x to power n", function() {
      it("5 in the power of 1 equals 5", function() {
        assert.equal(pow(5, 1), 5);
      });

      // Mocha will run only this block
      it.only("5 in the power of 2 equals 25", function() {
        assert.equal(pow(5, 2), 25);
      });

      it("5 in the power of 3 equals 125", function() {
        assert.equal(pow(5, 3), 125);
      });
    });

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
