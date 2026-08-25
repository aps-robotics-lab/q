/* =========================================================
   BOTXCEL 2026
   NAVIGATION CONTROLLER
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");


    const mainNavigation =
        document.getElementById("mainNavigation");


    const menuLinks =
        document.querySelectorAll(
            ".menu-link"
        );


    const siteHeader =
        document.getElementById("siteHeader");


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (
        !menuToggle ||
        !mainNavigation
    ) {

        console.warn(
            "BOTXCEL navigation elements not found."
        );

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


        menuToggle.classList.add(
            "is-open"
        );


        mainNavigation.classList.add(
            "is-open"
        );


        document.body.classList.add(
            "menu-open"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );


        menuToggle.setAttribute(
            "aria-label",
            "Close navigation"
        );


        mainNavigation.setAttribute(
            "aria-hidden",
            "false"
        );


        /* ---------------------------------------------
           Move focus to first navigation link
        --------------------------------------------- */

        const firstLink =
            mainNavigation.querySelector(
                ".menu-link"
            );


        if (firstLink) {

            setTimeout(() => {

                firstLink.focus();

            }, 250);

        }

    }


    /* =====================================================
       CLOSE MENU
    ===================================================== */

    function closeMenu() {

        if (!menuOpen) {
            return;
        }


        menuOpen = false;


        menuToggle.classList.remove(
            "is-open"
        );


        mainNavigation.classList.remove(
            "is-open"
        );


        document.body.classList.remove(
            "menu-open"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );


        mainNavigation.setAttribute(
            "aria-hidden",
            "true"
        );


        /* ---------------------------------------------
           Return focus to menu button
        --------------------------------------------- */

        menuToggle.focus();

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
       MENU BUTTON
    ===================================================== */

    menuToggle.addEventListener(
        "click",
        toggleMenu
    );


    /* =====================================================
       NAVIGATION LINKS
    ===================================================== */

    menuLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                closeMenu();

            }
        );

    });


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

            }

        }
    );


    /* =====================================================
       CLICK OUTSIDE NAVIGATION
    ===================================================== */

    mainNavigation.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                mainNavigation
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       RESIZE PROTECTION
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 1100 &&
                menuOpen
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       HEADER SCROLL STATE
    ===================================================== */

    if (siteHeader) {

        let lastScrollY = 0;


        function updateHeader() {

            const currentScrollY =
                window.scrollY;


            if (
                currentScrollY > 40
            ) {

                siteHeader.classList.add(
                    "header-scrolled"
                );

            } else {

                siteHeader.classList.remove(
                    "header-scrolled"
                );

            }


            lastScrollY =
                currentScrollY;

        }


        window.addEventListener(
            "scroll",
            updateHeader,
            {
                passive: true
            }
        );


        updateHeader();

    }


    /* =====================================================
       INITIAL ACCESSIBILITY STATE
    ===================================================== */

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );


    menuToggle.setAttribute(
        "aria-label",
        "Open navigation"
    );


    mainNavigation.setAttribute(
        "aria-hidden",
        "true"
    );


});
