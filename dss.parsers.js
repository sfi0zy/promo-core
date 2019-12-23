// -----------------------------------------------------------------------------
//  PARSERS FOR DSS
// -----------------------------------------------------------------------------
//
//  We use the "dss" npm package for building documentation for UI components.
//
//  It's not a very popular tool and it seems like this package was published
//  about 6 years ago. We use it here because it's a very simple tool.
//  It's small and it works. Like old programs in *nix. We don't need to
//  improve it endlessly and add more functions.
//
//  See https://www.npmjs.com/package/dss for more options.
//
//
//  Usually the documentation part of CSS file looks like this:
//
//
//  @name        My UI component
//  @description Some description of the component here
//  @component   ThisComponentNameInJS
//  @method      someMethod(someOptions) - description of the method
//  @method      anotherMethod(someOptions) - another description
//  @event       event-in-js-1
//  @event       event-in-js-2
//  @event       event-in-js-3
//  @requires    AnotherComponent1
//  @requires    AnotherComponent2
//  @variant     -active
//  @markup
//      div.ui-my-component
//          ...
//
//
//  The meanings of the fields:
//      @name:        The title for component that will be displayed in the docs.
//
//      @description: A small description of it. It can include information about
//                    where it is being used, tips or another useful information.
//
//      @component:   A name of the component in javascript. This field is
//                    optional. Some components are CSS-only.
//
//      @method:      This field used to describe the methods of the component.
//
//      @event:       The local events of the component.
//
//      @requires:    If this component can't be used without another component,
//                    that components name should be there.
//
//      @variant:     The CSS class for variant. See RSCSS docs for information.
//
//      @markup:      The Pug markup for the component.
//



module.exports =  {
    link(i, line) {
        const exp = new RegExp('(b(https?|ftp|file)://[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])', 'ig');

        line.replace(exp, '<a href="$1">$1</a>');

        return line;
    },


    lvar(i, line) {
        const lvar = line.split(' - ');

        return {
            name:        lvar[0] ? lvar[0] : '',
            defaults:    lvar[1] ? lvar[1] : '',
            description: lvar[2] ? lvar[2] : ''
        };
    },


    component(i, line) {
        return line;
    },


    method(i, line) {
        const method = line.split(' - ');

        return {
            name:           method[0] ? method[0] : '',
            description:    method[1] ? method[1] : '',
            description_ru: method[2] ? method[2] : ''
        };
    },


    event(i, line) {
        return line;
    },


    requires(i, line) {
        return line;
    },


    variant(i, line) {
        return line;
    }
};

