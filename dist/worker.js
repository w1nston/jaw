(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/@remix-run/cloudflare-workers/cookieSigning.js
  var require_cookieSigning = __commonJS({
    "node_modules/@remix-run/cloudflare-workers/cookieSigning.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var encoder = new TextEncoder();
      async function sign2(value, secret) {
        let key = await crypto.subtle.importKey("raw", encoder.encode(secret), {
          name: "HMAC",
          hash: "SHA-256"
        }, false, ["sign"]);
        let data = encoder.encode(value);
        let signature = await crypto.subtle.sign("HMAC", key, data);
        let hash = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(/=+$/, "");
        return value + "." + hash;
      }
      async function unsign2(cookie, secret) {
        let key = await crypto.subtle.importKey("raw", encoder.encode(secret), {
          name: "HMAC",
          hash: "SHA-256"
        }, false, ["verify"]);
        let value = cookie.slice(0, cookie.lastIndexOf("."));
        let hash = cookie.slice(cookie.lastIndexOf(".") + 1);
        let data = encoder.encode(value);
        let signature = byteStringToUint8Array(atob(hash));
        let valid = await crypto.subtle.verify("HMAC", key, signature, data);
        return valid ? value : false;
      }
      function byteStringToUint8Array(byteString) {
        let array = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
          array[i] = byteString.charCodeAt(i);
        }
        return array;
      }
      exports.sign = sign2;
      exports.unsign = unsign2;
    }
  });

  // node_modules/@remix-run/cloudflare-workers/globals.js
  var require_globals = __commonJS({
    "node_modules/@remix-run/cloudflare-workers/globals.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var cookieSigning = require_cookieSigning();
      function installGlobals() {
        self.sign = cookieSigning.sign;
        self.unsign = cookieSigning.unsign;
      }
      exports.installGlobals = installGlobals;
    }
  });

  // node_modules/cookie/index.js
  var require_cookie = __commonJS({
    "node_modules/cookie/index.js"(exports) {
      "use strict";
      exports.parse = parse;
      exports.serialize = serialize;
      var decode = decodeURIComponent;
      var encode = encodeURIComponent;
      var pairSplitRegExp = /; */;
      var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
      function parse(str, options) {
        if (typeof str !== "string") {
          throw new TypeError("argument str must be a string");
        }
        var obj = {};
        var opt = options || {};
        var pairs = str.split(pairSplitRegExp);
        var dec = opt.decode || decode;
        for (var i = 0; i < pairs.length; i++) {
          var pair = pairs[i];
          var eq_idx = pair.indexOf("=");
          if (eq_idx < 0) {
            continue;
          }
          var key = pair.substr(0, eq_idx).trim();
          var val = pair.substr(++eq_idx, pair.length).trim();
          if (val[0] == '"') {
            val = val.slice(1, -1);
          }
          if (obj[key] == void 0) {
            obj[key] = tryDecode(val, dec);
          }
        }
        return obj;
      }
      function serialize(name, val, options) {
        var opt = options || {};
        var enc = opt.encode || encode;
        if (typeof enc !== "function") {
          throw new TypeError("option encode is invalid");
        }
        if (!fieldContentRegExp.test(name)) {
          throw new TypeError("argument name is invalid");
        }
        var value = enc(val);
        if (value && !fieldContentRegExp.test(value)) {
          throw new TypeError("argument val is invalid");
        }
        var str = name + "=" + value;
        if (opt.maxAge != null) {
          var maxAge = opt.maxAge - 0;
          if (isNaN(maxAge) || !isFinite(maxAge)) {
            throw new TypeError("option maxAge is invalid");
          }
          str += "; Max-Age=" + Math.floor(maxAge);
        }
        if (opt.domain) {
          if (!fieldContentRegExp.test(opt.domain)) {
            throw new TypeError("option domain is invalid");
          }
          str += "; Domain=" + opt.domain;
        }
        if (opt.path) {
          if (!fieldContentRegExp.test(opt.path)) {
            throw new TypeError("option path is invalid");
          }
          str += "; Path=" + opt.path;
        }
        if (opt.expires) {
          if (typeof opt.expires.toUTCString !== "function") {
            throw new TypeError("option expires is invalid");
          }
          str += "; Expires=" + opt.expires.toUTCString();
        }
        if (opt.httpOnly) {
          str += "; HttpOnly";
        }
        if (opt.secure) {
          str += "; Secure";
        }
        if (opt.sameSite) {
          var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
          switch (sameSite) {
            case true:
              str += "; SameSite=Strict";
              break;
            case "lax":
              str += "; SameSite=Lax";
              break;
            case "strict":
              str += "; SameSite=Strict";
              break;
            case "none":
              str += "; SameSite=None";
              break;
            default:
              throw new TypeError("option sameSite is invalid");
          }
        }
        return str;
      }
      function tryDecode(str, decode2) {
        try {
          return decode2(str);
        } catch (e) {
          return str;
        }
      }
    }
  });

  // node_modules/@remix-run/server-runtime/cookies.js
  var require_cookies = __commonJS({
    "node_modules/@remix-run/server-runtime/cookies.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var cookie = require_cookie();
      function createCookie2(name, {
        secrets = [],
        ...options
      } = {}) {
        return {
          get name() {
            return name;
          },
          get isSigned() {
            return secrets.length > 0;
          },
          get expires() {
            return typeof options.maxAge !== "undefined" ? new Date(Date.now() + options.maxAge * 1e3) : options.expires;
          },
          async parse(cookieHeader, parseOptions) {
            if (!cookieHeader)
              return null;
            let cookies = cookie.parse(cookieHeader, {
              ...options,
              ...parseOptions
            });
            return name in cookies ? cookies[name] === "" ? "" : await decodeCookieValue(cookies[name], secrets) : null;
          },
          async serialize(value, serializeOptions) {
            return cookie.serialize(name, value === "" ? "" : await encodeCookieValue(value, secrets), {
              ...options,
              ...serializeOptions
            });
          }
        };
      }
      function isCookie2(object) {
        return object != null && typeof object.name === "string" && typeof object.isSigned === "boolean" && typeof object.parse === "function" && typeof object.serialize === "function";
      }
      async function encodeCookieValue(value, secrets) {
        let encoded = encodeData(value);
        if (secrets.length > 0) {
          encoded = await sign(encoded, secrets[0]);
        }
        return encoded;
      }
      async function decodeCookieValue(value, secrets) {
        if (secrets.length > 0) {
          for (let secret of secrets) {
            let unsignedValue = await unsign(value, secret);
            if (unsignedValue !== false) {
              return decodeData(unsignedValue);
            }
          }
          return null;
        }
        return decodeData(value);
      }
      function encodeData(value) {
        return btoa(JSON.stringify(value));
      }
      function decodeData(value) {
        try {
          return JSON.parse(atob(value));
        } catch (error) {
          return {};
        }
      }
      exports.createCookie = createCookie2;
      exports.isCookie = isCookie2;
    }
  });

  // node_modules/@remix-run/server-runtime/responses.js
  var require_responses = __commonJS({
    "node_modules/@remix-run/server-runtime/responses.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function json2(data, init = {}) {
        let responseInit = init;
        if (typeof init === "number") {
          responseInit = {
            status: init
          };
        }
        let headers = new Headers(responseInit.headers);
        if (!headers.has("Content-Type")) {
          headers.set("Content-Type", "application/json; charset=utf-8");
        }
        return new Response(JSON.stringify(data), {
          ...responseInit,
          headers
        });
      }
      function redirect2(url, init = 302) {
        let responseInit = init;
        if (typeof init === "number") {
          responseInit = {
            status: init
          };
        } else if (typeof responseInit.status === "undefined") {
          responseInit.status = 302;
        }
        let headers = new Headers(responseInit.headers);
        headers.set("Location", url);
        return new Response("", {
          ...responseInit,
          headers
        });
      }
      exports.json = json2;
      exports.redirect = redirect2;
    }
  });

  // node_modules/@remix-run/server-runtime/data.js
  var require_data = __commonJS({
    "node_modules/@remix-run/server-runtime/data.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var responses = require_responses();
      async function loadRouteData(build2, routeId, request, context, params) {
        let routeModule = build2.routes[routeId].module;
        if (!routeModule.loader) {
          return Promise.resolve(responses.json(null));
        }
        let result;
        try {
          result = await routeModule.loader({
            request,
            context,
            params
          });
        } catch (error) {
          if (!isResponse(error)) {
            throw error;
          }
          if (!isRedirectResponse2(error)) {
            error.headers.set("X-Remix-Catch", "yes");
          }
          result = error;
        }
        if (result === void 0) {
          throw new Error(`You defined a loader for route "${routeId}" but didn't return anything from your \`loader\` function. Please return a value or \`null\`.`);
        }
        return isResponse(result) ? result : responses.json(result);
      }
      async function callRouteAction(build2, routeId, request, context, params) {
        let routeModule = build2.routes[routeId].module;
        if (!routeModule.action) {
          throw new Error(`You made a ${request.method} request to ${request.url} but did not provide an \`action\` for route "${routeId}", so there is no way to handle the request.`);
        }
        let result;
        try {
          result = await routeModule.action({
            request,
            context,
            params
          });
        } catch (error) {
          if (!isResponse(error)) {
            throw error;
          }
          if (!isRedirectResponse2(error)) {
            error.headers.set("X-Remix-Catch", "yes");
          }
          result = error;
        }
        if (result === void 0) {
          throw new Error(`You defined an action for route "${routeId}" but didn't return anything from your \`action\` function. Please return a value or \`null\`.`);
        }
        return isResponse(result) ? result : responses.json(result);
      }
      function isCatchResponse2(value) {
        return isResponse(value) && value.headers.get("X-Remix-Catch") != null;
      }
      function isResponse(value) {
        return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
      }
      var redirectStatusCodes = new Set([301, 302, 303, 307, 308]);
      function isRedirectResponse2(response) {
        return redirectStatusCodes.has(response.status);
      }
      function extractData2(response) {
        let contentType = response.headers.get("Content-Type");
        if (contentType && /\bapplication\/json\b/.test(contentType)) {
          return response.json();
        }
        return response.text();
      }
      exports.callRouteAction = callRouteAction;
      exports.extractData = extractData2;
      exports.isCatchResponse = isCatchResponse2;
      exports.isRedirectResponse = isRedirectResponse2;
      exports.loadRouteData = loadRouteData;
    }
  });

  // node_modules/@remix-run/server-runtime/entry.js
  var require_entry = __commonJS({
    "node_modules/@remix-run/server-runtime/entry.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function createEntryMatches(matches, routes) {
        return matches.map((match) => ({
          params: match.params,
          pathname: match.pathname,
          route: routes[match.route.id]
        }));
      }
      function createEntryRouteModules(manifest) {
        return Object.keys(manifest).reduce((memo, routeId) => {
          memo[routeId] = manifest[routeId].module;
          return memo;
        }, {});
      }
      exports.createEntryMatches = createEntryMatches;
      exports.createEntryRouteModules = createEntryRouteModules;
    }
  });

  // node_modules/@remix-run/server-runtime/errors.js
  var require_errors = __commonJS({
    "node_modules/@remix-run/server-runtime/errors.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      async function serializeError(error) {
        return {
          message: error.message,
          stack: error.stack
        };
      }
      exports.serializeError = serializeError;
    }
  });

  // node_modules/set-cookie-parser/lib/set-cookie.js
  var require_set_cookie = __commonJS({
    "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
      "use strict";
      var defaultParseOptions = {
        decodeValues: true,
        map: false,
        silent: false
      };
      function isNonEmptyString(str) {
        return typeof str === "string" && !!str.trim();
      }
      function parseString(setCookieValue, options) {
        var parts = setCookieValue.split(";").filter(isNonEmptyString);
        var nameValue = parts.shift().split("=");
        var name = nameValue.shift();
        var value = nameValue.join("=");
        options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
        try {
          value = options.decodeValues ? decodeURIComponent(value) : value;
        } catch (e) {
          console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.", e);
        }
        var cookie = {
          name,
          value
        };
        parts.forEach(function(part) {
          var sides = part.split("=");
          var key = sides.shift().trimLeft().toLowerCase();
          var value2 = sides.join("=");
          if (key === "expires") {
            cookie.expires = new Date(value2);
          } else if (key === "max-age") {
            cookie.maxAge = parseInt(value2, 10);
          } else if (key === "secure") {
            cookie.secure = true;
          } else if (key === "httponly") {
            cookie.httpOnly = true;
          } else if (key === "samesite") {
            cookie.sameSite = value2;
          } else {
            cookie[key] = value2;
          }
        });
        return cookie;
      }
      function parse(input, options) {
        options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
        if (!input) {
          if (!options.map) {
            return [];
          } else {
            return {};
          }
        }
        if (input.headers && input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else if (input.headers) {
          var sch = input.headers[Object.keys(input.headers).find(function(key) {
            return key.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options.silent) {
            console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.");
          }
          input = sch;
        }
        if (!Array.isArray(input)) {
          input = [input];
        }
        options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
        if (!options.map) {
          return input.filter(isNonEmptyString).map(function(str) {
            return parseString(str, options);
          });
        } else {
          var cookies = {};
          return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
            var cookie = parseString(str, options);
            cookies2[cookie.name] = cookie;
            return cookies2;
          }, cookies);
        }
      }
      function splitCookiesString(cookiesString) {
        if (Array.isArray(cookiesString)) {
          return cookiesString;
        }
        if (typeof cookiesString !== "string") {
          return [];
        }
        var cookiesStrings = [];
        var pos = 0;
        var start;
        var ch;
        var lastComma;
        var nextStart;
        var cookiesSeparatorFound;
        function skipWhitespace() {
          while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
            pos += 1;
          }
          return pos < cookiesString.length;
        }
        function notSpecialChar() {
          ch = cookiesString.charAt(pos);
          return ch !== "=" && ch !== ";" && ch !== ",";
        }
        while (pos < cookiesString.length) {
          start = pos;
          cookiesSeparatorFound = false;
          while (skipWhitespace()) {
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
              lastComma = pos;
              pos += 1;
              skipWhitespace();
              nextStart = pos;
              while (pos < cookiesString.length && notSpecialChar()) {
                pos += 1;
              }
              if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                cookiesSeparatorFound = true;
                pos = nextStart;
                cookiesStrings.push(cookiesString.substring(start, lastComma));
                start = pos;
              } else {
                pos = lastComma + 1;
              }
            } else {
              pos += 1;
            }
          }
          if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
          }
        }
        return cookiesStrings;
      }
      module.exports = parse;
      module.exports.parse = parse;
      module.exports.parseString = parseString;
      module.exports.splitCookiesString = splitCookiesString;
    }
  });

  // node_modules/@remix-run/server-runtime/headers.js
  var require_headers = __commonJS({
    "node_modules/@remix-run/server-runtime/headers.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var setCookieParser = require_set_cookie();
      function getDocumentHeaders(build2, matches, routeLoaderResponses, actionResponse) {
        return matches.reduce((parentHeaders, match, index) => {
          let routeModule = build2.routes[match.route.id].module;
          let loaderHeaders = routeLoaderResponses[index] ? routeLoaderResponses[index].headers : new Headers();
          let actionHeaders = actionResponse ? actionResponse.headers : new Headers();
          let headers = new Headers(routeModule.headers ? typeof routeModule.headers === "function" ? routeModule.headers({
            loaderHeaders,
            parentHeaders,
            actionHeaders
          }) : routeModule.headers : void 0);
          prependCookies(actionHeaders, headers);
          prependCookies(loaderHeaders, headers);
          prependCookies(parentHeaders, headers);
          return headers;
        }, new Headers());
      }
      function prependCookies(parentHeaders, childHeaders) {
        let parentSetCookieString = parentHeaders.get("Set-Cookie");
        if (parentSetCookieString) {
          let cookies = setCookieParser.splitCookiesString(parentSetCookieString);
          cookies.forEach((cookie) => {
            childHeaders.append("Set-Cookie", cookie);
          });
        }
      }
      exports.getDocumentHeaders = getDocumentHeaders;
    }
  });

  // node_modules/object-assign/index.js
  var require_object_assign = __commonJS({
    "node_modules/object-assign/index.js"(exports, module) {
      "use strict";
      var getOwnPropertySymbols = Object.getOwnPropertySymbols;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var propIsEnumerable = Object.prototype.propertyIsEnumerable;
      function toObject(val) {
        if (val === null || val === void 0) {
          throw new TypeError("Object.assign cannot be called with null or undefined");
        }
        return Object(val);
      }
      function shouldUseNative() {
        try {
          if (!Object.assign) {
            return false;
          }
          var test1 = new String("abc");
          test1[5] = "de";
          if (Object.getOwnPropertyNames(test1)[0] === "5") {
            return false;
          }
          var test2 = {};
          for (var i = 0; i < 10; i++) {
            test2["_" + String.fromCharCode(i)] = i;
          }
          var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
            return test2[n];
          });
          if (order2.join("") !== "0123456789") {
            return false;
          }
          var test3 = {};
          "abcdefghijklmnopqrst".split("").forEach(function(letter) {
            test3[letter] = letter;
          });
          if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
            return false;
          }
          return true;
        } catch (err) {
          return false;
        }
      }
      module.exports = shouldUseNative() ? Object.assign : function(target, source) {
        var from;
        var to = toObject(target);
        var symbols;
        for (var s = 1; s < arguments.length; s++) {
          from = Object(arguments[s]);
          for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
              to[key] = from[key];
            }
          }
          if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from, symbols[i])) {
                to[symbols[i]] = from[symbols[i]];
              }
            }
          }
        }
        return to;
      };
    }
  });

  // node_modules/react/cjs/react.development.js
  var require_react_development = __commonJS({
    "node_modules/react/cjs/react.development.js"(exports) {
      "use strict";
      if (true) {
        (function() {
          "use strict";
          var _assign = require_object_assign();
          var ReactVersion = "17.0.2";
          var REACT_ELEMENT_TYPE = 60103;
          var REACT_PORTAL_TYPE = 60106;
          exports.Fragment = 60107;
          exports.StrictMode = 60108;
          exports.Profiler = 60114;
          var REACT_PROVIDER_TYPE = 60109;
          var REACT_CONTEXT_TYPE = 60110;
          var REACT_FORWARD_REF_TYPE = 60112;
          exports.Suspense = 60113;
          var REACT_SUSPENSE_LIST_TYPE = 60120;
          var REACT_MEMO_TYPE = 60115;
          var REACT_LAZY_TYPE = 60116;
          var REACT_BLOCK_TYPE = 60121;
          var REACT_SERVER_BLOCK_TYPE = 60122;
          var REACT_FUNDAMENTAL_TYPE = 60117;
          var REACT_SCOPE_TYPE = 60119;
          var REACT_OPAQUE_ID_TYPE = 60128;
          var REACT_DEBUG_TRACING_MODE_TYPE = 60129;
          var REACT_OFFSCREEN_TYPE = 60130;
          var REACT_LEGACY_HIDDEN_TYPE = 60131;
          if (typeof Symbol === "function" && Symbol.for) {
            var symbolFor = Symbol.for;
            REACT_ELEMENT_TYPE = symbolFor("react.element");
            REACT_PORTAL_TYPE = symbolFor("react.portal");
            exports.Fragment = symbolFor("react.fragment");
            exports.StrictMode = symbolFor("react.strict_mode");
            exports.Profiler = symbolFor("react.profiler");
            REACT_PROVIDER_TYPE = symbolFor("react.provider");
            REACT_CONTEXT_TYPE = symbolFor("react.context");
            REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
            exports.Suspense = symbolFor("react.suspense");
            REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
            REACT_MEMO_TYPE = symbolFor("react.memo");
            REACT_LAZY_TYPE = symbolFor("react.lazy");
            REACT_BLOCK_TYPE = symbolFor("react.block");
            REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
            REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
            REACT_SCOPE_TYPE = symbolFor("react.scope");
            REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
            REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
            REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
            REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
          }
          var MAYBE_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator";
          function getIteratorFn(maybeIterable) {
            if (maybeIterable === null || typeof maybeIterable !== "object") {
              return null;
            }
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
            if (typeof maybeIterator === "function") {
              return maybeIterator;
            }
            return null;
          }
          var ReactCurrentDispatcher = {
            current: null
          };
          var ReactCurrentBatchConfig = {
            transition: 0
          };
          var ReactCurrentOwner = {
            current: null
          };
          var ReactDebugCurrentFrame = {};
          var currentExtraStackFrame = null;
          function setExtraStackFrame(stack) {
            {
              currentExtraStackFrame = stack;
            }
          }
          {
            ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
              {
                currentExtraStackFrame = stack;
              }
            };
            ReactDebugCurrentFrame.getCurrentStack = null;
            ReactDebugCurrentFrame.getStackAddendum = function() {
              var stack = "";
              if (currentExtraStackFrame) {
                stack += currentExtraStackFrame;
              }
              var impl = ReactDebugCurrentFrame.getCurrentStack;
              if (impl) {
                stack += impl() || "";
              }
              return stack;
            };
          }
          var IsSomeRendererActing = {
            current: false
          };
          var ReactSharedInternals = {
            ReactCurrentDispatcher,
            ReactCurrentBatchConfig,
            ReactCurrentOwner,
            IsSomeRendererActing,
            assign: _assign
          };
          {
            ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
          }
          function warn(format) {
            {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              printWarning("warn", format, args);
            }
          }
          function error(format) {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
          function printWarning(level, format, args) {
            {
              var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame2.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
              var argsWithFormat = args.map(function(item) {
                return "" + item;
              });
              argsWithFormat.unshift("Warning: " + format);
              Function.prototype.apply.call(console[level], console, argsWithFormat);
            }
          }
          var didWarnStateUpdateForUnmountedComponent = {};
          function warnNoop(publicInstance, callerName) {
            {
              var _constructor = publicInstance.constructor;
              var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
              var warningKey = componentName + "." + callerName;
              if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
                return;
              }
              error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
              didWarnStateUpdateForUnmountedComponent[warningKey] = true;
            }
          }
          var ReactNoopUpdateQueue = {
            isMounted: function(publicInstance) {
              return false;
            },
            enqueueForceUpdate: function(publicInstance, callback, callerName) {
              warnNoop(publicInstance, "forceUpdate");
            },
            enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
              warnNoop(publicInstance, "replaceState");
            },
            enqueueSetState: function(publicInstance, partialState, callback, callerName) {
              warnNoop(publicInstance, "setState");
            }
          };
          var emptyObject = {};
          {
            Object.freeze(emptyObject);
          }
          function Component(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          Component.prototype.isReactComponent = {};
          Component.prototype.setState = function(partialState, callback) {
            if (!(typeof partialState === "object" || typeof partialState === "function" || partialState == null)) {
              {
                throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
              }
            }
            this.updater.enqueueSetState(this, partialState, callback, "setState");
          };
          Component.prototype.forceUpdate = function(callback) {
            this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
          };
          {
            var deprecatedAPIs = {
              isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
              replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
            };
            var defineDeprecationWarning = function(methodName, info) {
              Object.defineProperty(Component.prototype, methodName, {
                get: function() {
                  warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                  return void 0;
                }
              });
            };
            for (var fnName in deprecatedAPIs) {
              if (deprecatedAPIs.hasOwnProperty(fnName)) {
                defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
              }
            }
          }
          function ComponentDummy() {
          }
          ComponentDummy.prototype = Component.prototype;
          function PureComponent(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
          pureComponentPrototype.constructor = PureComponent;
          _assign(pureComponentPrototype, Component.prototype);
          pureComponentPrototype.isPureReactComponent = true;
          function createRef() {
            var refObject = {
              current: null
            };
            {
              Object.seal(refObject);
            }
            return refObject;
          }
          function getWrappedName(outerType, innerType, wrapperName) {
            var functionName = innerType.displayName || innerType.name || "";
            return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
          }
          function getContextName(type) {
            return type.displayName || "Context";
          }
          function getComponentName(type) {
            if (type == null) {
              return null;
            }
            {
              if (typeof type.tag === "number") {
                error("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue.");
              }
            }
            if (typeof type === "function") {
              return type.displayName || type.name || null;
            }
            if (typeof type === "string") {
              return type;
            }
            switch (type) {
              case exports.Fragment:
                return "Fragment";
              case REACT_PORTAL_TYPE:
                return "Portal";
              case exports.Profiler:
                return "Profiler";
              case exports.StrictMode:
                return "StrictMode";
              case exports.Suspense:
                return "Suspense";
              case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_CONTEXT_TYPE:
                  var context = type;
                  return getContextName(context) + ".Consumer";
                case REACT_PROVIDER_TYPE:
                  var provider = type;
                  return getContextName(provider._context) + ".Provider";
                case REACT_FORWARD_REF_TYPE:
                  return getWrappedName(type, type.render, "ForwardRef");
                case REACT_MEMO_TYPE:
                  return getComponentName(type.type);
                case REACT_BLOCK_TYPE:
                  return getComponentName(type._render);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return getComponentName(init(payload));
                  } catch (x) {
                    return null;
                  }
                }
              }
            }
            return null;
          }
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          var RESERVED_PROPS = {
            key: true,
            ref: true,
            __self: true,
            __source: true
          };
          var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
          {
            didWarnAboutStringRefs = {};
          }
          function hasValidRef(config) {
            {
              if (hasOwnProperty.call(config, "ref")) {
                var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.ref !== void 0;
          }
          function hasValidKey(config) {
            {
              if (hasOwnProperty.call(config, "key")) {
                var getter = Object.getOwnPropertyDescriptor(config, "key").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.key !== void 0;
          }
          function defineKeyPropWarningGetter(props, displayName) {
            var warnAboutAccessingKey = function() {
              {
                if (!specialPropKeyWarningShown) {
                  specialPropKeyWarningShown = true;
                  error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
          function defineRefPropWarningGetter(props, displayName) {
            var warnAboutAccessingRef = function() {
              {
                if (!specialPropRefWarningShown) {
                  specialPropRefWarningShown = true;
                  error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
          function warnIfStringRefCannotBeAutoConverted(config) {
            {
              if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
                var componentName = getComponentName(ReactCurrentOwner.current.type);
                if (!didWarnAboutStringRefs[componentName]) {
                  error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                  didWarnAboutStringRefs[componentName] = true;
                }
              }
            }
          }
          var ReactElement = function(type, key, ref, self2, source, owner, props) {
            var element = {
              $$typeof: REACT_ELEMENT_TYPE,
              type,
              key,
              ref,
              props,
              _owner: owner
            };
            {
              element._store = {};
              Object.defineProperty(element._store, "validated", {
                configurable: false,
                enumerable: false,
                writable: true,
                value: false
              });
              Object.defineProperty(element, "_self", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: self2
              });
              Object.defineProperty(element, "_source", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: source
              });
              if (Object.freeze) {
                Object.freeze(element.props);
                Object.freeze(element);
              }
            }
            return element;
          };
          function createElement2(type, config, children) {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            var self2 = null;
            var source = null;
            if (config != null) {
              if (hasValidRef(config)) {
                ref = config.ref;
                {
                  warnIfStringRefCannotBeAutoConverted(config);
                }
              }
              if (hasValidKey(config)) {
                key = "" + config.key;
              }
              self2 = config.__self === void 0 ? null : config.__self;
              source = config.__source === void 0 ? null : config.__source;
              for (propName in config) {
                if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  props[propName] = config[propName];
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
              }
              {
                if (Object.freeze) {
                  Object.freeze(childArray);
                }
              }
              props.children = childArray;
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            {
              if (key || ref) {
                var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
                if (key) {
                  defineKeyPropWarningGetter(props, displayName);
                }
                if (ref) {
                  defineRefPropWarningGetter(props, displayName);
                }
              }
            }
            return ReactElement(type, key, ref, self2, source, ReactCurrentOwner.current, props);
          }
          function cloneAndReplaceKey(oldElement, newKey) {
            var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
            return newElement;
          }
          function cloneElement(element, config, children) {
            if (!!(element === null || element === void 0)) {
              {
                throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
              }
            }
            var propName;
            var props = _assign({}, element.props);
            var key = element.key;
            var ref = element.ref;
            var self2 = element._self;
            var source = element._source;
            var owner = element._owner;
            if (config != null) {
              if (hasValidRef(config)) {
                ref = config.ref;
                owner = ReactCurrentOwner.current;
              }
              if (hasValidKey(config)) {
                key = "" + config.key;
              }
              var defaultProps;
              if (element.type && element.type.defaultProps) {
                defaultProps = element.type.defaultProps;
              }
              for (propName in config) {
                if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  if (config[propName] === void 0 && defaultProps !== void 0) {
                    props[propName] = defaultProps[propName];
                  } else {
                    props[propName] = config[propName];
                  }
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
              }
              props.children = childArray;
            }
            return ReactElement(element.type, key, ref, self2, source, owner, props);
          }
          function isValidElement(object) {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
          var SEPARATOR = ".";
          var SUBSEPARATOR = ":";
          function escape(key) {
            var escapeRegex = /[=:]/g;
            var escaperLookup = {
              "=": "=0",
              ":": "=2"
            };
            var escapedString = key.replace(escapeRegex, function(match) {
              return escaperLookup[match];
            });
            return "$" + escapedString;
          }
          var didWarnAboutMaps = false;
          var userProvidedKeyEscapeRegex = /\/+/g;
          function escapeUserProvidedKey(text) {
            return text.replace(userProvidedKeyEscapeRegex, "$&/");
          }
          function getElementKey(element, index) {
            if (typeof element === "object" && element !== null && element.key != null) {
              return escape("" + element.key);
            }
            return index.toString(36);
          }
          function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
            var type = typeof children;
            if (type === "undefined" || type === "boolean") {
              children = null;
            }
            var invokeCallback = false;
            if (children === null) {
              invokeCallback = true;
            } else {
              switch (type) {
                case "string":
                case "number":
                  invokeCallback = true;
                  break;
                case "object":
                  switch (children.$$typeof) {
                    case REACT_ELEMENT_TYPE:
                    case REACT_PORTAL_TYPE:
                      invokeCallback = true;
                  }
              }
            }
            if (invokeCallback) {
              var _child = children;
              var mappedChild = callback(_child);
              var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
              if (Array.isArray(mappedChild)) {
                var escapedChildKey = "";
                if (childKey != null) {
                  escapedChildKey = escapeUserProvidedKey(childKey) + "/";
                }
                mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
                  return c;
                });
              } else if (mappedChild != null) {
                if (isValidElement(mappedChild)) {
                  mappedChild = cloneAndReplaceKey(mappedChild, escapedPrefix + (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? escapeUserProvidedKey("" + mappedChild.key) + "/" : "") + childKey);
                }
                array.push(mappedChild);
              }
              return 1;
            }
            var child;
            var nextName;
            var subtreeCount = 0;
            var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
            if (Array.isArray(children)) {
              for (var i = 0; i < children.length; i++) {
                child = children[i];
                nextName = nextNamePrefix + getElementKey(child, i);
                subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
              }
            } else {
              var iteratorFn = getIteratorFn(children);
              if (typeof iteratorFn === "function") {
                var iterableChildren = children;
                {
                  if (iteratorFn === iterableChildren.entries) {
                    if (!didWarnAboutMaps) {
                      warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                    }
                    didWarnAboutMaps = true;
                  }
                }
                var iterator = iteratorFn.call(iterableChildren);
                var step;
                var ii = 0;
                while (!(step = iterator.next()).done) {
                  child = step.value;
                  nextName = nextNamePrefix + getElementKey(child, ii++);
                  subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
                }
              } else if (type === "object") {
                var childrenString = "" + children;
                {
                  {
                    throw Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
                  }
                }
              }
            }
            return subtreeCount;
          }
          function mapChildren(children, func, context) {
            if (children == null) {
              return children;
            }
            var result = [];
            var count = 0;
            mapIntoArray(children, result, "", "", function(child) {
              return func.call(context, child, count++);
            });
            return result;
          }
          function countChildren(children) {
            var n = 0;
            mapChildren(children, function() {
              n++;
            });
            return n;
          }
          function forEachChildren(children, forEachFunc, forEachContext) {
            mapChildren(children, function() {
              forEachFunc.apply(this, arguments);
            }, forEachContext);
          }
          function toArray(children) {
            return mapChildren(children, function(child) {
              return child;
            }) || [];
          }
          function onlyChild(children) {
            if (!isValidElement(children)) {
              {
                throw Error("React.Children.only expected to receive a single React element child.");
              }
            }
            return children;
          }
          function createContext(defaultValue, calculateChangedBits) {
            if (calculateChangedBits === void 0) {
              calculateChangedBits = null;
            } else {
              {
                if (calculateChangedBits !== null && typeof calculateChangedBits !== "function") {
                  error("createContext: Expected the optional second argument to be a function. Instead received: %s", calculateChangedBits);
                }
              }
            }
            var context = {
              $$typeof: REACT_CONTEXT_TYPE,
              _calculateChangedBits: calculateChangedBits,
              _currentValue: defaultValue,
              _currentValue2: defaultValue,
              _threadCount: 0,
              Provider: null,
              Consumer: null
            };
            context.Provider = {
              $$typeof: REACT_PROVIDER_TYPE,
              _context: context
            };
            var hasWarnedAboutUsingNestedContextConsumers = false;
            var hasWarnedAboutUsingConsumerProvider = false;
            var hasWarnedAboutDisplayNameOnConsumer = false;
            {
              var Consumer = {
                $$typeof: REACT_CONTEXT_TYPE,
                _context: context,
                _calculateChangedBits: context._calculateChangedBits
              };
              Object.defineProperties(Consumer, {
                Provider: {
                  get: function() {
                    if (!hasWarnedAboutUsingConsumerProvider) {
                      hasWarnedAboutUsingConsumerProvider = true;
                      error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                    }
                    return context.Provider;
                  },
                  set: function(_Provider) {
                    context.Provider = _Provider;
                  }
                },
                _currentValue: {
                  get: function() {
                    return context._currentValue;
                  },
                  set: function(_currentValue) {
                    context._currentValue = _currentValue;
                  }
                },
                _currentValue2: {
                  get: function() {
                    return context._currentValue2;
                  },
                  set: function(_currentValue2) {
                    context._currentValue2 = _currentValue2;
                  }
                },
                _threadCount: {
                  get: function() {
                    return context._threadCount;
                  },
                  set: function(_threadCount) {
                    context._threadCount = _threadCount;
                  }
                },
                Consumer: {
                  get: function() {
                    if (!hasWarnedAboutUsingNestedContextConsumers) {
                      hasWarnedAboutUsingNestedContextConsumers = true;
                      error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                    }
                    return context.Consumer;
                  }
                },
                displayName: {
                  get: function() {
                    return context.displayName;
                  },
                  set: function(displayName) {
                    if (!hasWarnedAboutDisplayNameOnConsumer) {
                      warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                      hasWarnedAboutDisplayNameOnConsumer = true;
                    }
                  }
                }
              });
              context.Consumer = Consumer;
            }
            {
              context._currentRenderer = null;
              context._currentRenderer2 = null;
            }
            return context;
          }
          var Uninitialized = -1;
          var Pending = 0;
          var Resolved = 1;
          var Rejected = 2;
          function lazyInitializer(payload) {
            if (payload._status === Uninitialized) {
              var ctor = payload._result;
              var thenable = ctor();
              var pending = payload;
              pending._status = Pending;
              pending._result = thenable;
              thenable.then(function(moduleObject) {
                if (payload._status === Pending) {
                  var defaultExport = moduleObject.default;
                  {
                    if (defaultExport === void 0) {
                      error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
                    }
                  }
                  var resolved = payload;
                  resolved._status = Resolved;
                  resolved._result = defaultExport;
                }
              }, function(error2) {
                if (payload._status === Pending) {
                  var rejected = payload;
                  rejected._status = Rejected;
                  rejected._result = error2;
                }
              });
            }
            if (payload._status === Resolved) {
              return payload._result;
            } else {
              throw payload._result;
            }
          }
          function lazy(ctor) {
            var payload = {
              _status: -1,
              _result: ctor
            };
            var lazyType = {
              $$typeof: REACT_LAZY_TYPE,
              _payload: payload,
              _init: lazyInitializer
            };
            {
              var defaultProps;
              var propTypes;
              Object.defineProperties(lazyType, {
                defaultProps: {
                  configurable: true,
                  get: function() {
                    return defaultProps;
                  },
                  set: function(newDefaultProps) {
                    error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    defaultProps = newDefaultProps;
                    Object.defineProperty(lazyType, "defaultProps", {
                      enumerable: true
                    });
                  }
                },
                propTypes: {
                  configurable: true,
                  get: function() {
                    return propTypes;
                  },
                  set: function(newPropTypes) {
                    error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    propTypes = newPropTypes;
                    Object.defineProperty(lazyType, "propTypes", {
                      enumerable: true
                    });
                  }
                }
              });
            }
            return lazyType;
          }
          function forwardRef(render) {
            {
              if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
                error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
              } else if (typeof render !== "function") {
                error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
              } else {
                if (render.length !== 0 && render.length !== 2) {
                  error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
                }
              }
              if (render != null) {
                if (render.defaultProps != null || render.propTypes != null) {
                  error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
                }
              }
            }
            var elementType = {
              $$typeof: REACT_FORWARD_REF_TYPE,
              render
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  if (render.displayName == null) {
                    render.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          var enableScopeAPI = false;
          function isValidElementType(type) {
            if (typeof type === "string" || typeof type === "function") {
              return true;
            }
            if (type === exports.Fragment || type === exports.Profiler || type === REACT_DEBUG_TRACING_MODE_TYPE || type === exports.StrictMode || type === exports.Suspense || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
              return true;
            }
            if (typeof type === "object" && type !== null) {
              if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
                return true;
              }
            }
            return false;
          }
          function memo(type, compare) {
            {
              if (!isValidElementType(type)) {
                error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
              }
            }
            var elementType = {
              $$typeof: REACT_MEMO_TYPE,
              type,
              compare: compare === void 0 ? null : compare
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  if (type.displayName == null) {
                    type.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          function resolveDispatcher() {
            var dispatcher = ReactCurrentDispatcher.current;
            if (!(dispatcher !== null)) {
              {
                throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
              }
            }
            return dispatcher;
          }
          function useContext2(Context, unstable_observedBits) {
            var dispatcher = resolveDispatcher();
            {
              if (unstable_observedBits !== void 0) {
                error("useContext() second argument is reserved for future use in React. Passing it is not supported. You passed: %s.%s", unstable_observedBits, typeof unstable_observedBits === "number" && Array.isArray(arguments[2]) ? "\n\nDid you call array.map(useContext)? Calling Hooks inside a loop is not supported. Learn more at https://reactjs.org/link/rules-of-hooks" : "");
              }
              if (Context._context !== void 0) {
                var realContext = Context._context;
                if (realContext.Consumer === Context) {
                  error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
                } else if (realContext.Provider === Context) {
                  error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
                }
              }
            }
            return dispatcher.useContext(Context, unstable_observedBits);
          }
          function useState(initialState) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useState(initialState);
          }
          function useReducer(reducer, initialArg, init) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useReducer(reducer, initialArg, init);
          }
          function useRef2(initialValue) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useRef(initialValue);
          }
          function useEffect2(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useEffect(create, deps);
          }
          function useLayoutEffect2(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useLayoutEffect(create, deps);
          }
          function useCallback2(callback, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useCallback(callback, deps);
          }
          function useMemo(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useMemo(create, deps);
          }
          function useImperativeHandle(ref, create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useImperativeHandle(ref, create, deps);
          }
          function useDebugValue(value, formatterFn) {
            {
              var dispatcher = resolveDispatcher();
              return dispatcher.useDebugValue(value, formatterFn);
            }
          }
          var disabledDepth = 0;
          var prevLog;
          var prevInfo;
          var prevWarn;
          var prevError;
          var prevGroup;
          var prevGroupCollapsed;
          var prevGroupEnd;
          function disabledLog() {
          }
          disabledLog.__reactDisabledLog = true;
          function disableLogs() {
            {
              if (disabledDepth === 0) {
                prevLog = console.log;
                prevInfo = console.info;
                prevWarn = console.warn;
                prevError = console.error;
                prevGroup = console.group;
                prevGroupCollapsed = console.groupCollapsed;
                prevGroupEnd = console.groupEnd;
                var props = {
                  configurable: true,
                  enumerable: true,
                  value: disabledLog,
                  writable: true
                };
                Object.defineProperties(console, {
                  info: props,
                  log: props,
                  warn: props,
                  error: props,
                  group: props,
                  groupCollapsed: props,
                  groupEnd: props
                });
              }
              disabledDepth++;
            }
          }
          function reenableLogs() {
            {
              disabledDepth--;
              if (disabledDepth === 0) {
                var props = {
                  configurable: true,
                  enumerable: true,
                  writable: true
                };
                Object.defineProperties(console, {
                  log: _assign({}, props, {
                    value: prevLog
                  }),
                  info: _assign({}, props, {
                    value: prevInfo
                  }),
                  warn: _assign({}, props, {
                    value: prevWarn
                  }),
                  error: _assign({}, props, {
                    value: prevError
                  }),
                  group: _assign({}, props, {
                    value: prevGroup
                  }),
                  groupCollapsed: _assign({}, props, {
                    value: prevGroupCollapsed
                  }),
                  groupEnd: _assign({}, props, {
                    value: prevGroupEnd
                  })
                });
              }
              if (disabledDepth < 0) {
                error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
              }
            }
          }
          var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
          var prefix;
          function describeBuiltInComponentFrame(name, source, ownerFn) {
            {
              if (prefix === void 0) {
                try {
                  throw Error();
                } catch (x) {
                  var match = x.stack.trim().match(/\n( *(at )?)/);
                  prefix = match && match[1] || "";
                }
              }
              return "\n" + prefix + name;
            }
          }
          var reentry = false;
          var componentFrameCache;
          {
            var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
            componentFrameCache = new PossiblyWeakMap();
          }
          function describeNativeComponentFrame(fn, construct) {
            if (!fn || reentry) {
              return "";
            }
            {
              var frame = componentFrameCache.get(fn);
              if (frame !== void 0) {
                return frame;
              }
            }
            var control;
            reentry = true;
            var previousPrepareStackTrace = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var previousDispatcher;
            {
              previousDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = null;
              disableLogs();
            }
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x) {
                    control = x;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x) {
                  control = x;
                }
                fn();
              }
            } catch (sample) {
              if (sample && control && typeof sample.stack === "string") {
                var sampleLines = sample.stack.split("\n");
                var controlLines = control.stack.split("\n");
                var s = sampleLines.length - 1;
                var c = controlLines.length - 1;
                while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                  c--;
                }
                for (; s >= 1 && c >= 0; s--, c--) {
                  if (sampleLines[s] !== controlLines[c]) {
                    if (s !== 1 || c !== 1) {
                      do {
                        s--;
                        c--;
                        if (c < 0 || sampleLines[s] !== controlLines[c]) {
                          var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                          {
                            if (typeof fn === "function") {
                              componentFrameCache.set(fn, _frame);
                            }
                          }
                          return _frame;
                        }
                      } while (s >= 1 && c >= 0);
                    }
                    break;
                  }
                }
              }
            } finally {
              reentry = false;
              {
                ReactCurrentDispatcher$1.current = previousDispatcher;
                reenableLogs();
              }
              Error.prepareStackTrace = previousPrepareStackTrace;
            }
            var name = fn ? fn.displayName || fn.name : "";
            var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
            {
              if (typeof fn === "function") {
                componentFrameCache.set(fn, syntheticFrame);
              }
            }
            return syntheticFrame;
          }
          function describeFunctionComponentFrame(fn, source, ownerFn) {
            {
              return describeNativeComponentFrame(fn, false);
            }
          }
          function shouldConstruct(Component2) {
            var prototype = Component2.prototype;
            return !!(prototype && prototype.isReactComponent);
          }
          function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
            if (type == null) {
              return "";
            }
            if (typeof type === "function") {
              {
                return describeNativeComponentFrame(type, shouldConstruct(type));
              }
            }
            if (typeof type === "string") {
              return describeBuiltInComponentFrame(type);
            }
            switch (type) {
              case exports.Suspense:
                return describeBuiltInComponentFrame("Suspense");
              case REACT_SUSPENSE_LIST_TYPE:
                return describeBuiltInComponentFrame("SuspenseList");
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE:
                  return describeFunctionComponentFrame(type.render);
                case REACT_MEMO_TYPE:
                  return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
                case REACT_BLOCK_TYPE:
                  return describeFunctionComponentFrame(type._render);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                  } catch (x) {
                  }
                }
              }
            }
            return "";
          }
          var loggedTypeFailures = {};
          var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
          function setCurrentlyValidatingElement(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
              } else {
                ReactDebugCurrentFrame$1.setExtraStackFrame(null);
              }
            }
          }
          function checkPropTypes(typeSpecs, values, location, componentName, element) {
            {
              var has = Function.call.bind(Object.prototype.hasOwnProperty);
              for (var typeSpecName in typeSpecs) {
                if (has(typeSpecs, typeSpecName)) {
                  var error$1 = void 0;
                  try {
                    if (typeof typeSpecs[typeSpecName] !== "function") {
                      var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                      err.name = "Invariant Violation";
                      throw err;
                    }
                    error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                  } catch (ex) {
                    error$1 = ex;
                  }
                  if (error$1 && !(error$1 instanceof Error)) {
                    setCurrentlyValidatingElement(element);
                    error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                    setCurrentlyValidatingElement(null);
                  }
                  if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                    loggedTypeFailures[error$1.message] = true;
                    setCurrentlyValidatingElement(element);
                    error("Failed %s type: %s", location, error$1.message);
                    setCurrentlyValidatingElement(null);
                  }
                }
              }
            }
          }
          function setCurrentlyValidatingElement$1(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                setExtraStackFrame(stack);
              } else {
                setExtraStackFrame(null);
              }
            }
          }
          var propTypesMisspellWarningShown;
          {
            propTypesMisspellWarningShown = false;
          }
          function getDeclarationErrorAddendum() {
            if (ReactCurrentOwner.current) {
              var name = getComponentName(ReactCurrentOwner.current.type);
              if (name) {
                return "\n\nCheck the render method of `" + name + "`.";
              }
            }
            return "";
          }
          function getSourceInfoErrorAddendum(source) {
            if (source !== void 0) {
              var fileName = source.fileName.replace(/^.*[\\\/]/, "");
              var lineNumber = source.lineNumber;
              return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
            }
            return "";
          }
          function getSourceInfoErrorAddendumForProps(elementProps) {
            if (elementProps !== null && elementProps !== void 0) {
              return getSourceInfoErrorAddendum(elementProps.__source);
            }
            return "";
          }
          var ownerHasKeyUseWarning = {};
          function getCurrentComponentErrorInfo(parentType) {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
          function validateExplicitKey(element, parentType) {
            if (!element._store || element._store.validated || element.key != null) {
              return;
            }
            element._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
              childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
            }
            {
              setCurrentlyValidatingElement$1(element);
              error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
              setCurrentlyValidatingElement$1(null);
            }
          }
          function validateChildKeys(node, parentType) {
            if (typeof node !== "object") {
              return;
            }
            if (Array.isArray(node)) {
              for (var i = 0; i < node.length; i++) {
                var child = node[i];
                if (isValidElement(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement(node)) {
              if (node._store) {
                node._store.validated = true;
              }
            } else if (node) {
              var iteratorFn = getIteratorFn(node);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node.entries) {
                  var iterator = iteratorFn.call(node);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
          function validatePropTypes(element) {
            {
              var type = element.type;
              if (type === null || type === void 0 || typeof type === "string") {
                return;
              }
              var propTypes;
              if (typeof type === "function") {
                propTypes = type.propTypes;
              } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) {
                propTypes = type.propTypes;
              } else {
                return;
              }
              if (propTypes) {
                var name = getComponentName(type);
                checkPropTypes(propTypes, element.props, "prop", name, element);
              } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
                propTypesMisspellWarningShown = true;
                var _name = getComponentName(type);
                error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
              }
              if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
                error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
              }
            }
          }
          function validateFragmentProps(fragment) {
            {
              var keys = Object.keys(fragment.props);
              for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (key !== "children" && key !== "key") {
                  setCurrentlyValidatingElement$1(fragment);
                  error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                  setCurrentlyValidatingElement$1(null);
                  break;
                }
              }
              if (fragment.ref !== null) {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid attribute `ref` supplied to `React.Fragment`.");
                setCurrentlyValidatingElement$1(null);
              }
            }
          }
          function createElementWithValidation(type, props, children) {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendumForProps(props);
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (Array.isArray(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentName(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = typeof type;
              }
              {
                error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
              }
            }
            var element = createElement2.apply(this, arguments);
            if (element == null) {
              return element;
            }
            if (validType) {
              for (var i = 2; i < arguments.length; i++) {
                validateChildKeys(arguments[i], type);
              }
            }
            if (type === exports.Fragment) {
              validateFragmentProps(element);
            } else {
              validatePropTypes(element);
            }
            return element;
          }
          var didWarnAboutDeprecatedCreateFactory = false;
          function createFactoryWithValidation(type) {
            var validatedFactory = createElementWithValidation.bind(null, type);
            validatedFactory.type = type;
            {
              if (!didWarnAboutDeprecatedCreateFactory) {
                didWarnAboutDeprecatedCreateFactory = true;
                warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
              }
              Object.defineProperty(validatedFactory, "type", {
                enumerable: false,
                get: function() {
                  warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                  Object.defineProperty(this, "type", {
                    value: type
                  });
                  return type;
                }
              });
            }
            return validatedFactory;
          }
          function cloneElementWithValidation(element, props, children) {
            var newElement = cloneElement.apply(this, arguments);
            for (var i = 2; i < arguments.length; i++) {
              validateChildKeys(arguments[i], newElement.type);
            }
            validatePropTypes(newElement);
            return newElement;
          }
          {
            try {
              var frozenObject = Object.freeze({});
              new Map([[frozenObject, null]]);
              new Set([frozenObject]);
            } catch (e) {
            }
          }
          var createElement$1 = createElementWithValidation;
          var cloneElement$1 = cloneElementWithValidation;
          var createFactory = createFactoryWithValidation;
          var Children = {
            map: mapChildren,
            forEach: forEachChildren,
            count: countChildren,
            toArray,
            only: onlyChild
          };
          exports.Children = Children;
          exports.Component = Component;
          exports.PureComponent = PureComponent;
          exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
          exports.cloneElement = cloneElement$1;
          exports.createContext = createContext;
          exports.createElement = createElement$1;
          exports.createFactory = createFactory;
          exports.createRef = createRef;
          exports.forwardRef = forwardRef;
          exports.isValidElement = isValidElement;
          exports.lazy = lazy;
          exports.memo = memo;
          exports.useCallback = useCallback2;
          exports.useContext = useContext2;
          exports.useDebugValue = useDebugValue;
          exports.useEffect = useEffect2;
          exports.useImperativeHandle = useImperativeHandle;
          exports.useLayoutEffect = useLayoutEffect2;
          exports.useMemo = useMemo;
          exports.useReducer = useReducer;
          exports.useRef = useRef2;
          exports.useState = useState;
          exports.version = ReactVersion;
        })();
      }
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_development();
      }
    }
  });

  // node_modules/history/umd/history.development.js
  var require_history_development = __commonJS({
    "node_modules/history/umd/history.development.js"(exports, module) {
      "use strict";
      (function(l, y) {
        typeof exports === "object" && typeof module !== "undefined" ? y(exports) : typeof define === "function" && define.amd ? define(["exports"], y) : (l = typeof globalThis !== "undefined" ? globalThis : l || self, y(l.HistoryLibrary = {}));
      })(exports, function(l) {
        function y() {
          y = Object.assign || function(b) {
            for (var g = 1; g < arguments.length; g++) {
              var h = arguments[g], t;
              for (t in h)
                Object.prototype.hasOwnProperty.call(h, t) && (b[t] = h[t]);
            }
            return b;
          };
          return y.apply(this, arguments);
        }
        function C(b, g) {
          if (!b) {
            typeof console !== "undefined" && console.warn(g);
            try {
              throw Error(g);
            } catch (h) {
            }
          }
        }
        function H(b) {
          b.preventDefault();
          b.returnValue = "";
        }
        function D() {
          var b = [];
          return { get length() {
            return b.length;
          }, push: function(g) {
            b.push(g);
            return function() {
              b = b.filter(function(h) {
                return h !== g;
              });
            };
          }, call: function(g) {
            b.forEach(function(h) {
              return h && h(g);
            });
          } };
        }
        function I() {
          return Math.random().toString(36).substr(2, 8);
        }
        function E(b) {
          var g = b.pathname, h = b.search;
          b = b.hash;
          return (g === void 0 ? "/" : g) + (h === void 0 ? "" : h) + (b === void 0 ? "" : b);
        }
        function F(b) {
          var g = {};
          if (b) {
            var h = b.indexOf("#");
            0 <= h && (g.hash = b.substr(h), b = b.substr(0, h));
            h = b.indexOf("?");
            0 <= h && (g.search = b.substr(h), b = b.substr(0, h));
            b && (g.pathname = b);
          }
          return g;
        }
        l.Action = void 0;
        (function(b) {
          b.Pop = "POP";
          b.Push = "PUSH";
          b.Replace = "REPLACE";
        })(l.Action || (l.Action = {}));
        l.createBrowserHistory = function(b) {
          function g() {
            var c = q.location, a = n.state || {};
            return [a.idx, Object.freeze({ pathname: c.pathname, search: c.search, hash: c.hash, state: a.usr || null, key: a.key || "default" })];
          }
          function h(c) {
            return typeof c === "string" ? c : E(c);
          }
          function t(c, a) {
            a === void 0 && (a = null);
            return Object.freeze(y({ pathname: r.pathname, hash: "", search: "" }, typeof c === "string" ? F(c) : c, { state: a, key: I() }));
          }
          function A(c) {
            u = c;
            c = g();
            w = c[0];
            r = c[1];
            d.call({ action: u, location: r });
          }
          function B(c, a) {
            function e() {
              B(c, a);
            }
            var m = l.Action.Push, k = t(c, a);
            if (!f.length || (f.call({ action: m, location: k, retry: e }), false)) {
              var p = [{ usr: k.state, key: k.key, idx: w + 1 }, h(k)];
              k = p[0];
              p = p[1];
              try {
                n.pushState(k, "", p);
              } catch (G) {
                q.location.assign(p);
              }
              A(m);
            }
          }
          function z(c, a) {
            function e() {
              z(c, a);
            }
            var m = l.Action.Replace, k = t(c, a);
            f.length && (f.call({ action: m, location: k, retry: e }), 1) || (k = [{ usr: k.state, key: k.key, idx: w }, h(k)], n.replaceState(k[0], "", k[1]), A(m));
          }
          function x(c) {
            n.go(c);
          }
          b === void 0 && (b = {});
          b = b.window;
          var q = b === void 0 ? document.defaultView : b, n = q.history, v = null;
          q.addEventListener("popstate", function() {
            if (v)
              f.call(v), v = null;
            else {
              var c = l.Action.Pop, a = g(), e = a[0];
              a = a[1];
              if (f.length)
                if (e != null) {
                  var m = w - e;
                  m && (v = { action: c, location: a, retry: function() {
                    x(-1 * m);
                  } }, x(m));
                } else
                  C(false, "You are trying to block a POP navigation to a location that was not created by the history library. The block will fail silently in production, but in general you should do all navigation with the history library (instead of using window.history.pushState directly) to avoid this situation.");
              else
                A(c);
            }
          });
          var u = l.Action.Pop;
          b = g();
          var w = b[0], r = b[1], d = D(), f = D();
          w == null && (w = 0, n.replaceState(y({}, n.state, { idx: w }), ""));
          return { get action() {
            return u;
          }, get location() {
            return r;
          }, createHref: h, push: B, replace: z, go: x, back: function() {
            x(-1);
          }, forward: function() {
            x(1);
          }, listen: function(c) {
            return d.push(c);
          }, block: function(c) {
            var a = f.push(c);
            f.length === 1 && q.addEventListener("beforeunload", H);
            return function() {
              a();
              f.length || q.removeEventListener("beforeunload", H);
            };
          } };
        };
        l.createHashHistory = function(b) {
          function g() {
            var a = F(n.location.hash.substr(1)), e = a.pathname, m = a.search;
            a = a.hash;
            var k = v.state || {};
            return [k.idx, Object.freeze({ pathname: e === void 0 ? "/" : e, search: m === void 0 ? "" : m, hash: a === void 0 ? "" : a, state: k.usr || null, key: k.key || "default" })];
          }
          function h() {
            if (u)
              c.call(u), u = null;
            else {
              var a = l.Action.Pop, e = g(), m = e[0];
              e = e[1];
              if (c.length)
                if (m != null) {
                  var k = r - m;
                  k && (u = { action: a, location: e, retry: function() {
                    q(-1 * k);
                  } }, q(k));
                } else
                  C(false, "You are trying to block a POP navigation to a location that was not created by the history library. The block will fail silently in production, but in general you should do all navigation with the history library (instead of using window.history.pushState directly) to avoid this situation.");
              else
                B(a);
            }
          }
          function t(a) {
            var e = document.querySelector("base"), m = "";
            e && e.getAttribute("href") && (e = n.location.href, m = e.indexOf("#"), m = m === -1 ? e : e.slice(0, m));
            return m + "#" + (typeof a === "string" ? a : E(a));
          }
          function A(a, e) {
            e === void 0 && (e = null);
            return Object.freeze(y({ pathname: d.pathname, hash: "", search: "" }, typeof a === "string" ? F(a) : a, { state: e, key: I() }));
          }
          function B(a) {
            w = a;
            a = g();
            r = a[0];
            d = a[1];
            f.call({ action: w, location: d });
          }
          function z(a, e) {
            function m() {
              z(a, e);
            }
            var k = l.Action.Push, p = A(a, e);
            C(p.pathname.charAt(0) === "/", "Relative pathnames are not supported in hash history.push(" + JSON.stringify(a) + ")");
            if (!c.length || (c.call({ action: k, location: p, retry: m }), false)) {
              var G = [{ usr: p.state, key: p.key, idx: r + 1 }, t(p)];
              p = G[0];
              G = G[1];
              try {
                v.pushState(p, "", G);
              } catch (J) {
                n.location.assign(G);
              }
              B(k);
            }
          }
          function x(a, e) {
            function m() {
              x(a, e);
            }
            var k = l.Action.Replace, p = A(a, e);
            C(p.pathname.charAt(0) === "/", "Relative pathnames are not supported in hash history.replace(" + JSON.stringify(a) + ")");
            c.length && (c.call({ action: k, location: p, retry: m }), 1) || (p = [{ usr: p.state, key: p.key, idx: r }, t(p)], v.replaceState(p[0], "", p[1]), B(k));
          }
          function q(a) {
            v.go(a);
          }
          b === void 0 && (b = {});
          b = b.window;
          var n = b === void 0 ? document.defaultView : b, v = n.history, u = null;
          n.addEventListener("popstate", h);
          n.addEventListener("hashchange", function() {
            var a = g()[1];
            E(a) !== E(d) && h();
          });
          var w = l.Action.Pop;
          b = g();
          var r = b[0], d = b[1], f = D(), c = D();
          r == null && (r = 0, v.replaceState(y({}, v.state, { idx: r }), ""));
          return {
            get action() {
              return w;
            },
            get location() {
              return d;
            },
            createHref: t,
            push: z,
            replace: x,
            go: q,
            back: function() {
              q(-1);
            },
            forward: function() {
              q(1);
            },
            listen: function(a) {
              return f.push(a);
            },
            block: function(a) {
              var e = c.push(a);
              c.length === 1 && n.addEventListener("beforeunload", H);
              return function() {
                e();
                c.length || n.removeEventListener("beforeunload", H);
              };
            }
          };
        };
        l.createMemoryHistory = function(b) {
          function g(d, f) {
            f === void 0 && (f = null);
            return Object.freeze(y({ pathname: u.pathname, search: "", hash: "" }, typeof d === "string" ? F(d) : d, { state: f, key: I() }));
          }
          function h(d, f, c) {
            return !r.length || (r.call({ action: d, location: f, retry: c }), false);
          }
          function t(d, f) {
            v = d;
            u = f;
            w.call({ action: v, location: u });
          }
          function A(d, f) {
            var c = l.Action.Push, a = g(d, f);
            C(u.pathname.charAt(0) === "/", "Relative pathnames are not supported in memory history.push(" + JSON.stringify(d) + ")");
            h(c, a, function() {
              A(d, f);
            }) && (n += 1, q.splice(n, q.length, a), t(c, a));
          }
          function B(d, f) {
            var c = l.Action.Replace, a = g(d, f);
            C(u.pathname.charAt(0) === "/", "Relative pathnames are not supported in memory history.replace(" + JSON.stringify(d) + ")");
            h(c, a, function() {
              B(d, f);
            }) && (q[n] = a, t(c, a));
          }
          function z(d) {
            var f = Math.min(Math.max(n + d, 0), q.length - 1), c = l.Action.Pop, a = q[f];
            h(c, a, function() {
              z(d);
            }) && (n = f, t(c, a));
          }
          b === void 0 && (b = {});
          var x = b;
          b = x.initialEntries;
          x = x.initialIndex;
          var q = (b === void 0 ? ["/"] : b).map(function(d) {
            var f = Object.freeze(y({ pathname: "/", search: "", hash: "", state: null, key: I() }, typeof d === "string" ? F(d) : d));
            C(f.pathname.charAt(0) === "/", "Relative pathnames are not supported in createMemoryHistory({ initialEntries }) (invalid entry: " + JSON.stringify(d) + ")");
            return f;
          }), n = Math.min(Math.max(x == null ? q.length - 1 : x, 0), q.length - 1), v = l.Action.Pop, u = q[n], w = D(), r = D();
          return { get index() {
            return n;
          }, get action() {
            return v;
          }, get location() {
            return u;
          }, createHref: function(d) {
            return typeof d === "string" ? d : E(d);
          }, push: A, replace: B, go: z, back: function() {
            z(-1);
          }, forward: function() {
            z(1);
          }, listen: function(d) {
            return w.push(d);
          }, block: function(d) {
            return r.push(d);
          } };
        };
        l.createPath = E;
        l.parsePath = F;
        Object.defineProperty(l, "__esModule", { value: true });
      });
    }
  });

  // node_modules/history/main.js
  var require_main = __commonJS({
    "node_modules/history/main.js"(exports, module) {
      "use strict";
      module.exports = false ? null : require_history_development();
    }
  });

  // node_modules/react-router/umd/react-router.development.js
  var require_react_router_development = __commonJS({
    "node_modules/react-router/umd/react-router.development.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_react(), require_main()) : typeof define === "function" && define.amd ? define(["exports", "react", "history"], factory) : (global = global || self, factory(global.ReactRouter = {}, global.React, global.HistoryLibrary));
      })(exports, function(exports2, React2, history) {
        "use strict";
        function invariant2(cond, message) {
          if (!cond)
            throw new Error(message);
        }
        function warning(cond, message) {
          if (!cond) {
            if (typeof console !== "undefined")
              console.warn(message);
            try {
              throw new Error(message);
            } catch (e) {
            }
          }
        }
        const alreadyWarned = {};
        function warningOnce(key, cond, message) {
          if (!cond && !alreadyWarned[key]) {
            alreadyWarned[key] = true;
            warning(false, message);
          }
        }
        const NavigationContext = /* @__PURE__ */ React2.createContext(null);
        {
          NavigationContext.displayName = "Navigation";
        }
        const LocationContext = /* @__PURE__ */ React2.createContext(null);
        {
          LocationContext.displayName = "Location";
        }
        const RouteContext = /* @__PURE__ */ React2.createContext({
          outlet: null,
          matches: []
        });
        {
          RouteContext.displayName = "Route";
        }
        function MemoryRouter(_ref) {
          let {
            basename,
            children,
            initialEntries,
            initialIndex
          } = _ref;
          let historyRef = React2.useRef();
          if (historyRef.current == null) {
            historyRef.current = history.createMemoryHistory({
              initialEntries,
              initialIndex
            });
          }
          let history$1 = historyRef.current;
          let [state, setState] = React2.useState({
            action: history$1.action,
            location: history$1.location
          });
          React2.useLayoutEffect(() => history$1.listen(setState), [history$1]);
          return /* @__PURE__ */ React2.createElement(Router2, {
            basename,
            children,
            location: state.location,
            navigationType: state.action,
            navigator: history$1
          });
        }
        function Navigate(_ref2) {
          let {
            to,
            replace,
            state
          } = _ref2;
          !useInRouterContext() ? invariant2(false, "<Navigate> may be used only in the context of a <Router> component.") : void 0;
          warning(!React2.useContext(NavigationContext).static, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
          let navigate = useNavigate3();
          React2.useEffect(() => {
            navigate(to, {
              replace,
              state
            });
          });
          return null;
        }
        function Outlet2(_props) {
          return useOutlet2();
        }
        function Route(_props) {
          invariant2(false, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
        }
        function Router2(_ref3) {
          let {
            basename: basenameProp = "/",
            children = null,
            location: locationProp,
            navigationType = history.Action.Pop,
            navigator,
            static: staticProp = false
          } = _ref3;
          !!useInRouterContext() ? invariant2(false, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.") : void 0;
          let basename = normalizePathname(basenameProp);
          let navigationContext = React2.useMemo(() => ({
            basename,
            navigator,
            static: staticProp
          }), [basename, navigator, staticProp]);
          if (typeof locationProp === "string") {
            locationProp = history.parsePath(locationProp);
          }
          let {
            pathname = "/",
            search = "",
            hash = "",
            state = null,
            key = "default"
          } = locationProp;
          let location = React2.useMemo(() => {
            let trailingPathname = stripBasename(pathname, basename);
            if (trailingPathname == null) {
              return null;
            }
            return {
              pathname: trailingPathname,
              search,
              hash,
              state,
              key
            };
          }, [basename, pathname, search, hash, state, key]);
          warning(location != null, '<Router basename="' + basename + '"> is not able to match the URL ' + ('"' + pathname + search + hash + '" because it does not start with the ') + "basename, so the <Router> won't render anything.");
          if (location == null) {
            return null;
          }
          return /* @__PURE__ */ React2.createElement(NavigationContext.Provider, {
            value: navigationContext
          }, /* @__PURE__ */ React2.createElement(LocationContext.Provider, {
            children,
            value: {
              location,
              navigationType
            }
          }));
        }
        function Routes2(_ref4) {
          let {
            children,
            location
          } = _ref4;
          return useRoutes2(createRoutesFromChildren(children), location);
        }
        function useHref3(to) {
          !useInRouterContext() ? invariant2(false, "useHref() may be used only in the context of a <Router> component.") : void 0;
          let {
            basename,
            navigator
          } = React2.useContext(NavigationContext);
          let {
            hash,
            pathname,
            search
          } = useResolvedPath3(to);
          let joinedPathname = pathname;
          if (basename !== "/") {
            let toPathname = getToPathname(to);
            let endsWithSlash = toPathname != null && toPathname.endsWith("/");
            joinedPathname = pathname === "/" ? basename + (endsWithSlash ? "/" : "") : joinPaths([basename, pathname]);
          }
          return navigator.createHref({
            pathname: joinedPathname,
            search,
            hash
          });
        }
        function useInRouterContext() {
          return React2.useContext(LocationContext) != null;
        }
        function useLocation4() {
          !useInRouterContext() ? invariant2(false, "useLocation() may be used only in the context of a <Router> component.") : void 0;
          return React2.useContext(LocationContext).location;
        }
        function useNavigationType2() {
          return React2.useContext(LocationContext).navigationType;
        }
        function useMatch(pattern) {
          !useInRouterContext() ? invariant2(false, "useMatch() may be used only in the context of a <Router> component.") : void 0;
          return matchPath(pattern, useLocation4().pathname);
        }
        function useNavigate3() {
          !useInRouterContext() ? invariant2(false, "useNavigate() may be used only in the context of a <Router> component.") : void 0;
          let {
            basename,
            navigator
          } = React2.useContext(NavigationContext);
          let {
            matches
          } = React2.useContext(RouteContext);
          let {
            pathname: locationPathname
          } = useLocation4();
          let routePathnamesJson = JSON.stringify(matches.map((match) => match.pathnameBase));
          let activeRef = React2.useRef(false);
          React2.useEffect(() => {
            activeRef.current = true;
          });
          let navigate = React2.useCallback(function(to, options) {
            if (options === void 0) {
              options = {};
            }
            warning(activeRef.current, "You should call navigate() in a React.useEffect(), not when your component is first rendered.");
            if (!activeRef.current)
              return;
            if (typeof to === "number") {
              navigator.go(to);
              return;
            }
            let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname);
            if (basename !== "/") {
              path.pathname = joinPaths([basename, path.pathname]);
            }
            (!!options.replace ? navigator.replace : navigator.push)(path, options.state);
          }, [basename, navigator, routePathnamesJson, locationPathname]);
          return navigate;
        }
        function useOutlet2() {
          return React2.useContext(RouteContext).outlet;
        }
        function useParams2() {
          let {
            matches
          } = React2.useContext(RouteContext);
          let routeMatch = matches[matches.length - 1];
          return routeMatch ? routeMatch.params : {};
        }
        function useResolvedPath3(to) {
          let {
            matches
          } = React2.useContext(RouteContext);
          let {
            pathname: locationPathname
          } = useLocation4();
          let routePathnamesJson = JSON.stringify(matches.map((match) => match.pathnameBase));
          return React2.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname), [to, routePathnamesJson, locationPathname]);
        }
        function useRoutes2(routes, locationArg) {
          !useInRouterContext() ? invariant2(false, "useRoutes() may be used only in the context of a <Router> component.") : void 0;
          let {
            matches: parentMatches
          } = React2.useContext(RouteContext);
          let routeMatch = parentMatches[parentMatches.length - 1];
          let parentParams = routeMatch ? routeMatch.params : {};
          let parentPathname = routeMatch ? routeMatch.pathname : "/";
          let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
          let parentRoute = routeMatch && routeMatch.route;
          {
            let parentPath = parentRoute && parentRoute.path || "";
            warningOnce(parentPathname, !parentRoute || parentPath.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + parentPathname + '" (under <Route path="' + parentPath + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + parentPath + '"> to <Route ') + ('path="' + parentPath + '/*">.'));
          }
          let locationFromContext = useLocation4();
          let location;
          if (locationArg) {
            var _parsedLocationArg$pa;
            let parsedLocationArg = typeof locationArg === "string" ? history.parsePath(locationArg) : locationArg;
            !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? invariant2(false, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + parentPathnameBase + '" ') + ('but pathname "' + parsedLocationArg.pathname + '" was given in the `location` prop.')) : void 0;
            location = parsedLocationArg;
          } else {
            location = locationFromContext;
          }
          let pathname = location.pathname || "/";
          let remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/";
          let matches = matchRoutes2(routes, {
            pathname: remainingPathname
          });
          {
            warning(parentRoute || matches != null, 'No routes matched location "' + location.pathname + location.search + location.hash + '" ');
            warning(matches == null || matches[matches.length - 1].route.element !== void 0, 'Matched leaf route at location "' + location.pathname + location.search + location.hash + '" does not have an element. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
          }
          return _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
            params: Object.assign({}, parentParams, match.params),
            pathname: joinPaths([parentPathnameBase, match.pathname]),
            pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([parentPathnameBase, match.pathnameBase])
          })), parentMatches);
        }
        function createRoutesFromChildren(children) {
          let routes = [];
          React2.Children.forEach(children, (element) => {
            if (!/* @__PURE__ */ React2.isValidElement(element)) {
              return;
            }
            if (element.type === React2.Fragment) {
              routes.push.apply(routes, createRoutesFromChildren(element.props.children));
              return;
            }
            !(element.type === Route) ? invariant2(false, "[" + (typeof element.type === "string" ? element.type : element.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : void 0;
            let route = {
              caseSensitive: element.props.caseSensitive,
              element: element.props.element,
              index: element.props.index,
              path: element.props.path
            };
            if (element.props.children) {
              route.children = createRoutesFromChildren(element.props.children);
            }
            routes.push(route);
          });
          return routes;
        }
        function generatePath(path, params) {
          if (params === void 0) {
            params = {};
          }
          return path.replace(/:(\w+)/g, (_, key) => {
            !(params[key] != null) ? invariant2(false, 'Missing ":' + key + '" param') : void 0;
            return params[key];
          }).replace(/\/*\*$/, (_) => params["*"] == null ? "" : params["*"].replace(/^\/*/, "/"));
        }
        function matchRoutes2(routes, locationArg, basename) {
          if (basename === void 0) {
            basename = "/";
          }
          let location = typeof locationArg === "string" ? history.parsePath(locationArg) : locationArg;
          let pathname = stripBasename(location.pathname || "/", basename);
          if (pathname == null) {
            return null;
          }
          let branches = flattenRoutes(routes);
          rankRouteBranches(branches);
          let matches = null;
          for (let i = 0; matches == null && i < branches.length; ++i) {
            matches = matchRouteBranch(branches[i], routes, pathname);
          }
          return matches;
        }
        function flattenRoutes(routes, branches, parentsMeta, parentPath) {
          if (branches === void 0) {
            branches = [];
          }
          if (parentsMeta === void 0) {
            parentsMeta = [];
          }
          if (parentPath === void 0) {
            parentPath = "";
          }
          routes.forEach((route, index) => {
            let meta = {
              relativePath: route.path || "",
              caseSensitive: route.caseSensitive === true,
              childrenIndex: index
            };
            if (meta.relativePath.startsWith("/")) {
              !meta.relativePath.startsWith(parentPath) ? invariant2(false, 'Absolute route path "' + meta.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.") : void 0;
              meta.relativePath = meta.relativePath.slice(parentPath.length);
            }
            let path = joinPaths([parentPath, meta.relativePath]);
            let routesMeta = parentsMeta.concat(meta);
            if (route.children && route.children.length > 0) {
              !(route.index !== true) ? invariant2(false, "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')) : void 0;
              flattenRoutes(route.children, branches, routesMeta, path);
            }
            if (route.path == null && !route.index) {
              return;
            }
            branches.push({
              path,
              score: computeScore(path, route.index),
              routesMeta
            });
          });
          return branches;
        }
        function rankRouteBranches(branches) {
          branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta) => meta.childrenIndex), b.routesMeta.map((meta) => meta.childrenIndex)));
        }
        const paramRe = /^:\w+$/;
        const dynamicSegmentValue = 3;
        const indexRouteValue = 2;
        const emptySegmentValue = 1;
        const staticSegmentValue = 10;
        const splatPenalty = -2;
        const isSplat = (s) => s === "*";
        function computeScore(path, index) {
          let segments = path.split("/");
          let initialScore = segments.length;
          if (segments.some(isSplat)) {
            initialScore += splatPenalty;
          }
          if (index) {
            initialScore += indexRouteValue;
          }
          return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
        }
        function compareIndexes(a, b) {
          let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
          return siblings ? a[a.length - 1] - b[b.length - 1] : 0;
        }
        function matchRouteBranch(branch, routesArg, pathname) {
          let routes = routesArg;
          let {
            routesMeta
          } = branch;
          let matchedParams = {};
          let matchedPathname = "/";
          let matches = [];
          for (let i = 0; i < routesMeta.length; ++i) {
            let meta = routesMeta[i];
            let end = i === routesMeta.length - 1;
            let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
            let match = matchPath({
              path: meta.relativePath,
              caseSensitive: meta.caseSensitive,
              end
            }, remainingPathname);
            if (!match)
              return null;
            Object.assign(matchedParams, match.params);
            let route = routes[meta.childrenIndex];
            matches.push({
              params: matchedParams,
              pathname: joinPaths([matchedPathname, match.pathname]),
              pathnameBase: joinPaths([matchedPathname, match.pathnameBase]),
              route
            });
            if (match.pathnameBase !== "/") {
              matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
            }
            routes = route.children;
          }
          return matches;
        }
        function renderMatches(matches) {
          return _renderMatches(matches);
        }
        function _renderMatches(matches, parentMatches) {
          if (parentMatches === void 0) {
            parentMatches = [];
          }
          if (matches == null)
            return null;
          return matches.reduceRight((outlet, match, index) => {
            return /* @__PURE__ */ React2.createElement(RouteContext.Provider, {
              children: match.route.element !== void 0 ? match.route.element : /* @__PURE__ */ React2.createElement(Outlet2, null),
              value: {
                outlet,
                matches: parentMatches.concat(matches.slice(0, index + 1))
              }
            });
          }, null);
        }
        function matchPath(pattern, pathname) {
          if (typeof pattern === "string") {
            pattern = {
              path: pattern,
              caseSensitive: false,
              end: true
            };
          }
          let [matcher, paramNames] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
          let match = pathname.match(matcher);
          if (!match)
            return null;
          let matchedPathname = match[0];
          let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
          let captureGroups = match.slice(1);
          let params = paramNames.reduce((memo, paramName, index) => {
            if (paramName === "*") {
              let splatValue = captureGroups[index] || "";
              pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
            }
            memo[paramName] = safelyDecodeURIComponent(captureGroups[index] || "", paramName);
            return memo;
          }, {});
          return {
            params,
            pathname: matchedPathname,
            pathnameBase,
            pattern
          };
        }
        function compilePath(path, caseSensitive, end) {
          if (caseSensitive === void 0) {
            caseSensitive = false;
          }
          if (end === void 0) {
            end = true;
          }
          warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
          let paramNames = [];
          let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/:(\w+)/g, (_, paramName) => {
            paramNames.push(paramName);
            return "([^\\/]+)";
          });
          if (path.endsWith("*")) {
            paramNames.push("*");
            regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
          } else {
            regexpSource += end ? "\\/*$" : "(?:\\b|$)";
          }
          let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
          return [matcher, paramNames];
        }
        function safelyDecodeURIComponent(value, paramName) {
          try {
            return decodeURIComponent(value);
          } catch (error) {
            warning(false, 'The value for the URL param "' + paramName + '" will not be decoded because' + (' the string "' + value + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + error + ")."));
            return value;
          }
        }
        function resolvePath(to, fromPathname) {
          if (fromPathname === void 0) {
            fromPathname = "/";
          }
          let {
            pathname: toPathname,
            search = "",
            hash = ""
          } = typeof to === "string" ? history.parsePath(to) : to;
          let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
          return {
            pathname,
            search: normalizeSearch(search),
            hash: normalizeHash(hash)
          };
        }
        function resolvePathname(relativePath, fromPathname) {
          let segments = fromPathname.replace(/\/+$/, "").split("/");
          let relativeSegments = relativePath.split("/");
          relativeSegments.forEach((segment) => {
            if (segment === "..") {
              if (segments.length > 1)
                segments.pop();
            } else if (segment !== ".") {
              segments.push(segment);
            }
          });
          return segments.length > 1 ? segments.join("/") : "/";
        }
        function resolveTo(toArg, routePathnames, locationPathname) {
          let to = typeof toArg === "string" ? history.parsePath(toArg) : toArg;
          let toPathname = toArg === "" || to.pathname === "" ? "/" : to.pathname;
          let from;
          if (toPathname == null) {
            from = locationPathname;
          } else {
            let routePathnameIndex = routePathnames.length - 1;
            if (toPathname.startsWith("..")) {
              let toSegments = toPathname.split("/");
              while (toSegments[0] === "..") {
                toSegments.shift();
                routePathnameIndex -= 1;
              }
              to.pathname = toSegments.join("/");
            }
            from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
          }
          let path = resolvePath(to, from);
          if (toPathname && toPathname !== "/" && toPathname.endsWith("/") && !path.pathname.endsWith("/")) {
            path.pathname += "/";
          }
          return path;
        }
        function getToPathname(to) {
          return to === "" || to.pathname === "" ? "/" : typeof to === "string" ? history.parsePath(to).pathname : to.pathname;
        }
        function stripBasename(pathname, basename) {
          if (basename === "/")
            return pathname;
          if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
            return null;
          }
          let nextChar = pathname.charAt(basename.length);
          if (nextChar && nextChar !== "/") {
            return null;
          }
          return pathname.slice(basename.length) || "/";
        }
        const joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
        const normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
        const normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
        const normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
        exports2.MemoryRouter = MemoryRouter;
        exports2.Navigate = Navigate;
        exports2.Outlet = Outlet2;
        exports2.Route = Route;
        exports2.Router = Router2;
        exports2.Routes = Routes2;
        exports2.UNSAFE_LocationContext = LocationContext;
        exports2.UNSAFE_NavigationContext = NavigationContext;
        exports2.UNSAFE_RouteContext = RouteContext;
        exports2.createRoutesFromChildren = createRoutesFromChildren;
        exports2.generatePath = generatePath;
        exports2.matchPath = matchPath;
        exports2.matchRoutes = matchRoutes2;
        exports2.renderMatches = renderMatches;
        exports2.resolvePath = resolvePath;
        exports2.useHref = useHref3;
        exports2.useInRouterContext = useInRouterContext;
        exports2.useLocation = useLocation4;
        exports2.useMatch = useMatch;
        exports2.useNavigate = useNavigate3;
        exports2.useNavigationType = useNavigationType2;
        exports2.useOutlet = useOutlet2;
        exports2.useParams = useParams2;
        exports2.useResolvedPath = useResolvedPath3;
        exports2.useRoutes = useRoutes2;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    }
  });

  // node_modules/react-router/main.js
  var require_main2 = __commonJS({
    "node_modules/react-router/main.js"(exports, module) {
      "use strict";
      module.exports = false ? null : require_react_router_development();
    }
  });

  // node_modules/react-router-dom/umd/react-router-dom.development.js
  var require_react_router_dom_development = __commonJS({
    "node_modules/react-router-dom/umd/react-router-dom.development.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_react(), require_main(), require_main2()) : typeof define === "function" && define.amd ? define(["exports", "react", "history", "react-router"], factory) : (global = global || self, factory(global.ReactRouterDOM = {}, global.React, global.HistoryLibrary, global.ReactRouter));
      })(exports, function(exports2, React2, history, reactRouter) {
        "use strict";
        function _extends2() {
          _extends2 = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i];
              for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                  target[key] = source[key];
                }
              }
            }
            return target;
          };
          return _extends2.apply(this, arguments);
        }
        function _objectWithoutPropertiesLoose(source, excluded) {
          if (source == null)
            return {};
          var target = {};
          var sourceKeys = Object.keys(source);
          var key, i;
          for (i = 0; i < sourceKeys.length; i++) {
            key = sourceKeys[i];
            if (excluded.indexOf(key) >= 0)
              continue;
            target[key] = source[key];
          }
          return target;
        }
        const _excluded = ["onClick", "reloadDocument", "replace", "state", "target", "to"], _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to"];
        function warning(cond, message) {
          if (!cond) {
            if (typeof console !== "undefined")
              console.warn(message);
            try {
              throw new Error(message);
            } catch (e) {
            }
          }
        }
        function BrowserRouter(_ref) {
          let {
            basename,
            children,
            window: window2
          } = _ref;
          let historyRef = React2.useRef();
          if (historyRef.current == null) {
            historyRef.current = history.createBrowserHistory({
              window: window2
            });
          }
          let history$1 = historyRef.current;
          let [state, setState] = React2.useState({
            action: history$1.action,
            location: history$1.location
          });
          React2.useLayoutEffect(() => history$1.listen(setState), [history$1]);
          return /* @__PURE__ */ React2.createElement(reactRouter.Router, {
            basename,
            children,
            location: state.location,
            navigationType: state.action,
            navigator: history$1
          });
        }
        function HashRouter(_ref2) {
          let {
            basename,
            children,
            window: window2
          } = _ref2;
          let historyRef = React2.useRef();
          if (historyRef.current == null) {
            historyRef.current = history.createHashHistory({
              window: window2
            });
          }
          let history$1 = historyRef.current;
          let [state, setState] = React2.useState({
            action: history$1.action,
            location: history$1.location
          });
          React2.useLayoutEffect(() => history$1.listen(setState), [history$1]);
          return /* @__PURE__ */ React2.createElement(reactRouter.Router, {
            basename,
            children,
            location: state.location,
            navigationType: state.action,
            navigator: history$1
          });
        }
        function isModifiedEvent(event) {
          return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
        }
        const Link2 = /* @__PURE__ */ React2.forwardRef(function LinkWithRef(_ref3, ref) {
          let {
            onClick,
            reloadDocument,
            replace = false,
            state,
            target,
            to
          } = _ref3, rest = _objectWithoutPropertiesLoose(_ref3, _excluded);
          let href = reactRouter.useHref(to);
          let internalOnClick = useLinkClickHandler(to, {
            replace,
            state,
            target
          });
          function handleClick(event) {
            if (onClick)
              onClick(event);
            if (!event.defaultPrevented && !reloadDocument) {
              internalOnClick(event);
            }
          }
          return /* @__PURE__ */ React2.createElement("a", _extends2({}, rest, {
            href,
            onClick: handleClick,
            ref,
            target
          }));
        });
        {
          Link2.displayName = "Link";
        }
        const NavLink2 = /* @__PURE__ */ React2.forwardRef(function NavLinkWithRef(_ref4, ref) {
          let {
            "aria-current": ariaCurrentProp = "page",
            caseSensitive = false,
            className: classNameProp = "",
            end = false,
            style: styleProp,
            to
          } = _ref4, rest = _objectWithoutPropertiesLoose(_ref4, _excluded2);
          let location = reactRouter.useLocation();
          let path = reactRouter.useResolvedPath(to);
          let locationPathname = location.pathname;
          let toPathname = path.pathname;
          if (!caseSensitive) {
            locationPathname = locationPathname.toLowerCase();
            toPathname = toPathname.toLowerCase();
          }
          let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/";
          let ariaCurrent = isActive ? ariaCurrentProp : void 0;
          let className;
          if (typeof classNameProp === "function") {
            className = classNameProp({
              isActive
            });
          } else {
            className = [classNameProp, isActive ? "active" : null].filter(Boolean).join(" ");
          }
          let style = typeof styleProp === "function" ? styleProp({
            isActive
          }) : styleProp;
          return /* @__PURE__ */ React2.createElement(Link2, _extends2({}, rest, {
            "aria-current": ariaCurrent,
            className,
            ref,
            style,
            to
          }));
        });
        {
          NavLink2.displayName = "NavLink";
        }
        function useLinkClickHandler(to, _temp) {
          let {
            target,
            replace: replaceProp,
            state
          } = _temp === void 0 ? {} : _temp;
          let navigate = reactRouter.useNavigate();
          let location = reactRouter.useLocation();
          let path = reactRouter.useResolvedPath(to);
          return React2.useCallback((event) => {
            if (event.button === 0 && (!target || target === "_self") && !isModifiedEvent(event)) {
              event.preventDefault();
              let replace = !!replaceProp || history.createPath(location) === history.createPath(path);
              navigate(to, {
                replace,
                state
              });
            }
          }, [location, navigate, path, replaceProp, state, target, to]);
        }
        function useSearchParams2(defaultInit) {
          warning(typeof URLSearchParams !== "undefined", "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params\n\nIf you're unsure how to load polyfills, we recommend you check out https://polyfill.io/v3/ which provides some recommendations about how to load polyfills only for users that need them, instead of for every user.");
          let defaultSearchParamsRef = React2.useRef(createSearchParams(defaultInit));
          let location = reactRouter.useLocation();
          let searchParams = React2.useMemo(() => {
            let searchParams2 = createSearchParams(location.search);
            for (let key of defaultSearchParamsRef.current.keys()) {
              if (!searchParams2.has(key)) {
                defaultSearchParamsRef.current.getAll(key).forEach((value) => {
                  searchParams2.append(key, value);
                });
              }
            }
            return searchParams2;
          }, [location.search]);
          let navigate = reactRouter.useNavigate();
          let setSearchParams = React2.useCallback((nextInit, navigateOptions) => {
            navigate("?" + createSearchParams(nextInit), navigateOptions);
          }, [navigate]);
          return [searchParams, setSearchParams];
        }
        function createSearchParams(init) {
          if (init === void 0) {
            init = "";
          }
          return new URLSearchParams(typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo, key) => {
            let value = init[key];
            return memo.concat(Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]);
          }, []));
        }
        Object.defineProperty(exports2, "MemoryRouter", {
          enumerable: true,
          get: function() {
            return reactRouter.MemoryRouter;
          }
        });
        Object.defineProperty(exports2, "Navigate", {
          enumerable: true,
          get: function() {
            return reactRouter.Navigate;
          }
        });
        Object.defineProperty(exports2, "Outlet", {
          enumerable: true,
          get: function() {
            return reactRouter.Outlet;
          }
        });
        Object.defineProperty(exports2, "Route", {
          enumerable: true,
          get: function() {
            return reactRouter.Route;
          }
        });
        Object.defineProperty(exports2, "Router", {
          enumerable: true,
          get: function() {
            return reactRouter.Router;
          }
        });
        Object.defineProperty(exports2, "Routes", {
          enumerable: true,
          get: function() {
            return reactRouter.Routes;
          }
        });
        Object.defineProperty(exports2, "UNSAFE_LocationContext", {
          enumerable: true,
          get: function() {
            return reactRouter.UNSAFE_LocationContext;
          }
        });
        Object.defineProperty(exports2, "UNSAFE_NavigationContext", {
          enumerable: true,
          get: function() {
            return reactRouter.UNSAFE_NavigationContext;
          }
        });
        Object.defineProperty(exports2, "UNSAFE_RouteContext", {
          enumerable: true,
          get: function() {
            return reactRouter.UNSAFE_RouteContext;
          }
        });
        Object.defineProperty(exports2, "createRoutesFromChildren", {
          enumerable: true,
          get: function() {
            return reactRouter.createRoutesFromChildren;
          }
        });
        Object.defineProperty(exports2, "generatePath", {
          enumerable: true,
          get: function() {
            return reactRouter.generatePath;
          }
        });
        Object.defineProperty(exports2, "matchPath", {
          enumerable: true,
          get: function() {
            return reactRouter.matchPath;
          }
        });
        Object.defineProperty(exports2, "matchRoutes", {
          enumerable: true,
          get: function() {
            return reactRouter.matchRoutes;
          }
        });
        Object.defineProperty(exports2, "renderMatches", {
          enumerable: true,
          get: function() {
            return reactRouter.renderMatches;
          }
        });
        Object.defineProperty(exports2, "resolvePath", {
          enumerable: true,
          get: function() {
            return reactRouter.resolvePath;
          }
        });
        Object.defineProperty(exports2, "useHref", {
          enumerable: true,
          get: function() {
            return reactRouter.useHref;
          }
        });
        Object.defineProperty(exports2, "useInRouterContext", {
          enumerable: true,
          get: function() {
            return reactRouter.useInRouterContext;
          }
        });
        Object.defineProperty(exports2, "useLocation", {
          enumerable: true,
          get: function() {
            return reactRouter.useLocation;
          }
        });
        Object.defineProperty(exports2, "useMatch", {
          enumerable: true,
          get: function() {
            return reactRouter.useMatch;
          }
        });
        Object.defineProperty(exports2, "useNavigate", {
          enumerable: true,
          get: function() {
            return reactRouter.useNavigate;
          }
        });
        Object.defineProperty(exports2, "useNavigationType", {
          enumerable: true,
          get: function() {
            return reactRouter.useNavigationType;
          }
        });
        Object.defineProperty(exports2, "useOutlet", {
          enumerable: true,
          get: function() {
            return reactRouter.useOutlet;
          }
        });
        Object.defineProperty(exports2, "useParams", {
          enumerable: true,
          get: function() {
            return reactRouter.useParams;
          }
        });
        Object.defineProperty(exports2, "useResolvedPath", {
          enumerable: true,
          get: function() {
            return reactRouter.useResolvedPath;
          }
        });
        Object.defineProperty(exports2, "useRoutes", {
          enumerable: true,
          get: function() {
            return reactRouter.useRoutes;
          }
        });
        exports2.BrowserRouter = BrowserRouter;
        exports2.HashRouter = HashRouter;
        exports2.Link = Link2;
        exports2.NavLink = NavLink2;
        exports2.createSearchParams = createSearchParams;
        exports2.useLinkClickHandler = useLinkClickHandler;
        exports2.useSearchParams = useSearchParams2;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    }
  });

  // node_modules/react-router-dom/main.js
  var require_main3 = __commonJS({
    "node_modules/react-router-dom/main.js"(exports, module) {
      "use strict";
      module.exports = false ? null : require_react_router_dom_development();
    }
  });

  // node_modules/@remix-run/server-runtime/routeMatching.js
  var require_routeMatching = __commonJS({
    "node_modules/@remix-run/server-runtime/routeMatching.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var reactRouterDom = require_main3();
      function matchServerRoutes(routes, pathname) {
        let matches = reactRouterDom.matchRoutes(routes, pathname);
        if (!matches)
          return null;
        return matches.map((match) => ({
          params: match.params,
          pathname: match.pathname,
          route: match.route
        }));
      }
      exports.matchServerRoutes = matchServerRoutes;
    }
  });

  // node_modules/@remix-run/server-runtime/mode.js
  var require_mode = __commonJS({
    "node_modules/@remix-run/server-runtime/mode.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ServerMode = void 0;
      (function(ServerMode) {
        ServerMode["Development"] = "development";
        ServerMode["Production"] = "production";
        ServerMode["Test"] = "test";
      })(exports.ServerMode || (exports.ServerMode = {}));
      function isServerMode(value) {
        return value === exports.ServerMode.Development || value === exports.ServerMode.Production || value === exports.ServerMode.Test;
      }
      exports.isServerMode = isServerMode;
    }
  });

  // node_modules/@remix-run/server-runtime/routes.js
  var require_routes = __commonJS({
    "node_modules/@remix-run/server-runtime/routes.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function createRoutes(manifest, parentId) {
        return Object.keys(manifest).filter((key) => manifest[key].parentId === parentId).map((id) => ({
          ...manifest[id],
          children: createRoutes(manifest, id)
        }));
      }
      exports.createRoutes = createRoutes;
    }
  });

  // node_modules/@remix-run/server-runtime/routeData.js
  var require_routeData = __commonJS({
    "node_modules/@remix-run/server-runtime/routeData.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var data = require_data();
      async function createRouteData(matches, responses) {
        let data$1 = await Promise.all(responses.map(data.extractData));
        return matches.reduce((memo, match, index) => {
          memo[match.route.id] = data$1[index];
          return memo;
        }, {});
      }
      async function createActionData(response) {
        return data.extractData(response);
      }
      exports.createActionData = createActionData;
      exports.createRouteData = createRouteData;
    }
  });

  // node_modules/jsesc/jsesc.js
  var require_jsesc = __commonJS({
    "node_modules/jsesc/jsesc.js"(exports, module) {
      "use strict";
      var object = {};
      var hasOwnProperty = object.hasOwnProperty;
      var forOwn = (object2, callback) => {
        for (const key in object2) {
          if (hasOwnProperty.call(object2, key)) {
            callback(key, object2[key]);
          }
        }
      };
      var extend = (destination, source) => {
        if (!source) {
          return destination;
        }
        forOwn(source, (key, value) => {
          destination[key] = value;
        });
        return destination;
      };
      var forEach = (array, callback) => {
        const length = array.length;
        let index = -1;
        while (++index < length) {
          callback(array[index]);
        }
      };
      var fourHexEscape = (hex) => {
        return "\\u" + ("0000" + hex).slice(-4);
      };
      var hexadecimal = (code, lowercase) => {
        let hexadecimal2 = code.toString(16);
        if (lowercase)
          return hexadecimal2;
        return hexadecimal2.toUpperCase();
      };
      var toString = object.toString;
      var isArray = Array.isArray;
      var isBuffer = (value) => {
        return typeof Buffer === "function" && Buffer.isBuffer(value);
      };
      var isObject = (value) => {
        return toString.call(value) == "[object Object]";
      };
      var isString = (value) => {
        return typeof value == "string" || toString.call(value) == "[object String]";
      };
      var isNumber = (value) => {
        return typeof value == "number" || toString.call(value) == "[object Number]";
      };
      var isFunction = (value) => {
        return typeof value == "function";
      };
      var isMap = (value) => {
        return toString.call(value) == "[object Map]";
      };
      var isSet = (value) => {
        return toString.call(value) == "[object Set]";
      };
      var singleEscapes = {
        "\\": "\\\\",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "	": "\\t"
      };
      var regexSingleEscape = /[\\\b\f\n\r\t]/;
      var regexDigit = /[0-9]/;
      var regexWhitespace = /[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
      var escapeEverythingRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^]/g;
      var escapeNonAsciiRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^ !#-&\(-\[\]-_a-~]/g;
      var jsesc = (argument, options) => {
        const increaseIndentation = () => {
          oldIndent = indent;
          ++options.indentLevel;
          indent = options.indent.repeat(options.indentLevel);
        };
        const defaults = {
          "escapeEverything": false,
          "minimal": false,
          "isScriptContext": false,
          "quotes": "single",
          "wrap": false,
          "es6": false,
          "json": false,
          "compact": true,
          "lowercaseHex": false,
          "numbers": "decimal",
          "indent": "	",
          "indentLevel": 0,
          "__inline1__": false,
          "__inline2__": false
        };
        const json2 = options && options.json;
        if (json2) {
          defaults.quotes = "double";
          defaults.wrap = true;
        }
        options = extend(defaults, options);
        if (options.quotes != "single" && options.quotes != "double" && options.quotes != "backtick") {
          options.quotes = "single";
        }
        const quote = options.quotes == "double" ? '"' : options.quotes == "backtick" ? "`" : "'";
        const compact = options.compact;
        const lowercaseHex = options.lowercaseHex;
        let indent = options.indent.repeat(options.indentLevel);
        let oldIndent = "";
        const inline1 = options.__inline1__;
        const inline2 = options.__inline2__;
        const newLine = compact ? "" : "\n";
        let result;
        let isEmpty = true;
        const useBinNumbers = options.numbers == "binary";
        const useOctNumbers = options.numbers == "octal";
        const useDecNumbers = options.numbers == "decimal";
        const useHexNumbers = options.numbers == "hexadecimal";
        if (json2 && argument && isFunction(argument.toJSON)) {
          argument = argument.toJSON();
        }
        if (!isString(argument)) {
          if (isMap(argument)) {
            if (argument.size == 0) {
              return "new Map()";
            }
            if (!compact) {
              options.__inline1__ = true;
              options.__inline2__ = false;
            }
            return "new Map(" + jsesc(Array.from(argument), options) + ")";
          }
          if (isSet(argument)) {
            if (argument.size == 0) {
              return "new Set()";
            }
            return "new Set(" + jsesc(Array.from(argument), options) + ")";
          }
          if (isBuffer(argument)) {
            if (argument.length == 0) {
              return "Buffer.from([])";
            }
            return "Buffer.from(" + jsesc(Array.from(argument), options) + ")";
          }
          if (isArray(argument)) {
            result = [];
            options.wrap = true;
            if (inline1) {
              options.__inline1__ = false;
              options.__inline2__ = true;
            }
            if (!inline2) {
              increaseIndentation();
            }
            forEach(argument, (value) => {
              isEmpty = false;
              if (inline2) {
                options.__inline2__ = false;
              }
              result.push((compact || inline2 ? "" : indent) + jsesc(value, options));
            });
            if (isEmpty) {
              return "[]";
            }
            if (inline2) {
              return "[" + result.join(", ") + "]";
            }
            return "[" + newLine + result.join("," + newLine) + newLine + (compact ? "" : oldIndent) + "]";
          } else if (isNumber(argument)) {
            if (json2) {
              return JSON.stringify(argument);
            }
            if (useDecNumbers) {
              return String(argument);
            }
            if (useHexNumbers) {
              let hexadecimal2 = argument.toString(16);
              if (!lowercaseHex) {
                hexadecimal2 = hexadecimal2.toUpperCase();
              }
              return "0x" + hexadecimal2;
            }
            if (useBinNumbers) {
              return "0b" + argument.toString(2);
            }
            if (useOctNumbers) {
              return "0o" + argument.toString(8);
            }
          } else if (!isObject(argument)) {
            if (json2) {
              return JSON.stringify(argument) || "null";
            }
            return String(argument);
          } else {
            result = [];
            options.wrap = true;
            increaseIndentation();
            forOwn(argument, (key, value) => {
              isEmpty = false;
              result.push((compact ? "" : indent) + jsesc(key, options) + ":" + (compact ? "" : " ") + jsesc(value, options));
            });
            if (isEmpty) {
              return "{}";
            }
            return "{" + newLine + result.join("," + newLine) + newLine + (compact ? "" : oldIndent) + "}";
          }
        }
        const regex = options.escapeEverything ? escapeEverythingRegex : escapeNonAsciiRegex;
        result = argument.replace(regex, (char, pair, lone, quoteChar, index, string) => {
          if (pair) {
            if (options.minimal)
              return pair;
            const first = pair.charCodeAt(0);
            const second = pair.charCodeAt(1);
            if (options.es6) {
              const codePoint = (first - 55296) * 1024 + second - 56320 + 65536;
              const hex2 = hexadecimal(codePoint, lowercaseHex);
              return "\\u{" + hex2 + "}";
            }
            return fourHexEscape(hexadecimal(first, lowercaseHex)) + fourHexEscape(hexadecimal(second, lowercaseHex));
          }
          if (lone) {
            return fourHexEscape(hexadecimal(lone.charCodeAt(0), lowercaseHex));
          }
          if (char == "\0" && !json2 && !regexDigit.test(string.charAt(index + 1))) {
            return "\\0";
          }
          if (quoteChar) {
            if (quoteChar == quote || options.escapeEverything) {
              return "\\" + quoteChar;
            }
            return quoteChar;
          }
          if (regexSingleEscape.test(char)) {
            return singleEscapes[char];
          }
          if (options.minimal && !regexWhitespace.test(char)) {
            return char;
          }
          const hex = hexadecimal(char.charCodeAt(0), lowercaseHex);
          if (json2 || hex.length > 2) {
            return fourHexEscape(hex);
          }
          return "\\x" + ("00" + hex).slice(-2);
        });
        if (quote == "`") {
          result = result.replace(/\$\{/g, "\\${");
        }
        if (options.isScriptContext) {
          result = result.replace(/<\/(script|style)/gi, "<\\/$1").replace(/<!--/g, json2 ? "\\u003C!--" : "\\x3C!--");
        }
        if (options.wrap) {
          result = quote + result + quote;
        }
        return result;
      };
      jsesc.version = "3.0.2";
      module.exports = jsesc;
    }
  });

  // node_modules/@remix-run/server-runtime/serverHandoff.js
  var require_serverHandoff = __commonJS({
    "node_modules/@remix-run/server-runtime/serverHandoff.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var jsesc = require_jsesc();
      function _interopDefaultLegacy(e) {
        return e && typeof e === "object" && "default" in e ? e : { "default": e };
      }
      var jsesc__default = /* @__PURE__ */ _interopDefaultLegacy(jsesc);
      function createServerHandoffString(serverHandoff) {
        return jsesc__default["default"](serverHandoff, {
          isScriptContext: true
        });
      }
      exports.createServerHandoffString = createServerHandoffString;
    }
  });

  // node_modules/@remix-run/server-runtime/server.js
  var require_server = __commonJS({
    "node_modules/@remix-run/server-runtime/server.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var data = require_data();
      var entry = require_entry();
      var errors = require_errors();
      var headers = require_headers();
      var routeMatching = require_routeMatching();
      var mode = require_mode();
      var routes = require_routes();
      var routeData = require_routeData();
      var responses = require_responses();
      var serverHandoff = require_serverHandoff();
      function getRequestType(request, matches) {
        if (isDataRequest(request)) {
          return "data";
        }
        if (!matches) {
          return "document";
        }
        let match = matches.slice(-1)[0];
        if (!match.route.module.default) {
          return "resource";
        }
        return "document";
      }
      function createRequestHandler(build2, platform, mode$1) {
        let routes$1 = routes.createRoutes(build2.routes);
        let serverMode = mode.isServerMode(mode$1) ? mode$1 : mode.ServerMode.Production;
        return async (request, loadContext = {}) => {
          let url = new URL(request.url);
          let matches = routeMatching.matchServerRoutes(routes$1, url.pathname);
          let requestType = getRequestType(request, matches);
          let response;
          switch (requestType) {
            case "data":
              response = await handleDataRequest(request, loadContext, build2, platform, matches);
              break;
            case "document":
              response = await handleDocumentRequest(request, loadContext, build2, platform, routes$1, serverMode);
              break;
            case "resource":
              response = await handleResourceRequest(request, loadContext, build2, platform, matches);
              break;
          }
          if (isHeadRequest(request)) {
            return new Response(null, {
              headers: response.headers,
              status: response.status,
              statusText: response.statusText
            });
          }
          return response;
        };
      }
      async function handleResourceRequest(request, loadContext, build2, platform, matches) {
        let url = new URL(request.url);
        if (!matches) {
          return jsonError(`No route matches URL "${url.pathname}"`, 404);
        }
        let routeMatch = matches.slice(-1)[0];
        try {
          return isActionRequest(request) ? await data.callRouteAction(build2, routeMatch.route.id, request, loadContext, routeMatch.params) : await data.loadRouteData(build2, routeMatch.route.id, request, loadContext, routeMatch.params);
        } catch (error) {
          var _platform$formatServe;
          let formattedError = await ((_platform$formatServe = platform.formatServerError) === null || _platform$formatServe === void 0 ? void 0 : _platform$formatServe.call(platform, error)) || error;
          throw formattedError;
        }
      }
      async function handleDataRequest(request, loadContext, build2, platform, matches) {
        if (!isValidRequestMethod(request)) {
          return jsonError(`Invalid request method "${request.method}"`, 405);
        }
        let url = new URL(request.url);
        if (!matches) {
          return jsonError(`No route matches URL "${url.pathname}"`, 404);
        }
        let routeMatch;
        if (isActionRequest(request)) {
          routeMatch = matches[matches.length - 1];
          if (!isIndexRequestUrl(url) && matches[matches.length - 1].route.id.endsWith("/index")) {
            routeMatch = matches[matches.length - 2];
          }
        } else {
          let routeId = url.searchParams.get("_data");
          if (!routeId) {
            return jsonError(`Missing route id in ?_data`, 403);
          }
          let match = matches.find((match2) => match2.route.id === routeId);
          if (!match) {
            return jsonError(`Route "${routeId}" does not match URL "${url.pathname}"`, 403);
          }
          routeMatch = match;
        }
        let clonedRequest = stripIndexParam(stripDataParam(request));
        let response;
        try {
          response = isActionRequest(request) ? await data.callRouteAction(build2, routeMatch.route.id, clonedRequest, loadContext, routeMatch.params) : await data.loadRouteData(build2, routeMatch.route.id, clonedRequest, loadContext, routeMatch.params);
        } catch (error) {
          var _platform$formatServe2;
          let formattedError = await ((_platform$formatServe2 = platform.formatServerError) === null || _platform$formatServe2 === void 0 ? void 0 : _platform$formatServe2.call(platform, error)) || error;
          response = responses.json(await errors.serializeError(formattedError), {
            status: 500,
            headers: {
              "X-Remix-Error": "unfortunately, yes"
            }
          });
        }
        if (data.isRedirectResponse(response)) {
          let headers2 = new Headers(response.headers);
          headers2.set("X-Remix-Redirect", headers2.get("Location"));
          headers2.delete("Location");
          return new Response("", {
            status: 204,
            headers: headers2
          });
        }
        if (build2.entry.module.handleDataRequest) {
          clonedRequest = stripIndexParam(stripDataParam(request));
          return build2.entry.module.handleDataRequest(response, {
            request: clonedRequest,
            context: loadContext,
            params: routeMatch.params
          });
        }
        return response;
      }
      async function handleDocumentRequest(request, loadContext, build2, platform, routes2, serverMode) {
        let url = new URL(request.url);
        let requestState = isValidRequestMethod(request) ? "ok" : "invalid-request";
        let matches = requestState === "ok" ? routeMatching.matchServerRoutes(routes2, url.pathname) : null;
        if (!matches) {
          if (requestState === "ok") {
            requestState = "no-match";
          }
          matches = [{
            params: {},
            pathname: "",
            route: routes2[0]
          }];
        }
        let componentDidCatchEmulator = {
          trackBoundaries: true,
          trackCatchBoundaries: true,
          catchBoundaryRouteId: null,
          renderBoundaryRouteId: null,
          loaderBoundaryRouteId: null,
          error: void 0,
          catch: void 0
        };
        let responseState = "ok";
        let actionResponse;
        let actionRouteId;
        if (requestState !== "ok") {
          responseState = "caught";
          componentDidCatchEmulator.trackCatchBoundaries = false;
          let withBoundaries = getMatchesUpToDeepestBoundary(matches, "CatchBoundary");
          componentDidCatchEmulator.catchBoundaryRouteId = withBoundaries.length > 0 ? withBoundaries[withBoundaries.length - 1].route.id : null;
          componentDidCatchEmulator.catch = {
            status: requestState === "no-match" ? 404 : 405,
            statusText: requestState === "no-match" ? "Not Found" : "Method Not Allowed",
            data: null
          };
        } else if (isActionRequest(request)) {
          let actionMatch = matches[matches.length - 1];
          if (!isIndexRequestUrl(url) && actionMatch.route.id.endsWith("/index")) {
            actionMatch = matches[matches.length - 2];
          }
          actionRouteId = actionMatch.route.id;
          try {
            let clonedRequest = stripIndexParam(stripDataParam(request));
            actionResponse = await data.callRouteAction(build2, actionMatch.route.id, clonedRequest, loadContext, actionMatch.params);
            if (data.isRedirectResponse(actionResponse)) {
              return actionResponse;
            }
          } catch (error) {
            var _platform$formatServe3;
            let formattedError = await ((_platform$formatServe3 = platform.formatServerError) === null || _platform$formatServe3 === void 0 ? void 0 : _platform$formatServe3.call(platform, error)) || error;
            responseState = "error";
            let withBoundaries = getMatchesUpToDeepestBoundary(matches, "ErrorBoundary");
            componentDidCatchEmulator.loaderBoundaryRouteId = withBoundaries[withBoundaries.length - 1].route.id;
            componentDidCatchEmulator.error = await errors.serializeError(formattedError);
          }
        }
        if (actionResponse && data.isCatchResponse(actionResponse)) {
          responseState = "caught";
          let withBoundaries = getMatchesUpToDeepestBoundary(matches, "CatchBoundary");
          componentDidCatchEmulator.trackCatchBoundaries = false;
          componentDidCatchEmulator.catchBoundaryRouteId = withBoundaries[withBoundaries.length - 1].route.id;
          componentDidCatchEmulator.catch = {
            status: actionResponse.status,
            statusText: actionResponse.statusText,
            data: await data.extractData(actionResponse.clone())
          };
        }
        let matchesToLoad = requestState !== "ok" ? [] : matches;
        switch (responseState) {
          case "caught":
            matchesToLoad = getMatchesUpToDeepestBoundary(matches.slice(0, -1), "CatchBoundary");
            break;
          case "error":
            matchesToLoad = getMatchesUpToDeepestBoundary(matches.slice(0, -1), "ErrorBoundary");
            break;
        }
        let routeLoaderPromises = matchesToLoad.map((match) => data.loadRouteData(build2, match.route.id, stripIndexParam(stripDataParam(request.clone())), loadContext, match.params).catch((error) => error));
        let routeLoaderResults = await Promise.all(routeLoaderPromises);
        for (let [index, response2] of routeLoaderResults.entries()) {
          let route = matches[index].route;
          let routeModule = build2.routes[route.id].module;
          if (responseState === "error" && (response2 instanceof Error || data.isRedirectResponse(response2)) || responseState === "caught" && data.isCatchResponse(response2)) {
            break;
          }
          if (componentDidCatchEmulator.catch || componentDidCatchEmulator.error) {
            continue;
          }
          if (routeModule.CatchBoundary) {
            componentDidCatchEmulator.catchBoundaryRouteId = route.id;
          }
          if (routeModule.ErrorBoundary) {
            componentDidCatchEmulator.loaderBoundaryRouteId = route.id;
          }
          if (response2 instanceof Error) {
            var _platform$formatServe4;
            if (serverMode !== mode.ServerMode.Test) {
              console.error(`There was an error running the data loader for route ${route.id}`);
            }
            let formattedError = await ((_platform$formatServe4 = platform.formatServerError) === null || _platform$formatServe4 === void 0 ? void 0 : _platform$formatServe4.call(platform, response2)) || response2;
            componentDidCatchEmulator.error = await errors.serializeError(formattedError);
            routeLoaderResults[index] = responses.json(null, {
              status: 500
            });
          } else if (data.isRedirectResponse(response2)) {
            return response2;
          } else if (data.isCatchResponse(response2)) {
            componentDidCatchEmulator.trackCatchBoundaries = false;
            componentDidCatchEmulator.catch = {
              status: response2.status,
              statusText: response2.statusText,
              data: await data.extractData(response2.clone())
            };
            routeLoaderResults[index] = responses.json(null, {
              status: response2.status
            });
          }
        }
        let routeLoaderResponses = routeLoaderResults;
        let notOkResponse = [actionResponse, ...routeLoaderResponses].find((response2) => response2 && response2.status !== 200);
        let statusCode = requestState === "no-match" ? 404 : requestState === "invalid-request" ? 405 : responseState === "error" ? 500 : notOkResponse ? notOkResponse.status : 200;
        let renderableMatches = getRenderableMatches(matches, componentDidCatchEmulator);
        let serverEntryModule = build2.entry.module;
        let headers$1 = headers.getDocumentHeaders(build2, renderableMatches, routeLoaderResponses, actionResponse);
        let entryMatches = entry.createEntryMatches(renderableMatches, build2.assets.routes);
        let routeData$1 = await routeData.createRouteData(renderableMatches, routeLoaderResponses);
        let actionData = actionResponse && actionRouteId ? {
          [actionRouteId]: await routeData.createActionData(actionResponse)
        } : void 0;
        let routeModules = entry.createEntryRouteModules(build2.routes);
        let serverHandoff$1 = {
          matches: entryMatches,
          componentDidCatchEmulator,
          routeData: routeData$1,
          actionData
        };
        let entryContext = {
          ...serverHandoff$1,
          manifest: build2.assets,
          routeModules,
          serverHandoffString: serverHandoff.createServerHandoffString(serverHandoff$1)
        };
        let response;
        try {
          response = await serverEntryModule.default(request, statusCode, headers$1, entryContext);
        } catch (error) {
          var _platform$formatServe5;
          let formattedError = await ((_platform$formatServe5 = platform.formatServerError) === null || _platform$formatServe5 === void 0 ? void 0 : _platform$formatServe5.call(platform, error)) || error;
          if (serverMode !== mode.ServerMode.Test) {
            console.error(formattedError);
          }
          statusCode = 500;
          componentDidCatchEmulator.trackBoundaries = false;
          componentDidCatchEmulator.error = await errors.serializeError(formattedError);
          entryContext.serverHandoffString = serverHandoff.createServerHandoffString(serverHandoff$1);
          try {
            response = await serverEntryModule.default(request, statusCode, headers$1, entryContext);
          } catch (error2) {
            var _platform$formatServe6;
            let formattedError2 = await ((_platform$formatServe6 = platform.formatServerError) === null || _platform$formatServe6 === void 0 ? void 0 : _platform$formatServe6.call(platform, error2)) || error2;
            if (serverMode !== mode.ServerMode.Test) {
              console.error(formattedError2);
            }
            response = new Response(`Unexpected Server Error

${formattedError2.message}`, {
              status: 500,
              headers: {
                "Content-Type": "text/plain"
              }
            });
          }
        }
        return response;
      }
      function jsonError(error, status = 403) {
        return responses.json({
          error
        }, {
          status
        });
      }
      function isActionRequest(request) {
        let method = request.method.toLowerCase();
        return method === "post" || method === "put" || method === "patch" || method === "delete";
      }
      function isValidRequestMethod(request) {
        return request.method.toLowerCase() === "get" || isHeadRequest(request) || isActionRequest(request);
      }
      function isHeadRequest(request) {
        return request.method.toLowerCase() === "head";
      }
      function isDataRequest(request) {
        return new URL(request.url).searchParams.has("_data");
      }
      function isIndexRequestUrl(url) {
        let indexRequest = false;
        for (let param of url.searchParams.getAll("index")) {
          if (!param) {
            indexRequest = true;
          }
        }
        return indexRequest;
      }
      function stripIndexParam(request) {
        let url = new URL(request.url);
        let indexValues = url.searchParams.getAll("index");
        url.searchParams.delete("index");
        let indexValuesToKeep = [];
        for (let indexValue of indexValues) {
          if (indexValue) {
            indexValuesToKeep.push(indexValue);
          }
        }
        for (let toKeep of indexValuesToKeep) {
          url.searchParams.append("index", toKeep);
        }
        return new Request(url.toString(), request);
      }
      function stripDataParam(request) {
        let url = new URL(request.url);
        url.searchParams.delete("_data");
        return new Request(url.toString(), request);
      }
      function getMatchesUpToDeepestBoundary(matches, key) {
        let deepestBoundaryIndex = -1;
        matches.forEach((match, index) => {
          if (match.route.module[key]) {
            deepestBoundaryIndex = index;
          }
        });
        if (deepestBoundaryIndex === -1) {
          return [];
        }
        return matches.slice(0, deepestBoundaryIndex + 1);
      }
      function getRenderableMatches(matches, componentDidCatchEmulator) {
        if (!componentDidCatchEmulator.catch && !componentDidCatchEmulator.error) {
          return matches;
        }
        let lastRenderableIndex = -1;
        matches.forEach((match, index) => {
          let id = match.route.id;
          if (componentDidCatchEmulator.renderBoundaryRouteId === id || componentDidCatchEmulator.loaderBoundaryRouteId === id || componentDidCatchEmulator.catchBoundaryRouteId === id) {
            lastRenderableIndex = index;
          }
        });
        return matches.slice(0, lastRenderableIndex + 1);
      }
      exports.createRequestHandler = createRequestHandler;
    }
  });

  // node_modules/@remix-run/server-runtime/warnings.js
  var require_warnings = __commonJS({
    "node_modules/@remix-run/server-runtime/warnings.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var alreadyWarned = {};
      function warnOnce(condition, message) {
        if (!condition && !alreadyWarned[message]) {
          alreadyWarned[message] = true;
          console.warn(message);
        }
      }
      exports.warnOnce = warnOnce;
    }
  });

  // node_modules/@remix-run/server-runtime/sessions.js
  var require_sessions = __commonJS({
    "node_modules/@remix-run/server-runtime/sessions.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var cookies = require_cookies();
      var warnings = require_warnings();
      function flash(name) {
        return `__flash_${name}__`;
      }
      function createSession2(initialData = {}, id = "") {
        let map = new Map(Object.entries(initialData));
        return {
          get id() {
            return id;
          },
          get data() {
            return Object.fromEntries(map);
          },
          has(name) {
            return map.has(name) || map.has(flash(name));
          },
          get(name) {
            if (map.has(name))
              return map.get(name);
            let flashName = flash(name);
            if (map.has(flashName)) {
              let value = map.get(flashName);
              map.delete(flashName);
              return value;
            }
            return void 0;
          },
          set(name, value) {
            map.set(name, value);
          },
          flash(name, value) {
            map.set(flash(name), value);
          },
          unset(name) {
            map.delete(name);
          }
        };
      }
      function isSession2(object) {
        return object != null && typeof object.id === "string" && typeof object.data !== "undefined" && typeof object.has === "function" && typeof object.get === "function" && typeof object.set === "function" && typeof object.flash === "function" && typeof object.unset === "function";
      }
      function createSessionStorage2({
        cookie: cookieArg,
        createData,
        readData,
        updateData,
        deleteData
      }) {
        let cookie = cookies.isCookie(cookieArg) ? cookieArg : cookies.createCookie(cookieArg && cookieArg.name || "__session", cookieArg);
        warnOnceAboutSigningSessionCookie(cookie);
        return {
          async getSession(cookieHeader, options) {
            let id = cookieHeader && await cookie.parse(cookieHeader, options);
            let data = id && await readData(id);
            return createSession2(data || {}, id || "");
          },
          async commitSession(session, options) {
            let {
              id,
              data
            } = session;
            if (id) {
              await updateData(id, data, cookie.expires);
            } else {
              id = await createData(data, cookie.expires);
            }
            return cookie.serialize(id, options);
          },
          async destroySession(session, options) {
            await deleteData(session.id);
            return cookie.serialize("", {
              ...options,
              expires: new Date(0)
            });
          }
        };
      }
      function warnOnceAboutSigningSessionCookie(cookie) {
        warnings.warnOnce(cookie.isSigned, `The "${cookie.name}" cookie is not signed, but session cookies should be signed to prevent tampering on the client before they are sent back to the server.`);
      }
      exports.createSession = createSession2;
      exports.createSessionStorage = createSessionStorage2;
      exports.isSession = isSession2;
      exports.warnOnceAboutSigningSessionCookie = warnOnceAboutSigningSessionCookie;
    }
  });

  // node_modules/@remix-run/server-runtime/sessions/cookieStorage.js
  var require_cookieStorage = __commonJS({
    "node_modules/@remix-run/server-runtime/sessions/cookieStorage.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var cookies = require_cookies();
      var sessions = require_sessions();
      function createCookieSessionStorage2({
        cookie: cookieArg
      } = {}) {
        let cookie = cookies.isCookie(cookieArg) ? cookieArg : cookies.createCookie(cookieArg && cookieArg.name || "__session", cookieArg);
        sessions.warnOnceAboutSigningSessionCookie(cookie);
        return {
          async getSession(cookieHeader, options) {
            return sessions.createSession(cookieHeader && await cookie.parse(cookieHeader, options) || {});
          },
          async commitSession(session, options) {
            return cookie.serialize(session.data, options);
          },
          async destroySession(_session, options) {
            return cookie.serialize("", {
              ...options,
              expires: new Date(0)
            });
          }
        };
      }
      exports.createCookieSessionStorage = createCookieSessionStorage2;
    }
  });

  // node_modules/@remix-run/server-runtime/sessions/memoryStorage.js
  var require_memoryStorage = __commonJS({
    "node_modules/@remix-run/server-runtime/sessions/memoryStorage.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var sessions = require_sessions();
      function createMemorySessionStorage2({
        cookie
      } = {}) {
        let uniqueId = 0;
        let map = new Map();
        return sessions.createSessionStorage({
          cookie,
          async createData(data, expires) {
            let id = (++uniqueId).toString();
            map.set(id, {
              data,
              expires
            });
            return id;
          },
          async readData(id) {
            if (map.has(id)) {
              let {
                data,
                expires
              } = map.get(id);
              if (!expires || expires > new Date()) {
                return data;
              }
              if (expires)
                map.delete(id);
            }
            return null;
          },
          async updateData(id, data, expires) {
            map.set(id, {
              data,
              expires
            });
          },
          async deleteData(id) {
            map.delete(id);
          }
        });
      }
      exports.createMemorySessionStorage = createMemorySessionStorage2;
    }
  });

  // node_modules/@remix-run/server-runtime/index.js
  var require_server_runtime = __commonJS({
    "node_modules/@remix-run/server-runtime/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var cookies = require_cookies();
      var responses = require_responses();
      var server = require_server();
      var sessions = require_sessions();
      var cookieStorage = require_cookieStorage();
      var memoryStorage = require_memoryStorage();
      exports.createCookie = cookies.createCookie;
      exports.isCookie = cookies.isCookie;
      exports.json = responses.json;
      exports.redirect = responses.redirect;
      exports.createRequestHandler = server.createRequestHandler;
      exports.createSession = sessions.createSession;
      exports.createSessionStorage = sessions.createSessionStorage;
      exports.isSession = sessions.isSession;
      exports.createCookieSessionStorage = cookieStorage.createCookieSessionStorage;
      exports.createMemorySessionStorage = memoryStorage.createMemorySessionStorage;
    }
  });

  // node_modules/@remix-run/cloudflare-workers/sessions/cloudflareKVSessionStorage.js
  var require_cloudflareKVSessionStorage = __commonJS({
    "node_modules/@remix-run/cloudflare-workers/sessions/cloudflareKVSessionStorage.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var serverRuntime = require_server_runtime();
      function createCloudflareKVSessionStorage2({
        cookie,
        kv
      }) {
        return serverRuntime.createSessionStorage({
          cookie,
          async createData(data, expires) {
            while (true) {
              let randomBytes = new Uint8Array(8);
              crypto.getRandomValues(randomBytes);
              let id = [...randomBytes].map((x) => x.toString(16).padStart(2, "0")).join("");
              if (await kv.get(id, "json")) {
                continue;
              }
              await kv.put(id, JSON.stringify(data), {
                expiration: expires === null || expires === void 0 ? void 0 : expires.getUTCMilliseconds()
              });
              return id;
            }
          },
          async readData(id) {
            let session = await kv.get(id);
            if (!session) {
              return null;
            }
            return JSON.parse(session);
          },
          async updateData(id, data, expires) {
            await kv.put(id, JSON.stringify(data), {
              expiration: expires === null || expires === void 0 ? void 0 : expires.getUTCMilliseconds()
            });
          },
          async deleteData(id) {
            await kv.delete(id);
          }
        });
      }
      exports.createCloudflareKVSessionStorage = createCloudflareKVSessionStorage2;
    }
  });

  // node_modules/mime/Mime.js
  var require_Mime = __commonJS({
    "node_modules/mime/Mime.js"(exports, module) {
      "use strict";
      function Mime() {
        this._types = Object.create(null);
        this._extensions = Object.create(null);
        for (let i = 0; i < arguments.length; i++) {
          this.define(arguments[i]);
        }
        this.define = this.define.bind(this);
        this.getType = this.getType.bind(this);
        this.getExtension = this.getExtension.bind(this);
      }
      Mime.prototype.define = function(typeMap, force) {
        for (let type in typeMap) {
          let extensions = typeMap[type].map(function(t) {
            return t.toLowerCase();
          });
          type = type.toLowerCase();
          for (let i = 0; i < extensions.length; i++) {
            const ext = extensions[i];
            if (ext[0] === "*") {
              continue;
            }
            if (!force && ext in this._types) {
              throw new Error('Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".');
            }
            this._types[ext] = type;
          }
          if (force || !this._extensions[type]) {
            const ext = extensions[0];
            this._extensions[type] = ext[0] !== "*" ? ext : ext.substr(1);
          }
        }
      };
      Mime.prototype.getType = function(path) {
        path = String(path);
        let last = path.replace(/^.*[/\\]/, "").toLowerCase();
        let ext = last.replace(/^.*\./, "").toLowerCase();
        let hasPath = last.length < path.length;
        let hasDot = ext.length < last.length - 1;
        return (hasDot || !hasPath) && this._types[ext] || null;
      };
      Mime.prototype.getExtension = function(type) {
        type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
        return type && this._extensions[type.toLowerCase()] || null;
      };
      module.exports = Mime;
    }
  });

  // node_modules/mime/types/standard.js
  var require_standard = __commonJS({
    "node_modules/mime/types/standard.js"(exports, module) {
      module.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
    }
  });

  // node_modules/mime/types/other.js
  var require_other = __commonJS({
    "node_modules/mime/types/other.js"(exports, module) {
      module.exports = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mapbox-vector-tile": ["mvt"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-iwork-keynote-sffkey": ["*key"], "application/x-iwork-numbers-sffnumbers": ["*numbers"], "application/x-iwork-pages-sffpages": ["*pages"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.sap.vds": ["vds"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
    }
  });

  // node_modules/mime/index.js
  var require_mime = __commonJS({
    "node_modules/mime/index.js"(exports, module) {
      "use strict";
      var Mime = require_Mime();
      module.exports = new Mime(require_standard(), require_other());
    }
  });

  // node_modules/@cloudflare/kv-asset-handler/dist/types.js
  var require_types = __commonJS({
    "node_modules/@cloudflare/kv-asset-handler/dist/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.KVError = void 0;
      var KVError = class extends Error {
        constructor(message, status = 500) {
          super(message);
          Object.setPrototypeOf(this, new.target.prototype);
          this.name = KVError.name;
          this.status = status;
        }
      };
      exports.KVError = KVError;
      var MethodNotAllowedError = class extends KVError {
        constructor(message = `Not a valid request method`, status = 405) {
          super(message, status);
        }
      };
      exports.MethodNotAllowedError = MethodNotAllowedError;
      var NotFoundError = class extends KVError {
        constructor(message = `Not Found`, status = 404) {
          super(message, status);
        }
      };
      exports.NotFoundError = NotFoundError;
      var InternalError = class extends KVError {
        constructor(message = `Internal Error in KV Asset Handler`, status = 500) {
          super(message, status);
        }
      };
      exports.InternalError = InternalError;
    }
  });

  // node_modules/@cloudflare/kv-asset-handler/dist/index.js
  var require_dist = __commonJS({
    "node_modules/@cloudflare/kv-asset-handler/dist/index.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.serveSinglePageApp = exports.mapRequestToAsset = exports.getAssetFromKV = void 0;
      var mime = require_mime();
      var types_1 = require_types();
      Object.defineProperty(exports, "MethodNotAllowedError", { enumerable: true, get: function() {
        return types_1.MethodNotAllowedError;
      } });
      Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function() {
        return types_1.NotFoundError;
      } });
      Object.defineProperty(exports, "InternalError", { enumerable: true, get: function() {
        return types_1.InternalError;
      } });
      var defaultCacheControl = {
        browserTTL: null,
        edgeTTL: 2 * 60 * 60 * 24,
        bypassCache: false
      };
      var parseStringAsObject = (maybeString) => typeof maybeString === "string" ? JSON.parse(maybeString) : maybeString;
      var getAssetFromKVDefaultOptions = {
        ASSET_NAMESPACE: typeof __STATIC_CONTENT !== "undefined" ? __STATIC_CONTENT : void 0,
        ASSET_MANIFEST: typeof __STATIC_CONTENT_MANIFEST !== "undefined" ? parseStringAsObject(__STATIC_CONTENT_MANIFEST) : void 0,
        cacheControl: defaultCacheControl,
        defaultMimeType: "text/plain",
        defaultDocument: "index.html"
      };
      function assignOptions(options) {
        return Object.assign({}, getAssetFromKVDefaultOptions, options);
      }
      var mapRequestToAsset = (request, options) => {
        options = assignOptions(options);
        const parsedUrl = new URL(request.url);
        let pathname = parsedUrl.pathname;
        if (pathname.endsWith("/")) {
          pathname = pathname.concat(options.defaultDocument);
        } else if (!mime.getType(pathname)) {
          pathname = pathname.concat("/" + options.defaultDocument);
        }
        parsedUrl.pathname = pathname;
        return new Request(parsedUrl.toString(), request);
      };
      exports.mapRequestToAsset = mapRequestToAsset;
      function serveSinglePageApp(request, options) {
        options = assignOptions(options);
        request = mapRequestToAsset(request, options);
        const parsedUrl = new URL(request.url);
        if (parsedUrl.pathname.endsWith(".html")) {
          return new Request(`${parsedUrl.origin}/${options.defaultDocument}`, request);
        } else {
          return request;
        }
      }
      exports.serveSinglePageApp = serveSinglePageApp;
      var getAssetFromKV = (event, options) => __awaiter(void 0, void 0, void 0, function* () {
        options = assignOptions(options);
        const request = event.request;
        const ASSET_NAMESPACE = options.ASSET_NAMESPACE;
        const ASSET_MANIFEST = parseStringAsObject(options.ASSET_MANIFEST);
        if (typeof ASSET_NAMESPACE === "undefined") {
          throw new types_1.InternalError(`there is no KV namespace bound to the script`);
        }
        const rawPathKey = new URL(request.url).pathname.replace(/^\/+/, "");
        let pathIsEncoded = false;
        let requestKey;
        if (options.mapRequestToAsset) {
          requestKey = options.mapRequestToAsset(request);
        } else if (ASSET_MANIFEST[rawPathKey]) {
          requestKey = request;
        } else if (ASSET_MANIFEST[decodeURIComponent(rawPathKey)]) {
          pathIsEncoded = true;
          requestKey = request;
        } else {
          const mappedRequest = mapRequestToAsset(request);
          const mappedRawPathKey = new URL(mappedRequest.url).pathname.replace(/^\/+/, "");
          if (ASSET_MANIFEST[decodeURIComponent(mappedRawPathKey)]) {
            pathIsEncoded = true;
            requestKey = mappedRequest;
          } else {
            requestKey = mapRequestToAsset(request, options);
          }
        }
        const SUPPORTED_METHODS = ["GET", "HEAD"];
        if (!SUPPORTED_METHODS.includes(requestKey.method)) {
          throw new types_1.MethodNotAllowedError(`${requestKey.method} is not a valid request method`);
        }
        const parsedUrl = new URL(requestKey.url);
        const pathname = pathIsEncoded ? decodeURIComponent(parsedUrl.pathname) : parsedUrl.pathname;
        let pathKey = pathname.replace(/^\/+/, "");
        const cache = caches.default;
        let mimeType = mime.getType(pathKey) || options.defaultMimeType;
        if (mimeType.startsWith("text") || mimeType === "application/javascript") {
          mimeType += "; charset=utf-8";
        }
        let shouldEdgeCache = false;
        if (typeof ASSET_MANIFEST !== "undefined") {
          if (ASSET_MANIFEST[pathKey]) {
            pathKey = ASSET_MANIFEST[pathKey];
            shouldEdgeCache = true;
          }
        }
        let cacheKey = new Request(`${parsedUrl.origin}/${pathKey}`, request);
        const evalCacheOpts = (() => {
          switch (typeof options.cacheControl) {
            case "function":
              return options.cacheControl(request);
            case "object":
              return options.cacheControl;
            default:
              return defaultCacheControl;
          }
        })();
        const formatETag = (entityId = pathKey, validatorType = "strong") => {
          if (!entityId) {
            return "";
          }
          switch (validatorType) {
            case "weak":
              if (!entityId.startsWith("W/")) {
                return `W/${entityId}`;
              }
              return entityId;
            case "strong":
              if (entityId.startsWith(`W/"`)) {
                entityId = entityId.replace("W/", "");
              }
              if (!entityId.endsWith(`"`)) {
                entityId = `"${entityId}"`;
              }
              return entityId;
            default:
              return "";
          }
        };
        options.cacheControl = Object.assign({}, defaultCacheControl, evalCacheOpts);
        if (options.cacheControl.bypassCache || options.cacheControl.edgeTTL === null || request.method == "HEAD") {
          shouldEdgeCache = false;
        }
        const shouldSetBrowserCache = typeof options.cacheControl.browserTTL === "number";
        let response = null;
        if (shouldEdgeCache) {
          response = yield cache.match(cacheKey);
        }
        if (response) {
          if (response.status > 300 && response.status < 400) {
            if (response.body && "cancel" in Object.getPrototypeOf(response.body)) {
              response.body.cancel();
              console.log("Body exists and environment supports readable streams. Body cancelled");
            } else {
              console.log("Environment doesnt support readable streams");
            }
            response = new Response(null, response);
          } else {
            let opts = {
              headers: new Headers(response.headers),
              status: 0,
              statusText: ""
            };
            opts.headers.set("cf-cache-status", "HIT");
            if (response.status) {
              opts.status = response.status;
              opts.statusText = response.statusText;
            } else if (opts.headers.has("Content-Range")) {
              opts.status = 206;
              opts.statusText = "Partial Content";
            } else {
              opts.status = 200;
              opts.statusText = "OK";
            }
            response = new Response(response.body, opts);
          }
        } else {
          const body = yield ASSET_NAMESPACE.get(pathKey, "arrayBuffer");
          if (body === null) {
            throw new types_1.NotFoundError(`could not find ${pathKey} in your content namespace`);
          }
          response = new Response(body);
          if (shouldEdgeCache) {
            response.headers.set("Accept-Ranges", "bytes");
            response.headers.set("Content-Length", body.length);
            if (!response.headers.has("etag")) {
              response.headers.set("etag", formatETag(pathKey, "strong"));
            }
            response.headers.set("Cache-Control", `max-age=${options.cacheControl.edgeTTL}`);
            event.waitUntil(cache.put(cacheKey, response.clone()));
            response.headers.set("CF-Cache-Status", "MISS");
          }
        }
        response.headers.set("Content-Type", mimeType);
        if (response.status === 304) {
          let etag = formatETag(response.headers.get("etag"), "strong");
          let ifNoneMatch = cacheKey.headers.get("if-none-match");
          let proxyCacheStatus = response.headers.get("CF-Cache-Status");
          if (etag) {
            if (ifNoneMatch && ifNoneMatch === etag && proxyCacheStatus === "MISS") {
              response.headers.set("CF-Cache-Status", "EXPIRED");
            } else {
              response.headers.set("CF-Cache-Status", "REVALIDATED");
            }
            response.headers.set("etag", formatETag(etag, "weak"));
          }
        }
        if (shouldSetBrowserCache) {
          response.headers.set("Cache-Control", `max-age=${options.cacheControl.browserTTL}`);
        } else {
          response.headers.delete("Cache-Control");
        }
        return response;
      });
      exports.getAssetFromKV = getAssetFromKV;
    }
  });

  // node_modules/@remix-run/cloudflare-workers/worker.js
  var require_worker = __commonJS({
    "node_modules/@remix-run/cloudflare-workers/worker.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var kvAssetHandler = require_dist();
      var serverRuntime = require_server_runtime();
      function createRequestHandler({
        build: build2,
        getLoadContext,
        mode
      }) {
        let platform = {};
        let handleRequest = serverRuntime.createRequestHandler(build2, platform, mode);
        return (event) => {
          let loadContext = typeof getLoadContext === "function" ? getLoadContext(event) : void 0;
          return handleRequest(event.request, loadContext);
        };
      }
      async function handleAsset(event, build2, options) {
        try {
          if (true) {
            return await kvAssetHandler.getAssetFromKV(event, {
              cacheControl: {
                bypassCache: true
              },
              ...options
            });
          }
          let cacheControl = {};
          let url = new URL(event.request.url);
          let assetpath = build2.assets.url.split("/").slice(0, -1).join("/");
          let requestpath = url.pathname.split("/").slice(0, -1).join("/");
          if (requestpath.startsWith(assetpath)) {
            cacheControl = {
              bypassCache: false,
              edgeTTL: 31536e3,
              browserTTL: 31536e3
            };
          }
          return await kvAssetHandler.getAssetFromKV(event, {
            cacheControl,
            ...options
          });
        } catch (error) {
          if (error instanceof kvAssetHandler.MethodNotAllowedError || error instanceof kvAssetHandler.NotFoundError) {
            return null;
          }
          throw error;
        }
      }
      function createEventHandler2({
        build: build2,
        getLoadContext,
        mode
      }) {
        const handleRequest = createRequestHandler({
          build: build2,
          getLoadContext,
          mode
        });
        const handleEvent = async (event) => {
          let response = await handleAsset(event, build2);
          if (!response) {
            response = await handleRequest(event);
          }
          return response;
        };
        return (event) => {
          try {
            event.respondWith(handleEvent(event));
          } catch (e) {
            if (true) {
              event.respondWith(new Response(e.message || e.toString(), {
                status: 500
              }));
            }
            event.respondWith(new Response("Internal Error", {
              status: 500
            }));
          }
        };
      }
      exports.createEventHandler = createEventHandler2;
      exports.createRequestHandler = createRequestHandler;
      exports.handleAsset = handleAsset;
    }
  });

  // node_modules/@remix-run/cloudflare-workers/index.js
  var require_cloudflare_workers = __commonJS({
    "node_modules/@remix-run/cloudflare-workers/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var globals = require_globals();
      var cloudflareKVSessionStorage = require_cloudflareKVSessionStorage();
      var worker = require_worker();
      globals.installGlobals();
      exports.createCloudflareKVSessionStorage = cloudflareKVSessionStorage.createCloudflareKVSessionStorage;
      exports.createEventHandler = worker.createEventHandler;
      exports.createRequestHandler = worker.createRequestHandler;
      exports.handleAsset = worker.handleAsset;
    }
  });

  // node_modules/react-dom/cjs/react-dom-server.browser.development.js
  var require_react_dom_server_browser_development = __commonJS({
    "node_modules/react-dom/cjs/react-dom-server.browser.development.js"(exports) {
      "use strict";
      if (true) {
        (function() {
          "use strict";
          var React2 = require_react();
          var _assign = require_object_assign();
          function formatProdErrorMessage(code) {
            var url = "https://reactjs.org/docs/error-decoder.html?invariant=" + code;
            for (var i2 = 1; i2 < arguments.length; i2++) {
              url += "&args[]=" + encodeURIComponent(arguments[i2]);
            }
            return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
          }
          var ReactVersion = "17.0.2";
          var ReactSharedInternals = React2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function warn(format) {
            {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              printWarning("warn", format, args);
            }
          }
          function error(format) {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
          function printWarning(level, format, args) {
            {
              var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame2.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
              var argsWithFormat = args.map(function(item) {
                return "" + item;
              });
              argsWithFormat.unshift("Warning: " + format);
              Function.prototype.apply.call(console[level], console, argsWithFormat);
            }
          }
          var REACT_ELEMENT_TYPE = 60103;
          var REACT_PORTAL_TYPE = 60106;
          var REACT_FRAGMENT_TYPE = 60107;
          var REACT_STRICT_MODE_TYPE = 60108;
          var REACT_PROFILER_TYPE = 60114;
          var REACT_PROVIDER_TYPE = 60109;
          var REACT_CONTEXT_TYPE = 60110;
          var REACT_FORWARD_REF_TYPE = 60112;
          var REACT_SUSPENSE_TYPE = 60113;
          var REACT_SUSPENSE_LIST_TYPE = 60120;
          var REACT_MEMO_TYPE = 60115;
          var REACT_LAZY_TYPE = 60116;
          var REACT_BLOCK_TYPE = 60121;
          var REACT_SERVER_BLOCK_TYPE = 60122;
          var REACT_FUNDAMENTAL_TYPE = 60117;
          var REACT_SCOPE_TYPE = 60119;
          var REACT_OPAQUE_ID_TYPE = 60128;
          var REACT_DEBUG_TRACING_MODE_TYPE = 60129;
          var REACT_OFFSCREEN_TYPE = 60130;
          var REACT_LEGACY_HIDDEN_TYPE = 60131;
          if (typeof Symbol === "function" && Symbol.for) {
            var symbolFor = Symbol.for;
            REACT_ELEMENT_TYPE = symbolFor("react.element");
            REACT_PORTAL_TYPE = symbolFor("react.portal");
            REACT_FRAGMENT_TYPE = symbolFor("react.fragment");
            REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode");
            REACT_PROFILER_TYPE = symbolFor("react.profiler");
            REACT_PROVIDER_TYPE = symbolFor("react.provider");
            REACT_CONTEXT_TYPE = symbolFor("react.context");
            REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref");
            REACT_SUSPENSE_TYPE = symbolFor("react.suspense");
            REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list");
            REACT_MEMO_TYPE = symbolFor("react.memo");
            REACT_LAZY_TYPE = symbolFor("react.lazy");
            REACT_BLOCK_TYPE = symbolFor("react.block");
            REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block");
            REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental");
            REACT_SCOPE_TYPE = symbolFor("react.scope");
            REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id");
            REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode");
            REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen");
            REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
          }
          function getWrappedName(outerType, innerType, wrapperName) {
            var functionName = innerType.displayName || innerType.name || "";
            return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
          }
          function getContextName(type) {
            return type.displayName || "Context";
          }
          function getComponentName(type) {
            if (type == null) {
              return null;
            }
            {
              if (typeof type.tag === "number") {
                error("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue.");
              }
            }
            if (typeof type === "function") {
              return type.displayName || type.name || null;
            }
            if (typeof type === "string") {
              return type;
            }
            switch (type) {
              case REACT_FRAGMENT_TYPE:
                return "Fragment";
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_PROFILER_TYPE:
                return "Profiler";
              case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
              case REACT_SUSPENSE_TYPE:
                return "Suspense";
              case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_CONTEXT_TYPE:
                  var context = type;
                  return getContextName(context) + ".Consumer";
                case REACT_PROVIDER_TYPE:
                  var provider = type;
                  return getContextName(provider._context) + ".Provider";
                case REACT_FORWARD_REF_TYPE:
                  return getWrappedName(type, type.render, "ForwardRef");
                case REACT_MEMO_TYPE:
                  return getComponentName(type.type);
                case REACT_BLOCK_TYPE:
                  return getComponentName(type._render);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return getComponentName(init(payload));
                  } catch (x) {
                    return null;
                  }
                }
              }
            }
            return null;
          }
          var enableSuspenseServerRenderer = false;
          var disabledDepth = 0;
          var prevLog;
          var prevInfo;
          var prevWarn;
          var prevError;
          var prevGroup;
          var prevGroupCollapsed;
          var prevGroupEnd;
          function disabledLog() {
          }
          disabledLog.__reactDisabledLog = true;
          function disableLogs() {
            {
              if (disabledDepth === 0) {
                prevLog = console.log;
                prevInfo = console.info;
                prevWarn = console.warn;
                prevError = console.error;
                prevGroup = console.group;
                prevGroupCollapsed = console.groupCollapsed;
                prevGroupEnd = console.groupEnd;
                var props = {
                  configurable: true,
                  enumerable: true,
                  value: disabledLog,
                  writable: true
                };
                Object.defineProperties(console, {
                  info: props,
                  log: props,
                  warn: props,
                  error: props,
                  group: props,
                  groupCollapsed: props,
                  groupEnd: props
                });
              }
              disabledDepth++;
            }
          }
          function reenableLogs() {
            {
              disabledDepth--;
              if (disabledDepth === 0) {
                var props = {
                  configurable: true,
                  enumerable: true,
                  writable: true
                };
                Object.defineProperties(console, {
                  log: _assign({}, props, {
                    value: prevLog
                  }),
                  info: _assign({}, props, {
                    value: prevInfo
                  }),
                  warn: _assign({}, props, {
                    value: prevWarn
                  }),
                  error: _assign({}, props, {
                    value: prevError
                  }),
                  group: _assign({}, props, {
                    value: prevGroup
                  }),
                  groupCollapsed: _assign({}, props, {
                    value: prevGroupCollapsed
                  }),
                  groupEnd: _assign({}, props, {
                    value: prevGroupEnd
                  })
                });
              }
              if (disabledDepth < 0) {
                error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
              }
            }
          }
          var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
          var prefix;
          function describeBuiltInComponentFrame(name, source, ownerFn) {
            {
              if (prefix === void 0) {
                try {
                  throw Error();
                } catch (x) {
                  var match = x.stack.trim().match(/\n( *(at )?)/);
                  prefix = match && match[1] || "";
                }
              }
              return "\n" + prefix + name;
            }
          }
          var reentry = false;
          var componentFrameCache;
          {
            var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
            componentFrameCache = new PossiblyWeakMap();
          }
          function describeNativeComponentFrame(fn, construct) {
            if (!fn || reentry) {
              return "";
            }
            {
              var frame = componentFrameCache.get(fn);
              if (frame !== void 0) {
                return frame;
              }
            }
            var control;
            reentry = true;
            var previousPrepareStackTrace = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var previousDispatcher;
            {
              previousDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = null;
              disableLogs();
            }
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x) {
                    control = x;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x) {
                  control = x;
                }
                fn();
              }
            } catch (sample) {
              if (sample && control && typeof sample.stack === "string") {
                var sampleLines = sample.stack.split("\n");
                var controlLines = control.stack.split("\n");
                var s = sampleLines.length - 1;
                var c = controlLines.length - 1;
                while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                  c--;
                }
                for (; s >= 1 && c >= 0; s--, c--) {
                  if (sampleLines[s] !== controlLines[c]) {
                    if (s !== 1 || c !== 1) {
                      do {
                        s--;
                        c--;
                        if (c < 0 || sampleLines[s] !== controlLines[c]) {
                          var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                          {
                            if (typeof fn === "function") {
                              componentFrameCache.set(fn, _frame);
                            }
                          }
                          return _frame;
                        }
                      } while (s >= 1 && c >= 0);
                    }
                    break;
                  }
                }
              }
            } finally {
              reentry = false;
              {
                ReactCurrentDispatcher.current = previousDispatcher;
                reenableLogs();
              }
              Error.prepareStackTrace = previousPrepareStackTrace;
            }
            var name = fn ? fn.displayName || fn.name : "";
            var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
            {
              if (typeof fn === "function") {
                componentFrameCache.set(fn, syntheticFrame);
              }
            }
            return syntheticFrame;
          }
          function describeFunctionComponentFrame(fn, source, ownerFn) {
            {
              return describeNativeComponentFrame(fn, false);
            }
          }
          function shouldConstruct(Component) {
            var prototype = Component.prototype;
            return !!(prototype && prototype.isReactComponent);
          }
          function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
            if (type == null) {
              return "";
            }
            if (typeof type === "function") {
              {
                return describeNativeComponentFrame(type, shouldConstruct(type));
              }
            }
            if (typeof type === "string") {
              return describeBuiltInComponentFrame(type);
            }
            switch (type) {
              case REACT_SUSPENSE_TYPE:
                return describeBuiltInComponentFrame("Suspense");
              case REACT_SUSPENSE_LIST_TYPE:
                return describeBuiltInComponentFrame("SuspenseList");
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE:
                  return describeFunctionComponentFrame(type.render);
                case REACT_MEMO_TYPE:
                  return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
                case REACT_BLOCK_TYPE:
                  return describeFunctionComponentFrame(type._render);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                  } catch (x) {
                  }
                }
              }
            }
            return "";
          }
          var loggedTypeFailures = {};
          var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
          function setCurrentlyValidatingElement(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                ReactDebugCurrentFrame.setExtraStackFrame(stack);
              } else {
                ReactDebugCurrentFrame.setExtraStackFrame(null);
              }
            }
          }
          function checkPropTypes(typeSpecs, values, location, componentName, element) {
            {
              var has = Function.call.bind(Object.prototype.hasOwnProperty);
              for (var typeSpecName in typeSpecs) {
                if (has(typeSpecs, typeSpecName)) {
                  var error$1 = void 0;
                  try {
                    if (typeof typeSpecs[typeSpecName] !== "function") {
                      var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                      err.name = "Invariant Violation";
                      throw err;
                    }
                    error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                  } catch (ex) {
                    error$1 = ex;
                  }
                  if (error$1 && !(error$1 instanceof Error)) {
                    setCurrentlyValidatingElement(element);
                    error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                    setCurrentlyValidatingElement(null);
                  }
                  if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                    loggedTypeFailures[error$1.message] = true;
                    setCurrentlyValidatingElement(element);
                    error("Failed %s type: %s", location, error$1.message);
                    setCurrentlyValidatingElement(null);
                  }
                }
              }
            }
          }
          var didWarnAboutInvalidateContextType;
          {
            didWarnAboutInvalidateContextType = new Set();
          }
          var emptyObject = {};
          {
            Object.freeze(emptyObject);
          }
          function maskContext(type, context) {
            var contextTypes = type.contextTypes;
            if (!contextTypes) {
              return emptyObject;
            }
            var maskedContext = {};
            for (var contextName in contextTypes) {
              maskedContext[contextName] = context[contextName];
            }
            return maskedContext;
          }
          function checkContextTypes(typeSpecs, values, location) {
            {
              checkPropTypes(typeSpecs, values, location, "Component");
            }
          }
          function validateContextBounds(context, threadID) {
            for (var i2 = context._threadCount | 0; i2 <= threadID; i2++) {
              context[i2] = context._currentValue2;
              context._threadCount = i2 + 1;
            }
          }
          function processContext(type, context, threadID, isClass) {
            if (isClass) {
              var contextType = type.contextType;
              {
                if ("contextType" in type) {
                  var isValid = contextType === null || contextType !== void 0 && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === void 0;
                  if (!isValid && !didWarnAboutInvalidateContextType.has(type)) {
                    didWarnAboutInvalidateContextType.add(type);
                    var addendum = "";
                    if (contextType === void 0) {
                      addendum = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.";
                    } else if (typeof contextType !== "object") {
                      addendum = " However, it is set to a " + typeof contextType + ".";
                    } else if (contextType.$$typeof === REACT_PROVIDER_TYPE) {
                      addendum = " Did you accidentally pass the Context.Provider instead?";
                    } else if (contextType._context !== void 0) {
                      addendum = " Did you accidentally pass the Context.Consumer instead?";
                    } else {
                      addendum = " However, it is set to an object with keys {" + Object.keys(contextType).join(", ") + "}.";
                    }
                    error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentName(type) || "Component", addendum);
                  }
                }
              }
              if (typeof contextType === "object" && contextType !== null) {
                validateContextBounds(contextType, threadID);
                return contextType[threadID];
              }
              {
                var maskedContext = maskContext(type, context);
                {
                  if (type.contextTypes) {
                    checkContextTypes(type.contextTypes, maskedContext, "context");
                  }
                }
                return maskedContext;
              }
            } else {
              {
                var _maskedContext = maskContext(type, context);
                {
                  if (type.contextTypes) {
                    checkContextTypes(type.contextTypes, _maskedContext, "context");
                  }
                }
                return _maskedContext;
              }
            }
          }
          var nextAvailableThreadIDs = new Uint16Array(16);
          for (var i = 0; i < 15; i++) {
            nextAvailableThreadIDs[i] = i + 1;
          }
          nextAvailableThreadIDs[15] = 0;
          function growThreadCountAndReturnNextAvailable() {
            var oldArray = nextAvailableThreadIDs;
            var oldSize = oldArray.length;
            var newSize = oldSize * 2;
            if (!(newSize <= 65536)) {
              {
                throw Error("Maximum number of concurrent React renderers exceeded. This can happen if you are not properly destroying the Readable provided by React. Ensure that you call .destroy() on it if you no longer want to read from it, and did not read to the end. If you use .pipe() this should be automatic.");
              }
            }
            var newArray = new Uint16Array(newSize);
            newArray.set(oldArray);
            nextAvailableThreadIDs = newArray;
            nextAvailableThreadIDs[0] = oldSize + 1;
            for (var _i = oldSize; _i < newSize - 1; _i++) {
              nextAvailableThreadIDs[_i] = _i + 1;
            }
            nextAvailableThreadIDs[newSize - 1] = 0;
            return oldSize;
          }
          function allocThreadID() {
            var nextID = nextAvailableThreadIDs[0];
            if (nextID === 0) {
              return growThreadCountAndReturnNextAvailable();
            }
            nextAvailableThreadIDs[0] = nextAvailableThreadIDs[nextID];
            return nextID;
          }
          function freeThreadID(id) {
            nextAvailableThreadIDs[id] = nextAvailableThreadIDs[0];
            nextAvailableThreadIDs[0] = id;
          }
          var RESERVED = 0;
          var STRING = 1;
          var BOOLEANISH_STRING = 2;
          var BOOLEAN = 3;
          var OVERLOADED_BOOLEAN = 4;
          var NUMERIC = 5;
          var POSITIVE_NUMERIC = 6;
          var ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
          var ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
          var ROOT_ATTRIBUTE_NAME = "data-reactroot";
          var VALID_ATTRIBUTE_NAME_REGEX = new RegExp("^[" + ATTRIBUTE_NAME_START_CHAR + "][" + ATTRIBUTE_NAME_CHAR + "]*$");
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          var illegalAttributeNameCache = {};
          var validatedAttributeNameCache = {};
          function isAttributeNameSafe(attributeName) {
            if (hasOwnProperty.call(validatedAttributeNameCache, attributeName)) {
              return true;
            }
            if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) {
              return false;
            }
            if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
              validatedAttributeNameCache[attributeName] = true;
              return true;
            }
            illegalAttributeNameCache[attributeName] = true;
            {
              error("Invalid attribute name: `%s`", attributeName);
            }
            return false;
          }
          function shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag) {
            if (propertyInfo !== null) {
              return propertyInfo.type === RESERVED;
            }
            if (isCustomComponentTag) {
              return false;
            }
            if (name.length > 2 && (name[0] === "o" || name[0] === "O") && (name[1] === "n" || name[1] === "N")) {
              return true;
            }
            return false;
          }
          function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
            if (propertyInfo !== null && propertyInfo.type === RESERVED) {
              return false;
            }
            switch (typeof value) {
              case "function":
              case "symbol":
                return true;
              case "boolean": {
                if (isCustomComponentTag) {
                  return false;
                }
                if (propertyInfo !== null) {
                  return !propertyInfo.acceptsBooleans;
                } else {
                  var prefix2 = name.toLowerCase().slice(0, 5);
                  return prefix2 !== "data-" && prefix2 !== "aria-";
                }
              }
              default:
                return false;
            }
          }
          function shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) {
            if (value === null || typeof value === "undefined") {
              return true;
            }
            if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag)) {
              return true;
            }
            if (isCustomComponentTag) {
              return false;
            }
            if (propertyInfo !== null) {
              switch (propertyInfo.type) {
                case BOOLEAN:
                  return !value;
                case OVERLOADED_BOOLEAN:
                  return value === false;
                case NUMERIC:
                  return isNaN(value);
                case POSITIVE_NUMERIC:
                  return isNaN(value) || value < 1;
              }
            }
            return false;
          }
          function getPropertyInfo(name) {
            return properties.hasOwnProperty(name) ? properties[name] : null;
          }
          function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL2, removeEmptyString) {
            this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
            this.attributeName = attributeName;
            this.attributeNamespace = attributeNamespace;
            this.mustUseProperty = mustUseProperty;
            this.propertyName = name;
            this.type = type;
            this.sanitizeURL = sanitizeURL2;
            this.removeEmptyString = removeEmptyString;
          }
          var properties = {};
          var reservedProps = [
            "children",
            "dangerouslySetInnerHTML",
            "defaultValue",
            "defaultChecked",
            "innerHTML",
            "suppressContentEditableWarning",
            "suppressHydrationWarning",
            "style"
          ];
          reservedProps.forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, RESERVED, false, name, null, false, false);
          });
          [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(_ref) {
            var name = _ref[0], attributeName = _ref[1];
            properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, null, false, false);
          });
          ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, name.toLowerCase(), null, false, false);
          });
          ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, name, null, false, false);
          });
          [
            "allowFullScreen",
            "async",
            "autoFocus",
            "autoPlay",
            "controls",
            "default",
            "defer",
            "disabled",
            "disablePictureInPicture",
            "disableRemotePlayback",
            "formNoValidate",
            "hidden",
            "loop",
            "noModule",
            "noValidate",
            "open",
            "playsInline",
            "readOnly",
            "required",
            "reversed",
            "scoped",
            "seamless",
            "itemScope"
          ].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, BOOLEAN, false, name.toLowerCase(), null, false, false);
          });
          [
            "checked",
            "multiple",
            "muted",
            "selected"
          ].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, BOOLEAN, true, name, null, false, false);
          });
          [
            "capture",
            "download"
          ].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, OVERLOADED_BOOLEAN, false, name, null, false, false);
          });
          [
            "cols",
            "rows",
            "size",
            "span"
          ].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, POSITIVE_NUMERIC, false, name, null, false, false);
          });
          ["rowSpan", "start"].forEach(function(name) {
            properties[name] = new PropertyInfoRecord(name, NUMERIC, false, name.toLowerCase(), null, false, false);
          });
          var CAMELIZE = /[\-\:]([a-z])/g;
          var capitalize = function(token) {
            return token[1].toUpperCase();
          };
          [
            "accent-height",
            "alignment-baseline",
            "arabic-form",
            "baseline-shift",
            "cap-height",
            "clip-path",
            "clip-rule",
            "color-interpolation",
            "color-interpolation-filters",
            "color-profile",
            "color-rendering",
            "dominant-baseline",
            "enable-background",
            "fill-opacity",
            "fill-rule",
            "flood-color",
            "flood-opacity",
            "font-family",
            "font-size",
            "font-size-adjust",
            "font-stretch",
            "font-style",
            "font-variant",
            "font-weight",
            "glyph-name",
            "glyph-orientation-horizontal",
            "glyph-orientation-vertical",
            "horiz-adv-x",
            "horiz-origin-x",
            "image-rendering",
            "letter-spacing",
            "lighting-color",
            "marker-end",
            "marker-mid",
            "marker-start",
            "overline-position",
            "overline-thickness",
            "paint-order",
            "panose-1",
            "pointer-events",
            "rendering-intent",
            "shape-rendering",
            "stop-color",
            "stop-opacity",
            "strikethrough-position",
            "strikethrough-thickness",
            "stroke-dasharray",
            "stroke-dashoffset",
            "stroke-linecap",
            "stroke-linejoin",
            "stroke-miterlimit",
            "stroke-opacity",
            "stroke-width",
            "text-anchor",
            "text-decoration",
            "text-rendering",
            "underline-position",
            "underline-thickness",
            "unicode-bidi",
            "unicode-range",
            "units-per-em",
            "v-alphabetic",
            "v-hanging",
            "v-ideographic",
            "v-mathematical",
            "vector-effect",
            "vert-adv-y",
            "vert-origin-x",
            "vert-origin-y",
            "word-spacing",
            "writing-mode",
            "xmlns:xlink",
            "x-height"
          ].forEach(function(attributeName) {
            var name = attributeName.replace(CAMELIZE, capitalize);
            properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, null, false, false);
          });
          [
            "xlink:actuate",
            "xlink:arcrole",
            "xlink:role",
            "xlink:show",
            "xlink:title",
            "xlink:type"
          ].forEach(function(attributeName) {
            var name = attributeName.replace(CAMELIZE, capitalize);
            properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, "http://www.w3.org/1999/xlink", false, false);
          });
          [
            "xml:base",
            "xml:lang",
            "xml:space"
          ].forEach(function(attributeName) {
            var name = attributeName.replace(CAMELIZE, capitalize);
            properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, "http://www.w3.org/XML/1998/namespace", false, false);
          });
          ["tabIndex", "crossOrigin"].forEach(function(attributeName) {
            properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, attributeName.toLowerCase(), null, false, false);
          });
          var xlinkHref = "xlinkHref";
          properties[xlinkHref] = new PropertyInfoRecord("xlinkHref", STRING, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
          ["src", "href", "action", "formAction"].forEach(function(attributeName) {
            properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, attributeName.toLowerCase(), null, true, true);
          });
          var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i;
          var didWarn = false;
          function sanitizeURL(url) {
            {
              if (!didWarn && isJavaScriptProtocol.test(url)) {
                didWarn = true;
                error("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(url));
              }
            }
          }
          var matchHtmlRegExp = /["'&<>]/;
          function escapeHtml(string) {
            var str = "" + string;
            var match = matchHtmlRegExp.exec(str);
            if (!match) {
              return str;
            }
            var escape;
            var html = "";
            var index;
            var lastIndex = 0;
            for (index = match.index; index < str.length; index++) {
              switch (str.charCodeAt(index)) {
                case 34:
                  escape = "&quot;";
                  break;
                case 38:
                  escape = "&amp;";
                  break;
                case 39:
                  escape = "&#x27;";
                  break;
                case 60:
                  escape = "&lt;";
                  break;
                case 62:
                  escape = "&gt;";
                  break;
                default:
                  continue;
              }
              if (lastIndex !== index) {
                html += str.substring(lastIndex, index);
              }
              lastIndex = index + 1;
              html += escape;
            }
            return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
          }
          function escapeTextForBrowser(text) {
            if (typeof text === "boolean" || typeof text === "number") {
              return "" + text;
            }
            return escapeHtml(text);
          }
          function quoteAttributeValueForBrowser(value) {
            return '"' + escapeTextForBrowser(value) + '"';
          }
          function createMarkupForRoot() {
            return ROOT_ATTRIBUTE_NAME + '=""';
          }
          function createMarkupForProperty(name, value) {
            var propertyInfo = getPropertyInfo(name);
            if (name !== "style" && shouldIgnoreAttribute(name, propertyInfo, false)) {
              return "";
            }
            if (shouldRemoveAttribute(name, value, propertyInfo, false)) {
              return "";
            }
            if (propertyInfo !== null) {
              var attributeName = propertyInfo.attributeName;
              var type = propertyInfo.type;
              if (type === BOOLEAN || type === OVERLOADED_BOOLEAN && value === true) {
                return attributeName + '=""';
              } else {
                if (propertyInfo.sanitizeURL) {
                  value = "" + value;
                  sanitizeURL(value);
                }
                return attributeName + "=" + quoteAttributeValueForBrowser(value);
              }
            } else if (isAttributeNameSafe(name)) {
              return name + "=" + quoteAttributeValueForBrowser(value);
            }
            return "";
          }
          function createMarkupForCustomAttribute(name, value) {
            if (!isAttributeNameSafe(name) || value == null) {
              return "";
            }
            return name + "=" + quoteAttributeValueForBrowser(value);
          }
          function is(x, y) {
            return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
          }
          var objectIs = typeof Object.is === "function" ? Object.is : is;
          var currentlyRenderingComponent = null;
          var firstWorkInProgressHook = null;
          var workInProgressHook = null;
          var isReRender = false;
          var didScheduleRenderPhaseUpdate = false;
          var renderPhaseUpdates = null;
          var numberOfReRenders = 0;
          var RE_RENDER_LIMIT = 25;
          var isInHookUserCodeInDev = false;
          var currentHookNameInDev;
          function resolveCurrentlyRenderingComponent() {
            if (!(currentlyRenderingComponent !== null)) {
              {
                throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
              }
            }
            {
              if (isInHookUserCodeInDev) {
                error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
              }
            }
            return currentlyRenderingComponent;
          }
          function areHookInputsEqual(nextDeps, prevDeps) {
            if (prevDeps === null) {
              {
                error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", currentHookNameInDev);
              }
              return false;
            }
            {
              if (nextDeps.length !== prevDeps.length) {
                error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", currentHookNameInDev, "[" + nextDeps.join(", ") + "]", "[" + prevDeps.join(", ") + "]");
              }
            }
            for (var i2 = 0; i2 < prevDeps.length && i2 < nextDeps.length; i2++) {
              if (objectIs(nextDeps[i2], prevDeps[i2])) {
                continue;
              }
              return false;
            }
            return true;
          }
          function createHook() {
            if (numberOfReRenders > 0) {
              {
                {
                  throw Error("Rendered more hooks than during the previous render");
                }
              }
            }
            return {
              memoizedState: null,
              queue: null,
              next: null
            };
          }
          function createWorkInProgressHook() {
            if (workInProgressHook === null) {
              if (firstWorkInProgressHook === null) {
                isReRender = false;
                firstWorkInProgressHook = workInProgressHook = createHook();
              } else {
                isReRender = true;
                workInProgressHook = firstWorkInProgressHook;
              }
            } else {
              if (workInProgressHook.next === null) {
                isReRender = false;
                workInProgressHook = workInProgressHook.next = createHook();
              } else {
                isReRender = true;
                workInProgressHook = workInProgressHook.next;
              }
            }
            return workInProgressHook;
          }
          function prepareToUseHooks(componentIdentity) {
            currentlyRenderingComponent = componentIdentity;
            {
              isInHookUserCodeInDev = false;
            }
          }
          function finishHooks(Component, props, children, refOrContext) {
            while (didScheduleRenderPhaseUpdate) {
              didScheduleRenderPhaseUpdate = false;
              numberOfReRenders += 1;
              workInProgressHook = null;
              children = Component(props, refOrContext);
            }
            resetHooksState();
            return children;
          }
          function resetHooksState() {
            {
              isInHookUserCodeInDev = false;
            }
            currentlyRenderingComponent = null;
            didScheduleRenderPhaseUpdate = false;
            firstWorkInProgressHook = null;
            numberOfReRenders = 0;
            renderPhaseUpdates = null;
            workInProgressHook = null;
          }
          function readContext(context, observedBits) {
            var threadID = currentPartialRenderer.threadID;
            validateContextBounds(context, threadID);
            {
              if (isInHookUserCodeInDev) {
                error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
              }
            }
            return context[threadID];
          }
          function useContext2(context, observedBits) {
            {
              currentHookNameInDev = "useContext";
            }
            resolveCurrentlyRenderingComponent();
            var threadID = currentPartialRenderer.threadID;
            validateContextBounds(context, threadID);
            return context[threadID];
          }
          function basicStateReducer(state, action) {
            return typeof action === "function" ? action(state) : action;
          }
          function useState(initialState) {
            {
              currentHookNameInDev = "useState";
            }
            return useReducer(basicStateReducer, initialState);
          }
          function useReducer(reducer, initialArg, init) {
            {
              if (reducer !== basicStateReducer) {
                currentHookNameInDev = "useReducer";
              }
            }
            currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
            workInProgressHook = createWorkInProgressHook();
            if (isReRender) {
              var queue = workInProgressHook.queue;
              var dispatch = queue.dispatch;
              if (renderPhaseUpdates !== null) {
                var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
                if (firstRenderPhaseUpdate !== void 0) {
                  renderPhaseUpdates.delete(queue);
                  var newState = workInProgressHook.memoizedState;
                  var update = firstRenderPhaseUpdate;
                  do {
                    var action = update.action;
                    {
                      isInHookUserCodeInDev = true;
                    }
                    newState = reducer(newState, action);
                    {
                      isInHookUserCodeInDev = false;
                    }
                    update = update.next;
                  } while (update !== null);
                  workInProgressHook.memoizedState = newState;
                  return [newState, dispatch];
                }
              }
              return [workInProgressHook.memoizedState, dispatch];
            } else {
              {
                isInHookUserCodeInDev = true;
              }
              var initialState;
              if (reducer === basicStateReducer) {
                initialState = typeof initialArg === "function" ? initialArg() : initialArg;
              } else {
                initialState = init !== void 0 ? init(initialArg) : initialArg;
              }
              {
                isInHookUserCodeInDev = false;
              }
              workInProgressHook.memoizedState = initialState;
              var _queue = workInProgressHook.queue = {
                last: null,
                dispatch: null
              };
              var _dispatch = _queue.dispatch = dispatchAction.bind(null, currentlyRenderingComponent, _queue);
              return [workInProgressHook.memoizedState, _dispatch];
            }
          }
          function useMemo(nextCreate, deps) {
            currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
            workInProgressHook = createWorkInProgressHook();
            var nextDeps = deps === void 0 ? null : deps;
            if (workInProgressHook !== null) {
              var prevState = workInProgressHook.memoizedState;
              if (prevState !== null) {
                if (nextDeps !== null) {
                  var prevDeps = prevState[1];
                  if (areHookInputsEqual(nextDeps, prevDeps)) {
                    return prevState[0];
                  }
                }
              }
            }
            {
              isInHookUserCodeInDev = true;
            }
            var nextValue = nextCreate();
            {
              isInHookUserCodeInDev = false;
            }
            workInProgressHook.memoizedState = [nextValue, nextDeps];
            return nextValue;
          }
          function useRef2(initialValue) {
            currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
            workInProgressHook = createWorkInProgressHook();
            var previousRef = workInProgressHook.memoizedState;
            if (previousRef === null) {
              var ref = {
                current: initialValue
              };
              {
                Object.seal(ref);
              }
              workInProgressHook.memoizedState = ref;
              return ref;
            } else {
              return previousRef;
            }
          }
          function useLayoutEffect2(create, inputs) {
            {
              currentHookNameInDev = "useLayoutEffect";
              error("useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.");
            }
          }
          function dispatchAction(componentIdentity, queue, action) {
            if (!(numberOfReRenders < RE_RENDER_LIMIT)) {
              {
                throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
              }
            }
            if (componentIdentity === currentlyRenderingComponent) {
              didScheduleRenderPhaseUpdate = true;
              var update = {
                action,
                next: null
              };
              if (renderPhaseUpdates === null) {
                renderPhaseUpdates = new Map();
              }
              var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
              if (firstRenderPhaseUpdate === void 0) {
                renderPhaseUpdates.set(queue, update);
              } else {
                var lastRenderPhaseUpdate = firstRenderPhaseUpdate;
                while (lastRenderPhaseUpdate.next !== null) {
                  lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
                }
                lastRenderPhaseUpdate.next = update;
              }
            }
          }
          function useCallback2(callback, deps) {
            return useMemo(function() {
              return callback;
            }, deps);
          }
          function useMutableSource(source, getSnapshot, subscribe) {
            resolveCurrentlyRenderingComponent();
            return getSnapshot(source._source);
          }
          function useDeferredValue(value) {
            resolveCurrentlyRenderingComponent();
            return value;
          }
          function useTransition2() {
            resolveCurrentlyRenderingComponent();
            var startTransition = function(callback) {
              callback();
            };
            return [startTransition, false];
          }
          function useOpaqueIdentifier() {
            return (currentPartialRenderer.identifierPrefix || "") + "R:" + (currentPartialRenderer.uniqueID++).toString(36);
          }
          function noop() {
          }
          var currentPartialRenderer = null;
          function setCurrentPartialRenderer(renderer) {
            currentPartialRenderer = renderer;
          }
          var Dispatcher = {
            readContext,
            useContext: useContext2,
            useMemo,
            useReducer,
            useRef: useRef2,
            useState,
            useLayoutEffect: useLayoutEffect2,
            useCallback: useCallback2,
            useImperativeHandle: noop,
            useEffect: noop,
            useDebugValue: noop,
            useDeferredValue,
            useTransition: useTransition2,
            useOpaqueIdentifier,
            useMutableSource
          };
          var HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
          var MATH_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
          var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
          var Namespaces = {
            html: HTML_NAMESPACE,
            mathml: MATH_NAMESPACE,
            svg: SVG_NAMESPACE
          };
          function getIntrinsicNamespace(type) {
            switch (type) {
              case "svg":
                return SVG_NAMESPACE;
              case "math":
                return MATH_NAMESPACE;
              default:
                return HTML_NAMESPACE;
            }
          }
          function getChildNamespace(parentNamespace, type) {
            if (parentNamespace == null || parentNamespace === HTML_NAMESPACE) {
              return getIntrinsicNamespace(type);
            }
            if (parentNamespace === SVG_NAMESPACE && type === "foreignObject") {
              return HTML_NAMESPACE;
            }
            return parentNamespace;
          }
          var hasReadOnlyValue = {
            button: true,
            checkbox: true,
            image: true,
            hidden: true,
            radio: true,
            reset: true,
            submit: true
          };
          function checkControlledValueProps(tagName, props) {
            {
              if (!(hasReadOnlyValue[props.type] || props.onChange || props.onInput || props.readOnly || props.disabled || props.value == null)) {
                error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.");
              }
              if (!(props.onChange || props.readOnly || props.disabled || props.checked == null)) {
                error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
              }
            }
          }
          var omittedCloseTags = {
            area: true,
            base: true,
            br: true,
            col: true,
            embed: true,
            hr: true,
            img: true,
            input: true,
            keygen: true,
            link: true,
            meta: true,
            param: true,
            source: true,
            track: true,
            wbr: true
          };
          var voidElementTags = _assign({
            menuitem: true
          }, omittedCloseTags);
          var HTML = "__html";
          function assertValidProps(tag, props) {
            if (!props) {
              return;
            }
            if (voidElementTags[tag]) {
              if (!(props.children == null && props.dangerouslySetInnerHTML == null)) {
                {
                  throw Error(tag + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
                }
              }
            }
            if (props.dangerouslySetInnerHTML != null) {
              if (!(props.children == null)) {
                {
                  throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
                }
              }
              if (!(typeof props.dangerouslySetInnerHTML === "object" && HTML in props.dangerouslySetInnerHTML)) {
                {
                  throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
                }
              }
            }
            {
              if (!props.suppressContentEditableWarning && props.contentEditable && props.children != null) {
                error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
              }
            }
            if (!(props.style == null || typeof props.style === "object")) {
              {
                throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
              }
            }
          }
          var isUnitlessNumber = {
            animationIterationCount: true,
            borderImageOutset: true,
            borderImageSlice: true,
            borderImageWidth: true,
            boxFlex: true,
            boxFlexGroup: true,
            boxOrdinalGroup: true,
            columnCount: true,
            columns: true,
            flex: true,
            flexGrow: true,
            flexPositive: true,
            flexShrink: true,
            flexNegative: true,
            flexOrder: true,
            gridArea: true,
            gridRow: true,
            gridRowEnd: true,
            gridRowSpan: true,
            gridRowStart: true,
            gridColumn: true,
            gridColumnEnd: true,
            gridColumnSpan: true,
            gridColumnStart: true,
            fontWeight: true,
            lineClamp: true,
            lineHeight: true,
            opacity: true,
            order: true,
            orphans: true,
            tabSize: true,
            widows: true,
            zIndex: true,
            zoom: true,
            fillOpacity: true,
            floodOpacity: true,
            stopOpacity: true,
            strokeDasharray: true,
            strokeDashoffset: true,
            strokeMiterlimit: true,
            strokeOpacity: true,
            strokeWidth: true
          };
          function prefixKey(prefix2, key) {
            return prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
          }
          var prefixes = ["Webkit", "ms", "Moz", "O"];
          Object.keys(isUnitlessNumber).forEach(function(prop) {
            prefixes.forEach(function(prefix2) {
              isUnitlessNumber[prefixKey(prefix2, prop)] = isUnitlessNumber[prop];
            });
          });
          function dangerousStyleValue(name, value, isCustomProperty) {
            var isEmpty = value == null || typeof value === "boolean" || value === "";
            if (isEmpty) {
              return "";
            }
            if (!isCustomProperty && typeof value === "number" && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) {
              return value + "px";
            }
            return ("" + value).trim();
          }
          var uppercasePattern = /([A-Z])/g;
          var msPattern = /^ms-/;
          function hyphenateStyleName(name) {
            return name.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern, "-ms-");
          }
          function isCustomComponent(tagName, props) {
            if (tagName.indexOf("-") === -1) {
              return typeof props.is === "string";
            }
            switch (tagName) {
              case "annotation-xml":
              case "color-profile":
              case "font-face":
              case "font-face-src":
              case "font-face-uri":
              case "font-face-format":
              case "font-face-name":
              case "missing-glyph":
                return false;
              default:
                return true;
            }
          }
          var warnValidStyle = function() {
          };
          {
            var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
            var msPattern$1 = /^-ms-/;
            var hyphenPattern = /-(.)/g;
            var badStyleValueWithSemicolonPattern = /;\s*$/;
            var warnedStyleNames = {};
            var warnedStyleValues = {};
            var warnedForNaNValue = false;
            var warnedForInfinityValue = false;
            var camelize = function(string) {
              return string.replace(hyphenPattern, function(_, character) {
                return character.toUpperCase();
              });
            };
            var warnHyphenatedStyleName = function(name) {
              if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
                return;
              }
              warnedStyleNames[name] = true;
              error("Unsupported style property %s. Did you mean %s?", name, camelize(name.replace(msPattern$1, "ms-")));
            };
            var warnBadVendoredStyleName = function(name) {
              if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
                return;
              }
              warnedStyleNames[name] = true;
              error("Unsupported vendor-prefixed style property %s. Did you mean %s?", name, name.charAt(0).toUpperCase() + name.slice(1));
            };
            var warnStyleValueWithSemicolon = function(name, value) {
              if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
                return;
              }
              warnedStyleValues[value] = true;
              error(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, name, value.replace(badStyleValueWithSemicolonPattern, ""));
            };
            var warnStyleValueIsNaN = function(name, value) {
              if (warnedForNaNValue) {
                return;
              }
              warnedForNaNValue = true;
              error("`NaN` is an invalid value for the `%s` css style property.", name);
            };
            var warnStyleValueIsInfinity = function(name, value) {
              if (warnedForInfinityValue) {
                return;
              }
              warnedForInfinityValue = true;
              error("`Infinity` is an invalid value for the `%s` css style property.", name);
            };
            warnValidStyle = function(name, value) {
              if (name.indexOf("-") > -1) {
                warnHyphenatedStyleName(name);
              } else if (badVendoredStyleNamePattern.test(name)) {
                warnBadVendoredStyleName(name);
              } else if (badStyleValueWithSemicolonPattern.test(value)) {
                warnStyleValueWithSemicolon(name, value);
              }
              if (typeof value === "number") {
                if (isNaN(value)) {
                  warnStyleValueIsNaN(name, value);
                } else if (!isFinite(value)) {
                  warnStyleValueIsInfinity(name, value);
                }
              }
            };
          }
          var warnValidStyle$1 = warnValidStyle;
          var ariaProperties = {
            "aria-current": 0,
            "aria-details": 0,
            "aria-disabled": 0,
            "aria-hidden": 0,
            "aria-invalid": 0,
            "aria-keyshortcuts": 0,
            "aria-label": 0,
            "aria-roledescription": 0,
            "aria-autocomplete": 0,
            "aria-checked": 0,
            "aria-expanded": 0,
            "aria-haspopup": 0,
            "aria-level": 0,
            "aria-modal": 0,
            "aria-multiline": 0,
            "aria-multiselectable": 0,
            "aria-orientation": 0,
            "aria-placeholder": 0,
            "aria-pressed": 0,
            "aria-readonly": 0,
            "aria-required": 0,
            "aria-selected": 0,
            "aria-sort": 0,
            "aria-valuemax": 0,
            "aria-valuemin": 0,
            "aria-valuenow": 0,
            "aria-valuetext": 0,
            "aria-atomic": 0,
            "aria-busy": 0,
            "aria-live": 0,
            "aria-relevant": 0,
            "aria-dropeffect": 0,
            "aria-grabbed": 0,
            "aria-activedescendant": 0,
            "aria-colcount": 0,
            "aria-colindex": 0,
            "aria-colspan": 0,
            "aria-controls": 0,
            "aria-describedby": 0,
            "aria-errormessage": 0,
            "aria-flowto": 0,
            "aria-labelledby": 0,
            "aria-owns": 0,
            "aria-posinset": 0,
            "aria-rowcount": 0,
            "aria-rowindex": 0,
            "aria-rowspan": 0,
            "aria-setsize": 0
          };
          var warnedProperties = {};
          var rARIA = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$");
          var rARIACamel = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
          var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
          function validateProperty(tagName, name) {
            {
              if (hasOwnProperty$1.call(warnedProperties, name) && warnedProperties[name]) {
                return true;
              }
              if (rARIACamel.test(name)) {
                var ariaName = "aria-" + name.slice(4).toLowerCase();
                var correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;
                if (correctName == null) {
                  error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", name);
                  warnedProperties[name] = true;
                  return true;
                }
                if (name !== correctName) {
                  error("Invalid ARIA attribute `%s`. Did you mean `%s`?", name, correctName);
                  warnedProperties[name] = true;
                  return true;
                }
              }
              if (rARIA.test(name)) {
                var lowerCasedName = name.toLowerCase();
                var standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;
                if (standardName == null) {
                  warnedProperties[name] = true;
                  return false;
                }
                if (name !== standardName) {
                  error("Unknown ARIA attribute `%s`. Did you mean `%s`?", name, standardName);
                  warnedProperties[name] = true;
                  return true;
                }
              }
            }
            return true;
          }
          function warnInvalidARIAProps(type, props) {
            {
              var invalidProps = [];
              for (var key in props) {
                var isValid = validateProperty(type, key);
                if (!isValid) {
                  invalidProps.push(key);
                }
              }
              var unknownPropString = invalidProps.map(function(prop) {
                return "`" + prop + "`";
              }).join(", ");
              if (invalidProps.length === 1) {
                error("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
              } else if (invalidProps.length > 1) {
                error("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
              }
            }
          }
          function validateProperties(type, props) {
            if (isCustomComponent(type, props)) {
              return;
            }
            warnInvalidARIAProps(type, props);
          }
          var didWarnValueNull = false;
          function validateProperties$1(type, props) {
            {
              if (type !== "input" && type !== "textarea" && type !== "select") {
                return;
              }
              if (props != null && props.value === null && !didWarnValueNull) {
                didWarnValueNull = true;
                if (type === "select" && props.multiple) {
                  error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", type);
                } else {
                  error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", type);
                }
              }
            }
          }
          var possibleStandardNames = {
            accept: "accept",
            acceptcharset: "acceptCharset",
            "accept-charset": "acceptCharset",
            accesskey: "accessKey",
            action: "action",
            allowfullscreen: "allowFullScreen",
            alt: "alt",
            as: "as",
            async: "async",
            autocapitalize: "autoCapitalize",
            autocomplete: "autoComplete",
            autocorrect: "autoCorrect",
            autofocus: "autoFocus",
            autoplay: "autoPlay",
            autosave: "autoSave",
            capture: "capture",
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            challenge: "challenge",
            charset: "charSet",
            checked: "checked",
            children: "children",
            cite: "cite",
            class: "className",
            classid: "classID",
            classname: "className",
            cols: "cols",
            colspan: "colSpan",
            content: "content",
            contenteditable: "contentEditable",
            contextmenu: "contextMenu",
            controls: "controls",
            controlslist: "controlsList",
            coords: "coords",
            crossorigin: "crossOrigin",
            dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
            data: "data",
            datetime: "dateTime",
            default: "default",
            defaultchecked: "defaultChecked",
            defaultvalue: "defaultValue",
            defer: "defer",
            dir: "dir",
            disabled: "disabled",
            disablepictureinpicture: "disablePictureInPicture",
            disableremoteplayback: "disableRemotePlayback",
            download: "download",
            draggable: "draggable",
            enctype: "encType",
            enterkeyhint: "enterKeyHint",
            for: "htmlFor",
            form: "form",
            formmethod: "formMethod",
            formaction: "formAction",
            formenctype: "formEncType",
            formnovalidate: "formNoValidate",
            formtarget: "formTarget",
            frameborder: "frameBorder",
            headers: "headers",
            height: "height",
            hidden: "hidden",
            high: "high",
            href: "href",
            hreflang: "hrefLang",
            htmlfor: "htmlFor",
            httpequiv: "httpEquiv",
            "http-equiv": "httpEquiv",
            icon: "icon",
            id: "id",
            innerhtml: "innerHTML",
            inputmode: "inputMode",
            integrity: "integrity",
            is: "is",
            itemid: "itemID",
            itemprop: "itemProp",
            itemref: "itemRef",
            itemscope: "itemScope",
            itemtype: "itemType",
            keyparams: "keyParams",
            keytype: "keyType",
            kind: "kind",
            label: "label",
            lang: "lang",
            list: "list",
            loop: "loop",
            low: "low",
            manifest: "manifest",
            marginwidth: "marginWidth",
            marginheight: "marginHeight",
            max: "max",
            maxlength: "maxLength",
            media: "media",
            mediagroup: "mediaGroup",
            method: "method",
            min: "min",
            minlength: "minLength",
            multiple: "multiple",
            muted: "muted",
            name: "name",
            nomodule: "noModule",
            nonce: "nonce",
            novalidate: "noValidate",
            open: "open",
            optimum: "optimum",
            pattern: "pattern",
            placeholder: "placeholder",
            playsinline: "playsInline",
            poster: "poster",
            preload: "preload",
            profile: "profile",
            radiogroup: "radioGroup",
            readonly: "readOnly",
            referrerpolicy: "referrerPolicy",
            rel: "rel",
            required: "required",
            reversed: "reversed",
            role: "role",
            rows: "rows",
            rowspan: "rowSpan",
            sandbox: "sandbox",
            scope: "scope",
            scoped: "scoped",
            scrolling: "scrolling",
            seamless: "seamless",
            selected: "selected",
            shape: "shape",
            size: "size",
            sizes: "sizes",
            span: "span",
            spellcheck: "spellCheck",
            src: "src",
            srcdoc: "srcDoc",
            srclang: "srcLang",
            srcset: "srcSet",
            start: "start",
            step: "step",
            style: "style",
            summary: "summary",
            tabindex: "tabIndex",
            target: "target",
            title: "title",
            type: "type",
            usemap: "useMap",
            value: "value",
            width: "width",
            wmode: "wmode",
            wrap: "wrap",
            about: "about",
            accentheight: "accentHeight",
            "accent-height": "accentHeight",
            accumulate: "accumulate",
            additive: "additive",
            alignmentbaseline: "alignmentBaseline",
            "alignment-baseline": "alignmentBaseline",
            allowreorder: "allowReorder",
            alphabetic: "alphabetic",
            amplitude: "amplitude",
            arabicform: "arabicForm",
            "arabic-form": "arabicForm",
            ascent: "ascent",
            attributename: "attributeName",
            attributetype: "attributeType",
            autoreverse: "autoReverse",
            azimuth: "azimuth",
            basefrequency: "baseFrequency",
            baselineshift: "baselineShift",
            "baseline-shift": "baselineShift",
            baseprofile: "baseProfile",
            bbox: "bbox",
            begin: "begin",
            bias: "bias",
            by: "by",
            calcmode: "calcMode",
            capheight: "capHeight",
            "cap-height": "capHeight",
            clip: "clip",
            clippath: "clipPath",
            "clip-path": "clipPath",
            clippathunits: "clipPathUnits",
            cliprule: "clipRule",
            "clip-rule": "clipRule",
            color: "color",
            colorinterpolation: "colorInterpolation",
            "color-interpolation": "colorInterpolation",
            colorinterpolationfilters: "colorInterpolationFilters",
            "color-interpolation-filters": "colorInterpolationFilters",
            colorprofile: "colorProfile",
            "color-profile": "colorProfile",
            colorrendering: "colorRendering",
            "color-rendering": "colorRendering",
            contentscripttype: "contentScriptType",
            contentstyletype: "contentStyleType",
            cursor: "cursor",
            cx: "cx",
            cy: "cy",
            d: "d",
            datatype: "datatype",
            decelerate: "decelerate",
            descent: "descent",
            diffuseconstant: "diffuseConstant",
            direction: "direction",
            display: "display",
            divisor: "divisor",
            dominantbaseline: "dominantBaseline",
            "dominant-baseline": "dominantBaseline",
            dur: "dur",
            dx: "dx",
            dy: "dy",
            edgemode: "edgeMode",
            elevation: "elevation",
            enablebackground: "enableBackground",
            "enable-background": "enableBackground",
            end: "end",
            exponent: "exponent",
            externalresourcesrequired: "externalResourcesRequired",
            fill: "fill",
            fillopacity: "fillOpacity",
            "fill-opacity": "fillOpacity",
            fillrule: "fillRule",
            "fill-rule": "fillRule",
            filter: "filter",
            filterres: "filterRes",
            filterunits: "filterUnits",
            floodopacity: "floodOpacity",
            "flood-opacity": "floodOpacity",
            floodcolor: "floodColor",
            "flood-color": "floodColor",
            focusable: "focusable",
            fontfamily: "fontFamily",
            "font-family": "fontFamily",
            fontsize: "fontSize",
            "font-size": "fontSize",
            fontsizeadjust: "fontSizeAdjust",
            "font-size-adjust": "fontSizeAdjust",
            fontstretch: "fontStretch",
            "font-stretch": "fontStretch",
            fontstyle: "fontStyle",
            "font-style": "fontStyle",
            fontvariant: "fontVariant",
            "font-variant": "fontVariant",
            fontweight: "fontWeight",
            "font-weight": "fontWeight",
            format: "format",
            from: "from",
            fx: "fx",
            fy: "fy",
            g1: "g1",
            g2: "g2",
            glyphname: "glyphName",
            "glyph-name": "glyphName",
            glyphorientationhorizontal: "glyphOrientationHorizontal",
            "glyph-orientation-horizontal": "glyphOrientationHorizontal",
            glyphorientationvertical: "glyphOrientationVertical",
            "glyph-orientation-vertical": "glyphOrientationVertical",
            glyphref: "glyphRef",
            gradienttransform: "gradientTransform",
            gradientunits: "gradientUnits",
            hanging: "hanging",
            horizadvx: "horizAdvX",
            "horiz-adv-x": "horizAdvX",
            horizoriginx: "horizOriginX",
            "horiz-origin-x": "horizOriginX",
            ideographic: "ideographic",
            imagerendering: "imageRendering",
            "image-rendering": "imageRendering",
            in2: "in2",
            in: "in",
            inlist: "inlist",
            intercept: "intercept",
            k1: "k1",
            k2: "k2",
            k3: "k3",
            k4: "k4",
            k: "k",
            kernelmatrix: "kernelMatrix",
            kernelunitlength: "kernelUnitLength",
            kerning: "kerning",
            keypoints: "keyPoints",
            keysplines: "keySplines",
            keytimes: "keyTimes",
            lengthadjust: "lengthAdjust",
            letterspacing: "letterSpacing",
            "letter-spacing": "letterSpacing",
            lightingcolor: "lightingColor",
            "lighting-color": "lightingColor",
            limitingconeangle: "limitingConeAngle",
            local: "local",
            markerend: "markerEnd",
            "marker-end": "markerEnd",
            markerheight: "markerHeight",
            markermid: "markerMid",
            "marker-mid": "markerMid",
            markerstart: "markerStart",
            "marker-start": "markerStart",
            markerunits: "markerUnits",
            markerwidth: "markerWidth",
            mask: "mask",
            maskcontentunits: "maskContentUnits",
            maskunits: "maskUnits",
            mathematical: "mathematical",
            mode: "mode",
            numoctaves: "numOctaves",
            offset: "offset",
            opacity: "opacity",
            operator: "operator",
            order: "order",
            orient: "orient",
            orientation: "orientation",
            origin: "origin",
            overflow: "overflow",
            overlineposition: "overlinePosition",
            "overline-position": "overlinePosition",
            overlinethickness: "overlineThickness",
            "overline-thickness": "overlineThickness",
            paintorder: "paintOrder",
            "paint-order": "paintOrder",
            panose1: "panose1",
            "panose-1": "panose1",
            pathlength: "pathLength",
            patterncontentunits: "patternContentUnits",
            patterntransform: "patternTransform",
            patternunits: "patternUnits",
            pointerevents: "pointerEvents",
            "pointer-events": "pointerEvents",
            points: "points",
            pointsatx: "pointsAtX",
            pointsaty: "pointsAtY",
            pointsatz: "pointsAtZ",
            prefix: "prefix",
            preservealpha: "preserveAlpha",
            preserveaspectratio: "preserveAspectRatio",
            primitiveunits: "primitiveUnits",
            property: "property",
            r: "r",
            radius: "radius",
            refx: "refX",
            refy: "refY",
            renderingintent: "renderingIntent",
            "rendering-intent": "renderingIntent",
            repeatcount: "repeatCount",
            repeatdur: "repeatDur",
            requiredextensions: "requiredExtensions",
            requiredfeatures: "requiredFeatures",
            resource: "resource",
            restart: "restart",
            result: "result",
            results: "results",
            rotate: "rotate",
            rx: "rx",
            ry: "ry",
            scale: "scale",
            security: "security",
            seed: "seed",
            shaperendering: "shapeRendering",
            "shape-rendering": "shapeRendering",
            slope: "slope",
            spacing: "spacing",
            specularconstant: "specularConstant",
            specularexponent: "specularExponent",
            speed: "speed",
            spreadmethod: "spreadMethod",
            startoffset: "startOffset",
            stddeviation: "stdDeviation",
            stemh: "stemh",
            stemv: "stemv",
            stitchtiles: "stitchTiles",
            stopcolor: "stopColor",
            "stop-color": "stopColor",
            stopopacity: "stopOpacity",
            "stop-opacity": "stopOpacity",
            strikethroughposition: "strikethroughPosition",
            "strikethrough-position": "strikethroughPosition",
            strikethroughthickness: "strikethroughThickness",
            "strikethrough-thickness": "strikethroughThickness",
            string: "string",
            stroke: "stroke",
            strokedasharray: "strokeDasharray",
            "stroke-dasharray": "strokeDasharray",
            strokedashoffset: "strokeDashoffset",
            "stroke-dashoffset": "strokeDashoffset",
            strokelinecap: "strokeLinecap",
            "stroke-linecap": "strokeLinecap",
            strokelinejoin: "strokeLinejoin",
            "stroke-linejoin": "strokeLinejoin",
            strokemiterlimit: "strokeMiterlimit",
            "stroke-miterlimit": "strokeMiterlimit",
            strokewidth: "strokeWidth",
            "stroke-width": "strokeWidth",
            strokeopacity: "strokeOpacity",
            "stroke-opacity": "strokeOpacity",
            suppresscontenteditablewarning: "suppressContentEditableWarning",
            suppresshydrationwarning: "suppressHydrationWarning",
            surfacescale: "surfaceScale",
            systemlanguage: "systemLanguage",
            tablevalues: "tableValues",
            targetx: "targetX",
            targety: "targetY",
            textanchor: "textAnchor",
            "text-anchor": "textAnchor",
            textdecoration: "textDecoration",
            "text-decoration": "textDecoration",
            textlength: "textLength",
            textrendering: "textRendering",
            "text-rendering": "textRendering",
            to: "to",
            transform: "transform",
            typeof: "typeof",
            u1: "u1",
            u2: "u2",
            underlineposition: "underlinePosition",
            "underline-position": "underlinePosition",
            underlinethickness: "underlineThickness",
            "underline-thickness": "underlineThickness",
            unicode: "unicode",
            unicodebidi: "unicodeBidi",
            "unicode-bidi": "unicodeBidi",
            unicoderange: "unicodeRange",
            "unicode-range": "unicodeRange",
            unitsperem: "unitsPerEm",
            "units-per-em": "unitsPerEm",
            unselectable: "unselectable",
            valphabetic: "vAlphabetic",
            "v-alphabetic": "vAlphabetic",
            values: "values",
            vectoreffect: "vectorEffect",
            "vector-effect": "vectorEffect",
            version: "version",
            vertadvy: "vertAdvY",
            "vert-adv-y": "vertAdvY",
            vertoriginx: "vertOriginX",
            "vert-origin-x": "vertOriginX",
            vertoriginy: "vertOriginY",
            "vert-origin-y": "vertOriginY",
            vhanging: "vHanging",
            "v-hanging": "vHanging",
            videographic: "vIdeographic",
            "v-ideographic": "vIdeographic",
            viewbox: "viewBox",
            viewtarget: "viewTarget",
            visibility: "visibility",
            vmathematical: "vMathematical",
            "v-mathematical": "vMathematical",
            vocab: "vocab",
            widths: "widths",
            wordspacing: "wordSpacing",
            "word-spacing": "wordSpacing",
            writingmode: "writingMode",
            "writing-mode": "writingMode",
            x1: "x1",
            x2: "x2",
            x: "x",
            xchannelselector: "xChannelSelector",
            xheight: "xHeight",
            "x-height": "xHeight",
            xlinkactuate: "xlinkActuate",
            "xlink:actuate": "xlinkActuate",
            xlinkarcrole: "xlinkArcrole",
            "xlink:arcrole": "xlinkArcrole",
            xlinkhref: "xlinkHref",
            "xlink:href": "xlinkHref",
            xlinkrole: "xlinkRole",
            "xlink:role": "xlinkRole",
            xlinkshow: "xlinkShow",
            "xlink:show": "xlinkShow",
            xlinktitle: "xlinkTitle",
            "xlink:title": "xlinkTitle",
            xlinktype: "xlinkType",
            "xlink:type": "xlinkType",
            xmlbase: "xmlBase",
            "xml:base": "xmlBase",
            xmllang: "xmlLang",
            "xml:lang": "xmlLang",
            xmlns: "xmlns",
            "xml:space": "xmlSpace",
            xmlnsxlink: "xmlnsXlink",
            "xmlns:xlink": "xmlnsXlink",
            xmlspace: "xmlSpace",
            y1: "y1",
            y2: "y2",
            y: "y",
            ychannelselector: "yChannelSelector",
            z: "z",
            zoomandpan: "zoomAndPan"
          };
          var validateProperty$1 = function() {
          };
          {
            var warnedProperties$1 = {};
            var _hasOwnProperty = Object.prototype.hasOwnProperty;
            var EVENT_NAME_REGEX = /^on./;
            var INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/;
            var rARIA$1 = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$");
            var rARIACamel$1 = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
            validateProperty$1 = function(tagName, name, value, eventRegistry) {
              if (_hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name]) {
                return true;
              }
              var lowerCasedName = name.toLowerCase();
              if (lowerCasedName === "onfocusin" || lowerCasedName === "onfocusout") {
                error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React.");
                warnedProperties$1[name] = true;
                return true;
              }
              if (eventRegistry != null) {
                var registrationNameDependencies = eventRegistry.registrationNameDependencies, possibleRegistrationNames = eventRegistry.possibleRegistrationNames;
                if (registrationNameDependencies.hasOwnProperty(name)) {
                  return true;
                }
                var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;
                if (registrationName != null) {
                  error("Invalid event handler property `%s`. Did you mean `%s`?", name, registrationName);
                  warnedProperties$1[name] = true;
                  return true;
                }
                if (EVENT_NAME_REGEX.test(name)) {
                  error("Unknown event handler property `%s`. It will be ignored.", name);
                  warnedProperties$1[name] = true;
                  return true;
                }
              } else if (EVENT_NAME_REGEX.test(name)) {
                if (INVALID_EVENT_NAME_REGEX.test(name)) {
                  error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", name);
                }
                warnedProperties$1[name] = true;
                return true;
              }
              if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
                return true;
              }
              if (lowerCasedName === "innerhtml") {
                error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`.");
                warnedProperties$1[name] = true;
                return true;
              }
              if (lowerCasedName === "aria") {
                error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead.");
                warnedProperties$1[name] = true;
                return true;
              }
              if (lowerCasedName === "is" && value !== null && value !== void 0 && typeof value !== "string") {
                error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof value);
                warnedProperties$1[name] = true;
                return true;
              }
              if (typeof value === "number" && isNaN(value)) {
                error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", name);
                warnedProperties$1[name] = true;
                return true;
              }
              var propertyInfo = getPropertyInfo(name);
              var isReserved = propertyInfo !== null && propertyInfo.type === RESERVED;
              if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
                var standardName = possibleStandardNames[lowerCasedName];
                if (standardName !== name) {
                  error("Invalid DOM property `%s`. Did you mean `%s`?", name, standardName);
                  warnedProperties$1[name] = true;
                  return true;
                }
              } else if (!isReserved && name !== lowerCasedName) {
                error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", name, lowerCasedName);
                warnedProperties$1[name] = true;
                return true;
              }
              if (typeof value === "boolean" && shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
                if (value) {
                  error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', value, name, name, value, name);
                } else {
                  error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', value, name, name, value, name, name, name);
                }
                warnedProperties$1[name] = true;
                return true;
              }
              if (isReserved) {
                return true;
              }
              if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, false)) {
                warnedProperties$1[name] = true;
                return false;
              }
              if ((value === "false" || value === "true") && propertyInfo !== null && propertyInfo.type === BOOLEAN) {
                error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", value, name, value === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', name, value);
                warnedProperties$1[name] = true;
                return true;
              }
              return true;
            };
          }
          var warnUnknownProperties = function(type, props, eventRegistry) {
            {
              var unknownProps = [];
              for (var key in props) {
                var isValid = validateProperty$1(type, key, props[key], eventRegistry);
                if (!isValid) {
                  unknownProps.push(key);
                }
              }
              var unknownPropString = unknownProps.map(function(prop) {
                return "`" + prop + "`";
              }).join(", ");
              if (unknownProps.length === 1) {
                error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type);
              } else if (unknownProps.length > 1) {
                error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type);
              }
            }
          };
          function validateProperties$2(type, props, eventRegistry) {
            if (isCustomComponent(type, props)) {
              return;
            }
            warnUnknownProperties(type, props, eventRegistry);
          }
          var toArray = React2.Children.toArray;
          var currentDebugStacks = [];
          var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
          var ReactDebugCurrentFrame$1;
          var prevGetCurrentStackImpl = null;
          var getCurrentServerStackImpl = function() {
            return "";
          };
          var describeStackFrame = function(element) {
            return "";
          };
          var validatePropertiesInDevelopment = function(type, props) {
          };
          var pushCurrentDebugStack = function(stack) {
          };
          var pushElementToDebugStack = function(element) {
          };
          var popCurrentDebugStack = function() {
          };
          var hasWarnedAboutUsingContextAsConsumer = false;
          {
            ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
            validatePropertiesInDevelopment = function(type, props) {
              validateProperties(type, props);
              validateProperties$1(type, props);
              validateProperties$2(type, props, null);
            };
            describeStackFrame = function(element) {
              return describeUnknownElementTypeFrameInDEV(element.type, element._source, null);
            };
            pushCurrentDebugStack = function(stack) {
              currentDebugStacks.push(stack);
              if (currentDebugStacks.length === 1) {
                prevGetCurrentStackImpl = ReactDebugCurrentFrame$1.getCurrentStack;
                ReactDebugCurrentFrame$1.getCurrentStack = getCurrentServerStackImpl;
              }
            };
            pushElementToDebugStack = function(element) {
              var stack = currentDebugStacks[currentDebugStacks.length - 1];
              var frame = stack[stack.length - 1];
              frame.debugElementStack.push(element);
            };
            popCurrentDebugStack = function() {
              currentDebugStacks.pop();
              if (currentDebugStacks.length === 0) {
                ReactDebugCurrentFrame$1.getCurrentStack = prevGetCurrentStackImpl;
                prevGetCurrentStackImpl = null;
              }
            };
            getCurrentServerStackImpl = function() {
              if (currentDebugStacks.length === 0) {
                return "";
              }
              var frames = currentDebugStacks[currentDebugStacks.length - 1];
              var stack = "";
              for (var i2 = frames.length - 1; i2 >= 0; i2--) {
                var frame = frames[i2];
                var debugElementStack = frame.debugElementStack;
                for (var ii = debugElementStack.length - 1; ii >= 0; ii--) {
                  stack += describeStackFrame(debugElementStack[ii]);
                }
              }
              return stack;
            };
          }
          var didWarnDefaultInputValue = false;
          var didWarnDefaultChecked = false;
          var didWarnDefaultSelectValue = false;
          var didWarnDefaultTextareaValue = false;
          var didWarnInvalidOptionChildren = false;
          var didWarnAboutNoopUpdateForComponent = {};
          var didWarnAboutBadClass = {};
          var didWarnAboutModulePatternComponent = {};
          var didWarnAboutDeprecatedWillMount = {};
          var didWarnAboutUndefinedDerivedState = {};
          var didWarnAboutUninitializedState = {};
          var valuePropNames = ["value", "defaultValue"];
          var newlineEatingTags = {
            listing: true,
            pre: true,
            textarea: true
          };
          var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
          var validatedTagCache = {};
          function validateDangerousTag(tag) {
            if (!validatedTagCache.hasOwnProperty(tag)) {
              if (!VALID_TAG_REGEX.test(tag)) {
                {
                  throw Error("Invalid tag: " + tag);
                }
              }
              validatedTagCache[tag] = true;
            }
          }
          var styleNameCache = {};
          var processStyleName = function(styleName) {
            if (styleNameCache.hasOwnProperty(styleName)) {
              return styleNameCache[styleName];
            }
            var result = hyphenateStyleName(styleName);
            styleNameCache[styleName] = result;
            return result;
          };
          function createMarkupForStyles(styles) {
            var serialized = "";
            var delimiter = "";
            for (var styleName in styles) {
              if (!styles.hasOwnProperty(styleName)) {
                continue;
              }
              var isCustomProperty = styleName.indexOf("--") === 0;
              var styleValue = styles[styleName];
              {
                if (!isCustomProperty) {
                  warnValidStyle$1(styleName, styleValue);
                }
              }
              if (styleValue != null) {
                serialized += delimiter + (isCustomProperty ? styleName : processStyleName(styleName)) + ":";
                serialized += dangerousStyleValue(styleName, styleValue, isCustomProperty);
                delimiter = ";";
              }
            }
            return serialized || null;
          }
          function warnNoop(publicInstance, callerName) {
            {
              var _constructor = publicInstance.constructor;
              var componentName = _constructor && getComponentName(_constructor) || "ReactClass";
              var warningKey = componentName + "." + callerName;
              if (didWarnAboutNoopUpdateForComponent[warningKey]) {
                return;
              }
              error("%s(...): Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op.\n\nPlease check the code for the %s component.", callerName, callerName, componentName);
              didWarnAboutNoopUpdateForComponent[warningKey] = true;
            }
          }
          function shouldConstruct$1(Component) {
            return Component.prototype && Component.prototype.isReactComponent;
          }
          function getNonChildrenInnerMarkup(props) {
            var innerHTML = props.dangerouslySetInnerHTML;
            if (innerHTML != null) {
              if (innerHTML.__html != null) {
                return innerHTML.__html;
              }
            } else {
              var content = props.children;
              if (typeof content === "string" || typeof content === "number") {
                return escapeTextForBrowser(content);
              }
            }
            return null;
          }
          function flattenTopLevelChildren(children) {
            if (!React2.isValidElement(children)) {
              return toArray(children);
            }
            var element = children;
            if (element.type !== REACT_FRAGMENT_TYPE) {
              return [element];
            }
            var fragmentChildren = element.props.children;
            if (!React2.isValidElement(fragmentChildren)) {
              return toArray(fragmentChildren);
            }
            var fragmentChildElement = fragmentChildren;
            return [fragmentChildElement];
          }
          function flattenOptionChildren(children) {
            if (children === void 0 || children === null) {
              return children;
            }
            var content = "";
            React2.Children.forEach(children, function(child) {
              if (child == null) {
                return;
              }
              content += child;
              {
                if (!didWarnInvalidOptionChildren && typeof child !== "string" && typeof child !== "number") {
                  didWarnInvalidOptionChildren = true;
                  error("Only strings and numbers are supported as <option> children.");
                }
              }
            });
            return content;
          }
          var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
          var STYLE = "style";
          var RESERVED_PROPS = {
            children: null,
            dangerouslySetInnerHTML: null,
            suppressContentEditableWarning: null,
            suppressHydrationWarning: null
          };
          function createOpenTagMarkup(tagVerbatim, tagLowercase, props, namespace, makeStaticMarkup, isRootElement) {
            var ret = "<" + tagVerbatim;
            var isCustomComponent$1 = isCustomComponent(tagLowercase, props);
            for (var propKey in props) {
              if (!hasOwnProperty$2.call(props, propKey)) {
                continue;
              }
              var propValue = props[propKey];
              if (propValue == null) {
                continue;
              }
              if (propKey === STYLE) {
                propValue = createMarkupForStyles(propValue);
              }
              var markup = null;
              if (isCustomComponent$1) {
                if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
                  markup = createMarkupForCustomAttribute(propKey, propValue);
                }
              } else {
                markup = createMarkupForProperty(propKey, propValue);
              }
              if (markup) {
                ret += " " + markup;
              }
            }
            if (makeStaticMarkup) {
              return ret;
            }
            if (isRootElement) {
              ret += " " + createMarkupForRoot();
            }
            return ret;
          }
          function validateRenderResult(child, type) {
            if (child === void 0) {
              {
                {
                  throw Error((getComponentName(type) || "Component") + "(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.");
                }
              }
            }
          }
          function resolve(child, context, threadID) {
            while (React2.isValidElement(child)) {
              var element = child;
              var Component = element.type;
              {
                pushElementToDebugStack(element);
              }
              if (typeof Component !== "function") {
                break;
              }
              processChild(element, Component);
            }
            function processChild(element2, Component2) {
              var isClass = shouldConstruct$1(Component2);
              var publicContext = processContext(Component2, context, threadID, isClass);
              var queue = [];
              var replace = false;
              var updater = {
                isMounted: function(publicInstance) {
                  return false;
                },
                enqueueForceUpdate: function(publicInstance) {
                  if (queue === null) {
                    warnNoop(publicInstance, "forceUpdate");
                    return null;
                  }
                },
                enqueueReplaceState: function(publicInstance, completeState) {
                  replace = true;
                  queue = [completeState];
                },
                enqueueSetState: function(publicInstance, currentPartialState) {
                  if (queue === null) {
                    warnNoop(publicInstance, "setState");
                    return null;
                  }
                  queue.push(currentPartialState);
                }
              };
              var inst;
              if (isClass) {
                inst = new Component2(element2.props, publicContext, updater);
                if (typeof Component2.getDerivedStateFromProps === "function") {
                  {
                    if (inst.state === null || inst.state === void 0) {
                      var componentName = getComponentName(Component2) || "Unknown";
                      if (!didWarnAboutUninitializedState[componentName]) {
                        error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", componentName, inst.state === null ? "null" : "undefined", componentName);
                        didWarnAboutUninitializedState[componentName] = true;
                      }
                    }
                  }
                  var partialState = Component2.getDerivedStateFromProps.call(null, element2.props, inst.state);
                  {
                    if (partialState === void 0) {
                      var _componentName = getComponentName(Component2) || "Unknown";
                      if (!didWarnAboutUndefinedDerivedState[_componentName]) {
                        error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", _componentName);
                        didWarnAboutUndefinedDerivedState[_componentName] = true;
                      }
                    }
                  }
                  if (partialState != null) {
                    inst.state = _assign({}, inst.state, partialState);
                  }
                }
              } else {
                {
                  if (Component2.prototype && typeof Component2.prototype.render === "function") {
                    var _componentName2 = getComponentName(Component2) || "Unknown";
                    if (!didWarnAboutBadClass[_componentName2]) {
                      error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", _componentName2, _componentName2);
                      didWarnAboutBadClass[_componentName2] = true;
                    }
                  }
                }
                var componentIdentity = {};
                prepareToUseHooks(componentIdentity);
                inst = Component2(element2.props, publicContext, updater);
                inst = finishHooks(Component2, element2.props, inst, publicContext);
                {
                  if (inst != null && inst.render != null) {
                    var _componentName3 = getComponentName(Component2) || "Unknown";
                    if (!didWarnAboutModulePatternComponent[_componentName3]) {
                      error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName3, _componentName3, _componentName3);
                      didWarnAboutModulePatternComponent[_componentName3] = true;
                    }
                  }
                }
                if (inst == null || inst.render == null) {
                  child = inst;
                  validateRenderResult(child, Component2);
                  return;
                }
              }
              inst.props = element2.props;
              inst.context = publicContext;
              inst.updater = updater;
              var initialState = inst.state;
              if (initialState === void 0) {
                inst.state = initialState = null;
              }
              if (typeof inst.UNSAFE_componentWillMount === "function" || typeof inst.componentWillMount === "function") {
                if (typeof inst.componentWillMount === "function") {
                  {
                    if (inst.componentWillMount.__suppressDeprecationWarning !== true) {
                      var _componentName4 = getComponentName(Component2) || "Unknown";
                      if (!didWarnAboutDeprecatedWillMount[_componentName4]) {
                        warn("componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code from componentWillMount to componentDidMount (preferred in most cases) or the constructor.\n\nPlease update the following components: %s", _componentName4);
                        didWarnAboutDeprecatedWillMount[_componentName4] = true;
                      }
                    }
                  }
                  if (typeof Component2.getDerivedStateFromProps !== "function") {
                    inst.componentWillMount();
                  }
                }
                if (typeof inst.UNSAFE_componentWillMount === "function" && typeof Component2.getDerivedStateFromProps !== "function") {
                  inst.UNSAFE_componentWillMount();
                }
                if (queue.length) {
                  var oldQueue = queue;
                  var oldReplace = replace;
                  queue = null;
                  replace = false;
                  if (oldReplace && oldQueue.length === 1) {
                    inst.state = oldQueue[0];
                  } else {
                    var nextState = oldReplace ? oldQueue[0] : inst.state;
                    var dontMutate = true;
                    for (var i2 = oldReplace ? 1 : 0; i2 < oldQueue.length; i2++) {
                      var partial = oldQueue[i2];
                      var _partialState = typeof partial === "function" ? partial.call(inst, nextState, element2.props, publicContext) : partial;
                      if (_partialState != null) {
                        if (dontMutate) {
                          dontMutate = false;
                          nextState = _assign({}, nextState, _partialState);
                        } else {
                          _assign(nextState, _partialState);
                        }
                      }
                    }
                    inst.state = nextState;
                  }
                } else {
                  queue = null;
                }
              }
              child = inst.render();
              {
                if (child === void 0 && inst.render._isMockFunction) {
                  child = null;
                }
              }
              validateRenderResult(child, Component2);
              var childContext;
              {
                if (typeof inst.getChildContext === "function") {
                  var _childContextTypes = Component2.childContextTypes;
                  if (typeof _childContextTypes === "object") {
                    childContext = inst.getChildContext();
                    for (var contextKey in childContext) {
                      if (!(contextKey in _childContextTypes)) {
                        {
                          throw Error((getComponentName(Component2) || "Unknown") + '.getChildContext(): key "' + contextKey + '" is not defined in childContextTypes.');
                        }
                      }
                    }
                  } else {
                    {
                      error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", getComponentName(Component2) || "Unknown");
                    }
                  }
                }
                if (childContext) {
                  context = _assign({}, context, childContext);
                }
              }
            }
            return {
              child,
              context
            };
          }
          var ReactDOMServerRenderer = /* @__PURE__ */ function() {
            function ReactDOMServerRenderer2(children, makeStaticMarkup, options) {
              var flatChildren = flattenTopLevelChildren(children);
              var topFrame = {
                type: null,
                domNamespace: Namespaces.html,
                children: flatChildren,
                childIndex: 0,
                context: emptyObject,
                footer: ""
              };
              {
                topFrame.debugElementStack = [];
              }
              this.threadID = allocThreadID();
              this.stack = [topFrame];
              this.exhausted = false;
              this.currentSelectValue = null;
              this.previousWasTextNode = false;
              this.makeStaticMarkup = makeStaticMarkup;
              this.suspenseDepth = 0;
              this.contextIndex = -1;
              this.contextStack = [];
              this.contextValueStack = [];
              this.uniqueID = 0;
              this.identifierPrefix = options && options.identifierPrefix || "";
              {
                this.contextProviderStack = [];
              }
            }
            var _proto = ReactDOMServerRenderer2.prototype;
            _proto.destroy = function destroy() {
              if (!this.exhausted) {
                this.exhausted = true;
                this.clearProviders();
                freeThreadID(this.threadID);
              }
            };
            _proto.pushProvider = function pushProvider(provider) {
              var index = ++this.contextIndex;
              var context = provider.type._context;
              var threadID = this.threadID;
              validateContextBounds(context, threadID);
              var previousValue = context[threadID];
              this.contextStack[index] = context;
              this.contextValueStack[index] = previousValue;
              {
                this.contextProviderStack[index] = provider;
              }
              context[threadID] = provider.props.value;
            };
            _proto.popProvider = function popProvider(provider) {
              var index = this.contextIndex;
              {
                if (index < 0 || provider !== this.contextProviderStack[index]) {
                  error("Unexpected pop.");
                }
              }
              var context = this.contextStack[index];
              var previousValue = this.contextValueStack[index];
              this.contextStack[index] = null;
              this.contextValueStack[index] = null;
              {
                this.contextProviderStack[index] = null;
              }
              this.contextIndex--;
              context[this.threadID] = previousValue;
            };
            _proto.clearProviders = function clearProviders() {
              for (var index = this.contextIndex; index >= 0; index--) {
                var context = this.contextStack[index];
                var previousValue = this.contextValueStack[index];
                context[this.threadID] = previousValue;
              }
            };
            _proto.read = function read(bytes) {
              if (this.exhausted) {
                return null;
              }
              var prevPartialRenderer = currentPartialRenderer;
              setCurrentPartialRenderer(this);
              var prevDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = Dispatcher;
              try {
                var out = [""];
                var suspended = false;
                while (out[0].length < bytes) {
                  if (this.stack.length === 0) {
                    this.exhausted = true;
                    freeThreadID(this.threadID);
                    break;
                  }
                  var frame = this.stack[this.stack.length - 1];
                  if (suspended || frame.childIndex >= frame.children.length) {
                    var footer = frame.footer;
                    if (footer !== "") {
                      this.previousWasTextNode = false;
                    }
                    this.stack.pop();
                    if (frame.type === "select") {
                      this.currentSelectValue = null;
                    } else if (frame.type != null && frame.type.type != null && frame.type.type.$$typeof === REACT_PROVIDER_TYPE) {
                      var provider = frame.type;
                      this.popProvider(provider);
                    } else if (frame.type === REACT_SUSPENSE_TYPE) {
                      this.suspenseDepth--;
                      var buffered = out.pop();
                      if (suspended) {
                        suspended = false;
                        var fallbackFrame = frame.fallbackFrame;
                        if (!fallbackFrame) {
                          {
                            throw Error(true ? "ReactDOMServer did not find an internal fallback frame for Suspense. This is a bug in React. Please file an issue." : formatProdErrorMessage(303));
                          }
                        }
                        this.stack.push(fallbackFrame);
                        out[this.suspenseDepth] += "<!--$!-->";
                        continue;
                      } else {
                        out[this.suspenseDepth] += buffered;
                      }
                    }
                    out[this.suspenseDepth] += footer;
                    continue;
                  }
                  var child = frame.children[frame.childIndex++];
                  var outBuffer = "";
                  if (true) {
                    pushCurrentDebugStack(this.stack);
                    frame.debugElementStack.length = 0;
                  }
                  try {
                    outBuffer += this.render(child, frame.context, frame.domNamespace);
                  } catch (err) {
                    if (err != null && typeof err.then === "function") {
                      if (enableSuspenseServerRenderer) {
                        if (!(this.suspenseDepth > 0)) {
                          {
                            throw Error(true ? "A React component suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." : formatProdErrorMessage(342));
                          }
                        }
                        suspended = true;
                      } else {
                        if (true) {
                          {
                            throw Error(true ? "ReactDOMServer does not yet support Suspense." : formatProdErrorMessage(294));
                          }
                        }
                      }
                    } else {
                      throw err;
                    }
                  } finally {
                    if (true) {
                      popCurrentDebugStack();
                    }
                  }
                  if (out.length <= this.suspenseDepth) {
                    out.push("");
                  }
                  out[this.suspenseDepth] += outBuffer;
                }
                return out[0];
              } finally {
                ReactCurrentDispatcher$1.current = prevDispatcher;
                setCurrentPartialRenderer(prevPartialRenderer);
                resetHooksState();
              }
            };
            _proto.render = function render(child, context, parentNamespace) {
              if (typeof child === "string" || typeof child === "number") {
                var text = "" + child;
                if (text === "") {
                  return "";
                }
                if (this.makeStaticMarkup) {
                  return escapeTextForBrowser(text);
                }
                if (this.previousWasTextNode) {
                  return "<!-- -->" + escapeTextForBrowser(text);
                }
                this.previousWasTextNode = true;
                return escapeTextForBrowser(text);
              } else {
                var nextChild;
                var _resolve = resolve(child, context, this.threadID);
                nextChild = _resolve.child;
                context = _resolve.context;
                if (nextChild === null || nextChild === false) {
                  return "";
                } else if (!React2.isValidElement(nextChild)) {
                  if (nextChild != null && nextChild.$$typeof != null) {
                    var $$typeof = nextChild.$$typeof;
                    if (!($$typeof !== REACT_PORTAL_TYPE)) {
                      {
                        throw Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
                      }
                    }
                    {
                      {
                        throw Error("Unknown element-like object type: " + $$typeof.toString() + ". This is likely a bug in React. Please file an issue.");
                      }
                    }
                  }
                  var nextChildren = toArray(nextChild);
                  var frame = {
                    type: null,
                    domNamespace: parentNamespace,
                    children: nextChildren,
                    childIndex: 0,
                    context,
                    footer: ""
                  };
                  {
                    frame.debugElementStack = [];
                  }
                  this.stack.push(frame);
                  return "";
                }
                var nextElement = nextChild;
                var elementType = nextElement.type;
                if (typeof elementType === "string") {
                  return this.renderDOM(nextElement, context, parentNamespace);
                }
                switch (elementType) {
                  case REACT_LEGACY_HIDDEN_TYPE:
                  case REACT_DEBUG_TRACING_MODE_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_SUSPENSE_LIST_TYPE:
                  case REACT_FRAGMENT_TYPE: {
                    var _nextChildren = toArray(nextChild.props.children);
                    var _frame = {
                      type: null,
                      domNamespace: parentNamespace,
                      children: _nextChildren,
                      childIndex: 0,
                      context,
                      footer: ""
                    };
                    {
                      _frame.debugElementStack = [];
                    }
                    this.stack.push(_frame);
                    return "";
                  }
                  case REACT_SUSPENSE_TYPE: {
                    {
                      {
                        {
                          throw Error("ReactDOMServer does not yet support Suspense.");
                        }
                      }
                    }
                  }
                  case REACT_SCOPE_TYPE: {
                    {
                      {
                        throw Error("ReactDOMServer does not yet support scope components.");
                      }
                    }
                  }
                }
                if (typeof elementType === "object" && elementType !== null) {
                  switch (elementType.$$typeof) {
                    case REACT_FORWARD_REF_TYPE: {
                      var element = nextChild;
                      var _nextChildren5;
                      var componentIdentity = {};
                      prepareToUseHooks(componentIdentity);
                      _nextChildren5 = elementType.render(element.props, element.ref);
                      _nextChildren5 = finishHooks(elementType.render, element.props, _nextChildren5, element.ref);
                      _nextChildren5 = toArray(_nextChildren5);
                      var _frame5 = {
                        type: null,
                        domNamespace: parentNamespace,
                        children: _nextChildren5,
                        childIndex: 0,
                        context,
                        footer: ""
                      };
                      {
                        _frame5.debugElementStack = [];
                      }
                      this.stack.push(_frame5);
                      return "";
                    }
                    case REACT_MEMO_TYPE: {
                      var _element = nextChild;
                      var _nextChildren6 = [React2.createElement(elementType.type, _assign({
                        ref: _element.ref
                      }, _element.props))];
                      var _frame6 = {
                        type: null,
                        domNamespace: parentNamespace,
                        children: _nextChildren6,
                        childIndex: 0,
                        context,
                        footer: ""
                      };
                      {
                        _frame6.debugElementStack = [];
                      }
                      this.stack.push(_frame6);
                      return "";
                    }
                    case REACT_PROVIDER_TYPE: {
                      var provider = nextChild;
                      var nextProps = provider.props;
                      var _nextChildren7 = toArray(nextProps.children);
                      var _frame7 = {
                        type: provider,
                        domNamespace: parentNamespace,
                        children: _nextChildren7,
                        childIndex: 0,
                        context,
                        footer: ""
                      };
                      {
                        _frame7.debugElementStack = [];
                      }
                      this.pushProvider(provider);
                      this.stack.push(_frame7);
                      return "";
                    }
                    case REACT_CONTEXT_TYPE: {
                      var reactContext = nextChild.type;
                      {
                        if (reactContext._context === void 0) {
                          if (reactContext !== reactContext.Consumer) {
                            if (!hasWarnedAboutUsingContextAsConsumer) {
                              hasWarnedAboutUsingContextAsConsumer = true;
                              error("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                            }
                          }
                        } else {
                          reactContext = reactContext._context;
                        }
                      }
                      var _nextProps = nextChild.props;
                      var threadID = this.threadID;
                      validateContextBounds(reactContext, threadID);
                      var nextValue = reactContext[threadID];
                      var _nextChildren8 = toArray(_nextProps.children(nextValue));
                      var _frame8 = {
                        type: nextChild,
                        domNamespace: parentNamespace,
                        children: _nextChildren8,
                        childIndex: 0,
                        context,
                        footer: ""
                      };
                      {
                        _frame8.debugElementStack = [];
                      }
                      this.stack.push(_frame8);
                      return "";
                    }
                    case REACT_FUNDAMENTAL_TYPE: {
                      {
                        {
                          throw Error("ReactDOMServer does not yet support the fundamental API.");
                        }
                      }
                    }
                    case REACT_LAZY_TYPE: {
                      var _element2 = nextChild;
                      var lazyComponent = nextChild.type;
                      var payload = lazyComponent._payload;
                      var init = lazyComponent._init;
                      var result = init(payload);
                      var _nextChildren10 = [React2.createElement(result, _assign({
                        ref: _element2.ref
                      }, _element2.props))];
                      var _frame10 = {
                        type: null,
                        domNamespace: parentNamespace,
                        children: _nextChildren10,
                        childIndex: 0,
                        context,
                        footer: ""
                      };
                      {
                        _frame10.debugElementStack = [];
                      }
                      this.stack.push(_frame10);
                      return "";
                    }
                  }
                }
                var info = "";
                {
                  var owner = nextElement._owner;
                  if (elementType === void 0 || typeof elementType === "object" && elementType !== null && Object.keys(elementType).length === 0) {
                    info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
                  }
                  var ownerName = owner ? getComponentName(owner) : null;
                  if (ownerName) {
                    info += "\n\nCheck the render method of `" + ownerName + "`.";
                  }
                }
                {
                  {
                    throw Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (elementType == null ? elementType : typeof elementType) + "." + info);
                  }
                }
              }
            };
            _proto.renderDOM = function renderDOM(element, context, parentNamespace) {
              var tag = element.type.toLowerCase();
              var namespace = parentNamespace;
              if (parentNamespace === Namespaces.html) {
                namespace = getIntrinsicNamespace(tag);
              }
              {
                if (namespace === Namespaces.html) {
                  if (tag !== element.type) {
                    error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", element.type);
                  }
                }
              }
              validateDangerousTag(tag);
              var props = element.props;
              if (tag === "input") {
                {
                  checkControlledValueProps("input", props);
                  if (props.checked !== void 0 && props.defaultChecked !== void 0 && !didWarnDefaultChecked) {
                    error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type);
                    didWarnDefaultChecked = true;
                  }
                  if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultInputValue) {
                    error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type);
                    didWarnDefaultInputValue = true;
                  }
                }
                props = _assign({
                  type: void 0
                }, props, {
                  defaultChecked: void 0,
                  defaultValue: void 0,
                  value: props.value != null ? props.value : props.defaultValue,
                  checked: props.checked != null ? props.checked : props.defaultChecked
                });
              } else if (tag === "textarea") {
                {
                  checkControlledValueProps("textarea", props);
                  if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultTextareaValue) {
                    error("Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components");
                    didWarnDefaultTextareaValue = true;
                  }
                }
                var initialValue = props.value;
                if (initialValue == null) {
                  var defaultValue = props.defaultValue;
                  var textareaChildren = props.children;
                  if (textareaChildren != null) {
                    {
                      error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
                    }
                    if (!(defaultValue == null)) {
                      {
                        throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
                      }
                    }
                    if (Array.isArray(textareaChildren)) {
                      if (!(textareaChildren.length <= 1)) {
                        {
                          throw Error("<textarea> can only have at most one child.");
                        }
                      }
                      textareaChildren = textareaChildren[0];
                    }
                    defaultValue = "" + textareaChildren;
                  }
                  if (defaultValue == null) {
                    defaultValue = "";
                  }
                  initialValue = defaultValue;
                }
                props = _assign({}, props, {
                  value: void 0,
                  children: "" + initialValue
                });
              } else if (tag === "select") {
                {
                  checkControlledValueProps("select", props);
                  for (var i2 = 0; i2 < valuePropNames.length; i2++) {
                    var propName = valuePropNames[i2];
                    if (props[propName] == null) {
                      continue;
                    }
                    var isArray = Array.isArray(props[propName]);
                    if (props.multiple && !isArray) {
                      error("The `%s` prop supplied to <select> must be an array if `multiple` is true.", propName);
                    } else if (!props.multiple && isArray) {
                      error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.", propName);
                    }
                  }
                  if (props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultSelectValue) {
                    error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components");
                    didWarnDefaultSelectValue = true;
                  }
                }
                this.currentSelectValue = props.value != null ? props.value : props.defaultValue;
                props = _assign({}, props, {
                  value: void 0
                });
              } else if (tag === "option") {
                var selected = null;
                var selectValue = this.currentSelectValue;
                var optionChildren = flattenOptionChildren(props.children);
                if (selectValue != null) {
                  var value;
                  if (props.value != null) {
                    value = props.value + "";
                  } else {
                    value = optionChildren;
                  }
                  selected = false;
                  if (Array.isArray(selectValue)) {
                    for (var j = 0; j < selectValue.length; j++) {
                      if ("" + selectValue[j] === value) {
                        selected = true;
                        break;
                      }
                    }
                  } else {
                    selected = "" + selectValue === value;
                  }
                  props = _assign({
                    selected: void 0,
                    children: void 0
                  }, props, {
                    selected,
                    children: optionChildren
                  });
                }
              }
              {
                validatePropertiesInDevelopment(tag, props);
              }
              assertValidProps(tag, props);
              var out = createOpenTagMarkup(element.type, tag, props, namespace, this.makeStaticMarkup, this.stack.length === 1);
              var footer = "";
              if (omittedCloseTags.hasOwnProperty(tag)) {
                out += "/>";
              } else {
                out += ">";
                footer = "</" + element.type + ">";
              }
              var children;
              var innerMarkup = getNonChildrenInnerMarkup(props);
              if (innerMarkup != null) {
                children = [];
                if (newlineEatingTags.hasOwnProperty(tag) && innerMarkup.charAt(0) === "\n") {
                  out += "\n";
                }
                out += innerMarkup;
              } else {
                children = toArray(props.children);
              }
              var frame = {
                domNamespace: getChildNamespace(parentNamespace, element.type),
                type: tag,
                children,
                childIndex: 0,
                context,
                footer
              };
              {
                frame.debugElementStack = [];
              }
              this.stack.push(frame);
              this.previousWasTextNode = false;
              return out;
            };
            return ReactDOMServerRenderer2;
          }();
          function renderToString(element, options) {
            var renderer = new ReactDOMServerRenderer(element, false, options);
            try {
              var markup = renderer.read(Infinity);
              return markup;
            } finally {
              renderer.destroy();
            }
          }
          function renderToStaticMarkup(element, options) {
            var renderer = new ReactDOMServerRenderer(element, true, options);
            try {
              var markup = renderer.read(Infinity);
              return markup;
            } finally {
              renderer.destroy();
            }
          }
          function renderToNodeStream() {
            {
              {
                throw Error("ReactDOMServer.renderToNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToString() instead.");
              }
            }
          }
          function renderToStaticNodeStream() {
            {
              {
                throw Error("ReactDOMServer.renderToStaticNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToStaticMarkup() instead.");
              }
            }
          }
          exports.renderToNodeStream = renderToNodeStream;
          exports.renderToStaticMarkup = renderToStaticMarkup;
          exports.renderToStaticNodeStream = renderToStaticNodeStream;
          exports.renderToString = renderToString;
          exports.version = ReactVersion;
        })();
      }
    }
  });

  // node_modules/react-dom/server.browser.js
  var require_server_browser = __commonJS({
    "node_modules/react-dom/server.browser.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_dom_server_browser_development();
      }
    }
  });

  // node_modules/@remix-run/react/browser/_virtual/_rollupPluginBabelHelpers.js
  function _extends() {
    _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  var init_rollupPluginBabelHelpers = __esm({
    "node_modules/@remix-run/react/browser/_virtual/_rollupPluginBabelHelpers.js"() {
    }
  });

  // node_modules/@remix-run/react/browser/errorBoundaries.js
  function RemixRootDefaultErrorBoundary({
    error
  }) {
    console.error(error);
    return /* @__PURE__ */ import_react.default.createElement("html", {
      lang: "en"
    }, /* @__PURE__ */ import_react.default.createElement("head", null, /* @__PURE__ */ import_react.default.createElement("meta", {
      charSet: "utf-8"
    }), /* @__PURE__ */ import_react.default.createElement("title", null, "Uncaught Exception!")), /* @__PURE__ */ import_react.default.createElement("body", null, /* @__PURE__ */ import_react.default.createElement("main", {
      style: {
        border: "solid 2px hsl(10, 50%, 50%)",
        padding: "2rem"
      }
    }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h1", null, "Uncaught Exception!"), /* @__PURE__ */ import_react.default.createElement("p", null, "If you are not the developer, please click back in your browser and try again."), /* @__PURE__ */ import_react.default.createElement("div", {
      style: {
        fontFamily: `"SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace`,
        padding: "1rem",
        margin: "1rem 0",
        border: "solid 4px"
      }
    }, error.message), /* @__PURE__ */ import_react.default.createElement("p", null, "There was an uncaught exception in your application. Check the browser console and/or server console to inspect the error."), /* @__PURE__ */ import_react.default.createElement("p", null, "If you are the developer, consider adding your own error boundary so users don't see this page when unexpected errors happen in production!"), /* @__PURE__ */ import_react.default.createElement("p", null, "Read more about", " ", /* @__PURE__ */ import_react.default.createElement("a", {
      target: "_blank",
      rel: "noreferrer",
      href: "https://remix.run/guides/errors"
    }, "Error Handling in Remix"), ".")))));
  }
  function useCatch() {
    return (0, import_react.useContext)(RemixCatchContext);
  }
  function RemixCatchBoundary({
    catch: catchVal,
    component: Component,
    children
  }) {
    if (catchVal) {
      return /* @__PURE__ */ import_react.default.createElement(RemixCatchContext.Provider, {
        value: catchVal
      }, /* @__PURE__ */ import_react.default.createElement(Component, null));
    }
    return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, children);
  }
  function RemixRootDefaultCatchBoundary() {
    return /* @__PURE__ */ import_react.default.createElement("html", {
      lang: "en"
    }, /* @__PURE__ */ import_react.default.createElement("head", null, /* @__PURE__ */ import_react.default.createElement("meta", {
      charSet: "utf-8"
    }), /* @__PURE__ */ import_react.default.createElement("title", null, "Unhandled Thrown Response!")), /* @__PURE__ */ import_react.default.createElement("body", null, /* @__PURE__ */ import_react.default.createElement("main", {
      style: {
        border: "solid 2px hsl(10, 50%, 50%)",
        padding: "2rem"
      }
    }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h1", null, "Unhandled Thrown Response!"), /* @__PURE__ */ import_react.default.createElement("p", null, "If you are not the developer, please click back in your browser and try again."), /* @__PURE__ */ import_react.default.createElement("p", null, "There was an unhandled thrown response in your application."), /* @__PURE__ */ import_react.default.createElement("p", null, "If you are the developer, consider adding your own catch boundary so users don't see this page when unhandled thrown response happen in production!"), /* @__PURE__ */ import_react.default.createElement("p", null, "Read more about", " ", /* @__PURE__ */ import_react.default.createElement("a", {
      target: "_blank",
      rel: "noreferrer",
      href: "https://remix.run/guides/errors"
    }, "Throwing Responses in Remix"), ".")))));
  }
  var import_react, RemixErrorBoundary, RemixCatchContext;
  var init_errorBoundaries = __esm({
    "node_modules/@remix-run/react/browser/errorBoundaries.js"() {
      import_react = __toModule(require_react());
      RemixErrorBoundary = class extends import_react.default.Component {
        constructor(props) {
          super(props);
          this.state = {
            error: props.error || null,
            location: props.location
          };
        }
        static getDerivedStateFromError(error) {
          return {
            error
          };
        }
        static getDerivedStateFromProps(props, state) {
          if (state.location !== props.location) {
            return {
              error: props.error || null,
              location: props.location
            };
          }
          return state;
        }
        render() {
          if (this.state.error) {
            return /* @__PURE__ */ import_react.default.createElement(this.props.component, {
              error: this.state.error
            });
          } else {
            return this.props.children;
          }
        }
      };
      RemixCatchContext = /* @__PURE__ */ import_react.default.createContext(void 0);
    }
  });

  // node_modules/@remix-run/react/browser/invariant.js
  function invariant(value, message) {
    if (value === false || value === null || typeof value === "undefined") {
      throw new Error(message);
    }
  }
  var init_invariant = __esm({
    "node_modules/@remix-run/react/browser/invariant.js"() {
    }
  });

  // node_modules/@remix-run/react/browser/routeModules.js
  async function loadRouteModule(route, routeModulesCache) {
    if (route.id in routeModulesCache) {
      return routeModulesCache[route.id];
    }
    try {
      let routeModule = await import(route.module);
      routeModulesCache[route.id] = routeModule;
      return routeModule;
    } catch (error) {
      window.location.reload();
      return new Promise(() => {
      });
    }
  }
  var init_routeModules = __esm({
    "node_modules/@remix-run/react/browser/routeModules.js"() {
    }
  });

  // node_modules/@remix-run/react/browser/links.js
  function getLinksForMatches(matches, routeModules, manifest) {
    let descriptors = matches.map((match) => {
      let module = routeModules[match.route.id];
      return module.links && module.links() || [];
    }).flat(1);
    let preloads = getCurrentPageModulePreloadHrefs(matches, manifest);
    return dedupe(descriptors, preloads);
  }
  async function prefetchStyleLinks(routeModule) {
    if (!routeModule.links)
      return;
    let descriptors = routeModule.links();
    if (!descriptors)
      return;
    let styleLinks = [];
    for (let descriptor of descriptors) {
      if (!isPageLinkDescriptor(descriptor) && descriptor.rel === "stylesheet") {
        styleLinks.push({
          ...descriptor,
          rel: "preload",
          as: "style"
        });
      }
    }
    let matchingLinks = styleLinks.filter((link) => !link.media || window.matchMedia(link.media).matches);
    await Promise.all(matchingLinks.map(prefetchStyleLink));
  }
  async function prefetchStyleLink(descriptor) {
    return new Promise((resolve) => {
      let link = document.createElement("link");
      Object.assign(link, descriptor);
      function removeLink() {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      }
      link.onload = () => {
        removeLink();
        resolve();
      };
      link.onerror = () => {
        removeLink();
        resolve();
      };
      document.head.appendChild(link);
    });
  }
  function isPageLinkDescriptor(object) {
    return object != null && typeof object.page === "string";
  }
  function isHtmlLinkDescriptor(object) {
    return object != null && typeof object.rel === "string" && typeof object.href === "string";
  }
  async function getStylesheetPrefetchLinks(matches, routeModules) {
    let links = await Promise.all(matches.map(async (match) => {
      let mod = await loadRouteModule(match.route, routeModules);
      return mod.links ? mod.links() : [];
    }));
    return links.flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet").map(({
      rel,
      ...attrs
    }) => ({
      rel: "prefetch",
      as: "style",
      ...attrs
    }));
  }
  function getNewMatchesForLinks(page, nextMatches, currentMatches, location, mode) {
    let path = parsePathPatch(page);
    let isNew = (match, index) => {
      if (!currentMatches[index])
        return true;
      return match.route.id !== currentMatches[index].route.id;
    };
    let matchPathChanged = (match, index) => {
      var _currentMatches$index;
      return currentMatches[index].pathname !== match.pathname || ((_currentMatches$index = currentMatches[index].route.path) === null || _currentMatches$index === void 0 ? void 0 : _currentMatches$index.endsWith("*")) && currentMatches[index].params["*"] !== match.params["*"];
    };
    let newMatches = mode === "data" && location.search !== path.search ? nextMatches.filter((match, index) => {
      if (!match.route.hasLoader) {
        return false;
      }
      if (isNew(match, index) || matchPathChanged(match, index)) {
        return true;
      }
      if (match.route.shouldReload) {
        return match.route.shouldReload({
          params: match.params,
          prevUrl: new URL(location.pathname + location.search + location.hash, window.origin),
          url: new URL(page, window.origin)
        });
      }
      return true;
    }) : nextMatches.filter((match, index) => {
      return match.route.hasLoader && (isNew(match, index) || matchPathChanged(match, index));
    });
    return newMatches;
  }
  function getDataLinkHrefs(page, matches, manifest) {
    let path = parsePathPatch(page);
    return dedupeHrefs(matches.filter((match) => manifest.routes[match.route.id].hasLoader).map((match) => {
      let {
        pathname,
        search
      } = path;
      let searchParams = new URLSearchParams(search);
      searchParams.append("_data", match.route.id);
      return `${pathname}?${searchParams}`;
    }));
  }
  function getModuleLinkHrefs(matches, manifestPatch) {
    return dedupeHrefs(matches.map((match) => {
      let route = manifestPatch.routes[match.route.id];
      let hrefs = [route.module];
      if (route.imports) {
        hrefs = hrefs.concat(route.imports);
      }
      return hrefs;
    }).flat(1));
  }
  function getCurrentPageModulePreloadHrefs(matches, manifest) {
    return dedupeHrefs(matches.map((match) => {
      let route = manifest.routes[match.route.id];
      let hrefs = [route.module];
      if (route.imports) {
        hrefs = hrefs.concat(route.imports);
      }
      return hrefs;
    }).flat(1));
  }
  function dedupeHrefs(hrefs) {
    return [...new Set(hrefs)];
  }
  function dedupe(descriptors, preloads) {
    let set = new Set();
    let preloadsSet = new Set(preloads);
    return descriptors.reduce((deduped, descriptor) => {
      let alreadyModulePreload = !isPageLinkDescriptor(descriptor) && descriptor.as === "script" && descriptor.href && preloadsSet.has(descriptor.href);
      if (alreadyModulePreload) {
        return deduped;
      }
      let str = JSON.stringify(descriptor);
      if (!set.has(str)) {
        set.add(str);
        deduped.push(descriptor);
      }
      return deduped;
    }, []);
  }
  function parsePathPatch(href) {
    let path = (0, import_history.parsePath)(href);
    if (path.search === void 0)
      path.search = "";
    return path;
  }
  var import_history;
  var init_links = __esm({
    "node_modules/@remix-run/react/browser/links.js"() {
      import_history = __toModule(require_main());
      init_routeModules();
    }
  });

  // node_modules/@remix-run/react/browser/markup.js
  function createHtml(html) {
    return {
      __html: html
    };
  }
  var init_markup = __esm({
    "node_modules/@remix-run/react/browser/markup.js"() {
    }
  });

  // node_modules/@remix-run/react/browser/data.js
  function isCatchResponse(response) {
    return response instanceof Response && response.headers.get("X-Remix-Catch") != null;
  }
  function isErrorResponse(response) {
    return response instanceof Response && response.headers.get("X-Remix-Error") != null;
  }
  function isRedirectResponse(response) {
    return response instanceof Response && response.headers.get("X-Remix-Redirect") != null;
  }
  async function fetchData(url, routeId, signal, submission) {
    url.searchParams.set("_data", routeId);
    url.searchParams.sort();
    let init = submission ? getActionInit(submission, signal) : {
      credentials: "same-origin",
      signal
    };
    let response = await fetch(url.href, init);
    if (isErrorResponse(response)) {
      let data = await response.json();
      let error = new Error(data.message);
      error.stack = data.stack;
      return error;
    }
    return response;
  }
  async function extractData(response) {
    let contentType = response.headers.get("Content-Type");
    if (contentType && /\bapplication\/json\b/.test(contentType)) {
      return response.json();
    }
    return response.text();
  }
  function getActionInit(submission, signal) {
    let {
      encType,
      method,
      formData
    } = submission;
    if (encType !== "application/x-www-form-urlencoded") {
      throw new Error(`Only "application/x-www-form-urlencoded" forms are supported right now.`);
    }
    let body = new URLSearchParams();
    for (let [key, value] of formData) {
      invariant(typeof value === "string", "File inputs are not supported right now");
      body.append(key, value);
    }
    return {
      method,
      body: body.toString(),
      signal,
      credentials: "same-origin",
      headers: {
        "Content-Type": encType
      }
    };
  }
  var init_data = __esm({
    "node_modules/@remix-run/react/browser/data.js"() {
      init_invariant();
    }
  });

  // node_modules/@remix-run/react/browser/routeMatching.js
  function matchClientRoutes(routes, location) {
    let matches = (0, import_react_router_dom.matchRoutes)(routes, location);
    if (!matches)
      return null;
    return matches.map((match) => ({
      params: match.params,
      pathname: match.pathname,
      route: match.route
    }));
  }
  var import_react_router_dom;
  var init_routeMatching = __esm({
    "node_modules/@remix-run/react/browser/routeMatching.js"() {
      import_react_router_dom = __toModule(require_main3());
    }
  });

  // node_modules/@remix-run/react/browser/transition.js
  function isActionSubmission(submission) {
    return ["POST", "PUT", "PATCH", "DELETE"].includes(submission.method);
  }
  function isLoaderSubmission(submission) {
    return submission.method === "GET";
  }
  function isRedirectLocation(location) {
    return Boolean(location.state) && location.state.isRedirect;
  }
  function isLoaderRedirectLocation(location) {
    return isRedirectLocation(location) && location.state.type === "loader";
  }
  function isActionRedirectLocation(location) {
    return isRedirectLocation(location) && location.state.type === "action";
  }
  function isFetchActionRedirect(location) {
    return isRedirectLocation(location) && location.state.type === "fetchAction";
  }
  function isLoaderSubmissionRedirectLocation(location) {
    return isRedirectLocation(location) && location.state.type === "loaderSubmission";
  }
  function createTransitionManager(init) {
    let {
      routes
    } = init;
    let pendingNavigationController;
    let fetchControllers = new Map();
    let incrementingLoadId = 0;
    let navigationLoadId = -1;
    let fetchReloadIds = new Map();
    let matches = matchClientRoutes(routes, init.location);
    if (!matches) {
      matches = [{
        params: {},
        pathname: "",
        route: routes[0]
      }];
    }
    let state = {
      location: init.location,
      loaderData: init.loaderData || {},
      actionData: init.actionData,
      catch: init.catch,
      error: init.error,
      catchBoundaryId: init.catchBoundaryId || null,
      errorBoundaryId: init.errorBoundaryId || null,
      matches,
      nextMatches: void 0,
      transition: IDLE_TRANSITION,
      fetchers: new Map()
    };
    function update(updates) {
      state = Object.assign({}, state, updates);
      init.onChange(state);
    }
    function getState() {
      return state;
    }
    function getFetcher(key) {
      return state.fetchers.get(key) || IDLE_FETCHER;
    }
    function deleteFetcher(key) {
      if (fetchControllers.has(key))
        abortFetcher(key);
      fetchReloadIds.delete(key);
      state.fetchers.delete(key);
    }
    async function send(event) {
      switch (event.type) {
        case "navigation": {
          let {
            action,
            location,
            submission
          } = event;
          let matches2 = matchClientRoutes(routes, location);
          if (!matches2) {
            matches2 = [{
              params: {},
              pathname: "",
              route: routes[0]
            }];
            await handleNotFoundNavigation(location, matches2);
          } else if (!submission && isHashChangeOnly(location)) {
            await handleHashChange(location, matches2);
          } else if (action === import_history2.Action.Pop) {
            await handleLoad(location, matches2);
          } else if (submission && isActionSubmission(submission)) {
            await handleActionSubmissionNavigation(location, submission, matches2);
          } else if (submission && isLoaderSubmission(submission)) {
            await handleLoaderSubmissionNavigation(location, submission, matches2);
          } else if (isActionRedirectLocation(location)) {
            await handleActionRedirect(location, matches2);
          } else if (isLoaderSubmissionRedirectLocation(location)) {
            await handleLoaderSubmissionRedirect(location, matches2);
          } else if (isLoaderRedirectLocation(location)) {
            await handleLoaderRedirect(location, matches2);
          } else if (isFetchActionRedirect(location)) {
            await handleFetchActionRedirect(location, matches2);
          } else {
            await handleLoad(location, matches2);
          }
          navigationLoadId = -1;
          break;
        }
        case "fetcher": {
          let {
            key,
            submission,
            href
          } = event;
          let matches2 = matchClientRoutes(routes, href);
          invariant(matches2, "No matches found");
          let match = matches2.slice(-1)[0];
          if (fetchControllers.has(key))
            abortFetcher(key);
          if (submission && isActionSubmission(submission)) {
            await handleActionFetchSubmission(key, submission, match);
          } else if (submission && isLoaderSubmission(submission)) {
            await handleLoaderFetchSubmission(href, key, submission, match);
          } else {
            await handleLoaderFetch(href, key, match);
          }
          break;
        }
        default: {
          throw new Error(`Unknown data event type: ${event.type}`);
        }
      }
    }
    function dispose() {
      abortNormalNavigation();
      for (let [, controller] of fetchControllers) {
        controller.abort();
      }
    }
    async function handleActionFetchSubmission(key, submission, match) {
      let fetcher = {
        state: "submitting",
        type: "actionSubmission",
        submission,
        data: void 0
      };
      state.fetchers.set(key, fetcher);
      update({
        fetchers: new Map(state.fetchers)
      });
      let controller = new AbortController();
      fetchControllers.set(key, controller);
      let result = await callAction(submission, match, controller.signal);
      if (controller.signal.aborted) {
        return;
      }
      if (isRedirectResult(result)) {
        let locationState = {
          isRedirect: true,
          type: "fetchAction"
        };
        init.onRedirect(result.value.location, locationState);
        return;
      }
      if (maybeBailOnError(match, key, result)) {
        return;
      }
      if (await maybeBailOnCatch(match, key, result)) {
        return;
      }
      let loadFetcher = {
        state: "loading",
        type: "actionReload",
        data: result.value,
        submission
      };
      state.fetchers.set(key, loadFetcher);
      update({
        fetchers: new Map(state.fetchers)
      });
      let maybeActionErrorResult = isErrorResult(result) ? result : void 0;
      let maybeActionCatchResult = isCatchResult(result) ? result : void 0;
      let loadId = ++incrementingLoadId;
      fetchReloadIds.set(key, loadId);
      let matchesToLoad = state.nextMatches || state.matches;
      let hrefToLoad = createHref(state.transition.location || state.location);
      let results = await callLoaders(state, createUrl(hrefToLoad), matchesToLoad, controller.signal, maybeActionErrorResult, maybeActionCatchResult, submission, loadFetcher);
      if (controller.signal.aborted) {
        return;
      }
      fetchReloadIds.delete(key);
      fetchControllers.delete(key);
      let redirect2 = findRedirect(results);
      if (redirect2) {
        let locationState = {
          isRedirect: true,
          type: "loader"
        };
        init.onRedirect(redirect2.location, locationState);
        return;
      }
      let [error, errorBoundaryId] = findErrorAndBoundaryId(results, state.matches, maybeActionErrorResult);
      let [catchVal, catchBoundaryId] = await findCatchAndBoundaryId(results, state.matches, maybeActionCatchResult);
      let doneFetcher = {
        state: "idle",
        type: "done",
        data: result.value,
        submission: void 0
      };
      state.fetchers.set(key, doneFetcher);
      let abortedKeys = abortStaleFetchLoads(loadId);
      if (abortedKeys) {
        markFetchersDone(abortedKeys);
      }
      let yeetedNavigation = yeetStaleNavigationLoad(loadId);
      if (yeetedNavigation) {
        let {
          transition
        } = state;
        invariant(transition.state === "loading", "Expected loading transition");
        update({
          location: transition.location,
          matches: state.nextMatches,
          error,
          errorBoundaryId,
          catch: catchVal,
          catchBoundaryId,
          loaderData: makeLoaderData(state, results, matchesToLoad),
          actionData: transition.type === "actionReload" ? state.actionData : void 0,
          transition: IDLE_TRANSITION,
          fetchers: new Map(state.fetchers)
        });
      } else {
        update({
          fetchers: new Map(state.fetchers),
          error,
          errorBoundaryId,
          loaderData: makeLoaderData(state, results, matchesToLoad)
        });
      }
    }
    function yeetStaleNavigationLoad(landedId) {
      let isLoadingNavigation = state.transition.state === "loading";
      if (isLoadingNavigation && navigationLoadId < landedId) {
        abortNormalNavigation();
        return true;
      }
      return false;
    }
    function markFetchersDone(keys) {
      for (let key of keys) {
        let fetcher = getFetcher(key);
        let doneFetcher = {
          state: "idle",
          type: "done",
          data: fetcher.data,
          submission: void 0
        };
        state.fetchers.set(key, doneFetcher);
      }
    }
    function abortStaleFetchLoads(landedId) {
      let yeetedKeys = [];
      for (let [key, id] of fetchReloadIds) {
        if (id < landedId) {
          let fetcher = state.fetchers.get(key);
          invariant(fetcher, `Expected fetcher: ${key}`);
          if (fetcher.state === "loading") {
            abortFetcher(key);
            fetchReloadIds.delete(key);
            yeetedKeys.push(key);
          }
        }
      }
      return yeetedKeys.length ? yeetedKeys : false;
    }
    async function handleLoaderFetchSubmission(href, key, submission, match) {
      let fetcher = {
        state: "submitting",
        type: "loaderSubmission",
        submission,
        data: void 0
      };
      state.fetchers.set(key, fetcher);
      update({
        fetchers: new Map(state.fetchers)
      });
      let controller = new AbortController();
      fetchControllers.set(key, controller);
      let result = await callLoader(match, createUrl(href), controller.signal);
      fetchControllers.delete(key);
      if (controller.signal.aborted) {
        return;
      }
      if (isRedirectResult(result)) {
        let locationState = {
          isRedirect: true,
          type: "loader"
        };
        init.onRedirect(result.value.location, locationState);
        return;
      }
      if (maybeBailOnError(match, key, result)) {
        return;
      }
      if (await maybeBailOnCatch(match, key, result)) {
        return;
      }
      let doneFetcher = {
        state: "idle",
        type: "done",
        data: result.value,
        submission: void 0
      };
      state.fetchers.set(key, doneFetcher);
      update({
        fetchers: new Map(state.fetchers)
      });
    }
    async function handleLoaderFetch(href, key, match) {
      let fetcher = {
        state: "loading",
        type: "normalLoad",
        submission: void 0,
        data: void 0
      };
      state.fetchers.set(key, fetcher);
      update({
        fetchers: new Map(state.fetchers)
      });
      let controller = new AbortController();
      fetchControllers.set(key, controller);
      let result = await callLoader(match, createUrl(href), controller.signal);
      if (controller.signal.aborted)
        return;
      fetchControllers.delete(key);
      if (isRedirectResult(result)) {
        let locationState = {
          isRedirect: true,
          type: "loader"
        };
        init.onRedirect(result.value.location, locationState);
        return;
      }
      if (maybeBailOnError(match, key, result)) {
        return;
      }
      if (await maybeBailOnCatch(match, key, result)) {
        return;
      }
      let doneFetcher = {
        state: "idle",
        type: "done",
        data: result.value,
        submission: void 0
      };
      state.fetchers.set(key, doneFetcher);
      update({
        fetchers: new Map(state.fetchers)
      });
    }
    async function maybeBailOnCatch(match, key, result) {
      if (isCatchResult(result)) {
        let catchBoundaryId = findNearestCatchBoundary(match, state.matches);
        state.fetchers.delete(key);
        update({
          transition: IDLE_TRANSITION,
          fetchers: new Map(state.fetchers),
          catch: {
            data: result.value.data,
            status: result.value.status,
            statusText: result.value.statusText
          },
          catchBoundaryId
        });
        return true;
      }
      return false;
    }
    function maybeBailOnError(match, key, result) {
      if (isErrorResult(result)) {
        let errorBoundaryId = findNearestBoundary(match, state.matches);
        state.fetchers.delete(key);
        update({
          fetchers: new Map(state.fetchers),
          error: result.value,
          errorBoundaryId
        });
        return true;
      }
      return false;
    }
    async function handleNotFoundNavigation(location, matches2) {
      abortNormalNavigation();
      let transition = {
        state: "loading",
        type: "normalLoad",
        submission: void 0,
        location
      };
      update({
        transition,
        nextMatches: matches2
      });
      await Promise.resolve();
      let catchBoundaryId = findNearestCatchBoundary(matches2[0], matches2);
      update({
        location,
        matches: matches2,
        catch: {
          data: null,
          status: 404,
          statusText: "Not Found"
        },
        catchBoundaryId,
        transition: IDLE_TRANSITION
      });
    }
    async function handleActionSubmissionNavigation(location, submission, matches2) {
      abortNormalNavigation();
      let transition = {
        state: "submitting",
        type: "actionSubmission",
        submission,
        location
      };
      update({
        transition,
        nextMatches: matches2
      });
      let controller = new AbortController();
      pendingNavigationController = controller;
      if (!isIndexRequestAction(submission.action) && matches2[matches2.length - 1].route.id.endsWith("/index")) {
        matches2 = matches2.slice(0, -1);
      }
      let leafMatch = matches2.slice(-1)[0];
      let result = await callAction(submission, leafMatch, controller.signal);
      if (controller.signal.aborted) {
        return;
      }
      if (isRedirectResult(result)) {
        let locationState = {
          isRedirect: true,
          type: "action"
        };
        init.onRedirect(result.value.location, locationState);
        return;
      }
      if (isCatchResult(result)) {
        let [catchVal, catchBoundaryId] = await findCatchAndBoundaryId([result], matches2, result);
        update({
          transition: IDLE_TRANSITION,
          catch: catchVal,
          catchBoundaryId
        });
        return;
      }
      let loadTransition = {
        state: "loading",
        type: "actionReload",
        submission,
        location
      };
      update({
        transition: loadTransition,
        actionData: {
          [leafMatch.route.id]: result.value
        }
      });
      await loadPageData(location, matches2, submission, result);
    }
    async function handleLoaderSubmissionNavigation(location, submission, matches2) {
      abortNormalNavigation();
      let transition = {
        state: "submitting",
        type: "loaderSubmission",
        submission,
        location
      };
      update({
        transition,
        nextMatches: matches2
      });
      await loadPageData(location, matches2, submission);
    }
    async function handleHashChange(location, matches2) {
      abortNormalNavigation();
      let transition = {
        state: "loading",
        type: "normalLoad",
        submission: void 0,
        location
      };
      update({
        transition,
        nextMatches: matches2
      });
      await Promise.resolve();
      update({
        location,
        matches: matches2,
        transition: IDLE_TRANSITION
      });
    }
    async function handleLoad(location, matches2) {
      abortNormalNavigation();
      let transition = {
        state: "loading",
        type: "normalLoad",
        submission: void 0,
        location
      };
      update({
        transition,
        nextMatches: matches2
      });
      await loadPageData(location, matches2);
    }
    async function handleLoaderRedirect(location, matches2) {
      abortNormalNavigation();
      let transition = {
        state: "loading",
        type: "normalRedirect",
        submission: void 0,
        location
      };
      update({
        transition,
        nextMatches: matches2
      });
      await loadPageData(location, matches2);
    }
    async function handleLoaderSubmissionRedirect(location, matches2) {
      abortNormalNavigation();
      invariant(state.transition.type === "loaderSubmission", `Unexpected transition: ${JSON.stringify(state.transition)}`);
      let {
        submission
      } = state.transition;
      let transition = {
        state: "loading",
        type: "loaderSubmissionRedirect",
        submission,
        location
      };
      update({
        transition,
        nextMatches: matches2
      });
      await loadPageData(location, matches2, submission);
    }
    async function handleFetchActionRedirect(location, matches2) {
      abortNormalNavigation();
      let transition = {
        state: "loading",
        type: "fetchActionRedirect",
        submission: void 0,
        location
      };
      update({
        transition,
        nextMatches: matches2
      });
      await loadPageData(location, matches2);
    }
    async function handleActionRedirect(location, matches2) {
      abortNormalNavigation();
      invariant(state.transition.type === "actionSubmission" || state.transition.type === "actionReload", `Unexpected transition: ${JSON.stringify(state.transition)}`);
      let {
        submission
      } = state.transition;
      let transition = {
        state: "loading",
        type: "actionRedirect",
        submission,
        location
      };
      update({
        transition,
        nextMatches: matches2
      });
      await loadPageData(location, matches2, submission);
    }
    function isHashChangeOnly(location) {
      return createHref(state.location) === createHref(location) && state.location.hash !== location.hash;
    }
    async function loadPageData(location, matches2, submission, actionResult) {
      let maybeActionErrorResult = actionResult && isErrorResult(actionResult) ? actionResult : void 0;
      let maybeActionCatchResult = actionResult && isCatchResult(actionResult) ? actionResult : void 0;
      let controller = new AbortController();
      pendingNavigationController = controller;
      navigationLoadId = ++incrementingLoadId;
      let results = await callLoaders(state, createUrl(createHref(location)), matches2, controller.signal, maybeActionErrorResult, maybeActionCatchResult, submission);
      if (controller.signal.aborted) {
        return;
      }
      let redirect2 = findRedirect(results);
      if (redirect2) {
        if (state.transition.type === "actionReload") {
          let locationState = {
            isRedirect: true,
            type: "action"
          };
          init.onRedirect(redirect2.location, locationState);
        } else if (state.transition.type === "loaderSubmission") {
          let locationState = {
            isRedirect: true,
            type: "loaderSubmission"
          };
          init.onRedirect(redirect2.location, locationState);
        } else {
          let locationState = {
            isRedirect: true,
            type: "loader"
          };
          init.onRedirect(redirect2.location, locationState);
        }
        return;
      }
      let [error, errorBoundaryId] = findErrorAndBoundaryId(results, matches2, maybeActionErrorResult);
      let [catchVal, catchBoundaryId] = await findCatchAndBoundaryId(results, matches2, maybeActionErrorResult);
      let abortedIds = abortStaleFetchLoads(navigationLoadId);
      if (abortedIds) {
        markFetchersDone(abortedIds);
      }
      update({
        location,
        matches: matches2,
        error,
        errorBoundaryId,
        catch: catchVal,
        catchBoundaryId,
        loaderData: makeLoaderData(state, results, matches2),
        actionData: state.transition.type === "actionReload" ? state.actionData : void 0,
        transition: IDLE_TRANSITION,
        fetchers: abortedIds ? new Map(state.fetchers) : state.fetchers
      });
    }
    function abortNormalNavigation() {
      var _pendingNavigationCon;
      (_pendingNavigationCon = pendingNavigationController) === null || _pendingNavigationCon === void 0 ? void 0 : _pendingNavigationCon.abort();
    }
    function abortFetcher(key) {
      let controller = fetchControllers.get(key);
      invariant(controller, `Expected fetch controller: ${key}`);
      controller.abort();
      fetchControllers.delete(key);
    }
    return {
      send,
      getState,
      getFetcher,
      deleteFetcher,
      dispose,
      get _internalFetchControllers() {
        return fetchControllers;
      }
    };
  }
  function isIndexRequestAction(action) {
    let indexRequest = false;
    let searchParams = new URLSearchParams(action.split("?", 2)[1] || "");
    for (let param of searchParams.getAll("index")) {
      if (!param) {
        indexRequest = true;
      }
    }
    return indexRequest;
  }
  async function callLoaders(state, url, matches, signal, actionErrorResult, actionCatchResult, submission, fetcher) {
    let matchesToLoad = filterMatchesToLoad(state, url, matches, actionErrorResult, actionCatchResult, submission, fetcher);
    return Promise.all(matchesToLoad.map((match) => callLoader(match, url, signal)));
  }
  async function callLoader(match, url, signal) {
    invariant(match.route.loader, `Expected loader for ${match.route.id}`);
    try {
      let {
        params
      } = match;
      let value = await match.route.loader({
        params,
        url,
        signal
      });
      return {
        match,
        value
      };
    } catch (error) {
      return {
        match,
        value: error
      };
    }
  }
  async function callAction(submission, match, signal) {
    if (!match.route.action) {
      throw new Error(`Route "${match.route.id}" does not have an action, but you are trying to submit to it. To fix this, please add an \`action\` function to the route`);
    }
    try {
      let value = await match.route.action({
        url: createUrl(submission.action),
        params: match.params,
        submission,
        signal
      });
      return {
        match,
        value
      };
    } catch (error) {
      return {
        match,
        value: error
      };
    }
  }
  function filterMatchesToLoad(state, url, matches, actionErrorResult, actionCatchResult, submission, fetcher) {
    let isNew = (match, index) => {
      if (!state.matches[index])
        return true;
      return match.route.id !== state.matches[index].route.id;
    };
    let matchPathChanged = (match, index) => {
      var _state$matches$index$;
      return state.matches[index].pathname !== match.pathname || ((_state$matches$index$ = state.matches[index].route.path) === null || _state$matches$index$ === void 0 ? void 0 : _state$matches$index$.endsWith("*")) && state.matches[index].params["*"] !== match.params["*"];
    };
    let filterByRouteProps = (match, index) => {
      if (!match.route.loader) {
        return false;
      }
      if (isNew(match, index) || matchPathChanged(match, index)) {
        return true;
      }
      if (match.route.shouldReload) {
        let prevUrl = createUrl(createHref(state.location));
        return match.route.shouldReload({
          prevUrl,
          url,
          submission,
          params: match.params
        });
      }
      return true;
    };
    let isInRootCatchBoundary = state.matches.length === 1;
    if (isInRootCatchBoundary) {
      return matches.filter((match) => !!match.route.loader);
    }
    if ((fetcher === null || fetcher === void 0 ? void 0 : fetcher.type) === "actionReload") {
      return matches.filter(filterByRouteProps);
    } else if (state.transition.type === "actionReload" || state.transition.type === "actionRedirect" || createHref(url) === createHref(state.location) || url.searchParams.toString() !== state.location.search) {
      return matches.filter(filterByRouteProps);
    }
    return matches.filter((match, index, arr) => {
      if ((actionErrorResult || actionCatchResult) && arr.length - 1 === index) {
        return false;
      }
      return match.route.loader && (isNew(match, index) || matchPathChanged(match, index));
    });
  }
  function isRedirectResult(result) {
    return result.value instanceof TransitionRedirect;
  }
  function createHref(location) {
    return location.pathname + location.search;
  }
  function findRedirect(results) {
    for (let result of results) {
      if (isRedirectResult(result)) {
        return result.value;
      }
    }
    return null;
  }
  async function findCatchAndBoundaryId(results, matches, actionCatchResult) {
    let loaderCatchResult;
    for (let result of results) {
      if (isCatchResult(result)) {
        loaderCatchResult = result;
        break;
      }
    }
    let extractCatchData = async (res) => ({
      status: res.status,
      statusText: res.statusText,
      data: res.data
    });
    if (actionCatchResult && loaderCatchResult) {
      let boundaryId = findNearestCatchBoundary(loaderCatchResult.match, matches);
      return [await extractCatchData(actionCatchResult.value), boundaryId];
    }
    if (loaderCatchResult) {
      let boundaryId = findNearestCatchBoundary(loaderCatchResult.match, matches);
      return [await extractCatchData(loaderCatchResult.value), boundaryId];
    }
    return [void 0, void 0];
  }
  function findErrorAndBoundaryId(results, matches, actionErrorResult) {
    let loaderErrorResult;
    for (let result of results) {
      if (isErrorResult(result)) {
        loaderErrorResult = result;
        break;
      }
    }
    if (actionErrorResult && loaderErrorResult) {
      let boundaryId = findNearestBoundary(loaderErrorResult.match, matches);
      return [actionErrorResult.value, boundaryId];
    }
    if (actionErrorResult) {
      let boundaryId = findNearestBoundary(actionErrorResult.match, matches);
      return [actionErrorResult.value, boundaryId];
    }
    if (loaderErrorResult) {
      let boundaryId = findNearestBoundary(loaderErrorResult.match, matches);
      return [loaderErrorResult.value, boundaryId];
    }
    return [void 0, void 0];
  }
  function findNearestCatchBoundary(matchWithError, matches) {
    let nearestBoundaryId = null;
    for (let match of matches) {
      if (match.route.CatchBoundary) {
        nearestBoundaryId = match.route.id;
      }
      if (match === matchWithError) {
        break;
      }
    }
    return nearestBoundaryId;
  }
  function findNearestBoundary(matchWithError, matches) {
    let nearestBoundaryId = null;
    for (let match of matches) {
      if (match.route.ErrorBoundary) {
        nearestBoundaryId = match.route.id;
      }
      if (match === matchWithError) {
        break;
      }
    }
    return nearestBoundaryId;
  }
  function makeLoaderData(state, results, matches) {
    let newData = {};
    for (let {
      match,
      value
    } of results) {
      newData[match.route.id] = value;
    }
    let loaderData = {};
    for (let {
      route
    } of matches) {
      let value = newData[route.id] !== void 0 ? newData[route.id] : state.loaderData[route.id];
      if (value !== void 0) {
        loaderData[route.id] = value;
      }
    }
    return loaderData;
  }
  function isCatchResult(result) {
    return result.value instanceof CatchValue;
  }
  function isErrorResult(result) {
    return result.value instanceof Error;
  }
  function createUrl(href) {
    return new URL(href, window.location.origin);
  }
  var import_history2, CatchValue, TransitionRedirect, IDLE_TRANSITION, IDLE_FETCHER;
  var init_transition = __esm({
    "node_modules/@remix-run/react/browser/transition.js"() {
      import_history2 = __toModule(require_main());
      init_routeMatching();
      init_invariant();
      CatchValue = class {
        constructor(status, statusText, data) {
          this.status = status;
          this.statusText = statusText;
          this.data = data;
        }
      };
      TransitionRedirect = class {
        constructor(location) {
          this.location = typeof location === "string" ? location : location.pathname + location.search;
        }
      };
      IDLE_TRANSITION = {
        state: "idle",
        submission: void 0,
        location: void 0,
        type: "idle"
      };
      IDLE_FETCHER = {
        state: "idle",
        type: "init",
        data: void 0,
        submission: void 0
      };
    }
  });

  // node_modules/@remix-run/react/browser/routes.js
  function createClientRoute(entryRoute, routeModulesCache, Component) {
    return {
      caseSensitive: !!entryRoute.caseSensitive,
      element: /* @__PURE__ */ import_react2.default.createElement(Component, {
        id: entryRoute.id
      }),
      id: entryRoute.id,
      path: entryRoute.path,
      index: entryRoute.index,
      module: entryRoute.module,
      loader: createLoader(entryRoute, routeModulesCache),
      action: createAction(entryRoute),
      shouldReload: createShouldReload(entryRoute, routeModulesCache),
      ErrorBoundary: entryRoute.hasErrorBoundary,
      CatchBoundary: entryRoute.hasCatchBoundary,
      hasLoader: entryRoute.hasLoader
    };
  }
  function createClientRoutes(routeManifest, routeModulesCache, Component, parentId) {
    return Object.keys(routeManifest).filter((key) => routeManifest[key].parentId === parentId).map((key) => {
      let route = createClientRoute(routeManifest[key], routeModulesCache, Component);
      let children = createClientRoutes(routeManifest, routeModulesCache, Component, route.id);
      if (children.length > 0)
        route.children = children;
      return route;
    });
  }
  function createShouldReload(route, routeModules) {
    let shouldReload = (arg) => {
      let module = routeModules[route.id];
      invariant(module, `Expected route module to be loaded for ${route.id}`);
      if (module.unstable_shouldReload) {
        return module.unstable_shouldReload(arg);
      }
      return true;
    };
    return shouldReload;
  }
  async function loadRouteModuleWithBlockingLinks(route, routeModules) {
    let routeModule = await loadRouteModule(route, routeModules);
    await prefetchStyleLinks(routeModule);
    return routeModule;
  }
  function createLoader(route, routeModules) {
    let loader = async ({
      url,
      signal,
      submission
    }) => {
      if (route.hasLoader) {
        let [result] = await Promise.all([fetchData(url, route.id, signal, submission), loadRouteModuleWithBlockingLinks(route, routeModules)]);
        if (result instanceof Error)
          throw result;
        let redirect2 = await checkRedirect(result);
        if (redirect2)
          return redirect2;
        if (isCatchResponse(result)) {
          throw new CatchValue(result.status, result.statusText, await extractData(result.clone()));
        }
        let data = await extractData(result);
        return data;
      } else {
        await loadRouteModuleWithBlockingLinks(route, routeModules);
      }
    };
    return loader;
  }
  function createAction(route) {
    if (!route.hasAction)
      return void 0;
    let action = async ({
      url,
      signal,
      submission
    }) => {
      let result = await fetchData(url, route.id, signal, submission);
      if (result instanceof Error) {
        throw result;
      }
      if (isCatchResponse(result)) {
        throw new CatchValue(result.status, result.statusText, await extractData(result.clone()));
      }
      let redirect2 = await checkRedirect(result);
      if (redirect2)
        return redirect2;
      return extractData(result);
    };
    return action;
  }
  async function checkRedirect(response) {
    if (isRedirectResponse(response)) {
      let url = new URL(response.headers.get("X-Remix-Redirect"), window.location.origin);
      if (url.origin !== window.location.origin) {
        await new Promise(() => {
          window.location.replace(url.href);
        });
      } else {
        return new TransitionRedirect(url.pathname + url.search);
      }
    }
    return null;
  }
  var import_react2;
  var init_routes = __esm({
    "node_modules/@remix-run/react/browser/routes.js"() {
      import_react2 = __toModule(require_react());
      init_routeModules();
      init_data();
      init_transition();
      init_links();
      init_invariant();
    }
  });

  // node_modules/@remix-run/react/browser/components.js
  function useRemixEntryContext() {
    let context = import_react3.default.useContext(RemixEntryContext);
    invariant(context, "You must render this element inside a <Remix> element");
    return context;
  }
  function RemixEntry({
    context: entryContext,
    action,
    location: historyLocation,
    navigator: _navigator,
    static: staticProp = false
  }) {
    let {
      manifest,
      routeData: documentLoaderData,
      actionData: documentActionData,
      routeModules,
      serverHandoffString,
      componentDidCatchEmulator: entryComponentDidCatchEmulator
    } = entryContext;
    let clientRoutes = import_react3.default.useMemo(() => createClientRoutes(manifest.routes, routeModules, RemixRoute), [manifest, routeModules]);
    let [clientState, setClientState] = import_react3.default.useState(entryComponentDidCatchEmulator);
    let [transitionManager] = import_react3.default.useState(() => {
      return createTransitionManager({
        routes: clientRoutes,
        actionData: documentActionData,
        loaderData: documentLoaderData,
        location: historyLocation,
        catch: entryComponentDidCatchEmulator.catch,
        catchBoundaryId: entryComponentDidCatchEmulator.catchBoundaryRouteId,
        onRedirect: _navigator.replace,
        onChange: (state) => {
          setClientState({
            catch: state.catch,
            error: state.error,
            catchBoundaryRouteId: state.catchBoundaryId,
            loaderBoundaryRouteId: state.errorBoundaryId,
            renderBoundaryRouteId: null,
            trackBoundaries: false,
            trackCatchBoundaries: false
          });
        }
      });
    });
    let navigator = import_react3.default.useMemo(() => {
      let push = (to, state) => {
        return transitionManager.getState().transition.state !== "idle" ? _navigator.replace(to, state) : _navigator.push(to, state);
      };
      return {
        ..._navigator,
        push
      };
    }, [_navigator, transitionManager]);
    let {
      location,
      matches,
      loaderData,
      actionData
    } = transitionManager.getState();
    import_react3.default.useEffect(() => {
      let {
        location: location2
      } = transitionManager.getState();
      if (historyLocation === location2)
        return;
      transitionManager.send({
        type: "navigation",
        location: historyLocation,
        submission: consumeNextNavigationSubmission(),
        action
      });
    }, [transitionManager, historyLocation, action]);
    let ssrErrorBeforeRoutesRendered = clientState.error && clientState.renderBoundaryRouteId === null && clientState.loaderBoundaryRouteId === null ? deserializeError(clientState.error) : void 0;
    let ssrCatchBeforeRoutesRendered = clientState.catch && clientState.catchBoundaryRouteId === null ? clientState.catch : void 0;
    return /* @__PURE__ */ import_react3.default.createElement(RemixEntryContext.Provider, {
      value: {
        matches,
        manifest,
        componentDidCatchEmulator: clientState,
        routeModules,
        serverHandoffString,
        clientRoutes,
        routeData: loaderData,
        actionData,
        transitionManager
      }
    }, /* @__PURE__ */ import_react3.default.createElement(RemixErrorBoundary, {
      location,
      component: RemixRootDefaultErrorBoundary,
      error: ssrErrorBeforeRoutesRendered
    }, /* @__PURE__ */ import_react3.default.createElement(RemixCatchBoundary, {
      location,
      component: RemixRootDefaultCatchBoundary,
      catch: ssrCatchBeforeRoutesRendered
    }, /* @__PURE__ */ import_react3.default.createElement(import_react_router_dom2.Router, {
      navigationType: action,
      location,
      navigator,
      static: staticProp
    }, /* @__PURE__ */ import_react3.default.createElement(Routes, null)))));
  }
  function deserializeError(data) {
    let error = new Error(data.message);
    error.stack = data.stack;
    return error;
  }
  function Routes() {
    let {
      clientRoutes
    } = useRemixEntryContext();
    let element = (0, import_react_router_dom2.useRoutes)(clientRoutes) || clientRoutes[0].element;
    return element;
  }
  function useRemixRouteContext() {
    let context = import_react3.default.useContext(RemixRouteContext);
    invariant(context, "You must render this element in a remix route element");
    return context;
  }
  function DefaultRouteComponent({
    id
  }) {
    throw new Error(`Route "${id}" has no component! Please go add a \`default\` export in the route module file.
If you were trying to navigate or submit to a resource route, use \`<a>\` instead of \`<Link>\` or \`<Form reloadDocument>\`.`);
  }
  function RemixRoute({
    id
  }) {
    let location = (0, import_react_router_dom2.useLocation)();
    let {
      routeData,
      routeModules,
      componentDidCatchEmulator
    } = useRemixEntryContext();
    let data = routeData[id];
    let {
      default: Component,
      CatchBoundary,
      ErrorBoundary
    } = routeModules[id];
    let element = Component ? /* @__PURE__ */ import_react3.default.createElement(Component, null) : /* @__PURE__ */ import_react3.default.createElement(DefaultRouteComponent, {
      id
    });
    let context = {
      data,
      id
    };
    if (CatchBoundary) {
      let maybeServerCaught = componentDidCatchEmulator.catch && componentDidCatchEmulator.catchBoundaryRouteId === id ? componentDidCatchEmulator.catch : void 0;
      if (componentDidCatchEmulator.trackCatchBoundaries) {
        componentDidCatchEmulator.catchBoundaryRouteId = id;
      }
      context = maybeServerCaught ? {
        id,
        get data() {
          console.error("You cannot `useLoaderData` in a catch boundary.");
          return void 0;
        }
      } : {
        id,
        data
      };
      element = /* @__PURE__ */ import_react3.default.createElement(RemixCatchBoundary, {
        location,
        component: CatchBoundary,
        catch: maybeServerCaught
      }, element);
    }
    if (ErrorBoundary) {
      let maybeServerRenderError = componentDidCatchEmulator.error && (componentDidCatchEmulator.renderBoundaryRouteId === id || componentDidCatchEmulator.loaderBoundaryRouteId === id) ? deserializeError(componentDidCatchEmulator.error) : void 0;
      if (componentDidCatchEmulator.trackBoundaries) {
        componentDidCatchEmulator.renderBoundaryRouteId = id;
      }
      context = maybeServerRenderError ? {
        id,
        get data() {
          console.error("You cannot `useLoaderData` in an error boundary.");
          return void 0;
        }
      } : {
        id,
        data
      };
      element = /* @__PURE__ */ import_react3.default.createElement(RemixErrorBoundary, {
        location,
        component: ErrorBoundary,
        error: maybeServerRenderError
      }, element);
    }
    return /* @__PURE__ */ import_react3.default.createElement(RemixRouteContext.Provider, {
      value: context
    }, element);
  }
  function usePrefetchBehavior(prefetch, theirElementProps) {
    let [maybePrefetch, setMaybePrefetch] = import_react3.default.useState(false);
    let [shouldPrefetch, setShouldPrefetch] = import_react3.default.useState(false);
    let {
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      onTouchStart
    } = theirElementProps;
    import_react3.default.useEffect(() => {
      if (prefetch === "render") {
        setShouldPrefetch(true);
      }
    }, [prefetch]);
    let setIntent = () => {
      if (prefetch === "intent") {
        setMaybePrefetch(true);
      }
    };
    let cancelIntent = () => {
      if (prefetch === "intent") {
        setMaybePrefetch(false);
      }
    };
    import_react3.default.useEffect(() => {
      if (maybePrefetch) {
        let id = setTimeout(() => {
          setShouldPrefetch(true);
        }, 100);
        return () => {
          clearTimeout(id);
        };
      }
    }, [maybePrefetch]);
    return [shouldPrefetch, {
      onFocus: composeEventHandlers(onFocus, setIntent),
      onBlur: composeEventHandlers(onBlur, cancelIntent),
      onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
      onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
      onTouchStart: composeEventHandlers(onTouchStart, setIntent)
    }];
  }
  function composeEventHandlers(theirHandler, ourHandler) {
    return (event) => {
      theirHandler && theirHandler(event);
      if (!event.defaultPrevented) {
        ourHandler(event);
      }
    };
  }
  function Links() {
    let {
      matches,
      routeModules,
      manifest
    } = useRemixEntryContext();
    let links = import_react3.default.useMemo(() => getLinksForMatches(matches, routeModules, manifest), [matches, routeModules, manifest]);
    return /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, links.map((link) => isPageLinkDescriptor(link) ? /* @__PURE__ */ import_react3.default.createElement(PrefetchPageLinks, _extends({
      key: link.page
    }, link)) : /* @__PURE__ */ import_react3.default.createElement("link", _extends({
      key: link.rel + link.href
    }, link))));
  }
  function PrefetchPageLinks({
    page,
    ...dataLinkProps
  }) {
    let {
      clientRoutes
    } = useRemixEntryContext();
    let matches = import_react3.default.useMemo(() => matchClientRoutes(clientRoutes, page), [clientRoutes, page]);
    if (!matches) {
      console.warn(`Tried to prefetch ${page} but no routes matched.`);
      return null;
    }
    return /* @__PURE__ */ import_react3.default.createElement(PrefetchPageLinksImpl, _extends({
      page,
      matches
    }, dataLinkProps));
  }
  function usePrefetchedStylesheets(matches) {
    let {
      routeModules
    } = useRemixEntryContext();
    let [styleLinks, setStyleLinks] = import_react3.default.useState([]);
    import_react3.default.useEffect(() => {
      let interrupted = false;
      getStylesheetPrefetchLinks(matches, routeModules).then((links) => {
        if (!interrupted)
          setStyleLinks(links);
      });
      return () => {
        interrupted = true;
      };
    }, [matches, routeModules]);
    return styleLinks;
  }
  function PrefetchPageLinksImpl({
    page,
    matches: nextMatches,
    ...linkProps
  }) {
    let location = (0, import_react_router_dom2.useLocation)();
    let {
      matches,
      manifest
    } = useRemixEntryContext();
    let newMatchesForData = import_react3.default.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, location, "data"), [page, nextMatches, matches, location]);
    let newMatchesForAssets = import_react3.default.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, location, "assets"), [page, nextMatches, matches, location]);
    let dataHrefs = import_react3.default.useMemo(() => getDataLinkHrefs(page, newMatchesForData, manifest), [newMatchesForData, page, manifest]);
    let moduleHrefs = import_react3.default.useMemo(() => getModuleLinkHrefs(newMatchesForAssets, manifest), [newMatchesForAssets, manifest]);
    let styleLinks = usePrefetchedStylesheets(newMatchesForAssets);
    return /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ import_react3.default.createElement("link", _extends({
      key: href,
      rel: "prefetch",
      as: "fetch",
      href
    }, linkProps))), moduleHrefs.map((href) => /* @__PURE__ */ import_react3.default.createElement("link", _extends({
      key: href,
      rel: "modulepreload",
      href
    }, linkProps))), styleLinks.map((link) => /* @__PURE__ */ import_react3.default.createElement("link", _extends({
      key: link.href
    }, link))));
  }
  function Meta() {
    let {
      matches,
      routeData,
      routeModules
    } = useRemixEntryContext();
    let location = (0, import_react_router_dom2.useLocation)();
    let meta = {};
    let parentsData = {};
    for (let match of matches) {
      let routeId = match.route.id;
      let data = routeData[routeId];
      let params = match.params;
      let routeModule = routeModules[routeId];
      if (routeModule.meta) {
        let routeMeta = typeof routeModule.meta === "function" ? routeModule.meta({
          data,
          parentsData,
          params,
          location
        }) : routeModule.meta;
        Object.assign(meta, routeMeta);
      }
      parentsData[routeId] = data;
    }
    return /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, Object.keys(meta).map((name) => {
      let value = meta[name];
      let isOpenGraphTag = name.startsWith("og:");
      return name === "title" ? /* @__PURE__ */ import_react3.default.createElement("title", {
        key: "title"
      }, meta[name]) : Array.isArray(value) ? value.map((content) => isOpenGraphTag ? /* @__PURE__ */ import_react3.default.createElement("meta", {
        key: name + content,
        property: name,
        content
      }) : /* @__PURE__ */ import_react3.default.createElement("meta", {
        key: name + content,
        name,
        content
      })) : isOpenGraphTag ? /* @__PURE__ */ import_react3.default.createElement("meta", {
        key: name,
        property: name,
        content: value
      }) : /* @__PURE__ */ import_react3.default.createElement("meta", {
        key: name,
        name,
        content: value
      });
    }));
  }
  function Scripts(props) {
    let {
      manifest,
      matches,
      pendingLocation,
      clientRoutes,
      serverHandoffString
    } = useRemixEntryContext();
    let initialScripts = import_react3.default.useMemo(() => {
      let contextScript = serverHandoffString ? `window.__remixContext = ${serverHandoffString};` : "";
      let routeModulesScript = `${matches.map((match, index) => `import * as route${index} from ${JSON.stringify(manifest.routes[match.route.id].module)};`).join("\n")}
window.__remixRouteModules = {${matches.map((match, index) => `${JSON.stringify(match.route.id)}:route${index}`).join(",")}};`;
      return /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, /* @__PURE__ */ import_react3.default.createElement("script", _extends({}, props, {
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: createHtml(contextScript)
      })), /* @__PURE__ */ import_react3.default.createElement("script", _extends({}, props, {
        src: manifest.url
      })), /* @__PURE__ */ import_react3.default.createElement("script", _extends({}, props, {
        dangerouslySetInnerHTML: createHtml(routeModulesScript),
        type: "module"
      })), /* @__PURE__ */ import_react3.default.createElement("script", _extends({}, props, {
        src: manifest.entry.module,
        type: "module"
      })));
    }, []);
    let nextMatches = import_react3.default.useMemo(() => {
      if (pendingLocation) {
        let matches2 = matchClientRoutes(clientRoutes, pendingLocation);
        invariant(matches2, `No routes match path "${pendingLocation.pathname}"`);
        return matches2;
      }
      return [];
    }, [pendingLocation, clientRoutes]);
    let routePreloads = matches.concat(nextMatches).map((match) => {
      let route = manifest.routes[match.route.id];
      return (route.imports || []).concat([route.module]);
    }).flat(1);
    let preloads = manifest.entry.imports.concat(routePreloads);
    return /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, dedupe2(preloads).map((path) => /* @__PURE__ */ import_react3.default.createElement("link", {
      key: path,
      rel: "modulepreload",
      href: path,
      crossOrigin: props.crossOrigin
    })), initialScripts);
  }
  function dedupe2(array) {
    return [...new Set(array)];
  }
  function isActionRequestMethod(method) {
    method = method.toLowerCase();
    return method === "post" || method === "put" || method === "patch" || method === "delete";
  }
  function useFormAction(action = ".", method = "get") {
    let {
      id
    } = useRemixRouteContext();
    let path = (0, import_react_router_dom2.useResolvedPath)(action);
    let search = path.search;
    let isIndexRoute = id.endsWith("/index");
    if (action === "." && isIndexRoute && isActionRequestMethod(method)) {
      search = search ? search.replace(/^\?/, "?index&") : "?index";
    }
    return path.pathname + search;
  }
  function useSubmit() {
    return useSubmitImpl();
  }
  function useSubmitImpl(key) {
    let navigate = (0, import_react_router_dom2.useNavigate)();
    let defaultAction = useFormAction();
    let {
      transitionManager
    } = useRemixEntryContext();
    return import_react3.default.useCallback((target, options = {}) => {
      let method;
      let action;
      let encType;
      let formData;
      if (isFormElement(target)) {
        let submissionTrigger = options.submissionTrigger;
        method = options.method || target.method;
        action = options.action || target.action;
        encType = options.encType || target.enctype;
        formData = new FormData(target);
        if (submissionTrigger && submissionTrigger.name) {
          formData.append(submissionTrigger.name, submissionTrigger.value);
        }
      } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
        let form = target.form;
        if (form == null) {
          throw new Error(`Cannot submit a <button> without a <form>`);
        }
        method = options.method || target.getAttribute("formmethod") || form.method;
        action = options.action || target.getAttribute("formaction") || form.action;
        encType = options.encType || target.getAttribute("formenctype") || form.enctype;
        formData = new FormData(form);
        if (target.name) {
          formData.set(target.name, target.value);
        }
      } else {
        if (isHtmlElement(target)) {
          throw new Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);
        }
        method = options.method || "get";
        action = options.action || defaultAction;
        encType = options.encType || "application/x-www-form-urlencoded";
        if (target instanceof FormData) {
          formData = target;
        } else {
          formData = new FormData();
          if (target instanceof URLSearchParams) {
            for (let [name, value] of target) {
              formData.set(name, value);
            }
          } else if (target != null) {
            for (let name of Object.keys(target)) {
              formData.set(name, target[name]);
            }
          }
        }
      }
      let {
        protocol,
        host
      } = window.location;
      let url = new URL(action, `${protocol}//${host}`);
      if (method.toLowerCase() === "get") {
        for (let [name, value] of formData) {
          if (typeof value === "string") {
            url.searchParams.set(name, value);
          } else {
            throw new Error(`Cannot submit binary form data using GET`);
          }
        }
      }
      let submission = {
        formData,
        action: url.pathname + url.search,
        method: method.toUpperCase(),
        encType,
        key: Math.random().toString(36).substr(2, 8)
      };
      if (key) {
        transitionManager.send({
          type: "fetcher",
          href: submission.action,
          submission,
          key
        });
      } else {
        setNextNavigationSubmission(submission);
        navigate(url.pathname + url.search, {
          replace: options.replace
        });
      }
    }, [defaultAction, key, navigate, transitionManager]);
  }
  function setNextNavigationSubmission(submission) {
    nextNavigationSubmission = submission;
  }
  function consumeNextNavigationSubmission() {
    let submission = nextNavigationSubmission;
    nextNavigationSubmission = void 0;
    return submission;
  }
  function isHtmlElement(object) {
    return object != null && typeof object.tagName === "string";
  }
  function isButtonElement(object) {
    return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
  }
  function isFormElement(object) {
    return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
  }
  function isInputElement(object) {
    return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
  }
  function useBeforeUnload(callback) {
    import_react3.default.useEffect(() => {
      window.addEventListener("beforeunload", callback);
      return () => {
        window.removeEventListener("beforeunload", callback);
      };
    }, [callback]);
  }
  function useMatches() {
    let {
      matches,
      routeData,
      routeModules
    } = useRemixEntryContext();
    return matches.map((match) => {
      let {
        pathname,
        params
      } = match;
      return {
        pathname,
        params,
        data: routeData[match.route.id],
        handle: routeModules[match.route.id].handle
      };
    });
  }
  function useLoaderData() {
    return useRemixRouteContext().data;
  }
  function useActionData() {
    let {
      id: routeId
    } = useRemixRouteContext();
    let {
      transitionManager
    } = useRemixEntryContext();
    let {
      actionData
    } = transitionManager.getState();
    return actionData ? actionData[routeId] : void 0;
  }
  function useTransition() {
    let {
      transitionManager
    } = useRemixEntryContext();
    return transitionManager.getState().transition;
  }
  function createFetcherForm(fetchKey) {
    return /* @__PURE__ */ import_react3.default.forwardRef((props, ref) => {
      return /* @__PURE__ */ import_react3.default.createElement(FormImpl, _extends({}, props, {
        ref,
        fetchKey
      }));
    });
  }
  function useFetcher() {
    let {
      transitionManager
    } = useRemixEntryContext();
    let [key] = import_react3.default.useState(() => String(++fetcherId));
    let [Form2] = import_react3.default.useState(() => createFetcherForm(key));
    let [load] = import_react3.default.useState(() => (href) => {
      transitionManager.send({
        type: "fetcher",
        href,
        key
      });
    });
    let submit = useSubmitImpl(key);
    let fetcher = transitionManager.getFetcher(key);
    let fetcherWithComponents = import_react3.default.useMemo(() => ({
      Form: Form2,
      submit,
      load,
      ...fetcher
    }), [fetcher, Form2, submit, load]);
    import_react3.default.useEffect(() => {
      return () => transitionManager.deleteFetcher(key);
    }, [transitionManager, key]);
    return fetcherWithComponents;
  }
  function useFetchers() {
    let {
      transitionManager
    } = useRemixEntryContext();
    let {
      fetchers
    } = transitionManager.getState();
    return [...fetchers.values()];
  }
  function LiveReload({
    port = 8002
  }) {
    if (false)
      return null;
    return /* @__PURE__ */ import_react3.default.createElement("script", {
      dangerouslySetInnerHTML: {
        __html: `
          let ws = new WebSocket("ws://localhost:${port}/socket");
          ws.onmessage = message => {
            let event = JSON.parse(message.data);
            if (event.type === "LOG") {
              console.log(event.message);
            }
            if (event.type === "RELOAD") {
              console.log("\u{1F4BF} Reloading window ...");
              window.location.reload();
            }
          };
          ws.onerror = error => {
            console.log("Remix dev asset server web socket error:");
            console.error(error);
          };
      `
      }
    });
  }
  function useComposedRefs(...refs) {
    return import_react3.default.useCallback((node) => {
      for (let ref of refs) {
        if (ref == null)
          continue;
        if (typeof ref === "function") {
          ref(node);
        } else {
          try {
            ref.current = node;
          } catch (_) {
          }
        }
      }
    }, refs);
  }
  var import_react3, import_react_router_dom2, RemixEntryContext, RemixRouteContext, NavLink, Link, Form, FormImpl, nextNavigationSubmission, fetcherId;
  var init_components = __esm({
    "node_modules/@remix-run/react/browser/components.js"() {
      init_rollupPluginBabelHelpers();
      import_react3 = __toModule(require_react());
      import_react_router_dom2 = __toModule(require_main3());
      init_errorBoundaries();
      init_invariant();
      init_links();
      init_markup();
      init_routes();
      init_routeMatching();
      init_transition();
      RemixEntryContext = /* @__PURE__ */ import_react3.default.createContext(void 0);
      RemixRouteContext = /* @__PURE__ */ import_react3.default.createContext(void 0);
      NavLink = /* @__PURE__ */ import_react3.default.forwardRef(({
        to,
        prefetch = "none",
        ...props
      }, forwardedRef) => {
        let href = (0, import_react_router_dom2.useHref)(to);
        let [shouldPrefetch, prefetchHandlers] = usePrefetchBehavior(prefetch, props);
        return /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, /* @__PURE__ */ import_react3.default.createElement(import_react_router_dom2.NavLink, _extends({
          ref: forwardedRef,
          to
        }, prefetchHandlers, props)), shouldPrefetch && /* @__PURE__ */ import_react3.default.createElement(PrefetchPageLinks, {
          page: href
        }));
      });
      Link = /* @__PURE__ */ import_react3.default.forwardRef(({
        to,
        prefetch = "none",
        ...props
      }, forwardedRef) => {
        let href = (0, import_react_router_dom2.useHref)(to);
        let [shouldPrefetch, prefetchHandlers] = usePrefetchBehavior(prefetch, props);
        return /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, /* @__PURE__ */ import_react3.default.createElement(import_react_router_dom2.Link, _extends({
          ref: forwardedRef,
          to
        }, prefetchHandlers, props)), shouldPrefetch && /* @__PURE__ */ import_react3.default.createElement(PrefetchPageLinks, {
          page: href
        }));
      });
      Form = /* @__PURE__ */ import_react3.default.forwardRef((props, ref) => {
        return /* @__PURE__ */ import_react3.default.createElement(FormImpl, _extends({}, props, {
          ref
        }));
      });
      FormImpl = /* @__PURE__ */ import_react3.default.forwardRef(({
        reloadDocument = false,
        replace = false,
        method = "get",
        action = ".",
        encType = "application/x-www-form-urlencoded",
        fetchKey,
        onSubmit,
        ...props
      }, forwardedRef) => {
        let submit = useSubmitImpl(fetchKey);
        let formMethod = method.toLowerCase() === "get" ? "get" : "post";
        let formAction = useFormAction(action, formMethod);
        let formRef = import_react3.default.useRef();
        let ref = useComposedRefs(forwardedRef, formRef);
        let clickedButtonRef = import_react3.default.useRef();
        import_react3.default.useEffect(() => {
          let form = formRef.current;
          if (!form)
            return;
          function handleClick(event) {
            if (!(event.target instanceof HTMLElement))
              return;
            let submitButton = event.target.closest("button,input[type=submit]");
            if (submitButton && submitButton.type === "submit") {
              clickedButtonRef.current = submitButton;
            }
          }
          form.addEventListener("click", handleClick);
          return () => {
            form && form.removeEventListener("click", handleClick);
          };
        }, []);
        return /* @__PURE__ */ import_react3.default.createElement("form", _extends({
          ref,
          method: formMethod,
          action: formAction,
          encType,
          onSubmit: reloadDocument ? void 0 : (event) => {
            onSubmit && onSubmit(event);
            if (event.defaultPrevented)
              return;
            event.preventDefault();
            submit(clickedButtonRef.current || event.currentTarget, {
              method,
              replace
            });
            clickedButtonRef.current = null;
          }
        }, props));
      });
      fetcherId = 0;
    }
  });

  // node_modules/@remix-run/react/browser/browser.js
  function RemixBrowser(_props) {
    let historyRef = import_react4.default.useRef();
    if (historyRef.current == null) {
      historyRef.current = (0, import_history3.createBrowserHistory)({
        window
      });
    }
    let history = historyRef.current;
    let [state, dispatch] = import_react4.default.useReducer((_, update) => update, {
      action: history.action,
      location: history.location
    });
    import_react4.default.useLayoutEffect(() => history.listen(dispatch), [history]);
    let entryContext = window.__remixContext;
    entryContext.manifest = window.__remixManifest;
    entryContext.routeModules = window.__remixRouteModules;
    entryContext.componentDidCatchEmulator.trackBoundaries = false;
    entryContext.componentDidCatchEmulator.trackCatchBoundaries = false;
    return /* @__PURE__ */ import_react4.default.createElement(RemixEntry, {
      context: entryContext,
      action: state.action,
      location: state.location,
      navigator: history
    });
  }
  var import_history3, import_react4;
  var init_browser = __esm({
    "node_modules/@remix-run/react/browser/browser.js"() {
      import_history3 = __toModule(require_main());
      import_react4 = __toModule(require_react());
      init_components();
    }
  });

  // node_modules/@remix-run/react/browser/server.js
  function RemixServer({
    context,
    url
  }) {
    if (typeof url === "string") {
      url = new URL(url);
    }
    let location = {
      pathname: url.pathname,
      search: url.search,
      hash: "",
      state: null,
      key: "default"
    };
    let staticNavigator = {
      createHref(to) {
        return typeof to === "string" ? to : (0, import_history4.createPath)(to);
      },
      push(to) {
        throw new Error(`You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)})\` somewhere in your app.`);
      },
      replace(to) {
        throw new Error(`You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere in your app.`);
      },
      go(delta) {
        throw new Error(`You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`);
      },
      back() {
        throw new Error(`You cannot use navigator.back() on the server because it is a stateless environment.`);
      },
      forward() {
        throw new Error(`You cannot use navigator.forward() on the server because it is a stateless environment.`);
      },
      block() {
        throw new Error(`You cannot use navigator.block() on the server because it is a stateless environment.`);
      }
    };
    return /* @__PURE__ */ import_react5.default.createElement(RemixEntry, {
      context,
      action: import_history4.Action.Pop,
      location,
      navigator: staticNavigator,
      static: true
    });
  }
  var import_history4, import_react5;
  var init_server = __esm({
    "node_modules/@remix-run/react/browser/server.js"() {
      import_history4 = __toModule(require_main());
      import_react5 = __toModule(require_react());
      init_components();
    }
  });

  // node_modules/@remix-run/react/browser/scroll-restoration.js
  function ScrollRestoration() {
    useScrollRestoration();
    React.useEffect(() => {
      window.history.scrollRestoration = "manual";
    }, []);
    useBeforeUnload(React.useCallback(() => {
      window.history.scrollRestoration = "auto";
    }, []));
    return /* @__PURE__ */ React.createElement("script", {
      dangerouslySetInnerHTML: {
        __html: `
          let STORAGE_KEY = ${JSON.stringify(STORAGE_KEY)};
          if (!window.history.state || !window.history.state.key) {
            window.history.replaceState({ key: Math.random().toString(32).slice(2) }, null);
          }
          try {
            let positions = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}')
            let storedY = positions[window.history.state.key];
            if (typeof storedY === 'number') {
              window.scrollTo(0, storedY)
            }
          } catch(error) {
            console.error(error)
            sessionStorage.removeItem(STORAGE_KEY)
          }
        `
      }
    });
  }
  function useScrollRestoration() {
    let location = (0, import_react_router_dom3.useLocation)();
    let transition = useTransition();
    let wasSubmissionRef = React.useRef(false);
    React.useEffect(() => {
      if (transition.submission) {
        wasSubmissionRef.current = true;
      }
    }, [transition]);
    React.useEffect(() => {
      if (transition.location) {
        positions[location.key] = window.scrollY;
      }
    }, [transition, location]);
    useBeforeUnload(React.useCallback(() => {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
    }, []));
    if (typeof window !== "undefined") {
      React.useLayoutEffect(() => {
        if (!hydrated) {
          hydrated = true;
          return;
        }
        let y = positions[location.key];
        if (y) {
          window.scrollTo(0, y);
          return;
        }
        if (location.hash) {
          let el = document.querySelector(location.hash);
          if (el) {
            el.scrollIntoView();
            return;
          }
        }
        if (wasSubmissionRef.current === true) {
          wasSubmissionRef.current = false;
          return;
        }
        window.scrollTo(0, 0);
      }, [location]);
    }
    React.useEffect(() => {
      if (transition.submission) {
        wasSubmissionRef.current = true;
      }
    }, [transition]);
  }
  var React, import_react_router_dom3, STORAGE_KEY, positions, hydrated;
  var init_scroll_restoration = __esm({
    "node_modules/@remix-run/react/browser/scroll-restoration.js"() {
      React = __toModule(require_react());
      import_react_router_dom3 = __toModule(require_main3());
      init_components();
      STORAGE_KEY = "positions";
      positions = {};
      if (typeof window !== "undefined") {
        let sessionPositions = sessionStorage.getItem(STORAGE_KEY);
        if (sessionPositions) {
          positions = JSON.parse(sessionPositions);
        }
      }
      hydrated = false;
    }
  });

  // node_modules/@remix-run/react/browser/index.js
  var import_react_router_dom4;
  var init_browser2 = __esm({
    "node_modules/@remix-run/react/browser/index.js"() {
      init_browser();
      import_react_router_dom4 = __toModule(require_main3());
      init_components();
      init_errorBoundaries();
      init_server();
      init_scroll_restoration();
    }
  });

  // node_modules/remix/browser/client.js
  var init_client = __esm({
    "node_modules/remix/browser/client.js"() {
      init_browser2();
    }
  });

  // node_modules/remix/browser/server.js
  var import_server_runtime;
  var init_server2 = __esm({
    "node_modules/remix/browser/server.js"() {
      import_server_runtime = __toModule(require_server_runtime());
    }
  });

  // node_modules/remix/browser/platform.js
  var import_cloudflare_workers;
  var init_platform = __esm({
    "node_modules/remix/browser/platform.js"() {
      import_cloudflare_workers = __toModule(require_cloudflare_workers());
    }
  });

  // node_modules/remix/browser/index.js
  var browser_exports = {};
  __export(browser_exports, {
    Form: () => Form,
    Link: () => Link,
    Links: () => Links,
    LiveReload: () => LiveReload,
    Meta: () => Meta,
    NavLink: () => NavLink,
    Outlet: () => import_react_router_dom4.Outlet,
    PrefetchPageLinks: () => PrefetchPageLinks,
    RemixBrowser: () => RemixBrowser,
    RemixServer: () => RemixServer,
    Scripts: () => Scripts,
    ScrollRestoration: () => ScrollRestoration,
    createCloudflareKVSessionStorage: () => import_cloudflare_workers.createCloudflareKVSessionStorage,
    createCookie: () => import_server_runtime.createCookie,
    createCookieSessionStorage: () => import_server_runtime.createCookieSessionStorage,
    createMemorySessionStorage: () => import_server_runtime.createMemorySessionStorage,
    createSession: () => import_server_runtime.createSession,
    createSessionStorage: () => import_server_runtime.createSessionStorage,
    isCookie: () => import_server_runtime.isCookie,
    isSession: () => import_server_runtime.isSession,
    json: () => import_server_runtime.json,
    redirect: () => import_server_runtime.redirect,
    useActionData: () => useActionData,
    useBeforeUnload: () => useBeforeUnload,
    useCatch: () => useCatch,
    useFetcher: () => useFetcher,
    useFetchers: () => useFetchers,
    useFormAction: () => useFormAction,
    useHref: () => import_react_router_dom4.useHref,
    useLoaderData: () => useLoaderData,
    useLocation: () => import_react_router_dom4.useLocation,
    useMatches: () => useMatches,
    useNavigate: () => import_react_router_dom4.useNavigate,
    useNavigationType: () => import_react_router_dom4.useNavigationType,
    useOutlet: () => import_react_router_dom4.useOutlet,
    useParams: () => import_react_router_dom4.useParams,
    useResolvedPath: () => import_react_router_dom4.useResolvedPath,
    useSearchParams: () => import_react_router_dom4.useSearchParams,
    useSubmit: () => useSubmit,
    useTransition: () => useTransition
  });
  var init_browser3 = __esm({
    "node_modules/remix/browser/index.js"() {
      init_client();
      init_server2();
      init_platform();
    }
  });

  // build/assets.json
  var require_assets = __commonJS({
    "build/assets.json"(exports, module) {
      module.exports = {
        version: "ecb3dceb",
        entry: {
          module: "/build/entry.client-HL6ON5O2.js",
          imports: [
            "/build/_shared/chunk-KOXENSZ3.js",
            "/build/_shared/chunk-E7VMOUYL.js"
          ]
        },
        routes: {
          root: {
            id: "root",
            path: "",
            module: "/build/root-ZEI7SC5R.js",
            hasAction: false,
            hasLoader: false,
            hasCatchBoundary: true,
            hasErrorBoundary: true
          },
          "routes/index": {
            id: "routes/index",
            parentId: "root",
            index: true,
            module: "/build/routes/index-64QOAHSJ.js",
            hasAction: false,
            hasLoader: true,
            hasCatchBoundary: false,
            hasErrorBoundary: false
          },
          "routes/now": {
            id: "routes/now",
            parentId: "root",
            path: "now",
            module: "/build/routes/now-O2PDUMAN.js",
            hasAction: false,
            hasLoader: false,
            hasCatchBoundary: false,
            hasErrorBoundary: false
          },
          "routes/posts/index": {
            id: "routes/posts/index",
            parentId: "root",
            path: "posts",
            index: true,
            module: "/build/routes/posts/index-GUT7JIV3.js",
            hasAction: false,
            hasLoader: true,
            hasCatchBoundary: false,
            hasErrorBoundary: false
          }
        },
        url: "/build/manifest-ECB3DCEB.js"
      };
    }
  });

  // build/index.js
  var require_build = __commonJS({
    "build/index.js"(exports) {
      var __create2 = Object.create;
      var __defProp2 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __getProtoOf2 = Object.getPrototypeOf;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __markAsModule2 = (target) => __defProp2(target, "__esModule", { value: true });
      var __export2 = (target, all) => {
        __markAsModule2(target);
        for (var name in all)
          __defProp2(target, name, { get: all[name], enumerable: true });
      };
      var __reExport2 = (target, module2, desc) => {
        if (module2 && typeof module2 === "object" || typeof module2 === "function") {
          for (let key of __getOwnPropNames2(module2))
            if (!__hasOwnProp2.call(target, key) && key !== "default")
              __defProp2(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc2(module2, key)) || desc.enumerable });
        }
        return target;
      };
      var __toModule2 = (module2) => {
        return __reExport2(__markAsModule2(__defProp2(module2 != null ? __create2(__getProtoOf2(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
      };
      __export2(exports, {
        assets: () => import_assets.default,
        entry: () => entry,
        routes: () => routes
      });
      var React2 = __toModule2(require_react());
      var entry_server_exports = {};
      __export2(entry_server_exports, {
        default: () => handleRequest
      });
      var import_server2 = __toModule2(require_server_browser());
      var import_remix = __toModule2((init_browser3(), browser_exports));
      function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
        let markup = (0, import_server2.renderToString)(/* @__PURE__ */ React2.createElement(import_remix.RemixServer, {
          context: remixContext,
          url: request.url
        }));
        responseHeaders.set("Content-Type", "text/html");
        return new Response("<!DOCTYPE html>" + markup, {
          status: responseStatusCode,
          headers: responseHeaders
        });
      }
      var root_exports = {};
      __export2(root_exports, {
        CatchBoundary: () => CatchBoundary,
        ErrorBoundary: () => ErrorBoundary,
        default: () => App,
        links: () => links
      });
      var import_remix2 = __toModule2((init_browser3(), browser_exports));
      var global_default = "/build/_assets/global-4BDZGY2F.css";
      var dark_default = "/build/_assets/dark-APYDFYJA.css";
      var links = () => {
        return [
          { rel: "preconnect", href: "https://fonts.googleapis.com" },
          {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossOrigin: "anonymous"
          },
          {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          },
          { rel: "stylesheet", href: global_default },
          {
            rel: "stylesheet",
            href: dark_default,
            media: "(prefers-color-scheme: dark)"
          },
          { rel: "icon", type: "image/x-icon", href: "favicon.ico?v1" }
        ];
      };
      function App() {
        return /* @__PURE__ */ React2.createElement(Document, null, /* @__PURE__ */ React2.createElement(Layout, null, /* @__PURE__ */ React2.createElement(import_remix2.Outlet, null)));
      }
      function ErrorBoundary({ error }) {
        console.error(error);
        return /* @__PURE__ */ React2.createElement(Document, {
          title: "Error!"
        }, /* @__PURE__ */ React2.createElement(Layout, null, /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement("h1", null, "There was an error"), /* @__PURE__ */ React2.createElement("p", null, error.message), /* @__PURE__ */ React2.createElement("hr", null), /* @__PURE__ */ React2.createElement("p", null, "Hey, developer, you should replace this with what you want your users to see."))));
      }
      function CatchBoundary() {
        let caught = (0, import_remix2.useCatch)();
        let message;
        switch (caught.status) {
          case 401:
            message = /* @__PURE__ */ React2.createElement("p", null, "Oops! Looks like you tried to visit a page that you do not have access to.");
            break;
          case 404:
            message = /* @__PURE__ */ React2.createElement("p", null, "Oops! Looks like you tried to visit a page that does not exist.");
            break;
          default:
            throw new Error(caught.data || caught.statusText);
        }
        return /* @__PURE__ */ React2.createElement(Document, {
          title: `${caught.status} ${caught.statusText}`
        }, /* @__PURE__ */ React2.createElement(Layout, null, /* @__PURE__ */ React2.createElement("h1", null, caught.status, ": ", caught.statusText), message));
      }
      function Document({
        children,
        title
      }) {
        return /* @__PURE__ */ React2.createElement("html", {
          lang: "en"
        }, /* @__PURE__ */ React2.createElement("head", null, /* @__PURE__ */ React2.createElement("meta", {
          charSet: "utf-8"
        }), /* @__PURE__ */ React2.createElement("meta", {
          name: "viewport",
          content: "width=device-width,initial-scale=1"
        }), title ? /* @__PURE__ */ React2.createElement("title", null, title) : null, /* @__PURE__ */ React2.createElement(import_remix2.Meta, null), /* @__PURE__ */ React2.createElement(import_remix2.Links, null)), /* @__PURE__ */ React2.createElement("body", null, children, /* @__PURE__ */ React2.createElement(import_remix2.ScrollRestoration, null), /* @__PURE__ */ React2.createElement(import_remix2.Scripts, null), /* @__PURE__ */ React2.createElement(import_remix2.LiveReload, null)));
      }
      function Layout({ children }) {
        return /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement("header", {
          className: "navigation__header"
        }, /* @__PURE__ */ React2.createElement("nav", {
          "aria-label": "Main navigation"
        }, /* @__PURE__ */ React2.createElement("ul", {
          className: "navigation__list"
        }, /* @__PURE__ */ React2.createElement("li", null, /* @__PURE__ */ React2.createElement(import_remix2.Link, {
          to: "/now"
        }, "Now")), /* @__PURE__ */ React2.createElement("li", null, /* @__PURE__ */ React2.createElement(import_remix2.Link, {
          to: "/posts"
        }, "Blog")), /* @__PURE__ */ React2.createElement("li", null, /* @__PURE__ */ React2.createElement(import_remix2.Link, {
          className: "navigation__logoLink",
          to: "/",
          title: "JAW"
        }, /* @__PURE__ */ React2.createElement(Logo, null)))))), /* @__PURE__ */ React2.createElement("div", {
          className: "layout__content"
        }, /* @__PURE__ */ React2.createElement("div", null, children)));
      }
      function Logo() {
        return /* @__PURE__ */ React2.createElement("svg", {
          viewBox: "0 0 2834.65 2834.65",
          enableBackground: "new 0 0 2834.65 2834.65",
          version: "1.1",
          xmlns: "http://www.w3.org/2000/svg",
          xmlnsXlink: "http://www.w3.org/1999/xlink",
          "aria-labelledby": "logo-title",
          role: "img",
          width: "32",
          height: "32",
          fill: "currentColor"
        }, /* @__PURE__ */ React2.createElement("title", {
          id: "logo-title"
        }, "JAW Logo"), /* @__PURE__ */ React2.createElement("path", {
          fill: "#0042FF",
          d: "M1413.178,1014.603c174.841,0,316.566-141.726,316.566-316.567c0-174.831-141.725-316.557-316.566-316.557\n	c-174.831,0-316.557,141.726-316.557,316.557C1096.621,872.876,1238.347,1014.603,1413.178,1014.603z"
        }), /* @__PURE__ */ React2.createElement("path", {
          fill: "#0042FF",
          d: "M1723.283,1167.308l-620.478,0.017c-3.301,0-6.185,3.124-6.185,6.501v496.035\n	c0,3.594,2.914,6.504,6.501,6.521c171.79,3.152,310.088,143.389,310.088,315.924c0,172.48-137.371,315.525-309.302,315.525\n	c-3.439,0-7.277,3.418-7.281,6.896l-0.006,124.922c0,3.586,2.938,6.49,6.519,6.516c58.275-0.047,149.728-1.346,255.271-36.527\n	c270.924-88.27,371.389-353.109,371.389-639.254v-596.559C1729.801,1170.223,1726.885,1167.308,1723.283,1167.308z"
        }));
      }
      var posts_exports = {};
      __export2(posts_exports, {
        default: () => posts_default,
        links: () => links2,
        loader: () => loader
      });
      var import_remix3 = __toModule2((init_browser3(), browser_exports));
      function getPosts() {
        return Promise.resolve([
          {
            slug: "my-first-post",
            title: "My First Post"
          },
          {
            slug: "90s-mixtape",
            title: "A Mixtape I Made Just For You"
          },
          {
            slug: "my-last-post",
            title: "My Last Post"
          }
        ]);
      }
      var blog_default = "/build/_assets/blog-VKIALGK7.css";
      var links2 = () => {
        return [
          { rel: "preconnect", href: "https://fonts.googleapis.com" },
          {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossOrigin: "anonymous"
          },
          {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Amatic+SC&display=swap"
          },
          { rel: "stylesheet", href: blog_default }
        ];
      };
      async function loader() {
        const posts = await getPosts();
        return posts;
      }
      function Posts() {
        const posts = (0, import_remix3.useLoaderData)();
        return /* @__PURE__ */ React2.createElement("div", {
          className: "blog__container"
        }, /* @__PURE__ */ React2.createElement("h1", null, "Posts"), /* @__PURE__ */ React2.createElement("ul", {
          className: "blog__postList"
        }, posts.map((post) => /* @__PURE__ */ React2.createElement("li", {
          key: post.slug
        }, /* @__PURE__ */ React2.createElement(import_remix3.Link, {
          to: post.slug
        }, post.title), /* @__PURE__ */ React2.createElement("div", {
          className: "blog__postLine"
        })))));
      }
      var posts_default = Posts;
      var routes_exports = {};
      __export2(routes_exports, {
        default: () => Index,
        loader: () => loader2,
        meta: () => meta
      });
      var import_remix4 = __toModule2((init_browser3(), browser_exports));
      var loader2 = () => {
        let data = {
          resources: [
            {
              name: "Remix Docs",
              url: "https://remix.run/docs"
            },
            {
              name: "React Router Docs",
              url: "https://reactrouter.com/docs"
            },
            {
              name: "Remix Discord",
              url: "https://discord.gg/VBePs6d"
            }
          ],
          demos: [
            {
              to: "demos/actions",
              name: "Actions"
            },
            {
              to: "demos/about",
              name: "Nested Routes, CSS loading/unloading"
            },
            {
              to: "demos/params",
              name: "URL Params and Error Boundaries"
            }
          ]
        };
        return (0, import_remix4.json)(data);
      };
      var meta = () => {
        return {
          title: "Remix Starter",
          description: "Welcome to remix!"
        };
      };
      function Index() {
        let data = (0, import_remix4.useLoaderData)();
        return /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement("h1", null, "Woop"));
      }
      var now_exports = {};
      __export2(now_exports, {
        default: () => now_default
      });
      function NowPage() {
        return /* @__PURE__ */ React2.createElement("h1", null, "Now");
      }
      var now_default = NowPage;
      var import_assets = __toModule2(require_assets());
      var entry = { module: entry_server_exports };
      var routes = {
        "root": {
          id: "root",
          parentId: void 0,
          path: "",
          index: void 0,
          caseSensitive: void 0,
          module: root_exports
        },
        "routes/posts/index": {
          id: "routes/posts/index",
          parentId: "root",
          path: "posts",
          index: true,
          caseSensitive: void 0,
          module: posts_exports
        },
        "routes/index": {
          id: "routes/index",
          parentId: "root",
          path: void 0,
          index: true,
          caseSensitive: void 0,
          module: routes_exports
        },
        "routes/now": {
          id: "routes/now",
          parentId: "root",
          path: "now",
          index: void 0,
          caseSensitive: void 0,
          module: now_exports
        }
      };
    }
  });

  // worker/index.js
  var import_cloudflare_workers2 = __toModule(require_cloudflare_workers());
  var build = __toModule(require_build());
  addEventListener("fetch", (0, import_cloudflare_workers2.createEventHandler)({ build }));
})();
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/**
 * @remix-run/cloudflare-workers v1.0.6
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * @remix-run/react v1.0.6
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * @remix-run/server-runtime v1.0.6
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * React Router DOM v6.0.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * React Router v6.0.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * remix v1.0.6
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/** @license React v17.0.2
 * react-dom-server.browser.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
//# sourceMappingURL=worker.js.map
