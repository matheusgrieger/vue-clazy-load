(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("VueClazyLoad", [], factory);
	else if(typeof exports === 'object')
		exports["VueClazyLoad"] = factory();
	else
		root["VueClazyLoad"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VueClazyLoad", function() { return VueClazyLoad; });
/*!
 * Vue Clazy Load
 * Component-based lazy (CLazy) load images in Vue.js 2
 * @author Matheus Grieger
 * @version 0.4.2
 */
var ClazyLoadComponent = {
  name: 'ClazyLoad',
  props: {
    /**
     * HTML/Component tag name to be used in place of the component
     * @type {String}
     * @default div
     */
    tag: {
      type: String,
      default: 'div'
    },
    /**
     * Image source URL
     * @type {String}
     * @required
     */
    src: {
      type: String,
      required: true
    },
    /**
     * IntersectionObserver root element
     * @type {String}
     */
    element: String,
    /**
     * IntersectionObserver threshold
     * @type {Array, Number}
     */
    threshold: {
      type: [Array, Number],
      default: function _default() {
        return [0, 0.5, 1];
      }
    },
    /**
     * InserectionObserver visibility ratio
     * @type {Number}
     */
    ratio: {
      type: Number,
      default: 0.4,
      validator: function validator(value) {
        // can't be less or equal to 0 and greater than 1
        return value > 0 && value <= 1;
      }
    },
    /**
     * IntersectionObserver root margin
     * @type {String}
     */
    margin: {
      type: String,
      default: '0px'
    },
    /**
     * Optional CORS mode ("anonymous" | "use-credentials")
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-crossorigin
     * @type {String}
     */
    crossorigin: {
      type: String,
      default: null,
      validator: function validator(value) {
        return value === 'anonymous' || value === 'use-credentials';
      }
    },
    /**
     * Class added to element when it finishes loading
     * @type {String}
     * @default loaded
     */
    loadedClass: {
      type: String,
      default: 'loaded'
    },
    /**
     * Class added to element while it is loading
     * @type {String}
     */
    loadingClass: {
      type: String,
      default: 'loading'
    },
    /**
     * Class added to element if loading failed
     * @type {String}
     */
    errorClass: {
      type: String,
      default: null
    }
  },
  data: function data() {
    return {
      loaded: false,
      observer: null,
      errored: false
    };
  },

  methods: {
    /**
     * Start loading image
     */
    load: function load() {
      var _this = this;

      // emits 'loading' event upwards
      this.$emit('loading');

      // disconnect observer
      // so it doesn't load more than once
      this.observer.disconnect();

      if (!this.loaded) {
        // fake image
        var img = new Image();

        img.addEventListener('load', function () {
          _this.loaded = true;
          // emits 'load' event upwards
          _this.$emit('load');

          _clear();
        });

        img.addEventListener('error', function (event) {
          _this.errored = true;
          // emits 'error' event upwards
          // adds the original event as argument
          _this.$emit('error', event);

          _clear();
        });

        // function used to clear variables from memory
        var _clear = function _clear() {
          // discard fake image
          img = null;
          // remove observer from memory
          _this.observer = null;
        };

        // CORS mode configuration
        if (this.crossorigin !== null) {
          img.crossOrigin = this.crossorigin;
        }

        img.src = this.src;
      }
    },


    /**
     * Creates IntersectionObserver instance and observe current element
     */
    observe: function observe() {
      var _this2 = this;

      var options = {
        threshold: this.threshold,
        root: this.element ? document.querySelector(this.element) : null,
        rootMargin: this.margin

        // creates IO instance
      };this.observer = new IntersectionObserver(function (entries) {
        // as we instantiated one for each component
        // we can directly access the first index
        if (entries[0].intersectionRatio >= _this2.ratio) {
          _this2.load();
        }
      }, options);

      // start observing main component
      this.observer.observe(this.$el);
    }
  },
  render: function render(h) {
    // class to be added to element indicating load state
    var elementClass = this.loaded ? this.loadedClass : this.loadingClass;

    return h(this.tag, {
      // if loading failed adds error class if exists,
      // otherwhise adds elementClass defined above
      class: this.errored && this.errorClass ? this.errorClass : elementClass
    }, [this.loaded ? this.$slots.default || this.$slots.image // allows for "default" slot
    : this.$slots.placeholder]);
  },
  mounted: function mounted() {
    // start observing the element visibility
    this.$nextTick(this.observe);
  }
};

// Export install function for CDN embeds
var install = function install(Vue) {
  Vue.component('clazy-load', ClazyLoadComponent);
};

// Component object
var VueClazyLoad = ClazyLoadComponent;

// Exports default object for ES6 modules
/* harmony default export */ __webpack_exports__["default"] = ({
  install: install
});

/***/ })
/******/ ]);
});