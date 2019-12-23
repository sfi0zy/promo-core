// -----------------------------------------------------------------------------
//  VOID
// -----------------------------------------------------------------------------
//
//  This is an empty component. It's just an example. It doesn't do anything.
//
//  See /src/core/js/ui for more information about components.
//


// We use APP from the window here. This is not a mistake.
// It's common to init the core app and add some components to it later,
// so we use this variant everythere for consistency.

const APP = window.APP;


// The component always exported from the module as a default class,
// and it should extend the UIComponent or another component
// which extends the UIComponent.
export default class Void extends APP.UI.UIComponent {
    constructor(root) {
        // This component extends UIComponent, so we need to call
        // it's constructor first.

        super(root);

        // We extend the main fields of component. The cache already has
        // a field "root" with a root element.

        Object.assign(this.cache, {
            // root is already here
        });

        Object.assign(this.state, {

        });

        // These methods are the default methods.
        // See /src/core/modules/ui-component for more information.

        this.init();
        this.initAria();
        this.initEvents();
        this.initControls();
    }


    init() {
        return this;
    }


    initAria() {
        return this;
    }


    initEvents() {
        // Here is an example of usage of events

        this.events.add('nothing-is-happened');

        this.events.addEventListener('nothing-is-happened',
            this.doNothing.bind(this));

        return this;
    }


    initControls() {
        this.cache.root.addEventListener('click', () => {
            this.events.fire('nothing-is-happened');
        });

        return this;
    }


    // The non-default methods are usually placed here, after default ones.

    doNothing() {
        console.log('Nothing is happened');

        return this;
    }
}

