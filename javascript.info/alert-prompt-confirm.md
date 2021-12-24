EN

<!-- -->

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Falert-prompt-confirm" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Falert-prompt-confirm" class="share share_fb"></a>

1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="/first-steps" class="breadcrumbs__link"><span>JavaScript Fundamentals</span></a></span>

8th September 2020

# Interaction: alert, prompt, confirm

As we’ll be using the browser as our demo environment, let’s see a couple of functions to interact with the user: `alert`, `prompt` and `confirm`.

## <a href="#alert" id="alert" class="main__anchor">alert</a>

This one we’ve seen already. It shows a message and waits for the user to press “OK”.

For example:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    alert("Hello");

The mini-window with the message is called a _modal window_. The word “modal” means that the visitor can’t interact with the rest of the page, press other buttons, etc, until they have dealt with the window. In this case – until they press “OK”.

## <a href="#prompt" id="prompt" class="main__anchor">prompt</a>

The function `prompt` accepts two arguments:

    result = prompt(title, [default]);

It shows a modal window with a text message, an input field for the visitor, and the buttons OK/Cancel.

`title`  
The text to show the visitor.

`default`  
An optional second parameter, the initial value for the input field.

<span class="important__type">The square brackets in syntax `[...]`</span>

The square brackets around `default` in the syntax above denote that the parameter is optional, not required.

The visitor can type something in the prompt input field and press OK. Then we get that text in the `result`. Or they can cancel the input by pressing Cancel or hitting the <span class="kbd shortcut">Esc</span> key, then we get `null` as the `result`.

The call to `prompt` returns the text from the input field or `null` if the input was canceled.

For instance:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let age = prompt('How old are you?', 100);

    alert(`You are ${age} years old!`); // You are 100 years old!

<span class="important__type">In IE: always supply a `default`</span>

The second parameter is optional, but if we don’t supply it, Internet Explorer will insert the text `"undefined"` into the prompt.

Run this code in Internet Explorer to see:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let test = prompt("Test");

So, for prompts to look good in IE, we recommend always providing the second argument:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let test = prompt("Test", ''); // <-- for IE

## <a href="#confirm" id="confirm" class="main__anchor">confirm</a>

The syntax:

    result = confirm(question);

The function `confirm` shows a modal window with a `question` and two buttons: OK and Cancel.

The result is `true` if OK is pressed and `false` otherwise.

For example:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let isBoss = confirm("Are you the boss?");

    alert( isBoss ); // true if OK is pressed

## <a href="#summary" id="summary" class="main__anchor">Summary</a>

We covered 3 browser-specific functions to interact with visitors:

`alert`  
shows a message.

`prompt`  
shows a message asking the user to input text. It returns the text or, if Cancel button or <span class="kbd shortcut">Esc</span> is clicked, `null`.

`confirm`  
shows a message and waits for the user to press “OK” or “Cancel”. It returns `true` for OK and `false` for Cancel/<span class="kbd shortcut">Esc</span>.

All these methods are modal: they pause script execution and don’t allow the visitor to interact with the rest of the page until the window has been dismissed.

There are two limitations shared by all the methods above:

1.  The exact location of the modal window is determined by the browser. Usually, it’s in the center.
2.  The exact look of the window also depends on the browser. We can’t modify it.

That is the price for simplicity. There are other ways to show nicer windows and richer interaction with the visitor, but if “bells and whistles” do not matter much, these methods work just fine.

## <a href="#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="#a-simple-page" id="a-simple-page" class="main__anchor">A simple page</a>

<a href="/task/simple-page" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Create a web-page that asks for a name and outputs it.

[Run the demo](#)

solution

JavaScript-code:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let name = prompt("What is your name?", "");
    alert(name);

The full page:

    <!DOCTYPE html>
    <html>
    <body>

      <script>
        'use strict';

        let name = prompt("What is your name?", "");
        alert(name);
      </script>

    </body>
    </html>

<a href="/types" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/type-conversions" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Falert-prompt-confirm" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Falert-prompt-confirm" class="share share_fb"></a>

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

## <a href="#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="/tutorial/map" class="map"></a>

#### Chapter

- <a href="/first-steps" class="sidebar__link">JavaScript Fundamentals</a>

#### Lesson navigation

- <a href="#alert" class="sidebar__link">alert</a>
- <a href="#prompt" class="sidebar__link">prompt</a>
- <a href="#confirm" class="sidebar__link">confirm</a>
- <a href="#summary" class="sidebar__link">Summary</a>

- <a href="#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Falert-prompt-confirm" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Falert-prompt-confirm" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/02-first-steps/06-alert-prompt-confirm" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="/about" class="page-footer__link">about the project</a>
- <a href="/about#contact-us" class="page-footer__link">contact us</a>
- <a href="/terms" class="page-footer__link">terms of usage</a>
- <a href="/privacy" class="page-footer__link">privacy policy</a>
