/* =========================================================
   BOTXCEL 2026
   HOME PAGE
========================================================= */


/* =========================================================
   HERO
========================================================= */

.home-hero {

    min-height: 100vh;

    position: relative;

    display: flex;
    align-items: center;

    overflow: hidden;

    background:
        radial-gradient(
            circle at 75% 35%,
            rgba(125, 70, 190, .16),
            transparent 32%
        ),
        radial-gradient(
            circle at 20% 80%,
            rgba(70, 70, 180, .08),
            transparent 30%
        ),
        #050505;
}


/* animated grid */

.home-hero::before {

    content: "";

    position: absolute;

    inset: 0;

    background-image:
        linear-gradient(
            rgba(255,255,255,.035) 1px,
            transparent 1px
        ),
        linear-gradient(
            90deg,
            rgba(255,255,255,.035) 1px,
            transparent 1px
        );

    background-size:
        70px 70px;

    mask-image:
        linear-gradient(
            to bottom,
            black,
            transparent 85%
        );

    animation:
        gridMove 16s linear infinite;

    pointer-events: none;
}


@keyframes gridMove {

    from {
        transform: translateY(0);
    }

    to {
        transform: translateY(70px);
    }
}


/* =========================================================
   HERO CONTENT
========================================================= */

.home-hero-content {

    position: relative;

    z-index: 2;

    width: min(
        1200px,
        calc(100% - 48px)
    );

    margin: 0 auto;

    padding-top: 100px;
}


.home-eyebrow {

    display: inline-flex;

    align-items: center;

    gap: 10px;

    margin-bottom: 25px;

    font-family:
        "Space Mono",
        monospace;

    font-size: 11px;

    letter-spacing: 3px;

    color:
        rgba(255,255,255,.55);
}


.home-eyebrow::before {

    content: "";

    width: 30px;
    height: 1px;

    background:
        rgba(255,255,255,.5);
}


.home-title {

    margin: 0;

    font-size:
        clamp(
            72px,
            13vw,
            180px
        );

    line-height: .78;

    letter-spacing:
        -8px;

    font-weight: 800;

    color: #ffffff;

    text-transform: uppercase;
}


.home-title span {

    display: block;

    margin-left:
        clamp(
            35px,
            8vw,
            110px
        );

    margin-top: 18px;

    font-family:
        "Space Mono",
        monospace;

    font-size:
        clamp(
            28px,
            5vw,
            70px
        );

    line-height: 1;

    letter-spacing:
        3px;

    color:
        rgba(255,255,255,.25);
}


.home-description {

    max-width: 610px;

    margin:
        35px 0 0;

    font-size:
        clamp(
            15px,
            1.7vw,
            19px
        );

    line-height: 1.75;

    color:
        rgba(255,255,255,.62);
}


/* =========================================================
   HERO META
========================================================= */

.home-meta {

    display: flex;

    flex-wrap: wrap;

    gap: 10px;

    margin-top: 30px;
}


.home-meta-item {

    padding:
        9px 13px;

    border:
        1px solid
        rgba(255,255,255,.11);

    background:
        rgba(255,255,255,.025);

    font-family:
        "Space Mono",
        monospace;

    font-size: 9px;

    letter-spacing: 1.5px;

    color:
        rgba(255,255,255,.55);
}


/* =========================================================
   BUTTONS
========================================================= */

.home-actions {

    display: flex;

    flex-wrap: wrap;

    gap: 12px;

    margin-top: 30px;
}


.home-btn-primary,
.home-btn-secondary {

    display: inline-flex;

    align-items: center;
    justify-content: center;

    min-height: 52px;

    padding:
        0 25px;

    text-decoration: none;

    font-family:
        "Space Mono",
        monospace;

    font-size: 10px;

    letter-spacing: 1.5px;

    text-transform: uppercase;

    transition:
        transform .3s ease,
        background .3s ease,
        border-color .3s ease;
}


.home-btn-primary {

    color: #050505;

    background: #ffffff;

    border:
        1px solid
        #ffffff;
}


.home-btn-primary:hover {

    transform:
        translateY(-4px);

    background:
        transparent;

    color: #ffffff;
}


.home-btn-secondary {

    color: #ffffff;

    border:
        1px solid
        rgba(255,255,255,.2);

    background:
        rgba(255,255,255,.025);
}


.home-btn-secondary:hover {

    transform:
        translateY(-4px);

    border-color:
        rgba(255,255,255,.55);
}


/* =========================================================
   SCROLL
========================================================= */

.home-scroll {

    position: absolute;

    bottom: 30px;

    left: 50%;

    transform:
        translateX(-50%);

    z-index: 3;

    display: flex;

    align-items: center;

    flex-direction: column;

    gap: 10px;
}


.home-scroll span {

    font-family:
        "Space Mono",
        monospace;

    font-size: 8px;

    letter-spacing: 3px;

    text-transform: uppercase;

    color:
        rgba(255,255,255,.4);
}


.home-scroll-line {

    width: 1px;

    height: 50px;

    background:
        linear-gradient(
            to bottom,
            rgba(255,255,255,.6),
            transparent
        );

    animation:
        scrollLine 1.8s ease-in-out infinite;
}


@keyframes scrollLine {

    0%,
    100% {
        transform: scaleY(.45);
        transform-origin: top;
    }

    50% {
        transform: scaleY(1);
        transform-origin: top;
    }
}


/* =========================================================
   GENERAL SECTIONS
========================================================= */

.home-section {

    width: min(
        1200px,
        calc(100% - 48px)
    );

    margin:
        0 auto;

    padding:
        140px 0;
}


.home-section-label {

    margin-bottom: 18px;

    font-family:
        "Space Mono",
        monospace;

    font-size: 9px;

    letter-spacing: 3px;

    color:
        rgba(255,255,255,.35);

    text-transform: uppercase;
}


.home-section-title {

    margin: 0;

    max-width: 800px;

    font-size:
        clamp(
            42px,
            7vw,
            88px
        );

    line-height: .95;

    letter-spacing:
        -4px;

    font-weight: 700;

    color: #ffffff;
}


.home-section-title em {

    font-style: normal;

    color:
        rgba(255,255,255,.25);
}


/* =========================================================
   EVENTS
========================================================= */

.home-events {

    display: grid;

    grid-template-columns:
        repeat(
            2,
            minmax(0, 1fr)
        );

    gap: 1px;

    margin-top: 70px;

    background:
        rgba(255,255,255,.08);
}


.home-event-card {

    position: relative;

    min-height: 360px;

    overflow: hidden;

    background:
        #080808;

    transition:
        transform .45s ease,
        background .45s ease;
}


.home-event-card::before {

    content: "";

    position: absolute;

    inset: 0;

    background:
        radial-gradient(
            circle at 80% 20%,
            rgba(255,255,255,.08),
            transparent 30%
        );

    opacity: 0;

    transition:
        opacity .45s ease;
}


.home-event-card:hover {

    background:
        #0d0d0d;

    transform:
        translateY(-8px);
}


.home-event-card:hover::before {

    opacity: 1;
}


.home-event-content {

    position: relative;

    z-index: 2;

    height: 100%;

    padding: 42px;

    display: flex;

    flex-direction: column;

    justify-content: flex-end;
}


.home-event-number {

    position: absolute;

    top: 38px;
    left: 42px;

    font-family:
        "Space Mono",
        monospace;

    font-size: 9px;

    letter-spacing: 2px;

    color:
        rgba(255,255,255,.3);
}


.home-event-title {

    margin: 0 0 15px;

    font-size:
        clamp(
            30px,
            4vw,
            48px
        );

    letter-spacing:
        -2px;

    color: #ffffff;
}


.home-event-description {

    max-width: 500px;

    margin: 0;

    line-height: 1.7;

    font-size: 14px;

    color:
        rgba(255,255,255,.5);
}


.home-event-link {

    display: inline-flex;

    align-items: center;

    gap: 14px;

    width: fit-content;

    margin-top: 25px;

    text-decoration: none;

    font-family:
        "Space Mono",
        monospace;

    font-size: 9px;

    letter-spacing: 1.5px;

    color: #ffffff;
}


.home-event-link span {

    transition:
        transform .3s ease;
}


.home-event-link:hover span {

    transform:
        translateX(8px);
}


/* =========================================================
   VIDEO
========================================================= */

.home-video {

    position: relative;

    min-height:
        620px;

    margin-top: 70px;

    overflow: hidden;

    background:
        radial-gradient(
            circle at 50% 40%,
            rgba(110,70,170,.2),
            transparent 40%
        ),
        #080808;

    border:
        1px solid
        rgba(255,255,255,.08);
}


.home-video-placeholder {

    position: absolute;

    inset: 0;

    display: flex;

    align-items: center;

    justify-content: center;

    flex-direction: column;

    gap: 18px;
}


.video-placeholder-icon {

    width: 75px;
    height: 75px;

    border-radius: 50%;

    display: flex;

    align-items: center;
    justify-content: center;

    border:
        1px solid
        rgba(255,255,255,.25);

    color: #ffffff;

    transition:
        transform .3s ease;
}


.home-video:hover
.video-placeholder-icon {

    transform:
        scale(1.08);
}


.home-video-placeholder span {

    font-family:
        "Space Mono",
        monospace;

    font-size: 9px;

    letter-spacing: 3px;

    color:
        rgba(255,255,255,.35);
}


.home-video-overlay {

    position: absolute;

    inset: 0;

    background:
        linear-gradient(
            90deg,
            rgba(0,0,0,.85),
            rgba(0,0,0,.25),
            rgba(0,0,0,.7)
        );
}


.home-video-content {

    position: absolute;

    z-index: 3;

    left: 55px;

    bottom: 55px;

    max-width: 560px;
}


.home-video-title {

    margin: 15px 0;

    font-size:
        clamp(
            55px,
            8vw,
            100px
        );

    line-height: .8;

    letter-spacing:
        -5px;

    color: #ffffff;
}


.home-video-text {

    max-width: 500px;

    line-height: 1.7;

    font-size: 14px;

    color:
        rgba(255,255,255,.55);
}


/* =========================================================
   INFORMATION CARDS
========================================================= */

.home-rules {

    display: grid;

    grid-template-columns:
        repeat(
            3,
            minmax(0,1fr)
        );

    gap: 1px;

    margin-top: 70px;

    background:
        rgba(255,255,255,.08);
}


.home-rule-card {

    min-height: 270px;

    padding: 35px;

    background:
        #080808;

    transition:
        background .3s ease,
        transform .3s ease;
}


.home-rule-card:hover {

    background:
        #0e0e0e;

    transform:
        translateY(-5px);
}


.home-rule-number {

    font-family:
        "Space Mono",
        monospace;

    font-size: 8px;

    letter-spacing: 2px;

    color:
        rgba(255,255,255,.3);
}


.home-rule-card h3 {

    margin:
        65px 0 12px;

    font-size: 22px;

    letter-spacing:
        -.5px;

    color: #ffffff;
}


.home-rule-card p {

    margin: 0;

    font-size: 13px;

    line-height: 1.7;

    color:
        rgba(255,255,255,.45);
}


/* =========================================================
   ANNOUNCEMENTS
========================================================= */

.home-announcements {

    margin-top: 70px;

    border-top:
        1px solid
        rgba(255,255,255,.1);
}


.home-announcement {

    display: grid;

    grid-template-columns:
        70px 1fr 40px;

    gap: 25px;

    align-items: center;

    padding:
        30px 0;

    border-bottom:
        1px solid
        rgba(255,255,255,.1);

    transition:
        padding .3s ease;
}


.home-announcement:hover {

    padding-left: 12px;
}


.home-announcement-index {

    font-family:
        "Space Mono",
        monospace;

    font-size: 10px;

    color:
        rgba(255,255,255,.3);
}


.home-announcement-text h3 {

    margin: 0 0 7px;

    font-size: 18px;

    color: #ffffff;
}


.home-announcement-text p {

    margin: 0;

    font-size: 13px;

    color:
        rgba(255,255,255,.4);
}


.home-announcement-arrow {

    font-size: 22px;

    color:
        rgba(255,255,255,.4);

    transition:
        transform .3s ease;
}


.home-announcement:hover
.home-announcement-arrow {

    transform:
        translateX(8px);

    color: #ffffff;
}


/* =========================================================
   MESSAGE CARDS
========================================================= */

.home-message-grid {

    display: grid;

    grid-template-columns:
        repeat(
            2,
            minmax(0,1fr)
        );

    gap: 20px;

    margin-top: 70px;
}


.home-message-card {

    padding: 45px;

    border:
        1px solid
        rgba(255,255,255,.09);

    background:
        linear-gradient(
            145deg,
            rgba(255,255,255,.035),
            rgba(255,255,255,.01)
        );
}


.home-message-role {

    font-family:
        "Space Mono",
        monospace;

    font-size: 8px;

    letter-spacing: 3px;

    color:
        rgba(255,255,255,.35);
}


.home-message-card h2 {

    margin:
        45px 0 20px;

    font-size: 28px;

    color: #ffffff;
}


.home-message-card p {

    margin: 0;

    line-height: 1.8;

    font-size: 14px;

    color:
        rgba(255,255,255,.5);
}


/* =========================================================
   REGISTRATION CTA
========================================================= */

.home-register {

    position: relative;

    padding:
        clamp(
            50px,
            8vw,
            100px
        );

    overflow: hidden;

    text-align: center;

    border:
        1px solid
        rgba(255,255,255,.1);

    background:
        radial-gradient(
            circle at 50% 0%,
            rgba(130,80,180,.2),
            transparent 55%
        ),
        #090909;
}


.home-register::before {

    content:
        "BOTXCEL";

    position: absolute;

    left: 50%;

    top: 50%;

    transform:
        translate(
            -50%,
            -50%
        );

    font-size:
        clamp(
            80px,
            18vw,
            240px
        );

    font-weight: 800;

    letter-spacing:
        -10px;

    color:
        rgba(255,255,255,.018);

    pointer-events: none;
}


.home-register-title {

    position: relative;

    z-index: 2;

    margin: 0;

    font-size:
        clamp(
            50px,
            8vw,
            100px
        );

    line-height: .85;

    letter-spacing:
        -5px;

    color: #ffffff;
}


.home-register-title em {

    font-style: normal;

    color:
        rgba(255,255,255,.3);
}


.home-register-text {

    position: relative;

    z-index: 2;

    max-width: 520px;

    margin:
        30px auto;

    font-size: 14px;

    line-height: 1.7;

    color:
        rgba(255,255,255,.5);
}


.home-register-button {

    position: relative;

    z-index: 2;

    display: inline-flex;

    align-items: center;
    justify-content: center;

    min-height: 55px;

    padding:
        0 30px;

    background: #ffffff;

    color: #050505;

    text-decoration: none;

    font-family:
        "Space Mono",
        monospace;

    font-size: 10px;

    letter-spacing: 1.5px;

    text-transform: uppercase;

    transition:
        transform .3s ease,
        background .3s ease,
        color .3s ease;
}


.home-register-button:hover {

    transform:
        translateY(-5px);

    background:
        transparent;

    color: #ffffff;

    border:
        1px solid
        rgba(255,255,255,.3);
}


/* =========================================================
   REVEAL ANIMATION
========================================================= */

.home-reveal {

    opacity: 0;

    transform:
        translateY(45px);

    transition:
        opacity .9s ease,
        transform .9s ease;
}


.home-reveal.visible {

    opacity: 1;

    transform:
        translateY(0);
}


/* =========================================================
   STAGGER
========================================================= */

.home-stagger > * {

    opacity: 0;

    transform:
        translateY(25px);

    transition:
        opacity .7s ease,
        transform .7s ease;
}


.home-stagger.visible > * {

    opacity: 1;

    transform:
        translateY(0);
}


.home-stagger.visible > *:nth-child(1) {
    transition-delay: .05s;
}


.home-stagger.visible > *:nth-child(2) {
    transition-delay: .12s;
}


.home-stagger.visible > *:nth-child(3) {
    transition-delay: .19s;
}


.home-stagger.visible > *:nth-child(4) {
    transition-delay: .26s;
}


.home-stagger.visible > *:nth-child(5) {
    transition-delay: .33s;
}


.home-stagger.visible > *:nth-child(6) {
    transition-delay: .40s;
}


/* =========================================================
   COUNTDOWN LIVE STATE
========================================================= */

.home-countdown.event-live {

    border-color:
        rgba(255,255,255,.35);

    animation:
        countdownPulse 1.5s ease-in-out infinite;
}


@keyframes countdownPulse {

    0%,
    100% {
        box-shadow:
            0 0 0
            rgba(255,255,255,0);
    }

    50% {
        box-shadow:
            0 0 35px
            rgba(255,255,255,.12);
    }
}


/* =========================================================
   TABLET
========================================================= */

@media (max-width: 900px) {

    .home-section {

        padding:
            100px 0;
    }


    .home-events {

        grid-template-columns:
            1fr;
    }


    .home-rules {

        grid-template-columns:
            repeat(
                2,
                minmax(0,1fr)
            );
    }


    .home-video {

        min-height:
            520px;
    }


    .home-message-grid {

        grid-template-columns:
            1fr;
    }

}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 600px) {

    .home-hero {

        min-height:
            900px;
    }


    .home-hero-content {

        width:
            calc(100% - 36px);

        padding-top:
            110px;
    }


    .home-title {

        letter-spacing:
            -5px;
    }


    .home-description {

        margin-top:
            28px;
    }


    .home-meta {

        flex-direction:
            column;

        align-items:
            flex-start;
    }


    .home-actions {

        flex-direction:
            column;

        width: 100%;
    }


    .home-btn-primary,
    .home-btn-secondary {

        width: 100%;
    }


    .home-section {

        width:
            calc(100% - 36px);

        padding:
            80px 0;
    }


    .home-section-title {

        letter-spacing:
            -2.5px;
    }


    .home-event-card {

        min-height:
            330px;
    }


    .home-event-content {

        padding:
            30px;
    }


    .home-event-number {

        top: 28px;
        left: 30px;
    }


    .home-rules {

        grid-template-columns:
            1fr;
    }


    .home-rule-card {

        min-height:
            240px;

        padding:
            30px;
    }


    .home-rule-card h3 {

        margin-top:
            55px;
    }


    .home-video {

        min-height:
            500px;
    }


    .home-video-content {

        left: 25px;
        right: 25px;

        bottom: 30px;
    }


    .home-video-title {

        letter-spacing:
            -3px;
    }


    .home-announcement {

        grid-template-columns:
            35px 1fr 20px;

        gap: 12px;
    }


    .home-announcement-text h3 {

        font-size:
            15px;
    }


    .home-message-card {

        padding:
            30px;
    }


    .home-register {

        padding:
            60px 25px;
    }


    .home-register-title {

        letter-spacing:
            -3px;
    }


    .home-scroll {

        display: none;
    }

}


/* =========================================================
   REDUCED MOTION
========================================================= */

@media (prefers-reduced-motion: reduce) {

    .home-hero::before,
    .home-scroll-line,
    .home-countdown.event-live {

        animation: none;
    }


    .home-reveal,
    .home-stagger > * {

        opacity: 1;

        transform: none;

        transition: none;
    }

}
