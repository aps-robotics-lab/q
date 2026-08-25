/* =========================================================
   BOTXCEL 2026 — HOME PAGE JAVASCRIPT
   Navigation + Countdown + Scroll Reveal + Micro Interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
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
                isOpen ? "true" : "false"
            );

            document.body.classList.toggle(
                "nav-active",
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

                document.body.classList.remove(
                    "nav-active"
                );

            });

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU WITH ESC
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") return;

        if (
            menuToggle &&
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
                "nav-active"
            );

        }

    });


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header =
        document.querySelector(".site-header");

    let lastScroll = 0;

    const updateHeader = () => {

        if (!header) return;

        const currentScroll =
            window.scrollY;

        if (currentScroll > 30) {

            header.classList.add(
                "header-scrolled"
            );

        } else {

            header.classList.remove(
                "header-scrolled"
            );

        }

        lastScroll = currentScroll;

    };

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =====================================================
       COUNTDOWN
       Change the date below to the actual event date.
    ===================================================== */

    const countdown =
        document.querySelector(".home-countdown");

    if (countdown) {

        const daysElement =
            countdown.querySelector(
                "[data-days]"
            );

        const hoursElement =
            countdown.querySelector(
                "[data-hours]"
            );

        const minutesElement =
            countdown.querySelector(
                "[data-minutes]"
            );

        const secondsElement =
            countdown.querySelector(
                "[data-seconds]"
            );


        /*
         * EVENT DATE
         *
         * Example:
         * 2026-12-20 10:00:00
         *
         * Replace this with the actual
         * BOTXCEL event date.
         */

        const eventDate =
            new Date(
                "2026-12-20T10:00:00"
            ).getTime();


        const pad = number =>
            String(number).padStart(2, "0");


        const updateCountdown = () => {

            const now =
                Date.now();

            const difference =
                eventDate - now;


            if (difference <= 0) {

                if (daysElement)
                    daysElement.textContent = "00";

                if (hoursElement)
                    hoursElement.textContent = "00";

                if (minutesElement)
                    minutesElement.textContent = "00";

                if (secondsElement)
                    secondsElement.textContent = "00";

                countdown.classList.add(
                    "countdown-ended"
                );

                return;

            }


            const totalSeconds =
                Math.floor(
                    difference / 1000
                );


            const days =
                Math.floor(
                    totalSeconds / 86400
                );


            const hours =
                Math.floor(
                    (totalSeconds % 86400) / 3600
                );


            const minutes =
                Math.floor(
                    (totalSeconds % 3600) / 60
                );


            const seconds =
                totalSeconds % 60;


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

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".home-reveal, .home-stagger"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
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
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetId =
                        anchor.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#"
                    ) return;


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    if (
        sections.length &&
        navLinks.length
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) return;


                        const id =
                            entry.target.id;


                        navLinks.forEach(link => {

                            const href =
                                link.getAttribute(
                                    "href"
                                );


                            link.classList.toggle(
                                "active",
                                href === `#${id}`
                            );

                        });

                    });

                },
                {
                    threshold: 0.25
                }
            );


        sections.forEach(section => {

            sectionObserver.observe(
                section
            );

        });

    }


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(
            ".home-hero-visual"
        );


    if (
        heroVisual &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        let ticking = false;


        const updateParallax = () => {

            const scroll =
                window.scrollY;

            if (scroll < window.innerHeight) {

                const movement =
                    scroll * 0.12;

                heroVisual.style.transform =
                    `translateY(calc(-50% + ${movement}px))`;

            }

            ticking = false;

        };


        window.addEventListener(
            "scroll",
            () => {

                if (!ticking) {

                    requestAnimationFrame(
                        updateParallax
                    );

                    ticking = true;

                }

            },
            { passive: true }
        );

    }


    /* =====================================================
       CARD POINTER GLOW
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".home-event-card, .home-message-card, .home-rule-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "pointermove",
            event => {

                if (
                    window.innerWidth <= 900
                ) return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                card.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );


                card.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );

            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                card.style.removeProperty(
                    "--mouse-x"
                );

                card.style.removeProperty(
                    "--mouse-y"
                );

            }
        );

    });


    /* =====================================================
       BUTTON MAGNETIC EFFECT
    ===================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".home-btn-primary, .home-register-button"
        );


    magneticButtons.forEach(button => {

        button.addEventListener(
            "pointermove",
            event => {

                if (
                    window.innerWidth <= 900
                ) return;


                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform =
                    `translate(${x * 0.08}px, ${y * 0.08}px)`;

            }
        );


        button.addEventListener(
            "pointerleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       IMAGE LAZY LOADING
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            if (
                !image.hasAttribute(
                    "loading"
                )
            ) {

                image.setAttribute(
                    "loading",
                    "lazy"
                );

            }

        });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    document
        .querySelectorAll(
            "[data-current-year]"
        )
        .forEach(element => {

            element.textContent =
                new Date()
                    .getFullYear();

        });


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add(
        "page-ready"
    );

});
