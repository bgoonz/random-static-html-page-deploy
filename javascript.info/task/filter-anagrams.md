EN

-   <a href="https://ar.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/filter-anagrams" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/filter-anagrams" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/filter-anagrams" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/task/filter-anagrams" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/filter-anagrams" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/filter-anagrams" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/filter-anagrams" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/filter-anagrams" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/filter-anagrams" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Ffilter-anagrams" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Ffilter-anagrams" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a>

<a href="/data-types" class="breadcrumbs__link"><span>Data types</span></a>

<a href="/map-set" class="breadcrumbs__link"><span>Map and Set</span></a>

<a href="/map-set" class="task-single__back"><span>back to the lesson</span></a>

## Filter anagrams

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

[Anagrams](https://en.wikipedia.org/wiki/Anagram) are words that have the same number of same letters, but in different order.

For instance:

    nap - pan
    ear - are - era
    cheaters - hectares - teachers

Write a function `aclean(arr)` that returns an array cleaned from anagrams.

For instance:

    let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

    alert( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"

From every anagram group should remain only one word, no matter which one.

[Open a sandbox with tests.](https://plnkr.co/edit/ZHonRzFbNMH8iQi6?p=preview)

solution

To find all anagrams, let’s split every word to letters and sort them. When letter-sorted, all anagrams are same.

For instance:

    nap, pan -> anp
    ear, era, are -> aer
    cheaters, hectares, teachers -> aceehrst
    ...

We’ll use the letter-sorted variants as map keys to store only one value per each key:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function aclean(arr) {
      let map = new Map();

      for (let word of arr) {
        // split the word by letters, sort them and join back
        let sorted = word.toLowerCase().split('').sort().join(''); // (*)
        map.set(sorted, word);
      }

      return Array.from(map.values());
    }

    let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

    alert( aclean(arr) );

Letter-sorting is done by the chain of calls in the line `(*)`.

For convenience let’s split it into multiple lines:

    let sorted = word // PAN
      .toLowerCase() // pan
      .split('') // ['p','a','n']
      .sort() // ['a','n','p']
      .join(''); // anp

Two different words `'PAN'` and `'nap'` receive the same letter-sorted form `'anp'`.

The next line put the word into the map:

    map.set(sorted, word);

If we ever meet a word the same letter-sorted form again, then it would overwrite the previous value with the same key in the map. So we’ll always have at maximum one word per letter-form.

At the end `Array.from(map.values())` takes an iterable over map values (we don’t need keys in the result) and returns an array of them.

Here we could also use a plain object instead of the `Map`, because keys are strings.

That’s how the solution can look:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function aclean(arr) {
      let obj = {};

      for (let i = 0; i < arr.length; i++) {
        let sorted = arr[i].toLowerCase().split("").sort().join("");
        obj[sorted] = arr[i];
      }

      return Object.values(obj);
    }

    let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

    alert( aclean(arr) );

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/RvzgJ479VAmbVeTQ?p=preview)

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
