/*! 
 * CellBIS JavaScript Library v0.0.1
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
  
})(this, function ( cellbis ) {
  "use strict";
  
  /**
   * A main method for Plugin Utilities :
   */
  var Utils = function() {
    this.data = '';
  };
  
  /**
   * To check if
   *
   * @param for_utils
   * @return {Utils}
   */
  Utils.prototype.init = function init (for_utils) {
    if (for_utils !== undefined && for_utils !== '') {
      this.data = for_utils;
    }
    return this;
  };
  
  /**
   * To check if variable is defined
   *
   * @param data
   * @return {number}
   */
  Utils.prototype.check_is_defined = function check_is_defined (data) {
    return (data !== undefined && (data !== '' || data !== "")) ? 1 : 0;
  };
  
  /**
   * To check if variable is not defined
   *
   * @param data
   * @return {number}
   */
  Utils.prototype.check_is_not_defined = function check_is_not_defined (data) {
    return (data === undefined && (data === '' || data === "")) ? 1 : 0;
  };
  
  /**
   * To check if variable object is defined
   *
   * @param obj
   * @param prop
   * @return {number}
   */
  Utils.prototype.check_is_defined_obj = function check_is_defined_obj (obj, prop) {
    return (obj[prop] !== undefined && (obj[prop] !== '' || obj[prop] !== "")) ? 1 : 0;
  };
  
  /**
   * To check if variable object is not defined
   *
   * @param obj
   * @param prop
   * @return {number}
   */
  Utils.prototype.check_is_not_defined_obj = function check_is_not_defined_obj (obj, prop) {
    return (obj[prop] === undefined || obj[prop] === null ||obj[prop] === '' || obj[prop] === "") ? 1 : 0;
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
  Utils.prototype.inArray = function inArray (elem, arrObj, prop) {
    var _arr = [];
    var indexOf = _arr.indexOf;
    return arrObj == null ? -1 : indexOf.call(arrObj, elem, prop);
  };
  
  /**
   * To get protocol which accessed.
   *
   * @type {string}
   */
  Utils.prototype.protocol = location.protocol;
  Utils.prototype.protocol_prod = function protocol_prod () {
    var locProtocol = this.protocol;
    return (locProtocol.match(/http/)) ? 'http://' : locProtocol+'//'
  };
  Utils.prototype.protocol_string = function protocol_string() {
    var locProtocol = this.protocol;
    var regex = /\:/g;
    return locProtocol.replace(regex, '');
  };
  
  // To Use Cellbis Utils in all function if required :
  var js_utils = new Utils();
  
  /**
   * A main method for Browser Storage/Cache
   */
  var Browser_storage = function() {
    this.local_data = localStorage;
    return this;
  };
  
  /**
   * For add data storage :
   *
   * @param {string}    key
   * @param {string}    value
   */
  Browser_storage.prototype.add = function add (key, value) {
    if (this.local_data) {
      var data_value = (typeof value === "object") ? JSON.stringify(value) : value;
      this.local_data.setItem(key, data_value);
    }
  };
  
  /**
   * For Get data storage :
   *
   * @param   {string}              key
   * @return  {string | null | *}
   */
  Browser_storage.prototype.get = function get (key) {
    if (this.local_data) {
      this.data_store = this.local_data.getItem(key);
      return this.data_store;
    }
  };
  
  Browser_storage.prototype.getAll = function getAll () {
    if (this.local_data) {
      return this.data_store;
    }
  };
  
  Browser_storage.prototype.Delete = function Delete (key) {
    if (this.local_data) {
      this.local_data.removeItem(key);
    }
    return this;
  };
  
  Browser_storage.prototype.clear = function clear () {
    if (localStorage) {
      localStorage.clear();
    }
    return this;
  };
  
  Browser_storage.prototype.clear_with_value = function clear_with_value (size_data) {
    if (CellBIS_jsUtils.check_is_defined(size_data)) {
      var allStrings = '';
      for (var key in window.localStorage) {
        if (window.localStorage.hasOwnProperty(key)) {
          allStrings += window.localStorage[key];
        }
      }
      var r_cache = allStrings ? 3 + ((allStrings.length * 16) / (8 * 1024)) : 0;
      
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
   * - init           Initializationa function
   * - set_target     Set target dom result of render.
   * - set            To set object DOM, where which to generate HTML.
   * - array_type     This object will be used of "generate" object.
   * - generate       This main function for generate HTML.
   * - render         To get result of generator HTML.
   *
   */
  var htmlgen = function () {
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
  htmlgen.prototype.init = function init (data_json, target) {
    
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
  htmlgen.prototype.set_target = function set_target (target) {
    
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
  htmlgen.prototype.set = function set (data_json) {
    
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
  htmlgen.prototype.array_type = function(data_json) {
    
    var data_tag = '';
    
    if (data_json.length > 1) {
      var i = 0;
      var until = data_json.length;
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
  htmlgen.prototype.generate = function generate (data_json) {
    var result = '';
    
    if (js_utils.check_is_defined_obj(data_json, 'tag')) {
      
      // Declare variable :
      var prop = Object.keys(data_json);
      var i = 0, len = prop.length;
      var tag_attr;
      var data_attr = '';
      
      // To Check if tag is "Singleton"
      var tag_name = data_json['tag'];
      while (i < len) {
        if (js_utils.check_is_defined_obj(data_json, prop[i])) {
          tag_attr = prop[i];
          if (tag_attr !== 'attr' && tag_attr !== 'contents' && tag_attr !== 'tag' && tag_attr !== 'child' && tag_attr !== '') {
            data_attr += tag_attr+'="'+data_json[prop[i]]+'" ';
          }
          if (tag_attr === 'attr') {
            data_attr += data_json[prop[i]]
          }
        }
        i++;
      }
      
      if (js_utils.inArray(tag_name, this.tag_singleton) !== -1) {
        result = '<'+tag_name+' '+data_attr+'/>'
      } else {
        result = '<'+tag_name+' '+data_attr+'>'+'';
        
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
        
        result += '</'+tag_name+'>';
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
  htmlgen.prototype.render = function render () {
    var result;
    
    if (this.type_target === 'object') {
      var target = this.target_tag;
      if (js_utils.check_is_defined_obj(target, 'selector') && js_utils.check_is_defined_obj(target, 'type')) {
        var $target_selector;
        var selector = target['selector'];
        var type = target['type'];
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
        // var target1 = this.target_tag;
        var $target_selector1 = document.querySelector(this.target_tag);
        $target_selector1.innerHTML = this.data_html;
        result = 1;
      } else {
        result = this.data_html;
      }
    }
    
    return result;
  };
  
  /**
   * A main method to handle Extended function from
   * external javascript.
   */
  var cellBIS = function () {
    return this;
  };
  
  /**
   * A function for add sub function in function "cellBIS".
   *
   * List of sub function :
   * @type {
   *  {
   *    r_sub: r_sub,
   *    arg1: arg1,
   *    arg2: arg2,
   *    arg3: arg3,
   *  }
   * }
   */
  cellBIS.prototype.sub = {
    r_sub: function() {
      return this.data_sub;
    },
    arg1: function(obj, new_obj) {
      if (typeof new_obj === "object") {
        if (js_utils.check_is_not_defined_obj(obj, new_obj)) {
          for (var i = 0, prop, value, key_obj = Object.keys(new_obj); i < key_obj.length; i++) {
            prop = key_obj[i];
            obj[prop] = new_obj[prop];
          }
          this.data_sub = obj;
        }
      }
      return this;
    },
    arg2: function (obj, src, target) {
      if (typeof src === "object" && typeof target === "object") {
        
        // For "target" argument :
        for ( var a = 0, key_target = Object.keys(target), prop; a < key_target.length; a++) {
          prop = key_target[a];
          if (js_utils.check_is_not_defined_obj(src, prop)) {
            src[prop] = target[prop];
          }
        }
        
        // For "src" argument :
        for (var b = 0, key_src = Object.keys(src); b <  key_src.length; b++) {
          prop = key_src[b];
          if (js_utils.check_is_not_defined_obj(obj, prop)) {
            obj[prop] = src[prop];
          }
        }
        
        this.data_sub = obj;
      }
      return this;
    },
    arg3: function (obj, lexical, src, target) {
      
      if (typeof lexical === "object" && typeof src === "object" && typeof target === "object") {
        
        // For merge "target" and "src" argument :
        for ( var a = 0, key_target = Object.keys(target), prop; a < key_target.length; a++) {
          prop = key_target[a];
          if (js_utils.check_is_not_defined_obj(src, prop)) {
            src[prop] = target[prop];
          }
        }
        
        // For merge "src" and "lexical" argument :
        for (var b = 0, key_src = Object.keys(src); b <  key_src.length; b++) {
          prop = key_src[b];
          if (js_utils.check_is_not_defined_obj(lexical, prop)) {
            lexical[prop] = src[prop];
          }
        }
        
        // For merge "lexical" to "obj" argument :
        for (var c = 0, key_temp = Object.keys(lexical); c < key_temp.length; c++) {
          prop = key_temp[c];
          lexical = typeof lexical === "object" && (Object.keys(lexical).length) !== 0 ? lexical : {};
          if (js_utils.check_is_not_defined_obj(obj, prop)) {
            obj[prop] = lexical[prop];
          }
        }
        
        this.data_sub = obj;
      }
      return this;
    },
    argU: function () {
      var obj = arguments[0];
      arguments.shift();
      
      for (var a = 0, input; a < arguments.length; a++) {
        input = arguments[a];
        if (typeof input === "object") {
          for (var b = 0, prop, value, key_input = Object.keys(input); b < key_input.length; b++) {
            prop = key_input[b];
            obj[prop] = input[prop];
          }
        }
      }
      this.data_sub = obj;
      return this;
    }
  };
  
  // Little information about this JavaScript Plugin.
  cellbis.name = 'cellbis.js';
  cellbis.version = '0.0.1';
  
  /**
   * All high-level of function "cellbis.htmlgen.*" use "htmlgen()" function.
   *
   * @type {htmlgen}
   */
  var defaultHtmlGen = new htmlgen();
  
  // To initilization function.
  cellbis.hgen = function html_gen(data_json, target) {
    return defaultHtmlGen.init(data_json, target);
  };
  
  /**
   * All high-level of function "cellbis.utils.*" use "Utils()" function.
   * @type {Utils}
   */
  var defaultUtils = new Utils();
  
  // For initialization CellBIS Utils.
  cellbis.utils = function utils (for_utils) {
    return defaultUtils.init(for_utils);
  };
  
  /**
   * All high-level of function "cellbis.browser_cache.*" use "Browser_storage()" function
   * @type {Browser_storage}
   */
  var defaultBrowser_cache = new Browser_storage();
  
  // For initialization CellBIS Browser Storage/Cache :
  cellbis.browser_cache = function browser_cache () {
    return defaultBrowser_cache;
  };
  
  /**
   * All High-level of function to handle added object function.
   * This object similar with jQuery.extend.
   */
  var defaultCbSub = new cellBIS();
  
  cellbis.sub = function sub () {
    var
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
      defaultCbSub.sub.arg1(this_obj, arguments[0]);
      result = defaultCbSub.sub.r_sub();
    }
    
    // if two arguments input
    // only do merge object.
    if (arguments.length === 2) {
      source = arguments[0];
      target = arguments[1];
      defaultCbSub.sub.arg2(this_obj, source, target);
      result = defaultCbSub.sub.r_sub();
    }
    
    // if three arguments input
    if (arguments.length >= 3) {
      
      lexical = arguments[0];
      source = arguments[1];
      target = arguments[2];
      defaultCbSub.sub.arg3(this_obj, lexical, source, target);
      result = defaultCbSub.sub.r_sub();
    }
    
    return result;
  };
  
  return cellbis;
});

(function () {
  
  // Anonymous function to generate custom HTML Tag.
  var html = function() {
    this.pagination = {};
    this.form = {};
    this.table = {};
  };
  
  // Add the "html" object into the CellBIS Global function
  // to add a new object under the "html" object.
  cellbis.sub({ html : html.prototype });
  
  // Anonymous function to generate pagination page.
  var pagination = function() {
  
  };
  
})();