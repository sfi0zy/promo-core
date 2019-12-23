// -----------------------------------------------------------------------------
//  IMAGE
// -----------------------------------------------------------------------------


const APP = window.APP;


export default class Image extends APP.UI.UIComponent {
    static attributes = [
        'src',
        'srcset',
        'sizes'
    ];


    constructor(root) {
        super(root);

        Object.assign(this.cache, {
            lazyImage: root.querySelector('[data-lazy-image]')
        });

        this.init();
    }


    init() {
        Image.attributes.forEach((attribute) => {
            const value = this.cache.lazyImage.getAttribute(`data-${attribute}`, '');

            if (value) {
                this.cache.lazyImage.setAttribute(attribute, value);
            }
        });

        this.cache.lazyImage.addEventListener('load', () => {
            this.cache.lazyImage.setAttribute('data-lazy-loaded', true);
        });
    }
}

