EN

-   <a href="https://ar.javascript.info/task/format-date-relative" class="supported-langs__link"><span class="supported-langs__brief">AR</span><span class="supported-langs__title">عربي</span></a>
-   <a href="https://javascript.info/task/format-date-relative" class="supported-langs__link"><span class="supported-langs__brief">EN</span><span class="supported-langs__title">English</span></a>
-   <a href="https://es.javascript.info/task/format-date-relative" class="supported-langs__link"><span class="supported-langs__brief">ES</span><span class="supported-langs__title">Español</span></a>
-   <a href="https://fr.javascript.info/task/format-date-relative" class="supported-langs__link"><span class="supported-langs__brief">FR</span><span class="supported-langs__title">Français</span></a>
-   <a href="https://id.javascript.info/task/format-date-relative" class="supported-langs__link"><span class="supported-langs__brief">ID</span><span class="supported-langs__title">Indonesia</span></a>
-   <a href="https://it.javascript.info/task/format-date-relative" class="supported-langs__link"><span class="supported-langs__brief">IT</span><span class="supported-langs__title">Italiano</span></a>

<!-- -->

-   <a href="https://ja.javascript.info/task/format-date-relative" class="supported-langs__link"><span class="supported-langs__brief">JA</span><span class="supported-langs__title">日本語</span></a>
-   <a href="https://ko.javascript.info/task/format-date-relative" class="supported-langs__link"><span class="supported-langs__brief">KO</span><span class="supported-langs__title">한국어</span></a>
-   <a href="https://learn.javascript.ru/task/format-date-relative" class="supported-langs__link"><span class="supported-langs__brief">RU</span><span class="supported-langs__title">Русский</span></a>
-   <a href="https://tr.javascript.info/task/format-date-relative" class="supported-langs__link"><span class="supported-langs__brief">TR</span><span class="supported-langs__title">Türkçe</span></a>
-   <a href="https://zh.javascript.info/task/format-date-relative" class="supported-langs__link"><span class="supported-langs__brief">ZH</span><span class="supported-langs__title">简体中文</span></a>

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

<a href="/" class="sitetoolbar__link sitetoolbar__link_logo"><img src="/img/sitetoolbar__logo_en.svg" class="sitetoolbar__logo sitetoolbar__logo_normal" role="presentation" width="200" /><img src="/img/sitetoolbar__logo_small_en.svg" class="sitetoolbar__logo sitetoolbar__logo_small" role="presentation" width="70" /></a>

<a href="/ebook" class="buy-book-button"><span class="buy-book-button__extra-text">Buy</span>EPUB/PDF</a>

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Ftask%2Fformat-date-relative" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Ftask%2Fformat-date-relative" class="share share_fb"></a>

عربيEnglishEspañolFrançaisIndonesiaItaliano日本語한국어РусскийTürkçe简体中文

<a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

<a href="/js" class="breadcrumbs__link"><span>The JavaScript language</span></a>

<a href="/data-types" class="breadcrumbs__link"><span>Data types</span></a>

<a href="/date" class="breadcrumbs__link"><span>Date and time</span></a>

<a href="/date" class="task-single__back"><span>back to the lesson</span></a>

## Format the relative date

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Write a function `formatDate(date)` that should format `date` as follows:

-   If since `date` passed less than 1 second, then `"right now"`.
-   Otherwise, if since `date` passed less than 1 minute, then `"n sec. ago"`.
-   Otherwise, if less than an hour, then `"m min. ago"`.
-   Otherwise, the full date in the format `"DD.MM.YY HH:mm"`. That is: `"day.month.year hours:minutes"`, all in 2-digit format, e.g. `31.12.16 10:00`.

For instance:

    alert( formatDate(new Date(new Date - 1)) ); // "right now"

    alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

    alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

    // yesterday's date like 31.12.16 20:00
    alert( formatDate(new Date(new Date - 86400 * 1000)) );

[Open a sandbox with tests.](https://plnkr.co/edit/Wsp9lIL4pPLoApph?p=preview)

solution

To get the time from `date` till now – let’s substract the dates.

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function formatDate(date) {
      let diff = new Date() - date; // the difference in milliseconds

      if (diff < 1000) { // less than 1 second
        return 'right now';
      }

      let sec = Math.floor(diff / 1000); // convert diff to seconds

      if (sec < 60) {
        return sec + ' sec. ago';
      }

      let min = Math.floor(diff / 60000); // convert diff to minutes
      if (min < 60) {
        return min + ' min. ago';
      }

      // format the date
      // add leading zeroes to single-digit day/month/hours/minutes
      let d = date;
      d = [
        '0' + d.getDate(),
        '0' + (d.getMonth() + 1),
        '' + d.getFullYear(),
        '0' + d.getHours(),
        '0' + d.getMinutes()
      ].map(component => component.slice(-2)); // take last 2 digits of every component

      // join the components into date
      return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
    }

    alert( formatDate(new Date(new Date - 1)) ); // "right now"

    alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

    alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

    // yesterday's date like 31.12.2016 20:00
    alert( formatDate(new Date(new Date - 86400 * 1000)) );

Alternative solution:

<a href="#" class="toolbar__button toolbar__button_run" title="run"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    function formatDate(date) {
      let dayOfMonth = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let hour = date.getHours();
      let minutes = date.getMinutes();
      let diffMs = new Date() - date;
      let diffSec = Math.round(diffMs / 1000);
      let diffMin = diffSec / 60;
      let diffHour = diffMin / 60;

      // formatting
      year = year.toString().slice(-2);
      month = month < 10 ? '0' + month : month;
      dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
      hour = hour < 10 ? '0' + hour : hour;
      minutes = minutes < 10 ? '0' + minutes : minutes;

      if (diffSec < 1) {
        return 'right now';
      } else if (diffMin < 1) {
        return `${diffSec} sec. ago`
      } else if (diffHour < 1) {
        return `${diffMin} min. ago`
      } else {
        return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
      }
    }

[Open the solution with tests in a sandbox.](https://plnkr.co/edit/mUc0gvvIUZRqoY27?p=preview)

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
