EN

<!-- -->

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Farraybuffer-binary-arrays" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Farraybuffer-binary-arrays" class="share share_fb"></a>

1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/binary" class="breadcrumbs__link"><span>Binary data, files</span></a></span>

1st November 2021

# ArrayBuffer, binary arrays

In web-development we meet binary data mostly while dealing with files (create, upload, download). Another typical use case is image processing.

That’s all possible in JavaScript, and binary operations are high-performant.

Although, there’s a bit of confusion, because there are many classes. To name a few:

- `ArrayBuffer`, `Uint8Array`, `DataView`, `Blob`, `File`, etc.

Binary data in JavaScript is implemented in a non-standard way, compared to other languages. But when we sort things out, everything becomes fairly simple.

**The basic binary object is `ArrayBuffer` – a reference to a fixed-length contiguous memory area.**

We create it like this:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let buffer = new ArrayBuffer(16); // create a buffer of length 16
    alert(buffer.byteLength); // 16

This allocates a contiguous memory area of 16 bytes and pre-fills it with zeroes.

<span class="important__type">`ArrayBuffer` is not an array of something</span>

Let’s eliminate a possible source of confusion. `ArrayBuffer` has nothing in common with `Array`:

- It has a fixed length, we can’t increase or decrease it.
- It takes exactly that much space in the memory.
- To access individual bytes, another “view” object is needed, not `buffer[index]`.

`ArrayBuffer` is a memory area. What’s stored in it? It has no clue. Just a raw sequence of bytes.

**To manipulate an `ArrayBuffer`, we need to use a “view” object.**

A view object does not store anything on it’s own. It’s the “eyeglasses” that give an interpretation of the bytes stored in the `ArrayBuffer`.

For instance:

- **`Uint8Array`** – treats each byte in `ArrayBuffer` as a separate number, with possible values from 0 to 255 (a byte is 8-bit, so it can hold only that much). Such value is called a “8-bit unsigned integer”.
- **`Uint16Array`** – treats every 2 bytes as an integer, with possible values from 0 to 65535. That’s called a “16-bit unsigned integer”.
- **`Uint32Array`** – treats every 4 bytes as an integer, with possible values from 0 to 4294967295. That’s called a “32-bit unsigned integer”.
- **`Float64Array`** – treats every 8 bytes as a floating point number with possible values from `5.0x10-324` to `1.8x10308`.

So, the binary data in an `ArrayBuffer` of 16 bytes can be interpreted as 16 “tiny numbers”, or 8 bigger numbers (2 bytes each), or 4 even bigger (4 bytes each), or 2 floating-point values with high precision (8 bytes each).

<figure><img src="/article/arraybuffer-binary-arrays/arraybuffer-views.svg" width="603" height="286" /></figure>

`ArrayBuffer` is the core object, the root of everything, the raw binary data.

But if we’re going to write into it, or iterate over it, basically for almost any operation – we must use a view, e.g:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let buffer = new ArrayBuffer(16); // create a buffer of length 16

    let view = new Uint32Array(buffer); // treat buffer as a sequence of 32-bit integers

    alert(Uint32Array.BYTES_PER_ELEMENT); // 4 bytes per integer

    alert(view.length); // 4, it stores that many integers
    alert(view.byteLength); // 16, the size in bytes

    // let's write a value
    view[0] = 123456;

    // iterate over values
    for(let num of view) {
      alert(num); // 123456, then 0, 0, 0 (4 values total)
    }

## <a href="#typedarray" id="typedarray" class="main__anchor">TypedArray</a>

The common term for all these views (`Uint8Array`, `Uint32Array`, etc) is [TypedArray](https://tc39.github.io/ecma262/#sec-typedarray-objects). They share the same set of methods and properities.

Please note, there’s no constructor called `TypedArray`, it’s just a common “umbrella” term to represent one of views over `ArrayBuffer`: `Int8Array`, `Uint8Array` and so on, the full list will soon follow.

When you see something like `new TypedArray`, it means any of `new Int8Array`, `new Uint8Array`, etc.

Typed arrays behave like regular arrays: have indexes and are iterable.

A typed array constructor (be it `Int8Array` or `Float64Array`, doesn’t matter) behaves differently depending on argument types.

There are 5 variants of arguments:

    new TypedArray(buffer, [byteOffset], [length]);
    new TypedArray(object);
    new TypedArray(typedArray);
    new TypedArray(length);
    new TypedArray();

1.  If an `ArrayBuffer` argument is supplied, the view is created over it. We used that syntax already.

    Optionally we can provide `byteOffset` to start from (0 by default) and the `length` (till the end of the buffer by default), then the view will cover only a part of the `buffer`.

2.  If an `Array`, or any array-like object is given, it creates a typed array of the same length and copies the content.

    We can use it to pre-fill the array with the data:

    <a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

    <a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        let arr = new Uint8Array([0, 1, 2, 3]);
        alert( arr.length ); // 4, created binary array of the same length
        alert( arr[1] ); // 1, filled with 4 bytes (unsigned 8-bit integers) with given values

3.  If another `TypedArray` is supplied, it does the same: creates a typed array of the same length and copies values. Values are converted to the new type in the process, if needed.

    <a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

    <a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        let arr16 = new Uint16Array([1, 1000]);
        let arr8 = new Uint8Array(arr16);
        alert( arr8[0] ); // 1
        alert( arr8[1] ); // 232, tried to copy 1000, but can't fit 1000 into 8 bits (explanations below)

4.  For a numeric argument `length` – creates the typed array to contain that many elements. Its byte length will be `length` multiplied by the number of bytes in a single item `TypedArray.BYTES_PER_ELEMENT`:

    <a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

    <a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

        let arr = new Uint16Array(4); // create typed array for 4 integers
        alert( Uint16Array.BYTES_PER_ELEMENT ); // 2 bytes per integer
        alert( arr.byteLength ); // 8 (size in bytes)

5.  Without arguments, creates an zero-length typed array.

We can create a `TypedArray` directly, without mentioning `ArrayBuffer`. But a view cannot exist without an underlying `ArrayBuffer`, so gets created automatically in all these cases except the first one (when provided).

To access the underlying `ArrayBuffer`, there are following properties in `TypedArray`:

- `buffer` – references the `ArrayBuffer`.
- `byteLength` – the length of the `ArrayBuffer`.

So, we can always move from one view to another:

    let arr8 = new Uint8Array([0, 1, 2, 3]);

    // another view on the same data
    let arr16 = new Uint16Array(arr8.buffer);

Here’s the list of typed arrays:

- `Uint8Array`, `Uint16Array`, `Uint32Array` – for integer numbers of 8, 16 and 32 bits.
  - `Uint8ClampedArray` – for 8-bit integers, “clamps” them on assignment (see below).
- `Int8Array`, `Int16Array`, `Int32Array` – for signed integer numbers (can be negative).
- `Float32Array`, `Float64Array` – for signed floating-point numbers of 32 and 64 bits.

<span class="important__type">No `int8` or similar single-valued types</span>

Please note, despite of the names like `Int8Array`, there’s no single-value type like `int`, or `int8` in JavaScript.

That’s logical, as `Int8Array` is not an array of these individual values, but rather a view on `ArrayBuffer`.

### <a href="#out-of-bounds-behavior" id="out-of-bounds-behavior" class="main__anchor">Out-of-bounds behavior</a>

What if we attempt to write an out-of-bounds value into a typed array? There will be no error. But extra bits are cut-off.

For instance, let’s try to put 256 into `Uint8Array`. In binary form, 256 is `100000000` (9 bits), but `Uint8Array` only provides 8 bits per value, that makes the available range from 0 to 255.

For bigger numbers, only the rightmost (less significant) 8 bits are stored, and the rest is cut off:

<figure><img src="/article/arraybuffer-binary-arrays/8bit-integer-256.svg" width="195" height="145" /></figure>

So we’ll get zero.

For 257, the binary form is `100000001` (9 bits), the rightmost 8 get stored, so we’ll have `1` in the array:

<figure><img src="/article/arraybuffer-binary-arrays/8bit-integer-257.svg" width="195" height="145" /></figure>

In other words, the number modulo 2<sup>8</sup> is saved.

Here’s the demo:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    let uint8array = new Uint8Array(16);

    let num = 256;
    alert(num.toString(2)); // 100000000 (binary representation)

    uint8array[0] = 256;
    uint8array[1] = 257;

    alert(uint8array[0]); // 0
    alert(uint8array[1]); // 1

`Uint8ClampedArray` is special in this aspect, its behavior is different. It saves 255 for any number that is greater than 255, and 0 for any negative number. That behavior is useful for image processing.

## <a href="#typedarray-methods" id="typedarray-methods" class="main__anchor">TypedArray methods</a>

`TypedArray` has regular `Array` methods, with notable exceptions.

We can iterate, `map`, `slice`, `find`, `reduce` etc.

There are few things we can’t do though:

- No `splice` – we can’t “delete” a value, because typed arrays are views on a buffer, and these are fixed, contiguous areas of memory. All we can do is to assign a zero.
- No `concat` method.

There are two additional methods:

- `arr.set(fromArr, [offset])` copies all elements from `fromArr` to the `arr`, starting at position `offset` (0 by default).
- `arr.subarray([begin, end])` creates a new view of the same type from `begin` to `end` (exclusive). That’s similar to `slice` method (that’s also supported), but doesn’t copy anything – just creates a new view, to operate on the given piece of data.

These methods allow us to copy typed arrays, mix them, create new arrays from existing ones, and so on.

## <a href="#dataview" id="dataview" class="main__anchor">DataView</a>

[DataView](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) is a special super-flexible “untyped” view over `ArrayBuffer`. It allows to access the data on any offset in any format.

- For typed arrays, the constructor dictates what the format is. The whole array is supposed to be uniform. The i-th number is `arr[i]`.
- With `DataView` we access the data with methods like `.getUint8(i)` or `.getUint16(i)`. We choose the format at method call time instead of the construction time.

The syntax:

    new DataView(buffer, [byteOffset], [byteLength])

- **`buffer`** – the underlying `ArrayBuffer`. Unlike typed arrays, `DataView` doesn’t create a buffer on its own. We need to have it ready.
- **`byteOffset`** – the starting byte position of the view (by default 0).
- **`byteLength`** – the byte length of the view (by default till the end of `buffer`).

For instance, here we extract numbers in different formats from the same buffer:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    // binary array of 4 bytes, all have the maximal value 255
    let buffer = new Uint8Array([255, 255, 255, 255]).buffer;

    let dataView = new DataView(buffer);

    // get 8-bit number at offset 0
    alert( dataView.getUint8(0) ); // 255

    // now get 16-bit number at offset 0, it consists of 2 bytes, together interpreted as 65535
    alert( dataView.getUint16(0) ); // 65535 (biggest 16-bit unsigned int)

    // get 32-bit number at offset 0
    alert( dataView.getUint32(0) ); // 4294967295 (biggest 32-bit unsigned int)

    dataView.setUint32(0, 0); // set 4-byte number to zero, thus setting all bytes to 0

`DataView` is great when we store mixed-format data in the same buffer. For example, when we store a sequence of pairs (16-bit integer, 32-bit float), `DataView` allows to access them easily.

## <a href="#summary" id="summary" class="main__anchor">Summary</a>

`ArrayBuffer` is the core object, a reference to the fixed-length contiguous memory area.

To do almost any operation on `ArrayBuffer`, we need a view.

- It can be a `TypedArray`:
  - `Uint8Array`, `Uint16Array`, `Uint32Array` – for unsigned integers of 8, 16, and 32 bits.
  - `Uint8ClampedArray` – for 8-bit integers, “clamps” them on assignment.
  - `Int8Array`, `Int16Array`, `Int32Array` – for signed integer numbers (can be negative).
  - `Float32Array`, `Float64Array` – for signed floating-point numbers of 32 and 64 bits.
- Or a `DataView` – the view that uses methods to specify a format, e.g. `getUint8(offset)`.

In most cases we create and operate directly on typed arrays, leaving `ArrayBuffer` under cover, as a “common denominator”. We can access it as `.buffer` and make another view if needed.

There are also two additional terms, that are used in descriptions of methods that operate on binary data:

- `ArrayBufferView` is an umbrella term for all these kinds of views.
- `BufferSource` is an umbrella term for `ArrayBuffer` or `ArrayBufferView`.

We’ll see these terms in the next chapters. `BufferSource` is one of the most common terms, as it means “any kind of binary data” – an `ArrayBuffer` or a view over it.

Here’s a cheatsheet:

<figure><img src="/article/arraybuffer-binary-arrays/arraybuffer-view-buffersource.svg" width="707" height="463" /></figure>

## <a href="#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="#concatenate-typed-arrays" id="concatenate-typed-arrays" class="main__anchor">Concatenate typed arrays</a>

<a href="/task/concat" class="task__open-link"></a>

Given an array of `Uint8Array`, write a function `concat(arrays)` that returns a concatenation of them into a single array.

[Open a sandbox with tests.](https://plnkr.co/edit/iyG5tfOchHTHKIrt?p=preview)

solution

    function concat(arrays) {
      // sum of individual array lengths
      let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

      if (!arrays.length) return null;

      let result = new Uint8Array(totalLength);

      // for each array - copy it over result
      // next array is copied right after the previous one
      let length = 0;
      for(let array of arrays) {
        result.set(array, length);
        length += array.length;
      }

      return result;
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/sazJ16sytvM74sAH?p=preview)

<a href="/binary" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/text-decoder" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Farraybuffer-binary-arrays" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Farraybuffer-binary-arrays" class="share share_fb"></a>

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

## <a href="#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="/tutorial/map" class="map"></a>

#### Chapter

- <a href="/binary" class="sidebar__link">Binary data, files</a>

#### Lesson navigation

- <a href="#typedarray" class="sidebar__link">TypedArray</a>
- <a href="#typedarray-methods" class="sidebar__link">TypedArray methods</a>
- <a href="#dataview" class="sidebar__link">DataView</a>
- <a href="#summary" class="sidebar__link">Summary</a>

- <a href="#tasks" class="sidebar__link">Tasks (1)</a>
- <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Farraybuffer-binary-arrays" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Farraybuffer-binary-arrays" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/4-binary/01-arraybuffer-binary-arrays" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="/about" class="page-footer__link">about the project</a>
- <a href="/about#contact-us" class="page-footer__link">contact us</a>
- <a href="/terms" class="page-footer__link">terms of usage</a>
- <a href="/privacy" class="page-footer__link">privacy policy</a>
