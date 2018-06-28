define([
  "../core"
],
  function(cellbis) { //@START
  "use strict";
  
  let cbUtils = cellbis.utils;
  
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
        theme: 'w3css',
        theme_color: 'blue',
        pageSource: [],
        pageLabel: {
          prev: 'prev',
          next: 'next',
          first: 'first',
          last: 'last',
          sep: '...'
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
      this.type = cbUtils.check_is_defined_obj(cellbis.UI.paginationType, type)
      && typeof type === "string" ? type : 'standard';
      let API = cellbis.UI.paginationType[this.type](this.config_default, this.config_temp);
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
      (cbUtils.check_is_defined_obj(cellbis.UI.paginationType, name) !== -1)
        ? name : 'standard';
      this.reset();
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
      }
    }
    
    // Reset Config setting
    reset() {
      this.api = cellbis.UI.paginationType[this.type](this.config_default, this.config_temp).init();
    }
  }
  
  // Modification cellbis.UI.pagination
  cellbis.UI.pagination = function (...arg) {
    let initPagination = new Pagination();
    return initPagination.init(...arg);
  };
  
}); //@END