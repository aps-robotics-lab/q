/* =========================================================
   BOTXCEL 2026
   REGISTRATION SYSTEM
   PART 1/2

   Includes:
   - Firebase Setup
   - Wizard Navigation
   - Progress Bar
   - Team Size
   - Dynamic Members
========================================================= */



/* =========================================================
   FIREBASE IMPORTS
========================================================= */


import {
    initializeApp
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";



import {
    getDatabase,
    ref,
    push,
    set
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";







/* =========================================================
   FIREBASE CONFIG
========================================================= */


const firebaseConfig = {


    apiKey:
    "YOUR_API_KEY",


    authDomain:
    "YOUR_AUTH_DOMAIN",


    databaseURL:
    "YOUR_DATABASE_URL",


    projectId:
    "YOUR_PROJECT_ID",


    storageBucket:
    "YOUR_STORAGE_BUCKET",


    messagingSenderId:
    "YOUR_MESSAGING_ID",


    appId:
    "YOUR_APP_ID"


};






const app =
initializeApp(firebaseConfig);



const database =
getDatabase(app);









/* =========================================================
   GLOBAL VARIABLES
========================================================= */


let currentStep = 1;


const totalSteps = 5;









/* =========================================================
   SHOW STEP
========================================================= */


window.showStep = function(step){



    document
    .querySelectorAll(".wizard-step")
    .forEach(
        section=>{

            section.classList.remove(
                "active"
            );

        }
    );





    const target =
    document.getElementById(
        "step"+step
    );



    if(target){

        target.classList.add(
            "active"
        );

    }





    updateProgress(step);



    currentStep = step;



};









/* =========================================================
   NEXT / BACK BUTTONS
========================================================= */


window.nextStep = function(step){


    showStep(step);


};






window.previousStep = function(step){


    showStep(step);


};









/* =========================================================
   UPDATE PROGRESS
========================================================= */


function updateProgress(step){



    const steps =
    document.querySelectorAll(
        ".progress-step"
    );



    steps.forEach(
        (item,index)=>{


            if(index < step){

                item.classList.add(
                    "active"
                );


            }

            else{


                item.classList.remove(
                    "active"
                );


            }



        }
    );


}









/* =========================================================
   TEAM SIZE → MEMBERS
========================================================= */


const teamSize =
document.getElementById(
    "teamSize"
);



const memberContainer =
document.getElementById(
    "memberContainer"
);





if(teamSize){


teamSize.addEventListener(
"change",
()=>{


    createMembers(
        Number(teamSize.value)
    );


});


}









function createMembers(size){



    if(!memberContainer)
    return;



    memberContainer.innerHTML = "";





    for(
        let i=1;
        i<=size;
        i++
    ){



        memberContainer.innerHTML += `


        <div class="member-box">


            <div class="member-number">

                MEMBER ${String(i).padStart(2,"0")}

                ${i===1 ? "/ TEAM LEADER" : ""}

            </div>




            <div class="input-group">


                <label>
                Full Name ${i===1 ? "*" : ""}
                </label>


                <input

                type="text"

                id="member${i}"

                name="member${i}"

                placeholder="Enter member name"

                ${i===1 ? "required" : ""}

                >


            </div>





            <div class="input-group">


                <label>
                Class ${i===1 ? "*" : ""}
                </label>



                <select

                id="class${i}"

                name="class${i}"

                ${i===1 ? "required" : ""}

                >


                    <option value="">
                    Select Class
                    </option>


                    <option>
                    6
                    </option>


                    <option>
                    7
                    </option>


                    <option>
                    8
                    </option>


                    <option>
                    9
                    </option>


                    <option>
                    10
                    </option>


                    <option>
                    11
                    </option>


                    <option>
                    12
                    </option>


                </select>



            </div>



        </div>



        `;



    }



}
/* =========================================================
   VALIDATE EVENTS
========================================================= */


window.validateEvents = function(){


    const selectedEvents =

    document.querySelectorAll(
        'input[name="events"]:checked'
    );



    if(selectedEvents.length === 0){


        alert(
            "Please select at least one event."
        );


        return;


    }



    nextStep(3);



};









/* =========================================================
   VALIDATE MEMBERS
========================================================= */


window.validateMembers = function(){


    const size =

    Number(
        document.getElementById(
            "teamSize"
        ).value
    );



    if(!size){


        alert(
            "Please select team size."
        );


        return;


    }







    for(
        let i=1;
        i<=size;
        i++
    ){


        const name =

        document.getElementById(
            "member"+i
        )
        .value
        .trim();




        if(name===""){


            alert(
                "Please enter all member names."
            );


            return;


        }


    }



    nextStep(4);



};









/* =========================================================
   SHOW REVIEW
========================================================= */


window.showReview = function(){



    const email =

    document.getElementById(
        "email"
    )
    .value
    .trim();




    const phone =

    document.getElementById(
        "phone"
    )
    .value
    .trim();





    const agree =

    document.getElementById(
        "agree"
    )
    .checked;







    if(email===""){


        alert(
            "Please enter email."
        );


        return;


    }





    if(phone.length !== 10){


        alert(
            "Enter valid 10 digit mobile number."
        );


        return;


    }







    if(!agree){


        alert(
            "Please accept the confirmation."
        );


        return;


    }





    generateReview();


    nextStep(5);



};









/* =========================================================
   REVIEW GENERATOR
========================================================= */


function generateReview(){



    const reviewBox =

    document.getElementById(
        "reviewBox"
    );





    const events =

    Array.from(

        document.querySelectorAll(
            'input[name="events"]:checked'
        )

    )
    .map(
        item=>item.value
    );







    const size =

    Number(
        document.getElementById(
            "teamSize"
        ).value
    );







    let members = "";





    for(
        let i=1;
        i<=size;
        i++
    ){


        members += `

        <p>

        <b>
        ${i}.
        ${i===1 ? "Leader" : "Member"}
        </b>

        <br>

        ${
        document.getElementById(
            "member"+i
        ).value
        }

        -
        
        Class 
        ${
        document.getElementById(
            "class"+i
        ).value
        }


        </p>

        `;


    }







    reviewBox.innerHTML = `



    <div class="review-section">

    <h3>
    TEAM DETAILS
    </h3>


    <p>
    <b>
    Team Name:
    </b>

    ${

    document.getElementById(
        "teamName"
    ).value

    }

    </p>



    <p>
    <b>
    School:
    </b>

    ${

    document.getElementById(
        "schoolName"
    ).value

    }

    </p>


    </div>








    <div class="review-section">

    <h3>
    EVENTS
    </h3>


    ${
        events
        .map(
        event=>`
        <p>
        ✓ ${event}
        </p>
        `
        )
        .join("")
    }


    </div>









    <div class="review-section">

    <h3>
    MEMBERS
    </h3>


    ${members}


    </div>









    <div class="review-section">

    <h3>
    CONTACT
    </h3>



    <p>
    Email:
    ${
    document.getElementById(
        "email"
    ).value
    }
    </p>



    <p>
    Phone:
    ${
    document.getElementById(
        "phone"
    ).value
    }
    </p>



    <p>
    Mentor:
    ${
    document.getElementById(
        "mentor"
    ).value || "Not Provided"
    }
    </p>



    </div>



    `;



}









/* =========================================================
   FINAL FIREBASE SUBMIT
========================================================= */


const form =

document.getElementById(
    "registrationForm"
);





form.addEventListener(
"submit",
async(e)=>{


    e.preventDefault();





    const size =

    Number(
        document.getElementById(
            "teamSize"
        ).value
    );





    let members=[];




    for(
        let i=1;
        i<=size;
        i++
    ){


        members.push({

            name:
            document.getElementById(
                "member"+i
            ).value,


            class:
            document.getElementById(
                "class"+i
            ).value,


            role:
            i===1
            ?
            "Leader"
            :
            "Member"


        });


    }








    const data = {


        competition:
        "BOTXCEL 2026",


        eventDate:
        "03 September 2026",


        teamName:
        document.getElementById(
            "teamName"
        ).value,


        school:
        document.getElementById(
            "schoolName"
        ).value,


        events:

        Array.from(

        document.querySelectorAll(
        'input[name="events"]:checked'
        )

        )
        .map(
        e=>e.value
        ),



        teamSize:size,


        members:members,



        contact:{


            email:
            document.getElementById(
                "email"
            ).value,


            phone:
            document.getElementById(
                "phone"
            ).value,


            mentor:
            document.getElementById(
                "mentor"
            ).value


        },



        submittedAt:
        new Date()
        .toISOString()


    };







    try{


        const newRef =

        push(
            ref(
                database,
                "registrations"
            )
        );



        await set(
            newRef,
            data
        );





        alert(
        "🎉 BOTXCEL 2026 Registration Successful!"
        );



        window.location.href =
        "index.html";



    }

    catch(error){


        console.error(error);


        alert(
        "Registration failed."
        );


    }




});









/* =========================================================
   REGISTRATION DEADLINE
========================================================= */


const closeDate =

new Date(
"August 31, 2026 23:59:59"
)
.getTime();





if(
Date.now() > closeDate
){


const container =

document.querySelector(
".registration-container"
);



if(container){


container.innerHTML = `


<div class="form-card">


<h2>
REGISTRATION CLOSED
</h2>


<p>
BOTXCEL 2026 registration deadline has ended.
</p>


</div>


`;



}



}
