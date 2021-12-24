EN

<!-- -->

We want to make this open-source project available for people all around the world.

[Help to translate](https://javascript.info/translate) the content of this tutorial to your language!

Search

Search

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fclickjacking" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fclickjacking" class="share share_fb"></a>

1.  <a href="/" class="breadcrumbs__link"><span class="breadcrumbs__hidden-text">Tutorial</span></a>
2.  <span id="breadcrumb-1"><a href="/frames-and-windows" class="breadcrumbs__link"><span>Frames and windows</span></a></span>

29th June 2019

# The clickjacking attack

The “clickjacking” attack allows an evil page to click on a “victim site” _on behalf of the visitor_.

Many sites were hacked this way, including Twitter, Facebook, Paypal and other sites. They have all been fixed, of course.

## <a href="#the-idea" id="the-idea" class="main__anchor">The idea</a>

The idea is very simple.

Here’s how clickjacking was done with Facebook:

1.  A visitor is lured to the evil page. It doesn’t matter how.
2.  The page has a harmless-looking link on it (like “get rich now” or “click here, very funny”).
3.  Over that link the evil page positions a transparent `<iframe>` with `src` from facebook.com, in such a way that the “Like” button is right above that link. Usually that’s done with `z-index`.
4.  In attempting to click the link, the visitor in fact clicks the button.

## <a href="#the-demo" id="the-demo" class="main__anchor">The demo</a>

Here’s how the evil page looks. To make things clear, the `<iframe>` is half-transparent (in real evil pages it’s fully transparent):

<a href="#" class="toolbar__button toolbar__button_run" title="show"></a>

<a href="#" class="toolbar__button toolbar__button_edit" title="open in sandbox"></a>

    <style>
    iframe { /* iframe from the victim site */
      width: 400px;
      height: 100px;
      position: absolute;
      top:0; left:-20px;
      opacity: 0.5; /* in real opacity:0 */
      z-index: 1;
    }
    </style>

    <div>Click to get rich now:</div>

    <!-- The url from the victim site -->
    <iframe src="/clickjacking/facebook.html"></iframe>

    <button>Click here!</button>

    <div>...And you're cool (I'm a cool hacker actually)!</div>

The full demo of the attack:

Result

facebook.html

index.html

<a href="/article/clickjacking/clickjacking-visible/" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/xQ6XQZLiF5crCD8f?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    <!DOCTYPE HTML>
    <html>

    <body style="margin:10px;padding:10px">

      <input type="button" onclick="alert('Like pressed on facebook.html!')" value="I LIKE IT !">

    </body>

    </html>

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">
    </head>

    <body>

      <style>
        iframe {
          width: 400px;
          height: 100px;
          position: absolute;
          top: 5px;
          left: -14px;
          opacity: 0.5;
          z-index: 1;
        }
      </style>

      <div>Click to get rich now:</div>

      <!-- The url from the victim site -->
      <iframe src="facebook.html"></iframe>

      <button>Click here!</button>

      <div>...And you're cool (I'm a cool hacker actually)!</div>

    </body>
    </html>

Here we have a half-transparent `<iframe src="facebook.html">`, and in the example we can see it hovering over the button. A click on the button actually clicks on the iframe, but that’s not visible to the user, because the iframe is transparent.

As a result, if the visitor is authorized on Facebook (“remember me” is usually turned on), then it adds a “Like”. On Twitter that would be a “Follow” button.

Here’s the same example, but closer to reality, with `opacity:0` for `<iframe>`:

Result

facebook.html

index.html

<a href="/article/clickjacking/clickjacking/" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/l4BFtW1VNSKY2QMm?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    <!DOCTYPE HTML>
    <html>

    <body style="margin:10px;padding:10px">

      <input type="button" onclick="alert('Like pressed on facebook.html!')" value="I LIKE IT !">

    </body>

    </html>

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">
    </head>

    <body>

      <style>
        iframe {
          width: 400px;
          height: 100px;
          position: absolute;
          top: 5px;
          left: -14px;
          opacity: 0;
          z-index: 1;
        }
      </style>

      <div>Click to get rich now:</div>

      <!-- The url from the victim site -->
      <iframe src="facebook.html"></iframe>

      <button>Click here!</button>

      <div>...And you're cool (I'm a cool hacker actually)!</div>

    </body>
    </html>

All we need to attack – is to position the `<iframe>` on the evil page in such a way that the button is right over the link. So that when a user clicks the link, they actually click the button. That’s usually doable with CSS.

<span class="important__type">Clickjacking is for clicks, not for keyboard</span>

The attack only affects mouse actions (or similar, like taps on mobile).

Keyboard input is much difficult to redirect. Technically, if we have a text field to hack, then we can position an iframe in such a way that text fields overlap each other. So when a visitor tries to focus on the input they see on the page, they actually focus on the input inside the iframe.

But then there’s a problem. Everything that the visitor types will be hidden, because the iframe is not visible.

People will usually stop typing when they can’t see their new characters printing on the screen.

## <a href="#old-school-defences-weak" id="old-school-defences-weak" class="main__anchor">Old-school defences (weak)</a>

The oldest defence is a bit of JavaScript which forbids opening the page in a frame (so-called “framebusting”).

That looks like this:

    if (top != window) {
      top.location = window.location;
    }

That is: if the window finds out that it’s not on top, then it automatically makes itself the top.

This not a reliable defence, because there are many ways to hack around it. Let’s cover a few.

### <a href="#blocking-top-navigation" id="blocking-top-navigation" class="main__anchor">Blocking top-navigation</a>

We can block the transition caused by changing `top.location` in [beforeunload](/onload-ondomcontentloaded#window.onbeforeunload) event handler.

The top page (enclosing one, belonging to the hacker) sets a preventing handler to it, like this:

    window.onbeforeunload = function() {
      return false;
    };

When the `iframe` tries to change `top.location`, the visitor gets a message asking them whether they want to leave.

In most cases the visitor would answer negatively because they don’t know about the iframe – all they can see is the top page, there’s no reason to leave. So `top.location` won’t change!

In action:

Result

iframe.html

index.html

<a href="/article/clickjacking/top-location/" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/UMxYFoefqlhTMUbA?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">
    </head>

    <body>

      <div>Changes top.location to javascript.info</div>

      <script>
        top.location = 'https://javascript.info';
      </script>

    </body>

    </html>

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">

      <style>
        iframe {
          width: 400px;
          height: 100px;
          position: absolute;
          top: 0;
          left: -20px;
          opacity: 0;
          z-index: 1;
        }
      </style>

      <script>
        function attack() {

          window.onbeforeunload = function() {
            window.onbeforeunload = null;
            return "Want to leave without learning all the secrets (he-he)?";
          };

          document.body.insertAdjacentHTML('beforeend', '<iframe src="iframe.html">');
        }
      </script>
    </head>

    <body>

      <p>After a click on the button the visitor gets a "strange" question about whether they want to leave.</p>

      <p>Probably they would respond "No", and the iframe protection is hacked.</p>

      <button onclick="attack()">Add a "protected" iframe</button>

    </body>
    </html>

### <a href="#sandbox-attribute" id="sandbox-attribute" class="main__anchor">Sandbox attribute</a>

One of the things restricted by the `sandbox` attribute is navigation. A sandboxed iframe may not change `top.location`.

So we can add the iframe with `sandbox="allow-scripts allow-forms"`. That would relax the restrictions, permitting scripts and forms. But we omit `allow-top-navigation` so that changing `top.location` is forbidden.

Here’s the code:

    <iframe sandbox="allow-scripts allow-forms" src="facebook.html"></iframe>

There are other ways to work around that simple protection too.

## <a href="#x-frame-options" id="x-frame-options" class="main__anchor">X-Frame-Options</a>

The server-side header `X-Frame-Options` can permit or forbid displaying the page inside a frame.

It must be sent exactly as HTTP-header: the browser will ignore it if found in HTML `<meta>` tag. So, `<meta http-equiv="X-Frame-Options"...>` won’t do anything.

The header may have 3 values:

`DENY`  
Never ever show the page inside a frame.

`SAMEORIGIN`  
Allow inside a frame if the parent document comes from the same origin.

`ALLOW-FROM domain`  
Allow inside a frame if the parent document is from the given domain.

For instance, Twitter uses `X-Frame-Options: SAMEORIGIN`.

Here’s the result:

    <iframe src="https://twitter.com"></iframe>

<span class="NoScriptForm-logo Icon Icon--logo Icon--extraLarge"></span>

We've detected that JavaScript is disabled in your browser. Would you like to proceed to legacy Twitter?

Yes

<a href="#timeline" class="u-hiddenVisually focusable">Skip to content</a>

<a href="/account/begin_password_reset" class="forgot">Forgot password?</a>

<span class="Icon Icon--bird"></span> <a href="/login" class="StaticLoggedOutHomePage-input StaticLoggedOutHomePage-narrowLoginButton EdgeButton EdgeButton--secondary EdgeButton--small u-floatRight">Log in</a>

# See what’s happening in the world right now

## Join Twitter today.

<a href="https://twitter.com/signup" class="js-nav EdgeButton EdgeButton--medium EdgeButton--primary StaticLoggedOutHomePage-buttonSignup">Sign up</a> <a href="/login" class="js-nav EdgeButton EdgeButton--medium EdgeButton--secondary StaticLoggedOutHomePage-buttonLogin">Log in</a>

<img src="data:image/svg+xml;base64,PHN2ZyBjbGFzcz0idHdpdHRlckljb24tYmlyZCIgdmlld2JveD0iMCAwIDEyMDggOTgyIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0NS4yICg0MzUxNCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+YmlyZDwvdGl0bGU+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iRmluYWwtSG9yaXpvbiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjg2LjAwMDAwMCwgLTExNy4wMDAwMDApIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGZpbGw9IiMxQjk1RTAiPgogICAgICAgICAgICA8cGF0aCBkPSJNMTQ5My43NTMwOCwyMzMuMTk1OTExIEMxNDQ5LjMxNzgzLDI1Mi45MjI1NDQgMTQwMS41NjEyNiwyNjYuMjA3ODI4IDEzNTEuNDM5NTEsMjcyLjE5NjI3IEMxNDAyLjYxODA0LDI0MS41NDk1MzYgMTQ0MS45MjAzNCwxOTIuOTg3Nzk4IDE0NjAuMzg4OSwxMzUuMTE2Mjk2IEMxNDEyLjUzMTY4LDE2My40OTg0OTMgMTM1OS40OTExOSwxODQuMTMwOTQyIDEzMDMuMDI4NzQsMTk1LjI1MjMzNSBDMTI1Ny44ODg5NywxNDcuMDkzMTgxIDExOTMuNDI1MTQsMTE3IDExMjIuMTY3NzEsMTE3IEM5NjIuMTkwNzU0LDExNyA4NDQuNjM2MTIxLDI2Ni4yNTgxNTEgODgwLjc2ODA2Nyw0MjEuMjAyODA2IEM2NzQuODk2NDkxLDQxMC44ODY1ODIgNDkyLjMyNDQ4NCwzMTIuMjUzNDE0IDM3MC4wODk4MDgsMTYyLjM0MTA2MyBDMzA1LjE3MzA4LDI3My43MDU5NjIgMzM2LjQyMzY5MSw0MTkuMzkxMTc2IDQ0Ni43MzE4MDUsNDkzLjE2NDc2IEM0MDYuMTcxNDMxLDQ5MS44NTYzNjEgMzY3LjkyNTkxNyw0ODAuNzM0OTY4IDMzNC41NjE3MzgsNDYyLjE2NTc2NSBDMzMxLjg0NDI5NCw1NzYuOTUyNjMgNDE0LjEyMjQ3Miw2ODQuMzQyMDA4IDUzMy4yODc0NDIsNzA4LjI0NTQ1NCBDNDk4LjQxMzU3Miw3MTcuNzA2MTg2IDQ2MC4yMTgzODEsNzE5LjkyMDQgNDIxLjM2ODk5MSw3MTIuNDcyNTkgQzQ1Mi44NzEyMTcsODEwLjkwNDQ2NSA1NDQuMzU4NTEyLDg4Mi41MTQxNTggNjUyLjg1NDk5Nyw4ODQuNTI3MDggQzU0OC42ODYyOTQsOTY2LjIwMTM4MiA0MTcuNDQzNzkzLDEwMDIuNjg1NTkgMjg2LDk4Ny4xODYwOTEgQzM5NS42NTM5MTUsMTA1Ny40ODczOSA1MjUuOTQwMjc4LDEwOTguNTAwNjcgNjY1LjgzODM0MiwxMDk4LjUwMDY3IEMxMTI1Ljg5MTYyLDEwOTguNTAwNjcgMTM4NS44MTAxNSw3MDkuOTU2NDM3IDEzNzAuMTA5MzYsMzYxLjQ2OTM1MiBDMTQxOC41MjAxMiwzMjYuNDk0ODM2IDE0NjAuNTM5ODcsMjgyLjg2NDc1NiAxNDkzLjc1MzA4LDIzMy4xOTU5MTEgWiIgaWQ9ImJpcmQiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==" class="twitterIcon-bird" />

<span class="Icon Icon--search"></span> Follow your interests.

<span class="Icon Icon--people"></span> Hear what people are talking about.

<span class="Icon Icon--reply"></span> Join the conversation.

### Twitter.com makes heavy use of JavaScript

If you cannot enable it in your browser's preferences, you may have a better experience on our [mobile site](http://m.twitter.com).

### Twitter.com makes heavy use of browser cookies

Please enable cookies in your browser preferences before signing in.

- [About](/about)
- [Help Center](//support.twitter.com)
- [Blog](https://blog.twitter.com)
- [Status](http://status.twitter.com)
- [Jobs](https://about.twitter.com/careers)
- [Terms](/tos)
- [Privacy Policy](/privacy)
- [Cookies](//support.twitter.com/articles/20170514)
- [Ads info](//business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html)
- [Brand](//about.twitter.com/press/brand-assets)
- [Apps](https://about.twitter.com/products)
- [Advertise](//ads.twitter.com/?ref=gl-tw-tw-twitter-advertise)
- [Marketing](https://marketing.twitter.com)
- [Businesses](https://business.twitter.com)
- [Developers](//dev.twitter.com)
- [Directory](/i/directory/profiles)
- [Settings](/settings/personalization)
- © 2021 Twitter

<span class="message-text"></span> <a href="#" class="Icon Icon--close Icon--medium dismiss"><span class="visuallyhidden">Dismiss</span></a>

<span class="Icon Icon--close Icon--large"> <span class="visuallyhidden">Close</span> </span>

<span class="GalleryNav-handle GalleryNav-handle--prev"> <span class="Icon Icon--caretLeft Icon--large"> <span class="u-hiddenVisually"> Previous </span> </span> </span>

<span class="GalleryNav-handle GalleryNav-handle--next"> <span class="Icon Icon--caretRight Icon--large"> <span class="u-hiddenVisually"> Next </span> </span> </span>

<span class="Icon Icon--close Icon--medium"> <span class="visuallyhidden">Close</span> </span>

### Go to a person's profile

### Saved searches

- <span class="Icon Icon--close" aria-hidden="true"><span class="visuallyhidden">Remove</span></span> <a href="" class="js-nav"></a>

- <a href="" class="js-nav"></a>

<!-- -->

- <span class="js-nav"></span>
  <span class="Icon Icon--follower Icon--small"></span> <span class="typeahead-in-conversation-text">In this conversation</span>

  <span class="typeahead-user-item-info account-group"> <span class="fullname"></span><span class="UserBadges"><span class="Icon Icon--verified js-verified hidden"><span class="u-hiddenVisually">Verified account</span></span><span class="Icon Icon--protected js-protected hidden"><span class="u-hiddenVisually">Protected Tweets</span></span></span><span class="UserNameBreak"> </span><span class="username u-dir" dir="ltr">@</span> </span> <span class="typeahead-social-context"></span>

- <a href="" class="js-nav"></a>

<!-- -->

- <a href="" class="js-nav"></a>

Suggested users

- <span class="typeahead-user-item-info account-group"> <span class="select-status deselect-user js-deselect-user Icon Icon--check"></span> <span class="select-status select-disabled Icon Icon--unfollow"></span> <span class="fullname"></span><span class="UserBadges"><span class="Icon Icon--verified js-verified hidden"><span class="u-hiddenVisually">Verified account</span></span><span class="Icon Icon--protected js-protected hidden"><span class="u-hiddenVisually">Protected Tweets</span></span></span><span class="UserNameBreak"> </span><span class="username u-dir" dir="ltr">@</span> </span>
-

<!-- -->

- <span class="typeahead-user-item-info account-group"> <span class="select-status deselect-user js-deselect-user Icon Icon--check"></span> <span class="select-status select-disabled Icon Icon--unfollow"></span> <span class="fullname"></span><span class="UserBadges"><span class="Icon Icon--verified js-verified hidden"><span class="u-hiddenVisually">Verified account</span></span><span class="Icon Icon--protected js-protected hidden"><span class="u-hiddenVisually">Protected Tweets</span></span></span><span class="UserNameBreak"> </span><span class="username u-dir" dir="ltr">@</span> </span>
-

-

<span class="Icon Icon--close Icon--large"> <span class="visuallyhidden">Close</span> </span>

### Promote this Tweet

<span class="Icon Icon--close Icon--medium"> <span class="visuallyhidden">Close</span> </span>

### Block

Cancel

Block

<span class="caret-outer"></span> <span class="caret-inner"></span>

- ## Tweet with a location

  You can add location information to your Tweets, such as your city or precise location, from the web and via third-party applications. You always have the option to delete your Tweet location history. [Learn more](http://support.twitter.com/forums/26810/entries/78525)

  Turn on
  Not now

<span class="caret-outer"></span> <span class="caret-inner"></span>

<span class="Icon Icon--search"></span>

<span class="Icon Icon--close Icon--medium"> <span class="visuallyhidden">Close</span> </span>

### Your lists

<span class="spinner lists-spinner" title="Loading…"></span>

<span class="Icon Icon--close Icon--medium"> <span class="visuallyhidden">Close</span> </span>

### Create a new list

List name

---

Description

<span class="help-text">Under 100 characters, optional</span>

---

Privacy

**Public** · Anyone can follow this list **Private** · Only you can access this list

---

Save list

<span class="Icon Icon--close Icon--medium"> <span class="visuallyhidden">Close</span> </span>

###

<span class="spinner-bigger"></span>

<span class="Icon Icon--close Icon--medium"> <span class="visuallyhidden">Close</span> </span>

### Copy link to Tweet

Here's the URL for this Tweet. Copy it to easily share with friends.

<span class="Icon Icon--close Icon--medium"> <span class="visuallyhidden">Close</span> </span>

### Embed this Tweet

### Embed this Video

Add this Tweet to your website by copying the code below. [Learn more](https://dev.twitter.com/web/embedded-tweets)

Add this video to your website by copying the code below. [Learn more](https://dev.twitter.com/web/embedded-tweets)

Hmm, there was a problem reaching the server. Try again?

Include parent Tweet

Include media

By embedding Twitter content in your website or app, you are agreeing to the Twitter [Developer Agreement](https://dev.twitter.com/overview/terms/agreement) and [Developer Policy](https://dev.twitter.com/overview/terms/policy).

### Preview

<span class="Icon Icon--close Icon--medium"> <span class="visuallyhidden">Close</span> </span>

### Why you're seeing this ad

<span class="Icon Icon--close Icon--medium"> <span class="visuallyhidden">Close</span> </span>

### Log in to Twitter

<span class="Icon Icon--bird Icon--large"></span>

Remember me <span class="separator">·</span> <a href="/account/begin_password_reset" class="forgot">Forgot password?</a>

Don't have an account? <a href="https://twitter.com/signup" class="LoginDialog-signupLink">Sign up »</a>

<span class="Icon Icon--close Icon--medium"> <span class="visuallyhidden">Close</span> </span>

### Sign up for Twitter

<span class="Icon Icon--bird Icon--extraLarge"></span>

## Not on Twitter? Sign up, tune into the things you care about, and get updates as they happen.

<a href="https://twitter.com/signup" class="EdgeButton EdgeButton--large EdgeButton--primary SignupForm-submit u-block js-signup">Sign up</a>

Have an account? <a href="/login" class="SignupDialog-signinLink">Log in »</a>

<span class="Icon Icon--close Icon--medium"> <span class="visuallyhidden">Close</span> </span>

### Two-way (sending and receiving) short codes:

<table id="sms_codes" data-cellpadding="0" data-cellspacing="0"><thead><tr class="header"><th>Country</th><th>Code</th><th>For customers of</th></tr></thead><tbody><tr class="odd"><td>United States</td><td>40404</td><td>(any)</td></tr><tr class="even"><td>Canada</td><td>21212</td><td>(any)</td></tr><tr class="odd"><td>United Kingdom</td><td>86444</td><td>Vodafone, Orange, 3, O2</td></tr><tr class="even"><td>Brazil</td><td>40404</td><td>Nextel, TIM</td></tr><tr class="odd"><td>Haiti</td><td>40404</td><td>Digicel, Voila</td></tr><tr class="even"><td>Ireland</td><td>51210</td><td>Vodafone, O2</td></tr><tr class="odd"><td>India</td><td>53000</td><td>Bharti Airtel, Videocon, Reliance</td></tr><tr class="even"><td>Indonesia</td><td>89887</td><td>AXIS, 3, Telkomsel, Indosat, XL Axiata</td></tr><tr class="odd"><td rowspan="2">Italy</td><td>4880804</td><td>Wind</td></tr><tr class="even"><td>3424486444</td><td>Vodafone</td></tr></tbody><tfoot><tr class="odd"><td colspan="3">» <a href="http://support.twitter.com/articles/14226-how-to-find-your-twitter-short-code-or-long-code" class="js-initial-focus">See SMS short codes for other countries</a></td></tr></tfoot></table>

<span class="Icon Icon--close Icon--medium"> <span class="visuallyhidden">Close</span> </span>

### Confirmation

<span class="Icon Icon--close Icon--large"> <span class="visuallyhidden">Close</span> </span>

###  

<span class="Icon Icon--close Icon--medium"> <span class="visuallyhidden">Close</span> </span>

<span class="UIWalkthrough-stepProgress"></span>

Skip all

### <span class="Icon Icon--home UIWalkthrough-icon"></span> Welcome home!

This timeline is where you’ll spend most of your time, getting instant updates about what matters to you.

### <span class="Icon Icon--smileRating1Fill UIWalkthrough-icon"></span> Tweets not working for you?

Hover over the profile pic and click the Following button to unfollow any account.

### <span class="Icon Icon--heart UIWalkthrough-icon"></span> Say a lot with a little

When you see a Tweet you love, tap the heart — it lets the person who wrote it know you shared the love.

### <span class="Icon Icon--retweet UIWalkthrough-icon"></span> Spread the word

The fastest way to share someone else’s Tweet with your followers is with a Retweet. Tap the icon to send it instantly.

### <span class="Icon Icon--reply UIWalkthrough-icon"></span> Join the conversation

Add your thoughts about any Tweet with a Reply. Find a topic you’re passionate about, and jump right in.

### <span class="Icon Icon--discover UIWalkthrough-icon"></span> Learn the latest

Get instant insight into what people are talking about now.

### <span class="Icon Icon--follow UIWalkthrough-icon"></span> Get more of what you love

Follow more accounts to get instant updates about topics you care about.

### <span class="Icon Icon--search UIWalkthrough-icon"></span> Find what's happening

See the latest conversations about any topic instantly.

### <span class="Icon Icon--lightning UIWalkthrough-icon"></span> Never miss a Moment

Catch up instantly on the best stories happening as they unfold.

Back

Next

<span class="Icon Icon--close"></span>

<span class="Icon Icon--caretLeft Icon--large"></span> <span class="u-hiddenVisually">Next Tweet from user</span>

Depending on your browser, the `iframe` above is either empty or alerting you that the browser won’t permit that page to be navigating in this way.

## <a href="#showing-with-disabled-functionality" id="showing-with-disabled-functionality" class="main__anchor">Showing with disabled functionality</a>

The `X-Frame-Options` header has a side-effect. Other sites won’t be able to show our page in a frame, even if they have good reasons to do so.

So there are other solutions… For instance, we can “cover” the page with a `<div>` with styles `height: 100%; width: 100%;`, so that it will intercept all clicks. That `<div>` is to be removed if `window == top` or if we figure out that we don’t need the protection.

Something like this:

    <style>
      #protector {
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 99999999;
      }
    </style>

    <div id="protector">
      <a href="/" target="_blank">Go to the site</a>
    </div>

    <script>
      // there will be an error if top window is from the different origin
      // but that's ok here
      if (top.document.domain == document.domain) {
        protector.remove();
      }
    </script>

The demo:

Result

iframe.html

index.html

<a href="/article/clickjacking/protector/" class="code-tabs__button code-tabs__button_external" title="open in a new window"></a><a href="https://plnkr.co/edit/COt3mNoUc7sWmzRM?p=preview" class="code-tabs__button code-tabs__button_edit" title="edit in the sandbox"></a>

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">

      <style>
        #protector {
          height: 100%;
          width: 100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 99999999;
        }
      </style>

    </head>

    <body>

    <div id="protector">
      <a href="/" target="_blank">Go to the site</a>
    </div>

    <script>

      if (top.document.domain == document.domain) {
        protector.remove();
      }

    </script>

      This text is always visible.

      But if the page was open inside a document from another domain, the div over it would prevent any actions.

      <button onclick="alert(1)">Click wouldn't work in that case</button>

    </body>
    </html>

    <!doctype html>
    <html>

    <head>
      <meta charset="UTF-8">
    </head>
    <body>

      <iframe src="iframe.html"></iframe>

    </body>
    </html>

## <a href="#samesite-cookie-attribute" id="samesite-cookie-attribute" class="main__anchor">Samesite cookie attribute</a>

The `samesite` cookie attribute can also prevent clickjacking attacks.

A cookie with such attribute is only sent to a website if it’s opened directly, not via a frame, or otherwise. More information in the chapter [Cookies, document.cookie](/cookie#samesite).

If the site, such as Facebook, had `samesite` attribute on its authentication cookie, like this:

    Set-Cookie: authorization=secret; samesite

…Then such cookie wouldn’t be sent when Facebook is open in iframe from another site. So the attack would fail.

The `samesite` cookie attribute will not have an effect when cookies are not used. This may allow other websites to easily show our public, unauthenticated pages in iframes.

However, this may also allow clickjacking attacks to work in a few limited cases. An anonymous polling website that prevents duplicate voting by checking IP addresses, for example, would still be vulnerable to clickjacking because it does not authenticate users using cookies.

## <a href="#summary" id="summary" class="main__anchor">Summary</a>

Clickjacking is a way to “trick” users into clicking on a victim site without even knowing what’s happening. That’s dangerous if there are important click-activated actions.

A hacker can post a link to their evil page in a message, or lure visitors to their page by some other means. There are many variations.

From one perspective – the attack is “not deep”: all a hacker is doing is intercepting a single click. But from another perspective, if the hacker knows that after the click another control will appear, then they may use cunning messages to coerce the user into clicking on them as well.

The attack is quite dangerous, because when we engineer the UI we usually don’t anticipate that a hacker may click on behalf of the visitor. So vulnerabilities can be found in totally unexpected places.

- It is recommended to use `X-Frame-Options: SAMEORIGIN` on pages (or whole websites) which are not intended to be viewed inside frames.
- Use a covering `<div>` if we want to allow our pages to be shown in iframes, but still stay safe.

<a href="/cross-window-communication" class="page__nav page__nav_prev"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Previous lesson</span></a><a href="/binary" class="page__nav page__nav_next"><span class="page__nav-text"><span class="page__nav-text-shortcut"></span></span><span class="page__nav-text-alternate">Next lesson</span></a>

<span class="share-icons__title">Share</span><a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fclickjacking" class="share share_tw"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fclickjacking" class="share share_fb"></a>

<a href="/tutorial/map" class="map"><span class="map__text">Tutorial map</span></a>

## <a href="#comments" id="comments">Comments</a>

<span class="comments__read-before-link">read this before commenting…</span>

- If you have suggestions what to improve - please [submit a GitHub issue](https://github.com/javascript-tutorial/en.javascript.info/issues/new) or a pull request instead of commenting.
- If you can't understand something in the article – please elaborate.
- To insert few words of code, use the `<code>` tag, for several lines – wrap them in `<pre>` tag, for more than 10 lines – use a sandbox ([plnkr](https://plnkr.co/edit/?p=preview), [jsbin](https://jsbin.com), [codepen](http://codepen.io)…)

<a href="/tutorial/map" class="map"></a>

#### Chapter

- <a href="/frames-and-windows" class="sidebar__link">Frames and windows</a>

#### Lesson navigation

- <a href="#the-idea" class="sidebar__link">The idea</a>
- <a href="#the-demo" class="sidebar__link">The demo</a>
- <a href="#old-school-defences-weak" class="sidebar__link">Old-school defences (weak)</a>
- <a href="#x-frame-options" class="sidebar__link">X-Frame-Options</a>
- <a href="#showing-with-disabled-functionality" class="sidebar__link">Showing with disabled functionality</a>
- <a href="#samesite-cookie-attribute" class="sidebar__link">Samesite cookie attribute</a>
- <a href="#summary" class="sidebar__link">Summary</a>

- <a href="#comments" class="sidebar__link">Comments</a>

Share

<a href="https://twitter.com/share?url=https%3A%2F%2Fjavascript.info%2Fclickjacking" class="share share_tw sidebar__share"></a><a href="https://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Burl%5D=https%3A%2F%2Fjavascript.info%2Fclickjacking" class="share share_fb sidebar__share"></a>

<a href="https://github.com/javascript-tutorial/en.javascript.info/blob/master/3-frames-and-windows/06-clickjacking" class="sidebar__link">Edit on GitHub</a>

- © 2007—2021  Ilya Kantor
- <a href="/about" class="page-footer__link">about the project</a>
- <a href="/about#contact-us" class="page-footer__link">contact us</a>
- <a href="/terms" class="page-footer__link">terms of usage</a>
- <a href="/privacy" class="page-footer__link">privacy policy</a>
