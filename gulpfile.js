// -----------------------------------------------------------------------------
//  GULPFILE
// -----------------------------------------------------------------------------
//
//  All steps of the building process are here.
//



const gulp         = require('gulp');
const $            = require('gulp-load-plugins')();
const fs           = require('fs');
const path         = require('path');
const argv         = require('yargs').argv;
const semver       = require('semver');
const webpack      = require('webpack-stream');
const critical     = require('critical').stream;
const browserSync  = require('browser-sync').create();

const dss             = require('./gulp-plugins/gulp-dss.js');
const SVGPlaceholders = require('./gulp-plugins/gulp-svg-placeholders');
const validate        = require('./gulp-plugins/gulp-w3c-validate');


require('colors');


const pkg         = JSON.parse(fs.readFileSync('./package.json'));
const ENVIRONMENT = argv.production ? 'production' : 'development';



// -----------------------------------------------------------------------------
//  INFORMATION ABOUT THIS PROJECT
// -----------------------------------------------------------------------------
//
//  The process begins with displaying information about the current project.
//  This is a very good idea, because the log includes a lot of information
//  which helps us to understand where can be a problem if the build fails.
//  Also, the build log can be used in conversations and no needed to describe
//  what project we are talking about, what versions of dependencies are used etc.
//


// Current time
console.log(`${(new Date()).toString().white}\n`);

// Node.js version
if (semver.satisfies(process.version, pkg.engines.node)) {
    console.log('Node %s (recommended %s)\n'.green, process.version, pkg.engines.node);
} else {
    console.log('(!) Node %s (recommended %s)\n'.red, process.version, pkg.engines.node);
}

// Console command that starts the gulp
console.log(`> ${argv.$0} ${argv._}`);

// Current environment
console.log(ENVIRONMENT.toUpperCase().yellow);

// Version of this package
console.log(`${pkg.name.red} ${pkg.version.green}\n`);

// Target browsers
console.log('%s\n'.blue, pkg.browserslist);




// -----------------------------------------------------------------------------
//  LIST AND SAVE THE DEPENDENCIES
// -----------------------------------------------------------------------------
//
// Sometimes we want to know the real versions of the main dependencies in
// the project. Package-lock file is not human-friendly, so we save the current
// versions of the dependencies right in the package.json. We'll must update
// them manually in the future, but the most of promotional projects
// don't require long-term support. So we can freeze the dependencies and
// never update them.
//


console.log('DEPENDENCIES:');

Object.keys(pkg.dependencies).forEach((dependency) => {
    const depPackage = JSON.parse(
        fs.readFileSync(
            path.join('node_modules', dependency, 'package.json'), 'utf-8'));

    if (depPackage._requested.registry) {
        pkg.dependencies[dependency] = depPackage.version;
        console.log('NPM %s@%s'.green, dependency, depPackage.version);
    } else {
        pkg.dependencies[dependency] = depPackage._resolved;
        console.log('--- %s@%s'.green, dependency, depPackage._resolved);
    }
});


console.log('\nDEV DEPENDENCIES:');

Object.keys(pkg.devDependencies).forEach((dependency) => {
    const depPackage = JSON.parse(
        fs.readFileSync(
            path.join('node_modules', dependency, 'package.json'), 'utf-8'));

    if (depPackage._requested.registry) {
        pkg.devDependencies[dependency] = depPackage.version;
        console.log('NPM %s@%s'.green, dependency, depPackage.version);
    } else {
        pkg.devDependencies[dependency] = depPackage._resolved;
        console.log('--- %s@%s'.green, dependency, depPackage._resolved);
    }
});


const newPackageJSON = JSON.stringify(pkg, null, 2);

fs.writeFileSync(path.join('package.json'), newPackageJSON, 'utf-8');

console.log('\n\n\n');




// -----------------------------------------------------------------------------
//  GULP TASKS
// -----------------------------------------------------------------------------
//
//  We prefer to use the small tasks for the different logical actions.
//



// -----------------------------------------------------------------------------
//  ACTIONS
// -----------------------------------------------------------------------------


gulp.task('promo-core:clean-dist', () => {
    return gulp.src('./dist/*', { read: false })
        .pipe($.clean());
});



gulp.task('promo-core:lint-js', () => {
    return gulp.src('./src/**/*.js')
        .pipe($.eslint())
        .pipe($.eslint.format());
});



gulp.task('promo-core:compile-js', () => {
    return gulp.src('./src/main.js')
        .pipe(webpack(require('./webpack.config.js')[ENVIRONMENT]))
        .pipe($.rename('main.min.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});



gulp.task('promo-core:lint-less', () => {
    return gulp.src('./src/**/*.less')
        .pipe($.stylelint({
            failAfterError: false,
            reporters: [
                { formatter: 'string', console: true }
            ]
        }));
});


gulp.task('promo-core:compile-less', () => {
    return gulp.src('./src/main.less')
        .pipe($.if(ENVIRONMENT === 'development', $.sourcemaps.init()))
        .pipe($.less())
        .pipe($.postcss())
        .pipe($.if(ENVIRONMENT === 'development', $.sourcemaps.write()))
        .pipe($.rename('main.min.css'))
        .pipe($.size({ showFiles: true }))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});



gulp.task('promo-core:generate-favicon', (done) => {
    $.realFavicon.generateFavicon(
        require('./favicon.config.js'), () => {
            done();
        }
    );
});



gulp.task('promo-core:copy-images', () => {
    return gulp.src('src/images/*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.stream());
});



gulp.task('promo-core:generate-placeholders', () => {
    return gulp.src('dist/images/*.jpg')
        .pipe(SVGPlaceholders())
        .pipe(gulp.dest('./dist/images'));
});



gulp.task('promo-core:build-pages', () => {
    return gulp.src('src/pages/*.pug')
        .pipe($.pug({
            locals: {
                pkg,
            },
            pretty: true
        }))
        .pipe($.realFavicon.injectFaviconMarkups(
            JSON.parse(fs.readFileSync('faviconData.json')).favicon.html_code))
        .pipe($.injectSvg())
        .pipe(critical(require('./critical.config.js')))
        .pipe(gulp.dest('./dist'))
        .pipe($.if(ENVIRONMENT === 'production', validate()))
        .pipe(browserSync.stream());
});



gulp.task('promo-core:build-docs', () => {
    return gulp.src('./src/ui-components/**/*.less')
        .pipe(dss({
            pkg,
            templatePath: './src/docs',
            parsers: require('./dss.parsers.js'),
            outputPath: './dist/docs/'
        }))
        .pipe($.injectSvg())
        .pipe(gulp.dest('./dist/docs/'))
        .pipe($.if(ENVIRONMENT === 'production', validate()))
        .pipe(browserSync.stream());
});



// -----------------------------------------------------------------------------
//  ALL ACTIONS TOGETHER
// -----------------------------------------------------------------------------
//
//  The order is important here. CSS must be generated before HTML, because
//  the critical CSS for HTML can't be obtained without CSS, SVG placeholders
//  must be created before docs and pages because we inline SVG right into the
//  pages and these images must be ready when we compile HTML, etc.
//

gulp.task('promo-core', gulp.series(
    'promo-core:clean-dist',
    'promo-core:lint-js',
    'promo-core:compile-js',
    'promo-core:lint-less',
    'promo-core:compile-less',
    'promo-core:generate-favicon',
    'promo-core:copy-images',
    'promo-core:generate-placeholders',
    'promo-core:build-pages',
    'promo-core:build-docs',
));



// -----------------------------------------------------------------------------
//  BROWSER SYNC
// -----------------------------------------------------------------------------

gulp.task('browser-sync', () => {
    browserSync.init({
        server: './dist',
        files: ['./src/**']
    });


    gulp.watch([
        './src/**/*.js',
    ], gulp.series('promo-core:compile-js'));


    gulp.watch([
        './src/**/*.less',
    ], gulp.series(
        'promo-core:lint-less',
        'promo-core:compile-less',
        'promo-core:build-docs'
    ));


    gulp.watch([
        './src/images/*'
    ], gulp.series(
        'promo-core:copy-images',
        'promo-core:generate-placeholders'
    ));


    gulp.watch([
        './src/pages/*.pug'
    ], gulp.series('promo-core:build-pages'));


    gulp.watch([
        './src/docs/*.pug'
    ], gulp.series('promo-core:build-docs'));
});



// -----------------------------------------------------------------------------
//  DEFAULT TASK
// -----------------------------------------------------------------------------

gulp.task('default', (done) => {
    switch (ENVIRONMENT) {
        case 'production': {
            gulp.series(
                'promo-core',
            )();

            break;
        }

        case 'development': {
            gulp.series(
                'promo-core',
                'browser-sync'
            )();

            break;
        }

        default: {
            break;
        }
    }

    done();
});

