// -----------------------------------------------------------------------------
//  UTILS
// -----------------------------------------------------------------------------
//
//  Here we store the common utils. These functions are too small to create
//  modules for every of them.
//


function debounce(func, ms) {
    let isCooldown = false;

    return function wrapper(...args) {
        if (isCooldown) {
            return;
        }

        func.apply(this, args);

        isCooldown = true;

        setTimeout(() => {
            isCooldown = false;
        }, ms);
    };
}



function throttle(func, ms) {
    let isThrottled = false;

    let savedThis = null;
    let savedArgs = null;

    return function wrapper(...args) {
        if (isThrottled) {
            savedThis = this;
            savedArgs = args;

            return;
        }

        func.apply(this, args);

        isThrottled = true;

        setTimeout(() => {
            isThrottled = false;

            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);

                savedThis = null;
                savedArgs = null;
            }
        }, ms);
    };
}


function generateRandomString(length = 8) {
    const possibleChars = 'abcdefghijklmnopqrstuvwxyz0123456789';

    let str = '';

    for (let i = 0; i < length; i++) {
        str += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }

    return str;
}


function compileTemplate(template, data) {
    return template.replace(/{{\s*(\w*)\s*}}/g, (str, key) => {
        return (key in data) ? data[key] : '';
    });
}


// -----------------------------------------------------------------------------


const UTILS = {
    debounce,
    throttle,
    generateRandomString,
    compileTemplate
};


export default UTILS;

