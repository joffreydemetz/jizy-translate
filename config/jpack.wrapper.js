/*! jTranslate v@VERSION | @DATE | [@BUNDLE] */
(function (global) {
    "use strict";

    if (typeof global !== "object" || !global) {
        throw new Error("jTranslate requires a window");
    }

    if (typeof global.jTranslate !== "undefined") {
        throw new Error("jTranslate is already defined");
    }

    // @CODE 

    global.jTranslate = jTranslate;

})(typeof window !== "undefined" ? window : this);