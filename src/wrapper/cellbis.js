/*!
 * CellBIS JavaScript Library v@VERSION
 * Date Create : 08 January 2018 11:15 AM
 * Date Build : Date: @DATE
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
  
  // @PLACE_CODE
  
  return cellbis;
});