EN

-   <a href="https://ar.javascript.info/task/style-errors" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/style-errors" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/style-errors" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/style-errors" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/task/style-errors" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/style-errors" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/style-errors" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/style-errors" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/style-errors" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/task/style-errors" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/style-errors" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fstyle-errors" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fstyle-errors" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a>

<a href="/code-quality" class="breadcrumbs__link"><span>Code quality</span></a>

<a href="/coding-style" class="breadcrumbs__link"><span>Coding Style</span></a>

<a href="/coding-style" class="task-single__back"><span>back to the lesson</span></a>

## Bad style

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

What’s wrong with the code style below?

    function pow(x,n)
    {
      let result=1;
      for(let i=0;i<n;i++) {result*=x;}
      return result;
    }

    let x=prompt("x?",''), n=prompt("n?",'')
    if (n<=0)
    {
      alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
    }
    else
    {
      alert(pow(x,n))
    }

Fix it.

solution

You could note the following:

    function pow(x,n)  // <- no space between arguments
    {  // <- figure bracket on a separate line
      let result=1;   // <- no spaces before or after =
      for(let i=0;i<n;i++) {result*=x;}   // <- no spaces
      // the contents of { ... } should be on a new line
      return result;
    }

    let x=prompt("x?",''), n=prompt("n?",'') // <-- technically possible,
    // but better make it 2 lines, also there's no spaces and missing ;
    if (n<=0)  // <- no spaces inside (n <= 0), and should be extra line above it
    {   // <- figure bracket on a separate line
      // below - long lines can be split into multiple lines for improved readability
      alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
    }
    else // <- could write it on a single line like "} else {"
    {
      alert(pow(x,n))  // no spaces and missing ;
    }

The fixed variant:

    function pow(x, n) {
      let result = 1;

      for (let i = 0; i < n; i++) {
        result *= x;
      }

      return result;
    }

    let x = prompt("x?", "");
    let n = prompt("n?", "");

    if (n <= 0) {
      alert(`Power ${n} is not supported,
        please enter an integer number greater than zero`);
    } else {
      alert( pow(x, n) );
    }

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
