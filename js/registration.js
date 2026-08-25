/* =========================================================
   BOTXCEL 2026
   REGISTRATION WIZARD
========================================================= */



let currentStep = 1;



const totalSteps = 5;



/* =========================================================
   STEP NAVIGATION
========================================================= */


function showStep(step){


    document
    .querySelectorAll(".wizard-step")
    .forEach(section=>{

        section.classList.remove("active");

    });



    const activeStep =
    document.getElementById(
        "step" + step
    );


    if(activeStep){

        activeStep.classList.add("active");

    }



    updateProgress(step);



    currentStep = step;


}







function nextStep(step){


    showStep(step);


}







function previousStep(step){


    showStep(step);


}







/* =========================================================
   PROGRESS BAR
========================================================= */


function updateProgress(step){


const progress =
document.querySelectorAll(
".progress-step"
);



progress.forEach(
(item,index)=>{


    item.classList.toggle(
        "active",
        index < step
    );


});



}









/* =========================================================
   TEAM SIZE → CREATE MEMBERS
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



memberContainer.innerHTML = "";



for(
let i = 1;
i <= size;
i++
){



memberContainer.innerHTML += `



<div class="member-box">


<div class="member-number">

MEMBER ${String(i).padStart(2,"0")}

${i===1 ? "/ LEADER" : ""}


</div>





<div class="input-group">


<label>
Full Name ${i===1 ? "*" : ""}
</label>



<input

type="text"

id="member${i}"

name="member${i}"

placeholder="Enter name"

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


function validateEvents(){


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


}









/* =========================================================
   VALIDATE MEMBERS
========================================================= */


function validateMembers(){


const size =

Number(
document.getElementById("teamSize").value
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



const member =

document.getElementById(
"member"+i
).value.trim();





if(member===""){



alert(
"Please enter all member names."
);



return;


}



}



nextStep(4);



}









/* =========================================================
   SHOW REVIEW
========================================================= */


function showReview(){



const email =

document.getElementById(
"email"
).value.trim();



const phone =

document.getElementById(
"phone"
).value.trim();



const agree =

document.getElementById(
"agree"
).checked;







if(email===""){


alert(
"Please enter email."
);


return;


}






if(phone===""){


alert(
"Please enter mobile number."
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



}









/* =========================================================
   REVIEW GENERATOR
========================================================= */


function generateReview(){



const reviewBox =

document.getElementById(
"reviewBox"
);





const teamName =

document.getElementById(
"teamName"
).value;





const school =

document.getElementById(
"schoolName"
).value;








const events =

Array.from(

document.querySelectorAll(
'input[name="events"]:checked'
)

)

.map(
event=>event.value
);








const size =

Number(
document.getElementById("teamSize").value
);






let membersHTML = "";





for(
let i=1;
i<=size;
i++
){


membersHTML += `


<p>

<b>
${i}.
${i===1 ? "Leader" : "Member"}
</b>

<br>

${document.getElementById("member"+i).value}

-
Class 

${document.getElementById("class"+i).value}


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

${teamName}
</p>


<p>
<b>
School:
</b>

${school}
</p>


</div>







<div class="review-section">


<h3>
SELECTED EVENTS
</h3>



${

events.map(

event=>`

<p>
✓ ${event}
</p>

`

).join("")

}


</div>








<div class="review-section">


<h3>
TEAM MEMBERS
</h3>


${membersHTML}


</div>








<div class="review-section">


<h3>
CONTACT
</h3>



<p>
<b>Email:</b>

${document.getElementById("email").value}

</p>



<p>
<b>Mobile:</b>

${document.getElementById("phone").value}

</p>



<p>
<b>Mentor:</b>

${document.getElementById("mentor").value || "Not Provided"}

</p>



</div>



`;



}
/* =========================================================
   FIREBASE
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
   FINAL SUBMIT
========================================================= */


const form =
document.getElementById(
"registrationForm"
);





form.addEventListener(
"submit",
async(e)=>{


e.preventDefault();





const events =

Array.from(

document.querySelectorAll(
'input[name="events"]:checked'
)

)

.map(
event=>event.value
);






const teamSize =

Number(
document.getElementById(
"teamSize"
).value
);







const members=[];





for(
let i=1;
i<=teamSize;
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
"Team Leader"
:
"Member"



});



}









const data = {


teamName:

document.getElementById(
"teamName"
).value,



school:

document.getElementById(
"schoolName"
).value,



events:events,



teamSize:teamSize,



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


const newRegistration =

push(
ref(database,"registrations")
);






await set(
newRegistration,
data
);






alert(
"🎉 BOTXCEL 2026 Registration Completed!"
);






window.location.href =
"index.html";





}

catch(error){



console.error(error);



alert(
"Registration failed. Please try again."
);



}



});









/* =========================================================
   REGISTRATION DEADLINE
   31 AUGUST 2026
========================================================= */


const registrationDeadline =

new Date(
"August 31, 2026 23:59:59"
)
.getTime();






if(
Date.now()
>
registrationDeadline
){



document.querySelector(
".registration-container"
).innerHTML = `


<div class="form-card">


<h2>
REGISTRATION CLOSED
</h2>



<p>

BOTXCEL 2026 registration deadline
has ended.

</p>



</div>


`;



}
