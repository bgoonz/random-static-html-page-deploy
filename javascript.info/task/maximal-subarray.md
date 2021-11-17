EN

-   <a href="https://ar.javascript.info/task/maximal-subarray" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/maximal-subarray" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/maximal-subarray" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/maximal-subarray" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/task/maximal-subarray" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/maximal-subarray" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/maximal-subarray" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/maximal-subarray" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/maximal-subarray" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/task/maximal-subarray" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/maximal-subarray" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fmaximal-subarray" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fmaximal-subarray" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a>

<a href="/data-types" class="breadcrumbs__link"><span>Data types</span></a>

<a href="/array" class="breadcrumbs__link"><span>Arrays</span></a>

<a href="/array" class="task-single__back"><span>back to the lesson</span></a>

## A maximal subarray

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 2</span>

The input is an array of numbers, e.g. `arr = [1, -2, 3, 4, -9, 6]`.

The task is: find the contiguous subarray of `arr` with the maximal sum of items.

Write the function `getMaxSubSum(arr)` that will return that sum.

For instance:

    getMaxSubSum([-1, 2, 3, -9]) == 5 (the sum of highlighted items)
    getMaxSubSum([2, -1, 2, 3, -9]) == 6
    getMaxSubSum([-1, 2, 3, -9, 11]) == 11
    getMaxSubSum([-2, -1, 1, 2]) == 3
    getMaxSubSum([100, -9, 2, -3, 5]) == 100
    getMaxSubSum([1, 2, 3]) == 6 (take all)

If all items are negative, it means that we take none (the subarray is empty), so the sum is zero:

    getMaxSubSum([-1, -2, -3]) = 0

Please try to think of a fast solution: [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation) or even O(n) if you can.

[Open a sandbox with tests.](https://plnkr.co/edit/9NtFhk2wzQA1K6JA?p=preview)

solution

Slow solution

#### Slow solution

We can calculate all possible subsums.

The simplest way is to take every element and calculate sums of all subarrays starting from it.

For instance, for `[-1, 2, 3, -9, 11]`:

    // Starting from -1:
    -1
    -1 + 2
    -1 + 2 + 3
    -1 + 2 + 3 + (-9)
    -1 + 2 + 3 + (-9) + 11

    // Starting from 2:
    2
    2 + 3
    2 + 3 + (-9)
    2 + 3 + (-9) + 11

    // Starting from 3:
    3
    3 + (-9)
    3 + (-9) + 11

    // Starting from -9
    -9
    -9 + 11

    // Starting from 11
    11

The code is actually a nested loop: the external loop over array elements, and the internal counts subsums starting with the current element.

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function getMaxSubSum(arr) {
      let maxSum = 0; // if we take no elements, zero will be returned

      for (let i = 0; i < arr.length; i++) {
        let sumFixedStart = 0;
        for (let j = i; j < arr.length; j++) {
          sumFixedStart += arr[j];
          maxSum = Math.max(maxSum, sumFixedStart);
        }
      }

      return maxSum;
    }

    alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
    alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
    alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
    alert( getMaxSubSum([1, 2, 3]) ); // 6
    alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100

The solution has a time complexity of [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Big_O_notation). In other words, if we increase the array size 2 times, the algorithm will work 4 times longer.

For big arrays (1000, 10000 or more items) such algorithms can lead to a serious sluggishness.

Fast solution

#### Fast solution

Let’s walk the array and keep the current partial sum of elements in the variable `s`. If `s` becomes negative at some point, then assign `s=0`. The maximum of all such `s` will be the answer.

If the description is too vague, please see the code, it’s short enough:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function getMaxSubSum(arr) {
      let maxSum = 0;
      let partialSum = 0;

      for (let item of arr) { // for each item of arr
        partialSum += item; // add it to partialSum
        maxSum = Math.max(maxSum, partialSum); // remember the maximum
        if (partialSum < 0) partialSum = 0; // zero if negative
      }

      return maxSum;
    }

    alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
    alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
    alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
    alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
    alert( getMaxSubSum([1, 2, 3]) ); // 6
    alert( getMaxSubSum([-1, -2, -3]) ); // 0

The algorithm requires exactly 1 array pass, so the time complexity is O(n).

You can find more detail information about the algorithm here: [Maximum subarray problem](http://en.wikipedia.org/wiki/Maximum_subarray_problem). If it’s still not obvious why that works, then please trace the algorithm on the examples above, see how it works, that’s better than any words.

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/qpfzkoPs87WfkOJ6?p=preview)

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
