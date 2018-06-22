/*!
 * CellBIS JavaScript Library v0.0.1-beta.4
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
      if (!global) {
        this.protocol = location.protocol;
        let locProtocol = this.protocol;
        this.protocol_prod = locProtocol.match(/http/) ? 'http://' : this.protocol + '//';
        
        // For  URL protocol string :
        let regexProtoString = /\:/g;
        this.protocol_string = locProtocol.replace(regexProtoString, '');
      }
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
    even_num(num) { return num % 2 };
    
    /**
     * Number comparison.
     * This function like : if (expr >= first && expr <= last)
     * Or : if ((expr >= first || expr >= other_expr) && expr <= last)
     * [OR] Operator support until 3 :
     * - cb.utils.num_compare(first, last, expr, expr1);
     * - cb.utils.num_compare(first, last, expr, expr1, expr2);
     * - cb.utils.num_compare(first, last, expr, expr1, expr2, expr3);
     *
     * @param   {number}  first
     * @param   {number}  last
     * @param   {number}  expr
     * @return  {boolean}
     */
    num_compare(first, last, expr) {
      let result;
      let args = arguments;
      let r_action = {
        arg3 : (expr >= first && expr <= last),
        arg4 : ((expr >= first || expr >= args[3]) && expr <= last),
        arg5 : ((expr >= first || expr >= args[3] || expr >= args[4]) && expr <= last),
        arg6 : ((expr >= first || expr >= args[3] || expr >= args[4] || expr >= args[5]) && expr <= last),
      };
      return r_action['arg'+args.length] ? r_action['arg'+args.length] : r_action['arg3'];
    }
    
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
          this.even_num(i) === 0 ?
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
    if (!global) this.local_data = localStorage;
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
    argU(...args) {
      let obj = args[0];
      args.shift();
      
      for (let a = 0, input; a < args.length; a++) {
        input = args[a];
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
   * - result() and
   * - object()
   */
  class Union {
    constructor() {
      this.type = 'object';
      this.output = undefined;
    }
    result() { return this.output }
    object(src, new_obj) {
      if (typeof src === "object" && typeof new_obj === "object") {
        for (let i = 0, prop, value, key_obj = Object.keys(new_obj); i < key_obj.length; i++) {
          prop = key_obj[i];
          src[prop] = new_obj[prop];
        }
        this.output = src;
      } else {
        this.output = {};
      }
      this.type = 'object';
      return this;
    }
  }
  
  /**
   * Class for combine object
   *
   * List of subroutine funciton :
   * - result() and
   * - object()
   */
  class Combine {
    constructor() {
      this.type = 'object';
      this.output = undefined;
    }
    result() { return this.output }
    object(src, target, indicator) {
      let new_obj = {};
      if (typeof src === "object" && typeof target === "object") {
        if (Array.isArray(indicator)) {
          for (let i = 0, fornew_keyObj = '', fornew_dataObj = '', length = indicator.length; i < length; i++) {
            fornew_keyObj = indicator[i];
            fornew_dataObj = js_utils.check_data_obj(target, fornew_keyObj, src[fornew_keyObj]);
            new_obj[fornew_keyObj] = fornew_dataObj;
          }
        }
      }
      this.type = 'object';
      this.output = new_obj;
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
    
    combine() { return new Combine() }
  }
  
  // Little information about this JavaScript Plugin.
  cellbis.name = 'cellbis.js';
  cellbis.version = '0.0.1-beta.4';
  
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
      let action = defaultCbSub.union().object(source, new_object);
      return action.result();
    }
  };
  
  cellbis.combine = {
    object (source, target, indicator) {
      let action = defaultCbSub.combine().object(source, target, indicator);
      return action.result();
    }
  };
  
  // For CellBIS - UI Generator
  cellbis.UI = {
    pagination() {},
    paginationType: {},
    form() {},
    table() {}
  };
  
  // For CellBIS - Component
  cellbis.Com = {
    event() {},
    fileUpload() {},
    WebStorage() {}
  };
  
  return cellbis;
});
