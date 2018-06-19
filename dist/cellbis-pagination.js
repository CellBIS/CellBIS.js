/*!
 * Filename : cellbis-pagination.min.js
 * Author: Achmad Yusri Afandi (yusrideb@cpan.org)
 * Date Create : 4/17/18 7:32 AM
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
  
  // A main class for "pageStandard" type pagination.
  class PageStandard {
    constructor(config_default, config_temp) {
      this.target = '';
      this.config = {};
      this.config_default = config_default;
      this.config_temp = config_temp;
      
      this.html_template = {
        wrap: '<div class="w3-container w3-show-inline-block w3-round"{{attr}}>{{value}}</div>',
        normal: '<button class="w3-bar-item cb-button cb-btn-biru"{{attr}}>{{value}}</button>',
        active: '<button class="w3-bar-item cb-button cb-btn-biru active"{{attr}}>{{value}}</button>',
        sep: '<button class="w3-bar-item cb-button cb-btn-biru"{{attr}}>{{value}}</button>',
        first: '<button class="w3-bar-item cb-button cb-btn-biru"{{attr}}>{{value}}</button>',
        last: '<button class="w3-bar-item cb-button cb-btn-biru"{{attr}}>{{value}}</button>',
        prev: '<button class="w3-bar-item cb-button cb-btn-biru"{{attr}}>{{value}}</button>',
        next: '<button class="w3-bar-item cb-button cb-btn-biru"{{attr}}>{{value}}</button>',
      };
      this.after_decision = 0;
      this.result = {
        object: {},
        array: [],
        html: ''
      };
    }
    
    // For Prepare configuration
    prepare() {
      let dataSource = [], dataSize = 1;
      
      // First Page
      this.config['pageFirst'] = 1;
      
      // For Last Page
      if (cbUtils.check_is_defined_obj(this.config, 'pageSource') && this.config['pageSource'].length !== 0) {
        dataSource = this.config['pageSource'];
        dataSize = dataSource.length;
      }
      
      // Page Size :
      let pageSize = Math.ceil(dataSize / this.config['pageSize']);
      
      // Last Page
      this.config['pageLast'] = pageSize;
      this.config['pageAmount'] = pageSize;
    };
    
    // For Initialization pagination type "standard"
    init() {
      let default_config = this.config_default;
      let temp_config = this.config_temp;
      
      this.config['pageSource'] =                                     // for config "pageSource"
        cbUtils.check_is_defined_obj(temp_config, 'pageSource')       // Expression 1
        && typeof temp_config['pageSource'] === "object"              // Expression 2
        && Array.isArray(temp_config['pageSource'])                   // Expression 3
          ? temp_config['pageSource'] :                               // True Condition
          default_config['pageSource'];                               // False Condition
      
      this.config['pageLabel'] =                                      // for config "pageLabel"
        cbUtils.check_is_defined_obj(temp_config, 'pageLabel')        // Expression
          ? temp_config['pageLabel'] :                                // True Condition
          default_config['pageLabel'];                                // False Condition
      
      this.config['pageFunc'] =                                       // for config "pageFunc"
        cbUtils.check_is_defined_obj(temp_config, 'pageFunc')         // Expression
          ? temp_config['pageFunc'] :                                 // True Condition
          default_config['pageFunc'];                                 // False Condition
      
      this.config['pageDisplay'] =                                    // for config "pageDisplay"
        cbUtils.check_is_defined_obj(temp_config, 'pageDisplay') &&   // Expression 1
        typeof temp_config['pageDisplay'] === "number" ?            // Expression 2
          temp_config['pageDisplay'] :                                // True Condition
          default_config['pageDisplay']                               // False Condition
      
      this.config['pageSize'] =                                       // for config "pageSize"
        cbUtils.check_is_defined_obj(temp_config, 'pageSize')         // Expression 1
        && typeof temp_config['pageSize'] === "number"                // Expression 2
        && temp_config['pageSource'].length !== 0                     // Expression 3
          ? temp_config['pageSize'] :                                 // True Condition
          default_config['pageSize'];                                 // False Condition
      
      this.config['method'] =                                         // for config "method"
        cbUtils.check_is_defined_obj(temp_config, 'method')           // Expression 1
        && typeof temp_config['method'] === "object"                  // Expression 2
          ? temp_config['method'] :                                   // True Condition
          default_config['method'];                                   // False Condition
      
      this.config['pageActive'] =                                     // for config "pageActive"
        cbUtils.check_is_defined_obj(temp_config, 'pageActive')       // Expression
          ? temp_config['pageActive'] :                               // True Condition
          default_config['pageActive'];                               // False Condition
      
      // For "first, last page & amount page"
      this.prepare();
      
      // For get size of page source :
      return this;
    }
    
    check_page() {
      let amount_page = this.config['pageAmount'];
      let pageActive = this.config['pageActive'];
      let defaultPage_display = this.config['pageDisplay'] % 2 === 0 ?
        this.config['pageDisplay'] - 1 : this.config['pageDisplay'];
      let defaultFirstLastPage_display = defaultPage_display + 2;
      let defaultLastPage_display = defaultPage_display + 2; // EXPERIMENTAL
      let minPage_amount = defaultFirstLastPage_display + 5; // EXPERIMENTAL
      
      let midPage_display = defaultPage_display; // EXPERIMENTAL
      
      let minFirstPage = 1; // EXPERIMENTAL
      let maxFirstPage = defaultPage_display; // EXPERIMENTAL
      
      let minMidPage = defaultPage_display - 1;
      let maxMidPage = amount_page - (defaultPage_display + 1);
      
      let minLastPage = amount_page - (defaultPage_display + 1);
      let maxLastPage = amount_page;
      let minLastPageDisp = amount_page - (defaultFirstLastPage_display - 1);
      let maxLastPageDisp = (defaultPage_display - 1) / 2;
      
      // To check minimal amount of page.
      let check_amountPage = amount_page >= (defaultPage_display + 7) ? 1 : undefined;
      
      // To Check and Get Page Number Position
      let page_position = {
        first() {
          return {
            type: 'first',
            active: pageActive,
            data: Array(defaultFirstLastPage_display)             // Amount of key array to generate
              .fill(0)                                            // Set fill of key array = 0
              .map((elem,i) => i + 1)                             //   To prop value start = 1
          }
        },
        mid() {
          return {
            type: 'mid',
            active: pageActive,
            data: Array(defaultPage_display)                      // Amount of key array to generate
              .fill(0)                                            // Set fill of key array = 0
              .map((elem, i) => i + pageActive-maxLastPageDisp)   //   To prop value start = (maxMid_page + 1)
            
          }
        },
        last() {
          return {
            type: 'last',
            active: pageActive,
            data: Array(defaultFirstLastPage_display)             // Amount of key array to generate
              .fill(0)                                            // Set fill of key array = 0
              .map((elem, i) => i + minLastPageDisp)              //   To prop value start = (minLast_page + 1)
          }
        },
        minimal() {
          return {
            type: 'minimal',
            active: pageActive,
            data: Array(amount_page)                           // Amount of key array to generate
              .fill(0)                                         // Set fill of key array = 0
              .map((elem,i) => i + 1)                          //   To prop value start = 1
          }
        },
        default_page() {
          return {
            type: 'default-page',
            active: pageActive,
            data: Array(5)                                       // Amount of key array to generate
              .fill(0)                                           // Set fill of key array = 0
              .map((elem,i) => i + 1)                            //   To prop value start = 1
          }
        }
      };
      
      let check_page_position = {
        non_minimal() { return amount_page >= 10 && pageActive <= amount_page ? 1 : undefined },
        minimal() { return amount_page <= (defaultPage_display + 2) },
        first() { return pageActive <= (defaultFirstLastPage_display - 2) },
        mid() { return pageActive >= minMidPage && pageActive <= maxMidPage },
        last() { return pageActive >= minLastPage && pageActive <= maxLastPage },
      };
      
      let result = page_position.default_page();
      if (check_amountPage !== undefined) {
        
        // To check position of page display, if minimal
        if (check_page_position.minimal()) {
          result = page_position.minimal();
        }
        
        // To check position of page display, if not minimal
        else {
          // To check position of page display, if first display
          if (check_page_position.non_minimal() && check_page_position.first()) {
            result = page_position.first()
          }
          
          // To check position of page display, if mid display
          if (check_page_position.non_minimal() && !check_page_position.first() && check_page_position.mid()) {
            result = page_position.mid()
          }
          
          // To check position of page display, if last display
          if (check_page_position.non_minimal() && !check_page_position.first() && !check_page_position.mid()) {
            result = page_position.last()
          }
        }
        
      } else {
        result = page_position.minimal()
      }
      return result;
    }
    
    // For set config
    set_config(config) {
      let indicator = ['pageSource', 'pageLabel', 'pageFunc', 'method', 'pageDisplay', 'pageSize', 'pageActive'];
      this.config = cbUtils.check_is_defined(config) && typeof config === "object" ?
        cb.combine.object(this.config, config, indicator) : this.config
    }
    
    /** Function for set config */
    set_template(...args) {
      if (args.length >= 8) {
        this.html_template = {
          wrap: cbUtils.check_is_defined(args[0]) ? args[0] : this.html_template.wrap,
          active: cbUtils.check_is_defined(args[1]) ? args[1] : this.html_template.active,
          normal: cbUtils.check_is_defined(args[2]) ? args[2] : this.html_template.normal,
          sep: cbUtils.check_is_defined(args[3]) ? args[3] : this.html_template.sep,
          first: cbUtils.check_is_defined(args[4]) ? args[4] : this.html_template.first,
          last: cbUtils.check_is_defined(args[5]) ? args[5] : this.html_template.last,
          prev: cbUtils.check_is_defined(args[6]) ? args[6] : this.html_template.prev,
          next: cbUtils.check_is_defined(args[7]) ? args[7] : this.html_template.next,
        };
      }
      if (args.length === 1 && typeof args[0] === "object") {
        let indicator = ['wrap','active','normal','sep','first','last','prev','next'];
        this.html_template = cb.combine.object(this.html_template, args[0], indicator);
      }
      return this;
    }
    set_pageActive(activePage) {
      this.config['pageActive'] = cbUtils.check_is_defined(activePage) && activePage !== 0 ?
        activePage : this.config['pageActive'];
    }
    set_pageSize(pageSize) {
      this.config['pageSize'] = cbUtils.check_is_defined(pageSize) && pageSize !== 0 ?
        pageSize : this.config['pageSize'];
    }
    set_pageFunc(func) {
      this.config['pageFunc'] = cbUtils.check_is_defined(func) && func !== 0 ?
        func : this.config['pageFunc'];
    }
    set_method() {}
    
    decision() {
      this.result.object = this.check_page();
      let funcPage = this.config['pageFunc']; // EXPERIMENTAL
      let data_array = this.result.object['data']; // EXPERIMENTAL
      
      
      this.result.array = this.result.object['data'];
      this.after_decision = 1;
      return this;
    }
    
    render(dataType) {
      return (
        this.after_decision === 1 &&
        cbUtils.check_is_defined(dataType) &&
        (dataType === 'html' || dataType === 'object' || dataType === 'array')
      ) ? this['_data_to_'+dataType]() : undefined
    }
    
    _render_html(template_state, value, attribute) {
      let result = '';
      if (cbUtils.check_is_defined(template_state)) {
        switch(template_state) {
          case 1: result = this.html_template.active; break;
          case 2: result = this.html_template.wrap; break;
          case 3: result = this.html_template.sep; break;
          case 4: result = this.html_template.first; break;
          case 5: result = this.html_template.last; break;
          case 6: result = this.html_template.prev; break;
          case 7: result = this.html_template.next; break;
          default: result = this.html_template.normal; break;
        }
      } else {
        result = this.html_template.normal
      }
      let attr = cbUtils.check_is_defined(attribute) && attribute !== '' ? attribute : '';
      
      let valueData = cbUtils.check_is_defined(value) ? value : '';
      
      let pattern = /([{|\s]+)value([\s|}]+)/gi;
      result = result.replace(pattern, valueData);
      return result.replace(/([{|\s]+)attr([\s|}]+)/gi, attr);
    }
    
    // For Page functionality "First, Last, Prev, & Next"
    _for_pageFunc(type, data_html) {
      let data = '';
      
      // For Labels
      let label_separator = this.config['pageFunc'].sep ? this.config['pageLabel'].sep : '';
      let label_pagePrev = this.config['pageLabel'].prev === 'prev' ? 'Prev' :
        (this.config['pageLabel'].prev === 'sym' ? "&laquo;" : 'Prev');
      let label_pageNext = this.config['pageLabel'].next === 'next' ? 'Next' :
        (this.config['pageLabel'].next === 'sym' ? "&raquo;" : 'Next');
      let label_pageFirst = this.config['pageLabel'].first === 'first' ? 'First' : this.config['pageFirst'];
      let label_pageLast = this.config['pageLabel'].last === 'last' ? 'Last' : this.config['pageLast'];
      
      // For tag attributes
      let sep_attr = 'cb-action="pagination" cb-data="separator" cb-state="disabled" disabled';
      let first_attr = 'cb-action="pagination" cb-data="first" cb-state="'+(this.config['pageFirst']-1)+'"';
      let last_attr = 'cb-action="pagination" cb-data="last" cb-state="'+(this.config['pageLast']+1)+'"';
      let prev_attr = 'cb-action="pagination" cb-data="prev" cb-state="'+(this.config['pageActive']-1)+'"';
      let next_attr = 'cb-action="pagination" cb-data="next" cb-state="'+(this.config['pageActive']+1)+'"';
      
      // Data array manipulation for "first" condition
      if (type === "first") {
        // if (this.config['pageFunc'].last) data_array.push('...', label_pageLast);
        // if (this.config['pageFunc'].next) data_array.push(label_pageNext);
        data += data_html;
        data += this.config['pageFunc'].sep ? this._render_html(3, label_separator, sep_attr) : '';
        data += this._render_html(0, label_pageLast);
        if (this.config['pageFunc'].next) data += this._render_html(7, label_pageNext, next_attr);
      }
      // Data array manipulation for "mid" condition
      if (type === "mid") {
        if (this.config['pageFunc'].prev) data += this._render_html(6, label_pagePrev, prev_attr);
        if (this.config['pageFunc'].first) data += this._render_html(4, label_pageFirst, first_attr);
        if ((this.config['pageFunc'].prev || this.config['pageFunc'].first) && this.config['pageFunc'].sep)
          data += this._render_html(3, label_separator, sep_attr);
        data += data_html;
        if ((this.config['pageFunc'].last || this.config['pageFunc'].next) && this.config['pageFunc'].sep)
          data += this._render_html(3, label_separator, sep_attr);
        if (this.config['pageFunc'].last) data += this._render_html(5, label_pageLast, last_attr);
        if (this.config['pageFunc'].next) data += this._render_html(7, label_pageNext, next_attr);
      }
      // Data array manipulation for "last" condition
      if (type === "last") {
        if (this.config['pageFunc'].prev) data += this._render_html(6, label_pagePrev, prev_attr);
        if (this.config['pageFunc'].first) data += this._render_html(4, label_pageFirst, first_attr);
        if ((this.config['pageFunc'].last || this.config['pageFunc'].next) && this.config['pageFunc'].sep)
          data += this._render_html(3, label_separator, sep_attr);
        data += data_html;
      }
      return data;
    }
    
    // For get data
    _data_to_html() {
      let self = this;
      let _check = self.result.object;
      _check['active'] = _check['type'] === 'default-page' ? 1 : _check['active'];
      let data_array = _check['data'];
      
      // For Render to HTML
      let data_html = '';
      data_array.forEach(function(value) {
        data_html += value ===_check['active'] ?
          self._render_html(1, value) :
          self._render_html(0, value);
      });
      let result_html = this._for_pageFunc(_check['type'], data_html);
      this.result.html = self._render_html(2, result_html);
      if (self.target !== '' && document.getElementById(self.target)) {
        document.getElementById(self.target).innerHTML = self.result.html
      } else {
        return self.result.html
      }
    }
    _data_to_object() { return this.result.object }
    _data_to_array() { return this.result.array }
  }
  
  // For Add Type Pagination
  cb.union.object(cb.UI.paginationType, {
    standard: function (config_default, config_temp) {
      return new PageStandard(config_default, config_temp);
    }
  });
  
}));

// Main function for "cb.pagination".
(function () {
  "use strict";
  
  let cbUtils = cb.utils;
  
  // For Main Pagination Class
  class Pagination {
    
    // Constructor
    constructor() {
      this.target = '';
      this.config = {};
      this.config_default = {};
      this.config_temp = {};
      
      this.type = 'standard';
      this.page_func = 0;
      
      // For current condition :
      this.api = {};
    }
    
    // For Initialization :
    init(...args) {
      let target, type, config;
      
      this.config_default = {
        pageSource: [],
        pageLabel: {
          prev: 'prev',
          next: 'next',
          first: 'first',
          last: 'last'
        },
        pageFunc: {
          prev: true,
          next: true,
          first: true,
          last: true,
          sep: true
        },
        pageDisplay: 3,
        pageSize: 1,
        method: {},
        pageActive: 1
      };
      
      switch (args.length) {
        default:
        case 0:
          target = '';
          type = 'standard';
          config = this.config_default;
          break;
        case 1:
          target = '';
          type = 'standard';
          config = typeof args[0] === "object" && args[0] !== {} ? args[0] : this.config_default;
          break;
        case 2:
          target = args[0];
          type = args[1];
          config = this.config_default;
          break;
        case 3:
          target = args[0];
          type = args[1];
          config = args[2];
          break;
      }
      
      this.target = target;
      this.config_temp = config;
      this.type = cbUtils.check_is_defined_obj(cb.UI.paginationType, type)
      && typeof type === "string" ? type : 'standard';
      let API = cb.UI.paginationType[this.type](this.config_default, this.config_temp);
      this.api = API.init();
      
      return this;
    }
    
    // For API Re-Init
    api_reinit() { this.api = this.api.init(); }
    
    /** Function for set config */
    set_target(target) { // For set target DOM
      this.target = cbUtils.check_is_defined(target) && target !== '' ? target : ''
    }
    set_type(name) { // For set type
      this.type = cbUtils.check_is_defined(name) &&
      typeof name === "string" &&
      (cbUtils.check_is_defined_obj(cb.UI.paginationType, name) !== -1)
        ? name : 'standard';
      this.api_update();
      return this;
    }
    
    // Execute Pagination API
    execute() {
      let API = this.api;
      // API.init();
      
      // Several config settings
      API.target = this.target;
      API.decision();
      this.config = API.config;
      
      // For check method "execute"
      if (cbUtils.check_is_defined_obj(this.config.method, 'execute')
        && typeof this.config.method.execute === "function") {
        this.config.method.execute(API);
        // console.log(this.config.method);
      } else {
        API.render('html');
        // console.log(API.config);
      }
    }
    
    // Reset Config setting
    reset() {
      this.api = cb.UI.paginationType[this.type](this.config_default, this.config_temp).init();
    }
  }
  
  // Modification cb.UI.pagination
  cb.UI.pagination = function (...arg) {
    let initPagination = new Pagination();
    return initPagination.init(...arg);
  };
  
})();
