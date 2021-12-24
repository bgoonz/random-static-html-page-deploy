EN

<!-- -->

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fcomments" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcomments" class="share share_fb"></a>

1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="/code-quality" class="breadcrumbs__link"><span>Code quality</span></a></span>

29th February 2020

# Comments

As we know from the chapter [Code structure](/structure), comments can be single-line: starting with `//` and multiline: `/* ... */`.

We normally use them to describe how and why the code works.

At first sight, commenting might be obvious, but novices in programming often use them wrongly.

## <a href="#bad-comments" id="bad-comments" class="main__anchor">Bad comments</a>

Novices tend to use comments to explain “what is going on in the code”. Like this:

    // This code will do this thing (...) and that thing (...)
    // ...and who knows what else...
    very;
    complex;
    code;

But in good code, the amount of such “explanatory” comments should be minimal. Seriously, the code should be easy to understand without them.

There’s a great rule about that: “if the code is so unclear that it requires a comment, then maybe it should be rewritten instead”.

### <a href="#recipe-factor-out-functions" id="recipe-factor-out-functions" class="main__anchor">Recipe: factor out functions</a>

Sometimes it’s beneficial to replace a code piece with a function, like here:

    function showPrimes(n) {
      nextPrime:
      for (let i = 2; i < n; i++) {

        // check if i is a prime number
        for (let j = 2; j < i; j++) {
          if (i % j == 0) continue nextPrime;
        }

        alert(i);
      }
    }

The better variant, with a factored out function `isPrime`:

    function showPrimes(n) {

      for (let i = 2; i < n; i++) {
        if (!isPrime(i)) continue;

        alert(i);
      }
    }

    function isPrime(n) {
      for (let i = 2; i < n; i++) {
        if (n % i == 0) return false;
      }

      return true;
    }

Now we can understand the code easily. The function itself becomes the comment. Such code is called _self-descriptive_.

### <a href="#recipe-create-functions" id="recipe-create-functions" class="main__anchor">Recipe: create functions</a>

And if we have a long “code sheet” like this:

    // here we add whiskey
    for(let i = 0; i < 10; i++) {
      let drop = getWhiskey();
      smell(drop);
      add(drop, glass);
    }

    // here we add juice
    for(let t = 0; t < 3; t++) {
      let tomato = getTomato();
      examine(tomato);
      let juice = press(tomato);
      add(juice, glass);
    }

    // ...

Then it might be a better variant to refactor it into functions like:

    addWhiskey(glass);
    addJuice(glass);

    function addWhiskey(container) {
      for(let i = 0; i < 10; i++) {
        let drop = getWhiskey();
        //...
      }
    }

    function addJuice(container) {
      for(let t = 0; t < 3; t++) {
        let tomato = getTomato();
        //...
      }
    }

Once again, functions themselves tell what’s going on. There’s nothing to comment. And also the code structure is better when split. It’s clear what every function does, what it takes and what it returns.

In reality, we can’t totally avoid “explanatory” comments. There are complex algorithms. And there are smart “tweaks” for purposes of optimization. But generally we should try to keep the code simple and self-descriptive.

## <a href="#good-comments" id="good-comments" class="main__anchor">Good comments</a>

So, explanatory comments are usually bad. Which comments are good?

Describe the architecture  
Provide a high-level overview of components, how they interact, what’s the control flow in various situations… In short – the bird’s eye view of the code. There’s a special language [UML](http://wikipedia.org/wiki/Unified_Modeling_Language) to build high-level architecture diagrams explaining the code. Definitely worth studying.

Document function parameters and usage  
There’s a special syntax [JSDoc](http://en.wikipedia.org/wiki/JSDoc) to document a function: usage, parameters, returned value.

For instance:

    /**
     * Returns x raised to the n-th power.
     *
     * @param {number} x The number to raise.
     * @param {number} n The power, must be a natural number.
     * @return {number} x raised to the n-th power.
     */
    function pow(x, n) {
      ...
    }

Such comments allow us to understand the purpose of the function and use it the right way without looking in its code.

By the way, many editors like [WebStorm](https://www.jetbrains.com/webstorm/) can understand them as well and use them to provide autocomplete and some automatic code-checking.

Also, there are tools like [JSDoc 3](https://github.com/jsdoc3/jsdoc) that can generate HTML-documentation from the comments. You can read more information about JSDoc at <http://usejsdoc.org/>.

Why is the task solved this way?  
What’s written is important. But what’s _not_ written may be even more important to understand what’s going on. Why is the task solved exactly this way? The code gives no answer.

If there are many ways to solve the task, why this one? Especially when it’s not the most obvious one.

Without such comments the following situation is possible:

1.  You (or your colleague) open the code written some time ago, and see that it’s “suboptimal”.
2.  You think: “How stupid I was then, and how much smarter I’m now”, and rewrite using the “more obvious and correct” variant.
3.  …The urge to rewrite was good. But in the process you see that the “more obvious” solution is actually lacking. You even dimly remember why, because you already tried it long ago. You revert to the correct variant, but the time was wasted.

Comments that explain the solution are very important. They help to continue development the right way.

Any subtle features of the code? Where they are used?  
If the code has anything subtle and counter-intuitive, it’s definitely worth commenting.

## <a href="#summary" id="summary" class="main__anchor">Summary</a>

An important sign of a good developer is comments: their presence and even their absence.

Good comments allow us to maintain the code well, come back to it after a delay and use it more effectively.

**Comment this:**

- Overall architecture, high-level view.
- Function usage.
- Important solutions, especially when not immediately obvious.

**Avoid comments:**

- That tell “how code works” and “what it does”.
- Put them in only if it’s impossible to make the code so simple and self-descriptive that it doesn’t require them.

Comments are also used for auto-documenting tools like JSDoc3: they read them and generate HTML-docs (or docs in another format).

<a href="/coding-style" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/ninja-code" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fcomments" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcomments" class="share share_fb"></a>

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

## <a href="#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="/tutorial/map" class="map"></a>

#### Chapter

- <a href="/code-quality" class="sidebar__link">Code quality</a>

#### Lesson navigation

- <a href="#bad-comments" class="sidebar__link">Bad comments</a>
- <a href="#good-comments" class="sidebar__link">Good comments</a>
- <a href="#summary" class="sidebar__link">Summary</a>

- <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fcomments" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fcomments" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/03-code-quality/03-comments" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="/about" class="page-footer__link">about the project</a>
- <a href="/about#contact-us" class="page-footer__link">contact us</a>
- <a href="/terms" class="page-footer__link">terms of usage</a>
- <a href="/privacy" class="page-footer__link">privacy policy</a>
