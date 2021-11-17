EN


<!-- -->


We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!



Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fforms-submit" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fforms-submit" class="share share_fb"></a>


1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/ui" class="breadcrumbs__link"><span>Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="/forms-controls" class="breadcrumbs__link"><span>Forms, controls</span></a></span>

3rd July 2019

# Forms: event and method submit

The `submit` event triggers when the form is submitted, it is usually used to validate the form before sending it to the server or to abort the submission and process it in JavaScript.

The method `form.submit()` allows to initiate form sending from JavaScript. We can use it to dynamically create and send our own forms to server.

Let’s see more details of them.

## <a href="#event-submit" id="event-submit" class="main__anchor">Event: submit</a>

There are two main ways to submit a form:

1.  The first – to click `<input type="submit">` or `<input type="image">`.
2.  The second – press <span class="kbd shortcut">Enter</span> on an input field.

Both actions lead to `submit` event on the form. The handler can check the data, and if there are errors, show them and call `event.preventDefault()`, then the form won’t be sent to the server.

In the form below:

1.  Go into the text field and press <span class="kbd shortcut">Enter</span>.
2.  Click `<input type="submit">`.

Both actions show `alert` and the form is not sent anywhere due to `return false`:

    <form onsubmit="alert('submit!');return false">
      First: Enter in the input field <input type="text" value="text"><br>
      Second: Click "submit": <input type="submit" value="Submit">
    </form>

<span class="important__type">Relation between `submit` and `click`</span>

When a form is sent using <span class="kbd shortcut">Enter</span> on an input field, a `click` event triggers on the `<input type="submit">`.

That’s rather funny, because there was no click at all.

Here’s the demo:

    <form onsubmit="return false">
     <input type="text" size="30" value="Focus here and press enter">
     <input type="submit" value="Submit" onclick="alert('click')">
    </form>

## <a href="#method-submit" id="method-submit" class="main__anchor">Method: submit</a>

To submit a form to the server manually, we can call `form.submit()`.

Then the `submit` event is not generated. It is assumed that if the programmer calls `form.submit()`, then the script already did all related processing.

Sometimes that’s used to manually create and send a form, like this:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let form = document.createElement('form');
    form.action = 'https://google.com/search';
    form.method = 'GET';

    form.innerHTML = '<input name="q" value="test">';

    // the form must be in the document to submit it
    document.body.append(form);

    form.submit();

## <a href="#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="#modal-form" id="modal-form" class="main__anchor">Modal form</a>

<a href="/task/modal-dialog" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a function `showPrompt(html, callback)` that shows a form with the message `html`, an input field and buttons `OK/CANCEL`.

-   A user should type something into a text field and press <span class="kbd shortcut">Enter</span> or the OK button, then `callback(value)` is called with the value they entered.
-   Otherwise if the user presses <span class="kbd shortcut">Esc</span> or CANCEL, then `callback(null)` is called.

In both cases that ends the input process and removes the form.

Requirements:

-   The form should be in the center of the window.
-   The form is *modal*. In other words, no interaction with the rest of the page is possible until the user closes it.
-   When the form is shown, the focus should be inside the `<input>` for the user.
-   Keys <span class="kbd shortcut">Tab</span>/<span class="kbd shortcut">Shift<span class="shortcut__plus">+</span>Tab</span> should shift the focus between form fields, don’t allow it to leave for other page elements.

Usage example:

    showPrompt("Enter something<br>...smart :)", function(value) {
      alert(value);
    });

A demo in the iframe:

## Click the button below

P.S. The source document has HTML/CSS for the form with fixed positioning, but it’s up to you to make it modal.

[Open a sandbox for the task.](https://plnkr.co/edit/uZtz29nBZSMuAixB?p=preview)

solution

A modal window can be implemented using a half-transparent `<div id="cover-div">` that covers the whole window, like this:

    #cover-div {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9000;
      width: 100%;
      height: 100%;
      background-color: gray;
      opacity: 0.3;
    }

Because the `<div>` covers everything, it gets all clicks, not the page below it.

Also we can prevent page scroll by setting `body.style.overflowY='hidden'`.

The form should be not in the `<div>`, but next to it, because we don’t want it to have `opacity`.

[Open the solution in a sandbox.](https://plnkr.co/edit/RYj0BZzi9FSEyTy0?p=preview)

<a href="/events-change-input" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/loading" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fforms-submit" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fforms-submit" class="share share_fb"></a>

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

## <a href="#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

-   If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
-   If you can't understand something in the article – please elaborate.
-   To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="/tutorial/map" class="map"></a>

#### Chapter

-   <a href="/forms-controls" class="sidebar__link">Forms, controls</a>

#### Lesson navigation

-   <a href="#event-submit" class="sidebar__link">Event: submit</a>
-   <a href="#method-submit" class="sidebar__link">Method: submit</a>

-   <a href="#tasks" class="sidebar__link">Tasks (1)</a>
-   <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fforms-submit" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fforms-submit" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/4-forms-controls/4-forms-submit" class="sidebar__link">Edit on GitHub</a>

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
