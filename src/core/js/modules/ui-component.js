// -----------------------------------------------------------------------------
//  UI COMPONENT
// -----------------------------------------------------------------------------
//
//  All of the UI components extend the UIComponent class. It's like a
//  skeleton: all of them should have the same structure and the same default
//  methods.
//
//  See /src/core/js/ui for more information.
//


import Events from './events';

import UTILS from '../utils';


export default class UIComponent {
    // Static properties, if any, should be placed here, before the constructor.

    constructor(root) {
        // We don't use the shadow DOM or any templates here. We just cache
        // the elements we use inside the component.
        //
        // Usually we don't need more powerful tools to manipulate with
        // elements on promotional websites.
        this.cache = {
            root
        };

        // We set the unique id to every component. It's not an #id
        // of the root element, it's just an unique identifier of the
        // component in scripts. Sometimes it's useful to start
        // ids of the particular DOM elements in the component with this string.
        // It emulates namespace or so.
        this.uniqueID = `ui-component-${UTILS.generateRandomString(8)}`;

        // We set this data attribute to save the fact that we created
        // the UI component for this DOM element. This is important,
        // because we have a number of cases when we load more HTML
        // and need to init more components. This attribute helps to not
        // create the same component twice.
        this.cache.root.setAttribute('data-ui-component', true);

        // The state of the component is here. This is an object where we save
        // all data for this instance of UI component. It has no specific rules
        // to deal with it.
        this.state = {};

        // The events are a system of local events of this instance of
        // UI component. See /src/ui-components/void/ for examples of how
        // to use it. It's not recommended to change everything in it here.
        // If you want to use more powerful events system, make changes right
        // in the Events class. It's easier to understand the logic of the app
        // when all components use the same systems of events.
        this.events = new Events();

        // At the end, we usually call all the default methods.
        // Here they are commented because they are empty in this skeleton.
        //
        // this.init();
        // this.initAria();
        // this.initEvents();
        // this.initControls();
    }


    // We use this method if the component has a lot of logic inside.
    // It's better to make the constructor small and understandable.
    init() {
        return this;
    }


    // We init the WAI-ARIA things here. Usually we don't pay attention for
    // accessibility on promotional websites with a lot of animations,
    // WebGL and other graphics (and a small budget), but if we do it,
    // we put the code for it in this method.
    initAria() {
        return this;
    }


    // In this method we do all things associated with the local system of events.
    initEvents() {
        return this;
    }


    // Here we initialize all controls for the component: mouse events,
    // keyboard and touchpad events. Usually we use a lot of
    // "addEventListener"s here.
    initControls() {
        return this;
    }


    // The non-default methods are usually placed here, after the default ones.
}


