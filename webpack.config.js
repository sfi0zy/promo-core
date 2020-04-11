// -----------------------------------------------------------------------------
//  CONFIG: WEBPACK
// -----------------------------------------------------------------------------
//
//  We use webpack for scripts only. This is not a popular choice, usually
//  people use it to pack everything in one bundle, but we use the old-school
//  approach where HTML, CSS and JS are separated, so we don't need to put
//  them all in the one box.
//
//  See https://webpack.js.org/ for more information.
//


const webpack = require('webpack');

const fs  = require('fs');

const pkg = JSON.parse(fs.readFileSync('./package.json'));



module.exports = {

    // -------------------------------------------------------------------------
    //  Development
    // -------------------------------------------------------------------------

    development: {
        mode: 'development',
        devtool: 'eval',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-proposal-class-properties']
                        }
                    }
                }
            ]
        },
        plugins: [
            // These are not a "real" variables, they are defines like in C++.
            // We can use them in all client-size scripts. They'll be replaced
            // during the build process.
            new webpack.DefinePlugin({
                __PROJECT__:           JSON.stringify(pkg.name),
                __PROJECT_VERSION__:   JSON.stringify(pkg.version),
                __DEBUG__:             true,
                __GLOBAL_CSS_PREFIX__: '"ui-"'
            })
        ]
    },


    // -------------------------------------------------------------------------
    //  Production
    // -------------------------------------------------------------------------

    production: {
        mode: 'production',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-proposal-class-properties']
                        }
                    }
                }
            ]
        },
        plugins: [
            // These are not a "real" variables, they are defines like in C++.
            // We can use them in all client-size scripts. They'll be replaced
            // during the build process.
            new webpack.DefinePlugin({
                __PROJECT__:           JSON.stringify(pkg.name),
                __PROJECT_VERSION__:   JSON.stringify(pkg.version),
                __DEBUG__:             false,
                __GLOBAL_CSS_PREFIX__: '"ui-"'
            })
        ]
    }
};

