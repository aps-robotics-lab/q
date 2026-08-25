/* =========================================================
   BOTXCEL 2026
   MAIN JAVASCRIPT ENTRY POINT
========================================================= */


/* =========================================================
   CORE MODULES
========================================================= */

/*
    Navigation
    Handles:
    - Hamburger menu
    - Full-screen navigation
    - Menu closing
*/

import "./navigation.js";


/*
    Global visual effects
    Handles:
    - Particles
    - Background effects
    - Other global motion
*/

import "./effects.js";


/*
    Home page
    Handles:
    - Cinematic six-stage opening
    - BOTXCEL launch sequence
*/

import "./home.js";



/* =========================================================
   GLOBAL APPLICATION START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
         * The DOM is ready.
         *
         * This class can be used by CSS for
         * page-ready transitions.
         */

        document.body.classList.add(
            "site-ready"
        );


        /*
         * Mark JavaScript as available.
         */

        document.documentElement.classList.add(
            "js-enabled"
        );


    },
    {
        once: true
    }
);



/* =========================================================
   GLOBAL ERROR HANDLING
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
   UNHANDLED PROMISE HANDLING
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



/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        /*
         * Other animation systems can later use
         * this state to pause expensive effects
         * when the tab is hidden.
         */

        if (
            document.hidden
        ) {

            document.body.classList.add(
                "page-hidden"
            );

        } else {

            document.body.classList.remove(
                "page-hidden"
            );

        }

    }
);



/* =========================================================
   BOTXCEL GLOBAL API
========================================================= */

/*
    Small global namespace.

    Later we can safely expose things such as:

        BOTXCEL.openMenu()
        BOTXCEL.startCountdown()
        BOTXCEL.showNotification()

    without filling the window object with
    unrelated variables.
*/

window.BOTXCEL = {

    version: "2026",

    initialized: true

};



/* =========================================================
   APPLICATION READY EVENT
========================================================= */

window.dispatchEvent(
    new CustomEvent(
        "botxcel:ready"
    )
);
