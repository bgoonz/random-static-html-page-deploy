EN

-   <a href="https://ar.javascript.info/task/class-extend-object" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/class-extend-object" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/class-extend-object" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/class-extend-object" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/task/class-extend-object" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/class-extend-object" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/class-extend-object" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/class-extend-object" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/class-extend-object" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fclass-extend-object" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fclass-extend-object" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a>

<a href="/classes" class="breadcrumbs__link"><span>Classes</span></a>

<a href="/static-properties-methods" class="breadcrumbs__link"><span>Static properties and methods</span></a>

<a href="/static-properties-methods" class="task-single__back"><span>back to the lesson</span></a>

## Class extends Object?

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 3</span>

As we know, all objects normally inherit from `Object.prototype` and get access to “generic” object methods like `hasOwnProperty` etc.

For instance:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Rabbit {
      constructor(name) {
        this.name = name;
      }
    }

    let rabbit = new Rabbit("Rab");

    // hasOwnProperty method is from Object.prototype
    alert( rabbit.hasOwnProperty('name') ); // true

But if we spell it out explicitly like `"class Rabbit extends Object"`, then the result would be different from a simple `"class Rabbit"`?

What’s the difference?

Here’s an example of such code (it doesn’t work – why? fix it?):

    class Rabbit extends Object {
      constructor(name) {
        this.name = name;
      }
    }

    let rabbit = new Rabbit("Rab");

    alert( rabbit.hasOwnProperty('name') ); // Error

solution

First, let’s see why the latter code doesn’t work.

The reason becomes obvious if we try to run it. An inheriting class constructor must call `super()`. Otherwise `"this"` won’t be “defined”.

So here’s the fix:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Rabbit extends Object {
      constructor(name) {
        super(); // need to call the parent constructor when inheriting
        this.name = name;
      }
    }

    let rabbit = new Rabbit("Rab");

    alert( rabbit.hasOwnProperty('name') ); // true

But that’s not all yet.

Even after the fix, there’s still important difference in `"class Rabbit extends Object"` versus `class Rabbit`.

As we know, the “extends” syntax sets up two prototypes:

1.  Between `"prototype"` of the constructor functions (for methods).
2.  Between the constructor functions themselves (for static methods).

In our case, for `class Rabbit extends Object` it means:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Rabbit extends Object {}

    alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
    alert( Rabbit.__proto__ === Object ); // (2) true

So `Rabbit` now provides access to static methods of `Object` via `Rabbit`, like this:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Rabbit extends Object {}

    // normally we call Object.getOwnPropertyNames
    alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // a,b

But if we don’t have `extends Object`, then `Rabbit.__proto__` is not set to `Object`.

Here’s the demo:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class Rabbit {}

    alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
    alert( Rabbit.__proto__ === Object ); // (2) false (!)
    alert( Rabbit.__proto__ === Function.prototype ); // as any function by default

    // error, no such function in Rabbit
    alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // Error

So `Rabbit` doesn’t provide access to static methods of `Object` in that case.

By the way, `Function.prototype` has “generic” function methods, like `call`, `bind` etc. They are ultimately available in both cases, because for the built-in `Object` constructor, `Object.__proto__ === Function.prototype`.

Here’s the picture:

<figure><img src="/task/class-extend-object/rabbit-extends-object.svg" width="458" height="344" /></figure>

So, to put it short, there are two differences:

<table><thead><tr class="header"><th>class Rabbit</th><th>class Rabbit extends Object</th></tr></thead><tbody><tr class="odd"><td>–</td><td>needs to call <code>super()</code> in constructor</td></tr><tr class="even"><td><code>Rabbit.__proto__ === Function.prototype</code></td><td><code>Rabbit.__proto__ === Object</code></td></tr></tbody></table>

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
