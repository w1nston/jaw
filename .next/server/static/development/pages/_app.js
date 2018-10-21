module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/header/HamburgerIcon.js":
/*!********************************************!*\
  !*** ./components/header/HamburgerIcon.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_emotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-emotion */ "react-emotion");
/* harmony import */ var react_emotion__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_emotion__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/w1nston/repos/GitHub/jaw/components/header/HamburgerIcon.js";

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  background-color: #333;\n  border-radius: 0.2rem;\n  display: block;\n  height: 0.05rem;\n  left: 0;\n  position: absolute;\n  transition: all 0.4s;\n  width: 2.3rem;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  appearance: none;\n  background: none;\n  border: none;\n  display: block;\n  height: 22px;\n  position: relative;\n  text-decoration: none;\n  width: 32px;\n\n  &:active,\n  &:focus,\n  &:hover {\n    outline: none;\n  }\n\n  &:hover {\n    .", " {\n      transform: translateY(-4px);\n    }\n\n    .", " {\n      transform: translateY(4px);\n    }\n  }\n\n  &.active {\n    .", " {\n      transform: translateY(10px) translateX(0) rotate(45deg);\n    }\n\n    .", " {\n      opacity: 0;\n    }\n\n    .", " {\n      transform: translateY(-10px) translateX(0) rotate(-45deg);\n    }\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  top: 100%;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  top: 50%;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  top: 0;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var lineOneStyle = Object(react_emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject());
var lineTwoStyle = Object(react_emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2());
var lineThreeStyle = Object(react_emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject3());
var hamburgerStyle = Object(react_emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject4(), lineOneStyle, lineThreeStyle, lineOneStyle, lineTwoStyle, lineThreeStyle);
var lineStyle = Object(react_emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject5());

var HamburgerIcon = function HamburgerIcon(_ref) {
  var active = _ref.active,
      className = _ref.className,
      onClick = _ref.onClick;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: Object(react_emotion__WEBPACK_IMPORTED_MODULE_1__["cx"])(hamburgerStyle, className, active ? 'active' : null),
    onClick: onClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "".concat(lineStyle, " ").concat(lineOneStyle),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "".concat(lineStyle, " ").concat(lineTwoStyle),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "".concat(lineStyle, " ").concat(lineThreeStyle),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    },
    __self: this
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (HamburgerIcon);

/***/ }),

/***/ "./components/header/Header.js":
/*!*************************************!*\
  !*** ./components/header/Header.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_windowHooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/windowHooks */ "./hooks/windowHooks.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/constants */ "./utils/constants.js");
/* harmony import */ var _HeaderMobile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HeaderMobile */ "./components/header/HeaderMobile.js");
/* harmony import */ var _HeaderDesktop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./HeaderDesktop */ "./components/header/HeaderDesktop.js");
/* harmony import */ var _HeaderTablet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./HeaderTablet */ "./components/header/HeaderTablet.js");
var _jsxFileName = "/Users/w1nston/repos/GitHub/jaw/components/header/Header.js";







var Header = function Header() {
  var _useWindowSize = Object(_hooks_windowHooks__WEBPACK_IMPORTED_MODULE_1__["useWindowSize"])(),
      width = _useWindowSize.width;

  if (width > _utils_constants__WEBPACK_IMPORTED_MODULE_2__["TABLET"]) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_HeaderDesktop__WEBPACK_IMPORTED_MODULE_4__["default"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      },
      __self: this
    });
  }

  if (width > _utils_constants__WEBPACK_IMPORTED_MODULE_2__["MOBILE"]) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_HeaderTablet__WEBPACK_IMPORTED_MODULE_5__["default"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: this
    });
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_HeaderMobile__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ }),

/***/ "./components/header/HeaderDesktop.js":
/*!********************************************!*\
  !*** ./components/header/HeaderDesktop.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_emotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-emotion */ "react-emotion");
/* harmony import */ var react_emotion__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_emotion__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "next/link");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Logo */ "./components/header/Logo.js");
var _jsxFileName = "/Users/w1nston/repos/GitHub/jaw/components/header/HeaderDesktop.js";

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  align-self: center;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  align-self: center;\n  text-decoration: none;\n\n  .line {\n    border-left: 0.05rem solid #333;\n    bottom: -0.9rem;\n    height: 0;\n    left: 50%;\n    position: absolute;\n    transition: height 0.4s;\n  }\n\n  &:hover {\n    .line {\n      height: 1rem;\n      transition: height 0.4s;\n    }\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: space-around;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  border-bottom: 0.05rem solid #333;\n  margin: 0 auto;\n  max-width: 60rem;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/* eslint-disable jsx-a11y/anchor-is-valid */




var headerStyle = Object(react_emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject());
var navStyle = Object(react_emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2());
var linkStyle = Object(react_emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject3());
var logoStyle = Object(react_emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject4());

var HeaderDesktop = function HeaderDesktop() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
    className: headerStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", {
    className: navStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: linkStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }, "Home", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "line",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: this
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
    href: "/projects",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: linkStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }, "Projects", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "line",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Logo__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: logoStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58
    },
    __self: this
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (HeaderDesktop);

/***/ }),

/***/ "./components/header/HeaderMobile.js":
/*!*******************************************!*\
  !*** ./components/header/HeaderMobile.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_emotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-emotion */ "react-emotion");
/* harmony import */ var react_emotion__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_emotion__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Logo */ "./components/header/Logo.js");
/* harmony import */ var _HamburgerIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HamburgerIcon */ "./components/header/HamburgerIcon.js");
/* harmony import */ var _MenuLink__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MenuLink */ "./components/header/MenuLink.js");
var _jsxFileName = "/Users/w1nston/repos/GitHub/jaw/components/header/HeaderMobile.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  padding: 1rem 1.5rem;\n  text-decoration: none;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  bottom: 0;\n  display: flex;\n  flex-direction: column;\n  height: 0;\n  left: 0;\n  overflow: hidden;\n  position: absolute;\n  right: 0;\n  top: 3.75rem;\n\n  &.close {\n    background: hsla(360, 100%, 100%, 1);\n    height: 0;\n    transition-property: height;\n    transition-duration: 0.5s;\n    z-index: 1;\n  }\n\n  &.open {\n    background: hsla(360, 100%, 100%, 1);\n    height: 100vh;\n    transition-property: height;\n    transition-duration: 0.8s;\n    z-index: 1;\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  align-self: center;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  align-self: center;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  border-bottom: 0.05rem solid #888;\n  display: flex;\n  justify-content: space-between;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var headerContainerStyle = Object(react_emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject());
var headerStyle = Object(react_emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2());
var hamburgerStyle = Object(react_emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject3());
var logoStyle = Object(react_emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject4());
var navStyle = Object(react_emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject5());
var linkStyle = Object(react_emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject6());

var HeaderMobile = function HeaderMobile(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      menuIsOpen = _useState2[0],
      setMenuIsOpen = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState4 = _slicedToArray(_useState3, 2),
      menuHasBeenOpened = _useState4[0],
      setMenuHasBeenOpened = _useState4[1];

  var handleToggleMenu = function handleToggleMenu() {
    setMenuIsOpen(!menuIsOpen);

    if (!menuHasBeenOpened) {
      setMenuHasBeenOpened(true);
    }
  };

  var closeMenu = function closeMenu() {
    if (menuIsOpen) {
      setMenuIsOpen(false);
    }
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    className: headerContainerStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
    className: headerStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_HamburgerIcon__WEBPACK_IMPORTED_MODULE_3__["default"], {
    active: menuIsOpen,
    className: hamburgerStyle,
    onClick: handleToggleMenu,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Logo__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: logoStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", {
    className: Object(react_emotion__WEBPACK_IMPORTED_MODULE_1__["cx"])(navStyle, menuIsOpen ? "open" : menuHasBeenOpened ? "close" : ""),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MenuLink__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: linkStyle,
    href: "/",
    onClick: closeMenu,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92
    },
    __self: this
  }, "Home"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MenuLink__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: linkStyle,
    href: "/projects",
    onClick: closeMenu,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95
    },
    __self: this
  }, "Projects")));
};

/* harmony default export */ __webpack_exports__["default"] = (HeaderMobile);

/***/ }),

/***/ "./components/header/HeaderTablet.js":
/*!*******************************************!*\
  !*** ./components/header/HeaderTablet.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HeaderMobile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HeaderMobile */ "./components/header/HeaderMobile.js");

/* harmony default export */ __webpack_exports__["default"] = (_HeaderMobile__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./components/header/Logo.js":
/*!***********************************!*\
  !*** ./components/header/Logo.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/w1nston/repos/GitHub/jaw/components/header/Logo.js";


var Logo = function Logo(_ref) {
  var className = _ref.className;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
    version: "1.1",
    id: "Layer_1",
    x: "0px",
    y: "0px",
    width: "3.2rem",
    height: "3.2rem",
    viewBox: "0 0 2834.65 2834.65",
    enableBackground: "new 0 0 2834.65 2834.65",
    className: className,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    fill: "#0042FF",
    d: "M1413.178,1014.603c174.841,0,316.566-141.726,316.566-316.567c0-174.831-141.725-316.557-316.566-316.557 c-174.831,0-316.557,141.726-316.557,316.557C1096.621,872.876,1238.347,1014.603,1413.178,1014.603z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
    fill: "#0042FF",
    d: "M1723.283,1167.308l-620.478,0.017c-3.301,0-6.185,3.124-6.185,6.501v496.035 c0,3.594,2.914,6.504,6.501,6.521c171.79,3.152,310.088,143.389,310.088,315.924c0,172.48-137.371,315.525-309.302,315.525 c-3.439,0-7.277,3.418-7.281,6.896l-0.006,124.922c0,3.586,2.938,6.49,6.519,6.516c58.275-0.047,149.728-1.346,255.271-36.527 c270.924-88.27,371.389-353.109,371.389-639.254v-596.559C1729.801,1170.223,1726.885,1167.308,1723.283,1167.308z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Logo);

/***/ }),

/***/ "./components/header/MenuLink.js":
/*!***************************************!*\
  !*** ./components/header/MenuLink.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/Users/w1nston/repos/GitHub/jaw/components/header/MenuLink.js";



var MenuLink = function MenuLink(_ref) {
  var children = _ref.children,
      className = _ref.className,
      href = _ref.href,
      onClick = _ref.onClick,
      router = _ref.router;

  function handleClick(event) {
    event.preventDefault();

    if (typeof onClick === 'function') {
      onClick();
    }

    router.push(href);
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: className,
    href: href,
    onClick: handleClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, children);
};

/* harmony default export */ __webpack_exports__["default"] = (Object(next_router__WEBPACK_IMPORTED_MODULE_1__["withRouter"])(MenuLink));

/***/ }),

/***/ "./hooks/windowHooks.js":
/*!******************************!*\
  !*** ./hooks/windowHooks.js ***!
  \******************************/
/*! exports provided: useWindowSize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useWindowSize", function() { return useWindowSize; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


var useWindowSize = function useWindowSize() {
  var isClient = (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object';

  var getSize = function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  };

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(getSize),
      _useState2 = _slicedToArray(_useState, 2),
      windowSize = _useState2[0],
      setWindowSize = _useState2[1];

  var handleWindowResize = function handleWindowResize() {
    setWindowSize(getSize());
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (!isClient) {
      return false;
    }

    window.addEventListener('resize', handleWindowResize);
    return function () {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  return windowSize;
};

/***/ }),

/***/ "./layouts/page.js":
/*!*************************!*\
  !*** ./layouts/page.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_emotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-emotion */ "react-emotion");
/* harmony import */ var react_emotion__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_emotion__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_header_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/header/Header */ "./components/header/Header.js");
var _jsxFileName = "/Users/w1nston/repos/GitHub/jaw/layouts/page.js";

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  @media (min-width: 768px) {\n    margin: 0 auto;\n    width: 50rem;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  padding: 0.5rem 0.8rem;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var containerStyle = Object(react_emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject());
var mainContentStyle = Object(react_emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2());

var Page = function Page(_ref) {
  var children = _ref.children,
      className = _ref.className;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    className: Object(react_emotion__WEBPACK_IMPORTED_MODULE_1__["cx"])(className, containerStyle),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_header_Header__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", {
    role: "main",
    className: mainContentStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, children));
};

/* harmony default export */ __webpack_exports__["default"] = (Page);

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/app */ "next/app");
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_emotion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-emotion */ "react-emotion");
/* harmony import */ var react_emotion__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_emotion__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _layouts_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../layouts/page */ "./layouts/page.js");

var _jsxFileName = "/Users/w1nston/repos/GitHub/jaw/pages/_app.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\nbody {\n  font-family: 'Fira Sans', sans-serif;\n  line-height: 1.5rem;\n  margin: 0;\n  padding: 0;\n}\n\nhtml {\n  box-sizing: border-box;\n  font-size: 20px;\n}\n\nh1,\nh2,\nh3,\nh4 {\n  font-family: 'Montserrat', sans-serif;\n}\n\n*,\n*:before,\n*:after {\n  box-sizing: inherit;\n  position: relative;\n}\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




 // Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'

if (typeof window !== 'undefined') {
  Object(react_emotion__WEBPACK_IMPORTED_MODULE_3__["hydrate"])(window.__NEXT_DATA__.ids);
}

Object(react_emotion__WEBPACK_IMPORTED_MODULE_3__["injectGlobal"])(_templateObject());

var JAWApp =
/*#__PURE__*/
function (_App) {
  _inherits(JAWApp, _App);

  function JAWApp() {
    _classCallCheck(this, JAWApp);

    return _possibleConstructorReturn(this, _getPrototypeOf(JAWApp).apply(this, arguments));
  }

  _createClass(JAWApp, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          Component = _this$props.Component,
          pageProps = _this$props.pageProps;
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_app__WEBPACK_IMPORTED_MODULE_2__["Container"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_layouts_page__WEBPACK_IMPORTED_MODULE_4__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 56
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Component, _extends({}, pageProps, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        },
        __self: this
      }))));
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(_ref) {
        var Component, router, ctx, pageProps;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                Component = _ref.Component, router = _ref.router, ctx = _ref.ctx;
                pageProps = {};

                if (!Component.getInitialProps) {
                  _context.next = 6;
                  break;
                }

                _context.next = 5;
                return Component.getInitialProps(ctx);

              case 5:
                pageProps = _context.sent;

              case 6:
                return _context.abrupt("return", {
                  pageProps: pageProps
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      };
    }()
  }]);

  return JAWApp;
}(next_app__WEBPACK_IMPORTED_MODULE_2___default.a);

/* harmony default export */ __webpack_exports__["default"] = (JAWApp);

/***/ }),

/***/ "./utils/constants.js":
/*!****************************!*\
  !*** ./utils/constants.js ***!
  \****************************/
/*! exports provided: MOBILE, TABLET */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOBILE", function() { return MOBILE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TABLET", function() { return TABLET; });
var MOBILE = 767;
var TABLET = 990;

/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi ./pages/_app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./pages/_app.js */"./pages/_app.js");


/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "next/app":
/*!***************************!*\
  !*** external "next/app" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/app");

/***/ }),

/***/ "next/link":
/*!****************************!*\
  !*** external "next/link" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/link");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-emotion":
/*!********************************!*\
  !*** external "react-emotion" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-emotion");

/***/ })

/******/ });
//# sourceMappingURL=_app.js.map