/* =========================================================
   APS LBS ROBOKRITI 2026
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PRELOADER
       Fast — never waits for Firebase
    ===================================================== */

    const preloader = document.querySelector(".preloader");

    if (preloader) {
        const hidePreloader = () => {
            setTimeout(() => {
                preloader.classList.add("loaded");

                setTimeout(() => {
                    preloader.remove();
                }, 500);

            }, 450);
        };

        if (document.readyState === "complete") {
            hidePreloader();
        } else {
            window.addEventListener("load", hidePreloader, {
                once: true
            });

            // Safety fallback
            setTimeout(hidePreloader, 1600);
        }
    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header = document.querySelector(".site-header");

    const updateHeader = () => {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mainNav =
        document.querySelector(".main-nav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mainNav.classList.toggle("open");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });


        // Close menu after clicking a link

        mainNav
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        mainNav.classList.remove("open");

                        menuToggle.classList.remove(
                            "active"
                        );

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            });

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            "[data-reveal]"
        );

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("revealed");
        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    if (
        navLinks.length &&
        sections.length
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const id =
                                entry.target.id;

                            navLinks.forEach(link => {

                                link.classList.toggle(
                                    "active",
                                    link.getAttribute(
                                        "href"
                                    ) === `#${id}`
                                );

                            });

                        }

                    });

                },
                {
                    threshold: 0.35
                }
            );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
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

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }
            );

        });


    /* =====================================================
       COUNTDOWN
       EVENT:
       2 SEPTEMBER 2026
    ===================================================== */

    const countdown =
        document.querySelector(
            "[data-countdown]"
        );

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
         * Event starts at midnight on
         * 2 September 2026.
         *
         * Date is interpreted in the
         * visitor's local timezone.
         */

        const eventDate =
            new Date(
                2026,
                8,
                2,
                0,
                0,
                0
            );


        const pad = number =>
            String(number).padStart(2, "0");


        const updateCountdown = () => {

            const now =
                new Date();

            const difference =
                eventDate.getTime() -
                now.getTime();


            if (difference <= 0) {

                if (daysElement)
                    daysElement.textContent = "00";

                if (hoursElement)
                    hoursElement.textContent = "00";

                if (minutesElement)
                    minutesElement.textContent = "00";

                if (secondsElement)
                    secondsElement.textContent = "00";

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


            if (daysElement)
                daysElement.textContent =
                    pad(days);

            if (hoursElement)
                hoursElement.textContent =
                    pad(hours);

            if (minutesElement)
                minutesElement.textContent =
                    pad(minutes);

            if (secondsElement)
                secondsElement.textContent =
                    pad(seconds);

        };


        updateCountdown();

        setInterval(
            updateCountdown,
            1000
        );

    }


    /* =====================================================
       MOUSE PARALLAX
       Only desktop
    ===================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        heroVisual &&
        !prefersReducedMotion &&
        window.innerWidth > 900
    ) {

        let animationFrame;

        document.addEventListener(
            "mousemove",
            event => {

                if (animationFrame) {
                    cancelAnimationFrame(
                        animationFrame
                    );
                }

                animationFrame =
                    requestAnimationFrame(() => {

                        const x =
                            (
                                event.clientX /
                                window.innerWidth -
                                0.5
                            ) * 10;

                        const y =
                            (
                                event.clientY /
                                window.innerHeight -
                                0.5
                            ) * 10;


                        heroVisual.style.transform =
                            `translate3d(${x}px, ${y}px, 0)`;

                    });

            },
            { passive: true }
        );

    }


    /* =====================================================
       BUTTON RIPPLE
    ===================================================== */

    document
        .querySelectorAll(".btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    const ripple =
                        document.createElement(
                            "span"
                        );

                    ripple.style.position =
                        "absolute";

                    ripple.style.width =
                        "10px";

                    ripple.style.height =
                        "10px";

                    ripple.style.borderRadius =
                        "50%";

                    ripple.style.background =
                        "rgba(255,255,255,.25)";

                    ripple.style.pointerEvents =
                        "none";

                    const rect =
                        button.getBoundingClientRect();

                    ripple.style.left =
                        `${event.clientX - rect.left - 5}px`;

                    ripple.style.top =
                        `${event.clientY - rect.top - 5}px`;

                    ripple.animate(
                        [
                            {
                                transform:
                                    "scale(1)",
                                opacity: 1
                            },
                            {
                                transform:
                                    "scale(25)",
                                opacity: 0
                            }
                        ],
                        {
                            duration: 550,
                            easing:
                                "cubic-bezier(.2,.7,.2,1)"
                        }
                    );

                    if (
                        getComputedStyle(button)
                            .position === "static"
                    ) {
                        button.style.position =
                            "relative";
                    }

                    button.style.overflow =
                        "hidden";

                    button.appendChild(
                        ripple
                    );

                    setTimeout(() => {
                        ripple.remove();
                    }, 600);

                }
            );

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
                new Date().getFullYear();

        });


    /* =====================================================
       CONSOLE BRANDING
    ===================================================== */

    console.log(
        "%cAPS LBS ROBOKRITI 2026",
        "color:#ff4d00;font-size:18px;font-weight:bold;"
    );

    console.log(
        "%cRobotics • Engineering • Competition",
        "color:#9299a1;font-size:12px;"
    );

});
