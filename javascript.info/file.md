EN

<!-- -->

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ffile" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffile" class="share share_fb"></a>

1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/binary" class="breadcrumbs__link"><span>Binary data, files</span></a></span>

9th April 2020

# File and FileReader

A [File](https://www.w3.org/TR/FileAPI/#dfn-file) object inherits from `Blob` and is extended with filesystem-related capabilities.

There are two ways to obtain it.

First, there’s a constructor, similar to `Blob`:

    new File(fileParts, fileName, [options])

- **`fileParts`** – is an array of Blob/BufferSource/String values.
- **`fileName`** – file name string.
- **`options`** – optional object:
  - **`lastModified`** – the timestamp (integer date) of last modification.

Second, more often we get a file from `<input type="file">` or drag’n’drop or other browser interfaces. In that case, the file gets this information from OS.

As `File` inherits from `Blob`, `File` objects have the same properties, plus:

- `name` – the file name,
- `lastModified` – the timestamp of last modification.

That’s how we can get a `File` object from `<input type="file">`:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <input type="file" onchange="showFile(this)">

    <script>
    function showFile(input) {
      let file = input.files[0];

      alert(`File name: ${file.name}`); // e.g my.png
      alert(`Last modified: ${file.lastModified}`); // e.g 1552830408824
    }
    </script>

<span class="important__type">Please note:</span>

The input may select multiple files, so `input.files` is an array-like object with them. Here we have only one file, so we just take `input.files[0]`.

## <a href="#filereader" id="filereader" class="main__anchor">FileReader</a>

[FileReader](https://www.w3.org/TR/FileAPI/#dfn-filereader) is an object with the sole purpose of reading data from `Blob` (and hence `File` too) objects.

It delivers the data using events, as reading from disk may take time.

The constructor:

    let reader = new FileReader(); // no arguments

The main methods:

- **`readAsArrayBuffer(blob)`** – read the data in binary format `ArrayBuffer`.
- **`readAsText(blob, [encoding])`** – read the data as a text string with the given encoding (`utf-8` by default).
- **`readAsDataURL(blob)`** – read the binary data and encode it as base64 data url.
- **`abort()`** – cancel the operation.

The choice of `read*` method depends on which format we prefer, how we’re going to use the data.

- `readAsArrayBuffer` – for binary files, to do low-level binary operations. For high-level operations, like slicing, `File` inherits from `Blob`, so we can call them directly, without reading.
- `readAsText` – for text files, when we’d like to get a string.
- `readAsDataURL` – when we’d like to use this data in `src` for `img` or another tag. There’s an alternative to reading a file for that, as discussed in chapter [Blob](/blob): `URL.createObjectURL(file)`.

As the reading proceeds, there are events:

- `loadstart` – loading started.
- `progress` – occurs during reading.
- `load` – no errors, reading complete.
- `abort` – `abort()` called.
- `error` – error has occurred.
- `loadend` – reading finished with either success or failure.

When the reading is finished, we can access the result as:

- `reader.result` is the result (if successful)
- `reader.error` is the error (if failed).

The most widely used events are for sure `load` and `error`.

Here’s an example of reading a file:

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <input type="file" onchange="readFile(this)">

    <script>
    function readFile(input) {
      let file = input.files[0];

      let reader = new FileReader();

      reader.readAsText(file);

      reader.onload = function() {
        console.log(reader.result);
      };

      reader.onerror = function() {
        console.log(reader.error);
      };

    }
    </script>

<span class="important__type">`FileReader` for blobs</span>

As mentioned in the chapter [Blob](/blob), `FileReader` can read not just files, but any blobs.

We can use it to convert a blob to another format:

- `readAsArrayBuffer(blob)` – to `ArrayBuffer`,
- `readAsText(blob, [encoding])` – to string (an alternative to `TextDecoder`),
- `readAsDataURL(blob)` – to base64 data url.

<span class="important__type">`FileReaderSync` is available inside Web Workers</span>

For Web Workers, there also exists a synchronous variant of `FileReader`, called [FileReaderSync](https://www.w3.org/TR/FileAPI/#FileReaderSync).

Its reading methods `read*` do not generate events, but rather return a result, as regular functions do.

That’s only inside a Web Worker though, because delays in synchronous calls, that are possible while reading from files, in Web Workers are less important. They do not affect the page.

## <a href="#summary" id="summary" class="main__anchor">Summary</a>

`File` objects inherit from `Blob`.

In addition to `Blob` methods and properties, `File` objects also have `name` and `lastModified` properties, plus the internal ability to read from filesystem. We usually get `File` objects from user input, like `<input>` or Drag’n’Drop events (`ondragend`).

`FileReader` objects can read from a file or a blob, in one of three formats:

- String (`readAsText`).
- `ArrayBuffer` (`readAsArrayBuffer`).
- Data url, base-64 encoded (`readAsDataURL`).

In many cases though, we don’t have to read the file contents. Just as we did with blobs, we can create a short url with `URL.createObjectURL(file)` and assign it to `<a>` or `<img>`. This way the file can be downloaded or shown up as an image, as a part of canvas etc.

And if we’re going to send a `File` over a network, that’s also easy: network API like `XMLHttpRequest` or `fetch` natively accepts `File` objects.

<a href="/blob" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/network" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ffile" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffile" class="share share_fb"></a>

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

- <a href="#filereader" class="sidebar__link">FileReader</a>
- <a href="#summary" class="sidebar__link">Summary</a>

- <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ffile" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ffile" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/4-binary/04-file" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="/about" class="page-footer__link">about the project</a>
- <a href="/about#contact-us" class="page-footer__link">contact us</a>
- <a href="/terms" class="page-footer__link">terms of usage</a>
- <a href="/privacy" class="page-footer__link">privacy policy</a>
