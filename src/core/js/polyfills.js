// -----------------------------------------------------------------------------
//  POLYFILLS
// -----------------------------------------------------------------------------
//
//  All used polyfills from the package.json must be saved here.
//
//  The POLYFILLS object is a global point where the all polyfills
//  are saved. It helps to understand what polyfills are really used,
//  what are not used, but listed in the package.json, and allows to
//  "turn-on" and "turn-off" polyfills in the whole project by commenting
//  only one line of code.


// We disable ESLint for this file. We use different "require" and "import"
// statements here and usually it shows a lot of errors.

/* eslint-disable */


// https://github.com/bfred-it/object-fit-images
//
// There is a css class for this polyfill.
// Take a look at src/core/less/helpers.less for more information.
import objectFit from 'object-fit-images';



// -----------------------------------------------------------------------------


const POLYFILLS = {
    objectFit,
};


export default POLYFILLS;


/* eslint-enable */

