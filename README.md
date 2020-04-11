# Promo Core

ヾ( °-°)シﾟ`･｡･°*♪･ﾟ’☆


This is a boilerplate designed for static promotional websites. It's based on Pug templates, LESS, PostCSS and ES6+. No SPA frameworks included.

![Promo Core v1](/src/images/main.jpg)




## Getting started

At first, you need to clone the Promo Core and install the dependencies. There are almost 50 dependencies, so it may take some time.

```sh
git clone https://github.com/sfi0zy/promo-core.git my-awesome-project
cd my-awesome-project
npm i
```

Now you can use the one of the two modes.

The development mode with BrowserSync and sourcemaps (the generated docs are served at ```/docs/``` url).

```sh
npm run dev
```

The production mode with ESLint and W3C validator:

```sh
npm run prod
```

That's all you need to start the development of your awesome project.



## Features

The main tools in the boilerplate are:

- **For HTML**
    - Pug preprocessor
    - W3C validator
    - Inline SVG images
- **For CSS**
    - LESS
    - Stylelint
    - PostCSS
    - Doiuse (warns us, if we used unsupported CSS properties)
    - Critical CSS extraction
- **For JS**
    - Webpack + Babel (preset-env)
    - ESlint
- **Others:**
    - Favicon generator
    - SVG placeholders generator (for lazy-loaded images)
    - Docs generator for UI components (based on DSS)

These tools and detailed comments in the pre-created files with the structure of the project help us to develop websites fast and keep the code clean.



## Structure

The structure of the Promo Core is quite simple. We have a ```window.APP``` object. It's a global thing that includes everything - dependencies, polyfills, modules, ui components, etc. You can look at it in the console.

![App structure](/app-structure.svg)


We use it everywhere and it helps to keep the same structure in different projects. And it helps to debug the code as well because we see all events and components in one place.

All ideas and conventions are explained in the comments in the source code, so if you're interested in using of Promo Core, you'd better read them.



## Dependencies

The full list of the dependencies with descriptions can be found in the docs template in ```/src/docs/``` or in the docs page, generated during the build process.





## Practical usage

The basic process of development looks like this:

1. Clone the repository, install dependencies.
2. Check the information in package.json and change origins in git if you need to.
3. Put your images into ```/src/images/```.
4. Start development server with ```npm run dev```.
5. Go to ```/src/modules/```, add your non-UI code.
6. Import your modules to the ```APP.MODULES``` in ```/src/main.js```.
7. Go to ```/src/core/less/```, set global styles, constants for LESS and color scheme.
8. Go to ```/src/ui-components/```, add your UI components (use Void as example).
9. Import your UI components to the ```APP.UI``` in ```/src/main.js``` and ```/src/main.less```.
10. Go to ```/src/pages``` and add your pages.
11. Remove or comment the unused dependencies in ```/src/core/js/dependencies.js```.
12. Run ```npm run prod```.
13. Get the ```/dist``` directory ant put it on your server.




## Have any questions or found a bug?

Feel free to open an issue in this repository.



## License

MIT License

Copyright (c) 2019-2020 Ivan Bogachev <sfi0zy@gmail.com>

