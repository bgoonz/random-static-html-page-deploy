EN

<!-- -->

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fmodifying-document" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmodifying-document" class="share share_fb"></a>

1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/ui" class="breadcrumbs__link"><span>Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="/document" class="breadcrumbs__link"><span>Document</span></a></span>

3rd November 2021

# Modifying the document

DOM modification is the key to creating “live” pages.

Here we’ll see how to create new elements “on the fly” and modify the existing page content.

## <a href="#example-show-a-message" id="example-show-a-message" class="main__anchor">Example: show a message</a>

Let’s demonstrate using an example. We’ll add a message on the page that looks nicer than `alert`.

Here’s how it will look:

    <style>
    .alert {
      padding: 15px;
      border: 1px solid #d6e9c6;
      border-radius: 4px;
      color: #3c763d;
      background-color: #dff0d8;
    }
    </style>

    <div class="alert">
      <strong>Hi there!</strong> You've read an important message.
    </div>

That was the HTML example. Now let’s create the same `div` with JavaScript (assuming that the styles are in the HTML/CSS already).

## <a href="#creating-an-element" id="creating-an-element" class="main__anchor">Creating an element</a>

To create DOM nodes, there are two methods:

`document.createElement(tag)`  
Creates a new _element node_ with the given tag:

    let div = document.createElement('div');

`document.createTextNode(text)`  
Creates a new _text node_ with the given text:

    let textNode = document.createTextNode('Here I am');

Most of the time we need to create element nodes, such as the `div` for the message.

### <a href="#creating-the-message" id="creating-the-message" class="main__anchor">Creating the message</a>

Creating the message div takes 3 steps:

    // 1. Create <div> element
    let div = document.createElement('div');

    // 2. Set its class to "alert"
    div.className = "alert";

    // 3. Fill it with the content
    div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

We’ve created the element. But as of now it’s only in a variable named `div`, not in the page yet. So we can’t see it.

## <a href="#insertion-methods" id="insertion-methods" class="main__anchor">Insertion methods</a>

To make the `div` show up, we need to insert it somewhere into `document`. For instance, into `<body>` element, referenced by `document.body`.

There’s a special method `append` for that: `document.body.append(div)`.

Here’s the full code:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <style>
    .alert {
      padding: 15px;
      border: 1px solid #d6e9c6;
      border-radius: 4px;
      color: #3c763d;
      background-color: #dff0d8;
    }
    </style>

    <script>
      let div = document.createElement('div');
      div.className = "alert";
      div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

      document.body.append(div);
    </script>

Here we called `append` on `document.body`, but we can call `append` method on any other element, to put another element into it. For instance, we can append something to `<div>` by calling `div.append(anotherElement)`.

Here are more insertion methods, they specify different places where to insert:

- `node.append(...nodes or strings)` – append nodes or strings _at the end_ of `node`,
- `node.prepend(...nodes or strings)` – insert nodes or strings _at the beginning_ of `node`,
- `node.before(...nodes or strings)` –- insert nodes or strings _before_ `node`,
- `node.after(...nodes or strings)` –- insert nodes or strings _after_ `node`,
- `node.replaceWith(...nodes or strings)` –- replaces `node` with the given nodes or strings.

Arguments of these methods are an arbitrary list of DOM nodes to insert, or text strings (that become text nodes automatically).

Let’s see them in action.

Here’s an example of using these methods to add items to a list and the text before/after it:

    <ol id="ol">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      ol.before('before'); // insert string "before" before <ol>
      ol.after('after'); // insert string "after" after <ol>

      let liFirst = document.createElement('li');
      liFirst.innerHTML = 'prepend';
      ol.prepend(liFirst); // insert liFirst at the beginning of <ol>

      let liLast = document.createElement('li');
      liLast.innerHTML = 'append';
      ol.append(liLast); // insert liLast at the end of <ol>
    </script>

Here’s a visual picture of what the methods do:

<figure><img src="/article/modifying-document/before-prepend-append-after.svg" width="409" height="203" /></figure>

So the final list will be:

    before
    <ol id="ol">
      <li>prepend</li>
      <li>0</li>
      <li>1</li>
      <li>2</li>
      <li>append</li>
    </ol>
    after

As said, these methods can insert multiple nodes and text pieces in a single call.

For instance, here a string and an element are inserted:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <div id="div"></div>
    <script>
      div.before('<p>Hello</p>', document.createElement('hr'));
    </script>

Please note: the text is inserted “as text”, not “as HTML”, with proper escaping of characters such as `<`, `>`.

So the final HTML is:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    &lt;p&gt;Hello&lt;/p&gt;
    <hr>
    <div id="div"></div>

In other words, strings are inserted in a safe way, like `elem.textContent` does it.

So, these methods can only be used to insert DOM nodes or text pieces.

But what if we’d like to insert an HTML string “as html”, with all tags and stuff working, in the same manner as `elem.innerHTML` does it?

## <a href="#insertadjacenthtml-text-element" id="insertadjacenthtml-text-element" class="main__anchor">insertAdjacentHTML/Text/Element</a>

For that we can use another, pretty versatile method: `elem.insertAdjacentHTML(where, html)`.

The first parameter is a code word, specifying where to insert relative to `elem`. Must be one of the following:

- `"beforebegin"` – insert `html` immediately before `elem`,
- `"afterbegin"` – insert `html` into `elem`, at the beginning,
- `"beforeend"` – insert `html` into `elem`, at the end,
- `"afterend"` – insert `html` immediately after `elem`.

The second parameter is an HTML string, that is inserted “as HTML”.

For instance:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <div id="div"></div>
    <script>
      div.insertAdjacentHTML('beforebegin', '<p>Hello</p>');
      div.insertAdjacentHTML('afterend', '<p>Bye</p>');
    </script>

…Would lead to:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <p>Hello</p>
    <div id="div"></div>
    <p>Bye</p>

That’s how we can append arbitrary HTML to the page.

Here’s the picture of insertion variants:

<figure><img src="/article/modifying-document/insert-adjacent.svg" width="409" height="203" /></figure>

We can easily notice similarities between this and the previous picture. The insertion points are actually the same, but this method inserts HTML.

The method has two brothers:

- `elem.insertAdjacentText(where, text)` – the same syntax, but a string of `text` is inserted “as text” instead of HTML,
- `elem.insertAdjacentElement(where, elem)` – the same syntax, but inserts an element.

They exist mainly to make the syntax “uniform”. In practice, only `insertAdjacentHTML` is used most of the time. Because for elements and text, we have methods `append/prepend/before/after` – they are shorter to write and can insert nodes/text pieces.

So here’s an alternative variant of showing a message:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <style>
    .alert {
      padding: 15px;
      border: 1px solid #d6e9c6;
      border-radius: 4px;
      color: #3c763d;
      background-color: #dff0d8;
    }
    </style>

    <script>
      document.body.insertAdjacentHTML("afterbegin", `<div class="alert">
        <strong>Hi there!</strong> You've read an important message.
      </div>`);
    </script>

## <a href="#node-removal" id="node-removal" class="main__anchor">Node removal</a>

To remove a node, there’s a method `node.remove()`.

Let’s make our message disappear after a second:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <style>
    .alert {
      padding: 15px;
      border: 1px solid #d6e9c6;
      border-radius: 4px;
      color: #3c763d;
      background-color: #dff0d8;
    }
    </style>

    <script>
      let div = document.createElement('div');
      div.className = "alert";
      div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

      document.body.append(div);
      setTimeout(() => div.remove(), 1000);
    </script>

Please note: if we want to _move_ an element to another place – there’s no need to remove it from the old one.

**All insertion methods automatically remove the node from the old place.**

For instance, let’s swap elements:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <div id="first">First</div>
    <div id="second">Second</div>
    <script>
      // no need to call remove
      second.after(first); // take #second and after it insert #first
    </script>

## <a href="#cloning-nodes-clonenode" id="cloning-nodes-clonenode" class="main__anchor">Cloning nodes: cloneNode</a>

How to insert one more similar message?

We could make a function and put the code there. But the alternative way would be to _clone_ the existing `div` and modify the text inside it (if needed).

Sometimes when we have a big element, that may be faster and simpler.

- The call `elem.cloneNode(true)` creates a “deep” clone of the element – with all attributes and subelements. If we call `elem.cloneNode(false)`, then the clone is made without child elements.

An example of copying the message:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <style>
    .alert {
      padding: 15px;
      border: 1px solid #d6e9c6;
      border-radius: 4px;
      color: #3c763d;
      background-color: #dff0d8;
    }
    </style>

    <div class="alert" id="div">
      <strong>Hi there!</strong> You've read an important message.
    </div>

    <script>
      let div2 = div.cloneNode(true); // clone the message
      div2.querySelector('strong').innerHTML = 'Bye there!'; // change the clone

      div.after(div2); // show the clone after the existing div
    </script>

## <a href="#document-fragment" id="document-fragment" class="main__anchor">DocumentFragment</a>

`DocumentFragment` is a special DOM node that serves as a wrapper to pass around lists of nodes.

We can append other nodes to it, but when we insert it somewhere, then its content is inserted instead.

For example, `getListContent` below generates a fragment with `<li>` items, that are later inserted into `<ul>`:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <ul id="ul"></ul>

    <script>
    function getListContent() {
      let fragment = new DocumentFragment();

      for(let i=1; i<=3; i++) {
        let li = document.createElement('li');
        li.append(i);
        fragment.append(li);
      }

      return fragment;
    }

    ul.append(getListContent()); // (*)
    </script>

Please note, at the last line `(*)` we append `DocumentFragment`, but it “blends in”, so the resulting structure will be:

    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>

`DocumentFragment` is rarely used explicitly. Why append to a special kind of node, if we can return an array of nodes instead? Rewritten example:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <ul id="ul"></ul>

    <script>
    function getListContent() {
      let result = [];

      for(let i=1; i<=3; i++) {
        let li = document.createElement('li');
        li.append(i);
        result.push(li);
      }

      return result;
    }

    ul.append(...getListContent()); // append + "..." operator = friends!
    </script>

We mention `DocumentFragment` mainly because there are some concepts on top of it, like [template](/template-element) element, that we’ll cover much later.

## <a href="#old-school-insert-remove-methods" id="old-school-insert-remove-methods" class="main__anchor">Old-school insert/remove methods</a>

<span class="important__type">Old school</span>

This information helps to understand old scripts, but not needed for new development.

There are also “old school” DOM manipulation methods, existing for historical reasons.

These methods come from really ancient times. Nowadays, there’s no reason to use them, as modern methods, such as `append`, `prepend`, `before`, `after`, `remove`, `replaceWith`, are more flexible.

The only reason we list these methods here is that you can find them in many old scripts:

`parentElem.appendChild(node)`  
Appends `node` as the last child of `parentElem`.

The following example adds a new `<li>` to the end of `<ol>`:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Hello, world!';

      list.appendChild(newLi);
    </script>

`parentElem.insertBefore(node, nextSibling)`  
Inserts `node` before `nextSibling` into `parentElem`.

The following code inserts a new list item before the second `<li>`:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>
    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Hello, world!';

      list.insertBefore(newLi, list.children[1]);
    </script>

To insert `newLi` as the first element, we can do it like this:

    list.insertBefore(newLi, list.firstChild);

`parentElem.replaceChild(node, oldChild)`  
Replaces `oldChild` with `node` among children of `parentElem`.

`parentElem.removeChild(node)`  
Removes `node` from `parentElem` (assuming `node` is its child).

The following example removes first `<li>` from `<ol>`:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let li = list.firstElementChild;
      list.removeChild(li);
    </script>

All these methods return the inserted/removed node. In other words, `parentElem.appendChild(node)` returns `node`. But usually the returned value is not used, we just run the method.

## <a href="#a-word-about-document-write" id="a-word-about-document-write" class="main__anchor">A word about “document.write”</a>

There’s one more, very ancient method of adding something to a web-page: `document.write`.

The syntax:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <p>Somewhere in the page...</p>
    <script>
      document.write('<b>Hello from JS</b>');
    </script>
    <p>The end</p>

The call to `document.write(html)` writes the `html` into page “right here and now”. The `html` string can be dynamically generated, so it’s kind of flexible. We can use JavaScript to create a full-fledged webpage and write it.

The method comes from times when there was no DOM, no standards… Really old times. It still lives, because there are scripts using it.

In modern scripts we can rarely see it, because of the following important limitation:

**The call to `document.write` only works while the page is loading.**

If we call it afterwards, the existing document content is erased.

For instance:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <p>After one second the contents of this page will be replaced...</p>
    <script>
      // document.write after 1 second
      // that's after the page loaded, so it erases the existing content
      setTimeout(() => document.write('<b>...By this.</b>'), 1000);
    </script>

So it’s kind of unusable at “after loaded” stage, unlike other DOM methods we covered above.

That’s the downside.

There’s an upside also. Technically, when `document.write` is called while the browser is reading (“parsing”) incoming HTML, and it writes something, the browser consumes it just as if it were initially there, in the HTML text.

So it works blazingly fast, because there’s _no DOM modification_ involved. It writes directly into the page text, while the DOM is not yet built.

So if we need to add a lot of text into HTML dynamically, and we’re at page loading phase, and the speed matters, it may help. But in practice these requirements rarely come together. And usually we can see this method in scripts just because they are old.

## <a href="#summary" id="summary" class="main__anchor">Summary</a>

- Methods to create new nodes:

  - `document.createElement(tag)` – creates an element with the given tag,
  - `document.createTextNode(value)` – creates a text node (rarely used),
  - `elem.cloneNode(deep)` – clones the element, if `deep==true` then with all descendants.

- Insertion and removal:

  - `node.append(...nodes or strings)` – insert into `node`, at the end,
  - `node.prepend(...nodes or strings)` – insert into `node`, at the beginning,
  - `node.before(...nodes or strings)` –- insert right before `node`,
  - `node.after(...nodes or strings)` –- insert right after `node`,
  - `node.replaceWith(...nodes or strings)` –- replace `node`.
  - `node.remove()` –- remove the `node`.

  Text strings are inserted “as text”.

- There are also “old school” methods:

  - `parent.appendChild(node)`
  - `parent.insertBefore(node, nextSibling)`
  - `parent.removeChild(node)`
  - `parent.replaceChild(newElem, node)`

  All these methods return `node`.

- Given some HTML in `html`, `elem.insertAdjacentHTML(where, html)` inserts it depending on the value of `where`:

  - `"beforebegin"` – insert `html` right before `elem`,
  - `"afterbegin"` – insert `html` into `elem`, at the beginning,
  - `"beforeend"` – insert `html` into `elem`, at the end,
  - `"afterend"` – insert `html` right after `elem`.

  Also there are similar methods, `elem.insertAdjacentText` and `elem.insertAdjacentElement`, that insert text strings and elements, but they are rarely used.

- To append HTML to the page before it has finished loading:

  - `document.write(html)`

  After the page is loaded such a call erases the document. Mostly seen in old scripts.

## <a href="#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="#createtextnode-vs-innerhtml-vs-textcontent" id="createtextnode-vs-innerhtml-vs-textcontent" class="main__anchor">createTextNode vs innerHTML vs textContent</a>

<a href="/task/createtextnode-vs-innerhtml" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

We have an empty DOM element `elem` and a string `text`.

Which of these 3 commands will do exactly the same?

1.  `elem.append(document.createTextNode(text))`
2.  `elem.innerHTML = text`
3.  `elem.textContent = text`

solution

Answer: **1 and 3**.

Both commands result in adding the `text` “as text” into the `elem`.

Here’s an example:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <div id="elem1"></div>
    <div id="elem2"></div>
    <div id="elem3"></div>
    <script>
      let text = '<b>text</b>';

      elem1.append(document.createTextNode(text));
      elem2.innerHTML = text;
      elem3.textContent = text;
    </script>

### <a href="#clear-the-element" id="clear-the-element" class="main__anchor">Clear the element</a>

<a href="/task/clear-elem" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a function `clear(elem)` that removes everything from the element.

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <ol id="elem">
      <li>Hello</li>
      <li>World</li>
    </ol>

    <script>
      function clear(elem) { /* your code */ }

      clear(elem); // clears the list
    </script>

solution

First, let’s see how _not_ to do it:

    function clear(elem) {
      for (let i=0; i < elem.childNodes.length; i++) {
          elem.childNodes[i].remove();
      }
    }

That won’t work, because the call to `remove()` shifts the collection `elem.childNodes`, so elements start from the index `0` every time. But `i` increases, and some elements will be skipped.

The `for..of` loop also does the same.

The right variant could be:

    function clear(elem) {
      while (elem.firstChild) {
        elem.firstChild.remove();
      }
    }

And also there’s a simpler way to do the same:

    function clear(elem) {
      elem.innerHTML = '';
    }

### <a href="#why-does-aaa-remain" id="why-does-aaa-remain" class="main__anchor">Why does "aaa" remain?</a>

<a href="/task/why-aaa" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 1</span>

In the example below, the call `table.remove()` removes the table from the document.

But if you run it, you can see that the text `"aaa"` is still visible.

Why does that happen?

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <table id="table">
      aaa
      <tr>
        <td>Test</td>
      </tr>
    </table>

    <script>
      alert(table); // the table, as it should be

      table.remove();
      // why there's still aaa in the document?
    </script>

solution

The HTML in the task is incorrect. That’s the reason of the odd thing.

The browser has to fix it automatically. But there may be no text inside the `<table>`: according to the spec only table-specific tags are allowed. So the browser shows `"aaa"` _before_ the `<table>`.

Now it’s obvious that when we remove the table, it remains.

The question can be easily answered by exploring the DOM using the browser tools. You’ll see `"aaa"` before the `<table>`.

The HTML standard specifies in detail how to process bad HTML, and such behavior of the browser is correct.

### <a href="#create-a-list" id="create-a-list" class="main__anchor">Create a list</a>

<a href="/task/create-list" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Write an interface to create a list from user input.

For every list item:

1.  Ask a user about its content using `prompt`.
2.  Create the `<li>` with it and add it to `<ul>`.
3.  Continue until the user cancels the input (by pressing <span class="kbd shortcut">Esc</span> or via an empty entry).

All elements should be created dynamically.

If a user types HTML-tags, they should be treated like a text.

[Demo in new window](https://en.js.cx/task/create-list/solution/)

solution

Please note the usage of `textContent` to assign the `<li>` content.

[Open the solution in a sandbox.](https://plnkr.co/edit/zXcaZbeJOV11ebxj?p=preview)

### <a href="#create-a-tree-from-the-object" id="create-a-tree-from-the-object" class="main__anchor">Create a tree from the object</a>

<a href="/task/create-object-tree" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write a function `createTree` that creates a nested `ul/li` list from the nested object.

For instance:

    let data = {
      "Fish": {
        "trout": {},
        "salmon": {}
      },

      "Tree": {
        "Huge": {
          "sequoia": {},
          "oak": {}
        },
        "Flowering": {
          "apple tree": {},
          "magnolia": {}
        }
      }
    };

The syntax:

    let container = document.getElementById('container');
    createTree(container, data); // creates the tree in the container

The result (tree) should look like this:

Choose one of two ways of solving this task:

1.  Create the HTML for the tree and then assign to `container.innerHTML`.
2.  Create tree nodes and append with DOM methods.

Would be great if you could do both.

P.S. The tree should not have “extra” elements like empty `<ul></ul>` for the leaves.

[Open a sandbox for the task.](https://plnkr.co/edit/uHTfYBC1WYrve75I?p=preview)

solution

The easiest way to walk the object is to use recursion.

1.  [The solution with innerHTML](https://plnkr.co/edit/PzjPAk9yKHeKkT36?p=preview).
2.  [The solution with DOM](https://plnkr.co/edit/e3TEVqQrm7ZqZkn6?p=preview).

### <a href="#show-descendants-in-a-tree" id="show-descendants-in-a-tree" class="main__anchor">Show descendants in a tree</a>

<a href="/task/tree-count" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There’s a tree organized as nested `ul/li`.

Write the code that adds to each `<li>` the number of its descendants. Skip leaves (nodes without children).

The result:

- Animals
  - Mammals
    - Cows
    - Donkeys
    - Dogs
    - Tigers
  - Other
    - Snakes
    - Birds
    - Lizards
- Fishes
  - Aquarium
    - Guppy
    - Angelfish
  - Sea
    - Sea trout

[Open a sandbox for the task.](https://plnkr.co/edit/4lS7jYgTEE9tX3NU?p=preview)

solution

To append text to each `<li>` we can alter the text node `data`.

[Open the solution in a sandbox.](https://plnkr.co/edit/isiACwTrYRL4hA1Q?p=preview)

### <a href="#create-a-calendar" id="create-a-calendar" class="main__anchor">Create a calendar</a>

<a href="/task/calendar-table" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Write a function `createCalendar(elem, year, month)`.

The call should create a calendar for the given year/month and put it inside `elem`.

The calendar should be a table, where a week is `<tr>`, and a day is `<td>`. The table top should be `<th>` with weekday names: the first day should be Monday, and so on till Sunday.

For instance, `createCalendar(cal, 2012, 9)` should generate in element `cal` the following calendar:

P.S. For this task it’s enough to generate the calendar, should not yet be clickable.

[Open a sandbox for the task.](https://plnkr.co/edit/HMGrxDjPkb7TmppV?p=preview)

solution

We’ll create the table as a string: `"<table>...</table>"`, and then assign it to `innerHTML`.

The algorithm:

1.  Create the table header with `<th>` and weekday names.
2.  Create the date object `d = new Date(year, month-1)`. That’s the first day of `month` (taking into account that months in JavaScript start from `0`, not `1`).
3.  First few cells till the first day of the month `d.getDay()` may be empty. Let’s fill them in with `<td></td>`.
4.  Increase the day in `d`: `d.setDate(d.getDate()+1)`. If `d.getMonth()` is not yet the next month, then add the new cell `<td>` to the calendar. If that’s a Sunday, then add a newline `“</tr><tr>”`.
5.  If the month has finished, but the table row is not yet full, add empty `<td>` into it, to make it square.

[Open the solution in a sandbox.](https://plnkr.co/edit/8TutdHGPz06kKUQS?p=preview)

### <a href="#colored-clock-with-setinterval" id="colored-clock-with-setinterval" class="main__anchor">Colored clock with setInterval</a>

<a href="/task/clock-setinterval" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Create a colored clock like here:

<span class="hour">hh</span>:<span class="min">mm</span>:<span class="sec">ss</span>

Use HTML/CSS for the styling, JavaScript only updates time in elements.

[Open a sandbox for the task.](https://plnkr.co/edit/SIg0n9ZevfGYgECY?p=preview)

solution

First, let’s make HTML/CSS.

Each component of the time would look great in its own `<span>`:

    <div id="clock">
      <span class="hour">hh</span>:<span class="min">mm</span>:<span class="sec">ss</span>
    </div>

Also we’ll need CSS to color them.

The `update` function will refresh the clock, to be called by `setInterval` every second:

    function update() {
      let clock = document.getElementById('clock');
      let date = new Date(); // (*)
      let hours = date.getHours();
      if (hours < 10) hours = '0' + hours;
      clock.children[0].innerHTML = hours;

      let minutes = date.getMinutes();
      if (minutes < 10) minutes = '0' + minutes;
      clock.children[1].innerHTML = minutes;

      let seconds = date.getSeconds();
      if (seconds < 10) seconds = '0' + seconds;
      clock.children[2].innerHTML = seconds;
    }

In the line `(*)` we every time check the current date. The calls to `setInterval` are not reliable: they may happen with delays.

The clock-managing functions:

    let timerId;

    function clockStart() { // run the clock
      if (!timerId) { // only set a new interval if the clock is not running
        timerId = setInterval(update, 1000);
      }
      update(); // (*)
    }

    function clockStop() {
      clearInterval(timerId);
      timerId = null; // (**)
    }

Please note that the call to `update()` is not only scheduled in `clockStart()`, but immediately run in the line `(*)`. Otherwise the visitor would have to wait till the first execution of `setInterval`. And the clock would be empty till then.

Also it is important to set a new interval in `clockStart()` only when the clock is not running. Otherways clicking the start button several times would set multiple concurrent intervals. Even worse – we would only keep the `timerID` of the last interval, losing references to all others. Then we wouldn’t be able to stop the clock ever again! Note that we need to clear the `timerID` when the clock is stopped in the line `(**)`, so that it can be started again by running `clockStart()`.

[Open the solution in a sandbox.](https://plnkr.co/edit/ZvfbCgJsJ5gFqBpx?p=preview)

### <a href="#insert-the-html-in-the-list" id="insert-the-html-in-the-list" class="main__anchor">Insert the HTML in the list</a>

<a href="/task/append-to-list" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Write the code to insert `<li>2</li><li>3</li>` between two `<li>` here:

    <ul id="ul">
      <li id="one">1</li>
      <li id="two">4</li>
    </ul>

solution

When we need to insert a piece of HTML somewhere, `insertAdjacentHTML` is the best fit.

The solution:

    one.insertAdjacentHTML('afterend', '<li>2</li><li>3</li>');

### <a href="#sort-the-table" id="sort-the-table" class="main__anchor">Sort the table</a>

<a href="/task/sort-table" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There’s a table:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <table>
    <thead>
      <tr>
        <th>Name</th><th>Surname</th><th>Age</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John</td><td>Smith</td><td>10</td>
      </tr>
      <tr>
        <td>Pete</td><td>Brown</td><td>15</td>
      </tr>
      <tr>
        <td>Ann</td><td>Lee</td><td>5</td>
      </tr>
      <tr>
        <td>...</td><td>...</td><td>...</td>
      </tr>
    </tbody>
    </table>

There may be more rows in it.

Write the code to sort it by the `"name"` column.

[Open a sandbox for the task.](https://plnkr.co/edit/f1KNlHsEaWriLawH?p=preview)

solution

The solution is short, yet may look a bit tricky, so here I provide it with extensive comments:

    let sortedRows = Array.from(table.tBodies[0].rows) // 1
      .sort((rowA, rowB) => rowA.cells[0].innerHTML.localeCompare(rowB.cells[0].innerHTML));

    table.tBodies[0].append(...sortedRows); // (3)

The step-by-step algorthm:

1.  Get all `<tr>`, from `<tbody>`.
2.  Then sort them comparing by the content of the first `<td>` (the name field).
3.  Now insert nodes in the right order by `.append(...sortedRows)`.

We don’t have to remove row elements, just “re-insert”, they leave the old place automatically.

P.S. In our case, there’s an explicit `<tbody>` in the table, but even if HTML table doesn’t have `<tbody>`, the DOM structure always has it.

[Open the solution in a sandbox.](https://plnkr.co/edit/5xHStBMfV5AVtoxR?p=preview)

<a href="/dom-attributes-and-properties" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/styles-and-classes" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fmodifying-document" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmodifying-document" class="share share_fb"></a>

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

## <a href="#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="/tutorial/map" class="map"></a>

#### Chapter

- <a href="/document" class="sidebar__link">Document</a>

#### Lesson navigation

- <a href="#example-show-a-message" class="sidebar__link">Example: show a message</a>
- <a href="#creating-an-element" class="sidebar__link">Creating an element</a>
- <a href="#insertion-methods" class="sidebar__link">Insertion methods</a>
- <a href="#insertadjacenthtml-text-element" class="sidebar__link">insertAdjacentHTML/Text/Element</a>
- <a href="#node-removal" class="sidebar__link">Node removal</a>
- <a href="#cloning-nodes-clonenode" class="sidebar__link">Cloning nodes: cloneNode</a>
- <a href="#document-fragment" class="sidebar__link">DocumentFragment</a>
- <a href="#old-school-insert-remove-methods" class="sidebar__link">Old-school insert/remove methods</a>
- <a href="#a-word-about-document-write" class="sidebar__link">A word about “document.write”</a>
- <a href="#summary" class="sidebar__link">Summary</a>

- <a href="#tasks" class="sidebar__link">Tasks (10)</a>
- <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fmodifying-document" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fmodifying-document" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/1-document/07-modifying-document" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="/about" class="page-footer__link">about the project</a>
- <a href="/about#contact-us" class="page-footer__link">contact us</a>
- <a href="/terms" class="page-footer__link">terms of usage</a>
- <a href="/privacy" class="page-footer__link">privacy policy</a>
