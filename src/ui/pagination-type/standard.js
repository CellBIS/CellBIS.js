define([
  "../core"
],
  function(cellbis) { //@START
  
  "use strict";
  
  let cbUtils = cellbis.utils;
  
  // A main class for "pageStandard" type pagination.
  class PageStandard {
    constructor(config_default, config_temp) {
      this.target = '';
      this.config = {};
      this.config_default = config_default;
      this.config_temp = config_temp;
      
      this.set_method = {};
      this.theme = {
        w3css: {
          color: {
            red: 'cb-btn-merah',
            blue: 'cb-btn-biru',
            aqua: 'cb-btn-aqua',
            green: 'cb-btn-hijau',
            orange: 'cb-btn-jingga',
            violet: 'cb-btn-ungu'
          },
          template: {
            wrap: '<div class="w3-container w3-show-inline-block w3-round"{{attr}}>{{value}}</div>',
            normal: '<button class="cb-button {{color}}"{{attr}}>{{value}}</button>',
            active: '<button class="cb-button {{color}} active"{{attr}}>{{value}}</button>',
            sep: '<button class="cb-button {{color}}"{{attr}}>{{value}}</button>',
            first: '<button class="cb-button {{color}}"{{attr}}>{{value}}</button>',
            last: '<button class="cb-button {{color}}"{{attr}}>{{value}}</button>',
            prev: '<button class="cb-button {{color}}"{{attr}}>{{value}}</button>',
            next: '<button class="cb-button {{color}}"{{attr}}>{{value}}</button>',
          }
        }
      };
      this.template_color = this.theme.w3css.color.blue;
      this.template = this.theme.w3css.template;
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
      
      this.config['theme'] =
        cbUtils.check_is_defined_obj(temp_config, 'theme')
        && typeof temp_config['theme'] === "object"
        && Array.isArray(temp_config['theme'])
          ? temp_config['theme'] :
          default_config['theme'];
      
      this.config['theme_color'] =
        cbUtils.check_is_defined_obj(temp_config, 'theme_color')
        && typeof temp_config['theme_color'] === "object"
        && Array.isArray(temp_config['theme_color'])
          ? temp_config['theme_color'] :
          default_config['theme_color'];
      
      this.config['pageSource'] =
        cbUtils.check_is_defined_obj(temp_config, 'pageSource')
        && typeof temp_config['pageSource'] === "object"
        && Array.isArray(temp_config['pageSource'])
          ? temp_config['pageSource'] :
          default_config['pageSource'];
      
      this.config['pageLabel'] =
        cbUtils.check_is_defined_obj(temp_config, 'pageLabel')
          ? temp_config['pageLabel'] :
          default_config['pageLabel'];
      
      this.config['pageFunc'] =
        cbUtils.check_is_defined_obj(temp_config, 'pageFunc')
          ? temp_config['pageFunc'] :
          default_config['pageFunc'];
      
      this.config['pageDisplay'] =
        cbUtils.check_is_defined_obj(temp_config, 'pageDisplay') &&
        typeof temp_config['pageDisplay'] === "number" ?
          temp_config['pageDisplay'] :
          default_config['pageDisplay'];
      
      this.config['pageSize'] =
        cbUtils.check_is_defined_obj(temp_config, 'pageSize')
        && typeof temp_config['pageSize'] === "number"
        && temp_config['pageSource'].length !== 0
          ? temp_config['pageSize'] :
          default_config['pageSize'];
      
      this.config['method'] =
        cbUtils.check_is_defined_obj(temp_config, 'method')
        && typeof temp_config['method'] === "object"
          ? temp_config['method'] :
          default_config['method'];
      
      this.config['pageActive'] =
        cbUtils.check_is_defined_obj(temp_config, 'pageActive')
          ? temp_config['pageActive'] :
          default_config['pageActive'];
      
      // For "first, last page & amount page"
      this.prepare();
      
      // Execute function for set method
      this._for_setMethod();
      
      // Set Template :
      let theme_name = this.config.theme;
      let theme_color = this.config.theme_color;
      this.template_color = this.theme[theme_name].color[theme_color];
      this.template       = this.theme[theme_name].template;
      
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
        cellbis.combine.object(this.config, config, indicator) : this.config;
    }
    
    // Add theme
    _template_check(template) {
      let indicator = ['wrap', 'normal', 'active', 'sep', 'first', 'last', 'prev', 'next'];
      return cellbis.combine.object(this.theme.w3css.template, template, indicator);
    }
    add_theme(name, color, template) {
      let new_theme = {};
      if (typeof name === "string" && typeof color === "object" && typeof template === "object") {
        new_theme[name] = name;
        new_theme[name].color = color;
        new_theme[name].template = this._template_check(template);
      }
      this.theme = cellbis.union.object(this.theme, new_theme);
    }
    
    /** Function for set config */
    set_theme_color(color) {
      let r_color = cbUtils.check_is_defined(color) && typeof color === 'string' ? color : 'blue';
      let theme_name = this.config.theme;
      this.template_color = this.theme[theme_name].color[color];
    }
    set_template(...args) {
      if (args.length >= 8) {
        this.template = {
          wrap: cbUtils.check_is_defined(args[0]) ? args[0] : this.template.wrap,
          active: cbUtils.check_is_defined(args[1]) ? args[1] : this.template.active,
          normal: cbUtils.check_is_defined(args[2]) ? args[2] : this.template.normal,
          sep: cbUtils.check_is_defined(args[3]) ? args[3] : this.template.sep,
          first: cbUtils.check_is_defined(args[4]) ? args[4] : this.template.first,
          last: cbUtils.check_is_defined(args[5]) ? args[5] : this.template.last,
          prev: cbUtils.check_is_defined(args[6]) ? args[6] : this.template.prev,
          next: cbUtils.check_is_defined(args[7]) ? args[7] : this.template.next,
        };
      }
      if (args.length === 1 && typeof args[0] === "object") {
        let indicator = ['wrap','active','normal','sep','first','last','prev','next'];
        this.template = cellbis.combine.object(this.template, args[0], indicator);
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
      this.prepare();
    }
    set_pageFunc(func) {
      this.config['pageFunc'] = cbUtils.check_is_defined(func) && func !== 0 ?
        func : this.config['pageFunc'];
    }
    
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
    
    _render_html(template_state, color, value, attribute) {
      let result = '';
      if (cbUtils.check_is_defined(template_state)) {
        switch(template_state) {
          case 1: result = this.template.active; break;
          case 2: result = this.template.wrap; break;
          case 3: result = this.template.sep; break;
          case 4: result = this.template.first; break;
          case 5: result = this.template.last; break;
          case 6: result = this.template.prev; break;
          case 7: result = this.template.next; break;
          default: result = this.template.normal; break;
        }
      } else {
        result = this.template.normal
      }
      let _color = cbUtils.check_is_defined(color) && color !== '' ? color : '';
      let attr = cbUtils.check_is_defined(attribute) && attribute !== '' ? attribute : '';
      let valueData = cbUtils.check_is_defined(value) ? value : '';
      
      let pattern = /([{|\s]+)value([\s|}]+)/gi;
      result = result.replace(pattern, valueData);
      result = result.replace(/([{]+)attr([}]+)/gi, attr);
      return result.replace(/([{]+)color([}]+)/gi, _color);
    }
    
    // For set method configure
    _for_setMethod() {
      this.set_method = {
        execute(func) {
          this.config['method'].execute = cbUtils.check_is_defined(func) && typeof func === "function" ?
            func : this.config['method'].execute
        },
        callback(func) {
          this.config['method'].callback = cbUtils.check_is_defined(func) && typeof func === "function" ?
            func : this.config['method'].callback
        },
        action() {
          this.config['method'].action = cbUtils.check_is_defined(func) && typeof func === "function" ?
            func : this.config['method'].action
        }
      }
    }
    
    // For Page functionality "First, Last, Prev, & Next"
    _for_pageFunc(type, data_html) {
      let data = '';
      let color = this.template_color;
      
      // For Labels
      let label_separator = this.config['pageFunc'].sep ? this.config['pageLabel'].sep : '...';
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
        data += this.config['pageFunc'].sep ? this._render_html(3, color, label_separator, sep_attr) : '';
        data += this._render_html(0, color, label_pageLast, last_attr);
        if (this.config['pageFunc'].next) data += this._render_html(7, color, label_pageNext, next_attr);
      }
      // Data array manipulation for "mid" condition
      if (type === "mid") {
        if (this.config['pageFunc'].prev) data += this._render_html(6, color, label_pagePrev, prev_attr);
        if (this.config['pageFunc'].first) data += this._render_html(4, color, label_pageFirst, first_attr);
        if ((this.config['pageFunc'].prev || this.config['pageFunc'].first) && this.config['pageFunc'].sep)
          data += this._render_html(3, color, label_separator, sep_attr);
        data += data_html;
        if ((this.config['pageFunc'].last || this.config['pageFunc'].next) && this.config['pageFunc'].sep)
          data += this._render_html(3, color, label_separator, sep_attr);
        if (this.config['pageFunc'].last) data += this._render_html(5, color, label_pageLast, last_attr);
        if (this.config['pageFunc'].next) data += this._render_html(7, color, label_pageNext, next_attr);
      }
      // Data array manipulation for "last" condition
      if (type === "last") {
        if (this.config['pageFunc'].prev) data += this._render_html(6, color, label_pagePrev, prev_attr);
        if (this.config['pageFunc'].first) data += this._render_html(4, color, label_pageFirst, first_attr);
        if ((this.config['pageFunc'].last || this.config['pageFunc'].next) && this.config['pageFunc'].sep)
          data += this._render_html(3, color, label_separator, sep_attr);
        data += data_html;
      }
      return data;
    }
    
    // For get data
    _data_to_html() {
      let self = this;
      let _check = self.result.object;
      let color = this.template_color;
      _check['active'] = _check['type'] === 'default-page' ? 1 : _check['active'];
      let data_array = _check['data'];
      
      // For Render to HTML
      let data_html = '';
      data_array.forEach(function(value) {
        
        // For Tag Attribute :
        let attribute = 'cb-action="pagination" cb-data="next" cb-state="'+(value)+'"';
        
        data_html += value === _check['active'] ?
          self._render_html(1, color, value, attribute) :
          self._render_html(0, color, value, attribute);
      });
      let result_html = this._for_pageFunc(_check['type'], data_html);
      this.result.html = self._render_html(2, color, result_html);
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
  cellbis.union.object(cellbis.UI.paginationType, {
    standard: function (config_default, config_temp) {
      return new PageStandard(config_default, config_temp);
    }
  });
  
}); //@END