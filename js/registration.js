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
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {
    getDatabase,
    ref,
    push,
    set
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";



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
   INITIALIZE FIREBASE
========================================================= */

const app =
    initializeApp(firebaseConfig);


const database =
    getDatabase(app);



/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let currentStep = 1;

const totalSteps = 4;


/*
   Registration deadline:
   31 August 2026 23:59:59
*/

const registrationDeadline =
    new Date(
        "2026-08-31T23:59:59+05:30"
    ).getTime();


/*
   Event:
   03 September 2026 09:00:00
*/

const eventDate =
    new Date(
        "2026-09-03T09:00:00+05:30"
    ).getTime();



/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        initializeRegistration();

    }
);



/* =========================================================
   INITIALIZE REGISTRATION
========================================================= */

function initializeRegistration(){

    setupCountdown();

    setupWizard();

    setupTeamSize();

    setupFormSubmission();

    checkRegistrationDeadline();

}



/* =========================================================
   COUNTDOWN
========================================================= */

function setupCountdown(){

    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );

}



/* =========================================================
   UPDATE COUNTDOWN
========================================================= */

function updateCountdown(){

    const now =
        Date.now();


    let difference =
        eventDate - now;



    /*
       If event has started
    */

    if(difference <= 0){

        setCountdownValues(
            0,
            0,
            0,
            0
        );

        return;

    }



    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );



    difference =
        difference %
        (1000 * 60 * 60 * 24);



    const hours =
        Math.floor(
            difference /
            (1000 * 60 * 60)
        );



    difference =
        difference %
        (1000 * 60 * 60);



    const minutes =
        Math.floor(
            difference /
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



    setCountdownValues(
        days,
        hours,
        minutes,
        seconds
    );

}



/* =========================================================
   SET COUNTDOWN VALUES
========================================================= */

function setCountdownValues(
    days,
    hours,
    minutes,
    seconds
){

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



    if(daysElement){

        daysElement.textContent =
            String(days).padStart(
                2,
                "0"
            );

    }



    if(hoursElement){

        hoursElement.textContent =
            String(hours).padStart(
                2,
                "0"
            );

    }



    if(minutesElement){

        minutesElement.textContent =
            String(minutes).padStart(
                2,
                "0"
            );

    }



    if(secondsElement){

        secondsElement.textContent =
            String(seconds).padStart(
                2,
                "0"
            );

    }

}



/* =========================================================
   REGISTRATION DEADLINE
========================================================= */

function checkRegistrationDeadline(){

    const now =
        Date.now();


    const form =
        document.getElementById(
            "registrationForm"
        );


    const notice =
        document.getElementById(
            "deadlineNotice"
        );



    if(now > registrationDeadline){

        if(form){

            form.innerHTML = `

                <div class="registration-closed">

                    <div class="closed-icon">
                        !
                    </div>

                    <h2>
                        Registration Closed
                    </h2>

                    <p>
                        Registration for BOTXCEL 2026
                        closed on 31 August 2026.
                    </p>

                </div>

            `;

        }


        if(notice){

            notice.innerHTML = `

                <span>
                    REGISTRATION STATUS
                </span>

                <h3>
                    CLOSED
                </h3>

                <p>
                    Registration deadline has passed.
                </p>

            `;

        }


        return false;

    }


    return true;

}



/* =========================================================
   WIZARD SETUP
========================================================= */

function setupWizard(){


    /* -----------------------------------------
       STEP 1
    ----------------------------------------- */

    const step1Continue =
        document.getElementById(
            "step1Continue"
        );


    if(step1Continue){

        step1Continue.addEventListener(
            "click",
            function(){

                if(
                    validateStep1()
                ){

                    goToStep(2);

                }

            }
        );

    }



    /* -----------------------------------------
       STEP 2 BACK
    ----------------------------------------- */

    const step2Back =
        document.getElementById(
            "step2Back"
        );


    if(step2Back){

        step2Back.addEventListener(
            "click",
            function(){

                goToStep(1);

            }
        );

    }



    /* -----------------------------------------
       STEP 2 CONTINUE
    ----------------------------------------- */

    const step2Continue =
        document.getElementById(
            "step2Continue"
        );


    if(step2Continue){

        step2Continue.addEventListener(
            "click",
            function(){

                if(
                    validateStep2()
                ){

                    goToStep(3);

                }

            }
        );

    }



    /* -----------------------------------------
       STEP 3 BACK
    ----------------------------------------- */

    const step3Back =
        document.getElementById(
            "step3Back"
        );


    if(step3Back){

        step3Back.addEventListener(
            "click",
            function(){

                goToStep(2);

            }
        );

    }



    /* -----------------------------------------
       STEP 3 REVIEW
    ----------------------------------------- */

    const step3Review =
        document.getElementById(
            "step3Review"
        );


    if(step3Review){

        step3Review.addEventListener(
            "click",
            function(){

                if(
                    validateStep3()
                ){

                    createReview();

                    goToStep(4);

                }

            }
        );

    }



    /* -----------------------------------------
       STEP 4 BACK
    ----------------------------------------- */

    const step4Back =
        document.getElementById(
            "step4Back"
        );


    if(step4Back){

        step4Back.addEventListener(
            "click",
            function(){

                goToStep(3);

            }
        );

    }

}



/* =========================================================
   GO TO STEP
========================================================= */

function goToStep(step){

    if(
        step < 1 ||
        step > totalSteps
    ){

        return;

    }



    const steps =
        document.querySelectorAll(
            ".wizard-step"
        );



    steps.forEach(
        function(section){

            section.classList.remove(
                "active"
            );

        }
    );



    const target =
        document.getElementById(
            "step" + step
        );



    if(!target){

        console.error(
            "Step not found:",
            step
        );

        return;

    }



    target.classList.add(
        "active"
    );



    currentStep =
        step;



    updateProgress();



    /*
       Scroll to form
    */

    const form =
        document.getElementById(
            "registrationForm"
        );


    if(form){

        window.scrollTo({

            top:
                form.getBoundingClientRect().top
                +
                window.scrollY
                -
                80,

            behavior:
                "smooth"

        });

    }

}



/* =========================================================
   UPDATE PROGRESS
========================================================= */

function updateProgress(){

    for(
        let i = 1;
        i <= totalSteps;
        i++
    ){

        const progress =
            document.getElementById(
                "progress" + i
            );


        if(!progress){

            continue;

        }



        if(
            i <= currentStep
        ){

            progress.classList.add(
                "active"
            );

        }
        else{

            progress.classList.remove(
                "active"
            );

        }

    }

}



/* =========================================================
   TEAM SIZE
========================================================= */

function setupTeamSize(){

    const teamSize =
        document.getElementById(
            "teamSize"
        );


    if(!teamSize){

        return;

    }



    teamSize.addEventListener(
        "change",
        function(){

            const size =
                Number(
                    teamSize.value
                );


            generateMembers(
                size
            );

        }
    );

}



/* =========================================================
   GENERATE MEMBERS
========================================================= */

function generateMembers(size){

    const container =
        document.getElementById(
            "memberContainer"
        );


    if(!container){

        return;

    }



    container.innerHTML = "";



    if(
        !size ||
        size < 1
    ){

        return;

    }



    for(
        let i = 1;
        i <= size;
        i++
    ){

        const memberBox =
            document.createElement(
                "div"
            );


        memberBox.className =
            "member-box";



        memberBox.innerHTML = `

            <div class="member-number">
                MEMBER ${i}
            </div>


            <div class="input-group">

                <label>
                    ${
                        i === 1
                        ?
                        "Team Leader Name *"
                        :
                        "Member Name *"
                    }
                </label>


                <input
                    type="text"
                    class="member-name"
                    placeholder="Enter member name"
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



        container.appendChild(
            memberBox
        );

    }

}



/* =========================================================
   VALIDATE STEP 1
========================================================= */

function validateStep1(){

    const teamName =
        document.getElementById(
            "teamName"
        );


    const teamSize =
        document.getElementById(
            "teamSize"
        );



    if(
        !teamName ||
        !teamName.value.trim()
    ){

        alert(
            "Please enter team name."
        );


        if(teamName){

            teamName.focus();

        }


        return false;

    }



    if(
        !teamSize ||
        !teamSize.value
    ){

        alert(
            "Please select team size."
        );


        if(teamSize){

            teamSize.focus();

        }


        return false;

    }



    /*
       Generate again in case the user
       somehow reaches step 2 without
       triggering the change event.
    */

    generateMembers(
        Number(
            teamSize.value
        )
    );



    return true;

}



/* =========================================================
   VALIDATE STEP 2
========================================================= */

function validateStep2(){

    const memberBoxes =
        document.querySelectorAll(
            ".member-box"
        );



    if(
        memberBoxes.length === 0
    ){

        alert(
            "Please select your team size first."
        );


        goToStep(1);


        return false;

    }



    /*
       Check member names
    */

    for(
        let i = 0;
        i < memberBoxes.length;
        i++
    ){

        const nameInput =
            memberBoxes[i].querySelector(
                ".member-name"
            );


        const classInput =
            memberBoxes[i].querySelector(
                ".member-class"
            );



        if(
            !nameInput ||
            !nameInput.value.trim()
        ){

            alert(
                "Please enter the name of Member " +
                (i + 1) +
                "."
            );


            if(nameInput){

                nameInput.focus();

            }


            return false;

        }



        if(
            !classInput ||
            !classInput.value.trim()
        ){

            alert(
                "Please enter the class of Member " +
                (i + 1) +
                "."
            );


            if(classInput){

                classInput.focus();

            }


            return false;

        }

    }



    /*
       Events
    */

    const selectedEvents =
        document.querySelectorAll(
            'input[name="events"]:checked'
        );



    if(
        selectedEvents.length === 0
    ){

        alert(
            "Please select at least one event."
        );


        return false;

    }



    return true;

}



/* =========================================================
   VALIDATE STEP 3
========================================================= */

function validateStep3(){

    const email =
        document.getElementById(
            "email"
        );


    const phone =
        document.getElementById(
            "phone"
        );


    const agree =
        document.getElementById(
            "agree"
        );



    /* -----------------------------------------
       EMAIL
    ----------------------------------------- */

    if(
        !email ||
        !email.value.trim()
    ){

        alert(
            "Please enter your email address."
        );


        if(email){

            email.focus();

        }


        return false;

    }



    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if(
        !emailPattern.test(
            email.value.trim()
        )
    ){

        alert(
            "Please enter a valid email address."
        );


        email.focus();


        return false;

    }



    /* -----------------------------------------
       PHONE
    ----------------------------------------- */

    if(
        !phone ||
        !phone.value.trim()
    ){

        alert(
            "Please enter your mobile number."
        );


        if(phone){

            phone.focus();

        }


        return false;

    }



    const phoneValue =
        phone.value.trim();


    const phonePattern =
        /^[0-9]{10}$/;


    if(
        !phonePattern.test(
            phoneValue
        )
    ){

        alert(
            "Please enter a valid 10 digit mobile number."
        );


        phone.focus();


        return false;

    }



    /* -----------------------------------------
       AGREEMENT
    ----------------------------------------- */

    if(
        !agree ||
        !agree.checked
    ){

        alert(
            "Please accept the rules before continuing."
        );


        if(agree){

            agree.focus();

        }


        return false;

    }



    return true;

}



/* =========================================================
   CREATE REVIEW
========================================================= */

function createReview(){

    const reviewBox =
        document.getElementById(
            "reviewBox"
        );


    if(!reviewBox){

        return;

    }



    const teamName =
        document.getElementById(
            "teamName"
        ).value.trim();


    const school =
        document.getElementById(
            "schoolName"
        ).value.trim();


    const teamSize =
        document.getElementById(
            "teamSize"
        ).value;


    const email =
        document.getElementById(
            "email"
        ).value.trim();


    const phone =
        document.getElementById(
            "phone"
        ).value.trim();


    const mentor =
        document.getElementById(
            "mentor"
        ).value.trim();



    /* -----------------------------------------
       MEMBERS
    ----------------------------------------- */

    let membersHTML = "";



    const memberBoxes =
        document.querySelectorAll(
            ".member-box"
        );



    memberBoxes.forEach(
        function(box, index){

            const name =
                box.querySelector(
                    ".member-name"
                ).value.trim();


            const memberClass =
                box.querySelector(
                    ".member-class"
                ).value.trim();



            membersHTML += `

                <p>

                    <strong>
                        Member ${index + 1}:
                    </strong>

                    ${escapeHTML(name)}

                    <span>
                        (Class ${escapeHTML(memberClass)})
                    </span>

                </p>

            `;

        }
    );



    /* -----------------------------------------
       EVENTS
    ----------------------------------------- */

    const selectedEvents =
        document.querySelectorAll(
            'input[name="events"]:checked'
        );


    let events = [];


    selectedEvents.forEach(
        function(event){

            events.push(
                event.value
            );

        }
    );



    const eventsText =
        events.join(", ");



    /* -----------------------------------------
       REVIEW HTML
    ----------------------------------------- */

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

            ${membersHTML}

        </div>



        <div class="review-section">

            <h3>
                EVENTS
            </h3>


            <p>
                ${escapeHTML(eventsText)}
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
                    Mentor:
                </strong>

                ${
                    mentor
                    ?
                    escapeHTML(mentor)
                    :
                    "Not Provided"
                }

            </p>

        </div>

    `;

}



/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value){

    return String(value)
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}



/* =========================================================
   FORM SUBMISSION
========================================================= */

function setupFormSubmission(){

    const form =
        document.getElementById(
            "registrationForm"
        );


    if(!form){

        return;

    }



    form.addEventListener(
        "submit",
        async function(event){

            event.preventDefault();



            /*
               Do not submit after deadline.
            */

            if(
                !checkRegistrationDeadline()
            ){

                return;

            }



            /*
               Final validation
            */

            if(
                !validateStep1()
            ){

                goToStep(1);

                return;

            }



            if(
                !validateStep2()
            ){

                goToStep(2);

                return;

            }



            if(
                !validateStep3()
            ){

                goToStep(3);

                return;

            }



            const submitButton =
                document.getElementById(
                    "registrationSubmit"
                );



            if(submitButton){

                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "Submitting...";

            }



            try{

                /*
                   Collect members
                */

                const members = [];



                document
                    .querySelectorAll(
                        ".member-box"
                    )
                    .forEach(
                        function(box){

                            members.push({

                                name:
                                    box
                                    .querySelector(
                                        ".member-name"
                                    )
                                    .value
                                    .trim(),

                                class:
                                    box
                                    .querySelector(
                                        ".member-class"
                                    )
                                    .value
                                    .trim()

                            });

                        }
                    );



                /*
                   Collect events
                */

                const events = [];


                document
                    .querySelectorAll(
                        'input[name="events"]:checked'
                    )
                    .forEach(
                        function(event){

                            events.push(
                                event.value
                            );

                        }
                    );



                /*
                   Generate ID
                */

                const registrationID =
                    generateRegistrationID();



                /*
                   Data
                */

                const registrationData = {

                    registrationID:
                        registrationID,

                    teamName:
                        document
                        .getElementById(
                            "teamName"
                        )
                        .value
                        .trim(),

                    school:
                        document
                        .getElementById(
                            "schoolName"
                        )
                        .value
                        .trim(),

                    teamSize:
                        Number(
                            document
                            .getElementById(
                                "teamSize"
                            )
                            .value
                        ),

                    members:
                        members,

                    events:
                        events,

                    email:
                        document
                        .getElementById(
                            "email"
                        )
                        .value
                        .trim(),

                    phone:
                        document
                        .getElementById(
                            "phone"
                        )
                        .value
                        .trim(),

                    mentor:
                        document
                        .getElementById(
                            "mentor"
                        )
                        .value
                        .trim()
                        ||
                        "Not Provided",

                    registeredAt:
                        new Date()
                        .toISOString()

                };



                /*
                   Firebase push
                */

                const registrationRef =
                    push(
                        ref(
                            database,
                            "registrations"
                        )
                    );



                await set(
                    registrationRef,
                    registrationData
                );



                /*
                   Success
                */

                showSuccess(
                    registrationData
                );


            }
            catch(error){

                console.error(
                    "Firebase registration error:",
                    error
                );


                alert(
                    "Registration failed.\n\n" +
                    error.message
                );


                if(submitButton){

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        "Submit Registration";

                }

            }

        }
    );

}



/* =========================================================
   GENERATE REGISTRATION ID
========================================================= */

function generateRegistrationID(){

    const randomNumber =
        Math.floor(
            100000 +
            Math.random() *
            900000
        );


    return (
        "BOTXCEL-" +
        randomNumber
    );

}



/* =========================================================
   SUCCESS SCREEN
========================================================= */

function showSuccess(
    registrationData
){

    const form =
        document.getElementById(
            "registrationForm"
        );


    const success =
        document.getElementById(
            "successScreen"
        );



    if(form){

        form.style.display =
            "none";

    }



    if(success){

        success.style.display =
            "flex";

    }



    /*
       Registration ID
    */

    const idElement =
        document.getElementById(
            "registrationID"
        );


    if(idElement){

        idElement.textContent =
            registrationData.registrationID;

    }



    /*
       Team name
    */

    const teamElement =
        document.getElementById(
            "successTeamName"
        );


    if(teamElement){

        teamElement.textContent =
            registrationData.teamName;

    }



    /*
       Events
    */

    const eventsElement =
        document.getElementById(
            "successEvents"
        );


    if(eventsElement){

        eventsElement.textContent =
            registrationData.events.join(
                ", "
            );

    }



    /*
       Scroll to success
    */

    setTimeout(
        function(){

            if(success){

                success.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "start"

                });

            }

        },
        100
    );

}



/* =========================================================
   PREVENT INVALID PHONE CHARACTERS
========================================================= */

document.addEventListener(
    "input",
    function(event){

        if(
            event.target &&
            event.target.id === "phone"
        ){

            event.target.value =
                event.target.value
                .replace(
                    /\D/g,
                    ""
                )
                .slice(
                    0,
                    10
                );

        }

    }
);



/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "BOTXCEL 2026 Registration System Loaded"
);
