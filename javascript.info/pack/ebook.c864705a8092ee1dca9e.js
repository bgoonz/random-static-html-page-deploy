var ebook = function(e) {
var t = {};
function n(r) {
if (t[r]) return t[r].exports;
var o = t[r] = {
i: r,
l: !1,
exports: {}
};
return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
}
return n.m = e, n.c = t, n.d = function(e, t, r) {
n.o(e, t) || Object.defineProperty(e, t, {
enumerable: !0,
get: r
});
}, n.r = function(e) {
"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
value: "Module"
}), Object.defineProperty(e, "__esModule", {
value: !0
});
}, n.t = function(e, t) {
if (1 & t && (e = n(e)), 8 & t) return e;
if (4 & t && "object" == typeof e && e && e.__esModule) return e;
var r = Object.create(null);
if (n.r(r), Object.defineProperty(r, "default", {
enumerable: !0,
value: e
}), 2 & t && "string" != typeof e) for (var o in e) n.d(r, o, function(t) {
return e[t];
}.bind(null, o));
return r;
}, n.n = function(e) {
var t = e && e.__esModule ? function() {
return e.default;
} : function() {
return e;
};
return n.d(t, "a", t), t;
}, n.o = function(e, t) {
return Object.prototype.hasOwnProperty.call(e, t);
}, n.p = "/pack/", n(n.s = 5);
}([ function(e, t) {
e.exports = {
lang: "en",
currency: {
code: "USD",
sign: "$"
},
env: "production",
ordersMail: "orders@javascript.info",
providers: [ {
name: "Facebook",
id: "facebook"
}, {
name: "Google",
id: "google"
}, {
name: "Github",
id: "github"
} ],
stripeKey: "pk_live_51HXm0nFjeNqw1p5a3mjFxSeNHh8OL94IyGcp3PHbZVoNuYUYjlM57YtZMIAM1zrEd1F6WIKfFs67KbTemRdNIySo00KfWS1yhr",
lookatCodeUrlBase: "https://lookatcode.com"
};
}, function(e, t, n) {
"use strict";
n.r(t), n.d(t, "init", (function() {
return i;
})), n.d(t, "Info", (function() {
return s;
})), n.d(t, "Warning", (function() {
return c;
})), n.d(t, "Success", (function() {
return u;
})), n.d(t, "Error", (function() {
return l;
}));
let r = n(4);
class o {
constructor(e = {}) {
this.notifications = [], this.verticalSpace = e.verticalSpace || 8;
}
register(e) {
this.notifications.unshift(e), setTimeout((() => this.recalculate()), 20);
}
unregister(e) {
let t = this.notifications.indexOf(e);
this.notifications.splice(t, 1), this.recalculate();
}
recalculate() {
let e = this.verticalSpace;
this.notifications.forEach((t => {
t.top = e, e += t.height + this.verticalSpace;
}));
}
}
function i(e) {
window.notificationManager || (window.notificationManager = new o(e));
}
class a {
constructor(e, t, n) {
let r = '<div class="notification notification_popup notification_'.concat(t, '">\n    <div class="notification__content">').concat(e, '</div>\n    <button title="Закрыть" class="notification__close"></button></div>');
switch (document.body.insertAdjacentHTML("beforeEnd", r), this.elem = document.body.lastElementChild, 
n) {
case void 0:
this.timeout = this.TIMEOUT_DEFAULT;
break;

case "slow":
this.timeout = this.TIMEOUT_SLOW;
break;

case "fast":
this.timeout = this.TIMEOUT_FAST;
break;

default:
this.timeout = n;
}
window.notificationManager.register(this), this.setupCloseHandler(), this.setupCloseTimeout();
}
get TIMEOUT_DEFAULT() {
return 3e3;
}
get TIMEOUT_SLOW() {
return 5e3;
}
get TIMEOUT_FAST() {
return 1500;
}
close() {
this.elem.parentNode && (this.elem.remove(), window.notificationManager.unregister(this));
}
setupCloseHandler() {
this.delegate(".notification__close", "click", (() => this.close()));
}
setupCloseTimeout() {
this.timeout && setTimeout((() => this.close()), this.timeout);
}
get height() {
return this.elem.offsetHeight;
}
set top(e) {
this.elem.style.transform = "translateY(" + e + "px)";
}
}
r.delegateMixin(a.prototype);
class s extends a {
constructor(e, t) {
super(e, "info", t);
}
}
class c extends a {
constructor(e, t) {
super(e, "warning", t);
}
}
class u extends a {
constructor(e, t) {
super(e, "success", t);
}
}
class l extends a {
constructor(e, t) {
super(e, "error", t);
}
get TIMEOUT_DEFAULT() {
return 5e3;
}
}
}, function(e, t, n) {
"use strict";
const r = new (n(9))("en");
let o = console.error;
function i(e) {
return r.hasPhrase(a, e) || o("No such phrase", e), r.t(a, ...arguments);
}
e.exports = i;
const a = n(0).lang;
"en" !== a && r.setFallback(a, "en"), r.add = (...e) => r.addPhrase(a, ...e), i.i18n = r;
}, function(e, t, n) {
let r = n(1), o = n(8);
const i = n(0).lang, a = n(2);
a.i18n.add("", n(13)("./" + i + ".yml")), a.i18n.add("error.network", n(15)("./" + i + ".yml")), 
document.addEventListener("xhrfail", (function(e) {
new r.Error(e.reason);
})), e.exports = function(e) {
let t = new XMLHttpRequest, n = e.method || "GET", r = e.body, i = e.url;
t.open(n, i, !e.sync), t.method = n;
let s = o();
s && !e.skipCsrf && t.setRequestHeader("X-XSRF-TOKEN", s), e.responseType && (t.responseType = e.responseType), 
"[object Object]" == {}.toString.call(r) && (t.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
r = JSON.stringify(r)), e.noDocumentEvents || (t.addEventListener("loadstart", (e => {
t.timeStart = Date.now();
let n = u("xhrstart", e);
document.dispatchEvent(n);
})), t.addEventListener("loadend", (e => {
let t = u("xhrend", e);
document.dispatchEvent(t);
})), t.addEventListener("success", (e => {
let t = u("xhrsuccess", e);
t.result = e.result, document.dispatchEvent(t);
})), t.addEventListener("fail", (e => {
let t = u("xhrfail", e);
t.reason = e.reason, document.dispatchEvent(t);
}))), e.raw || t.setRequestHeader("Accept", "application/json"), t.setRequestHeader("X-Requested-With", "XMLHttpRequest");
let c = e.normalStatuses || [ 200 ];
function u(e, t) {
let n = new CustomEvent(e);
return n.originalEvent = t, n;
}
function l(e, n) {
let r = u("fail", n);
r.reason = e, t.dispatchEvent(r);
}
return t.addEventListener("error", (e => {
l(a("error.network.server_connection_error"), e);
})), t.addEventListener("timeout", (e => {
l(a("error.network.server_request_timeout"), e);
})), t.addEventListener("abort", (e => {
l(a("error.network.request_aborted"), e);
})), t.addEventListener("load", (n => {
if (!t.status) return void l(a("error.network.no_response"), n);
if (!c.includes(t.status)) return void l(a("error.network.server_error", {
status: t.status
}), n);
let r = e.responseType && "text" !== e.responseType ? t.response : t.responseText;
if ((t.getResponseHeader("Content-Type") || "").match(/^application\/json/) || e.json) try {
r = JSON.parse(r);
} catch (n) {
return void l(a("error.network.invalid_format"), n);
}
!function(e, n) {
let r = u("success", n);
r.result = e, t.dispatchEvent(r);
}(r, n);
})), setTimeout((function() {
t.send(r);
}), 0), t;
};
}, function(e, t) {
function n(e, t, n, r, o) {
e.addEventListener(n, (function(e) {
let n = function(e, t) {
let n = e.target;
for (;n; ) {
if (n.matches(t)) return n;
if (n == e.currentTarget) break;
n = n.parentElement;
}
return null;
}(e, t);
e.delegateTarget = n, n && r.call(o || this, e);
}));
}
n.delegateMixin = function(e) {
e.delegate = function(e, t, r) {
n(this.elem, e, t, r, this);
};
}, e.exports = n;
}, function(e, t, n) {
n(6), e.exports = n(24);
}, function(e, t, n) {
let r = n(7);
!function() {
let e = document.querySelector("[data-order-form]");
e && new r({
elem: e
});
}();
}, function(e, t, n) {
n(3);
let r = n(1), o = n(4), i = n(17).FormPayment;
const a = n(2), s = n(0).lang;
a.i18n.add("ebook", n(22)("./" + s + ".yml"));
class c {
constructor(e) {
this.elem = e.elem, this.product = "ebook", this.elem.addEventListener("submit", (e => this.onSubmit(e))), 
this.delegate("[data-order-payment-change]", "click", (function(e) {
e.preventDefault(), this.elem.querySelector("[data-order-form-step-payment]").style.display = "block", 
this.elem.querySelector("[data-order-form-step-confirm]").style.display = "none", 
this.elem.querySelector("[data-order-form-step-receipt]").style.display = "none";
})), this.delegate(".new-complex-form__extract .extract__item", "click", (function(e) {
e.delegateTarget.querySelector('[type="radio"]').checked = !0;
}));
}
onSubmit(e) {
e.preventDefault(), new i(this, this.elem).submit();
}
getOrderData() {
let e = {};
if (window.order) e.orderNumber = window.order.number, e.amount = window.order.amount, 
e.title = window.order.title, e.email = window.order.email; else {
let t = this.elem.querySelector('input[name="orderTemplate"]:checked');
e.orderTemplate = t.value, e.amount = t.dataset.price, e.title = t.dataset.title;
}
if (this.elem.elements.email) {
if (!this.elem.elements.email.value) return new r.Error(a("ebook.client.enter_email")), 
this.elem.elements.email.scrollIntoView(), setTimeout((function() {
window.scrollBy(0, -200);
}), 0), void this.elem.elements.email.focus();
e.email = this.elem.elements.email.value;
}
return e.email || (e.email = window.currentUser.email), e;
}
}
o.delegateMixin(c.prototype), e.exports = c;
}, function(e, t) {
e.exports = function() {
let e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return e ? e[1] : null;
};
}, function(e, t, n) {
e.exports = n(10);
}, function(e, t, n) {
"use strict";
var r = n(11), o = n(12);
function i(e) {
return Object.prototype.toString.call(e);
}
function a(e) {
return "[object String]" === i(e);
}
function s(e) {
return !isNaN(e) && isFinite(e);
}
function c(e) {
return !0 === e || !1 === e;
}
function u(e) {
return "[object Object]" === i(e);
}
var l = Array.isArray || function(e) {
return "[object Array]" === i(e);
}, p = Array.prototype.forEach;
function f(e, t, n) {
if (null !== e) if (p && e.forEach === p) e.forEach(t, n); else if (e.length === +e.length) for (var r = 0, o = e.length; r < o; r += 1) t.call(n, e[r], r, e); else for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.call(n, e[i], i, e);
}
var d = /%[sdj%]/g;
function h(e) {
var t = 1, n = arguments, r = n.length, o = String(e).replace(d, (function(e) {
if ("%%" === e) return "%";
if (t >= r) return e;
switch (e) {
case "%s":
return String(n[t++]);

case "%d":
return Number(n[t++]);

case "%j":
return JSON.stringify(n[t++]);

default:
return e;
}
}));
return o;
}
function m(e) {
var t = {};
return f(e || {}, (function(e, n) {
e && "object" == typeof e ? f(m(e), (function(e, r) {
t[n + "." + r] = e;
})) : t[n] = e;
})), t;
}
var y = "#@$";
function v(e, t) {
return e + y + t;
}
function _(e, t, n) {
var r = v(t, n), o = e._storage;
if (o.hasOwnProperty(r)) return r;
if (t === e._defaultLocale) return null;
var i = e._fallbacks_cache;
if (i.hasOwnProperty(r)) return i[r];
for (var a, s = e._fallbacks[t] || [ e._defaultLocale ], c = 0, u = s.length; c < u; c++) if (a = v(s[c], n), 
o.hasOwnProperty(a)) return i[r] = a, i[r];
return i[r] = null, null;
}
function g(e, t, n) {
var r = o.indexOf(e, t);
return -1 === r ? h('[pluralizer for "%s" locale not found]', e) : void 0 === n[r] ? h('[plural form %d ("%s") not found in translation]', r, o.forms(e)[r]) : n[r];
}
function b(e) {
if (!(this instanceof b)) return new b(e);
this._defaultLocale = e ? String(e) : "en", this._fallbacks = {}, this._fallbacks_cache = {}, 
this._storage = {}, this._plurals_cache = {};
}
b.prototype.addPhrase = function(e, t, n, r) {
var o, i = this;
if (c(r)) o = r ? 1 / 0 : 0; else if (s(r)) {
if ((o = Math.floor(r)) < 0) throw new TypeError("Invalid flatten level (should be >= 0).");
} else o = 1 / 0;
if (u(n) && o > 0) return f(n, (function(n, r) {
i.addPhrase(e, (t ? t + "." : "") + r, n, o - 1);
})), this;
if (a(n)) this._storage[v(e, t)] = {
translation: n,
locale: e,
raw: !1
}; else {
if (!(l(n) || s(n) || c(n) || 0 === o && u(n))) throw new TypeError("Invalid translation - [String|Object|Array|Number|Boolean] expected.");
this._storage[v(e, t)] = {
translation: n,
locale: e,
raw: !0
};
}
return i._fallbacks_cache = {}, this;
}, b.prototype.setFallback = function(e, t) {
var n = this._defaultLocale;
if (n === e) throw new Error("Default locale can't have fallbacks");
var r = l(t) ? t.slice() : [ t ];
return r[r.length - 1] !== n && r.push(n), this._fallbacks[e] = r, this._fallbacks_cache = {}, 
this;
};
var w = /#\{|\(\(|\\\\/;
b.prototype.translate = function(e, t, n) {
var o, c = _(this, e, t);
return c ? (o = this._storage[c]).raw ? o.translation : (o.hasOwnProperty("compiled") || (o.compiled = function(e, t, n) {
var o, i, a, s, c, u;
return w.test(t) ? 1 === (o = r.parse(t)).length && "literal" === o[0].type ? o[0].text : (e._plurals_cache[n] || (e._plurals_cache[n] = new b(n)), 
u = e._plurals_cache[n], (i = []).push([ 'var str = "", strict, strict_exec, forms, forms_exec, plrl, cache, loc, loc_plzr, anchor;' ]), 
i.push("params = flatten(params);"), f(o, (function(e) {
if ("literal" !== e.type) {
if ("variable" === e.type) return a = e.anchor, void i.push(h('str += ("undefined" === typeof (params[%j])) ? "[missed variable: %s]" : params[%j];', a, a, a));
if ("plural" !== e.type) throw new Error("Unknown node type");
a = e.anchor, s = {}, f(e.strict, (function(t, o) {
var i = r.parse(t);
if (1 === i.length && "literal" === i[0].type) return s[o] = !1, void (e.strict[o] = i[0].text);
s[o] = !0, u.hasPhrase(n, t, !0) || u.addPhrase(n, t, t);
})), c = {}, f(e.forms, (function(t, o) {
var i, a = r.parse(t);
if (1 === a.length && "literal" === a[0].type) return i = a[0].text, e.forms[o] = i, 
void (c[i] = !1);
c[t] = !0, u.hasPhrase(n, t, !0) || u.addPhrase(n, t, t);
})), i.push(h("loc = %j;", n)), i.push(h("loc_plzr = %j;", n.split(/[-_]/)[0])), 
i.push(h("anchor = params[%j];", a)), i.push(h("cache = this._plurals_cache[loc];")), 
i.push(h("strict = %j;", e.strict)), i.push(h("strict_exec = %j;", s)), i.push(h("forms = %j;", e.forms)), 
i.push(h("forms_exec = %j;", c)), i.push("if (+(anchor) != anchor) {"), i.push(h('  str += "[invalid plurals amount: %s(" + anchor + ")]";', a)), 
i.push("} else {"), i.push("  if (strict[anchor] !== undefined) {"), i.push("    plrl = strict[anchor];"), 
i.push("    str += strict_exec[anchor] ? cache.t(loc, plrl, params) : plrl;"), i.push("  } else {"), 
i.push("    plrl = pluralizer(loc_plzr, +anchor, forms);"), i.push("    str += forms_exec[plrl] ? cache.t(loc, plrl, params) : plrl;"), 
i.push("  }"), i.push("}");
} else i.push(h("str += %j;", e.text));
})), i.push("return str;"), new Function("params", "flatten", "pluralizer", i.join("\n"))) : t;
}(this, o.translation, o.locale)), "[object Function]" !== i(o.compiled) ? o.compiled : ((s(n) || a(n)) && (n = {
count: n,
value: n
}), o.compiled.call(this, n, m, g))) : e + ": No translation for [" + t + "]";
}, b.prototype.hasPhrase = function(e, t, n) {
return n ? this._storage.hasOwnProperty(v(e, t)) : !!_(this, e, t);
}, b.prototype.getLocale = function(e, t, n) {
if (n) return this._storage.hasOwnProperty(v(e, t)) ? e : null;
var r = _(this, e, t);
return r ? r.split(y, 2)[0] : null;
}, b.prototype.t = b.prototype.translate, b.prototype.stringify = function(e) {
var t = this, n = {};
f(this._storage, (function(e, t) {
n[t.split(y)[1]] = !0;
}));
var r = {};
f(n, (function(n, o) {
var i = _(t, e, o);
if (i) {
var a = t._storage[i].locale;
r[a] || (r[a] = {}), r[a][o] = t._storage[i].translation;
}
}));
var o = {
fallback: {},
locales: r
}, i = (t._fallbacks[e] || []).slice(0, -1);
return i.length && (o.fallback[e] = i), JSON.stringify(o);
}, b.prototype.load = function(e) {
var t = this;
return a(e) && (e = JSON.parse(e)), f(e.locales, (function(e, n) {
f(e, (function(e, r) {
t.addPhrase(n, r, e, 0);
}));
})), f(e.fallback, (function(e, n) {
t.setFallback(n, e);
})), this;
}, e.exports = b;
}, function(e, t) {
e.exports = function() {
function e(e, t, n, r, o, i) {
this.message = e, this.expected = t, this.found = n, this.offset = r, this.line = o, 
this.column = i, this.name = "SyntaxError";
}
return function(e, t) {
function n() {
this.constructor = e;
}
n.prototype = t.prototype, e.prototype = new n;
}(e, Error), {
SyntaxError: e,
parse: function(t) {
var n, r = arguments.length > 1 ? arguments[1] : {}, o = {}, i = {
start: le
}, a = le, s = o, c = "((", u = {
type: "literal",
value: "((",
description: '"(("'
}, l = "))", p = {
type: "literal",
value: "))",
description: '"))"'
}, f = null, d = function(e, t) {
return {
type: "plural",
forms: we(e),
strict: ke(e),
anchor: t || "count"
};
}, h = "|", m = {
type: "literal",
value: "|",
description: '"|"'
}, y = function(e, t) {
return [ e ].concat(t);
}, v = function(e) {
return [ e ];
}, _ = "=", g = {
type: "literal",
value: "=",
description: '"="'
}, b = /^[0-9]/, w = {
type: "class",
value: "[0-9]",
description: "[0-9]"
}, k = " ", F = {
type: "literal",
value: " ",
description: '" "'
}, x = function(e, t) {
return {
strict: e.join(""),
text: t.join("")
};
}, E = function() {
return {
text: ae()
};
}, S = "\\", j = {
type: "literal",
value: "\\",
description: '"\\\\"'
}, T = /^[\\|)(]/, O = {
type: "class",
value: "[\\\\|)(]",
description: "[\\\\|)(]"
}, P = function(e) {
return e;
}, A = void 0, C = {
type: "any",
description: "any character"
}, L = function() {
return ae();
}, M = ":", q = {
type: "literal",
value: ":",
description: '":"'
}, U = function(e) {
return e;
}, I = "#{", N = {
type: "literal",
value: "#{",
description: '"#{"'
}, D = "}", z = {
type: "literal",
value: "}",
description: '"}"'
}, R = function(e) {
return {
type: "variable",
anchor: e
};
}, H = ".", B = {
type: "literal",
value: ".",
description: '"."'
}, W = function() {
return ae();
}, $ = /^[a-zA-Z_$]/, J = {
type: "class",
value: "[a-zA-Z_$]",
description: "[a-zA-Z_$]"
}, K = /^[a-zA-Z0-9_$]/, Y = {
type: "class",
value: "[a-zA-Z0-9_$]",
description: "[a-zA-Z0-9_$]"
}, Z = function(e) {
return e;
}, X = function(e) {
return {
type: "literal",
text: e.join("")
};
}, G = /^[\\#()|]/, V = {
type: "class",
value: "[\\\\#()|]",
description: "[\\\\#()|]"
}, Q = 0, ee = 0, te = 0, ne = {
line: 1,
column: 1,
seenCR: !1
}, re = 0, oe = [], ie = 0;
if ("startRule" in r) {
if (!(r.startRule in i)) throw new Error("Can't start parsing from rule \"" + r.startRule + '".');
a = i[r.startRule];
}
function ae() {
return t.substring(ee, Q);
}
function se(e) {
return te !== e && (te > e && (te = 0, ne = {
line: 1,
column: 1,
seenCR: !1
}), function(e, n, r) {
var o, i;
for (o = n; o < r; o++) "\n" === (i = t.charAt(o)) ? (e.seenCR || e.line++, e.column = 1, 
e.seenCR = !1) : "\r" === i || "\u2028" === i || "\u2029" === i ? (e.line++, e.column = 1, 
e.seenCR = !0) : (e.column++, e.seenCR = !1);
}(ne, te, e), te = e), ne;
}
function ce(e) {
Q < re || (Q > re && (re = Q, oe = []), oe.push(e));
}
function ue(n, r, o) {
var i = se(o), a = o < t.length ? t.charAt(o) : null;
return null !== r && function(e) {
var t = 1;
for (e.sort((function(e, t) {
return e.description < t.description ? -1 : e.description > t.description ? 1 : 0;
})); t < e.length; ) e[t - 1] === e[t] ? e.splice(t, 1) : t++;
}(r), new e(null !== n ? n : function(e, t) {
var n, r = new Array(e.length);
for (n = 0; n < e.length; n++) r[n] = e[n].description;
return "Expected " + (e.length > 1 ? r.slice(0, -1).join(", ") + " or " + r[e.length - 1] : r[0]) + " but " + (t ? '"' + function(e) {
function t(e) {
return e.charCodeAt(0).toString(16).toUpperCase();
}
return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, (function(e) {
return "\\x0" + t(e);
})).replace(/[\x10-\x1F\x80-\xFF]/g, (function(e) {
return "\\x" + t(e);
})).replace(/[\u0180-\u0FFF]/g, (function(e) {
return "\\u0" + t(e);
})).replace(/[\u1080-\uFFFF]/g, (function(e) {
return "\\u" + t(e);
}));
}(t) + '"' : "end of input") + " found.";
}(r, a), r, a, o, i.line, i.column);
}
function le() {
var e, t;
for (e = [], (t = ge()) === o && (t = pe()) === o && (t = ye()); t !== o; ) e.push(t), 
(t = ge()) === o && (t = pe()) === o && (t = ye());
return e;
}
function pe() {
var e, n, r, i, a;
return e = Q, t.substr(Q, 2) === c ? (n = c, Q += 2) : (n = o, 0 === ie && ce(u)), 
n !== o && (r = fe()) !== o ? (t.substr(Q, 2) === l ? (i = l, Q += 2) : (i = o, 
0 === ie && ce(p)), i !== o ? ((a = me()) === o && (a = f), a !== o ? (ee = e, e = n = d(r, a)) : (Q = e, 
e = s)) : (Q = e, e = s)) : (Q = e, e = s), e;
}
function fe() {
var e, n, r, i;
return e = Q, (n = de()) !== o ? (124 === t.charCodeAt(Q) ? (r = h, Q++) : (r = o, 
0 === ie && ce(m)), r !== o && (i = fe()) !== o ? (ee = e, e = n = y(n, i)) : (Q = e, 
e = s)) : (Q = e, e = s), e === o && (e = Q, (n = de()) !== o && (ee = e, n = v(n)), 
e = n), e;
}
function de() {
var e, n, r, i, a, c;
if (e = Q, 61 === t.charCodeAt(Q) ? (n = _, Q++) : (n = o, 0 === ie && ce(g)), n !== o) {
if (r = [], b.test(t.charAt(Q)) ? (i = t.charAt(Q), Q++) : (i = o, 0 === ie && ce(w)), 
i !== o) for (;i !== o; ) r.push(i), b.test(t.charAt(Q)) ? (i = t.charAt(Q), Q++) : (i = o, 
0 === ie && ce(w)); else r = s;
if (r !== o) if (32 === t.charCodeAt(Q) ? (i = k, Q++) : (i = o, 0 === ie && ce(F)), 
i === o && (i = f), i !== o) {
if (a = [], (c = he()) !== o) for (;c !== o; ) a.push(c), c = he(); else a = s;
a !== o ? (ee = e, e = n = x(r, a)) : (Q = e, e = s);
} else Q = e, e = s; else Q = e, e = s;
} else Q = e, e = s;
if (e === o) {
if (e = Q, n = [], (r = he()) !== o) for (;r !== o; ) n.push(r), r = he(); else n = s;
n !== o && (ee = e, n = E()), e = n;
}
return e;
}
function he() {
var e, n, r;
return e = Q, 92 === t.charCodeAt(Q) ? (n = S, Q++) : (n = o, 0 === ie && ce(j)), 
n !== o ? (T.test(t.charAt(Q)) ? (r = t.charAt(Q), Q++) : (r = o, 0 === ie && ce(O)), 
r !== o ? (ee = e, e = n = P(r)) : (Q = e, e = s)) : (Q = e, e = s), e === o && (e = Q, 
n = Q, ie++, 124 === t.charCodeAt(Q) ? (r = h, Q++) : (r = o, 0 === ie && ce(m)), 
r === o && (t.substr(Q, 2) === l ? (r = l, Q += 2) : (r = o, 0 === ie && ce(p))), 
ie--, r === o ? n = A : (Q = n, n = s), n !== o ? (t.length > Q ? (r = t.charAt(Q), 
Q++) : (r = o, 0 === ie && ce(C)), r !== o ? (ee = e, e = n = L()) : (Q = e, e = s)) : (Q = e, 
e = s)), e;
}
function me() {
var e, n, r;
return e = Q, 58 === t.charCodeAt(Q) ? (n = M, Q++) : (n = o, 0 === ie && ce(q)), 
n !== o && (r = ve()) !== o ? (ee = e, e = n = U(r)) : (Q = e, e = s), e;
}
function ye() {
var e, n, r, i;
return e = Q, t.substr(Q, 2) === I ? (n = I, Q += 2) : (n = o, 0 === ie && ce(N)), 
n !== o && (r = ve()) !== o ? (125 === t.charCodeAt(Q) ? (i = D, Q++) : (i = o, 
0 === ie && ce(z)), i !== o ? (ee = e, e = n = R(r)) : (Q = e, e = s)) : (Q = e, 
e = s), e;
}
function ve() {
var e, n, r, i;
if (e = Q, _e() !== o) if (46 === t.charCodeAt(Q) ? (n = H, Q++) : (n = o, 0 === ie && ce(B)), 
n !== o) {
if (r = [], (i = ve()) !== o) for (;i !== o; ) r.push(i), i = ve(); else r = s;
r !== o ? (ee = e, e = W()) : (Q = e, e = s);
} else Q = e, e = s; else Q = e, e = s;
return e === o && (e = _e()), e;
}
function _e() {
var e, n, r, i;
if (e = Q, $.test(t.charAt(Q)) ? (n = t.charAt(Q), Q++) : (n = o, 0 === ie && ce(J)), 
n !== o) {
for (r = [], K.test(t.charAt(Q)) ? (i = t.charAt(Q), Q++) : (i = o, 0 === ie && ce(Y)); i !== o; ) r.push(i), 
K.test(t.charAt(Q)) ? (i = t.charAt(Q), Q++) : (i = o, 0 === ie && ce(Y));
r !== o ? (ee = e, e = n = L()) : (Q = e, e = s);
} else Q = e, e = s;
return e;
}
function ge() {
var e, t, n, r, i;
if (e = Q, t = [], n = Q, r = Q, ie++, (i = pe()) === o && (i = ye()), ie--, i === o ? r = A : (Q = r, 
r = s), r !== o && (i = be()) !== o ? (ee = n, n = r = Z(i)) : (Q = n, n = s), n !== o) for (;n !== o; ) t.push(n), 
n = Q, r = Q, ie++, (i = pe()) === o && (i = ye()), ie--, i === o ? r = A : (Q = r, 
r = s), r !== o && (i = be()) !== o ? (ee = n, n = r = Z(i)) : (Q = n, n = s); else t = s;
return t !== o && (ee = e, t = X(t)), e = t;
}
function be() {
var e, n, r;
return e = Q, 92 === t.charCodeAt(Q) ? (n = S, Q++) : (n = o, 0 === ie && ce(j)), 
n !== o ? (G.test(t.charAt(Q)) ? (r = t.charAt(Q), Q++) : (r = o, 0 === ie && ce(V)), 
r !== o ? (ee = e, e = n = P(r)) : (Q = e, e = s)) : (Q = e, e = s), e === o && (t.length > Q ? (e = t.charAt(Q), 
Q++) : (e = o, 0 === ie && ce(C))), e;
}
function we(e) {
for (var t = [], n = 0; n < e.length; n++) void 0 === e[n].strict && t.push(e[n].text);
return t;
}
function ke(e) {
for (var t = {}, n = 0; n < e.length; n++) void 0 !== e[n].strict && (t[e[n].strict] = e[n].text);
return t;
}
if ((n = a()) !== o && Q === t.length) return n;
throw n !== o && Q < t.length && ce({
type: "end",
description: "end of input"
}), ue(null, oe, re);
}
};
}();
}, function(e, t, n) {
"use strict";
var r = {};
function o(e) {
var t;
return r[e] ? e : (t = e.toLowerCase().replace("_", "-"), r[t] ? t : (t = t.split("-")[0], 
r[t] ? t : null));
}
function i(e, t) {
var n = o(e);
if (!n) return -1;
if (!r[n].cFn) return 0;
var i = String(t), a = i.indexOf(".") < 0 ? "" : i.split(".")[1], s = a.length, c = +t, u = +i.split(".")[0], l = 0 === a.length ? 0 : +a.replace(/0+$/, "");
return r[n].cFn(c, u, s, +a, l);
}
function a(e, t) {
var n = o(e);
if (!n) return -1;
if (!r[n].oFn) return 0;
var i = String(t), a = i.indexOf(".") < 0 ? "" : i.split(".")[1], s = a.length, c = +t, u = +i.split(".")[0], l = 0 === a.length ? 0 : +a.replace(/0+$/, "");
return r[n].oFn(c, u, s, +a, l);
}
e.exports = function(e, t) {
var n = o(e);
return n ? r[n].c[i(n, t)] : null;
}, e.exports.indexOf = i, e.exports.forms = function(e) {
var t = o(e);
return r[t] ? r[t].c : null;
}, e.exports.ordinal = function(e, t) {
var n = o(e);
return r[n] ? r[n].o[a(n, t)] : null;
}, e.exports.ordinal.indexOf = a, e.exports.ordinal.forms = function(e) {
var t = o(e);
return r[t] ? r[t].o : null;
};
var s = [ "zero", "one", "two", "few", "many", "other" ];
function c(e) {
return s[e];
}
function u(e, t) {
var n;
for (t.c = t.c ? t.c.map(c) : [ "other" ], t.o = t.o ? t.o.map(c) : [ "other" ], 
n = 0; n < e.length; n++) r[e[n]] = t;
}
function l(e, t, n) {
return e <= n && n <= t && n % 1 == 0;
}
function p(e, t) {
return e.indexOf(t) >= 0;
}
u([ "af", "asa", "bem", "bez", "bg", "brx", "ce", "cgg", "chr", "ckb", "dv", "ee", "el", "eo", "es", "eu", "fo", "fur", "gsw", "ha", "haw", "jgo", "jmc", "kaj", "kcg", "kkj", "kl", "ks", "ksb", "ku", "ky", "lb", "lg", "mas", "mgo", "ml", "mn", "nah", "nb", "nd", "nn", "nnh", "no", "nr", "ny", "nyn", "om", "or", "os", "pap", "ps", "rm", "rof", "rwk", "saq", "sdh", "seh", "sn", "so", "ss", "ssy", "st", "syr", "ta", "te", "teo", "tig", "tk", "tn", "tr", "ts", "ug", "uz", "ve", "vo", "vun", "wae", "xh", "xog" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "ak", "bh", "guw", "ln", "mg", "nso", "pa", "ti", "wa" ], {
c: [ 1, 5 ],
cFn: function(e) {
return l(0, 1, e) ? 0 : 1;
}
}), u([ "am", "fa", "kn", "zu" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : 1;
}
}), u([ "ar", "ars" ], {
c: [ 0, 1, 2, 3, 4, 5 ],
cFn: function(e) {
var t = e % 100;
return 0 === e ? 0 : 1 === e ? 1 : 2 === e ? 2 : l(3, 10, t) ? 3 : l(11, 99, t) ? 4 : 5;
}
}), u([ "as", "bn" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : 1;
},
o: [ 1, 2, 3, 4, 5 ],
oFn: function(e) {
return p([ 1, 5, 7, 8, 9, 10 ], e) ? 0 : p([ 2, 3 ], e) ? 1 : 4 === e ? 2 : 6 === e ? 3 : 4;
}
}), u([ "ast", "de", "et", "fi", "fy", "gl", "ji", "nl", "sw", "ur", "yi" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
}
}), u([ "az" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 3, 4, 5 ],
oFn: function(e, t) {
var n = t % 10, r = t % 100, o = t % 1e3;
return p([ 1, 2, 5, 7, 8 ], n) || p([ 20, 50, 70, 80 ], r) ? 0 : p([ 3, 4 ], n) || p([ 100, 200, 300, 400, 500, 600, 700, 800, 900 ], o) ? 1 : 0 === t || 6 === n || p([ 40, 60, 90 ], r) ? 2 : 3;
}
}), u([ "be" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e) {
var t = e % 10, n = e % 100;
return 1 === t && 11 !== n ? 0 : l(2, 4, t) && !l(12, 14, n) ? 1 : 0 === t || l(5, 9, t) || l(11, 14, n) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(e) {
var t = e % 100;
return p([ 2, 3 ], e % 10) && !p([ 12, 13 ], t) ? 0 : 1;
}
}), u([ "bm", "bo", "dz", "id", "ig", "ii", "in", "ja", "jbo", "jv", "jw", "kde", "kea", "km", "ko", "lkt", "my", "nqo", "root", "sah", "ses", "sg", "th", "to", "wo", "yo", "yue", "zh" ], {}), 
u([ "br" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(e) {
var t = e % 10, n = e % 100, r = e % 1e6;
return 1 !== t || p([ 11, 71, 91 ], n) ? 2 !== t || p([ 12, 72, 92 ], n) ? !l(3, 4, t) && 9 !== t || l(10, 19, n) || l(70, 79, n) || l(90, 99, n) ? 0 !== e && 0 === r ? 3 : 4 : 2 : 1 : 0;
}
}), u([ "bs", "hr", "sh", "sr" ], {
c: [ 1, 3, 5 ],
cFn: function(e, t, n, r) {
var o = t % 10, i = t % 100, a = r % 10, s = r % 100;
return 0 === n && 1 === o && 11 !== i || 1 === a && 11 !== s ? 0 : 0 === n && l(2, 4, o) && !l(12, 14, i) || l(2, 4, a) && !l(12, 14, s) ? 1 : 2;
}
}), u([ "ca" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(e) {
return p([ 1, 3 ], e) ? 0 : 2 === e ? 1 : 4 === e ? 2 : 3;
}
}), u([ "cs", "sk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : l(2, 4, t) && 0 === n ? 1 : 0 !== n ? 2 : 3;
}
}), u([ "cy" ], {
c: [ 0, 1, 2, 3, 4, 5 ],
cFn: function(e) {
return 0 === e ? 0 : 1 === e ? 1 : 2 === e ? 2 : 3 === e ? 3 : 6 === e ? 4 : 5;
},
o: [ 0, 1, 2, 3, 4, 5 ],
oFn: function(e) {
return p([ 0, 7, 8, 9 ], e) ? 0 : 1 === e ? 1 : 2 === e ? 2 : p([ 3, 4 ], e) ? 3 : p([ 5, 6 ], e) ? 4 : 5;
}
}), u([ "da" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r, o) {
return 1 === e || 0 !== o && p([ 0, 1 ], t) ? 0 : 1;
}
}), u([ "dsb", "hsb" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(e, t, n, r) {
var o = t % 100, i = r % 100;
return 0 === n && 1 === o || 1 === i ? 0 : 0 === n && 2 === o || 2 === i ? 1 : 0 === n && l(3, 4, o) || l(3, 4, i) ? 2 : 3;
}
}), u([ "en" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(e) {
var t = e % 10, n = e % 100;
return 1 === t && 11 !== n ? 0 : 2 === t && 12 !== n ? 1 : 3 === t && 13 !== n ? 2 : 3;
}
}), u([ "ff", "kab" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return p([ 0, 1 ], t) ? 0 : 1;
}
}), u([ "fil", "tl" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r) {
var o = t % 10, i = r % 10;
return 0 === n && p([ 1, 2, 3 ], t) || 0 === n && !p([ 4, 6, 9 ], o) || 0 !== n && !p([ 4, 6, 9 ], i) ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "fr", "hy" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return p([ 0, 1 ], t) ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "ga" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 2 === e ? 1 : l(3, 6, e) ? 2 : l(7, 10, e) ? 3 : 4;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "gd" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(e) {
return p([ 1, 11 ], e) ? 0 : p([ 2, 12 ], e) ? 1 : l(3, 10, e) || l(13, 19, e) ? 2 : 3;
}
}), u([ "gu", "hi" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : 1;
},
o: [ 1, 2, 3, 4, 5 ],
oFn: function(e) {
return 1 === e ? 0 : p([ 2, 3 ], e) ? 1 : 4 === e ? 2 : 6 === e ? 3 : 4;
}
}), u([ "gv" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(e, t, n) {
var r = t % 10;
return 0 === n && 1 === r ? 0 : 0 === n && 2 === r ? 1 : 0 === n && p([ 0, 20, 40, 60, 80 ], t % 100) ? 2 : 0 !== n ? 3 : 4;
}
}), u([ "he", "iw" ], {
c: [ 1, 2, 4, 5 ],
cFn: function(e, t, n) {
var r = e % 10;
return 1 === t && 0 === n ? 0 : 2 === t && 0 === n ? 1 : 0 !== n || l(0, 10, e) || 0 !== r ? 3 : 2;
}
}), u([ "hu" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return p([ 1, 5 ], e) ? 0 : 1;
}
}), u([ "is" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r, o) {
return 0 === o && 1 === t % 10 && 11 !== t % 100 || 0 !== o ? 0 : 1;
}
}), u([ "it" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
},
o: [ 4, 5 ],
oFn: function(e) {
return p([ 11, 8, 80, 800 ], e) ? 0 : 1;
}
}), u([ "iu", "kw", "naq", "se", "sma", "smi", "smj", "smn", "sms" ], {
c: [ 1, 2, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 2 === e ? 1 : 2;
}
}), u([ "ka" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 4, 5 ],
oFn: function(e, t) {
var n = t % 100;
return 1 === t ? 0 : 0 === t || l(2, 20, n) || 40 === n || 60 === n || 80 === n ? 1 : 2;
}
}), u([ "kk" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 4, 5 ],
oFn: function(e) {
var t = e % 10;
return 6 === t || 9 === t || 0 === t && 0 !== e ? 0 : 1;
}
}), u([ "ksh" ], {
c: [ 0, 1, 5 ],
cFn: function(e) {
return 0 === e ? 0 : 1 === e ? 1 : 2;
}
}), u([ "lag" ], {
c: [ 0, 1, 5 ],
cFn: function(e, t) {
return 0 === e ? 0 : p([ 0, 1 ], t) && 0 !== e ? 1 : 2;
}
}), u([ "lo", "ms", "vi" ], {
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "lt" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n, r) {
var o = e % 10, i = e % 100;
return 1 !== o || l(11, 19, i) ? l(2, 9, o) && !l(11, 19, i) ? 1 : 0 !== r ? 2 : 3 : 0;
}
}), u([ "lv", "prg" ], {
c: [ 0, 1, 5 ],
cFn: function(e, t, n, r) {
var o = e % 10, i = e % 100, a = r % 100, s = r % 10;
return 0 === o || l(11, 19, i) || 2 === n && l(11, 19, a) ? 0 : 1 === o && 11 !== i || 2 === n && 1 === s && 11 !== a || 2 !== n && 1 === s ? 1 : 2;
}
}), u([ "mk" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r) {
return 0 === n && 1 === t % 10 || 1 === r % 10 ? 0 : 1;
},
o: [ 1, 2, 4, 5 ],
oFn: function(e, t) {
var n = t % 10, r = t % 100;
return 1 === n && 11 !== r ? 0 : 2 === n && 12 !== r ? 1 : p([ 7, 8 ], n) && !p([ 17, 18 ], r) ? 2 : 3;
}
}), u([ "mo", "ro" ], {
c: [ 1, 3, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 0 !== n || 0 === e || 1 !== e && l(1, 19, e % 100) ? 1 : 2;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "mr" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(e) {
return 1 === e ? 0 : p([ 2, 3 ], e) ? 1 : 4 === e ? 2 : 3;
}
}), u([ "mt" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e) {
var t = e % 100;
return 1 === e ? 0 : 0 === e || l(2, 10, t) ? 1 : l(11, 19, t) ? 2 : 3;
}
}), u([ "ne" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return l(1, 4, e) ? 0 : 1;
}
}), u([ "pl" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n) {
var r = t % 10, o = t % 100;
return 1 === t && 0 === n ? 0 : 0 === n && l(2, 4, r) && !l(12, 14, o) ? 1 : 0 === n && 1 !== t && l(0, 1, r) || 0 === n && l(5, 9, r) || 0 === n && l(12, 14, o) ? 2 : 3;
}
}), u([ "pt" ], {
c: [ 1, 5 ],
cFn: function(e) {
return l(0, 2, e) && 2 !== e ? 0 : 1;
}
}), u([ "pt-pt" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === e && 0 === n ? 0 : 1;
}
}), u([ "ru" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n) {
var r = t % 10, o = t % 100;
return 0 === n && 1 === r && 11 !== o ? 0 : 0 === n && l(2, 4, r) && !l(12, 14, o) ? 1 : 0 === n && 0 === r || 0 === n && l(5, 9, r) || 0 === n && l(11, 14, o) ? 2 : 3;
}
}), u([ "shi" ], {
c: [ 1, 3, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : l(2, 10, e) ? 1 : 2;
}
}), u([ "si" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r) {
return p([ 0, 1 ], e) || 0 === t && 1 === r ? 0 : 1;
}
}), u([ "sl" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(e, t, n) {
var r = t % 100;
return 0 === n && 1 === r ? 0 : 0 === n && 2 === r ? 1 : 0 === n && l(3, 4, r) || 0 !== n ? 2 : 3;
}
}), u([ "sq" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 4, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 4 === e % 10 && 14 !== e % 100 ? 1 : 2;
}
}), u([ "sv" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
var t = e % 100;
return p([ 1, 2 ], e % 10) && !p([ 11, 12 ], t) ? 0 : 1;
}
}), u([ "tzm" ], {
c: [ 1, 5 ],
cFn: function(e) {
return l(0, 1, e) || l(11, 99, e) ? 0 : 1;
}
}), u([ "uk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n) {
var r = t % 10, o = t % 100;
return 0 === n && 1 === r && 11 !== o ? 0 : 0 === n && l(2, 4, r) && !l(12, 14, o) ? 1 : 0 === n && 0 === r || 0 === n && l(5, 9, r) || 0 === n && l(11, 14, o) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(e) {
return 3 === e % 10 && 13 !== e % 100 ? 0 : 1;
}
});
}, function(e, t, n) {
var r = {
"./en.yml": 14
};
function o(e) {
var t = i(e);
return n(t);
}
function i(e) {
var t = r[e];
if (!(t + 1)) {
var n = new Error("Cannot find module '" + e + "'");
throw n.code = "MODULE_NOT_FOUND", n;
}
return t;
}
o.keys = function() {
return Object.keys(r);
}, o.resolve = i, e.exports = o, o.id = 13;
}, function(e, t) {
e.exports = {
site: {
privacy_policy: "privacy policy",
terms: "terms of usage",
banner_bottom: 'Advance your skils with <a href="https://frontendmasters.com/learn/javascript/?utm_source=website&utm_medium=jsinfo&utm_campaign=jsinfo">video courses on JavaScript and Frameworks</a>.',
action_required: "Action required",
gdpr_dialog: {
title: "This website uses cookies",
text: 'We use browser technologies such as cookies and local storage to store your preferences. You need to accept our <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Use</a> for us to do so.',
accept: "Accept",
cancel: "Cancel"
},
toolbar: {
lang_switcher: {
cta_text: '<p>We want to make this open-source project available for people all around the world.</p> <p><a href="https://javascript.info/translate">Help to translate</a> the content of this tutorial to your language!</p>\n',
footer_text: "how much content is translated to the corresponding language",
old_version: "Old version is published, needs backporting."
},
logo: {
normal: {
svg: "sitetoolbar__logo_en.svg",
width: 200
},
"normal-white": {
svg: "sitetoolbar__logo_en-white.svg"
},
small: {
svg: "sitetoolbar__logo_small_en.svg",
width: 70
},
"small-white": {
svg: "sitetoolbar__logo_small_en-white.svg"
}
},
sections: null,
buy_ebook_extra: "Buy",
buy_ebook: "EPUB/PDF",
search_placeholder: "Search on Javascript.info",
search_button: "Search",
public_profile: "Public profile",
account: "Account",
notifications: "Notifications",
admin: "Admin",
logout: "Logout"
},
sorry_old_browser: "Sorry, Internet Explorer is not supported, please use a newer browser.",
contact_us: "contact us",
about_the_project: "about the project",
ilya_kantor: "Ilya Kantor",
comments: "Comments",
loading: "Loading...",
search: "Search",
share: "Share",
read_before_commenting: "read this before commenting…",
last_updated_at: "Last updated at #{date}",
meta: {
description: "Modern JavaScript Tutorial: simple, but detailed explanations with examples and tasks, including: closures, document and events, object oriented programming and more."
},
"tablet-menu": {
choose_section: "Choose section",
search_placeholder: "Search in the tutorial",
search_button: "Search"
},
comment: {
help: [ 'If you have suggestions what to improve - please <a href="https://github.com/javascript-tutorial/en.javascript.info/issues/new">submit a GitHub issue</a> or a pull request instead of commenting.', "If you can't understand something in the article – please elaborate.", "To insert few words of code, use the <code>&lt;code&gt;</code> tag, for several lines – wrap them in <code>&lt;pre&gt;</code> tag, for more than 10 lines – use a sandbox (<a href='https://plnkr.co/edit/?p=preview'>plnkr</a>, <a href='https://jsbin.com'>jsbin</a>, <a href='http://codepen.io'>codepen</a>…)" ]
},
edit_on_github: "Edit on GitHub",
error: "error",
close: "close",
hide_forever: "hide permanently",
hidden_forever: "This information will not show up any more.",
subscribe: {
title: "Watch for javascript.info updates",
text: "We do not send advertisements, only relevant stuff. You choose what to receive:",
agreement: 'By signing up to newsletters you agree to the <a href="#{link}" target="_blank">terms of usage</a>.',
button: "Subscribe",
button_unsubscribe: "Unsubscribe from all",
common_updates: "Common updates",
common_updates_text: "new courses, master classes, article and screencast releases",
your_email: "your@email.here",
newsletters: "newsletter,newsletters,newsletters",
no_selected: "Nothing selected"
},
form: {
value_must_not_be_empty: "Value must not be empty.",
value_is_too_long: "Value is too long.",
value_is_too_short: "Value is too short.",
invalid_email: "Invalid email.",
invalid_value: "Invalid value.",
invalid_autocomplete: "Please, choose from the list",
invalid_date: "Invalid date, format: dd.mm.yyyyy.",
invalid_range: "This date is invalid here.",
save: "Save",
upload_file: "Upload file",
cancel: "Cancel",
server_error: "Request error, status code"
}
}
};
}, function(e, t, n) {
var r = {
"./en.yml": 16
};
function o(e) {
var t = i(e);
return n(t);
}
function i(e) {
var t = r[e];
if (!(t + 1)) {
var n = new Error("Cannot find module '" + e + "'");
throw n.code = "MODULE_NOT_FOUND", n;
}
return t;
}
o.keys = function() {
return Object.keys(r);
}, o.resolve = i, e.exports = o, o.id = 15;
}, function(e, t) {
e.exports = {
server_connection_error: "Server connection error.",
server_request_timeout: "Server request timeout.",
request_aborted: "Request was aborted.",
no_response: "No response from server.",
server_error: "Server error (code #{status}), try again later.",
invalid_format: "Invalid response format."
};
}, function(e, t, n) {
t.FormPayment = n(18);
}, function(e, t, n) {
let r = n(1), o = n(3), i = n(19);
const a = n(2), s = n(0);
n(0).currency;
a.i18n.add("payments", n(20)("./" + s.lang + ".yml"));
e.exports = class {
constructor(e, t) {
this.orderForm = e, this.paymentMethodElem = t;
}
request(e) {
let t = o(e);
return t.addEventListener("loadstart", function() {
let e = this.startRequestIndication();
t.addEventListener("loadend", e);
}.bind(this)), t;
}
startRequestIndication() {
this.paymentMethodElem.classList.add("modal-overlay_light");
let e = new i({
elem: this.paymentMethodElem.querySelector('[type="submit"]'),
size: "small",
class: "",
elemClass: "button_loading"
});
return e.start(), () => {
this.paymentMethodElem.classList.remove("modal-overlay_light"), e && e.stop();
};
}
readPaymentData() {
let e = {};
return [].forEach.call(this.paymentMethodElem.querySelectorAll("input,select,textarea"), (function(t) {
("radio" != t.type && "checkbox" != t.type || t.checked) && (e[t.name] = t.value);
})), e;
}
submit() {
let e = this.orderForm.getOrderData();
if (!e) return;
let t = this.readPaymentData();
if (t.paymentMethod) {
if ("invoice" == t.paymentMethod && !t.invoiceCompanyName) return new r.Error(a("payments.client.specify_company_name")), 
void this.paymentMethodElem.querySelector('[name="invoiceCompanyName"]').focus();
for (let n in t) e[n] = t[n];
this.sendPaymentRequest(e);
} else new r.Error(a("payments.client.choose_payment_method"));
}
sendPaymentRequest(e) {
let t = o({
method: "POST",
url: "/payments/common/checkout",
normalStatuses: [ 200, 403, 400 ],
body: e
});
e.orderTemplate && window.ga("ec:addProduct", {
id: this.orderForm.product,
variant: e.orderTemplate,
price: e.amount,
quantity: 1
}), window.ga("ec:setAction", "checkout", {
step: 1,
option: e.paymentMethod
}), window.ga("send", "event", {
eventCategory: this.orderForm.product,
eventAction: "checkout-payment"
});
let n = this.startRequestIndication();
t.addEventListener("success", (o => {
if (403 == t.status) return new r.Error(a("payments.client.error_start_again", {
message: o.result.description || o.result.message || "",
email: s.ordersMail
})), void n();
if (400 == t.status) return new r.Error(a("payments.client.maybe_purchase_error", {
message: o.result.message || o.result.description || "",
email: s.ordersMail
})), void n();
let i = o.result;
if (i.form) if (window.ga("ec:setAction", "purchase", {
id: i.orderNumber
}), "stripe" === e.paymentMethod) {
let e = i.form.sessionId;
new window.Stripe(s.stripeKey).redirectToCheckout({
sessionId: e
}).then((function(e) {
e.error && (n(), new r.Error(e.error.message));
}));
} else {
let e = document.createElement("div");
e.hidden = !0, e.innerHTML = i.form, document.body.appendChild(e), e.firstChild.submit();
} else n(), new r.Error(a("payments.client.purchase_error", {
email: s.ordersMail
}));
})), t.addEventListener("fail", n);
}
};
}, function(e, t) {
function n(e) {
if (e = e || {}, this.elem = e.elem, this.size = e.size || "medium", this.class = e.class ? " " + e.class : "", 
this.elemClass = e.elemClass, "medium" != this.size && "small" != this.size && "large" != this.size) throw new Error("Unsupported size: " + this.size);
this.elem || (this.elem = document.createElement("div"));
}
n.prototype.start = function() {
this.elemClass && this.elem.classList.toggle(this.elemClass), this.elem.insertAdjacentHTML("beforeend", '<span class="spinner spinner_active spinner_' + this.size + this.class + '"><span class="spinner__dot spinner__dot_1"></span><span class="spinner__dot spinner__dot_2"></span><span class="spinner__dot spinner__dot_3"></span></span>');
}, n.prototype.stop = function() {
let e = this.elem.querySelector(".spinner");
e && (e.remove(), this.elemClass && this.elem.classList.toggle(this.elemClass));
}, window.Spinner = n, e.exports = n;
}, function(e, t, n) {
var r = {
"./en.yml": 21
};
function o(e) {
var t = i(e);
return n(t);
}
function i(e) {
var t = r[e];
if (!(t + 1)) {
var n = new Error("Cannot find module '" + e + "'");
throw n.code = "MODULE_NOT_FOUND", n;
}
return t;
}
o.keys = function() {
return Object.keys(r);
}, o.resolve = i, e.exports = o, o.id = 20;
}, function(e, t) {
e.exports = {
client: {
choose_payment_method: "Select the payment method, please",
specify_company_name: "Specify company name",
error_start_again: "<p>#{message}</p><p>Please try purchase again.</p> <p>If you think that there is an error on server - contact with <a href='mailto:#{email}'> customer service</a>.</p>\n",
maybe_purchase_error: "<p>#{message}</p><p>If you think an error has occurred &mdash; please contact with <a href='mailto:#{email}'>customer service</a>.</p>\n",
purchase_error: "An error has occurred, please contact with <a href='mailto:#{email}'>customer service</a>.\n"
},
currency: "USD",
payment_for: "Payment for",
payment: "Payment",
pay: "Pay",
payment_received: "Payment received",
payment_processing: "Pending processing",
payment_received_processing: "Payment received, processing",
payment_error: "An error occured",
payment_error_accent: "An error has occured during payment processing.",
payment_failed: "Payment failed",
payment_failed_try_again: "Payment failed, please try again",
payment_success_description: "<p>We'll send you an email to <b>#{orderEmail}</b>.</p><p>If you have any questions, please send them to #{mailLink}.</p>",
order_canceled: "Order canceled",
contact_payment: "<p>Please send all questions regarding payment to #{mailLink}.</p>",
contact_order: "<p>Please send all questions regarding the order to #{mailLink}.</p>",
thanks: "Thanks for the order!",
contact_support: "<p>Please, contact support at #{mailLink}.</p>",
payment_usd: "payment in US Dollars",
profile_order_link: "<p>Order information is available <a href='#{link}'>in your profile</a>.</p>"
};
}, function(e, t, n) {
var r = {
"./en.yml": 23
};
function o(e) {
var t = i(e);
return n(t);
}
function i(e) {
var t = r[e];
if (!(t + 1)) {
var n = new Error("Cannot find module '" + e + "'");
throw n.code = "MODULE_NOT_FOUND", n;
}
return t;
}
o.keys = function() {
return Object.keys(r);
}, o.resolve = i, e.exports = o, o.id = 22;
}, function(e, t) {
e.exports = {
build_at: "Built at",
last_version: 'The last version of the tutorial is at <a href="#{url}">#{url}</a>',
tracker_ref: 'We constantly work to improve the tutorial. If you find any mistakes, please write at <a href="#{url}/issues/new">our github</a>',
tasks: "Tasks",
importance: "importance",
to_solution: "To solution",
solutions: "Solutions",
to_formulation: "To formulation",
more: "Additional series",
newOrder: {
title: "Buy EPUB/PDF for offline reading",
sample: "Download sample",
choose_course: "Which parts of the tutorial you want?",
price: "Price",
specifyEmail: "Specify your email",
note: "The download link will be sent to this address after payment.",
choose_payment: "Select the payment method, please",
continue: "Continue",
continue_text: 'By pressing the button \'Continue\' you agree to our <a href="/terms">terms</a> and <a href="/privacy">privacy policy</a>.',
confirmation: "Confirmation",
currency: "USD",
continue_with_paypal: "Pay with PayPal",
continue_with_stripe: "Pay via Stripe",
continue_pay: "Proceed with payment",
info: "<p><strong>PDF/EPUB</strong> book is an offline version of the tutorial. Buying this book, you support the project and become able to read the tutorial as e-book.</p> <p>You get the whole content as of now, plus 1 year of free updates.</p>\n"
},
orders: {
order: "Order",
failed: "Payment failed, please try again later.",
currency: "$",
payment: "Payment",
successful: "Successful",
pending: "Confirmation pending",
amount: "Price",
choose_another_payment: "Choose another payment method",
do_not_pay_twice: "Do not pay twice. Change payment method only if you are sure that payment failed.",
questions: "If you have any questions please send them to",
thanks: "Payment successful, thanks for your purchase!",
download: "Download ebook",
confirmation_soon: "The confirmation was sent to <b>#{email}</b>",
download_now: "You can download the tutorial right now using this link:",
link_active_3_months: "The link will be active for 1 year, with the latest tutorial build."
},
client: {
enter_email: "Enter email."
},
onPaid: {
subject: "JavaScript Tutorial EPUB/PDF"
}
};
}, function(e, t, n) {} ]);
//# sourceMappingURL=ebook.c864705a8092ee1dca9e.js.map