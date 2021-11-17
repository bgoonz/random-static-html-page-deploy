EN

-   <a href="https://ar.javascript.info/task/fibonacci-numbers" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/fibonacci-numbers" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/fibonacci-numbers" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/fibonacci-numbers" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/task/fibonacci-numbers" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/fibonacci-numbers" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/fibonacci-numbers" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/fibonacci-numbers" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/fibonacci-numbers" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/task/fibonacci-numbers" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/fibonacci-numbers" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Ffibonacci-numbers" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Ffibonacci-numbers" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a>

<a href="/advanced-functions" class="breadcrumbs__link"><span>Advanced working with functions</span></a>

<a href="/recursion" class="breadcrumbs__link"><span>Recursion and stack</span></a>

<a href="/recursion" class="task-single__back"><span>back to the lesson</span></a>

## Fibonacci numbers

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

The sequence of [Fibonacci numbers](https://en.wikipedia.org/wiki/Fibonacci_number) has the formula `Fn = Fn-1 + Fn-2`. In other words, the next number is a sum of the two preceding ones.

First two numbers are `1`, then `2(1+1)`, then `3(1+2)`, `5(2+3)` and so on: `1, 1, 2, 3, 5, 8, 13, 21...`.

Fibonacci numbers are related to the [Golden ratio](https://en.wikipedia.org/wiki/Golden_ratio) and many natural phenomena around us.

Write a function `fib(n)` that returns the `n-th` Fibonacci number.

An example of work:

    function fib(n) { /* your code */ }

    alert(fib(3)); // 2
    alert(fib(7)); // 13
    alert(fib(77)); // 5527939700884757

P.S. The function should be fast. The call to `fib(77)` should take no more than a fraction of a second.

solution

The first solution we could try here is the recursive one.

Fibonacci numbers are recursive by definition:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function fib(n) {
      return n <= 1 ? n : fib(n - 1) + fib(n - 2);
    }

    alert( fib(3) ); // 2
    alert( fib(7) ); // 13
    // fib(77); // will be extremely slow!

…But for big values of `n` it’s very slow. For instance, `fib(77)` may hang up the engine for some time eating all CPU resources.

That’s because the function makes too many subcalls. The same values are re-evaluated again and again.

For instance, let’s see a piece of calculations for `fib(5)`:

    ...
    fib(5) = fib(4) + fib(3)
    fib(4) = fib(3) + fib(2)
    ...

Here we can see that the value of `fib(3)` is needed for both `fib(5)` and `fib(4)`. So `fib(3)` will be called and evaluated two times completely independently.

Here’s the full recursion tree:

<figure><img src="/task/fibonacci-numbers/fibonacci-recursion-tree.svg" width="640" height="225" /></figure>

We can clearly notice that `fib(3)` is evaluated two times and `fib(2)` is evaluated three times. The total amount of computations grows much faster than `n`, making it enormous even for `n=77`.

We can optimize that by remembering already-evaluated values: if a value of say `fib(3)` is calculated once, then we can just reuse it in future computations.

Another variant would be to give up recursion and use a totally different loop-based algorithm.

Instead of going from `n` down to lower values, we can make a loop that starts from `1` and `2`, then gets `fib(3)` as their sum, then `fib(4)` as the sum of two previous values, then `fib(5)` and goes up and up, till it gets to the needed value. On each step we only need to remember two previous values.

Here are the steps of the new algorithm in details.

The start:

    // a = fib(1), b = fib(2), these values are by definition 1
    let a = 1, b = 1;

    // get c = fib(3) as their sum
    let c = a + b;

    /* we now have fib(1), fib(2), fib(3)
    a  b  c
    1, 1, 2
    */

Now we want to get `fib(4) = fib(2) + fib(3)`.

Let’s shift the variables: `a,b` will get `fib(2),fib(3)`, and `c` will get their sum:

    a = b; // now a = fib(2)
    b = c; // now b = fib(3)
    c = a + b; // c = fib(4)

    /* now we have the sequence:
       a  b  c
    1, 1, 2, 3
    */

The next step gives another sequence number:

    a = b; // now a = fib(3)
    b = c; // now b = fib(4)
    c = a + b; // c = fib(5)

    /* now the sequence is (one more number):
          a  b  c
    1, 1, 2, 3, 5
    */

…And so on until we get the needed value. That’s much faster than recursion and involves no duplicate computations.

The full code:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function fib(n) {
      let a = 1;
      let b = 1;
      for (let i = 3; i <= n; i++) {
        let c = a + b;
        a = b;
        b = c;
      }
      return b;
    }

    alert( fib(3) ); // 2
    alert( fib(7) ); // 13
    alert( fib(77) ); // 5527939700884757

The loop starts with `i=3`, because the first and the second sequence values are hard-coded into variables `a=1`, `b=1`.

The approach is called [dynamic programming bottom-up](https://en.wikipedia.org/wiki/Dynamic_programming).

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
