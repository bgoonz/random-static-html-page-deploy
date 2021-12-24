EN

<!-- -->

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fform-elements" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fform-elements" class="share share_fb"></a>

1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/ui" class="breadcrumbs__link"><span>Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="/forms-controls" class="breadcrumbs__link"><span>Forms, controls</span></a></span>

13th March 2021

# Form properties and methods

Forms and control elements, such as `<input>` have a lot of special properties and events.

Working with forms will be much more convenient when we learn them.

## <a href="#navigation-form-and-elements" id="navigation-form-and-elements" class="main__anchor">Navigation: form and elements</a>

Document forms are members of the special collection `document.forms`.

That’s a so-called _“named collection”_: it’s both named and ordered. We can use both the name or the number in the document to get the form.

    document.forms.my; // the form with name="my"
    document.forms[0]; // the first form in the document

When we have a form, then any element is available in the named collection `form.elements`.

For instance:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <form name="my">
      <input name="one" value="1">
      <input name="two" value="2">
    </form>

    <script>
      // get the form
      let form = document.forms.my; // <form name="my"> element

      // get the element
      let elem = form.elements.one; // <input name="one"> element

      alert(elem.value); // 1
    </script>

There may be multiple elements with the same name. This is typical with radio buttons and checkboxes.

In that case, `form.elements[name]` is a _collection_. For instance:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <form>
      <input type="radio" name="age" value="10">
      <input type="radio" name="age" value="20">
    </form>

    <script>
    let form = document.forms[0];

    let ageElems = form.elements.age;

    alert(ageElems[0]); // [object HTMLInputElement]
    </script>

These navigation properties do not depend on the tag structure. All control elements, no matter how deep they are in the form, are available in `form.elements`.

<span class="important__type">Fieldsets as “subforms”</span>

A form may have one or many `<fieldset>` elements inside it. They also have `elements` property that lists form controls inside them.

For instance:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <body>
      <form id="form">
        <fieldset name="userFields">
          <legend>info</legend>
          <input name="login" type="text">
        </fieldset>
      </form>

      <script>
        alert(form.elements.login); // <input name="login">

        let fieldset = form.elements.userFields;
        alert(fieldset); // HTMLFieldSetElement

        // we can get the input by name both from the form and from the fieldset
        alert(fieldset.elements.login == form.elements.login); // true
      </script>
    </body>

<span class="important__type">Shorter notation: `form.name`</span>

There’s a shorter notation: we can access the element as `form[index/name]`.

In other words, instead of `form.elements.login` we can write `form.login`.

That also works, but there’s a minor issue: if we access an element, and then change its `name`, then it is still available under the old name (as well as under the new one).

That’s easy to see in an example:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <form id="form">
      <input name="login">
    </form>

    <script>
      alert(form.elements.login == form.login); // true, the same <input>

      form.login.name = "username"; // change the name of the input

      // form.elements updated the name:
      alert(form.elements.login); // undefined
      alert(form.elements.username); // input

      // form allows both names: the new one and the old one
      alert(form.username == form.login); // true
    </script>

That’s usually not a problem, however, because we rarely change names of form elements.

## <a href="#backreference-element-form" id="backreference-element-form" class="main__anchor">Backreference: element.form</a>

For any element, the form is available as `element.form`. So a form references all elements, and elements reference the form.

Here’s the picture:

<figure><img src="/article/form-elements/form-navigation.svg" width="463" height="150" /></figure>

For instance:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <form id="form">
      <input type="text" name="login">
    </form>

    <script>
      // form -> element
      let login = form.login;

      // element -> form
      alert(login.form); // HTMLFormElement
    </script>

## <a href="#form-elements" id="form-elements" class="main__anchor">Form elements</a>

Let’s talk about form controls.

### <a href="#input-and-textarea" id="input-and-textarea" class="main__anchor">input and textarea</a>

We can access their value as `input.value` (string) or `input.checked` (boolean) for checkboxes.

Like this:

    input.value = "New value";
    textarea.value = "New text";

    input.checked = true; // for a checkbox or radio button

<span class="important__type">Use `textarea.value`, not `textarea.innerHTML`</span>

Please note that even though `<textarea>...</textarea>` holds its value as nested HTML, we should never use `textarea.innerHTML` to access it.

It stores only the HTML that was initially on the page, not the current value.

### <a href="#select-and-option" id="select-and-option" class="main__anchor">select and option</a>

A `<select>` element has 3 important properties:

1.  `select.options` – the collection of `<option>` subelements,
2.  `select.value` – the _value_ of the currently selected `<option>`,
3.  `select.selectedIndex` – the _number_ of the currently selected `<option>`.

They provide three different ways of setting a value for a `<select>`:

1.  Find the corresponding `<option>` element (e.g. among `select.options`) and set its `option.selected` to `true`.
2.  If we know a new value: set `select.value` to the new value.
3.  If we know the new option number: set `select.selectedIndex` to that number.

Here is an example of all three methods:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <select id="select">
      <option value="apple">Apple</option>
      <option value="pear">Pear</option>
      <option value="banana">Banana</option>
    </select>

    <script>
      // all three lines do the same thing
      select.options[2].selected = true;
      select.selectedIndex = 2;
      select.value = 'banana';
      // please note: options start from zero, so index 2 means the 3rd option.
    </script>

Unlike most other controls, `<select>` allows to select multiple options at once if it has `multiple` attribute. This attribute is rarely used, though.

For multiple selected values, use the first way of setting values: add/remove the `selected` property from `<option>` subelements.

Here’s an example of how to get selected values from a multi-select:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <select id="select" multiple>
      <option value="blues" selected>Blues</option>
      <option value="rock" selected>Rock</option>
      <option value="classic">Classic</option>
    </select>

    <script>
      // get all selected values from multi-select
      let selected = Array.from(select.options)
        .filter(option => option.selected)
        .map(option => option.value);

      alert(selected); // blues,rock
    </script>

The full specification of the `<select>` element is available in the specification <https://html.spec.whatwg.org/multipage/forms.html#the-select-element>.

### <a href="#new-option" id="new-option" class="main__anchor">new Option</a>

In the [specification](https://html.spec.whatwg.org/multipage/forms.html#the-option-element) there’s a nice short syntax to create an `<option>` element:

    option = new Option(text, value, defaultSelected, selected);

This syntax is optional. We can use `document.createElement('option')` and set attributes manually. Still, it may be shorter, so here are the parameters:

- `text` – the text inside the option,
- `value` – the option value,
- `defaultSelected` – if `true`, then `selected` HTML-attribute is created,
- `selected` – if `true`, then the option is selected.

The difference between `defaultSelected` and `selected` is that `defaultSelected` sets the HTML-attribute (that we can get using `option.getAttribute('selected')`, while `selected` sets whether the option is selected or not.

In practice, one should usually set _both_ values to `true` or `false`. (Or, simply omit them; both default to `false`.)

For instance, here’s a new “unselected” option:

    let option = new Option("Text", "value");
    // creates <option value="value">Text</option>

The same option, but selected:

    let option = new Option("Text", "value", true, true);

Option elements have properties:

`option.selected`  
Is the option selected.

`option.index`  
The number of the option among the others in its `<select>`.

`option.text`  
Text content of the option (seen by the visitor).

## <a href="#references" id="references" class="main__anchor">References</a>

- Specification: <https://html.spec.whatwg.org/multipage/forms.html>.

## <a href="#summary" id="summary" class="main__anchor">Summary</a>

Form navigation:

`document.forms`  
A form is available as `document.forms[name/index]`.

`form.elements`  
Form elements are available as `form.elements[name/index]`, or can use just `form[name/index]`. The `elements` property also works for `<fieldset>`.

`element.form`  
Elements reference their form in the `form` property.

Value is available as `input.value`, `textarea.value`, `select.value`, etc. (For checkboxes and radio buttons, use `input.checked` to determine whether a value is selected.)

For `<select>`, one can also get the value by the index `select.selectedIndex` or through the options collection `select.options`.

These are the basics to start working with forms. We’ll meet many examples further in the tutorial.

In the next chapter we’ll cover `focus` and `blur` events that may occur on any element, but are mostly handled on forms.

## <a href="#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="#add-an-option-to-select" id="add-an-option-to-select" class="main__anchor">Add an option to select</a>

<a href="/task/add-select-option" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

There’s a `<select>`:

    <select id="genres">
      <option value="rock">Rock</option>
      <option value="blues" selected>Blues</option>
    </select>

Use JavaScript to:

1.  Show the value and the text of the selected option.
2.  Add an option: `<option value="classic">Classic</option>`.
3.  Make it selected.

Note, if you’ve done everything right, your alert should show `blues`.

solution

The solution, step by step:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <select id="genres">
      <option value="rock">Rock</option>
      <option value="blues" selected>Blues</option>
    </select>

    <script>
      // 1)
      let selectedOption = genres.options[genres.selectedIndex];
      alert( selectedOption.value );

      // 2)
      let newOption = new Option("Classic", "classic");
      genres.append(newOption);

      // 3)
      newOption.selected = true;
    </script>

<a href="/forms-controls" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/focus-blur" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fform-elements" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fform-elements" class="share share_fb"></a>

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

- <a href="#navigation-form-and-elements" class="sidebar__link">Navigation: form and elements</a>
- <a href="#backreference-element-form" class="sidebar__link">Backreference: element.form</a>
- <a href="#form-elements" class="sidebar__link">Form elements</a>
- <a href="#references" class="sidebar__link">References</a>
- <a href="#summary" class="sidebar__link">Summary</a>

- <a href="#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fform-elements" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fform-elements" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/4-forms-controls/1-form-elements" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="/about" class="page-footer__link">about the project</a>
- <a href="/about#contact-us" class="page-footer__link">contact us</a>
- <a href="/terms" class="page-footer__link">terms of usage</a>
- <a href="/privacy" class="page-footer__link">privacy policy</a>
