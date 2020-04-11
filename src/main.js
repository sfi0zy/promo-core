// -----------------------------------------------------------------------------
//  MAIN
// -----------------------------------------------------------------------------
//
//  This is the entry point for the application.
//


// APP is the main object of the application.
// It includes everything.
// It's useful to log it for debugging.

import APP from './core/js/app';


// When all things loaded we begin.
document.addEventListener('DOMContentLoaded', () => {
    // At first, the global object should be a real global object.
    window.APP = APP;

    // Modules and UI components are not the parts of the core.
    // They can be created in different scripts.
    // They use the window.APP object as a container with
    // dependencies, polyfills etc. They don't import it as ES6 module.

    // The MODULES field already includes the modules from the core.
    // So we extend it instead of assigning a new value for it.
    Object.assign(APP.MODULES, {
        VoidGenerator: require('./modules/void-generator').default
    });

    // Components will be saved in UI, so we don't add them to the APP object.
    const components = {
        Image: require('./ui-components/image/script').default,
        Void:  require('./ui-components/void/script').default,
    };

    // Next we initialize the UI components.
    [].forEach.call(Object.keys(components), (type) => {
        // At first we add the component to the UI.library.
        APP.UI.add(type, components[type]);

        // And then we create instances of the UI components.
        // They are saved in the UI.cache now.
        //
        // If the root element of the component has an "id" attribute,
        // we can obtain it by type and id, like this:
        // let myComponent = APP.UI.get('my-component', 'id-12345');
        APP.UI.create(
            type,
            `.${__GLOBAL_CSS_PREFIX__}${APP.DEPENDENCIES.toSlugCase(type)}:not([data-ui-component])`
        );
    });

    // This event can be used sometimes in site preloaders to check the moment
    // when the components are created and the preloader can be removed.
    APP.EVENTS.fire('components-created');

    // At the end, we use console.log to show the starting state of the app.
    console.log(APP);
});

