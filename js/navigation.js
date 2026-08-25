/* =========================================================
   BOTXCEL 2026
   GLOBAL NAVIGATION SYSTEM
   STEP 5
========================================================= */


/* =========================================================
   NAVIGATION INITIALIZATION
========================================================= */

function initializeNavigation() {

    const menuToggle =
        document.getElementById("menuToggle");

    const mainNavigation =
        document.getElementById("mainNavigation");

    const navigationBackdrop =
        mainNavigation?.querySelector(
            ".navigation-backdrop"
        );

    const navigationLinks =
        mainNavigation?.querySelectorAll(
            "[data-nav-link]"
        );


    /*
     * If this page doesn't contain the
     * navigation system, simply stop.
     */

    if (
        !menuToggle ||
        !mainNavigation
    ) {

        return;

    }



    /* =====================================================
       STATE
    ===================================================== */

    let menuOpen = false;



    /* =====================================================
       OPEN MENU
    ===================================================== */

    function openMenu() {

        if (menuOpen) {

            return;

        }


        menuOpen = true;


        document.body.classList.add(
            "nav-open"
        );


        menuToggle.classList.add(
            "menu-open"
        );


        mainNavigation.classList.add(
            "nav-open"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );


        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );


        mainNavigation.setAttribute(
            "aria-hidden",
            "false"
        );


        /*
         * Prevent the page behind the navigation
         * from scrolling.
         */

        document.documentElement.classList.add(
            "menu-lock"
        );


        document.body.classList.add(
            "menu-lock"
        );

    }



    /* =====================================================
       CLOSE MENU
    ===================================================== */

    function closeMenu() {

        if (!menuOpen) {

            return;

        }


        menuOpen = false;


        document.body.classList.remove(
            "nav-open"
        );


        menuToggle.classList.remove(
            "menu-open"
        );


        mainNavigation.classList.remove(
            "nav-open"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );


        mainNavigation.setAttribute(
            "aria-hidden",
            "true"
        );


        document.documentElement.classList.remove(
            "menu-lock"
        );


        document.body.classList.remove(
            "menu-lock"
        );

    }



    /* =====================================================
       TOGGLE
    ===================================================== */

    function toggleMenu() {

        if (menuOpen) {

            closeMenu();

        } else {

            openMenu();

        }

    }



    /* =====================================================
       HAMBURGER BUTTON
    ===================================================== */

    menuToggle.addEventListener(
        "click",
        toggleMenu
    );



    /* =====================================================
       BACKDROP
    ===================================================== */

    if (navigationBackdrop) {

        navigationBackdrop.addEventListener(
            "click",
            closeMenu
        );

    }



    /* =====================================================
       NAVIGATION LINKS
    ===================================================== */

    if (navigationLinks) {

        navigationLinks.forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    () => {

                        closeMenu();

                    }
                );

            }
        );

    }



    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                menuOpen
            ) {

                closeMenu();


                /*
                 * Return keyboard focus to the
                 * button that opened the navigation.
                 */

                menuToggle.focus();

            }

        }
    );



    /* =====================================================
       RESIZE SAFETY
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            /*
             * If the user rotates a phone or
             * moves from mobile to desktop,
             * don't leave the document locked.
             */

            if (
                window.innerWidth > 850 &&
                menuOpen
            ) {

                closeMenu();

            }

        }
    );



    /* =====================================================
       INITIAL STATE
    ===================================================== */

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );


    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );


    mainNavigation.setAttribute(
        "aria-hidden",
        "true"
    );



    /* =====================================================
       EXPOSE CONTROL
       Useful later for other page systems.
    ===================================================== */

    window.BOTXCEL =
        window.BOTXCEL || {};


    window.BOTXCEL.navigation = {

        open: openMenu,

        close: closeMenu,

        toggle: toggleMenu,

        isOpen: () => menuOpen

    };

}



/* =========================================================
   START
========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeNavigation,
        {
            once: true
        }
    );

} else {

    initializeNavigation();

}
