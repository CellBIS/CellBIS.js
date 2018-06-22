/*! 
 * Filename : cellbis-generator.min.js
 * Author: Achmad Yusri Afandi (yusrideb@cpan.org)
 * Date Create : 6/22/18 9:08 PM
 *
 * Copyright Achmad Yusri Afandi (yusrideb@cpan.org)
 * Released under the Artistic License 2.0
 *
 */


// Uses CommonJS, AMD or browser globals to create a CellBIS.js Plugin.
// This transplantation from :
// https://github.com/umdjs/umd/blob/master/templates/jqueryPlugin.js
//
// To get to know more about the Universal Module Definition
// visit: https://github.com/umdjs/umd
//
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    
    // AMD. Register as an anonymous module.
    define(['cellbis'], factory);
  } else if (typeof module === 'object' && module.exports) {
    
    // Node / CommonJS
    module.exports = function( root, cellbis ) {
      if ( cellbis === undefined ) {
        // require('cellbis') returns a factory that requires window to
        // build a CellBIS.js instance, we normalize how we use modules
        // that require this pattern but the window provided is a noop
        // if it's defined (how cellbis works)
        if ( typeof window !== 'undefined' ) {
          cellbis = require('cellbis');
        } else {
          cellbis = require('cellbis')(root);
        }
      }
      factory(cellbis);
      return cellbis;
    };
  } else {
    // Browser globals
    factory(cellbis);
  }
}(function (cb) {
  
  "use strict";
  
  let cbUtils = cb.utils;
  
  /**
   * A main class to handle HTML Generator.
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
  class HTML_generator {
    constructor() {
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
    }
    
    /**
     * Function for initialization :
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
    init(data_json, target) {
      
      // For Target Tag :
      if (cbUtils.check_is_defined(target)) {
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
      
      if (cbUtils.check_is_defined(data_json) && typeof data_json === "object") {
        if (Array.isArray(data_json)) {
          this.data_html = this.array_type(data_json);
        } else {
          this.data_html = this.generate(data_json);
        }
      }
      return this;
    }
    
    /**
     * Object function prototype for set dom target
     * result of HTML generator
     *
     * @param   {string|object}   target
     * @return  {HTML_generator}
     */
    set_target(target) {
      
      // For Target Tag :
      if (cbUtils.check_is_defined(target)) {
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
    }
    
    /**
     * Object function prototype for set data json to generate HTML
     *
     * @param   {object}            data_json
     * @return  {HTML_generator}
     */
    set(data_json) {
      
      if (cbUtils.check_is_defined(data_json) && typeof data_json === "object") {
        if (Array.isArray(data_json)) {
          this.data_html = this.array_type(data_json);
        } else {
          this.data_html = this.generate(data_json);
        }
      }
      return this;
    }
    
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
    array_type(data_json) {
      
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
    }
    
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
    generate(data_json) {
      let result = '';
      
      if (cbUtils.check_is_defined_obj(data_json, 'tag')) {
        
        // Declare variable :
        let prop = Object.keys(data_json);
        let i = 0, len = prop.length;
        let tag_attr;
        let data_attr = '';
        
        // To Check if tag is "Singleton"
        let tag_name = data_json['tag'];
        while (i < len) {
          if (cbUtils.check_is_defined_obj(data_json, prop[i])) {
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
        
        if (cbUtils.inArray(tag_name, this.tag_singleton) !== -1) {
          result = '<' + tag_name + ' ' + data_attr + '/>'
        } else {
          result = '<' + tag_name + ' ' + data_attr + '>' + '';
          
          if (cbUtils.check_is_defined_obj(data_json, 'contents')) {
            if (cbUtils.check_is_defined_obj(data_json, 'child')) {
              if (Array.isArray(data_json['child'])) {
                result += data_json['contents'];
                result += this.array_type(data_json['child']);
              }
            } else {
              result += data_json['contents'];
            }
          } else {
            if (cbUtils.check_is_defined_obj(data_json, 'child')) {
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
    }
    
    /**
     * To render HTML.
     *
     * @return {*}
     */
    render() {
      let result;
      
      if (this.type_target === 'object') {
        let target = this.target_tag;
        if (
          cbUtils.check_is_defined_obj(target, 'selector') &&
          cbUtils.check_is_defined_obj(target, 'type')
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
        if (cbUtils.check_is_defined(this.type_target)) {
          // let target1 = this.target_tag;
          let $target_selector1 = document.querySelector(this.target_tag);
          $target_selector1.innerHTML = this.data_html;
          result = 1;
        } else {
          result = this.data_html;
        }
      }
      
      return result;
    }
  }
  
  // Register cb.hgen to initialization class "HTML_generator"
  cb.hgen = function(data_json, target) {
    let htmlgen = new HTML_generator();
    return htmlgen.init(data_json, target);
  }
  
}));