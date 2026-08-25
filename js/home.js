/* =========================================================
   BOTXCEL 2026
   HOME — CINEMATIC LAUNCH CONTROLLER
   STEP 4
========================================================= */


/* =========================================================
   CONFIGURATION
========================================================= */

const LAUNCH_CONFIG = {

    /*
     * Time before each stage changes.
     * We will tune these after seeing the animation.
     */

    stageDuration: 1100,

    /*
     * Maximum time the launch is allowed to run.
     *
     * This is the emergency safety limit.
     */

    maximumDuration: 8500

};


/* =========================================================
   INITIALIZE
========================================================= */

function initializeLaunch() {

    const launch =
        document.getElementById("launch");


    if (!launch) {

        return;

    }


    const stages =
        Array.from(
            launch.querySelectorAll(
                ".launch-stage"
            )
        );


    if (!stages.length) {

        return;

    }


    let currentStage = 0;

    let finished = false;

    let stageTimer = null;

    let safetyTimer = null;



    /* =====================================================
       HIDE ALL STAGES
    ===================================================== */

    function resetStages() {

        stages.forEach(
            (stage) => {

                stage.classList.remove(
                    "stage-visible",
                    "stage-complete"
                );

            }
        );

    }



    /* =====================================================
       SHOW STAGE
    ===================================================== */

    function showStage(index) {

        if (finished) {

            return;

        }


        if (
            index < 0 ||
            index >= stages.length
        ) {

            finishLaunch();

            return;

        }


        stages.forEach(
            (stage, stageIndex) => {

                stage.classList.remove(
                    "stage-visible"
                );


                if (
                    stageIndex < index
                ) {

                    stage.classList.add(
                        "stage-complete"
                    );

                }

            }
        );


        const stage =
            stages[index];


        stage.classList.add(
            "stage-visible"
        );


        currentStage = index;


        stageTimer =
            window.setTimeout(
                () => {

                    showStage(
                        index + 1
                    );

                },
                LAUNCH_CONFIG.stageDuration
            );

    }



    /* =====================================================
       FINISH LAUNCH
    ===================================================== */

    function finishLaunch() {

        if (finished) {

            return;

        }


        finished = true;


        if (stageTimer) {

            window.clearTimeout(
                stageTimer
            );

        }


        if (safetyTimer) {

            window.clearTimeout(
                safetyTimer
            );

        }


        /*
         * Make the final stage visible.
         */

        stages.forEach(
            (stage, index) => {

                stage.classList.remove(
                    "stage-visible"
                );


                if (
                    index === stages.length - 1
                ) {

                    stage.classList.add(
                        "stage-visible"
                    );

                }

            }
        );


        /*
         * Tell CSS that the cinematic
         * opening has finished.
         */

        launch.classList.add(
            "launch-finished"
        );


        document.body.classList.add(
            "launch-finished"
        );


        /*
         * Dispatch an event so other
         * systems can react later.
         */

        window.dispatchEvent(
            new CustomEvent(
                "botxcel:launch-finished"
            )
        );

    }



    /* =====================================================
       EMERGENCY SAFETY
    ===================================================== */

    safetyTimer =
        window.setTimeout(
            finishLaunch,
            LAUNCH_CONFIG.maximumDuration
        );



    /* =====================================================
       START
    ===================================================== */

    resetStages();


    /*
     * Start slightly after parsing so the
     * browser can paint the page first.
     */

    window.requestAnimationFrame(
        () => {

            showStage(0);

        }
    );

}


/* =========================================================
   DOM READY
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeLaunch,
        {
            once: true
        }
    );

} else {

    initializeLaunch();

}


/* =========================================================
   FAILSAFE
   If something goes wrong inside the launch controller,
   expose the final page instead of leaving the user stuck.
========================================================= */

window.addEventListener(
    "error",
    (event) => {

        const launch =
            document.getElementById("launch");


        if (!launch) {

            return;

        }


        const stages =
            launch.querySelectorAll(
                ".launch-stage"
            );


        if (!stages.length) {

            return;

        }


        /*
         * Don't interfere with normal errors
         * after the launch has completed.
         */

        if (
            launch.classList.contains(
                "launch-finished"
            )
        ) {

            return;

        }


        console.warn(
            "BOTXCEL launch recovered from an error.",
            event.error || event.message
        );


        stages.forEach(
            (stage) => {

                stage.classList.remove(
                    "stage-visible"
                );

            }
        );


        stages[
            stages.length - 1
        ].classList.add(
            "stage-visible"
        );


        launch.classList.add(
            "launch-finished"
        );

    }
);
