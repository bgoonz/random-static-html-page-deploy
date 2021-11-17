EN

-   <a href="https://ar.javascript.info/task/new-object-same-constructor" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/new-object-same-constructor" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/new-object-same-constructor" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/new-object-same-constructor" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/task/new-object-same-constructor" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/new-object-same-constructor" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/new-object-same-constructor" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/new-object-same-constructor" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/new-object-same-constructor" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/task/new-object-same-constructor" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/new-object-same-constructor" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fnew-object-same-constructor" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fnew-object-same-constructor" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a>

<a href="/prototypes" class="breadcrumbs__link"><span>Prototypes, inheritance</span></a>

<a href="/function-prototype" class="breadcrumbs__link"><span>F.prototype</span></a>

<a href="/function-prototype" class="task-single__back"><span>back to the lesson</span></a>

## Create an object with the same constructor

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Imagine, we have an arbitrary object `obj`, created by a constructor function – we don’t know which one, but we’d like to create a new object using it.

Can we do it like that?

    let obj2 = new obj.constructor();

Give an example of a constructor function for `obj` which lets such code work right. And an example that makes it work wrong.

solution

We can use such approach if we are sure that `"constructor"` property has the correct value.

For instance, if we don’t touch the default `"prototype"`, then this code works for sure:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function User(name) {
      this.name = name;
    }

    let user = new User('John');
    let user2 = new user.constructor('Pete');

    alert( user2.name ); // Pete (worked!)

It worked, because `User.prototype.constructor == User`.

…But if someone, so to speak, overwrites `User.prototype` and forgets to recreate `constructor` to reference `User`, then it would fail.

For instance:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function User(name) {
      this.name = name;
    }
    User.prototype = {}; // (*)

    let user = new User('John');
    let user2 = new user.constructor('Pete');

    alert( user2.name ); // undefined

Why `user2.name` is `undefined`?

Here’s how `new user.constructor('Pete')` works:

1.  First, it looks for `constructor` in `user`. Nothing.
2.  Then it follows the prototype chain. The prototype of `user` is `User.prototype`, and it also has no `constructor` (because we “forgot” to set it right!).
3.  Going further up the chain, `User.prototype` is a plain object, its prototype is the built-in `Object.prototype`.
4.  Finally, for the built-in `Object.prototype`, there’s a built-in `Object.prototype.constructor == Object`. So it is used.

Finally, at the end, we have `let user2 = new Object('Pete')`.

Probably, that’s not what we want. We’d like to create `new User`, not `new Object`. That’s the outcome of the missing `constructor`.

(Just in case you’re curious, the `new Object(...)` call converts its argument to an object. That’s a theoretical thing, in practice no one calls `new Object` with a value, and generally we don’t use `new Object` to make objects at all).

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
