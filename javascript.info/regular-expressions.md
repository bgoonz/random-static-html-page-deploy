EN


<!-- -->


We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!



Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregular-expressions" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregular-expressions" class="share share_fb"></a>


1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>

# Regular expressions

Regular expressions is a powerful way of doing search and replace in strings.

1.  <a href="/regexp-introduction" class="lessons-list__link">Patterns and flags</a>
2.  <a href="/regexp-character-classes" class="lessons-list__link">Character classes</a>
3.  <a href="/regexp-unicode" class="lessons-list__link">Unicode: flag "u" and class \p{...}</a>
4.  <a href="/regexp-anchors" class="lessons-list__link">Anchors: string start ^ and end $</a>
5.  <a href="/regexp-multiline-mode" class="lessons-list__link">Multiline mode of anchors ^ $, flag "m"</a>
6.  <a href="/regexp-boundary" class="lessons-list__link">Word boundary: \b</a>
7.  <a href="/regexp-escaping" class="lessons-list__link">Escaping, special characters</a>
8.  <a href="/regexp-character-sets-and-ranges" class="lessons-list__link">Sets and ranges [...]</a>
9.  <a href="/regexp-quantifiers" class="lessons-list__link">Quantifiers +, *, ? and {n}</a>
10. <a href="/regexp-greedy-and-lazy" class="lessons-list__link">Greedy and lazy quantifiers</a>
11. <a href="/regexp-groups" class="lessons-list__link">Capturing groups</a>
12. <a href="/regexp-backreferences" class="lessons-list__link">Backreferences in pattern: \N and \k&lt;name&gt;</a>
13. <a href="/regexp-alternation" class="lessons-list__link">Alternation (OR) |</a>
14. <a href="/regexp-lookahead-lookbehind" class="lessons-list__link">Lookahead and lookbehind</a>
15. <a href="/regexp-catastrophic-backtracking" class="lessons-list__link">Catastrophic backtracking</a>
16. <a href="/regexp-sticky" class="lessons-list__link">Sticky flag "y", searching at position</a>
17. <a href="/regexp-methods" class="lessons-list__link">Methods of RegExp and String</a>

<a href="/shadow-dom-events" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/regexp-introduction" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregular-expressions" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregular-expressions" class="share share_fb"></a>

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<a href="/tutorial/map" class="map"></a>

#### Sibling chapters

-   <a href="/js" class="sidebar__link">The JavaScript language</a>
-   <a href="/ui" class="sidebar__link">Browser: Document, Events, Interfaces</a>
-   <a href="/frames-and-windows" class="sidebar__link">Frames and windows</a>
-   <a href="/binary" class="sidebar__link">Binary data, files</a>
-   <a href="/network" class="sidebar__link">Network requests</a>
-   <a href="/data-storage" class="sidebar__link">Storing data in the browser</a>
-   <a href="/animation" class="sidebar__link">Animation</a>
-   <a href="/web-components" class="sidebar__link">Web components</a>
-   <a href="/regular-expressions" class="sidebar__link">Regular expressions</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fregular-expressions" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fregular-expressions" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/9-regular-expressions" class="sidebar__link">Edit on GitHub</a>

-   © 2007—2021  Ilya Kantor
-   <a href="/about" class="page-footer__link">about the project</a>
-   <a href="/about#contact-us" class="page-footer__link">contact us</a>
-   <a href="/terms" class="page-footer__link">terms of usage</a>
-   <a href="/privacy" class="page-footer__link">privacy policy</a>
