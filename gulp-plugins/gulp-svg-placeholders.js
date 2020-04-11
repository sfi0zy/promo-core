// -----------------------------------------------------------------------------
//  GULP SVG PLACEHOLDERS
// -----------------------------------------------------------------------------
//
//  This plugin generates SVG images with the dimensions of the original
//  *.jpg pictures. They can be injected right into the HTML and used as
//  placeholders for lazy-loaded images.
//
//  More ideas for placeholders such a Voronoi mosaic or triangulation are
//  in the repository: https://github.com/sfi0zy/svg-placeholders
//
//  Also, there is an article about them: https://habr.com/ru/post/431232/
//

const Handlebars = require('handlebars');
const ColorThief = require('color-thief');
const rgbHex     = require('rgb-hex');
const sizeOf     = require('image-size');
const through    = require('through');
const File       = require('gulp-util').File;


const thief = new ColorThief();


const template = `<svg
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 100 100'
    preserveAspectRatio='none'
    height='{{ height }}'
    width='{{ width }}'>
    <defs>
        <linearGradient id='{{ gradientUniqueID }}'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='0%'
            gradientTransform='rotate(45)'>
            <stop offset='0%'   style='stop-color:{{ startColor }};stop-opacity:1' />
            <stop offset='100%' style='stop-color:{{ endColor }};stop-opacity:1' />
        </linearGradient>
    </defs>
    <rect x='0' y='0' height='100' width='100' fill='url(#{{ gradientUniqueID }})' />
</svg>`;


module.exports = function SVGPlaceholders() {
    let filename = '';
    let svg = '';


    function process(file) {
        const size = sizeOf(file._contents);
        const height = size.height;
        const width  = size.width;

        const palette = thief.getPalette(file._contents, 2);
        const startColor = `#${rgbHex(...palette[0])}`;
        const endColor   = `#${rgbHex(...palette[1])}`;

        const gradientUniqueID = `svg-id-${Math.floor(Math.random() * 1000000)}`;

        svg = Handlebars.compile(template)({
            height,
            width,
            startColor,
            endColor,
            gradientUniqueID
        });

        filename = file.relative;

        this.emit('data', new File({
            path: `${filename}.placeholder.svg`,
            contents: Buffer.from(svg, 'utf-8')
        }));
    }


    function end() {
        this.emit('end');
    }


    return through(process, end);
};

