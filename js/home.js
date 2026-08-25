/* =========================================================
   BOTXCEL 2026 — HOME PAGE JAVASCRIPT
   Navigation • Countdown • Scroll Reveal • Motion
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

            mainNav.classList.toggle("nav-open", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            document.body.classList.toggle(
                "menu-active",
                isOpen
            );

        });


        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("menu-open");

                mainNav.classList.remove("nav-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-active"
                );

            });

        });

    }


    /* =====================================================
       ESCAPE KEY — CLOSE MOBILE MENU
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") return;

        if (!menuToggle || !mainNav) return;

        menuToggle.classList.remove("menu-open");

        mainNav.classList.remove("nav-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "menu-active"
        );

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");

        if (!href) return;

        const linkPage =
            href.split("/")
                .pop()
                .split("#")[0]
                .toLowerCase();

        if (
            linkPage === currentPage ||
            (
                currentPage === "" &&
                linkPage === "index.html"
            )
        ) {

            link.classList.add("active");

        }

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".home-reveal, .home-stagger"
        );

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting)
                            return;

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );

        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       COUNTDOWN
       Change this date to your actual event date.
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
         * BOTXCEL 2026 EVENT DATE
         *
         * Change this to your real date/time.
         *
         * Format:
         * YYYY-MM-DDTHH:MM:SS
         */

        const eventDate =
            new Date(
                "2026-12-20T09:00:00"
            ).getTime();


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
                    "event-live"
                );

                return;

            }


            const days =
                Math.floor(
                    difference /
                    (1000 * 60 * 60 * 24)
                );


            const hours =
                Math.floor(
                    (difference /
                        (1000 * 60 * 60)) %
                    24
                );


            const minutes =
                Math.floor(
                    (difference /
                        (1000 * 60)) %
                    60
                );


            const seconds =
                Math.floor(
                    (difference / 1000) %
                    60
                );


            if (daysElement)
                daysElement.textContent =
                    String(days).padStart(2, "0");


            if (hoursElement)
                hoursElement.textContent =
                    String(hours).padStart(2, "0");


            if (minutesElement)
                minutesElement.textContent =
                    String(minutes).padStart(2, "0");


            if (secondsElement)
                secondsElement.textContent =
                    String(seconds).padStart(2, "0");

        };


        updateCountdown();

        setInterval(
            updateCountdown,
            1000
        );

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


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
       HEADER SCROLL EFFECT
    ===================================================== */

    const header =
        document.querySelector(
            ".site-header"
        );


    const updateHeader =
        () => {

            if (!header) return;

            if (window.scrollY > 30) {

                header.classList.add(
                    "header-scrolled"
                );

            } else {

                header.classList.remove(
                    "header-scrolled"
                );

            }

        };


    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       CARD MOUSE MOVEMENT
       Desktop only
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".home-event-card"
        );


    if (
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        cards.forEach(card => {

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
                        `
                        translateY(-8px)
                        perspective(900px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        `;

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
       HERO PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(
            ".home-hero-visual"
        );


    if (
        heroVisual &&
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        window.addEventListener(
            "mousemove",
            event => {

                const x =
                    (event.clientX /
                        window.innerWidth -
                        0.5);

                const y =
                    (event.clientY /
                        window.innerHeight -
                        0.5);


                heroVisual.style.transform =
                    `
                    translate(
                        ${x * -18}px,
                        calc(-50% + ${y * -14}px)
                    )
                    `;

            }
        );

    }


    /* =====================================================
       BUTTON MAGNETIC EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".home-btn-primary, .home-btn-secondary, .home-register-button"
        );


    if (
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        buttons.forEach(button => {

            button.addEventListener(
                "mousemove",
                event => {

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
                        `
                        translate(
                            ${x * 0.08}px,
                            ${y * 0.08}px
                        )
                        `;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       IMAGE LAZY LOAD
    ===================================================== */

    const images =
        document.querySelectorAll(
            "img[data-src]"
        );


    if ("IntersectionObserver" in window) {

        const imageObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const image =
                            entry.target;


                        image.src =
                            image.dataset.src;


                        image.removeAttribute(
                            "data-src"
                        );


                        imageObserver.unobserve(
                            image
                        );

                    });

                },
                {
                    rootMargin:
                        "200px 0px"
                }
            );


        images.forEach(image => {

            imageObserver.observe(image);

        });

    }


    /* =====================================================
       VIDEO PLACEHOLDER
    ===================================================== */

    const videoPlaceholder =
        document.querySelector(
            ".home-video-placeholder"
        );


    const video =
        document.querySelector(
            ".home-video video"
        );


    if (video && videoPlaceholder) {

        video.addEventListener(
            "loadeddata",
            () => {

                videoPlaceholder.style.display =
                    "none";

            }
        );

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    document
        .querySelectorAll(
            "[data-current-year]"
        )
        .forEach(element => {

            element.textContent =
                new Date().getFullYear();

        });


    /* =====================================================
       PAGE LOADED
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});
