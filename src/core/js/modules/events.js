// -----------------------------------------------------------------------------
//  EVENTS
// -----------------------------------------------------------------------------
//
//  The Events class is the simple system of events. It helps to debug the
//  scripts, it saves all information about events (including all callbacks
//  and the number of events happened) inside itself. This information can be
//  obtained using console.log in the browser in different cases.
//


export default class Events {
    constructor() {
        this.events = {};
    }


    add(name) {
        if (!(name in this.events)) {
            this.events[name] = {
                callbacks: [],
                happenedTimes: 0,
                lastDetails: {}
            };
        }

        return this;
    }


    addEventListener(name, callback, executeIfAlreadyFired = false) {
        if ((name in this.events) && (typeof callback === 'function')) {
            this.events[name].callbacks.push(callback);

            if (executeIfAlreadyFired && (this.events[name].happenedTimes > 0)) {
                callback(this.events[name].lastDetails);
            }
        }

        return this;
    }


    fire(name, details) {
        if (name in this.events) {
            this.events[name].happenedTimes++;
            this.events[name].lastDetails = details;

            this.events[name].callbacks.forEach((callback) => {
                if (typeof callback === 'function') {
                    callback(details);
                }
            });
        }

        return this;
    }
}

