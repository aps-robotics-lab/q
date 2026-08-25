/* =========================================================
   BOTXCEL 2026
   HOME PAGE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");
    const navLinks = document.querySelectorAll(".main-nav a");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                menuToggle.classList.toggle("menu-open");

            mainNav.classList.toggle(
                "nav-open",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation"
                    : "Open navigation"
            );

            document.body.classList.toggle(
                "menu-active",
                isOpen
            );

        });


        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove(
                    "menu-open"
                );

                mainNav.classList.remove(
                    "nav-open"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

                document.body.classList.remove(
                    "menu-active"
                );

            });

        });

    }


    /* =====================================================
       ESCAPE KEY CLOSES MOBILE MENU
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            mainNav &&
            mainNav.classList.contains("nav-open")
        ) {

            menuToggle.classList.remove(
                "menu-open"
            );

            mainNav.classList.remove(
                "nav-open"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-active"
            );

        }

    });


    /* =====================================================
       SMOOTH INTERNAL NAVIGATION
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetID =
                    link.getAttribute("href");

                if (
                    !targetID ||
                    targetID === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetID);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll(
        "section[id], footer[id]"
    );

    const navSectionLinks =
        document.querySelectorAll(
            '.main-nav a[href^="#"]'
        );


    const updateActiveNav = () => {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 180;


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {
                currentSection =
                    section.getAttribute("id");
            }

        });


        navSectionLinks.forEach(link => {

            const href =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    /* =====================================================
       COUNTDOWN
       CHANGE THIS DATE FOR YOUR ACTUAL EVENT
    ===================================================== */

    /*
       Example:
       15 December 2026 at 9:00 AM IST

       Change ONLY this date when you know the
       final BOTXCEL event date.
    */

    const eventDate =
        new Date("2026-12-15T09:00:00+05:30").getTime();


    const daysElement =
        document.querySelector("[data-days]");

    const hoursElement =
        document.querySelector("[data-hours]");

    const minutesElement =
        document.querySelector("[data-minutes]");

    const secondsElement =
        document.querySelector("[data-seconds]");


    const pad = number =>
        String(number).padStart(2, "0");


    const updateCountdown = () => {

        const now =
            Date.now();

        let difference =
            eventDate - now;


        if (difference <= 0) {

            difference = 0;

        }


        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (difference %
                    (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (difference %
                    (1000 * 60 * 60)) /
                (1000 * 60)
            );


        const seconds =
            Math.floor(
                (difference %
                    (1000 * 60)) /
                1000
            );


        if (daysElement) {
            daysElement.textContent =
                pad(days);
        }


        if (hoursElement) {
            hoursElement.textContent =
                pad(hours);
        }


        if (minutesElement) {
            minutesElement.textContent =
                pad(minutes);
        }


        if (secondsElement) {
            secondsElement.textContent =
                pad(seconds);
        }

    };


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".home-reveal, .home-stagger"
        );


    if (
        "IntersectionObserver" in window &&
        revealElements.length
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(
                element
            );

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       EVENT CARD MOUSE EFFECT
       DESKTOP ONLY
    ===================================================== */

    const eventCards =
        document.querySelectorAll(
            ".home-event-card"
        );


    if (window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches) {

        eventCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        ((y - centerY) /
                            centerY) *
                        -2.5;


                    const rotateY =
                        ((x - centerX) /
                            centerX) *
                        2.5;


                    card.style.transform =
                        `translateY(-8px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       VIDEO PLACEHOLDER INTERACTION
    ===================================================== */

    const videoPlaceholder =
        document.querySelector(
            ".home-video-placeholder"
        );


    if (videoPlaceholder) {

        videoPlaceholder.addEventListener(
            "click",
            () => {

                videoPlaceholder.classList.add(
                    "video-loading"
                );

            }
        );

    }


    /* =====================================================
       HEADER BACKGROUND ON SCROLL
    ===================================================== */

    const header =
        document.querySelector(
            ".site-header"
        );


    const updateHeader =
        () => {

            if (!header) {
                return;
            }


            if (window.scrollY > 40) {

                header.classList.add(
                    "header-scrolled"
                );

            } else {

                header.classList.remove(
                    "header-scrolled"
                );

            }

        };


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();


    /* =====================================================
       PREVENT PAGE JUMP WHEN LOADING HASH
    ===================================================== */

    if (window.location.hash) {

        setTimeout(() => {

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

        }, 0);

    }

});
