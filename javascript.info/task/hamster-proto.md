EN

-   <a href="https://ar.javascript.info/task/hamster-proto" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/hamster-proto" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/hamster-proto" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/hamster-proto" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/task/hamster-proto" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/hamster-proto" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/hamster-proto" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/hamster-proto" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/hamster-proto" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/task/hamster-proto" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/hamster-proto" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fhamster-proto" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fhamster-proto" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a>

<a href="/prototypes" class="breadcrumbs__link"><span>Prototypes, inheritance</span></a>

<a href="/prototype-inheritance" class="breadcrumbs__link"><span>Prototypal inheritance</span></a>

<a href="/prototype-inheritance" class="task-single__back"><span>back to the lesson</span></a>

## Why are both hamsters full?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

We have two hamsters: `speedy` and `lazy` inheriting from the general `hamster` object.

When we feed one of them, the other one is also full. Why? How can we fix it?

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let hamster = {
      stomach: [],

      eat(food) {
        this.stomach.push(food);
      }
    };

    let speedy = {
      __proto__: hamster
    };

    let lazy = {
      __proto__: hamster
    };

    // This one found the food
    speedy.eat("apple");
    alert( speedy.stomach ); // apple

    // This one also has it, why? fix please.
    alert( lazy.stomach ); // apple

solution

Let’s look carefully at what’s going on in the call `speedy.eat("apple")`.

1.  The method `speedy.eat` is found in the prototype (`=hamster`), then executed with `this=speedy` (the object before the dot).

2.  Then `this.stomach.push()` needs to find `stomach` property and call `push` on it. It looks for `stomach` in `this` (`=speedy`), but nothing found.

3.  Then it follows the prototype chain and finds `stomach` in `hamster`.

4.  Then it calls `push` on it, adding the food into *the stomach of the prototype*.

So all hamsters share a single stomach!

Both for `lazy.stomach.push(...)` and `speedy.stomach.push()`, the property `stomach` is found in the prototype (as it’s not in the object itself), then the new data is pushed into it.

Please note that such thing doesn’t happen in case of a simple assignment `this.stomach=`:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let hamster = {
      stomach: [],

      eat(food) {
        // assign to this.stomach instead of this.stomach.push
        this.stomach = [food];
      }
    };

    let speedy = {
       __proto__: hamster
    };

    let lazy = {
      __proto__: hamster
    };

    // Speedy one found the food
    speedy.eat("apple");
    alert( speedy.stomach ); // apple

    // Lazy one's stomach is empty
    alert( lazy.stomach ); // <nothing>

Now all works fine, because `this.stomach=` does not perform a lookup of `stomach`. The value is written directly into `this` object.

Also we can totally avoid the problem by making sure that each hamster has their own stomach:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let hamster = {
      stomach: [],

      eat(food) {
        this.stomach.push(food);
      }
    };

    let speedy = {
      __proto__: hamster,
      stomach: []
    };

    let lazy = {
      __proto__: hamster,
      stomach: []
    };

    // Speedy one found the food
    speedy.eat("apple");
    alert( speedy.stomach ); // apple

    // Lazy one's stomach is empty
    alert( lazy.stomach ); // <nothing>

As a common solution, all properties that describe the state of a particular object, like `stomach` above, should be written into that object. That prevents such problems.

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
