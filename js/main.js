/* =========================================================
   BOTXCEL 2026
   MAIN JAVASCRIPT ENTRY POINT
========================================================= */


/*
    main.js is the central JavaScript file.

    It loads the individual systems:

        main.js
           ↓
        navigation.js
           ↓
        effects.js

    Later we can add:

        home.js
        announcements.js
        registration.js
        contact.js
        events.js
        etc.
*/


/* =========================================================
   MODULES
========================================================= */


/*
    Importing these files runs their code.

    Because main.js is loaded with:

        type="module"

    the browser can resolve these imports correctly.
*/


import "./navigation.js";


import "./effects.js";


/* =========================================================
   APPLICATION START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /*
            The page has finished loading.

            Keep this section small.

            Page-specific functionality should eventually
            live in its own JavaScript file.
        */


        document.body.classList.add(
            "site-ready"
        );


    }
);


/* =========================================================
   GLOBAL ERROR REPORTING
========================================================= */

window.addEventListener(
    "error",
    (event) => {

        console.error(
            "BOTXCEL JavaScript Error:",
            event.error || event.message
        );

    }
);


/* =========================================================
   UNHANDLED PROMISE ERRORS
========================================================= */

window.addEventListener(
    "unhandledrejection",
    (event) => {

        console.error(
            "BOTXCEL Promise Error:",
            event.reason
        );

    }
);
