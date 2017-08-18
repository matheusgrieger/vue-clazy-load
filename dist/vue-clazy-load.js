(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("VueClazyLoad", [], factory);
	else if(typeof exports === 'object')
		exports["VueClazyLoad"] = factory();
	else
		root["VueClazyLoad"] = factory();
})(this, function() {
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
/*!
 * Vue Clazy Load
 * Component-based lazy (CLazy) load images in Vue.js 2
 * @author Matheus Grieger
 * @version 0.0.1
 */
function ClazyLoad(Vue) {
  Vue.component('clazy-load', {
    name: 'ClazyLoad',
    props: {
      /**
       * HTML/Component tag name to be used in place of the component
       * @type {Object}
       * @default div
       */
      tag: {
        type: String,
        default: 'div'
      },
      /**
       * Image source URL
       * @type {Object}
       * @required
       */
      src: {
        type: String,
        required: true
      }
    },
    data: function data() {
      return {
        loaded: false
      };
    },

    methods: {
      /**
       * Start loading image
       */
      load: function load() {
        var _this = this;

        // fake image
        var img = new Image();
        // with this function we can use it in multiple places
        // like the two listeners below
        var fn = function fn() {
          _this.loaded = true;
          // emits 'load' event upwards
          _this.$emit('load');
          // discard fake image
          img = null;
        };

        img.addEventListener('load', fn);
        img.addEventListener('error', fn);

        img.src = this.src;
      }
    },
    render: function render(h) {
      return h(this.tag, {
        // adds 'loaded' class if finished loading
        // or 'loading' class if still loading
        // TODO: allow custom class naming
        class: this.loaded ? 'loaded' : 'loading'
      }, [this.loaded ? this.$slots.image : this.$slots.placeholder]);
    },
    created: function created() {
      // starts loading right away
      // TODO: load only when visible onscreen
      this.load();
    }
  });
}

var install = ClazyLoad;

/***/ })
/******/ ]);
});