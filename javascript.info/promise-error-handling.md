EN

<!-- -->

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fpromise-error-handling" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fpromise-error-handling" class="share share_fb"></a>

1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="/async" class="breadcrumbs__link"><span>Promises, async/await</span></a></span>

9th July 2020

# Error handling with promises

Promise chains are great at error handling. When a promise rejects, the control jumps to the closest rejection handler. That’s very convenient in practice.

For instance, in the code below the URL to `fetch` is wrong (no such site) and `.catch` handles the error:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    fetch('https://no-such-server.blabla') // rejects
      .then(response => response.json())
      .catch(err => alert(err)) // TypeError: failed to fetch (the text may vary)

As you can see, the `.catch` doesn’t have to be immediate. It may appear after one or maybe several `.then`.

Or, maybe, everything is all right with the site, but the response is not valid JSON. The easiest way to catch all errors is to append `.catch` to the end of chain:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    fetch('/article/promise-chaining/user.json')
      .then(response => response.json())
      .then(user => fetch(`https://api.github.com/users/${user.name}`))
      .then(response => response.json())
      .then(githubUser => new Promise((resolve, reject) => {
        let img = document.createElement('img');
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
          img.remove();
          resolve(githubUser);
        }, 3000);
      }))
      .catch(error => alert(error.message));

Normally, such `.catch` doesn’t trigger at all. But if any of the promises above rejects (a network problem or invalid json or whatever), then it would catch it.

## <a href="#implicit-try-catch" id="implicit-try-catch" class="main__anchor">Implicit try…catch</a>

The code of a promise executor and promise handlers has an "invisible `try..catch`" around it. If an exception happens, it gets caught and treated as a rejection.

For instance, this code:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    new Promise((resolve, reject) => {
      throw new Error("Whoops!");
    }).catch(alert); // Error: Whoops!

…Works exactly the same as this:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    new Promise((resolve, reject) => {
      reject(new Error("Whoops!"));
    }).catch(alert); // Error: Whoops!

The "invisible `try..catch`" around the executor automatically catches the error and turns it into rejected promise.

This happens not only in the executor function, but in its handlers as well. If we `throw` inside a `.then` handler, that means a rejected promise, so the control jumps to the nearest error handler.

Here’s an example:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    new Promise((resolve, reject) => {
      resolve("ok");
    }).then((result) => {
      throw new Error("Whoops!"); // rejects the promise
    }).catch(alert); // Error: Whoops!

This happens for all errors, not just those caused by the `throw` statement. For example, a programming error:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    new Promise((resolve, reject) => {
      resolve("ok");
    }).then((result) => {
      blabla(); // no such function
    }).catch(alert); // ReferenceError: blabla is not defined

The final `.catch` not only catches explicit rejections, but also accidental errors in the handlers above.

## <a href="#rethrowing" id="rethrowing" class="main__anchor">Rethrowing</a>

As we already noticed, `.catch` at the end of the chain is similar to `try..catch`. We may have as many `.then` handlers as we want, and then use a single `.catch` at the end to handle errors in all of them.

In a regular `try..catch` we can analyze the error and maybe rethrow it if it can’t be handled. The same thing is possible for promises.

If we `throw` inside `.catch`, then the control goes to the next closest error handler. And if we handle the error and finish normally, then it continues to the next closest successful `.then` handler.

In the example below the `.catch` successfully handles the error:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // the execution: catch -> then
    new Promise((resolve, reject) => {

      throw new Error("Whoops!");

    }).catch(function(error) {

      alert("The error is handled, continue normally");

    }).then(() => alert("Next successful handler runs"));

Here the `.catch` block finishes normally. So the next successful `.then` handler is called.

In the example below we see the other situation with `.catch`. The handler `(*)` catches the error and just can’t handle it (e.g. it only knows how to handle `URIError`), so it throws it again:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // the execution: catch -> catch
    new Promise((resolve, reject) => {

      throw new Error("Whoops!");

    }).catch(function(error) { // (*)

      if (error instanceof URIError) {
        // handle it
      } else {
        alert("Can't handle such error");

        throw error; // throwing this or another error jumps to the next catch
      }

    }).then(function() {
      /* doesn't run here */
    }).catch(error => { // (**)

      alert(`The unknown error has occurred: ${error}`);
      // don't return anything => execution goes the normal way

    });

The execution jumps from the first `.catch` `(*)` to the next one `(**)` down the chain.

## <a href="#unhandled-rejections" id="unhandled-rejections" class="main__anchor">Unhandled rejections</a>

What happens when an error is not handled? For instance, we forgot to append `.catch` to the end of the chain, like here:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    new Promise(function() {
      noSuchFunction(); // Error here (no such function)
    })
      .then(() => {
        // successful promise handlers, one or more
      }); // without .catch at the end!

In case of an error, the promise becomes rejected, and the execution should jump to the closest rejection handler. But there is none. So the error gets “stuck”. There’s no code to handle it.

In practice, just like with regular unhandled errors in code, it means that something has gone terribly wrong.

What happens when a regular error occurs and is not caught by `try..catch`? The script dies with a message in the console. A similar thing happens with unhandled promise rejections.

The JavaScript engine tracks such rejections and generates a global error in that case. You can see it in the console if you run the example above.

In the browser we can catch such errors using the event `unhandledrejection`:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    window.addEventListener('unhandledrejection', function(event) {
      // the event object has two special properties:
      alert(event.promise); // [object Promise] - the promise that generated the error
      alert(event.reason); // Error: Whoops! - the unhandled error object
    });

    new Promise(function() {
      throw new Error("Whoops!");
    }); // no catch to handle the error

The event is the part of the [HTML standard](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections).

If an error occurs, and there’s no `.catch`, the `unhandledrejection` handler triggers, and gets the `event` object with the information about the error, so we can do something.

Usually such errors are unrecoverable, so our best way out is to inform the user about the problem and probably report the incident to the server.

In non-browser environments like Node.js there are other ways to track unhandled errors.

## <a href="#summary" id="summary" class="main__anchor">Summary</a>

- `.catch` handles errors in promises of all kinds: be it a `reject()` call, or an error thrown in a handler.
- We should place `.catch` exactly in places where we want to handle errors and know how to handle them. The handler should analyze errors (custom error classes help) and rethrow unknown ones (maybe they are programming mistakes).
- It’s ok not to use `.catch` at all, if there’s no way to recover from an error.
- In any case we should have the `unhandledrejection` event handler (for browsers, and analogs for other environments) to track unhandled errors and inform the user (and probably our server) about them, so that our app never “just dies”.

## <a href="#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="#error-in-settimeout" id="error-in-settimeout" class="main__anchor">Error in setTimeout</a>

<a href="/task/error-async" class="task__open-link"></a>

What do you think? Will the `.catch` trigger? Explain your answer.

    new Promise(function(resolve, reject) {
      setTimeout(() => {
        throw new Error("Whoops!");
      }, 1000);
    }).catch(alert);

solution

The answer is: **no, it won’t**:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    new Promise(function(resolve, reject) {
      setTimeout(() => {
        throw new Error("Whoops!");
      }, 1000);
    }).catch(alert);

As said in the chapter, there’s an "implicit `try..catch`" around the function code. So all synchronous errors are handled.

But here the error is generated not while the executor is running, but later. So the promise can’t handle it.

<a href="/promise-chaining" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/promise-api" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fpromise-error-handling" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fpromise-error-handling" class="share share_fb"></a>

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

## <a href="#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="/tutorial/map" class="map"></a>

#### Chapter

- <a href="/async" class="sidebar__link">Promises, async/await</a>

#### Lesson navigation

- <a href="#implicit-try-catch" class="sidebar__link">Implicit try…catch</a>
- <a href="#rethrowing" class="sidebar__link">Rethrowing</a>
- <a href="#unhandled-rejections" class="sidebar__link">Unhandled rejections</a>
- <a href="#summary" class="sidebar__link">Summary</a>

- <a href="#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fpromise-error-handling" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fpromise-error-handling" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/11-async/04-promise-error-handling" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="/about" class="page-footer__link">about the project</a>
- <a href="/about#contact-us" class="page-footer__link">contact us</a>
- <a href="/terms" class="page-footer__link">terms of usage</a>
- <a href="/privacy" class="page-footer__link">privacy policy</a>
