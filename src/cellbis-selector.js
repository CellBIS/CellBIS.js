/*! 
 * Filename : cellbis-selector.min.js
 * Author: Achmad Yusri Afandi (yusrideb@cpan.org)
 * Date Create : 6/23/18 3:22 PM
 *
 * Copyright Achmad Yusri Afandi (yusrideb@cpan.org)
 * Released under the Artistic License 2.0
 *
 */

(function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( ['cellbisQ'], factory );
  } else if ( typeof module === 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('cellbisQ')
    );
  } else {
    // browser global
    global.cellbisQ = factory(
      global.cellbis,
      global.cellbisQ
    );
    global.cbq = cellbisQ;
  }
  
}( this, function factory( cellbis, cellbisq ) {
  
  
  
  return cellbisq;
}));