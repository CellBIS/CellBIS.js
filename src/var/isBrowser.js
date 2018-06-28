/*! 
 * Filename : isBrowser.js
 * Author: Achmad Yusri Afandi (yusrideb@cpan.org)
 * Date Create : 6/29/18 5:07 AM
 *
 * Copyright Achmad Yusri Afandi (yusrideb@cpan.org)
 * Released under the Artistic License 2.0
 *
 */
define(function() {
  
  return typeof window !== 'undefined'
    && ({}).toString.call(window) === '[object Window]';
});