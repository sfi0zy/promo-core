// -----------------------------------------------------------------------------
//  APP
// -----------------------------------------------------------------------------
//
//  This is a singleton of the application. This is that global object
//  that includes everything and being used everywhere.
//


import FLAGS        from './flags';

import DEPENDENCIES from './dependencies';
import POLYFILLS    from './polyfills';
import UTILS        from './utils';
import UI           from './ui';

import Events       from './modules/events';


class App {
    constructor() {
        // These __SOMETHING__ things are not "real" variables.
        // See the /webpack.config.js to get more information.
        this.__PROJECT__           = __PROJECT__;
        this.__PROJECT_VERSION__   = __PROJECT_VERSION__;
        this.__DEBUG__             = __DEBUG__;
        this.__GLOBAL_CSS_PREFIX__ = __GLOBAL_CSS_PREFIX__;

        this.FLAGS = FLAGS;

        this.DEPENDENCIES = DEPENDENCIES;
        this.POLYFILLS    = POLYFILLS;
        this.UTILS        = UTILS;
        this.UI           = UI;

        this.EVENTS       = new Events();

        // We save the Events class for future usage in additional UI components.
        this.MODULES = {
            Events
        };

        this.EVENTS.add('app-initialized');
        this.EVENTS.add('components-created');
        this.EVENTS.add('new-components-loaded');

        this.EVENTS.addEventListener('new-components-loaded', () => {
            this.UI.update();
        });

        this.EVENTS.fire('app-initialized');
    }
}


// -----------------------------------------------------------------------------


const APP = new App();

export default APP;

