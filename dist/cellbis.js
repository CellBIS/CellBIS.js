/*!
 * CellBIS JavaScript Library v0.0.1.beta.2
 * Date Create : 08 January 2018 11:15 AM
 *
 * Copyright Achmad Yusri Afandi (yusrideb@cpan.org)
 * Released under the Artistic License 2.0
 *
 */
(function (global, factory) {
  
  "object" === typeof exports && exports && "string" !== typeof exports.nodeName ?
    factory(exports) : // CommonJS
    "function" === typeof define && define.amd ?
      define(["exports"], factory) : // AMD
      
      (global.CellBIS = {},
        factory(global.CellBIS), // script, wsh, asp
        
        // Expose Cellbis, CELLBIS, and cb identifiers
        global.Cellbis = global.CellBIS,
        global.CELLBIS = global.CellBIS,
        global.cellbis = global.CellBIS,
        global.cb = global.CellBIS)
  
})(this, function (cellbis) {
  "use strict";
  
  /**
   * A main class for Plugin Utilities :
   */
  class Utils {
    constructor (for_utils) {
      this.data = '';
      if (for_utils !== undefined && for_utils !== '') {
        this.data = for_utils;
      }
      
      // For URL Protocol
      this.protocol = location.protocol;
      let locProtocol = this.protocol;
      this.protocol_prod = locProtocol.match(/http/) ? 'http://' : this.protocol + '//';
      
      // For  URL protocol string :
      let regexProtoString = /\:/g;
      this.protocol_string = locProtocol.replace(regexProtoString, '');
    }
    
    /**
     * To check if variable is defined
     *
     * @param data
     * @return {number}
     */
    check_is_defined(data) { return (data !== undefined && (data !== '' || data !== "")) ? 1 : 0; }
    
    /**
     * To check if variable is not defined
     *
     * @param data
     * @return {number}
     */
    check_is_not_defined(data) { return (data === undefined && (data === '' || data === "")) ? 1 : 0; }
    
    /**
     * To check if variable object is defined
     *
     * @param obj
     * @param prop
     * @return {number}
     */
    check_is_defined_obj(obj, prop) {
      return (obj[prop] !== undefined && (obj[prop] !== '' || obj[prop] !== "")) ? 1 : 0;
    };
    
    /**
     * To check if variable object is not defined
     *
     * @param obj
     * @param prop
     * @return {number}
     */
    check_is_not_defined_obj(obj, prop) {
      return (obj[prop] === undefined || obj[prop] === null || obj[prop] === '' || obj[prop] === "") ? 1 : 0;
    };
    
    /**
     * To check if property in object is exists
     * and If not exists return default data.
     *
     * @param obj
     * @param prop
     * @param for_return
     * @return {number}
     */
    check_data_obj(obj, prop, for_return) {
      return (obj[prop] !== undefined && (obj[prop] !== '' || obj[prop] !== "")) ? obj[prop] : for_return;
    };
    
    /**
     * To compare two object
     *
     * @param src
     * @param target
     * @param indicator
     */
    obj_combine(src, target, indicator) {
      let new_obj = {};
      if (typeof src === "object" && typeof target === "object") {
        if (Array.isArray(indicator)) {
          for (let i = 0, fornew_keyObj = '', fornew_dataObj = '', length = indicator.length; i < length; i++) {
            fornew_keyObj = indicator[i];
            fornew_dataObj = this.check_data_obj(target, fornew_keyObj, src[fornew_keyObj]);
            new_obj[fornew_keyObj] = fornew_dataObj;
          }
        }
      }
      return new_obj;
    };
    
    /**
     * To check if data is founded in array
     * This prototype function originally from jQuery.
     *
     * @param elem
     * @param arrObj
     * @param prop
     * @return {number}
     */
    inArray(elem, arrObj, prop) {
      let _arr = [];
      let indexOf = _arr.indexOf;
      return arrObj == null ? -1 : indexOf.call(arrObj, elem, prop);
    };
    
    /**
     * To check even number or not.
     * @param   {number} num
     * @return  {number}
     */
    even_num(num) {
      return num % 2;
    };
    
    /**
     * To return data object from function argument.
     * @return {{}}
     */
    reto() {
      let len_arg = arguments.length;
      let obj = {}, value = '';
      if (len_arg === 1 && typeof arguments[0] === "object" && !Array.isArray(arguments[0])) {
        obj = arguments[0];
      }
      if (len_arg > 1) {
        for (let i = 0; i < len_arg; i++) {
          Utils.even_num(i) === 0 ?
            obj[arguments[i]] = arguments[(i + 1)] :
            obj[arguments[(i - 1)]] = arguments[i];
        }
      }
      return obj;
    };
  }
  
  // To Use Cellbis Utils in all function if required :
  let js_utils = new Utils();
  
  /**
   * A main method for Browser Storage/Cache
   */
  let Browser_storage = function () {
    this.local_data = localStorage;
    return this;
  };
  
  /**
   * For add data storage :
   *
   * @param {string}    key
   * @param {string}    value
   */
  Browser_storage.prototype.add = function add(key, value) {
    if (this.local_data) {
      let data_value = (typeof value === "object") ? JSON.stringify(value) : value;
      this.local_data.setItem(key, data_value);
    }
  };
  
  /**
   * For Get data storage :
   ** @param   {string}              key
   * @return  {string | null | *}
   */
  Browser_storage.prototype.get = function get(key) {
    if (this.local_data) {
      this.data_store = this.local_data.getItem(key);
      return this.data_store;
    }
  };
  
  Browser_storage.prototype.getAll = function getAll() {
    if (this.local_data) {
      return this.data_store;
    }
  };
  
  Browser_storage.prototype.Delete = function Delete(key) {
    if (this.local_data) {
      this.local_data.removeItem(key);
    }
    return this;
  };
  
  Browser_storage.prototype.clear = function clear() {
    if (localStorage) {
      localStorage.clear();
    }
    return this;
  };
  
  Browser_storage.prototype.clear_with_value = function clear_with_value(size_data) {
    if (js_utils.check_is_defined(size_data)) {
      let allStrings = '';
      for (let key in window.localStorage) {
        if (window.localStorage.hasOwnProperty(key)) {
          allStrings += window.localStorage[key];
        }
      }
      let r_cache = allStrings ? 3 + ((allStrings.length * 16) / (8 * 1024)) : 0;
      
      if (r_cache >= size_data) {
        /** Clear all data storage */
        localStorage.clear();
      }
    }
  };
  
  /**
   * A main method to handle HTML Generator.
   *
   * Prototype of this function consists :
   * - init           Initialization function
   * - set_target     Set target dom result of render.
   * - set            To set object DOM, where which to generate HTML.
   * - array_type     This object will be used of "generate" object.
   * - generate       This main function for generate HTML.
   * - render         To get result of generator HTML.
   *
   */
  let htmlgen = function () {
    this.tag_singleton = [
      'input',
      'img',
      'area',
      'base',
      'br',
      'command',
      'hr',
      'keygen',
      'link',
      'meta',
      'param',
      'source',
      'track',
      'wbr',
      'br'
    ];
    this.type_target = 'string';
    this.target_tag = {};
    this.data_html = '';
  };
  
  /**
   * Main object function prototype for generate XML Tag :
   *
   * Format Object data_json :
   * ----------------------------------
   * object {}
   *
   * Format Array data_json :
   * ----------------------------------
   * Array []
   *
   * @param {object}          data_json
   * @param {string|object}   target
   * @return {htmlgen}
   */
  htmlgen.prototype.init = function init(data_json, target) {
    
    // For Target Tag :
    if (js_utils.check_is_defined(target)) {
      if (typeof target === "object") {
        this.type_target = 'object';
        this.target_tag = target;
      } else {
        this.type_target = 'string';
        this.target_tag = target;
      }
    } else {
      this.type_target = '';
      this.target_tag = '';
    }
    
    if (js_utils.check_is_defined(data_json) && typeof data_json === "object") {
      if (Array.isArray(data_json)) {
        this.data_html = this.array_type(data_json);
      } else {
        this.data_html = this.generate(data_json);
      }
    }
    return this;
  };
  
  /**
   * Object function prototype for set dom target
   * result of HTML generator
   *
   * @param   {string|object}   target
   * @return {htmlgen}
   */
  htmlgen.prototype.set_target = function set_target(target) {
    
    // For Target Tag :
    if (js_utils.check_is_defined(target)) {
      if (typeof target === "object") {
        this.type_target = 'object';
        this.target_tag = target;
      } else {
        this.type_target = 'string';
        this.target_tag = target;
      }
    } else {
      this.type_target = '';
      this.target_tag = '';
    }
    return this;
  };
  
  /**
   * Object function prototype for set data json to generate HTML
   *
   * @param   {object}            data_json
   * @return {htmlgen}
   */
  htmlgen.prototype.set = function set(data_json) {
    
    if (js_utils.check_is_defined(data_json) && typeof data_json === "object") {
      if (Array.isArray(data_json)) {
        this.data_html = this.array_type(data_json);
      } else {
        this.data_html = this.generate(data_json);
      }
    }
    return this;
  };
  
  /**
   * Object function prototype for generate html for object array :
   *
   * Format Array data_json :
   * ----------------------------------
   * Array [
   *    {
   *      'tag' : '', # Tag name,
   *      'content' : '', # Content of tag html,
   *      'child' : [
   *          {
   *            'tag' : '', # Tag name,
   *            'content' : '', # Content of tag html,
   *            'child' : [], # same this object, recursive
   *          }
   *      ], # child xml tag,
   *    }
   * ]
   *
   * @param data_json
   * @return {string}
   */
  htmlgen.prototype.array_type = function (data_json) {
    
    let data_tag = '';
    
    if (data_json.length > 1) {
      let i = 0;
      let until = data_json.length;
      while (i < until) {
        data_tag += this.generate(data_json[i]);
        i++;
      }
    } else {
      if (data_json.length !== 0) {
        data_tag = this.generate(data_json[0]);
      }
    }
    
    return data_tag;
  };
  
  /**
   * Object function prototype for generate single HTML tag.
   *
   * Format Object data_json :
   * ----------------------------------------
   * object {
   *      'tag' : '', # Tag name,
   *      'contents' : '', # Content of tag html,
   *      'child' : [], # call function 'this.array_type'
   * }
   *
   * Format Object data_json for 'input' :
   * ----------------------------------------
   * object {
   *    'id' : '',
   *    'class' : '',
   *    'style' : '',
   *    'name' : '',
   *    'value' : '',
   * }
   *
   * @param data_json
   * @return {string}
   */
  htmlgen.prototype.generate = function generate(data_json) {
    let result = '';
    
    if (js_utils.check_is_defined_obj(data_json, 'tag')) {
      
      // Declare variable :
      let prop = Object.keys(data_json);
      let i = 0, len = prop.length;
      let tag_attr;
      let data_attr = '';
      
      // To Check if tag is "Singleton"
      let tag_name = data_json['tag'];
      while (i < len) {
        if (js_utils.check_is_defined_obj(data_json, prop[i])) {
          tag_attr = prop[i];
          if (
            tag_attr !== 'attr' &&
            tag_attr !== 'contents' &&
            tag_attr !== 'tag' &&
            tag_attr !== 'child' &&
            tag_attr !== ''
          ) {
            
            data_attr += tag_attr + '="' + data_json[prop[i]] + '" ';
          }
          if (tag_attr === 'attr') {
            data_attr += data_json[prop[i]]
          }
        }
        i++;
      }
      
      if (js_utils.inArray(tag_name, this.tag_singleton) !== -1) {
        result = '<' + tag_name + ' ' + data_attr + '/>'
      } else {
        result = '<' + tag_name + ' ' + data_attr + '>' + '';
        
        if (js_utils.check_is_defined_obj(data_json, 'contents')) {
          if (js_utils.check_is_defined_obj(data_json, 'child')) {
            if (Array.isArray(data_json['child'])) {
              result += data_json['contents'];
              result += this.array_type(data_json['child']);
            }
          } else {
            result += data_json['contents'];
          }
        } else {
          if (js_utils.check_is_defined_obj(data_json, 'child')) {
            if (Array.isArray(data_json['child'])) {
              result += this.array_type(data_json['child']);
            }
          }
        }
        
        result += '</' + tag_name + '>';
      }
    } else {
      console.log('property "tag" is undefined')
    }
    
    return result;
  };
  
  /**
   * To render HTML.
   *
   * @return {*}
   */
  htmlgen.prototype.render = function render() {
    let result;
    
    if (this.type_target === 'object') {
      let target = this.target_tag;
      if (
        js_utils.check_is_defined_obj(target, 'selector') &&
        js_utils.check_is_defined_obj(target, 'type')
      ) {
        let $target_selector;
        let selector = target['selector'];
        let type = target['type'];
        $target_selector = document.querySelector(selector);
        if (type === 'append') {
          $target_selector.insertAdjacentHTML('beforeend', this.data_html);
        }
        if (type === 'replace') {
          $target_selector.innerHTML = this.data_html;
        }
        result = 1;
      } else {
        result = this.data_html;
      }
    } else {
      if (js_utils.check_is_defined(this.type_target)) {
        // let target1 = this.target_tag;
        let $target_selector1 = document.querySelector(this.target_tag);
        $target_selector1.innerHTML = this.data_html;
        result = 1;
      } else {
        result = this.data_html;
      }
    }
    
    return result;
  };
  
  /**
   * Add prototype "sub" function into function "cBIS".
   *
   * List of subroutine function :
   * - r_sub(),
   * - arg1(),
   * - arg2(), and
   * - arg3(),
   *
   */
  class Sub {
    r_sub() {
      return this.data_sub;
    }
    arg1(obj, new_obj) {
      if (typeof new_obj === "object") {
        if (js_utils.check_is_not_defined_obj(obj, new_obj)) {
          for (let i = 0, prop, value, key_obj = Object.keys(new_obj); i < key_obj.length; i++) {
            prop = key_obj[i];
            obj[prop] = new_obj[prop];
          }
          this.data_sub = obj;
        }
      }
      return this;
    }
    arg2(obj, src, target) {
      if (typeof src === "object" && typeof target === "object") {
        
        // For "target" argument :
        for (let a = 0, key_target = Object.keys(target), prop; a < key_target.length; a++) {
          prop = key_target[a];
          if (js_utils.check_is_not_defined_obj(src, prop)) {
            src[prop] = target[prop];
          }
        }
        
        // For "src" argument :
        for (let b = 0, key_src = Object.keys(src), prop; b < key_src.length; b++) {
          prop = key_src[b];
          if (js_utils.check_is_not_defined_obj(obj, prop)) {
            obj[prop] = src[prop];
          }
        }
        
        this.data_sub = obj;
      }
      return this;
    }
    arg3(obj, lexical, src, target) {
      
      if (typeof lexical === "object" && typeof src === "object" && typeof target === "object") {
        
        // For merge "target" and "src" argument :
        for (let a = 0, key_target = Object.keys(target), prop; a < key_target.length; a++) {
          prop = key_target[a];
          if (js_utils.check_is_not_defined_obj(src, prop)) {
            src[prop] = target[prop];
          }
        }
        
        // For merge "src" and "lexical" argument :
        for (let b = 0, key_src = Object.keys(src), prop; b < key_src.length; b++) {
          prop = key_src[b];
          if (js_utils.check_is_not_defined_obj(lexical, prop)) {
            lexical[prop] = src[prop];
          }
        }
        
        // For merge "lexical" to "obj" argument :
        for (let c = 0, key_temp = Object.keys(lexical), prop; c < key_temp.length; c++) {
          prop = key_temp[c];
          lexical = typeof lexical === "object" && (Object.keys(lexical).length) !== 0 ? lexical : {};
          if (js_utils.check_is_not_defined_obj(obj, prop)) {
            obj[prop] = lexical[prop];
          }
        }
        
        this.data_sub = obj;
      }
      return this;
    }
    argU() {
      let obj = arguments[0];
      arguments.shift();
      
      for (let a = 0, input; a < arguments.length; a++) {
        input = arguments[a];
        if (typeof input === "object") {
          for (let b = 0, prop, value, key_input = Object.keys(input); b < key_input.length; b++) {
            prop = key_input[b];
            obj[prop] = input[prop];
          }
        }
      }
      this.data_sub = obj;
      return this;
    }
  }
  
  /**
   * Class for union object
   *
   * List of subroutine function :
   * - r_obj() and
   * - obj()
   */
  class Union {
    r_obj() {
      return this.data_union
    }
    obj(src, new_obj) {
      if (typeof src === "object" && typeof new_obj === "object") {
        for (let i = 0, prop, value, key_obj = Object.keys(new_obj); i < key_obj.length; i++) {
          prop = key_obj[i];
          src[prop] = new_obj[prop];
        }
        this.data_union = src;
      } else {
        this.data_union = {};
      }
      return this;
    }
  }
  
  /**
   * A main class to handle extended function on
   * global function "cellbis"
   */
  class cBIS {
    
    sub() { return new Sub() }
    
    union() { return new Union() }
  }
  
  // Little information about this JavaScript Plugin.
  cellbis.name = 'cellbis.js';
  cellbis.version = '0.0.1.beta.2';
  
  /**
   * All high-level of function "cellbis.htmlgen.*" use "htmlgen()" function.
   *
   * @type {htmlgen}
   */
  let defaultHtmlGen = new htmlgen();
  
  // To initialization function.
  cellbis.hgen = function html_gen(data_json, target) {
    return defaultHtmlGen.init(data_json, target);
  };
  
  // For initialization CellBIS Utils.
  cellbis.utils = new Utils();
  
  /**
   * All high-level of function "cellbis.browser_cache.*" use "Browser_storage()" function
   * @type {Browser_storage}
   */
  let defaultBrowser_cache = new Browser_storage();
  
  // For initialization CellBIS Browser Storage/Cache :
  cellbis.browser_cache = function browser_cache() {
    return defaultBrowser_cache;
  };
  
  /**
   * All High-level of function to handle added object function.
   * This object similar with jQuery.extend.
   */
  let defaultCbSub = new cBIS();
  
  /**
   * Add object function "sub" for add sub function into "CellBIS"
   *
   * @return {{}}
   */
  cellbis.sub = function sub() {
    let
      this_obj = this,
      lexical = {},
      source = {},
      target = {},
      result = {};
    
    // if no argument input.
    if (arguments.length === 0) {
      result = this;
    }
    
    // if one arguments input
    if (arguments.length === 1) {
      defaultCbSub.sub().arg1(this_obj, arguments[0]);
      result = defaultCbSub.sub().r_sub();
    }
    
    // if two arguments input
    // only do merge object.
    if (arguments.length === 2) {
      source = arguments[0];
      target = arguments[1];
      defaultCbSub.sub().arg2(this_obj, source, target);
      result = defaultCbSub.sub().r_sub();
    }
    
    // if three arguments input
    if (arguments.length >= 3) {
      
      lexical = arguments[0];
      source = arguments[1];
      target = arguments[2];
      defaultCbSub.sub().arg3(this_obj, lexical, source, target);
      result = defaultCbSub.sub().r_sub();
    }
    
    return result;
  };
  
  cellbis.union = {
    object (source, new_object) {
      defaultCbSub.union().obj(source, new_object);
      return defaultCbSub.union().r_obj();
    }
  };
  
  return cellbis;
});

// CellBIS Custom Subroutine
(function () {
  
  // Add the "html" object into the CellBIS Global function
  // to add a new object under the "html" object.
  cellbis.sub({
    UI: {
      pagination() {},
      paginationType: {},
      form() {},
      table() {}
    },
    Com: {
      fileUpload() {
      }
    }
  });
  
})();

// CellBIS HTML UI Custom - Pagination.
(function () {
  
  // Anonymous function to generate pagination page.
  let pagination = function () {
    
    this.themes = {
      default: {
        name: 'default',
        tag: {
          wrap: 'ul', prev: 'li', next: 'li', page: 'li'
        },
        id: {
          wrap: '', prev: '', next: '', page: ''
        },
        class: {
          wrap: '', prev: '', next: '', page: ''
        },
        other_attr: {
          wrap: '', prev: '', next: '', page: ''
        }
      },
      bootstrap: {
        name: 'bootstrap',
        tag: {
          wrap: 'ul', prev: 'li', next: 'li', page: 'li'
        },
        id: {
          wrap: '', prev: '', next: '', page: ''
        },
        class: {
          wrap: '', prev: '', next: '', page: ''
        },
        other_attr: {
          wrap: '', prev: '', next: '', page: ''
        }
      }
    };
    this.config = {
      first: true,
      last: true
    };
    this.label = {
      firstPage: 'First',
      lastPage: 'Last',
      prev: 'Previous',
      next: 'Next'
    };
    this.first = true;
    this.last = true;
    this.prev = true;
    this.next = true;
    this.amount_pages = 5;
    this.defaultAmount_pages = 5;
    this.firstAmount_pages = 5;
    this.currentPage = 1;
    this.theme_active = 'default';
    this.method = {};
  };
  
  // Prototype for initialization function "pagination"
  pagination.prototype.init = function init(config) {
    
    if (config) {
      this.method = cb.utils.check_is_defined_obj(config, 'method') ? config.method : this.method;
      this.first = cb.utils.check_is_defined_obj(config, 'firstPage') ? config.firstPage : this.firstPage;
      this.last = cb.utils.check_is_defined_obj(config, 'lastPage') ? config.lastPage : this.lastPage;
      this.prev = cb.utils.check_is_defined_obj(config, 'prev') ? config.prev : this.prev;
      this.next = cb.utils.check_is_defined_obj(config, 'next') ? config.next : this.next;
      this.amount_pages = cb.utils.check_is_defined_obj(config, 'amount_pages') ?
        config.amount_pages : this.amount_pages;
      this.defaultAmount_pages = cb.utils.check_is_defined_obj(config, 'defaultAmount_pages') ?
        config.defaultAmount_pages : this.defaultAmount_pages;
      this.firstAmount_pages = cb.utils.check_is_defined_obj(config, 'firstAmount_pages') ?
        config.firstAmount_pages : this.firstAmount_pages;
      this.currentPage = cb.utils.check_is_defined_obj(config, 'currentPage') ?
        config.currentPage : this.currentPage;
      this.themes = cb.utils.check_is_defined_obj(config, 'themes') ? config.themes : this.themes;
      this.theme_active = cb.utils.check_is_defined_obj(config, 'theme_active') ? config.theme_active : this.theme_active;
    }
    return this;
  };
  
  // Set theme :
  pagination.prototype.set_theme = function set_theme(theme_name) {
    if (theme_name && theme_name !== "") {
      if (cb.utils.check_is_defined_obj(this.themes, theme_name)) {
        this.theme_active = theme_name;
      }
    }
    return this;
  };
  
  // Add new theme :
  pagination.prototype.add_theme = function add_themes(theme_name, config, validate) {
    if (typeof config === "object") {
      let new_theme = {};
      
      if (validate) {
        let for_newConfig = {};
        
        // Name Themes :
        for_newConfig['name'] = (typeof theme_name === "string" ? theme_name : 'undef_theme');
        
        // Tag Themes :
        for_newConfig['tag'] = cb.utils.obj_combine(this.themes.bootstrap.tag, config['tag'],
          ['wrap', 'prev', 'next', 'page']);
        
        // Id Themes :
        for_newConfig['id'] = cb.utils.obj_combine(this.themes.bootstrap.tag, config['id'],
          ['wrap', 'prev', 'next', 'page']);
        
        // Class Themes :
        for_newConfig['class'] = cb.utils.obj_combine(this.themes.bootstrap.tag, config['class'],
          ['wrap', 'prev', 'next', 'page']);
        
        // other_attr Themes :
        for_newConfig['other_attr'] = cb.utils.obj_combine(this.themes.bootstrap.tag, config['other_attr'],
          ['wrap', 'prev', 'next', 'page']);
        
        new_theme[(typeof theme_name === "string" ? theme_name : 'undef_theme')] = for_newConfig;
        
      } else {
        new_theme[(typeof theme_name === "string" ? theme_name : 'undef_theme')] = config;
      }
      
      // Union object "theme" :
      cb.union.object(this.themes, new_theme);
      
      return this;
    }
  };
  
  // Config Themes :
  pagination.prototype.config_theme = function config_theme(theme_name, prop_cfg, obj) {
    if (cb.utils.check_is_defined_obj(this.themes, theme_name)) {
      if (cb.utils.check_is_defined_obj(obj, prop_cfg)) {
        if (theme_name !== 'default') {
          this.themes[theme_name][prop_cfg] = obj;
        }
      }
    }
    return this;
  };
  
  pagination.prototype.render = function render() {
  
  };
  
})();
