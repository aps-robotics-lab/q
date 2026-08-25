/* =========================================================
   BOTXCEL 2026
   EVENTS PAGE JAVASCRIPT
   File: js/events.js
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeEventsPage();

});


/* =========================================================
   MAIN INITIALIZER
========================================================= */

function initializeEventsPage() {

    setupMobileMenu();

    setupScrollReveal();

    setupEventCards();

    setupCoordinatorCards();

    setupContactCTA();

    setupSmoothScrolling();

}


/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu() {

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (!menuToggle || !mainNav) {
        return;
    }


    menuToggle.addEventListener("click", function () {

        menuToggle.classList.toggle("menu-open");

        mainNav.classList.toggle("nav-open");

        const isOpen =
            mainNav.classList.contains("nav-open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    const navLinks =
        mainNav.querySelectorAll("a");


    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mainNav.classList.remove("nav-open");

            menuToggle.classList.remove("menu-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function setupScrollReveal() {

    const revealElements =
        document.querySelectorAll(
            ".event-card, .coordinator-card, .team-card, .events-section-header, .events-cta"
        );


    if (!revealElements.length) {
        return;
    }


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

    });


    if (!("IntersectionObserver" in window)) {

        revealElements.forEach(function (element) {

            element.classList.add("revealed");

        });

        return;
    }


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "revealed"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -60px 0px"
            }
        );


    revealElements.forEach(function (element) {

        observer.observe(element);

    });

}


/* =========================================================
   EVENT CARDS
========================================================= */

function setupEventCards() {

    const eventCards =
        document.querySelectorAll(".event-card");


    if (!eventCards.length) {
        return;
    }


    eventCards.forEach(function (card, index) {

        /*
         * Stagger animation.
         */

        card.style.setProperty(
            "--event-delay",
            (index * 80) + "ms"
        );


        /*
         * Keyboard accessibility.
         */

        card.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    card.classList.toggle(
                        "event-card-focused"
                    );

                }

            }
        );


        /*
         * Mouse interaction.
         */

        card.addEventListener(
            "mouseenter",
            function () {

                card.classList.add(
                    "event-card-hover"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                card.classList.remove(
                    "event-card-hover"
                );

            }
        );

    });

}


/* =========================================================
   COORDINATOR CARDS
========================================================= */

function setupCoordinatorCards() {

    const coordinatorCards =
        document.querySelectorAll(
            ".coordinator-card"
        );


    if (!coordinatorCards.length) {
        return;
    }


    coordinatorCards.forEach(
        function (card, index) {

            card.style.setProperty(
                "--coordinator-delay",
                (index * 100) + "ms"
            );


            const name =
                card.querySelector(
                    ".coordinator-name"
                );


            if (name) {

                card.setAttribute(
                    "data-coordinator",
                    name.textContent.trim()
                );

            }

        }
    );

}


/* =========================================================
   CONTACT CTA
========================================================= */

function setupContactCTA() {

    const contactButtons =
        document.querySelectorAll(
            'a[href="contact.html"], .contact-cta'
        );


    if (!contactButtons.length) {
        return;
    }


    contactButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                button.classList.add(
                    "cta-clicked"
                );

            }
        );

    });

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function setupSmoothScrolling() {

    const pageLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    pageLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetID =
                    link.getAttribute("href");


                if (
                    !targetID ||
                    targetID === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetID
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });

}


/* =========================================================
   ACTIVE EVENT CARD
========================================================= */

function activateEventCard(card) {

    if (!card) {
        return;
    }


    document
        .querySelectorAll(".event-card")
        .forEach(function (item) {

            item.classList.remove(
                "event-card-active"
            );

        });


    card.classList.add(
        "event-card-active"
    );

}


/* =========================================================
   EVENT CARD CLICK SUPPORT
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const card =
            event.target.closest(
                ".event-card"
            );


        if (!card) {
            return;
        }


        /*
         * Don't interfere with buttons/links
         * inside the card.
         */

        if (
            event.target.closest("a") ||
            event.target.closest("button")
        ) {
            return;
        }


        activateEventCard(card);

    }
);


/* =========================================================
   PAGE SCROLL EFFECT
========================================================= */

let lastScrollPosition = 0;


window.addEventListener(
    "scroll",
    function () {

        const currentScroll =
            window.scrollY;


        const header =
            document.querySelector(
                ".site-header"
            );


        if (!header) {
            return;
        }


        if (currentScroll > 50) {

            header.classList.add(
                "header-scrolled"
            );

        } else {

            header.classList.remove(
                "header-scrolled"
            );

        }


        lastScrollPosition =
            currentScroll;

    },
    {
        passive: true
    }
);


/* =========================================================
   EVENT COUNTER
========================================================= */

function animateNumber(
    element,
    target,
    duration
) {

    if (!element) {
        return;
    }


    let startTime = null;


    function updateNumber(timestamp) {

        if (!startTime) {
            startTime = timestamp;
        }


        const progress =
            Math.min(
                (timestamp - startTime) /
                duration,
                1
            );


        const value =
            Math.floor(
                progress * target
            );


        element.textContent =
            value;


        if (progress < 1) {

            requestAnimationFrame(
                updateNumber
            );

        }

    }


    requestAnimationFrame(
        updateNumber
    );

}


/* =========================================================
   EVENT STATISTICS
========================================================= */

function setupEventStatistics() {

    const statistics =
        document.querySelectorAll(
            "[data-count]"
        );


    if (!statistics.length) {
        return;
    }


    if (!("IntersectionObserver" in window)) {

        statistics.forEach(
            function (element) {

                element.textContent =
                    element.dataset.count;

            }
        );

        return;
    }


    const statsObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const element =
                            entry.target;


                        const target =
                            Number(
                                element.dataset.count
                            );


                        if (
                            Number.isNaN(target)
                        ) {
                            return;
                        }


                        animateNumber(
                            element,
                            target,
                            1200
                        );


                        statsObserver.unobserve(
                            element
                        );

                    }
                );

            },
            {
                threshold: 0.6
            }
        );


    statistics.forEach(
        function (element) {

            statsObserver.observe(
                element
            );

        }
    );

}


/* =========================================================
   INITIALIZE STATISTICS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupEventStatistics();

    }
);


/* =========================================================
   REDUCED MOTION SUPPORT
========================================================= */

function respectReducedMotion() {

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (!prefersReducedMotion) {
        return;
    }


    document.documentElement.classList.add(
        "reduced-motion"
    );

}


respectReducedMotion();


/* =========================================================
   EVENTS PAGE COMPLETE
========================================================= */
