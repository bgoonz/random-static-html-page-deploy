EN

<!-- -->

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ffocus-blur" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffocus-blur" class="share share_fb"></a>

1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/ui" class="breadcrumbs__link"><span>Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="/forms-controls" class="breadcrumbs__link"><span>Forms, controls</span></a></span>

13th May 2021

# Focusing: focus/blur

An element receives the focus when the user either clicks on it or uses the <span class="kbd shortcut">Tab</span> key on the keyboard. There’s also an `autofocus` HTML attribute that puts the focus onto an element by default when a page loads and other means of getting the focus.

Focusing on an element generally means: “prepare to accept the data here”, so that’s the moment when we can run the code to initialize the required functionality.

The moment of losing the focus (“blur”) can be even more important. That’s when a user clicks somewhere else or presses <span class="kbd shortcut">Tab</span> to go to the next form field, or there are other means as well.

Losing the focus generally means: “the data has been entered”, so we can run the code to check it or even to save it to the server and so on.

There are important peculiarities when working with focus events. We’ll do the best to cover them further on.

## <a href="#events-focus-blur" id="events-focus-blur" class="main__anchor">Events focus/blur</a>

The `focus` event is called on focusing, and `blur` – when the element loses the focus.

Let’s use them for validation of an input field.

In the example below:

- The `blur` handler checks if the field has an email entered, and if not – shows an error.
- The `focus` handler hides the error message (on `blur` it will be checked again):

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <style>
      .invalid { border-color: red; }
      #error { color: red }
    </style>

    Your email please: <input type="email" id="input">

    <div id="error"></div>

    <script>
    input.onblur = function() {
      if (!input.value.includes('@')) { // not email
        input.classList.add('invalid');
        error.innerHTML = 'Please enter a correct email.'
      }
    };

    input.onfocus = function() {
      if (this.classList.contains('invalid')) {
        // remove the "error" indication, because the user wants to re-enter something
        this.classList.remove('invalid');
        error.innerHTML = "";
      }
    };
    </script>

Modern HTML allows us to do many validations using input attributes: `required`, `pattern` and so on. And sometimes they are just what we need. JavaScript can be used when we want more flexibility. Also we could automatically send the changed value to the server if it’s correct.

## <a href="#methods-focus-blur" id="methods-focus-blur" class="main__anchor">Methods focus/blur</a>

Methods `elem.focus()` and `elem.blur()` set/unset the focus on the element.

For instance, let’s make the visitor unable to leave the input if the value is invalid:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <style>
      .error {
        background: red;
      }
    </style>

    Your email please: <input type="email" id="input">
    <input type="text" style="width:220px" placeholder="make email invalid and try to focus here">

    <script>
      input.onblur = function() {
        if (!this.value.includes('@')) { // not email
          // show the error
          this.classList.add("error");
          // ...and put the focus back
          input.focus();
        } else {
          this.classList.remove("error");
        }
      };
    </script>

It works in all browsers except Firefox ([bug](https://bugzilla.mozilla.org/show_bug.cgi?id=53579)).

If we enter something into the input and then try to use <span class="kbd shortcut">Tab</span> or click away from the `<input>`, then `onblur` returns the focus back.

Please note that we can’t “prevent losing focus” by calling `event.preventDefault()` in `onblur`, because `onblur` works _after_ the element lost the focus.

<span class="important__type">JavaScript-initiated focus loss</span>

A focus loss can occur for many reasons.

One of them is when the visitor clicks somewhere else. But also JavaScript itself may cause it, for instance:

- An `alert` moves focus to itself, so it causes the focus loss at the element (`blur` event), and when the `alert` is dismissed, the focus comes back (`focus` event).
- If an element is removed from DOM, then it also causes the focus loss. If it is reinserted later, then the focus doesn’t return.

These features sometimes cause `focus/blur` handlers to misbehave – to trigger when they are not needed.

The best recipe is to be careful when using these events. If we want to track user-initiated focus-loss, then we should avoid causing it ourselves.

## <a href="#allow-focusing-on-any-element-tabindex" id="allow-focusing-on-any-element-tabindex" class="main__anchor">Allow focusing on any element: tabindex</a>

By default, many elements do not support focusing.

The list varies a bit between browsers, but one thing is always correct: `focus/blur` support is guaranteed for elements that a visitor can interact with: `<button>`, `<input>`, `<select>`, `<a>` and so on.

On the other hand, elements that exist to format something, such as `<div>`, `<span>`, `<table>` – are unfocusable by default. The method `elem.focus()` doesn’t work on them, and `focus/blur` events are never triggered.

This can be changed using HTML-attribute `tabindex`.

Any element becomes focusable if it has `tabindex`. The value of the attribute is the order number of the element when <span class="kbd shortcut">Tab</span> (or something like that) is used to switch between them.

That is: if we have two elements, the first has `tabindex="1"`, and the second has `tabindex="2"`, then pressing <span class="kbd shortcut">Tab</span> while in the first element – moves the focus into the second one.

The switch order is: elements with `tabindex` from `1` and above go first (in the `tabindex` order), and then elements without `tabindex` (e.g. a regular `<input>`).

Elements without matching `tabindex` are switched in the document source order (the default order).

There are two special values:

- `tabindex="0"` puts an element among those without `tabindex`. That is, when we switch elements, elements with `tabindex=0` go after elements with `tabindex ≥ 1`.

  Usually it’s used to make an element focusable, but keep the default switching order. To make an element a part of the form on par with `<input>`.

- `tabindex="-1"` allows only programmatic focusing on an element. The <span class="kbd shortcut">Tab</span> key ignores such elements, but method `elem.focus()` works.

For instance, here’s a list. Click the first item and press <span class="kbd shortcut">Tab</span>:

    Click the first item and press Tab. Keep track of the order. Please note that many subsequent Tabs can move the focus out of the iframe in the example.
    <ul>
      <li tabindex="1">One</li>
      <li tabindex="0">Zero</li>
      <li tabindex="2">Two</li>
      <li tabindex="-1">Minus one</li>
    </ul>

    <style>
      li { cursor: pointer; }
      :focus { outline: 1px dashed green; }
    </style>

The order is like this: `1 - 2 - 0`. Normally, `<li>` does not support focusing, but `tabindex` full enables it, along with events and styling with `:focus`.

<span class="important__type">The property `elem.tabIndex` works too</span>

We can add `tabindex` from JavaScript by using the `elem.tabIndex` property. That has the same effect.

## <a href="#delegation-focusin-focusout" id="delegation-focusin-focusout" class="main__anchor">Delegation: focusin/focusout</a>

Events `focus` and `blur` do not bubble.

For instance, we can’t put `onfocus` on the `<form>` to highlight it, like this:

    <!-- on focusing in the form -- add the class -->
    <form onfocus="this.className='focused'">
      <input type="text" name="name" value="Name">
      <input type="text" name="surname" value="Surname">
    </form>

    <style> .focused { outline: 1px solid red; } </style>

The example above doesn’t work, because when user focuses on an `<input>`, the `focus` event triggers on that input only. It doesn’t bubble up. So `form.onfocus` never triggers.

There are two solutions.

First, there’s a funny historical feature: `focus/blur` do not bubble up, but propagate down on the capturing phase.

This will work:

    <form id="form">
      <input type="text" name="name" value="Name">
      <input type="text" name="surname" value="Surname">
    </form>

    <style> .focused { outline: 1px solid red; } </style>

    <script>
      // put the handler on capturing phase (last argument true)
      form.addEventListener("focus", () => form.classList.add('focused'), true);
      form.addEventListener("blur", () => form.classList.remove('focused'), true);
    </script>

Second, there are `focusin` and `focusout` events – exactly the same as `focus/blur`, but they bubble.

Note that they must be assigned using `elem.addEventListener`, not `on<event>`.

So here’s another working variant:

    <form id="form">
      <input type="text" name="name" value="Name">
      <input type="text" name="surname" value="Surname">
    </form>

    <style> .focused { outline: 1px solid red; } </style>

    <script>
      form.addEventListener("focusin", () => form.classList.add('focused'));
      form.addEventListener("focusout", () => form.classList.remove('focused'));
    </script>

## <a href="#summary" id="summary" class="main__anchor">Summary</a>

Events `focus` and `blur` trigger on an element focusing/losing focus.

Their specials are:

- They do not bubble. Can use capturing state instead or `focusin/focusout`.
- Most elements do not support focus by default. Use `tabindex` to make anything focusable.

The current focused element is available as `document.activeElement`.

## <a href="#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="#editable-div" id="editable-div" class="main__anchor">Editable div</a>

<a href="/task/editable-div" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a `<div>` that turns into `<textarea>` when clicked.

The textarea allows to edit the HTML in the `<div>`.

When the user presses <span class="kbd shortcut">Enter</span> or it loses focus, the `<textarea>` turns back into `<div>`, and its content becomes HTML in `<div>`.

[Demo in new window](https://en.js.cx/task/editable-div/solution/)

[Open a sandbox for the task.](https://plnkr.co/edit/ZjUep0nX4AjfVvcZ?p=preview)

solution

[Open the solution in a sandbox.](https://plnkr.co/edit/hi6zoBbDbBiSRftV?p=preview)

### <a href="#edit-td-on-click" id="edit-td-on-click" class="main__anchor">Edit TD on click</a>

<a href="/task/edit-td-click" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Make table cells editable on click.

- On click – the cell should become “editable” (textarea appears inside), we can change HTML. There should be no resize, all geometry should remain the same.
- Buttons OK and CANCEL appear below the cell to finish/cancel the editing.
- Only one cell may be editable at a moment. While a `<td>` is in “edit mode”, clicks on other cells are ignored.
- The table may have many cells. Use event delegation.

The demo:

Click on a table cell to edit it. Press OK or CANCEL when you finish.

<table id="bagua-table"><colgroup><col style="width: 33%" /><col style="width: 33%" /><col style="width: 33%" /></colgroup><thead><tr class="header"><th colspan="3"><em>Bagua</em> Chart: Direction, Element, Color, Meaning</th></tr></thead><tbody><tr class="odd"><td class="nw"><strong>Northwest</strong><br />
Metal<br />
Silver<br />
Elders</td><td class="n"><strong>North</strong><br />
Water<br />
Blue<br />
Change</td><td class="ne"><strong>Northeast</strong><br />
Earth<br />
Yellow<br />
Direction</td></tr><tr class="even"><td class="w"><strong>West</strong><br />
Metal<br />
Gold<br />
Youth</td><td class="c"><strong>Center</strong><br />
All<br />
Purple<br />
Harmony</td><td class="e"><strong>East</strong><br />
Wood<br />
Blue<br />
Future</td></tr><tr class="odd"><td class="sw"><strong>Southwest</strong><br />
Earth<br />
Brown<br />
Tranquility</td><td class="s"><strong>South</strong><br />
Fire<br />
Orange<br />
Fame</td><td class="se"><strong>Southeast</strong><br />
Wood<br />
Green<br />
Romance</td></tr></tbody></table>

[Open a sandbox for the task.](https://plnkr.co/edit/8svbkXOrvh6EAMhR?p=preview)

solution

1.  On click – replace `innerHTML` of the cell by `<textarea>` with same sizes and no border. Can use JavaScript or CSS to set the right size.
2.  Set `textarea.value` to `td.innerHTML`.
3.  Focus on the textarea.
4.  Show buttons OK/CANCEL under the cell, handle clicks on them.

[Open the solution in a sandbox.](https://plnkr.co/edit/GJlVn2ir1dhNilFc?p=preview)

### <a href="#keyboard-driven-mouse" id="keyboard-driven-mouse" class="main__anchor">Keyboard-driven mouse</a>

<a href="/task/keyboard-mouse" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Focus on the mouse. Then use arrow keys to move it:

[Demo in new window](https://en.js.cx/task/keyboard-mouse/solution/)

P.S. Don’t put event handlers anywhere except the `#mouse` element.

P.P.S. Don’t modify HTML/CSS, the approach should be generic and work with any element.

[Open a sandbox for the task.](https://plnkr.co/edit/mWShSzKepRZFzHVn?p=preview)

solution

We can use `mouse.onclick` to handle the click and make the mouse “moveable” with `position:fixed`, then `mouse.onkeydown` to handle arrow keys.

The only pitfall is that `keydown` only triggers on elements with focus. So we need to add `tabindex` to the element. As we’re forbidden to change HTML, we can use `mouse.tabIndex` property for that.

P.S. We also can replace `mouse.onclick` with `mouse.onfocus`.

[Open the solution in a sandbox.](https://plnkr.co/edit/qlu8VmYgpt7qZc98?p=preview)

<a href="/form-elements" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/events-change-input" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ffocus-blur" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffocus-blur" class="share share_fb"></a>

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

## <a href="#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="/tutorial/map" class="map"></a>

#### Chapter

- <a href="/forms-controls" class="sidebar__link">Forms, controls</a>

#### Lesson navigation

- <a href="#events-focus-blur" class="sidebar__link">Events focus/blur</a>
- <a href="#methods-focus-blur" class="sidebar__link">Methods focus/blur</a>
- <a href="#allow-focusing-on-any-element-tabindex" class="sidebar__link">Allow focusing on any element: tabindex</a>
- <a href="#delegation-focusin-focusout" class="sidebar__link">Delegation: focusin/focusout</a>
- <a href="#summary" class="sidebar__link">Summary</a>

- <a href="#tasks" class="sidebar__link">Tasks (3)</a>
- <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ffocus-blur" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffocus-blur" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/4-forms-controls/2-focus-blur" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="/about" class="page-footer__link">about the project</a>
- <a href="/about#contact-us" class="page-footer__link">contact us</a>
- <a href="/terms" class="page-footer__link">terms of usage</a>
- <a href="/privacy" class="page-footer__link">privacy policy</a>
