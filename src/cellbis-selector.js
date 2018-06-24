/*! 
 * Filename : cellbis-selector.js
 * Author: Achmad Yusri Afandi (yusrideb@cpan.org)
 * Date Create : 6/23/18 3:22 PM
 */

(function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( ['cellbisS'], factory );
  } else if ( typeof module === 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('cellbisS')
    );
  } else {
    // browser global
    global.cellbisS = factory(
      global.cellbis,
      global.cellbisS
    );
    global.cbS = cellbisS;
  }
  
}( this, function factory( cellbis, cellbiss ) {
  
  
  
  return cellbiss;
}));
