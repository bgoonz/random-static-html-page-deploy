EN

<!-- -->

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fonscroll" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fonscroll" class="share share_fb"></a>

1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/ui" class="breadcrumbs__link"><span>Browser: Document, Events, Interfaces</span></a></span>
3.  <span id="breadcrumb-2"><a href="/event-details" class="breadcrumbs__link"><span>UI Events</span></a></span>

27th August 2020

# Scrolling

The `scroll` event allows reacting to a page or element scrolling. There are quite a few good things we can do here.

For instance:

- Show/hide additional controls or information depending on where in the document the user is.
- Load more data when the user scrolls down till the end of the page.

Here’s a small function to show the current scroll:

    window.addEventListener('scroll', function() {
      document.getElementById('showScroll').innerHTML = window.pageYOffset + 'px';
    });

In action:

Current scroll = **scroll the window**

The `scroll` event works both on the `window` and on scrollable elements.

## <a href="#prevent-scrolling" id="prevent-scrolling" class="main__anchor">Prevent scrolling</a>

How do we make something unscrollable?

We can’t prevent scrolling by using `event.preventDefault()` in `onscroll` listener, because it triggers _after_ the scroll has already happened.

But we can prevent scrolling by `event.preventDefault()` on an event that causes the scroll, for instance `keydown` event for <span class="kbd shortcut">pageUp</span> and <span class="kbd shortcut">pageDown</span>.

If we add an event handler to these events and `event.preventDefault()` in it, then the scroll won’t start.

There are many ways to initiate a scroll, so it’s more reliable to use CSS, `overflow` property.

Here are few tasks that you can solve or look through to see applications of `onscroll`.

## <a href="#tasks" class="tasks__title-anchor main__anchor main__anchor main__anchor_noicon">Tasks</a>

### <a href="#endless-page" id="endless-page" class="main__anchor">Endless page</a>

<a href="/task/endless-page" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create an endless page. When a visitor scrolls it to the end, it auto-appends current date-time to the text (so that a visitor can scroll more).

Like this:

# Scroll me

Please note two important features of the scroll:

1.  **The scroll is “elastic”.** We can scroll a little beyond the document start or end in some browsers/devices (empty space below is shown, and then the document will automatically “bounces back” to normal).
2.  **The scroll is imprecise.** When we scroll to page end, then we may be in fact like 0-50px away from the real document bottom.

So, “scrolling to the end” should mean that the visitor is no more than 100px away from the document end.

P.S. In real life we may want to show “more messages” or “more goods”.

[Open a sandbox for the task.](https://plnkr.co/edit/9og7bth6RKWq4fnw?p=preview)

solution

The core of the solution is a function that adds more dates to the page (or loads more stuff in real-life) while we’re at the page end.

We can call it immediately and add as a `window.onscroll` handler.

The most important question is: “How do we detect that the page is scrolled to bottom?”

Let’s use window-relative coordinates.

The document is represented (and contained) within `<html>` tag, that is `document.documentElement`.

We can get window-relative coordinates of the whole document as `document.documentElement.getBoundingClientRect()`, the `bottom` property will be window-relative coordinate of the document bottom.

For instance, if the height of the whole HTML document is `2000px`, then:

    // when we're on the top of the page
    // window-relative top = 0
    document.documentElement.getBoundingClientRect().top = 0

    // window-relative bottom = 2000
    // the document is long, so that is probably far beyond the window bottom
    document.documentElement.getBoundingClientRect().bottom = 2000

If we scroll `500px` below, then:

    // document top is above the window 500px
    document.documentElement.getBoundingClientRect().top = -500
    // document bottom is 500px closer
    document.documentElement.getBoundingClientRect().bottom = 1500

When we scroll till the end, assuming that the window height is `600px`:

    // document top is above the window 1400px
    document.documentElement.getBoundingClientRect().top = -1400
    // document bottom is below the window 600px
    document.documentElement.getBoundingClientRect().bottom = 600

Please note that the `bottom` can’t be `0`, because it never reaches the window top. The lowest limit of the `bottom` coordinate is the window height (we assumed it to be `600`), we can’t scroll it any more up.

We can obtain the window height as `document.documentElement.clientHeight`.

For our task, we need to know when the document bottom is not no more than `100px` away from it (that is: `600-700px`, if the height is `600`).

So here’s the function:

    function populate() {
      while(true) {
        // document bottom
        let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

        // if the user hasn't scrolled far enough (>100px to the end)
        if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;

        // let's add more data
        document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
      }
    }

[Open the solution in a sandbox.](https://plnkr.co/edit/VVJZRWimYbGiMkqJ?p=preview)

### <a href="#up-down-button" id="up-down-button" class="main__anchor">Up/down button</a>

<a href="/task/updown-button" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 5</span>

Create a “to the top” button to help with page scrolling.

It should work like this:

- While the page is not scrolled down at least for the window height – it’s invisible.
- When the page is scrolled down more than the window height – there appears an “upwards” arrow in the left-top corner. If the page is scrolled back, it disappears.
- When the arrow is clicked, the page scrolls to the top.

Like this (top-left corner, scroll to see):

<a href="https://en.js.cx/task/updown-button/solution/" class="toolbar__button toolbar__button_external" title="open in new window"></a>

[Open a sandbox for the task.](https://plnkr.co/edit/DqgU6NJ1rB6Wdq42?p=preview)

solution

[Open the solution in a sandbox.](https://plnkr.co/edit/pfARI2TpxF80roQY?p=preview)

### <a href="#load-visible-images" id="load-visible-images" class="main__anchor">Load visible images</a>

<a href="/task/load-visible-img" class="task__open-link"></a>

<span class="task__importance" title="How important is the task, from 1 to 5">importance: 4</span>

Let’s say we have a slow-speed client and want to save their mobile traffic.

For that purpose we decide not to show images immediately, but rather replace them with placeholders, like this:

    <img src="placeholder.svg" width="128" height="128" data-src="real.jpg">

So, initially all images are `placeholder.svg`. When the page scrolls to the position where the user can see the image – we change `src` to the one in `data-src`, and so the image loads.

Here’s an example in `iframe`:

Text and pictures are from https://wikipedia.org.

### All images with `data-src` load when become visible.

# Solar system

The Solar System is the gravitationally bound system comprising the Sun and the objects that orbit it, either directly or indirectly. Of those objects that orbit the Sun directly, the largest eight are the planets, with the remainder being significantly smaller objects, such as dwarf planets and small Solar System bodies. Of the objects that orbit the Sun indirectly, the moons, two are larger than the smallest planet, Mercury.

The Solar System formed 4.6 billion years ago from the gravitational collapse of a giant interstellar molecular cloud. The vast majority of the system's mass is in the Sun, with most of the remaining mass contained in Jupiter. The four smaller inner planets, Mercury, Venus, Earth and Mars, are terrestrial planets, being primarily composed of rock and metal. The four outer planets are giant planets, being substantially more massive than the terrestrials. The two largest, Jupiter and Saturn, are gas giants, being composed mainly of hydrogen and helium; the two outermost planets, Uranus and Neptune, are ice giants, being composed mostly of substances with relatively high melting points compared with hydrogen and helium, called volatiles, such as water, ammonia and methane. All planets have almost circular orbits that lie within a nearly flat disc called the ecliptic.

<figure><img src="placeholder.svg" data-src="https://en.js.cx/clipart/solar/planets.jpg" width="640" height="360" /></figure>

# Sun

The Sun is the Solar System's star and by far its most massive component. Its large mass (332,900 Earth masses) produces temperatures and densities in its core high enough to sustain nuclear fusion of hydrogen into helium, making it a main-sequence star. This releases an enormous amount of energy, mostly radiated into space as electromagnetic radiation peaking in visible light.

<figure><img src="placeholder.svg" data-src="https://en.js.cx/clipart/solar/sun.jpg" width="658" height="658" /></figure>

# Mercury

Mercury (0.4 AU from the Sun) is the closest planet to the Sun and the smallest planet in the Solar System (0.055 Earth masses). Mercury has no natural satellites; besides impact craters, its only known geological features are lobed ridges or rupes that were probably produced by a period of contraction early in its history.\[67\] Mercury's very tenuous atmosphere consists of atoms blasted off its surface by the solar wind.\[68\] Its relatively large iron core and thin mantle have not yet been adequately explained. Hypotheses include that its outer layers were stripped off by a giant impact; or, that it was prevented from fully accreting by the young Sun's energy.

<figure><img src="placeholder.svg" data-src="https://en.js.cx/clipart/solar/mercury.jpg" width="390" height="390" /></figure>

# Venus

Venus (0.7 AU from the Sun) is close in size to Earth (0.815 Earth masses) and, like Earth, has a thick silicate mantle around an iron core, a substantial atmosphere, and evidence of internal geological activity. It is much drier than Earth, and its atmosphere is ninety times as dense. Venus has no natural satellites. It is the hottest planet, with surface temperatures over 400 °C (752°F), most likely due to the amount of greenhouse gases in the atmosphere. No definitive evidence of current geological activity has been detected on Venus, but it has no magnetic field that would prevent depletion of its substantial atmosphere, which suggests that its atmosphere is being replenished by volcanic eruptions.

<figure><img src="placeholder.svg" data-src="https://en.js.cx/clipart/solar/venus.jpg" width="390" height="390" /></figure>

# Earth

Earth (1 AU from the Sun) is the largest and densest of the inner planets, the only one known to have current geological activity, and the only place where life is known to exist. Its liquid hydrosphere is unique among the terrestrial planets, and it is the only planet where plate tectonics has been observed. Earth's atmosphere is radically different from those of the other planets, having been altered by the presence of life to contain 21% free oxygen. It has one natural satellite, the Moon, the only large satellite of a terrestrial planet in the Solar System.

<figure><img src="placeholder.svg" data-src="https://en.js.cx/clipart/solar/earth.jpg" width="390" height="390" /></figure>

# Mars

Mars (1.5 AU from the Sun) is smaller than Earth and Venus (0.107 Earth masses). It has an atmosphere of mostly carbon dioxide with a surface pressure of 6.1 millibars (roughly 0.6% of that of Earth). Its surface, peppered with vast volcanoes, such as Olympus Mons, and rift valleys, such as Valles Marineris, shows geological activity that may have persisted until as recently as 2 million years ago. Its red colour comes from iron oxide (rust) in its soil. Mars has two tiny natural satellites (Deimos and Phobos) thought to be captured asteroids.

<figure><img src="placeholder.svg" data-src="https://en.js.cx/clipart/solar/mars.jpg" width="390" height="390" /></figure>

# Jupiter

Jupiter (5.2 AU), at 318 Earth masses, is 2.5 times the mass of all the other planets put together. It is composed largely of hydrogen and helium. Jupiter's strong internal heat creates semi-permanent features in its atmosphere, such as cloud bands and the Great Red Spot. Jupiter has 67 known satellites. The four largest, Ganymede, Callisto, Io, and Europa, show similarities to the terrestrial planets, such as volcanism and internal heating. Ganymede, the largest satellite in the Solar System, is larger than Mercury.

<figure><img src="placeholder.svg" data-src="https://en.js.cx/clipart/solar/jupiter.jpg" width="390" height="390" /></figure>

# Saturn

Saturn (9.5 AU), distinguished by its extensive ring system, has several similarities to Jupiter, such as its atmospheric composition and magnetosphere. Although Saturn has 60% of Jupiter's volume, it is less than a third as massive, at 95 Earth masses. Saturn is the only planet of the Solar System that is less dense than water. The rings of Saturn are made up of small ice and rock particles. Saturn has 62 confirmed satellites composed largely of ice. Two of these, Titan and Enceladus, show signs of geological activity. Titan, the second-largest moon in the Solar System, is larger than Mercury and the only satellite in the Solar System with a substantial atmosphere.

<figure><img src="placeholder.svg" data-src="https://en.js.cx/clipart/solar/saturn.jpg" width="805" height="390" /></figure>

# Uranus

Uranus (19.2 AU), at 14 Earth masses, is the lightest of the outer planets. Uniquely among the planets, it orbits the Sun on its side; its axial tilt is over ninety degrees to the ecliptic. It has a much colder core than the other giant planets and radiates very little heat into space. Uranus has 27 known satellites, the largest ones being Titania, Oberon, Umbriel, Ariel, and Miranda.

<figure><img src="placeholder.svg" data-src="https://en.js.cx/clipart/solar/uranus.jpg" width="390" height="390" /></figure>

# Neptune

Neptune (30.1 AU), though slightly smaller than Uranus, is more massive (equivalent to 17 Earths) and hence more dense. It radiates more internal heat, but not as much as Jupiter or Saturn. Neptune has 14 known satellites. The largest, Triton, is geologically active, with geysers of liquid nitrogen. Triton is the only large satellite with a retrograde orbit. Neptune is accompanied in its orbit by several minor planets, termed Neptune trojans, that are in 1:1 resonance with it.

<figure><img src="placeholder.svg" data-src="https://en.js.cx/clipart/solar/neptune.jpg" width="390" height="390" /></figure>

Scroll it to see images load “on-demand”.

Requirements:

- When the page loads, those images that are on-screen should load immediately, prior to any scrolling.
- Some images may be regular, without `data-src`. The code should not touch them.
- Once an image is loaded, it should not reload any more when scrolled in/out.

P.S. If you can, make a more advanced solution that would “preload” images that are one page below/after the current position.

P.P.S. Only vertical scroll is to be handled, no horizontal scrolling.

[Open a sandbox for the task.](https://plnkr.co/edit/ZmiPqJnvJuXPBPzc?p=preview)

solution

The `onscroll` handler should check which images are visible and show them.

We also want to run it when the page loads, to detect immediately visible images and load them.

The code should execute when the document is loaded, so that it has access to its content.

Or put it at the `<body>` bottom:

    // ...the page content is above...

    function isVisible(elem) {

      let coords = elem.getBoundingClientRect();

      let windowHeight = document.documentElement.clientHeight;

      // top elem edge is visible?
      let topVisible = coords.top > 0 && coords.top < windowHeight;

      // bottom elem edge is visible?
      let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

      return topVisible || bottomVisible;
    }

The `showVisible()` function uses the visibility check, implemented by `isVisible()`, to load visible images:

    function showVisible() {
      for (let img of document.querySelectorAll('img')) {
        let realSrc = img.dataset.src;
        if (!realSrc) continue;

        if (isVisible(img)) {
          img.src = realSrc;
          img.dataset.src = '';
        }
      }
    }

    showVisible();
    window.onscroll = showVisible;

P.S. The solution also has a variant of `isVisible` that “preloads” images that are within 1 page above/below the current document scroll.

[Open the solution in a sandbox.](https://plnkr.co/edit/Pz0LB74TUY6Lihkl?p=preview)

<a href="/keyboard-events" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/forms-controls" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fonscroll" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fonscroll" class="share share_fb"></a>

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

- <a href="#prevent-scrolling" class="sidebar__link">Prevent scrolling</a>

- <a href="#tasks" class="sidebar__link">Tasks (3)</a>
- <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fonscroll" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fonscroll" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/2-ui/3-event-details/8-onscroll" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="/about" class="page-footer__link">about the project</a>
- <a href="/about#contact-us" class="page-footer__link">contact us</a>
- <a href="/terms" class="page-footer__link">terms of usage</a>
- <a href="/privacy" class="page-footer__link">privacy policy</a>
