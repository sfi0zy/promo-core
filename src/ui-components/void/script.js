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
// so we use this variant everywhere for consistency.

const APP = window.APP;


// The component always exported from the module as a default class,
// and it should extend the UIComponent or other component
// which extends the UIComponent.
export default class Void extends APP.UI.UIComponent {
    constructor(root) {
        // This component extends UIComponent, so we need to call
        // its constructor first.

        super(root);

        // We extend the main fields of the component. The cache already has
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
        // Here is an example of usage of events.
        // We add a couple of mistakes here to make sure ESLint and SonarJS are enabled.

        const If_you_see_2_errors_and_1_warning_here_ESLint_and_SonarJS_work_correctly = !false;

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


    // The non-default methods are usually placed here, after the default ones.

    doNothing() {
        console.log('Nothing is happened');

        // We can use the modules from APP.MODULES in UI components.
        // But remember, we need to check if they are enabled.
        // The modules can be disabled by APP.FLAGS.

        if (APP.FLAGS.ENABLE_VOID_EXAMPLES) {
            /* eslint-disable no-unused-vars */
            const myLocalVoidGenerator = new APP.MODULES.VoidGenerator();
            /* eslint-enable no-unused-vars */
        }

        return this;
    }
}

