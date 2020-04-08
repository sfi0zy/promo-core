// -----------------------------------------------------------------------------
//  CONFIG: DOIUSE
// -----------------------------------------------------------------------------
//
//  We use the "doiuse" npm module for displaying the information about
//  the CSS features we used, if the browsers don't support them yet.
//
//  See https://www.npmjs.com/package/doiuse for more options.
//


require('colors');


module.exports = {
    ignore: [
        'text-size-adjust', // Experimental thing. Missed in FF and Safari.
        'outline',          // Edge has partial support of it.
        'viewport-units',   // Edge doesn't support vmax.
        'object-fit',       // Edge doesn't support it. We use polyfill.
        'css-appearance',   // All browsers have partial support of this thing.
        'will-change',      // Edge doesn't support it.
    ],


    onFeatureUsage(info) {
        const selector = info.usage.parent.selector;
        const property = `${info.usage.prop}: ${info.usage.value}`;

        let status = info.featureData.caniuseData.status.toUpperCase();

        if (info.featureData.missing) {
            status = 'NOT SUPPORTED'.red;
        } else if (info.featureData.partial) {
            status = 'PARTIAL SUPPORT'.yellow;
        }

        console.log(`\n${status}:\n\n    ${selector} {\n        ${property};\n    }\n`);
    }
};

