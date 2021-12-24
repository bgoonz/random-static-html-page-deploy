EN

<!-- -->

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fmouse-events-basics" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmouse-events-basics" class="share share_fb"></a>

1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/ui" class="breadcrumbs__link"><span>Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="/event-details" class="breadcrumbs__link"><span>UI Events</span></a></span>

17th November 2020

# Mouse events

In this chapter we’ll get into more details about mouse events and their properties.

Please note: such events may come not only from “mouse devices”, but are also from other devices, such as phones and tablets, where they are emulated for compatibility.

## <a href="#mouse-event-types" id="mouse-event-types" class="main__anchor">Mouse event types</a>

We’ve already seen some of these events:

`mousedown/mouseup`  
Mouse button is clicked/released over an element.

`mouseover/mouseout`  
Mouse pointer comes over/out from an element.

`mousemove`  
Every mouse move over an element triggers that event.

`click`  
Triggers after `mousedown` and then `mouseup` over the same element if the left mouse button was used.

`dblclick`  
Triggers after two clicks on the same element within a short timeframe. Rarely used nowadays.

`contextmenu`  
Triggers when the right mouse button is pressed. There are other ways to open a context menu, e.g. using a special keyboard key, it triggers in that case also, so it’s not exactly the mouse event.

…There are several other events too, we’ll cover them later.

## <a href="#events-order" id="events-order" class="main__anchor">Events order</a>

As you can see from the list above, a user action may trigger multiple events.

For instance, a left-button click first triggers `mousedown`, when the button is pressed, then `mouseup` and `click` when it’s released.

In cases when a single action initiates multiple events, their order is fixed. That is, the handlers are called in the order `mousedown` → `mouseup` → `click`.

Click the button below and you’ll see the events. Try double-click too.

On the teststand below all mouse events are logged, and if there is more than a 1 second delay between them they are separated by a horizontal ruler.

Also we can see the `button` property that allows to detect the mouse button, it’s explained below.

## <a href="#mouse-button" id="mouse-button" class="main__anchor">Mouse button</a>

Click-related events always have the `button` property, which allows to get the exact mouse button.

We usually don’t use it for `click` and `contextmenu` events, because the former happens only on left-click, and the latter – only on right-click.

From the other hand, `mousedown` and `mouseup` handlers may need `event.button`, because these events trigger on any button, so `button` allows to distinguish between “right-mousedown” and “left-mousedown”.

The possible values of `event.button` are:

<table><thead><tr class="header"><th>Button state</th><th><code>event.button</code></th></tr></thead><tbody><tr class="odd"><td>Left button (primary)</td><td>0</td></tr><tr class="even"><td>Middle button (auxiliary)</td><td>1</td></tr><tr class="odd"><td>Right button (secondary)</td><td>2</td></tr><tr class="even"><td>X1 button (back)</td><td>3</td></tr><tr class="odd"><td>X2 button (forward)</td><td>4</td></tr></tbody></table>

Most mouse devices only have the left and right buttons, so possible values are `0` or `2`. Touch devices also generate similar events when one taps on them.

Also there’s `event.buttons` property that has all currently pressed buttons as an integer, one bit per button. In practice this property is very rarely used, you can find details at [MDN](https://developer.mozilla.org/en-US/docs/Web/api/MouseEvent/buttons) if you ever need it.

<span class="important__type">The outdated `event.which`</span>

Old code may use `event.which` property that’s an old non-standard way of getting a button, with possible values:

- `event.which == 1` – left button,
- `event.which == 2` – middle button,
- `event.which == 3` – right button.

As of now, `event.which` is deprecated, we shouldn’t use it.

## <a href="#modifiers-shift-alt-ctrl-and-meta" id="modifiers-shift-alt-ctrl-and-meta" class="main__anchor">Modifiers: shift, alt, ctrl and meta</a>

All mouse events include the information about pressed modifier keys.

Event properties:

- `shiftKey`: <span class="kbd shortcut">Shift</span>
- `altKey`: <span class="kbd shortcut">Alt</span> (or <span class="kbd shortcut">Opt</span> for Mac)
- `ctrlKey`: <span class="kbd shortcut">Ctrl</span>
- `metaKey`: <span class="kbd shortcut">Cmd</span> for Mac

They are `true` if the corresponding key was pressed during the event.

For instance, the button below only works on <span class="kbd shortcut">Alt<span class="shortcut__plus">+</span>Shift</span>+click:

    <button id="button">Alt+Shift+Click on me!</button>

    <script>
      button.onclick = function(event) {
        if (event.altKey && event.shiftKey) {
          alert('Hooray!');
        }
      };
    </script>

<span class="important__type">Attention: on Mac it’s usually `Cmd` instead of `Ctrl`</span>

On Windows and Linux there are modifier keys <span class="kbd shortcut">Alt</span>, <span class="kbd shortcut">Shift</span> and <span class="kbd shortcut">Ctrl</span>. On Mac there’s one more: <span class="kbd shortcut">Cmd</span>, corresponding to the property `metaKey`.

In most applications, when Windows/Linux uses <span class="kbd shortcut">Ctrl</span>, on Mac <span class="kbd shortcut">Cmd</span> is used.

That is: where a Windows user presses <span class="kbd shortcut">Ctrl<span class="shortcut__plus">+</span>Enter</span> or <span class="kbd shortcut">Ctrl<span class="shortcut__plus">+</span>A</span>, a Mac user would press <span class="kbd shortcut">Cmd<span class="shortcut__plus">+</span>Enter</span> or <span class="kbd shortcut">Cmd<span class="shortcut__plus">+</span>A</span>, and so on.

So if we want to support combinations like <span class="kbd shortcut">Ctrl</span>+click, then for Mac it makes sense to use <span class="kbd shortcut">Cmd</span>+click. That’s more comfortable for Mac users.

Even if we’d like to force Mac users to <span class="kbd shortcut">Ctrl</span>+click – that’s kind of difficult. The problem is: a left-click with <span class="kbd shortcut">Ctrl</span> is interpreted as a _right-click_ on MacOS, and it generates the `contextmenu` event, not `click` like Windows/Linux.

So if we want users of all operating systems to feel comfortable, then together with `ctrlKey` we should check `metaKey`.

For JS-code it means that we should check `if (event.ctrlKey || event.metaKey)`.

<span class="important__type">There are also mobile devices</span>

Keyboard combinations are good as an addition to the workflow. So that if the visitor uses a keyboard – they work.

But if their device doesn’t have it – then there should be a way to live without modifier keys.

## <a href="#coordinates-clientx-y-pagex-y" id="coordinates-clientx-y-pagex-y" class="main__anchor">Coordinates: clientX/Y, pageX/Y</a>

All mouse events provide coordinates in two flavours:

1.  Window-relative: `clientX` and `clientY`.
2.  Document-relative: `pageX` and `pageY`.

We already covered the difference between them in the chapter [Coordinates](/coordinates).

In short, document-relative coordinates `pageX/Y` are counted from the left-upper corner of the document, and do not change when the page is scrolled, while `clientX/Y` are counted from the current window left-upper corner. When the page is scrolled, they change.

For instance, if we have a window of the size 500x500, and the mouse is in the left-upper corner, then `clientX` and `clientY` are `0`, no matter how the page is scrolled.

And if the mouse is in the center, then `clientX` and `clientY` are `250`, no matter what place in the document it is. They are similar to `position:fixed` in that aspect.

Move the mouse over the input field to see `clientX/clientY` (the example is in the `iframe`, so coordinates are relative to that `iframe`):

    <input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse over me">

## <a href="#preventing-selection-on-mousedown" id="preventing-selection-on-mousedown" class="main__anchor">Preventing selection on mousedown</a>

Double mouse click has a side-effect that may be disturbing in some interfaces: it selects text.

For instance, double-clicking on the text below selects it in addition to our handler:

    <span ondblclick="alert('dblclick')">Double-click me</span>

If one presses the left mouse button and, without releasing it, moves the mouse, that also makes the selection, often unwanted.

There are multiple ways to prevent the selection, that you can read in the chapter [Selection and Range](/selection-range).

In this particular case the most reasonable way is to prevent the browser action on `mousedown`. It prevents both these selections:

    Before...
    <b ondblclick="alert('Click!')" onmousedown="return false">
      Double-click me
    </b>
    ...After

Now the bold element is not selected on double clicks, and pressing the left button on it won’t start the selection.

Please note: the text inside it is still selectable. However, the selection should start not on the text itself, but before or after it. Usually that’s fine for users.

<span class="important__type">Preventing copying</span>

If we want to disable selection to protect our page content from copy-pasting, then we can use another event: `oncopy`.

    <div oncopy="alert('Copying forbidden!');return false">
      Dear user,
      The copying is forbidden for you.
      If you know JS or HTML, then you can get everything from the page source though.
    </div>

If you try to copy a piece of text in the `<div>`, that won’t work, because the default action `oncopy` is prevented.

Surely the user has access to HTML-source of the page, and can take the content from there, but not everyone knows how to do it.

## <a href="#summary" id="summary" class="main__anchor">Summary</a>

Mouse events have the following properties:

- Button: `button`.

- Modifier keys (`true` if pressed): `altKey`, `ctrlKey`, `shiftKey` and `metaKey` (Mac).

  - If you want to handle <span class="kbd shortcut">Ctrl</span>, then don’t forget Mac users, they usually use <span class="kbd shortcut">Cmd</span>, so it’s better to check `if (e.metaKey || e.ctrlKey)`.

- Window-relative coordinates: `clientX/clientY`.

- Document-relative coordinates: `pageX/pageY`.

The default browser action of `mousedown` is text selection, if it’s not good for the interface, then it should be prevented.

In the next chapter we’ll see more details about events that follow pointer movement and how to track element changes under it.

## <a href="#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="#selectable-list" id="selectable-list" class="main__anchor">Selectable list</a>

<a href="/task/selectable-list" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a list where elements are selectable, like in file-managers.

- A click on a list element selects only that element (adds the class `.selected`), deselects all others.
- If a click is made with <span class="kbd shortcut">Ctrl</span> (<span class="kbd shortcut">Cmd</span> for Mac), then the selection is toggled on the element, but other elements are not modified.

The demo:

Click on a list item to select it.

- Christopher Robin
- Winnie-the-Pooh
- Tigger
- Kanga
- Rabbit. Just rabbit.

P.S. For this task we can assume that list items are text-only. No nested tags.

P.P.S. Prevent the native browser selection of the text on clicks.

[Open a sandbox for the task.](https://plnkr.co/edit/gUrAWTnZOfpP1vAp?p=preview)

solution

[Open the solution in a sandbox.](https://plnkr.co/edit/5olx4aoq3eG1HIqa?p=preview)

<a href="/event-details" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/mousemove-mouseover-mouseout-mouseenter-mouseleave" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fmouse-events-basics" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmouse-events-basics" class="share share_fb"></a>

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

## <a href="#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="/tutorial/map" class="map"></a>

#### Chapter

- <a href="/event-details" class="sidebar__link">UI Events</a>

#### Lesson navigation

- <a href="#mouse-event-types" class="sidebar__link">Mouse event types</a>
- <a href="#events-order" class="sidebar__link">Events order</a>
- <a href="#mouse-button" class="sidebar__link">Mouse button</a>
- <a href="#modifiers-shift-alt-ctrl-and-meta" class="sidebar__link">Modifiers: shift, alt, ctrl and meta</a>
- <a href="#coordinates-clientx-y-pagex-y" class="sidebar__link">Coordinates: clientX/Y, pageX/Y</a>
- <a href="#preventing-selection-on-mousedown" class="sidebar__link">Preventing selection on mousedown</a>
- <a href="#summary" class="sidebar__link">Summary</a>

- <a href="#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fmouse-events-basics" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmouse-events-basics" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/3-event-details/1-mouse-events-basics" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="/about" class="page-footer__link">about the project</a>
- <a href="/about#contact-us" class="page-footer__link">contact us</a>
- <a href="/terms" class="page-footer__link">terms of usage</a>
- <a href="/privacy" class="page-footer__link">privacy policy</a>
