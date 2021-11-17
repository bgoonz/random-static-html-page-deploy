EN

-   <a href="https://ar.javascript.info/task/rewrite-async-2" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/rewrite-async-2" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/rewrite-async-2" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/rewrite-async-2" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/task/rewrite-async-2" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/rewrite-async-2" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/rewrite-async-2" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/rewrite-async-2" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/rewrite-async-2" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/task/rewrite-async-2" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/rewrite-async-2" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Frewrite-async-2" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Frewrite-async-2" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a>

<a href="/async" class="breadcrumbs__link"><span>Promises, async/await</span></a>

<a href="/async-await" class="breadcrumbs__link"><span>Async/await</span></a>

<a href="/async-await" class="task-single__back"><span>back to the lesson</span></a>

## Rewrite "rethrow" with async/await

Below you can find the “rethrow” example. Rewrite it using `async/await` instead of `.then/catch`.

And get rid of the recursion in favour of a loop in `demoGithubUser`: with `async/await` that becomes easy to do.

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class HttpError extends Error {
      constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
      }
    }

    function loadJson(url) {
      return fetch(url)
        .then(response => {
          if (response.status == 200) {
            return response.json();
          } else {
            throw new HttpError(response);
          }
        });
    }

    // Ask for a user name until github returns a valid user
    function demoGithubUser() {
      let name = prompt("Enter a name?", "iliakan");

      return loadJson(`https://api.github.com/users/${name}`)
        .then(user => {
          alert(`Full name: ${user.name}.`);
          return user;
        })
        .catch(err => {
          if (err instanceof HttpError && err.response.status == 404) {
            alert("No such user, please reenter.");
            return demoGithubUser();
          } else {
            throw err;
          }
        });
    }

    demoGithubUser();

solution

There are no tricks here. Just replace `.catch` with `try..catch` inside `demoGithubUser` and add `async/await` where needed:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    class HttpError extends Error {
      constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
      }
    }

    async function loadJson(url) {
      let response = await fetch(url);
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    }

    // Ask for a user name until github returns a valid user
    async function demoGithubUser() {

      let user;
      while(true) {
        let name = prompt("Enter a name?", "iliakan");

        try {
          user = await loadJson(`https://api.github.com/users/${name}`);
          break; // no error, exit loop
        } catch(err) {
          if (err instanceof HttpError && err.response.status == 404) {
            // loop continues after the alert
            alert("No such user, please reenter.");
          } else {
            // unknown error, rethrow
            throw err;
          }
        }
      }


      alert(`Full name: ${user.name}.`);
      return user;
    }

    demoGithubUser();

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
