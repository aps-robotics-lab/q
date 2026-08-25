/* =========================================================
   ROBOKRITI — HOME.JS
   Fast + Cinematic + Lightweight
   ========================================================= */

(function () {
    "use strict";

    /* =======================================================
       DOM READY
       ======================================================= */

    document.addEventListener("DOMContentLoaded", () => {

        initFastPreloader();
        initScrollReveal();
        initSmoothScroll();
        initParallaxGlow();
        initButtonEffects();
        initVideoHandling();

    });


    /* =======================================================
       FAST PRELOADER
       Never keep the visitor waiting unnecessarily
       ======================================================= */

    function initFastPreloader() {

        const preloader = document.getElementById("preloader");

        if (!preloader) return;

        const startTime = performance.now();

        function hidePreloader() {

            if (!preloader || preloader.dataset.hidden === "true") {
                return;
            }

            preloader.dataset.hidden = "true";

            preloader.classList.add("preloader-hidden");

            document.documentElement.classList.remove("loading");
            document.body.classList.remove("loading");

            setTimeout(() => {
                preloader.style.display = "none";
            }, 650);
        }

        /*
         * Don't wait for every image/video.
         * The page becomes usable quickly.
         */

        const minimumTime = 450;

        if (document.readyState === "complete") {

            const elapsed = performance.now() - startTime;

            setTimeout(
                hidePreloader,
                Math.max(0, minimumTime - elapsed)
            );

        } else {

            window.addEventListener("load", () => {

                const elapsed = performance.now() - startTime;

                setTimeout(
                    hidePreloader,
                    Math.max(0, minimumTime - elapsed)
                );

            }, { once: true });

        }

        /*
         * Absolute safety fallback.
         * Preloader can NEVER trap the user.
         */

        setTimeout(hidePreloader, 1800);
    }


    /* =======================================================
       SCROLL REVEAL
       ======================================================= */

    function initScrollReveal() {

        const elements = document.querySelectorAll(
            ".home-reveal, .home-stagger"
        );

        if (!elements.length) return;

        /*
         * If browser doesn't support IntersectionObserver,
         * simply show everything.
         */

        if (!("IntersectionObserver" in window)) {

            elements.forEach(element => {
                element.classList.add("visible");
            });

            return;
        }

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("visible");

                    observerInstance.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px 0px"
            }
        );

        elements.forEach(element => {
            observer.observe(element);
        });
    }


    /* =======================================================
       SMOOTH SCROLL
       ======================================================= */

    function initSmoothScroll() {

        const links = document.querySelectorAll(
            'a[href^="#"]'
        );

        if (!links.length) return;

        links.forEach(link => {

            link.addEventListener("click", function (event) {

                const targetID = this.getAttribute("href");

                if (!targetID || targetID === "#") {
                    return;
                }

                const target = document.querySelector(targetID);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });
    }


    /* =======================================================
       SUBTLE CINEMATIC PARALLAX
       ======================================================= */

    function initParallaxGlow() {

        const home = document.querySelector(".home-page");

        if (!home) return;

        /*
         * Disable on touch devices.
         */

        if (
            window.matchMedia &&
            window.matchMedia("(pointer: coarse)").matches
        ) {
            return;
        }

        let ticking = false;

        window.addEventListener(
            "mousemove",
            event => {

                if (ticking) return;

                window.requestAnimationFrame(() => {

                    const x =
                        (event.clientX / window.innerWidth - 0.5);

                    const y =
                        (event.clientY / window.innerHeight - 0.5);

                    home.style.setProperty(
                        "--mouse-x",
                        `${x * 25}px`
                    );

                    home.style.setProperty(
                        "--mouse-y",
                        `${y * 25}px`
                    );

                    ticking = false;

                });

                ticking = true;

            },
            { passive: true }
        );
    }


    /* =======================================================
       BUTTON MICRO INTERACTION
       ======================================================= */

    function initButtonEffects() {

        const buttons = document.querySelectorAll(
            ".home-actions a, .home-register-button"
        );

        if (!buttons.length) return;

        buttons.forEach(button => {

            button.addEventListener(
                "pointerdown",
                () => {
                    button.style.transform = "scale(0.97)";
                }
            );

            button.addEventListener(
                "pointerup",
                () => {
                    button.style.transform = "";
                }
            );

            button.addEventListener(
                "pointercancel",
                () => {
                    button.style.transform = "";
                }
            );

        });
    }


    /* =======================================================
       VIDEO HANDLING
       ======================================================= */

    function initVideoHandling() {

        const videos = document.querySelectorAll(
            ".home-video video"
        );

        if (!videos.length) return;

        videos.forEach(video => {

            /*
             * Keep videos muted for autoplay compatibility.
             */

            video.muted = true;
            video.playsInline = true;

            /*
             * Don't force autoplay if the browser blocks it.
             */

            const playVideo = () => {

                const promise = video.play();

                if (promise && typeof promise.catch === "function") {
                    promise.catch(() => {
                        /* Browser blocked autoplay — silently ignore. */
                    });
                }

            };

            /*
             * Play when visible instead of loading everything
             * immediately.
             */

            if ("IntersectionObserver" in window) {

                const observer = new IntersectionObserver(
                    entries => {

                        entries.forEach(entry => {

                            if (entry.isIntersecting) {
                                playVideo();
                            } else {
                                video.pause();
                            }

                        });

                    },
                    {
                        threshold: 0.15
                    }
                );

                observer.observe(video);

            } else {

                playVideo();

            }

        });
    }


    /* =======================================================
       MOBILE PERFORMANCE
       ======================================================= */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (!document.hidden) return;

            document
                .querySelectorAll(".home-video video")
                .forEach(video => video.pause());

        }
    );


    /* =======================================================
       PRELOADER FALLBACK CLASS
       ======================================================= */

    const style = document.createElement("style");

    style.textContent = `
        #preloader {
            transition:
                opacity 0.55s ease,
                visibility 0.55s ease;
        }

        #preloader.preloader-hidden {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }

        .home-page {
            --mouse-x: 0px;
            --mouse-y: 0px;
        }

        .home-page::before {
            transform:
                translate3d(
                    var(--mouse-x),
                    var(--mouse-y),
                    0
                );
        }

        @media (prefers-reduced-motion: reduce) {

            #preloader {
                transition: opacity 0.2s ease;
            }

            .home-page::before {
                transform: none !important;
            }

        }
    `;

    document.head.appendChild(style);


})();
