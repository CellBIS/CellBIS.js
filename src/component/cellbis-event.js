/*! 
 * Filename : cellbis-event.js
 * Author: Achmad Yusri Afandi (yusrideb@cpan.org)
 * Date Create : 6/22/18 7:27 PM
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

}));