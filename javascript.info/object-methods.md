EN


<!-- -->


We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!



Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fobject-methods" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fobject-methods" class="share share_fb"></a>


1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a></span>
3.  <span id="breadcrumb-2"><a href="/object-basics" class="breadcrumbs__link"><span>Objects: the basics</span></a></span>

4th April 2021

# Object methods, "this"

Objects are usually created to represent entities of the real world, like users, orders and so on:

    let user = {
      name: "John",
      age: 30
    };

And, in the real world, a user can *act*: select something from the shopping cart, login, logout etc.

Actions are represented in JavaScript by functions in properties.

## <a href="#method-examples" id="method-examples" class="main__anchor">Method examples</a>

For a start, let’s teach the `user` to say hello:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let user = {
      name: "John",
      age: 30
    };

    user.sayHi = function() {
      alert("Hello!");
    };

    user.sayHi(); // Hello!

Here we’ve just used a Function Expression to create a function and assign it to the property `user.sayHi` of the object.

Then we can call it as `user.sayHi()`. The user can now speak!

A function that is a property of an object is called its *method*.

So, here we’ve got a method `sayHi` of the object `user`.

Of course, we could use a pre-declared function as a method, like this:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let user = {
      // ...
    };

    // first, declare
    function sayHi() {
      alert("Hello!");
    };

    // then add as a method
    user.sayHi = sayHi;

    user.sayHi(); // Hello!

<span class="important__type">Object-oriented programming</span>

When we write our code using objects to represent entities, that’s called [object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming), in short: “OOP”.

OOP is a big thing, an interesting science of its own. How to choose the right entities? How to organize the interaction between them? That’s architecture, and there are great books on that topic, like “Design Patterns: Elements of Reusable Object-Oriented Software” by E. Gamma, R. Helm, R. Johnson, J. Vissides or “Object-Oriented Analysis and Design with Applications” by G. Booch, and more.

### <a href="#method-shorthand" id="method-shorthand" class="main__anchor">Method shorthand</a>

There exists a shorter syntax for methods in an object literal:

    // these objects do the same

    user = {
      sayHi: function() {
        alert("Hello");
      }
    };

    // method shorthand looks better, right?
    user = {
      sayHi() { // same as "sayHi: function(){...}"
        alert("Hello");
      }
    };

As demonstrated, we can omit `"function"` and just write `sayHi()`.

To tell the truth, the notations are not fully identical. There are subtle differences related to object inheritance (to be covered later), but for now they do not matter. In almost all cases the shorter syntax is preferred.

## <a href="#this-in-methods" id="this-in-methods" class="main__anchor">“this” in methods</a>

It’s common that an object method needs to access the information stored in the object to do its job.

For instance, the code inside `user.sayHi()` may need the name of the `user`.

**To access the object, a method can use the `this` keyword.**

The value of `this` is the object “before dot”, the one used to call the method.

For instance:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let user = {
      name: "John",
      age: 30,

      sayHi() {
        // "this" is the "current object"
        alert(this.name);
      }

    };

    user.sayHi(); // John

Here during the execution of `user.sayHi()`, the value of `this` will be `user`.

Technically, it’s also possible to access the object without `this`, by referencing it via the outer variable:

    let user = {
      name: "John",
      age: 30,

      sayHi() {
        alert(user.name); // "user" instead of "this"
      }

    };

…But such code is unreliable. If we decide to copy `user` to another variable, e.g. `admin = user` and overwrite `user` with something else, then it will access the wrong object.

That’s demonstrated below:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let user = {
      name: "John",
      age: 30,

      sayHi() {
        alert( user.name ); // leads to an error
      }

    };


    let admin = user;
    user = null; // overwrite to make things obvious

    admin.sayHi(); // TypeError: Cannot read property 'name' of null

If we used `this.name` instead of `user.name` inside the `alert`, then the code would work.

## <a href="#this-is-not-bound" id="this-is-not-bound" class="main__anchor">“this” is not bound</a>

In JavaScript, keyword `this` behaves unlike most other programming languages. It can be used in any function, even if it’s not a method of an object.

There’s no syntax error in the following example:

    function sayHi() {
      alert( this.name );
    }

The value of `this` is evaluated during the run-time, depending on the context.

For instance, here the same function is assigned to two different objects and has different “this” in the calls:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let user = { name: "John" };
    let admin = { name: "Admin" };

    function sayHi() {
      alert( this.name );
    }

    // use the same function in two objects
    user.f = sayHi;
    admin.f = sayHi;

    // these calls have different this
    // "this" inside the function is the object "before the dot"
    user.f(); // John  (this == user)
    admin.f(); // Admin  (this == admin)

    admin['f'](); // Admin (dot or square brackets access the method – doesn't matter)

The rule is simple: if `obj.f()` is called, then `this` is `obj` during the call of `f`. So it’s either `user` or `admin` in the example above.

<span class="important__type">Calling without an object: `this == undefined`</span>

We can even call the function without an object at all:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function sayHi() {
      alert(this);
    }

    sayHi(); // undefined

In this case `this` is `undefined` in strict mode. If we try to access `this.name`, there will be an error.

In non-strict mode the value of `this` in such case will be the *global object* (`window` in a browser, we’ll get to it later in the chapter [Global object](/global-object)). This is a historical behavior that `"use strict"` fixes.

Usually such call is a programming error. If there’s `this` inside a function, it expects to be called in an object context.

<span class="important__type">The consequences of unbound `this`</span>

If you come from another programming language, then you are probably used to the idea of a "bound `this`", where methods defined in an object always have `this` referencing that object.

In JavaScript `this` is “free”, its value is evaluated at call-time and does not depend on where the method was declared, but rather on what object is “before the dot”.

The concept of run-time evaluated `this` has both pluses and minuses. On the one hand, a function can be reused for different objects. On the other hand, the greater flexibility creates more possibilities for mistakes.

Here our position is not to judge whether this language design decision is good or bad. We’ll understand how to work with it, how to get benefits and avoid problems.

## <a href="#arrow-functions-have-no-this" id="arrow-functions-have-no-this" class="main__anchor">Arrow functions have no “this”</a>

Arrow functions are special: they don’t have their “own” `this`. If we reference `this` from such a function, it’s taken from the outer “normal” function.

For instance, here `arrow()` uses `this` from the outer `user.sayHi()` method:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let user = {
      firstName: "Ilya",
      sayHi() {
        let arrow = () => alert(this.firstName);
        arrow();
      }
    };

    user.sayHi(); // Ilya

That’s a special feature of arrow functions, it’s useful when we actually do not want to have a separate `this`, but rather to take it from the outer context. Later in the chapter [Arrow functions revisited](/arrow-functions) we’ll go more deeply into arrow functions.

## <a href="#summary" id="summary" class="main__anchor">Summary</a>

-   Functions that are stored in object properties are called “methods”.
-   Methods allow objects to “act” like `object.doSomething()`.
-   Methods can reference the object as `this`.

The value of `this` is defined at run-time.

-   When a function is declared, it may use `this`, but that `this` has no value until the function is called.
-   A function can be copied between objects.
-   When a function is called in the “method” syntax: `object.method()`, the value of `this` during the call is `object`.

Please note that arrow functions are special: they have no `this`. When `this` is accessed inside an arrow function, it is taken from outside.

## <a href="#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="#using-this-in-object-literal" id="using-this-in-object-literal" class="main__anchor">Using "this" in object literal</a>

<a href="/task/object-property-this" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Here the function `makeUser` returns an object.

What is the result of accessing its `ref`? Why?

    function makeUser() {
      return {
        name: "John",
        ref: this
      };
    }

    let user = makeUser();

    alert( user.ref.name ); // What's the result?

solution

**Answer: an error.**

Try it:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function makeUser() {
      return {
        name: "John",
        ref: this
      };
    }

    let user = makeUser();

    alert( user.ref.name ); // Error: Cannot read property 'name' of undefined

That’s because rules that set `this` do not look at object definition. Only the moment of call matters.

Here the value of `this` inside `makeUser()` is `undefined`, because it is called as a function, not as a method with “dot” syntax.

The value of `this` is one for the whole function, code blocks and object literals do not affect it.

So `ref: this` actually takes current `this` of the function.

We can rewrite the function and return the same `this` with `undefined` value:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function makeUser(){
      return this; // this time there's no object literal
    }

    alert( makeUser().name ); // Error: Cannot read property 'name' of undefined

As you can see the result of `alert( makeUser().name )` is the same as the result of `alert( user.ref.name )` from the previous example.

Here’s the opposite case:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function makeUser() {
      return {
        name: "John",
        ref() {
          return this;
        }
      };
    }

    let user = makeUser();

    alert( user.ref().name ); // John

Now it works, because `user.ref()` is a method. And the value of `this` is set to the object before dot `.`.

### <a href="#create-a-calculator" id="create-a-calculator" class="main__anchor">Create a calculator</a>

<a href="/task/calculator" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create an object `calculator` with three methods:

-   `read()` prompts for two values and saves them as object properties.
-   `sum()` returns the sum of saved values.
-   `mul()` multiplies saved values and returns the result.

    let calculator = {
      // ... your code ...
    };

    calculator.read();
    alert( calculator.sum() );
    alert( calculator.mul() );

[Run the demo](#)

[Open a sandbox with tests.](https://plnkr.co/edit/8rDRJ4cWja4gSda3?p=preview)

solution

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let calculator = {
      sum() {
        return this.a + this.b;
      },

      mul() {
        return this.a * this.b;
      },

      read() {
        this.a = +prompt('a?', 0);
        this.b = +prompt('b?', 0);
      }
    };

    calculator.read();
    alert( calculator.sum() );
    alert( calculator.mul() );

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/4PgrcZqUrY5Givw8?p=preview)

### <a href="#chaining" id="chaining" class="main__anchor">Chaining</a>

<a href="/task/chain-calls" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 2</span>

There’s a `ladder` object that allows to go up and down:

    let ladder = {
      step: 0,
      up() {
        this.step++;
      },
      down() {
        this.step--;
      },
      showStep: function() { // shows the current step
        alert( this.step );
      }
    };

Now, if we need to make several calls in sequence, can do it like this:

    ladder.up();
    ladder.up();
    ladder.down();
    ladder.showStep(); // 1

Modify the code of `up`, `down` and `showStep` to make the calls chainable, like this:

    ladder.up().up().down().showStep(); // 1

Such approach is widely used across JavaScript libraries.

[Open a sandbox with tests.](https://plnkr.co/edit/0xLdTTzOOYbWQtqN?p=preview)

solution

The solution is to return the object itself from every call.

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let ladder = {
      step: 0,
      up() {
        this.step++;
        return this;
      },
      down() {
        this.step--;
        return this;
      },
      showStep() {
        alert( this.step );
        return this;
      }
    };

    ladder.up().up().down().up().down().showStep(); // 1

We also can write a single call per line. For long chains it’s more readable:

    ladder
      .up()
      .up()
      .down()
      .up()
      .down()
      .showStep(); // 1

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/ZHJkcGTien66f0ix?p=preview)

<a href="/garbage-collection" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/constructor-new" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fobject-methods" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fobject-methods" class="share share_fb"></a>

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

## <a href="#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

-   If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
-   If you can't understand something in the article – please elaborate.
-   To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="/tutorial/map" class="map"></a>

#### Chapter

-   <a href="/object-basics" class="sidebar__link">Objects: the basics</a>

#### Lesson navigation

-   <a href="#method-examples" class="sidebar__link">Method examples</a>
-   <a href="#this-in-methods" class="sidebar__link">“this” in methods</a>
-   <a href="#this-is-not-bound" class="sidebar__link">“this” is not bound</a>
-   <a href="#arrow-functions-have-no-this" class="sidebar__link">Arrow functions have no “this”</a>
-   <a href="#summary" class="sidebar__link">Summary</a>

-   <a href="#tasks" class="sidebar__link">Tasks (3)</a>
-   <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fobject-methods" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fobject-methods" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/1-js/04-object-basics/04-object-methods" class="sidebar__link">Edit on GitHub</a>

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
