EN

-   <a href="https://ar.javascript.info/task/dictionary-tostring" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/dictionary-tostring" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/dictionary-tostring" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/dictionary-tostring" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/task/dictionary-tostring" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/dictionary-tostring" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/dictionary-tostring" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/dictionary-tostring" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/dictionary-tostring" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/task/dictionary-tostring" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/dictionary-tostring" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fdictionary-tostring" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fdictionary-tostring" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a>

<a href="/prototypes" class="breadcrumbs__link"><span>Prototypes, inheritance</span></a>

<a href="/prototype-methods" class="breadcrumbs__link"><span>Prototype methods, objects without __proto__</span></a>

<a href="/prototype-methods" class="task-single__back"><span>back to the lesson</span></a>

## Add toString to the dictionary

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There’s an object `dictionary`, created as `Object.create(null)`, to store any `key/value` pairs.

Add method `dictionary.toString()` into it, that should return a comma-delimited list of keys. Your `toString` should not show up in `for..in` over the object.

Here’s how it should work:

    let dictionary = Object.create(null);

    // your code to add dictionary.toString method

    // add some data
    dictionary.apple = "Apple";
    dictionary.__proto__ = "test"; // __proto__ is a regular property key here

    // only apple and __proto__ are in the loop
    for(let key in dictionary) {
      alert(key); // "apple", then "__proto__"
    }

    // your toString in action
    alert(dictionary); // "apple,__proto__"

solution

The method can take all enumerable keys using `Object.keys` and output their list.

To make `toString` non-enumerable, let’s define it using a property descriptor. The syntax of `Object.create` allows us to provide an object with property descriptors as the second argument.

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let dictionary = Object.create(null, {
      toString: { // define toString property
        value() { // the value is a function
          return Object.keys(this).join();
        }
      }
    });

    dictionary.apple = "Apple";
    dictionary.__proto__ = "test";

    // apple and __proto__ is in the loop
    for(let key in dictionary) {
      alert(key); // "apple", then "__proto__"
    }

    // comma-separated list of properties by toString
    alert(dictionary); // "apple,__proto__"

When we create a property using a descriptor, its flags are `false` by default. So in the code above, `dictionary.toString` is non-enumerable.

See the the chapter [Property flags and descriptors](/property-descriptors) for review.

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
