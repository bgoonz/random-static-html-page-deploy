EN

<!-- -->

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ffetch-abort" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffetch-abort" class="share share_fb"></a>

1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/network" class="breadcrumbs__link"><span>Network requests</span></a></span>

29th January 2021

# Fetch: Abort

As we know, `fetch` returns a promise. And JavaScript generally has no concept of “aborting” a promise. So how can we cancel an ongoing `fetch`? E.g. if the user actions on our site indicate that the `fetch` isn’t needed any more.

There’s a special built-in object for such purposes: `AbortController`. It can be used to abort not only `fetch`, but other asynchronous tasks as well.

The usage is very straightforward:

## <a href="#the-abortcontroller-object" id="the-abortcontroller-object" class="main__anchor">The AbortController object</a>

Create a controller:

    let controller = new AbortController();

A controller is an extremely simple object.

- It has a single method `abort()`,
- And a single property `signal` that allows to set event listeners on it.

When `abort()` is called:

- `controller.signal` emits the `"abort"` event.
- `controller.signal.aborted` property becomes `true`.

Generally, we have two parties in the process:

1.  The one that performs a cancelable operation, it sets a listener on `controller.signal`.
2.  The one that cancels: it calls `controller.abort()` when needed.

Here’s the full example (without `fetch` yet):

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let controller = new AbortController();
    let signal = controller.signal;

    // The party that performs a cancelable operation
    // gets the "signal" object
    // and sets the listener to trigger when controller.abort() is called
    signal.addEventListener('abort', () => alert("abort!"));

    // The other party, that cancels (at any point later):
    controller.abort(); // abort!

    // The event triggers and signal.aborted becomes true
    alert(signal.aborted); // true

As we can see, `AbortController` is just a mean to pass `abort` events when `abort()` is called on it.

We could implement the same kind of event listening in our code on our own, without the `AbortController` object.

But what’s valuable is that `fetch` knows how to work with the `AbortController` object. It’s integrated in it.

## <a href="#using-with-fetch" id="using-with-fetch" class="main__anchor">Using with fetch</a>

To be able to cancel `fetch`, pass the `signal` property of an `AbortController` as a `fetch` option:

    let controller = new AbortController();
    fetch(url, {
      signal: controller.signal
    });

The `fetch` method knows how to work with `AbortController`. It will listen to `abort` events on `signal`.

Now, to abort, call `controller.abort()`:

    controller.abort();

We’re done: `fetch` gets the event from `signal` and aborts the request.

When a fetch is aborted, its promise rejects with an error `AbortError`, so we should handle it, e.g. in `try..catch`.

Here’s the full example with `fetch` aborted after 1 second:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // abort in 1 second
    let controller = new AbortController();
    setTimeout(() => controller.abort(), 1000);

    try {
      let response = await fetch('/article/fetch-abort/demo/hang', {
        signal: controller.signal
      });
    } catch(err) {
      if (err.name == 'AbortError') { // handle abort()
        alert("Aborted!");
      } else {
        throw err;
      }
    }

## <a href="#abortcontroller-is-scalable" id="abortcontroller-is-scalable" class="main__anchor">AbortController is scalable</a>

`AbortController` is scalable. It allows to cancel multiple fetches at once.

Here’s a sketch of code that fetches many `urls` in parallel, and uses a single controller to abort them all:

    let urls = [...]; // a list of urls to fetch in parallel

    let controller = new AbortController();

    // an array of fetch promises
    let fetchJobs = urls.map(url => fetch(url, {
      signal: controller.signal
    }));

    let results = await Promise.all(fetchJobs);

    // if controller.abort() is called from anywhere,
    // it aborts all fetches

If we have our own asynchronous tasks, different from `fetch`, we can use a single `AbortController` to stop those, together with fetches.

We just need to listen to its `abort` event in our tasks:

    let urls = [...];
    let controller = new AbortController();

    let ourJob = new Promise((resolve, reject) => { // our task
      ...
      controller.signal.addEventListener('abort', reject);
    });

    let fetchJobs = urls.map(url => fetch(url, { // fetches
      signal: controller.signal
    }));

    // Wait for fetches and our task in parallel
    let results = await Promise.all([...fetchJobs, ourJob]);

    // if controller.abort() is called from anywhere,
    // it aborts all fetches and ourJob

## <a href="#summary" id="summary" class="main__anchor">Summary</a>

- `AbortController` is a simple object that generates an `abort` event on it’s `signal` property when the `abort()` method is called (and also sets `signal.aborted` to `true`).
- `fetch` integrates with it: we pass the `signal` property as the option, and then `fetch` listens to it, so it’s possible to abort the `fetch`.
- We can use `AbortController` in our code. The "call `abort()`" → “listen to `abort` event” interaction is simple and universal. We can use it even without `fetch`.

<a href="/fetch-progress" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/fetch-crossorigin" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ffetch-abort" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffetch-abort" class="share share_fb"></a>

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

## <a href="#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="/tutorial/map" class="map"></a>

#### Chapter

- <a href="/network" class="sidebar__link">Network requests</a>

#### Lesson navigation

- <a href="#the-abortcontroller-object" class="sidebar__link">The AbortController object</a>
- <a href="#using-with-fetch" class="sidebar__link">Using with fetch</a>
- <a href="#abortcontroller-is-scalable" class="sidebar__link">AbortController is scalable</a>
- <a href="#summary" class="sidebar__link">Summary</a>

- <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ffetch-abort" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffetch-abort" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/5-network/04-fetch-abort" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="/about" class="page-footer__link">about the project</a>
- <a href="/about#contact-us" class="page-footer__link">contact us</a>
- <a href="/terms" class="page-footer__link">terms of usage</a>
- <a href="/privacy" class="page-footer__link">privacy policy</a>
