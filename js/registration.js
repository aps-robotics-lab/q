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
"https://robokriti-2026-default-rtdb.firebaseio.com"",


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
new Date()
.getTime();





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







window.nextStep = function(step){



if(step > totalSteps)
return;



document
.querySelectorAll(".wizard-step")
.forEach(
section=>{

section.classList.remove(
"active"
);

}

);





document
.getElementById(
"step" + step
)
.classList.add(
"active"
);





currentStep = step;



updateProgress();



};









window.previousStep = function(step){



document
.querySelectorAll(".wizard-step")
.forEach(
section=>{

section.classList.remove(
"active"
);

}

);





document
.getElementById(
"step" + step
)
.classList.add(
"active"
);



currentStep = step;



updateProgress();



};









function updateProgress(){



document
.querySelectorAll(
".progress-step"
)
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


generateMembers(
Number(teamSize.value)
);



}

);



}









function generateMembers(size){



memberContainer.innerHTML = "";





if(!size)
return;







for(
let i=1;
i<=size;
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

${i===1 ? "Team Leader Name *" : "Member Name *"}

</label>


<input

type="text"

class="member-name"

name="member${i}"

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
/* =========================================================
   EVENT VALIDATION
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









// =========================================================
// REVIEW GENERATOR
// =========================================================



window.showReview = function(){



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







const teamName =

document.getElementById(
"teamName"
).value;






const schoolName =

document.getElementById(
"schoolName"
).value;






const teamSize =

document.getElementById(
"teamSize"
).value;







const email =

document.getElementById(
"email"
).value;







const phone =

document.getElementById(
"phone"
).value;







const mentor =

document.getElementById(
"mentor"
).value || "Not Provided";








// MEMBERS



let members = [];





document
.querySelectorAll(
".member-box"
)
.forEach(
(box)=>{



const name =

box.querySelector(
".member-name"
).value;



const cls =

box.querySelector(
".member-class"
).value;





members.push({

name:name,

class:cls

});



}

);









// EVENTS



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

${teamName}
</p>



<p>
<strong>
School:
</strong>

${schoolName}
</p>



<p>
<strong>
Team Size:
</strong>

${teamSize} Members
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

${email}

</p>



<p>

<strong>
Phone:
</strong>

${phone}

</p>



<p>

<strong>
Mentor:
</strong>

${mentor}

</p>



</div>



`;








nextStep(4);



};
/* =========================================================
   FORM SUBMISSION
========================================================= */


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





submitButton.disabled = true;



submitButton.innerText =
"Submitting...";









// COLLECT MEMBERS


let members = [];



document
.querySelectorAll(
".member-box"
)
.forEach(
(box)=>{


members.push({


name:

box.querySelector(
".member-name"
).value,



class:

box.querySelector(
".member-class"
).value



});


}

);








// COLLECT EVENTS


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









// FINAL DATA


const registrationData = {


teamName:

document
.getElementById(
"teamName"
)
.value,



school:

document
.getElementById(
"schoolName"
)
.value,



teamSize:

document
.getElementById(
"teamSize"
)
.value,



members:members,



events:events,



email:

document
.getElementById(
"email"
)
.value,



phone:

document
.getElementById(
"phone"
)
.value,



mentor:

document
.getElementById(
"mentor"
)
.value || "Not Provided",




registeredAt:

new Date()
.toISOString()



};









try{



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









showSuccess();



}

catch(error){



console.error(
error
);



alert(
"Registration failed. Please try again."
);



submitButton.disabled = false;



submitButton.innerText =
"Submit Registration";



}



}

);



}









// =========================================================
// SUCCESS SCREEN
========================================================= */


function showSuccess(){



document
.getElementById(
"registrationForm"
)
.style.display =
"none";






const success =

document.getElementById(
"successScreen"
);





if(success){


success.style.display =
"block";



}



}
