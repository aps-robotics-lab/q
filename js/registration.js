/* =========================================================
   BOTXCEL 2026
   REGISTRATION JAVASCRIPT
========================================================= */



// =========================================================
// FIREBASE IMPORTS
// =========================================================


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






// =========================================================
// FIREBASE CONFIG
// =========================================================


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



const app =
initializeApp(firebaseConfig);



const database =
getDatabase(app);







// =========================================================
// REGISTRATION DEADLINE
// =========================================================


const deadline =

new Date(
"August 31, 2026 23:59:59"
).getTime();





function checkRegistrationStatus(){


const now =
Date.now();



if(now > deadline){


const form =
document.getElementById(
"registrationForm"
);



if(form){


form.innerHTML = `

<div class="registration-closed">

<h2>
Registration Closed
</h2>


<p>
Registration deadline was 31 August 2026.
</p>


</div>

`;

}


}


}



checkRegistrationStatus();








// =========================================================
// WIZARD SYSTEM
// =========================================================


let currentStep = 1;


const totalSteps = 4;





function nextStep(step){


if(step < 1 || step > totalSteps)
return;



document
.querySelectorAll(".wizard-step")
.forEach(
(section)=>{

section.classList.remove(
"active"
);

}

);





const target =

document.getElementById(
"step" + step
);



if(target){

target.classList.add(
"active"
);

}



currentStep = step;


updateProgress();


}








function previousStep(step){

nextStep(step);

}








function updateProgress(){


document
.querySelectorAll(".progress-step")
.forEach(
(step,index)=>{


step.classList.toggle(

"active",

index < currentStep

);


}

);


}
// =========================================================
// DYNAMIC MEMBERS
// =========================================================


const teamSizeSelect =

document.getElementById(
"teamSize"
);



const memberContainer =

document.getElementById(
"memberContainer"
);





if(teamSizeSelect){


teamSizeSelect.addEventListener(

"change",

()=>{


generateMembers(
Number(teamSizeSelect.value)
);


}

);


}








function generateMembers(size){



memberContainer.innerHTML = "";



if(!size)
return;





for(let i=1;i<=size;i++){



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

i===1

?

"Team Leader Name *"

:

"Member Name *"

}

</label>



<input

type="text"

class="member-name"

placeholder="Enter name"

required

>


</div>





<div class="input-group">


<label>

Class

</label>



<input

type="text"

class="member-class"

placeholder="Enter class"

required

>


</div>



`;




memberContainer.appendChild(
memberBox
);



}



}









// =========================================================
// STEP 1 CONTINUE BUTTON FIX
// =========================================================


const step1Button =

document.getElementById(
"step1Continue"
);




if(step1Button){



step1Button.addEventListener(

"click",

()=>{



const teamName =

document.getElementById(
"teamName"
).value.trim();





const teamSize =

document.getElementById(
"teamSize"
).value;





if(teamName === ""){


alert(
"Please enter team name."
);


return;


}





if(teamSize === ""){


alert(
"Please select team size."
);


return;


}






nextStep(2);



}

);


}









// =========================================================
// EVENT VALIDATION
// =========================================================


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
// =========================================================
// REVIEW GENERATOR
// =========================================================


function showReview(){



const agree =

document.getElementById(
"agree"
);





if(!agree.checked){


alert(
"Please accept the rules before continuing."
);


return;


}






const reviewBox =

document.getElementById(
"reviewBox"
);





let members = [];



document
.querySelectorAll(".member-box")
.forEach(

(box)=>{


members.push({

name:

box.querySelector(".member-name").value,


class:

box.querySelector(".member-class").value


});


}

);






let events = [];



document
.querySelectorAll(
'input[name="events"]:checked'
)

.forEach(

(event)=>{


events.push(
event.value
);


}

);







reviewBox.innerHTML = `


<div class="review-section">


<h3>
TEAM DETAILS
</h3>


<p>
<strong>
Team Name:
</strong>

${document.getElementById("teamName").value}

</p>


<p>
<strong>
School:
</strong>

${document.getElementById("schoolName").value}

</p>


<p>
<strong>
Team Size:
</strong>

${document.getElementById("teamSize").value}
Member(s)

</p>



</div>





<div class="review-section">


<h3>
MEMBERS
</h3>


${
members.map(

(member,index)=>`

<p>

<strong>
Member ${index+1}:
</strong>

${member.name}

(Class ${member.class})

</p>

`

).join("")

}


</div>






<div class="review-section">


<h3>
EVENTS
</h3>


<p>

${events.join(", ")}

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

${document.getElementById("email").value}

</p>


<p>

<strong>
Mobile:
</strong>

${document.getElementById("phone").value}

</p>



<p>

<strong>
Mentor:
</strong>

${document.getElementById("mentor").value || "Not Provided"}

</p>



</div>


`;





nextStep(4);



}









// =========================================================
// FORM SUBMISSION TO FIREBASE
// =========================================================


const registrationForm =

document.getElementById(
"registrationForm"
);






if(registrationForm){



registrationForm.addEventListener(

"submit",

async(e)=>{



e.preventDefault();





const submitButton =

document.querySelector(
".registration-submit"
);





if(submitButton){


submitButton.disabled = true;


submitButton.innerText =
"Submitting...";


}








let members = [];



document
.querySelectorAll(".member-box")
.forEach(

(box)=>{


members.push({


name:

box.querySelector(".member-name").value,


class:

box.querySelector(".member-class").value


});


}

);








let events = [];



document
.querySelectorAll(
'input[name="events"]:checked'
)

.forEach(

(event)=>{


events.push(event.value);


}

);









const registrationID =

"BOTXCEL-" +

Date.now()
.toString()
.slice(-6);







const registrationData = {


registrationID:


registrationID,



teamName:

document.getElementById(
"teamName"
).value,



school:

document.getElementById(
"schoolName"
).value,



teamSize:

document.getElementById(
"teamSize"
).value,



members:

members,



events:

events,



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
).value || "Not Provided",



registeredAt:

new Date()
.toISOString()


};









try{



const newRegistration =

push(

ref(
database,
"registrations"

)

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

catch(error){



console.error(error);



alert(
"Registration failed. Try again."
);



if(submitButton){


submitButton.disabled = false;


submitButton.innerText =
"Submit Registration";


}



}



}


);



}
// =========================================================
// SUCCESS SCREEN UPDATE
// =========================================================

function showSuccess(){


const form =
document.getElementById(
"registrationForm"
);



if(form){

form.style.display="none";

}



const success =
document.getElementById(
"successScreen"
);



if(success){

success.style.display="flex";

}





// Registration ID

const id =
"BOTXCEL-" +
Math.floor(
100000 +
Math.random()*900000
);



document.getElementById(
"registrationID"
).innerText = id;





// Team name

document.getElementById(
"successTeamName"
).innerText =

document.getElementById(
"teamName"
).value;






// Events

let selectedEvents=[];



document
.querySelectorAll(
'input[name="events"]:checked'
)
.forEach(
event=>{

selectedEvents.push(
event.value
);

}
);



document.getElementById(
"successEvents"
).innerText =

selectedEvents.join(", ");



}
