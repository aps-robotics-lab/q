/* =========================================================
   BOTXCEL 2026
   CINEMATIC PARTICLE SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const canvas =
        document.getElementById("particleCanvas");

    if (!canvas) {
        return;
    }


    const ctx =
        canvas.getContext("2d", {
            alpha: true
        });


    if (!ctx) {
        return;
    }


    /* =====================================================
       SETTINGS
    ===================================================== */

    const settings = {

        desktopParticles: 85,

        tabletParticles: 55,

        mobileParticles: 28,

        maxDpr: 2,

        connectionDistance: 120,

        mouseDistance: 150,

        particleSpeed: 0.18,

        mouseStrength: 0.025

    };


    /* =====================================================
       STATE
    ===================================================== */

    let width = 0;

    let height = 0;

    let dpr = 1;

    let particles = [];

    let animationFrame = null;

    let lastTime = 0;

    let isVisible = true;


    const pointer = {

        x: null,

        y: null,

        active: false

    };


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    /* =====================================================
       PARTICLE COUNT
    ===================================================== */

    function getParticleCount() {

        if (window.innerWidth <= 600) {

            return settings.mobileParticles;

        }


        if (window.innerWidth <= 900) {

            return settings.tabletParticles;

        }


        return settings.desktopParticles;

    }


    /* =====================================================
       RESIZE CANVAS
    ===================================================== */

    function resizeCanvas() {

        const rect =
            canvas.getBoundingClientRect();


        width =
            Math.max(
                1,
                rect.width
            );


        height =
            Math.max(
                1,
                rect.height
            );


        dpr =
            Math.min(
                window.devicePixelRatio || 1,
                settings.maxDpr
            );


        canvas.width =
            Math.floor(
                width * dpr
            );


        canvas.height =
            Math.floor(
                height * dpr
            );


        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );


        createParticles();

    }


    /* =====================================================
       RANDOM RANGE
    ===================================================== */

    function random(
        min,
        max
    ) {

        return (
            Math.random() *
            (max - min)
        ) + min;

    }


    /* =====================================================
       PARTICLE CLASS
    ===================================================== */

    class Particle {

        constructor() {

            this.reset();

        }


        reset() {

            this.x =
                random(
                    0,
                    width
                );


            this.y =
                random(
                    0,
                    height
                );


            this.radius =
                random(
                    0.5,
                    1.7
                );


            this.baseX =
                this.x;


            this.baseY =
                this.y;


            this.velocityX =
                random(
                    -settings.particleSpeed,
                    settings.particleSpeed
                );


            this.velocityY =
                random(
                    -settings.particleSpeed,
                    settings.particleSpeed
                );


            this.opacity =
                random(
                    0.18,
                    0.65
                );


            this.phase =
                random(
                    0,
                    Math.PI * 2
                );


            this.phaseSpeed =
                random(
                    0.0005,
                    0.0015
                );


            /*
                Mostly purple particles with occasional
                orange particles.
            */

            this.isOrange =
                Math.random() < 0.18;

        }


        update(delta) {

            /*
                Slow floating movement.
            */

            this.x +=
                this.velocityX *
                delta;


            this.y +=
                this.velocityY *
                delta;


            /*
                Very subtle organic movement.
            */

            this.phase +=
                this.phaseSpeed *
                delta;


            this.x +=
                Math.sin(
                    this.phase
                ) *
                0.03;


            this.y +=
                Math.cos(
                    this.phase * 0.8
                ) *
                0.03;


            /*
                Mouse interaction.
            */

            if (
                pointer.active &&
                pointer.x !== null &&
                pointer.y !== null
            ) {

                const dx =
                    this.x -
                    pointer.x;


                const dy =
                    this.y -
                    pointer.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance <
                    settings.mouseDistance
                ) {

                    const force =
                        (
                            settings.mouseDistance -
                            distance
                        ) /
                        settings.mouseDistance;


                    const angle =
                        Math.atan2(
                            dy,
                            dx
                        );


                    this.x +=
                        Math.cos(angle) *
                        force *
                        settings.mouseStrength *
                        delta;


                    this.y +=
                        Math.sin(angle) *
                        force *
                        settings.mouseStrength *
                        delta;

                }

            }


            /*
                Screen wrapping.
            */

            if (
                this.x < -10
            ) {

                this.x =
                    width + 10;

            }


            if (
                this.x >
                width + 10
            ) {

                this.x =
                    -10;

            }


            if (
                this.y < -10
            ) {

                this.y =
                    height + 10;

            }


            if (
                this.y >
                height + 10
            ) {

                this.y =
                    -10;

            }

        }


        draw() {

            const color =
                this.isOrange
                    ? "255, 106, 0"
                    : "139, 61, 255";


            ctx.beginPath();


            ctx.arc(
                this.x,
                this.y,
                this.radius,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(${color}, ${this.opacity})`;


            ctx.fill();

        }

    }


    /* =====================================================
       CREATE PARTICLES
    ===================================================== */

    function createParticles() {

        particles = [];


        const count =
            getParticleCount();


        for (
            let i = 0;
            i < count;
            i++
        ) {

            particles.push(
                new Particle()
            );

        }

    }


    /* =====================================================
       DRAW CONNECTIONS
    ===================================================== */

    function drawConnections() {

        const distanceLimit =
            settings.connectionDistance;


        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const first =
                    particles[i];


                const second =
                    particles[j];


                const dx =
                    first.x -
                    second.x;


                const dy =
                    first.y -
                    second.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance <
                    distanceLimit
                ) {

                    const opacity =
                        (
                            1 -
                            distance /
                            distanceLimit
                        ) *
                        0.09;


                    ctx.beginPath();


                    ctx.moveTo(
                        first.x,
                        first.y
                    );


                    ctx.lineTo(
                        second.x,
                        second.y
                    );


                    ctx.strokeStyle =
                        `rgba(139, 61, 255, ${opacity})`;


                    ctx.lineWidth =
                        0.5;


                    ctx.stroke();

                }

            }

        }

    }


    /* =====================================================
       DRAW
    ===================================================== */

    function draw() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        /*
            Connections first so particles sit above them.
        */

        drawConnections();


        particles.forEach(
            particle => {
                particle.draw();
            }
        );

    }


    /* =====================================================
       ANIMATION LOOP
    ===================================================== */

    function animate(timestamp) {

        if (
            !isVisible
        ) {

            animationFrame =
                null;

            return;

        }


        if (
            !lastTime
        ) {

            lastTime =
                timestamp;

        }


        /*
            Cap delta so the animation doesn't jump after
            a slow frame or device wake-up.
        */

        const delta =
            Math.min(
                timestamp -
                lastTime,
                40
            );


        lastTime =
            timestamp;


        /*
            With reduced motion enabled we keep the
            particles static instead of continuously moving.
        */

        if (
            !reducedMotion.matches
        ) {

            particles.forEach(
                particle => {

                    particle.update(
                        delta
                    );

                }
            );

        }


        draw();


        animationFrame =
            requestAnimationFrame(
                animate
            );

    }


    /* =====================================================
       START
    ===================================================== */

    function startAnimation() {

        if (
            animationFrame !== null
        ) {

            return;

        }


        lastTime =
            0;


        animationFrame =
            requestAnimationFrame(
                animate
            );

    }


    /* =====================================================
       STOP
    ===================================================== */

    function stopAnimation() {

        if (
            animationFrame !== null
        ) {

            cancelAnimationFrame(
                animationFrame
            );

        }


        animationFrame =
            null;

        lastTime =
            0;

    }


    /* =====================================================
       POINTER MOVE
    ===================================================== */

    function updatePointer(
        x,
        y
    ) {

        pointer.x =
            x;

        pointer.y =
            y;

        pointer.active =
            true;

    }


    /* =====================================================
       MOUSE
    ===================================================== */

    window.addEventListener(
        "pointermove",
        event => {

            updatePointer(
                event.clientX,
                event.clientY
            );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       POINTER LEAVE
    ===================================================== */

    window.addEventListener(
        "pointerleave",
        () => {

            pointer.active =
                false;

        }
    );


    /* =====================================================
       TOUCH
    ===================================================== */

    window.addEventListener(
        "touchstart",
        event => {

            if (
                event.touches.length
            ) {

                updatePointer(
                    event.touches[0].clientX,
                    event.touches[0].clientY
                );

            }

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "touchmove",
        event => {

            if (
                event.touches.length
            ) {

                updatePointer(
                    event.touches[0].clientX,
                    event.touches[0].clientY
                );

            }

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "touchend",
        () => {

            pointer.active =
                false;

        },
        {
            passive: true
        }
    );


    /* =====================================================
       WINDOW RESIZE
    ===================================================== */

    let resizeTimer = null;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    () => {

                        resizeCanvas();

                    },
                    150
                );

        }
    );


    /* =====================================================
       TAB VISIBILITY
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            isVisible =
                !document.hidden;


            if (
                isVisible
            ) {

                startAnimation();

            } else {

                stopAnimation();

            }

        }
    );


    /* =====================================================
       REDUCED MOTION CHANGE
    ===================================================== */

    if (
        reducedMotion.addEventListener
    ) {

        reducedMotion.addEventListener(
            "change",
            () => {

                createParticles();

            }
        );

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    resizeCanvas();


    startAnimation();

});
