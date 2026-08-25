/* =========================================================
   BOTXCEL 2026
   REGISTRATION SYSTEM
   COMPLETE FIXED VERSION
========================================================= */


/* =========================================================
   FIREBASE IMPORTS
========================================================= */

import {
    initializeApp
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {
    getDatabase,
    ref,
    push,
    set
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";



/* =========================================================
   FIREBASE CONFIG
========================================================= */

const firebaseConfig = {

    apiKey:
        "AIzaSyDW7Wi_8ea-Ph1TvIEpobXeIFUQQox_Yhg",

    authDomain:
        "robokriti-2026.firebaseapp.com",

    databaseURL:
        "https://robokriti-2026-default-rtdb.firebaseio.com",

    projectId:
        "robokriti-2026",

    storageBucket:
        "robokriti-2026.firebasestorage.app",

    messagingSenderId:
        "914721813222",

    appId:
        "1:914721813222:web:57abd3093b8255330dc127"

};



/* =========================================================
   FIREBASE INITIALIZATION
========================================================= */

const app =
    initializeApp(firebaseConfig);


const database =
    getDatabase(app);



/* =========================================================
   GLOBAL WIZARD SETTINGS
========================================================= */

let currentStep = 1;

const totalSteps = 4;



/* =========================================================
   REGISTRATION DEADLINE
========================================================= */

const registrationDeadline =
    new Date(
        "August 31, 2026 23:59:59"
    ).getTime();



/* =========================================================
   ELEMENT REFERENCES
========================================================= */

const registrationForm =
    document.getElementById(
        "registrationForm"
    );


const teamNameInput =
    document.getElementById(
        "teamName"
    );


const teamSizeSelect =
    document.getElementById(
        "teamSize"
    );


const schoolNameInput =
    document.getElementById(
        "schoolName"
    );


const memberContainer =
    document.getElementById(
        "memberContainer"
    );


const emailInput =
    document.getElementById(
        "email"
    );


const phoneInput =
    document.getElementById(
        "phone"
    );


const mentorInput =
    document.getElementById(
        "mentor"
    );


const agreeInput =
    document.getElementById(
        "agree"
    );


const reviewBox =
    document.getElementById(
        "reviewBox"
    );


const successScreen =
    document.getElementById(
        "successScreen"
    );



/* =========================================================
   BUTTON REFERENCES
========================================================= */

const step1Continue =
    document.getElementById(
        "step1Continue"
    );


const step2Back =
    document.getElementById(
        "step2Back"
    );


const step2Continue =
    document.getElementById(
        "step2Continue"
    );


const step3Back =
    document.getElementById(
        "step3Back"
    );


const step3Review =
    document.getElementById(
        "step3Review"
    );


const step4Back =
    document.getElementById(
        "step4Back"
    );


const registrationSubmit =
    document.getElementById(
        "registrationSubmit"
    );



/* =========================================================
   DEADLINE CHECK
========================================================= */

function checkRegistrationStatus() {

    const now =
        Date.now();


    if (
        now >
        registrationDeadline
    ) {

        if (registrationForm) {

            registrationForm.innerHTML = `

                <div class="form-card registration-closed">

                    <div class="form-heading">

                        <span>
                            BOTXCEL 2026
                        </span>

                        <h2>
                            Registration Closed
                        </h2>

                        <p>
                            Registration deadline was
                            31 August 2026.
                        </p>

                    </div>

                </div>

            `;

        }

        return false;

    }


    return true;

}



/* =========================================================
   WIZARD
========================================================= */

function showStep(stepNumber) {

    if (
        stepNumber < 1 ||
        stepNumber > totalSteps
    ) {

        return;

    }


    document
        .querySelectorAll(
            ".wizard-step"
        )
        .forEach(
            step => {

                step.classList.remove(
                    "active"
                );

            }
        );


    const targetStep =
        document.getElementById(
            "step" + stepNumber
        );


    if (!targetStep) {

        console.error(
            "Wizard step not found:",
            stepNumber
        );

        return;

    }


    targetStep.classList.add(
        "active"
    );


    currentStep =
        stepNumber;


    updateProgress();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



/* =========================================================
   PROGRESS BAR
========================================================= */

function updateProgress() {

    document
        .querySelectorAll(
            ".progress-step"
        )
        .forEach(
            (stepElement) => {

                const stepNumber =
                    Number(
                        stepElement.dataset.step
                    );


                stepElement.classList.toggle(
                    "active",
                    stepNumber <= currentStep
                );

            }
        );

}



/* =========================================================
   STEP 1 VALIDATION
========================================================= */

function validateStep1() {

    const teamName =
        teamNameInput
            ? teamNameInput.value.trim()
            : "";


    const teamSize =
        teamSizeSelect
            ? teamSizeSelect.value
            : "";


    if (!teamName) {

        alert(
            "Please enter your team name."
        );

        if (teamNameInput) {

            teamNameInput.focus();

        }

        return false;

    }


    if (!teamSize) {

        alert(
            "Please select your team size."
        );

        if (teamSizeSelect) {

            teamSizeSelect.focus();

        }

        return false;

    }


    return true;

}



/* =========================================================
   GENERATE TEAM MEMBERS
========================================================= */

function generateMembers(size) {

    if (!memberContainer) {

        return;

    }


    memberContainer.innerHTML = "";


    const numberOfMembers =
        Number(size);


    if (
        !numberOfMembers ||
        numberOfMembers < 1
    ) {

        return;

    }


    for (
        let i = 1;
        i <= numberOfMembers;
        i++
    ) {


        const memberBox =
            document.createElement(
                "div"
            );


        memberBox.className =
            "member-box";


        memberBox.dataset.member =
            String(i);


        const memberTitle =
            i === 1
                ? "Team Leader"
                : `Member ${i}`;


        memberBox.innerHTML = `

            <div class="member-number">

                MEMBER ${String(i).padStart(2, "0")}

            </div>


            <div class="input-group">

                <label>

                    ${memberTitle} Name *

                </label>


                <input
                    type="text"
                    class="member-name"
                    placeholder="Enter ${memberTitle.toLowerCase()} name"
                    autocomplete="off"
                >

            </div>


            <div class="input-group">

                <label>
                    Class *
                </label>


                <input
                    type="text"
                    class="member-class"
                    placeholder="Enter class"
                    autocomplete="off"
                >

            </div>

        `;


        memberContainer.appendChild(
            memberBox
        );

    }

}



/* =========================================================
   STEP 2 VALIDATION
========================================================= */

function validateStep2() {

    const memberBoxes =
        document.querySelectorAll(
            ".member-box"
        );


    if (
        memberBoxes.length === 0
    ) {

        alert(
            "Please select your team size in Step 1."
        );

        showStep(1);

        return false;

    }


    let valid =
        true;


    memberBoxes.forEach(
        (box) => {

            const nameInput =
                box.querySelector(
                    ".member-name"
                );


            const classInput =
                box.querySelector(
                    ".member-class"
                );


            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";


            const memberClass =
                classInput
                    ? classInput.value.trim()
                    : "";


            if (!name) {

                valid = false;

                if (nameInput) {

                    nameInput.focus();

                }

            }


            else if (!memberClass) {

                valid = false;

                if (classInput) {

                    classInput.focus();

                }

            }

        }
    );


    if (!valid) {

        alert(
            "Please complete all team member names and classes."
        );

        return false;

    }



    /* =====================================================
       EVENT VALIDATION
    ===================================================== */

    const selectedEvents =
        document.querySelectorAll(
            'input[name="events"]:checked'
        );


    if (
        selectedEvents.length === 0
    ) {

        alert(
            "Please select at least one event."
        );

        return false;

    }


    return true;

}



/* =========================================================
   STEP 3 VALIDATION
========================================================= */

function validateStep3() {

    const email =
        emailInput
            ? emailInput.value.trim()
            : "";


    const phone =
        phoneInput
            ? phoneInput.value.trim()
            : "";


    if (!email) {

        alert(
            "Please enter your email address."
        );

        if (emailInput) {

            emailInput.focus();

        }

        return false;

    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
        !emailPattern.test(
            email
        )
    ) {

        alert(
            "Please enter a valid email address."
        );

        if (emailInput) {

            emailInput.focus();

        }

        return false;

    }


    if (!phone) {

        alert(
            "Please enter your mobile number."
        );

        if (phoneInput) {

            phoneInput.focus();

        }

        return false;

    }


    const phonePattern =
        /^[0-9]{10}$/;


    if (
        !phonePattern.test(
            phone
        )
    ) {

        alert(
            "Please enter a valid 10 digit mobile number."
        );

        if (phoneInput) {

            phoneInput.focus();

        }

        return false;

    }


    if (
        !agreeInput ||
        !agreeInput.checked
    ) {

        alert(
            "Please accept the BOTXCEL 2026 rules before continuing."
        );

        if (agreeInput) {

            agreeInput.focus();

        }

        return false;

    }


    return true;

}



/* =========================================================
   COLLECT MEMBERS
========================================================= */

function collectMembers() {

    const members = [];


    document
        .querySelectorAll(
            ".member-box"
        )
        .forEach(
            (box, index) => {

                const nameInput =
                    box.querySelector(
                        ".member-name"
                    );


                const classInput =
                    box.querySelector(
                        ".member-class"
                    );


                members.push({

                    number:
                        index + 1,

                    name:
                        nameInput
                            ? nameInput.value.trim()
                            : "",

                    class:
                        classInput
                            ? classInput.value.trim()
                            : ""

                });

            }
        );


    return members;

}



/* =========================================================
   COLLECT EVENTS
========================================================= */

function collectEvents() {

    const events = [];


    document
        .querySelectorAll(
            'input[name="events"]:checked'
        )
        .forEach(
            checkbox => {

                events.push(
                    checkbox.value
                );

            }
        );


    return events;

}



/* =========================================================
   ESCAPE HTML
   Prevents user-entered text from being interpreted as HTML
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}



/* =========================================================
   CREATE REVIEW
========================================================= */

function createReview() {

    const members =
        collectMembers();


    const events =
        collectEvents();


    const teamName =
        teamNameInput
            ? teamNameInput.value.trim()
            : "";


    const school =
        schoolNameInput
            ? schoolNameInput.value
            : "";


    const teamSize =
        teamSizeSelect
            ? teamSizeSelect.value
            : "";


    const email =
        emailInput
            ? emailInput.value.trim()
            : "";


    const phone =
        phoneInput
            ? phoneInput.value.trim()
            : "";


    const mentor =
        mentorInput
            ? mentorInput.value.trim()
            : "";


    if (!reviewBox) {

        return;

    }


    reviewBox.innerHTML = `

        <div class="review-section">

            <h3>
                TEAM DETAILS
            </h3>


            <p>

                <strong>
                    Team Name:
                </strong>

                ${escapeHTML(teamName)}

            </p>


            <p>

                <strong>
                    School:
                </strong>

                ${escapeHTML(school)}

            </p>


            <p>

                <strong>
                    Team Size:
                </strong>

                ${escapeHTML(teamSize)}
                Member(s)

            </p>

        </div>



        <div class="review-section">

            <h3>
                MEMBERS
            </h3>


            ${

                members
                    .map(
                        member => `

                            <p>

                                <strong>
                                    Member ${member.number}:
                                </strong>

                                ${escapeHTML(member.name)}

                                <span>
                                    (Class ${escapeHTML(member.class)})
                                </span>

                            </p>

                        `
                    )
                    .join("")

            }

        </div>



        <div class="review-section">

            <h3>
                EVENTS
            </h3>


            <p>

                ${events
                    .map(
                        event =>
                            escapeHTML(event)
                    )
                    .join(", ")
                }

            </p>

        </div>



        <div class="review-section">

            <h3>
                CONTACT
            </h3>


            <p>

                <strong>
                    Email:
                </strong>

                ${escapeHTML(email)}

            </p>


            <p>

                <strong>
                    Mobile:
                </strong>

                ${escapeHTML(phone)}

            </p>


            <p>

                <strong>
                    Fav Mentor:
                </strong>

                ${
                    mentor
                        ? escapeHTML(mentor)
                        : "Not Provided"
                }

            </p>

        </div>

    `;

}



/* =========================================================
   STEP 1 CONTINUE
========================================================= */

if (step1Continue) {

    step1Continue.addEventListener(
        "click",
        () => {

            if (
                !validateStep1()
            ) {

                return;

            }


            generateMembers(
                teamSizeSelect.value
            );


            showStep(2);

        }
    );

}



/* =========================================================
   STEP 2 BACK
========================================================= */

if (step2Back) {

    step2Back.addEventListener(
        "click",
        () => {

            showStep(1);

        }
    );

}



/* =========================================================
   STEP 2 CONTINUE
========================================================= */

if (step2Continue) {

    step2Continue.addEventListener(
        "click",
        () => {

            if (
                !validateStep2()
            ) {

                return;

            }


            showStep(3);

        }
    );

}



/* =========================================================
   STEP 3 BACK
========================================================= */

if (step3Back) {

    step3Back.addEventListener(
        "click",
        () => {

            showStep(2);

        }
    );

}



/* =========================================================
   STEP 3 REVIEW
========================================================= */

if (step3Review) {

    step3Review.addEventListener(
        "click",
        () => {

            if (
                !validateStep3()
            ) {

                return;

            }


            createReview();


            showStep(4);

        }
    );

}



/* =========================================================
   STEP 4 BACK
========================================================= */

if (step4Back) {

    step4Back.addEventListener(
        "click",
        () => {

            showStep(3);

        }
    );

}



/* =========================================================
   SUBMIT REGISTRATION
========================================================= */

if (registrationForm) {

    registrationForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            /* ---------------------------------------------
               DEADLINE
            --------------------------------------------- */

            if (
                Date.now() >
                registrationDeadline
            ) {

                alert(
                    "Registration is closed."
                );

                return;

            }



            /* ---------------------------------------------
               FINAL VALIDATION
            --------------------------------------------- */

            if (
                !validateStep1()
            ) {

                showStep(1);

                return;

            }


            if (
                !validateStep2()
            ) {

                showStep(2);

                return;

            }


            if (
                !validateStep3()
            ) {

                showStep(3);

                return;

            }



            /* ---------------------------------------------
               BUTTON STATE
            --------------------------------------------- */

            if (registrationSubmit) {

                registrationSubmit.disabled =
                    true;

                registrationSubmit.textContent =
                    "Submitting...";

            }



            /* ---------------------------------------------
               DATA
            --------------------------------------------- */

            const members =
                collectMembers();


            const events =
                collectEvents();


            const registrationID =
                "BOTXCEL-" +
                Date.now()
                    .toString()
                    .slice(-6);


            const registrationData = {

                registrationID:
                    registrationID,

                teamName:
                    teamNameInput.value.trim(),

                school:
                    schoolNameInput.value,

                teamSize:
                    Number(
                        teamSizeSelect.value
                    ),

                members:
                    members,

                events:
                    events,

                email:
                    emailInput.value.trim(),

                phone:
                    phoneInput.value.trim(),

                mentor:
                    mentorInput.value.trim()
                        || "Not Provided",

                registeredAt:
                    new Date()
                        .toISOString(),

                status:
                    "confirmed",

                event:
                    "BOTXCEL 2026"

            };



            /* ---------------------------------------------
               FIREBASE
            --------------------------------------------- */

            try {

                const registrationsRef =
                    ref(
                        database,
                        "registrations"
                    );


                const newRegistration =
                    push(
                        registrationsRef
                    );


                await set(
                    newRegistration,
                    registrationData
                );


                showSuccess(
                    registrationID,
                    registrationData
                );


            }

            catch (error) {

                console.error(
                    "Firebase registration error:",
                    error
                );


                alert(
                    "Registration failed.\n\nPlease check your internet connection and try again."
                );


                if (
                    registrationSubmit
                ) {

                    registrationSubmit.disabled =
                        false;

                    registrationSubmit.textContent =
                        "Submit Registration";

                }

            }

        }
    );

}



/* =========================================================
   SUCCESS SCREEN
========================================================= */

function showSuccess(
    registrationID,
    registrationData
) {

    if (!registrationForm) {

        return;

    }


    registrationForm.style.display =
        "none";


    if (successScreen) {

        successScreen.style.display =
            "flex";

    }



    /* ---------------------------------------------
       REGISTRATION ID
    --------------------------------------------- */

    const registrationIDElement =
        document.getElementById(
            "registrationID"
        );


    if (
        registrationIDElement
    ) {

        registrationIDElement.textContent =
            registrationID;

    }



    /* ---------------------------------------------
       TEAM NAME
    --------------------------------------------- */

    const successTeamName =
        document.getElementById(
            "successTeamName"
        );


    if (
        successTeamName
    ) {

        successTeamName.textContent =
            registrationData.teamName;

    }



    /* ---------------------------------------------
       EVENTS
    --------------------------------------------- */

    const successEvents =
        document.getElementById(
            "successEvents"
        );


    if (
        successEvents
    ) {

        successEvents.textContent =
            registrationData.events.join(
                ", "
            );

    }



    /* ---------------------------------------------
       SCROLL
    --------------------------------------------- */

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



/* =========================================================
   COUNTDOWN
========================================================= */

const targetDate =
    new Date(
        "September 3, 2026 09:00:00"
    ).getTime();



function updateCountdown() {

    const now =
        Date.now();


    const difference =
        targetDate - now;


    const daysElement =
        document.getElementById(
            "regDays"
        );


    const hoursElement =
        document.getElementById(
            "regHours"
        );


    const minutesElement =
        document.getElementById(
            "regMinutes"
        );


    const secondsElement =
        document.getElementById(
            "regSeconds"
        );


    if (
        difference <= 0
    ) {

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



    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                difference %
                (1000 * 60)
            ) /
            1000
        );



    if (daysElement) {

        daysElement.textContent =
            String(days).padStart(
                2,
                "0"
            );

    }


    if (hoursElement) {

        hoursElement.textContent =
            String(hours).padStart(
                2,
                "0"
            );

    }


    if (minutesElement) {

        minutesElement.textContent =
            String(minutes).padStart(
                2,
                "0"
            );

    }


    if (secondsElement) {

        secondsElement.textContent =
            String(seconds).padStart(
                2,
                "0"
            );

    }

}



/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.getElementById(
        "menuToggle"
    );


const mainNav =
    document.getElementById(
        "mainNav"
    );


if (
    menuToggle &&
    mainNav
) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                mainNav.classList.toggle(
                    "nav-open"
                );


            menuToggle.classList.toggle(
                "menu-open",
                isOpen
            );


            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );


    mainNav
        .querySelectorAll(
            "a"
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        mainNav.classList.remove(
                            "nav-open"
                        );


                        menuToggle.classList.remove(
                            "menu-open"
                        );


                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            }
        );

}



/* =========================================================
   TEAM SIZE CHANGE
========================================================= */

if (teamSizeSelect) {

    teamSizeSelect.addEventListener(
        "change",
        () => {

            const selectedSize =
                teamSizeSelect.value;


            if (selectedSize) {

                generateMembers(
                    selectedSize
                );

            }

        }
    );

}



/* =========================================================
   PHONE INPUT
========================================================= */

if (phoneInput) {

    phoneInput.addEventListener(
        "input",
        () => {

            phoneInput.value =
                phoneInput.value
                    .replace(
                        /[^0-9]/g,
                        ""
                    )
                    .slice(
                        0,
                        10
                    );

        }
    );

}



/* =========================================================
   INITIALIZATION
========================================================= */

checkRegistrationStatus();

showStep(1);

updateCountdown();


setInterval(
    updateCountdown,
    1000
);



/* =========================================================
   DEBUG
========================================================= */

console.log(
    "BOTXCEL 2026 Registration System Loaded"
);

console.log(
    "Current Wizard Step:",
    currentStep
);
