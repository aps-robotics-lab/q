/* =========================================================
   BOTXCEL 2026
   AUTHOR DASHBOARD
   STEP 3.3
========================================================= */


/* =========================================================
   FIREBASE APP
========================================================= */

import {
    initializeApp
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


/* =========================================================
   FIREBASE AUTHENTICATION
========================================================= */

import {
    getAuth,
    onAuthStateChanged,
    signOut
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


/* =========================================================
   FIREBASE REALTIME DATABASE
========================================================= */

import {
    getDatabase,
    ref,
    onValue
}
from
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
   INITIALIZE FIREBASE
========================================================= */

const app =
initializeApp(firebaseConfig);


const auth =
getAuth(app);


const database =
getDatabase(app);



/* =========================================================
   ELEMENTS
========================================================= */

const inquiryContainer =
document.getElementById(
    "inquiryContainer"
);


const totalCount =
document.getElementById(
    "totalCount"
);


const pendingCount =
document.getElementById(
    "pendingCount"
);


const solvedCount =
document.getElementById(
    "solvedCount"
);


const logoutBtn =
document.getElementById(
    "logoutBtn"
);



/* =========================================================
   AUTHOR AUTHENTICATION
========================================================= */

onAuthStateChanged(

    auth,

    (user) => {

        /*
         * If nobody is logged in,
         * send them back to the author login page.
         */

        if (!user) {

            window.location.href =
                "author-login.html";

            return;

        }


        /*
         * User is authenticated.
         * Load inquiries.
         */

        loadInquiries();

    }

);



/* =========================================================
   LOAD INQUIRIES
========================================================= */

function loadInquiries() {


    const inquiriesRef =
        ref(
            database,
            "inquiries"
        );


    /*
     * onValue keeps the dashboard
     * synchronized with Firebase.
     */

    onValue(

        inquiriesRef,

        (snapshot) => {


            /*
             * Reset counters.
             */

            let total = 0;

            let pending = 0;

            let solved = 0;


            /*
             * Clear old cards.
             */

            inquiryContainer.innerHTML = "";



            /*
             * Check if database is empty.
             */

            if (!snapshot.exists()) {

                inquiryContainer.innerHTML = `

                    <div class="empty-inquiries">

                        <h3>
                            NO INQUIRIES
                        </h3>

                        <p>
                            No visitor messages have
                            been received yet.
                        </p>

                    </div>

                `;


                updateStats(
                    0,
                    0,
                    0
                );


                return;

            }



            /*
             * Firebase returns the
             * inquiry list here.
             */

            const inquiries =
                snapshot.val();



            /*
             * Convert Firebase object
             * into an array.
             */

            const inquiryList =
                Object.entries(
                    inquiries
                );



            /*
             * Show newest inquiries first.
             */

            inquiryList.reverse();



            inquiryList.forEach(

                ([id, inquiry]) => {


                    total++;



                    if (
                        inquiry.status ===
                        "pending"
                    ) {

                        pending++;

                    }



                    if (
                        inquiry.status ===
                        "solved"
                    ) {

                        solved++;

                    }



                    createInquiryCard(
                        id,
                        inquiry
                    );

                }

            );



            /*
             * Update dashboard numbers.
             */

            updateStats(

                total,

                pending,

                solved

            );

        },



        (error) => {

            console.error(
                "Firebase inquiry error:",
                error
            );


            inquiryContainer.innerHTML = `

                <div class="inquiry-error">

                    <h3>
                        UNABLE TO LOAD INQUIRIES
                    </h3>

                    <p>
                        ${escapeHTML(error.message)}
                    </p>

                </div>

            `;

        }

    );

}



/* =========================================================
   CREATE INQUIRY CARD
========================================================= */

function createInquiryCard(
    id,
    inquiry
) {


    const card =
        document.createElement(
            "article"
        );


    card.className =
        "inquiry-card";


    const status =
        inquiry.status ||
        "pending";


    const safeName =
        escapeHTML(
            inquiry.name ||
            "Unknown"
        );


    const safeEmail =
        escapeHTML(
            inquiry.email ||
            "Not provided"
        );


    const safePhone =
        escapeHTML(
            inquiry.phone ||
            "Not provided"
        );


    const safeSubject =
        escapeHTML(
            inquiry.subject ||
            "General"
        );


    const safeMessage =
        escapeHTML(
            inquiry.message ||
            "No message"
        );


    const date =
        formatDate(
            inquiry.submittedAt
        );



    card.innerHTML = `

        <div class="inquiry-card-top">

            <span class="inquiry-status ${status}">

                ${escapeHTML(
                    status.toUpperCase()
                )}

            </span>

            <span class="inquiry-date">

                ${date}

            </span>

        </div>


        <div class="inquiry-card-body">


            <div class="inquiry-person">

                <h3>

                    ${safeName}

                </h3>

                <p>

                    ${safeEmail}

                </p>

                <p>

                    ${safePhone}

                </p>

            </div>



            <div class="inquiry-content">

                <span>

                    ${safeSubject}

                </span>

                <p>

                    ${safeMessage}

                </p>

            </div>


        </div>

    `;


    inquiryContainer.appendChild(
        card
    );

}



/* =========================================================
   UPDATE STATISTICS
========================================================= */

function updateStats(

    total,
    pending,
    solved

) {


    if (totalCount) {

        totalCount.innerText =
            total;

    }


    if (pendingCount) {

        pendingCount.innerText =
            pending;

    }


    if (solvedCount) {

        solvedCount.innerText =
            solved;

    }

}



/* =========================================================
   LOGOUT
========================================================= */

if (logoutBtn) {


    logoutBtn.addEventListener(

        "click",

        async () => {


            try {


                await signOut(
                    auth
                );


                window.location.href =
                    "author-login.html";


            }

            catch (error) {


                console.error(
                    "Logout error:",
                    error
                );


            }

        }

    );

}



/* =========================================================
   DATE FORMATTER
========================================================= */

function formatDate(
    value
) {


    if (!value) {

        return "Unknown date";

    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "Unknown date";

    }


    return date.toLocaleString(
        "en-IN",
        {
            dateStyle: "medium",
            timeStyle: "short"
        }
    );

}



/* =========================================================
   HTML SAFETY
========================================================= */

function escapeHTML(
    value
) {


    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        String(value);


    return div.innerHTML;

                      }
