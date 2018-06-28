/*! 
 * Filename : isBrowser.js
 * Author: Achmad Yusri Afandi (yusrideb@cpan.org)
 * Date Create : 6/29/18 5:07 AM
 */
define(function() {
  
  return typeof window !== 'undefined'
    && ({}).toString.call(window) === '[object Window]';
});