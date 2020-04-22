// -----------------------------------------------------------------------------
//  UI
// -----------------------------------------------------------------------------
//
//  This is a small factory for UI components. All components should be
//  registered in it. See /src/main.js for example. UI saves the all created
//  components inside itself and helps to debug the code.
//


import DEPENDENCIES from './dependencies';
import UIComponent from './modules/ui-component';


class Ui {
    constructor() {
        // All UI components must extend the UIComponent, so we save it here
        // for future usage.
        this.UIComponent = UIComponent;

        // Here we save the registered types of components
        this.library = {};

        // And here, we save the created instances of components
        this.cache = {};
    }


    add(type, component) {
        if (!this.library[type]) {
            this.library[type] = component;
        }
    }


    create(type, selector, options) {
        if (!this.cache[type]) {
            this.cache[type] = [];
        }

        const elements = document.querySelectorAll(selector);

        return [].map.call(elements, (element) => {
            let newComponent;

            if (this.library[type]) {
                newComponent = new this.library[type](element, options);
            } else {
                newComponent = null;
            }

            this.cache[type].push(newComponent);

            return newComponent;
        });
    }


    update() {
        [].forEach.call(this.library, (type) => {
            this.create(
                type,
                `.${__GLOBAL_CSS_PREFIX__}${DEPENDENCIES.toSlugCase(type)}:not([data-ui-component])`
            );
        });
    }


    get(type, id) {
        let result = null;

        this.cache[type].forEach((component) => {
            if (component.cache.root.id === id) {
                result = component;
            }
        });

        return result;
    }
}


// -----------------------------------------------------------------------------


const UI = new Ui();

export default UI;

