/* =========================================================
   BOTXCEL 2026
   HOME PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       EVENT COUNTDOWN
       EVENT DATE: 3 SEPTEMBER 2026
    ====================================================== */

    const countdown = document.getElementById("homeCountdown");

    const daysElement = document.getElementById("countDays");
    const hoursElement = document.getElementById("countHours");
    const minutesElement = document.getElementById("countMinutes");
    const secondsElement = document.getElementById("countSeconds");

    /*
       Change the time here if the competition
       starts at a specific time.

       Current setting:
       3 September 2026 at 00:00
    */

    const eventDate = new Date(
        "2026-09-03T00:00:00+05:30"
    ).getTime();


    function updateCountdown() {

        if (
            !daysElement ||
            !hoursElement ||
            !minutesElement ||
            !secondsElement
        ) {
            return;
        }


        const now = new Date().getTime();

        const difference = eventDate - now;


        /* Event has started */

        if (difference <= 0) {

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

            if (countdown) {

                countdown.classList.add(
                    "event-live"
                );

            }

            return;
        }


        const days = Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


        const hours = Math.floor(
            (difference %
                (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
        );


        const minutes = Math.floor(
            (difference %
                (1000 * 60 * 60)) /
                (1000 * 60)
        );


        const seconds = Math.floor(
            (difference %
                (1000 * 60)) /
                1000
        );


        daysElement.textContent =
            String(days).padStart(2, "0");


        hoursElement.textContent =
            String(hours).padStart(2, "0");


        minutesElement.textContent =
            String(minutes).padStart(2, "0");


        secondsElement.textContent =
            String(seconds).padStart(2, "0");

    }


    updateCountdown();


    setInterval(
        updateCountdown,
        1000
    );


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".home-reveal, .home-stagger"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

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

            revealObserver.observe(
                element
            );

        });

    } else {

        /* Fallback for older browsers */

        revealElements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

    }


    /* =====================================================
       HERO PARALLAX
    ====================================================== */

    const hero =
        document.querySelector(
            ".home-hero"
        );


    const heroContent =
        document.querySelector(
            ".home-hero-content"
        );


    if (
        hero &&
        heroContent &&
        window.matchMedia(
            "(min-width: 901px)"
        ).matches
    ) {

        let ticking = false;


        window.addEventListener(
            "scroll",
            () => {

                if (!ticking) {

                    window.requestAnimationFrame(
                        () => {

                            const scrollY =
                                window.scrollY;


                            if (
                                scrollY <
                                window.innerHeight
                            ) {

                                const movement =
                                    scrollY * 0.12;


                                heroContent.style.transform =
                                    `translateY(${movement}px)`;

                            }


                            ticking = false;

                        }
                    );


                    ticking = true;

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       EVENT CARD POINTER EFFECT
    ====================================================== */

    const cards =
        document.querySelectorAll(
            ".home-event-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth <
                    768
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    ((y / rect.height) - 0.5) *
                    -4;


                const rotateY =
                    ((x / rect.width) - 0.5) *
                    4;


                card.style.transform =
                    `
                    translateY(-8px)
                    perspective(700px)
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


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ====================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


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


    /* =====================================================
       BUTTON PRESS EFFECT
    ====================================================== */

    document
        .querySelectorAll(
            ".home-btn-primary, .home-btn-secondary, .home-register-button"
        )
        .forEach(button => {

            button.addEventListener(
                "mousedown",
                () => {

                    button.style.transform =
                        "scale(.97)";

                }
            );


            button.addEventListener(
                "mouseup",
                () => {

                    button.style.transform =
                        "";

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


    /* =====================================================
       PAGE LOADED
    ====================================================== */

    document.body.classList.add(
        "home-ready"
    );

});
