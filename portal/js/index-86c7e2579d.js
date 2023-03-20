function doWhenReady(e) {
  function t() {
    document.removeEventListener("DOMContentLoaded", t),
      window.removeEventListener("load", t),
      e(),
      (e = function () {});
  }
  "complete" === document.readyState
    ? e()
    : (document.addEventListener("DOMContentLoaded", t),
      window.addEventListener("load", t));
}
function getIso639(e) {
  e = e && e.match(/^\w+/);
  if (e && !(3 < (e = "nb" === e[0] ? "no" : e[0]).length)) return e;
}
function getDevicePixelRatio() {
  return void 0 !== window.devicePixelRatio
    ? window.devicePixelRatio
    : void 0 !== window.msMatchMedia
    ? window.msMatchMedia("(min-resolution: 192dpi)").matches
      ? 2
      : window.msMatchMedia("(min-resolution: 144dpi)").matches
      ? 1.5
      : 1
    : 1;
}
window.Element &&
  !Element.prototype.matches &&
  (Element.prototype.matches = function (e) {
    for (
      var t,
        n = (t = (this.document || this.ownerDocument).querySelectorAll(e))
          .length;
      0 <= --n && t.item(n) !== this;

    );
    return -1 < n;
  }),
  (window.attachedEvents = []),
  Element.prototype.matches ||
    (Element.prototype.matches =
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector),
  Element.prototype.closest ||
    (Element.prototype.closest = function (e) {
      var t = this;
      do {
        if (Element.prototype.matches.call(t, e)) return t;
      } while (
        null !== (t = t.parentElement || t.parentNode) &&
        1 === t.nodeType
      );
      return null;
    });
var _ = _ || {},
  mw =
    ((_.now =
      Date.now ||
      function () {
        return new Date().getTime();
      }),
    (_.throttle = function (n, a, r) {
      function o() {
        (u = !1 === r.leading ? 0 : _.now()),
          (c = null),
          (l = n.apply(i, s)),
          c || (i = s = null);
      }
      var i,
        s,
        l,
        c = null,
        u = 0;
      r = r || {};
      return function () {
        var e = _.now(),
          t = (u || !1 !== r.leading || (u = e), a - (e - u));
        return (
          (i = this),
          (s = arguments),
          t <= 0 || a < t
            ? (c && (clearTimeout(c), (c = null)),
              (u = e),
              (l = n.apply(i, s)),
              c || (i = s = null))
            : c || !1 === r.trailing || (c = setTimeout(o, t)),
          l
        );
      };
    }),
    (_.debounce = function (t, n, a) {
      function r() {
        var e = _.now() - l;
        e < n && 0 <= e
          ? (o = setTimeout(r, n - e))
          : ((o = null), a || ((c = t.apply(s, i)), o || (s = i = null)));
      }
      var o, i, s, l, c;
      return function () {
        (s = this), (i = arguments), (l = _.now());
        var e = a && !o;
        return (
          (o = o || setTimeout(r, n)),
          e && ((c = t.apply(s, i)), (s = i = null)),
          c
        );
      };
    }),
    mw || {});
(mw.html = (function () {
  function t(e) {
    switch (e) {
      case "'":
        return "&#039;";
      case '"':
        return "&quot;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
    }
  }
  return {
    escape: function (e) {
      return e.replace(/['"<>&]/g, t);
    },
    element: function (e, t, n) {
      var a,
        r,
        o = "<" + e;
      for (r in t) {
        if (!0 === (a = t[r])) a = r;
        else if (!1 === a) continue;
        o += " " + r + '="' + this.escape(String(a)) + '"';
      }
      if (null == n) return (o += "/>");
      switch (((o += ">"), typeof n)) {
        case "string":
          o += this.escape(n);
          break;
        case "number":
        case "boolean":
          o += String(n);
          break;
        default:
          if (n instanceof this.Raw) o += n.value;
          else {
            if (!(n instanceof this.Cdata))
              throw new Error("mw.html.element: Invalid type of contents");
            if (/<\/[a-zA-z]/.test(n.value))
              throw new Error(
                "mw.html.element: Illegal end tag found in CDATA"
              );
            o += n.value;
          }
      }
      return (o += "</" + e + ">");
    },
    Raw: function (e) {
      this.value = e;
    },
    Cdata: function (e) {
      this.value = e;
    },
  };
})()),
  (mw.storage = {
    localStorage: (function () {
      try {
        return window.localStorage;
      } catch (e) {}
    })(),
    get: function (e) {
      try {
        return mw.storage.localStorage.getItem(e);
      } catch (e) {}
      return !1;
    },
    set: function (e, t) {
      try {
        return mw.storage.localStorage.setItem(e, t), !0;
      } catch (e) {}
      return !1;
    },
    remove: function (e) {
      try {
        return mw.storage.localStorage.removeItem(e), !0;
      } catch (e) {}
      return !1;
    },
  }),
  (mw.RegExp = {
    escape: function (e) {
      return e.replace(/([\\{}()|.?*+\-^$[\]])/g, "\\$1");
    },
  }),
  (function (r, o, l, i, s, c) {
    "use strict";
    function u(e) {
      var t,
        n,
        s = this,
        a = e.length,
        r = 0,
        o = (s.i = s.j = s.m = 0);
      for (s.S = [], s.c = [], a || (e = [a++]); r < l; ) s.S[r] = r++;
      for (r = 0; r < l; r++)
        (o = g(o + (t = s.S[r]) + e[r % a])),
          (n = s.S[o]),
          (s.S[r] = n),
          (s.S[o] = t);
      (s.g = function (e) {
        for (
          var t = s.S,
            n = g(s.i + 1),
            a = t[n],
            r = g(s.j + a),
            o = t[r],
            i = ((t[n] = o), (t[r] = a), t[g(a + o)]);
          --e;

        )
          (n = g(n + 1)),
            (o = t[(r = g(r + (a = t[n])))]),
            (t[n] = o),
            (t[r] = a),
            (i = i * l + t[g(a + o)]);
        return (s.i = n), (s.j = r), i;
      }),
        s.g(l);
    }
    function d(e, t, n, a) {
      for (e += "", a = n = 0; a < e.length; a++)
        t[g(a)] = g((n ^= 19 * t[g(a)]) + e.charCodeAt(a));
      for (a in ((e = ""), t)) e += String.fromCharCode(t[a]);
      return e;
    }
    function g(e) {
      return e & (l - 1);
    }
    (o.seedrandom = function (e, t) {
      var a,
        n = [];
      return (
        (e = d(
          (function e(t, n, a, r, o) {
            a = [];
            o = typeof t;
            if (n && "object" == o)
              for (r in t)
                if (r.indexOf("S") < 5)
                  try {
                    a.push(e(t[r], n - 1));
                  } catch (e) {}
            return a.length ? a : t + ("string" != o ? "\0" : "");
          })(
            t
              ? [e, r]
              : arguments.length
              ? e
              : [new Date().getTime(), r, window],
            3
          ),
          n
        )),
        d((a = new u(n)).S, r),
        (o.seededrandom = function () {
          for (var e = a.g(6), t = c, n = 0; e < i; )
            (e = (e + n) * l), (t *= l), (n = a.g(1));
          for (; s <= e; ) (e /= 2), (t /= 2), (n >>>= 1);
          return (e + n) / t;
        }),
        e
      );
    }),
      (c = o.pow(l, 6)),
      (i = o.pow(2, i)),
      (s = 2 * i),
      d(o.random(), r);
  })([], Math, 256, 52),
  (function () {
    "use strict";
    for (
      var o,
        n = "https://intake-analytics.wikimedia.org/v1/events",
        e = [],
        a = {
          extend: function (e, t) {
            var n,
              a = {};
            for (n in e)
              Object.prototype.hasOwnProperty.call(e, n) &&
                e[n] &&
                (a[n] = e[n]);
            for (n in t)
              Object.prototype.hasOwnProperty.call(t, n) &&
                t[n] &&
                (a[n] = t[n]);
            return a;
          },
          noop: function () {},
        },
        t = 0;
      t < 256;
      t++
    )
      e[t] = (t + 256).toString(16).slice(1);
    o = window.eventLoggingLite = {
      schema: {},
      maxUrlSize: 2e3,
      byteToHex: e,
      generateRandomSessionId: function () {
        var e,
          t,
          n,
          a = new Array(8),
          r = window.crypto || window.msCrypto;
        if (r && r.getRandomValues)
          (e = new Uint8Array(8)), r.getRandomValues(e);
        else
          for (e = new Array(8), t = 0; t < 8; t++)
            0 == (3 & t) && (n = 4294967296 * Math.random()),
              (e[t] = (n >>> ((3 & t) << 3)) & 255);
        for (t = 0; t < 8; t++) a[t] = o.byteToHex[e[t]];
        return a.join("");
      },
      validate: function (e, t) {
        var n,
          a,
          r,
          o = [];
        if (!t || !t.properties) return o.push("Missing or empty schema"), o;
        for (n in e)
          t.properties.hasOwnProperty(n) || o.push("Undeclared property: " + n);
        for (n in t.properties)
          (r = t.properties[n]),
            e.hasOwnProperty(n)
              ? ((a = e[n]),
                r.enum &&
                  r.required &&
                  -1 === r.enum.indexOf(a) &&
                  o.push(
                    'Value "' +
                      JSON.stringify(a) +
                      '" for property "' +
                      n +
                      '" is not one of ' +
                      JSON.stringify(r.enum)
                  ))
              : r.required && o.push("Missing property:", n);
        return o;
      },
      prepare: function (e, t) {
        for (var t = a.extend(e.defaults, t), n = o.validate(t, e); n.length; )
          console.log(n[n.length - 1]), n.pop();
        return {
          event: t,
          revision: e.revision || -1,
          schema: e.name,
          $schema: "/analytics/legacy/" + e.name.toLowerCase() + "/1.0.0",
          client_dt: new Date().toISOString(),
          webHost: location.hostname,
          wiki: "metawiki",
          meta: { stream: "eventlogging_" + e.name, domain: location.hostname },
        };
      },
      sendBeacon:
        /1|yes/.test(navigator.doNotTrack) || !navigator.sendBeacon
          ? a.noop
          : function (e, t) {
              navigator.sendBeacon(e, JSON.stringify(t));
            },
      logEvent: function (e, t) {
        e = o.prepare(e, t);
        o.sendBeacon(n, e);
      },
    };
  })(),
  (window.wmTest = (function (e, t) {
    var n,
      a,
      r,
      o,
      i,
      s,
      l,
      c = {
        popSize: /www.wikipedia.org/.test(location.hostname) ? 200 : 2,
        testGroups: !1,
        sessionLength: 9e5,
      },
      u = "portal_session_id",
      d = "portal_test_group_expires";
    function g(e) {
      return 1 === Math.floor(Math.seededrandom() * e + 1);
    }
    function m() {
      var e = "rejected";
      return (
        g(c.popSize) &&
          ((e = "baseline"),
          c.testGroups &&
            c.testGroups.test &&
            g(10) &&
            (e = g(2) ? c.testGroups.test : c.testGroups.control)),
        e
      );
    }
    return (
      (n = (function () {
        var e,
          t,
          n = [];
        function a(e) {
          e = getIso639(e);
          e && n.indexOf(e) < 0 && n.push(e);
        }
        for (t in navigator.languages) a(navigator.languages[t]);
        return (
          /Android/i.test(navigator.userAgent) &&
            (e = navigator.userAgent.split(";"))[3] &&
            a(e[3].trim()),
          a(navigator.language),
          a(navigator.userLanguage),
          a(navigator.browserLanguage),
          a(navigator.systemLanguage),
          n
        );
      })()),
      (r = location.hash.slice(1) === c.testGroups.test),
      (l = !1),
      t.storage.localStorage &&
        !/1|yes/.test(navigator.doNotTrack) &&
        ((o = t.storage.get(u)),
        (i = t.storage.get(d)),
        (s = Date.now()),
        o && i > parseInt(s, 10)
          ? (l = o)
          : ((l = e.generateRandomSessionId()), t.storage.set(u, l)),
        t.storage.set(d, s + c.sessionLength)),
      (i = l)
        ? (Math.seedrandom(i), (a = r ? c.testGroups.test : m()))
        : ((a = "rejected"), (r = !0)),
      c.testGroups &&
        a === c.testGroups.test &&
        (document.body.className += " " + a),
      {
        loggingDisabled: r,
        sessionId: i,
        userLangs: n,
        group: a,
        testGroups: c.testGroups,
        populationSize: c.popSize,
        getTestGroup: m,
      }
    );
  })(eventLoggingLite, mw)),
  (function (t, e) {
    "use strict";
    var n,
      o,
      a,
      r,
      i,
      s = document.cookie.match(/GeoIP=.[^:]/),
      l = document.cookie.match(/GeoIP=.[^:].{2}[^:]/);
    if ("rejected" !== e.group && !e.loggingDisabled) {
      for (
        n = {
          name: "WikipediaPortal",
          revision: 15890769,
          defaults: {
            session_id: e.sessionId,
            event_type: "landing",
            referer: document.referrer || null,
            accept_language: e.userLangs.toString(),
            cohort: e.group,
          },
          properties: {
            session_id: { type: "string", required: !0 },
            event_type: {
              type: "string",
              required: !0,
              enum: ["landing", "clickthrough", "select-language"],
            },
            section_used: {
              type: "string",
              required: !1,
              enum: [
                "primary links",
                "search",
                "language search",
                "secondary links",
                "other languages",
                "other projects",
              ],
            },
            destination: { type: "string", required: !1 },
            referer: { type: "string", required: !1 },
            country: { type: "string", required: !1 },
            accept_language: { type: "string", required: !0 },
            cohort: { type: "string", required: !1 },
            selected_language: { type: "string", required: !1 },
          },
        },
          o = [
            {
              name: "primary links",
              nodes: document.querySelectorAll(
                '[data-el-section="primary links"]'
              ),
            },
            {
              name: "search",
              nodes: document.querySelectorAll('[data-el-section="search"]'),
            },
            {
              name: "language search",
              nodes: document.querySelectorAll(
                '[data-el-section="language search"]'
              ),
            },
            {
              name: "secondary links",
              nodes: document.querySelectorAll(
                '[data-el-section="secondary links"]'
              ),
            },
            {
              name: "other languages",
              nodes: document.querySelectorAll(
                '[data-el-section="other languages"]'
              ),
            },
            {
              name: "other projects",
              nodes: document.querySelectorAll(
                '[data-el-section="other projects"]'
              ),
            },
          ],
          document.addEventListener("click", function (e) {
            (e = (e = e || window.event).target || e.srcElement).matches(
              "a, a *"
            ) &&
              ((e = (function e(t) {
                return "A" !== t.tagName && t.parentElement
                  ? e(t.parentElement)
                  : t;
              })(e)),
              "search" ===
                (r = {
                  event_type: "clickthrough",
                  destination: e.href,
                  section_used: c(e),
                }).section_used &&
                (r.selected_language =
                  document.getElementById("searchLanguage").options[
                    document.getElementById("searchLanguage").selectedIndex
                  ].lang),
              r.section_used && t.logEvent(n, r));
          }),
          document.addEventListener("change", function (e) {
            "searchLanguage" ===
              (e = (e = e || window.event).target || e.srcElement).id &&
              -1 !== e.selectedIndex &&
              (r = {
                event_type: "select-language",
                selected_language: e.options[e.selectedIndex].lang,
              }).selected_language &&
              t.logEvent(n, r);
          }),
          a = document.getElementsByTagName("form"),
          i = 0;
        i < a.length;
        i++
      )
        a[i].addEventListener("submit", d);
      s &&
        ((e = s.toString().split("=")[1]),
        (n.defaults.country = "US" === e && l ? l.toString().split("=")[1] : e),
        window.addEventListener("load", u)),
        window.addEventListener("load", u);
    }
    function c(e) {
      for (var t, n, a = {}, r = 0; r < o.length; r++)
        for (n = o[r].nodes, t = 0; t < n.length; t++)
          n[t].contains(e) && (a = o[r]);
      return a.name;
    }
    function u() {
      (r = { event_type: "landing" }), t.logEvent(n, r), (r = null);
    }
    function d(e) {
      (e = e || window.event), (e = e.target || e.srcElement);
      "search" ===
        (r =
          null === r
            ? {
                event_type: "clickthrough",
                section_used: c(e),
                destination: e.action,
              }
            : r).section_used &&
        (r.selected_language =
          document.getElementById("searchLanguage").options[
            document.getElementById("searchLanguage").selectedIndex
          ].lang),
        r.section_used && t.logEvent(n, r);
    }
  })(eventLoggingLite, wmTest),
  (window.WMTypeAhead = function (e, t) {
    var m,
      h,
      c,
      o,
      u,
      n = "typeahead-suggestions",
      d = document.getElementById(n),
      e = document.getElementById(e),
      g = document.getElementById(t),
      i = Math.round(60 * getDevicePixelRatio());
    function s() {
      setTimeout(function () {
        var e = document.getElementById("api_opensearch");
        (d.innerHTML = ""), e && (e.src = !1), u.clear();
      }, 300);
    }
    function p(e) {
      for (
        var t,
          n,
          a,
          r,
          o,
          i,
          s,
          l = '<div class="suggestions-dropdown">',
          c = !1,
          u = "",
          d = "",
          g = 0;
        g < e.length;
        g++
      )
        e[g] &&
          ((d = (n = e[g]).description || ""),
          (c = !1),
          n.thumbnail &&
            n.thumbnail.source &&
            (c = (c = n.thumbnail.source.replace(/"/g, "%22")).replace(
              /'/g,
              "%27"
            )),
          (u = ""),
          d && (u = ("object" == typeof d && d[0] ? d[0] : d).toString()),
          (t = mw.html.element("p", { class: "suggestion-description" }, u)),
          (a = mw.html.element(
            "h3",
            { class: "suggestion-title" },
            new mw.html.Raw(
              ((a = n.title),
              (r = h),
              (s = i = o = void 0),
              (r = mw.html.escape(mw.RegExp.escape(r))),
              (i = new RegExp(r, "i")),
              (i = a.search(i)),
              (s = mw.html.escape(a)),
              0 <= i &&
                ((r = i + r.length),
                (o = a.slice(i, r)),
                (i = a.slice(0, Math.max(0, i))),
                (r = a.slice(r, a.length)),
                (s =
                  i +
                  mw.html.element("em", { class: "suggestion-highlight" }, o) +
                  r)),
              s)
            )
          )),
          (i = mw.html.element(
            "div",
            { class: "suggestion-text" },
            new mw.html.Raw(a + t)
          )),
          (o = mw.html.element(
            "div",
            {
              class: "suggestion-thumbnail",
              style: !!c && "background-image:url(" + c + ")",
            },
            ""
          )),
          (l += mw.html.element(
            "a",
            {
              class: "suggestion-link",
              href:
                "https://" +
                m +
                "." +
                portalSearchDomain +
                "/wiki/" +
                encodeURIComponent(n.title.replace(/ /gi, "_")),
            },
            new mw.html.Raw(i + o)
          )));
      return (l += "</div>");
    }
    function f(e, t) {
      for (var n, a = " active", r = 0; r < t.length; r++)
        (n = t[r]) !== e
          ? (n.className = n.className.replace(a, ""))
          : / active/.test(e.className)
          ? (e.className = e.className.replace(a, ""))
          : ((e.className += a), u.setIndex(r));
    }
    return (
      d || (((d = document.createElement("div")).id = n), e.appendChild(d)),
      (window.callbackStack = {
        queue: {},
        index: -1,
        incrementIndex: function () {
          return (this.index += 1), this.index;
        },
        addCallback: function (e) {
          var t = this.incrementIndex();
          return (this.queue[t] = e(t)), t;
        },
        deleteSelfFromQueue: function (e) {
          delete this.queue[e];
        },
        deletePrevCallbacks: function (e) {
          for (var t in (this.deleteSelfFromQueue(e), this.queue))
            t < e &&
              (this.queue[t] = this.deleteSelfFromQueue.bind(
                window.callbackStack,
                t
              ));
        },
      }),
      (u = {
        index: -1,
        max: 6,
        setMax: function (e) {
          this.max = e;
        },
        increment: function (e) {
          return (
            (this.index += e),
            this.index < 0 && this.setIndex(this.max - 1),
            this.index === this.max && this.setIndex(0),
            this.index
          );
        },
        setIndex: function (e) {
          return e <= this.max - 1 && (this.index = e), this.index;
        },
        clear: function () {
          this.setIndex(-1);
        },
      }),
      (window.portalOpensearchCallback = function (t) {
        var n,
          a,
          r,
          o,
          i,
          s = t,
          l = [];
        return function (e) {
          if (
            (window.callbackStack.deletePrevCallbacks(s),
            document.activeElement === g)
          ) {
            for (a in (n = e.query && e.query.pages ? e.query.pages : []))
              (r = n[a]), (l[r.index - 1] = r);
            for (
              o = p(l),
                u.setMax(l.length),
                u.clear(),
                d.innerHTML = o,
                c = d.childNodes[0].childNodes,
                t = 0;
              t < c.length;
              t++
            )
              (i = c[t]).addEventListener("mouseenter", f.bind(this, i, c)),
                i.addEventListener("mouseleave", f.bind(this, i, c));
          }
        };
      }),
      g.addEventListener("keydown", function (e) {
        var t,
          n,
          a,
          r = (e = e || window.event).which || e.keyCode;
        d.firstChild &&
          ((40 !== r && 38 !== r) ||
            ((n = (t = d.firstChild.childNodes)[
              (a = 40 === r ? u.increment(1) : u.increment(-1))
            ].firstChild.childNodes[0]),
            (g.value = n.textContent),
            f((o = !!t && t[a]), t)),
          13 === r &&
            o &&
            (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
            o.children[0].click()));
      }),
      window.addEventListener("click", function (e) {
        e.target.closest("#search-form") || s();
      }),
      {
        typeAheadEl: d,
        query: function (e, t) {
          var n,
            a = document.getElementById("api_opensearch"),
            r = document.getElementsByTagName("head")[0];
          (m = encodeURIComponent(t) || "en"),
            0 === (h = encodeURIComponent(e)).length
              ? s()
              : ((t = "//" + m + "." + portalSearchDomain + "/w/api.php?"),
                a && r.removeChild(a),
                ((a = document.createElement("script")).id = "api_opensearch"),
                (n = window.callbackStack.addCallback(
                  window.portalOpensearchCallback
                )),
                (a.src =
                  t +
                  (function (e) {
                    var t,
                      n = [];
                    for (t in e)
                      e.hasOwnProperty(t) &&
                        n.push(t + "=" + encodeURIComponent(e[t]));
                    return n.join("&");
                  })({
                    action: "query",
                    format: "json",
                    generator: "prefixsearch",
                    prop: "pageprops|pageimages|description",
                    redirects: "",
                    ppprop: "displaytitle",
                    piprop: "thumbnail",
                    pithumbsize: i,
                    pilimit: 6,
                    gpssearch: e,
                    gpsnamespace: 0,
                    gpslimit: 6,
                    callback: "callbackStack.queue[" + n + "]",
                  })),
                r.appendChild(a));
        },
      }
    );
  }),
  (function (e) {
    var t = document.getElementById("searchInput"),
      n = new e("search-input", "searchInput"),
      e = "oninput" in document ? "input" : "propertychange";
    t.addEventListener(
      "focus",
      _.debounce(function () {
        n.query(t.value, document.getElementById("searchLanguage").value);
      }, 100)
    ),
      t.addEventListener(
        e,
        _.debounce(function () {
          n.query(t.value, document.getElementById("searchLanguage").value);
        }, 100)
      );
  })((wmTest, WMTypeAhead)),
  (function (s) {
    var o,
      l,
      e = wmTest.userLangs,
      i = document.querySelectorAll(".central-featured-lang"),
      t = document.querySelector(".central-featured"),
      n = s.storage.get("translationHash");
    function c(e) {
      var t;
      try {
        t = JSON.parse(e);
      } catch (e) {
        t = "";
      }
      return t;
    }
    function u(e, t) {
      var n = e.getElementsByTagName("a")[0],
        a = t.name.replace(/<\/?[^>]+(>|$)/g, "");
      n.setAttribute("href", "//" + t.url),
        n.setAttribute("id", "js-link-box-" + t.lang),
        n.setAttribute("data-slogan", t.slogan || "The Free Encyclopedia"),
        n.setAttribute(
          "title",
          a + " — " + t.siteName + " — " + (t.slogan || "")
        ),
        e.setAttribute("lang", t.lang),
        (e.getElementsByTagName("strong")[0].textContent = a),
        (e.getElementsByTagName("bdi")[0].textContent = t.numPages + "+"),
        (e.getElementsByTagName("span")[0].textContent = t.entries || "");
    }
    function d() {
      var e,
        t,
        n,
        a,
        r = !0;
      for (
        i = document.querySelectorAll(".central-featured-lang"), a = 0;
        a < i.length && !0 === r;
        a++
      )
        (t = i[a].getAttribute("lang")), (r = 0 <= o.indexOf(t));
      for (a = 0; a < i.length; a++)
        r &&
          (e = i[a]).className !==
            (n = "central-featured-lang lang" + (a + 1)) &&
          (e.className = n);
    }
    function a(e, t) {
      var n,
        a,
        r,
        o,
        i = l;
      i[t]
        ? u(e, i[t])
        : ((n = e),
          (a = t),
          (o = new XMLHttpRequest()).open(
            "GET",
            encodeURI(
              "portal/wikipedia.org/assets/l10n/" +
                a +
                "-" +
                translationsHash +
                ".json"
            ),
            !0
          ),
          (o.onload = function () {
            200 === o.status &&
              (r = c(this.responseText)) &&
              (u(n, r),
              d(),
              ((l = c(s.storage.get("storedTranslations")) || {})[a] = r),
              s.storage.set("storedTranslations", JSON.stringify(l)));
          }),
          o.send());
    }
    if (
      ((l = c(s.storage.get("storedTranslations")) || {}),
      (o = Array.prototype.map.call(i, function (e) {
        return e.getAttribute("lang");
      })),
      n !== translationsHash &&
        (s.storage.set("translationHash", translationsHash),
        s.storage.remove("storedTranslations")),
      !wmL10nVisible.ready)
    ) {
      for (var r, g, m = 0; m < e.length; m++)
        (r = e[m]),
          0 <= (g = o.indexOf(r))
            ? g === m || o.splice(m, 0, o.splice(g, 1)[0])
            : (o.splice(m, 0, r), o.pop());
      for (var h, p, f, w = 0; w < o.length; w++)
        (i = document.querySelectorAll(".central-featured-lang")),
          (h = o[w]),
          (p = document.querySelector(".central-featured-lang[lang=" + h + "]"))
            ? Array.prototype.indexOf.call(i, p) !== w &&
              t.insertBefore(p, i[w])
            : (a(
                (f = (function () {
                  for (
                    var e, t = null, n = o.length - 1;
                    0 <= n && null === t;
                    n--
                  )
                    (e = i[n].getAttribute("lang")),
                      o.indexOf(e) < 0 && (t = i[n]);
                  return t;
                })()),
                h
              ),
              t.insertBefore(f, i[w])),
          (p || f).setAttribute(
            "dir",
            0 <= rtlLangs.indexOf(h) ? "rtl" : "ltr"
          );
      d();
    }
  })(mw),
  (function () {
    "use strict";
    function c(e) {
      return document.getElementById(e);
    }
    function u(e) {
      document.querySelector &&
        "www-wiktionary-org" === document.body.id &&
        !e.match(/\W/) &&
        (e =
          (e = document.querySelector('option[lang|="' + e + '"]')) &&
          e.getAttribute("data-logo")) &&
        document.body.setAttribute("data-logo", e);
    }
    function d() {
      return (
        (navigator.languages && navigator.languages[0]) ||
        navigator.language ||
        navigator.userLanguage ||
        ""
      )
        .toLowerCase()
        .split("-")[0];
    }
    doWhenReady(function () {
      var e,
        t,
        n,
        a,
        r,
        o,
        i,
        s,
        l = (
          (l = document.cookie.match(/(?:^|\W)searchLang=([^;]+)/)) ? l[1] : d()
        ).toLowerCase();
      if (l && ((e = getIso639(l)), (l = c("searchLanguage")))) {
        for (
          n = 0, a = (t = l.getElementsByTagName("option")).length;
          !r && n < a;
          n += 1
        )
          t[n].value === e && (r = e);
        !r &&
          document.querySelector &&
          (o = document.querySelector('.langlist a[lang|="' + e + '"]')) &&
          ((r = e),
          (i = document.createElement("option")).setAttribute("lang", e),
          i.setAttribute("value", e),
          (o = o.textContent || o.innerText || e),
          (i.textContent = o),
          l.appendChild(i)),
          r &&
            (u((l.value = r)),
            (o = r),
            (i = document.createElement("link")),
            (s = (l = window.location.hostname.split(".")).pop()),
            (l = l.pop()),
            (i.rel = "preconnect"),
            (i.href = "//" + o + "." + l + "." + s),
            document.head.appendChild(i));
      }
    }),
      doWhenReady(function () {
        var e,
          t,
          n,
          a = c("searchInput"),
          r = c("searchLanguage");
        if (a)
          for (
            void 0 === a.autofocus ? a.focus() : window.scroll(0, 0),
              e = location.search && location.search.slice(1).split("&"),
              t = 0;
            t < e.length;
            t += 1
          )
            if ("search" === (n = e[t].split("="))[0] && n[1]) {
              a.value = decodeURIComponent(n[1].replace(/\+/g, " "));
              break;
            }
        r.addEventListener("change", function () {
          var e, t, n;
          r.blur(),
            (e = r.value) &&
              ((t = d().match(/^\w+/)),
              (n = new Date()),
              u(e),
              t && t[0] === e
                ? n.setTime(n.getTime() - 1)
                : n.setFullYear(n.getFullYear() + 1),
              (document.cookie =
                "searchLang=" +
                e +
                ";expires=" +
                n.toUTCString() +
                ";domain=" +
                location.host +
                ";"));
        });
      }),
      doWhenReady(function () {
        var e = document.searchwiki && document.searchwiki.elements.uselang;
        e && (e.value = d());
      }),
      doWhenReady(function () {
        var e,
          t,
          n,
          a,
          r = getDevicePixelRatio(),
          o = new Image();
        if (1 < r && void 0 === o.srcset)
          for (
            e = document.getElementsByTagName("img"), a = 0;
            a < e.length;
            a++
          )
            "string" == typeof (n = (t = e[a]).getAttribute("srcset")) &&
              "" !== n &&
              void 0 !==
                (n = (function (e, t) {
                  for (
                    var n, a, r = { ratio: 1 }, o = t.split(/ *, */), i = 0;
                    i < o.length;
                    i++
                  )
                    (a =
                      (n = o[i].match(
                        /\s*(\S+)(?:\s*([\d.]+)w)?(?:\s*([\d.]+)h)?(?:\s*([\d.]+)x)?\s*/
                      ))[4] && parseFloat(n[4])) <= e &&
                      a > r.ratio &&
                      ((r.ratio = a),
                      (r.src = n[1]),
                      (r.width = n[2] && parseFloat(n[2])),
                      (r.height = n[3] && parseFloat(n[3])));
                  return r;
                })(r, n)).src &&
              (t.setAttribute("src", n.src),
              void 0 !== n.width && t.setAttribute("width", n.width),
              void 0 !== n.height && t.setAttribute("height", n.height));
      });
  })(),
  window.mw ||
    (window.mw = window.mediaWiki = { loader: { state: function () {} } }),
  (function () {
    var e = document.getElementById("js-lang-list-button");
    function t() {
      / lang-list-active /g.test(document.body.className)
        ? ((document.body.className = document.body.className.replace(
            " lang-list-active ",
            ""
          )),
          mw.storage.set("lang-list-active", "false"))
        : ((document.body.className += " lang-list-active "),
          mw.storage.set("lang-list-active", "true"));
    }
    ("true" !== mw.storage.get("lang-list-active") &&
      !(function (e) {
        for (
          var t, n = document.getElementsByTagName("a"), a = !0, r = 0;
          r < n.length && a;
          r++
        )
          (t = n[r].getAttribute("lang")) && 0 <= e.indexOf(t) && (a = !1);
        return a;
      })(wmTest.userLangs)) ||
      t(),
      e.addEventListener("click", function () {
        t();
      });
  })(),
  (function (e, t, a, n) {
    var r,
      o,
      i = e.userLangs[0];
    function s(e) {
      var t;
      try {
        t = JSON.parse(e);
      } catch (e) {
        t = "";
      }
      return t;
    }
    function c(e) {
      if (
        -1 !==
        [
          "zh",
          "zh-hans",
          "zh-cn",
          "zh-sg",
          "zh-my",
          "zh-hans-cn",
          "zh-hans-sg",
          "zh-hans-my",
        ].indexOf(e)
      )
        return !0;
      if (
        [
          "zh-hk",
          "zh-tw",
          "zh-mo",
          "zh-hant-hk",
          "zh-hant-tw",
          "zh-hant-mo",
        ].indexOf(-1 !== e)
      )
        return !1;
      throw new TypeError(e + " is not a Chinese locale!");
    }
    function l(e, t) {
      var n = 0;
      for (t = String(t).split("."); n < t.length; ) {
        if (null == e) return;
        e = e[t[n++]];
      }
      return e;
    }
    function u(e) {
      for (
        var t,
          n,
          a,
          r,
          o = document.querySelectorAll(".jsl10n"),
          i = new RegExp(/<a[^>]*>([^<]+)<\/a>/),
          s = 0;
        s < o.length;
        s++
      )
        if (
          "string" ==
            typeof (a = l(
              e,
              (n = (t = o[s])
                .getAttribute("data-jsl10n")
                .replace("portal.", translationsPortalKey + "."))
            )) &&
          0 < a.length
        )
          switch (n) {
            case "app-links.other":
              i.test(a) ? (t.innerHTML = a) : (t.firstChild.textContent = a);
              break;
            case "license":
              t.innerHTML = a;
              break;
            case "terms":
              (t.firstChild.textContent = a),
                (r = l(e, "terms-link")) &&
                  t.firstChild.setAttribute("href", r);
              break;
            case "privacy-policy":
              (t.firstChild.textContent = a),
                (r = l(e, "privacy-policy-link")) &&
                  t.firstChild.setAttribute("href", r);
              break;
            default:
              (t.textContent = a), t.setAttribute("lang", e.lang);
          }
      wmL10nVisible.makeVisible();
    }
    function d(e) {
      (document.documentElement.lang = e),
        0 <= n.indexOf(e) ? (document.dir = "rtl") : (document.dir = "ltr");
    }
    "en" === i
      ? wmL10nVisible.makeVisible()
      : ("zh" === i &&
          ((e = (
            (navigator.languages && navigator.languages[0]) ||
            navigator.language ||
            navigator.userLanguage ||
            ""
          ).toLowerCase()),
          (function (e) {
            var t,
              n,
              a,
              r,
              o = "data-hans",
              i = "data-hant",
              s = "data-title-hans",
              l = "data-title-hant";
            try {
              r = c(e);
            } catch (e) {
              return;
            }
            for (
              n = document.getElementsByClassName("jscnconv"), t = 0;
              t < n.length;
              t++
            )
              (a = n[t]),
                r
                  ? (a.hasAttribute(o) && (a.textContent = a.getAttribute(o)),
                    a.hasAttribute(s) && (a.title = a.getAttribute(s)),
                    (a.lang = "zh-hans"))
                  : (a.hasAttribute(i) && (a.textContent = a.getAttribute(i)),
                    a.hasAttribute(l) && (a.title = a.getAttribute(l)),
                    (a.lang = "zh-hant"));
          })((i = c(e) ? "zh-hans" : "zh-hant"))),
        (e =
          (t === (e = a.storage.get("translationHash")) &&
            e &&
            s(a.storage.get("storedTranslations"))) ||
          {})[i]
          ? ((o = e[i]), wmL10nVisible.ready || (d(i), u(o)))
          : ((r = new XMLHttpRequest()).open(
              "GET",
              encodeURI(
                "portal/" +
                  portalSearchDomain +
                  "/assets/l10n/" +
                  i +
                  "-" +
                  t +
                  ".json"
              ),
              !0
            ),
            (r.onreadystatechange = function () {
              var e, t, n;
              4 === r.readyState &&
                (200 === r.status
                  ? (o = s(this.responseText)) &&
                    ((e = i),
                    (t = o),
                    ((n = s(a.storage.get("storedTranslations")) || {})[e] = t),
                    a.storage.set("storedTranslations", JSON.stringify(n)),
                    wmL10nVisible.ready || (d(i), u(o)))
                  : wmL10nVisible.makeVisible());
            }),
            r.send()));
  })(wmTest, translationsHash, mw, rtlLangs);
