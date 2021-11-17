EN


<!-- -->


We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!



Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fextend-natives" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fextend-natives" class="share share_fb"></a>


1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="/classes" class="breadcrumbs__link"><span>Classes</span></a></span>

23rd October 2019

# Extending built-in classes

Built-in classes like Array, Map and others are extendable also.

For instance, here `PowerArray` inherits from the native `Array`:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // add one more method to it (can do more)
    class PowerArray extends Array {
      isEmpty() {
        return this.length === 0;
      }
    }

    let arr = new PowerArray(1, 2, 5, 10, 50);
    alert(arr.isEmpty()); // false

    let filteredArr = arr.filter(item => item >= 10);
    alert(filteredArr); // 10, 50
    alert(filteredArr.isEmpty()); // false

Please note a very interesting thing. Built-in methods like `filter`, `map` and others – return new objects of exactly the inherited type `PowerArray`. Their internal implementation uses the object’s `constructor` property for that.

In the example above,

    arr.constructor === PowerArray

When `arr.filter()` is called, it internally creates the new array of results using exactly `arr.constructor`, not basic `Array`. That’s actually very cool, because we can keep using `PowerArray` methods further on the result.

Even more, we can customize that behavior.

We can add a special static getter `Symbol.species` to the class. If it exists, it should return the constructor that JavaScript will use internally to create new entities in `map`, `filter` and so on.

If we’d like built-in methods like `map` or `filter` to return regular arrays, we can return `Array` in `Symbol.species`, like here:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class PowerArray extends Array {
      isEmpty() {
        return this.length === 0;
      }

      // built-in methods will use this as the constructor
      static get [Symbol.species]() {
        return Array;
      }
    }

    let arr = new PowerArray(1, 2, 5, 10, 50);
    alert(arr.isEmpty()); // false

    // filter creates new array using arr.constructor[Symbol.species] as constructor
    let filteredArr = arr.filter(item => item >= 10);

    // filteredArr is not PowerArray, but Array
    alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function

As you can see, now `.filter` returns `Array`. So the extended functionality is not passed any further.

<span class="important__type">Other collections work similarly</span>

Other collections, such as `Map` and `Set`, work alike. They also use `Symbol.species`.

## <a href="#no-static-inheritance-in-built-ins" id="no-static-inheritance-in-built-ins" class="main__anchor">No static inheritance in built-ins</a>

Built-in objects have their own static methods, for instance `Object.keys`, `Array.isArray` etc.

As we already know, native classes extend each other. For instance, `Array` extends `Object`.

Normally, when one class extends another, both static and non-static methods are inherited. That was thoroughly explained in the article [Static properties and methods](/static-properties-methods#statics-and-inheritance).

But built-in classes are an exception. They don’t inherit statics from each other.

For example, both `Array` and `Date` inherit from `Object`, so their instances have methods from `Object.prototype`. But `Array.[[Prototype]]` does not reference `Object`, so there’s no, for instance, `Array.keys()` (or `Date.keys()`) static method.

Here’s the picture structure for `Date` and `Object`:

<figure><img src="/article/extend-natives/object-date-inheritance.svg" width="503" height="370" /></figure>

As you can see, there’s no link between `Date` and `Object`. They are independent, only `Date.prototype` inherits from `Object.prototype`.

That’s an important difference of inheritance between built-in objects compared to what we get with `extends`.

<a href="/private-protected-properties-methods" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/instanceof" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fextend-natives" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fextend-natives" class="share share_fb"></a>

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

## <a href="#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

-   If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
-   If you can't understand something in the article – please elaborate.
-   To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="/tutorial/map" class="map"></a>

#### Chapter

-   <a href="/classes" class="sidebar__link">Classes</a>

#### Lesson navigation

-   <a href="#no-static-inheritance-in-built-ins" class="sidebar__link">No static inheritance in built-ins</a>

-   <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fextend-natives" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fextend-natives" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/09-classes/05-extend-natives" class="sidebar__link">Edit on GitHub</a>

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
