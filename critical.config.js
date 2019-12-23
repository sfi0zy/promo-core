// -----------------------------------------------------------------------------
//  CONFIG: CRITICAL CSS
// -----------------------------------------------------------------------------
//
//  We use the "critical" npm module for extracting critical CSS.
//  See https://www.npmjs.com/package/critical for more options.
//


module.exports = {
    base: 'dist/',
    inline: true,
    minify: true,
    width: 1920,
    height: 1080,
    css: [
        'dist/main.min.css'
    ],
    ignore: ['@font-face', /url\(/]
};

