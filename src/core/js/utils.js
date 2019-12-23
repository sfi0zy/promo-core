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



// -----------------------------------------------------------------------------


const UTILS = {
    debounce,
    throttle,
};


export default UTILS;

