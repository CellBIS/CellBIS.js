/*!
 * Filename : cellbis-pagination.min.js
 * Author: Achmad Yusri Afandi (yusrideb@cpan.org)
 * Date Create : 4/17/18 7:32 AM
 *
 * Copyright Achmad Yusri Afandi (yusrideb@cpan.org)
 * Released under the Artistic License 2.0
 *
 */

/**
 * Uses CommonJS, AMD or browser globals to create a CellBIS.js Plugin.
 * This transplantation from UMD jqueryPlugin Template :
 * https://github.com/umdjs/umd/blob/master/templates/jqueryPlugin.js
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    
    // AMD. Register as an anonymous module.
    define(['cellbis'], factory);
  } else if (typeof module === 'object' && module.exports) {
    
    // Node/CommonJS
    module.exports = function( root, cellbis ) {
      if ( cellbis === undefined ) {
        // require('cellbis') returns a factory that requires window to
        // build a CellBIS.js instance, we normalize how we use modules
        // that require this pattern but the window provided is a noop
        // if it's defined (how cellbis works)
        if ( typeof window !== 'undefined' ) {
          cellbis = require('cellbis');
        }
        else {
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



}));