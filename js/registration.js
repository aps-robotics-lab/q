/* =========================================================
   BOTXCEL 2026
   FIXED REGISTRATION JAVASCRIPT
========================================================= */


// ================= FIREBASE =================


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



const app = initializeApp(firebaseConfig);

const database = getDatabase(app);




// ================= DEADLINE =================


const deadline =
new Date(
"August 31, 2026 23:59:59"
).getTime();



if(Date.now() > deadline){

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
Registration deadline has passed.
</p>

</div>

`;

}

}




// ================= WIZARD =================


let currentStep = 1;



function openStep(step){


document
.querySelectorAll(".wizard-step")
.forEach(
(section)=>{

section.classList.remove("active");

});



const target =
document.getElementById(
"step"+step
);



if(target){

target.classList.add("active");

}



currentStep = step;


updateProgress();


}




function updateProgress(){


document
.querySelectorAll(".progress-step")
.forEach(
(item,index)=>{


item.classList.toggle(

"active",

index < currentStep

);


});

}





// ================= BUTTON EVENTS =================


// STEP 1


document
.getElementById("step1Continue")
?.addEventListener(
"click",
()=>{


const name =
document
.getElementById("teamName")
.value.trim();



const size =
document
.getElementById("teamSize")
.value;



if(!name){

alert(
"Enter team name"
);

return;

}



if(!size){

alert(
"Select team size"
);

return;

}



generateMembers(
Number(size)
);



openStep(2);


});





// STEP 2 BACK


document
.querySelector("#step2 .back-btn")
?.addEventListener(
"click",
()=>{

openStep(1);

});





// STEP 3 BACK


document
.querySelector("#step3 .back-btn")
?.addEventListener(
"click",
()=>{

openStep(2);

});





// STEP 4 BACK


document
.querySelector("#step4 .back-btn")
?.addEventListener(
"click",
()=>{

openStep(3);

});
// ================= MEMBERS GENERATION =================


const teamSizeSelect =
document.getElementById("teamSize");


const memberContainer =
document.getElementById("memberContainer");




function generateMembers(size){


memberContainer.innerHTML = "";



for(let i=1;i<=size;i++){



const box =
document.createElement("div");



box.className =
"member-box";



box.innerHTML = `

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

Class *

</label>


<input

type="text"

class="member-class"

placeholder="Enter class"

required

>


</div>


`;



memberContainer.appendChild(box);



}



}






// ================= TEAM SIZE CHANGE =================


teamSizeSelect
?.addEventListener(
"change",
()=>{


generateMembers(
Number(
teamSizeSelect.value
)

);


});






// ================= STEP 2 CONTINUE =================


function validateEvents(){



const members =
document.querySelectorAll(
".member-name"
);



for(let member of members){


if(
member.value.trim()===""
){


alert(
"Please enter all member names."
);


return;

}


}




const events =
document.querySelectorAll(
'input[name="events"]:checked'
);



if(events.length===0){


alert(
"Select at least one event."
);


return;


}




openStep(3);



}







// ================= REVIEW =================


document
.querySelector("#step3 .next-btn")
?.addEventListener(
"click",
()=>{


const agree =
document.getElementById("agree");



if(!agree.checked){


alert(
"Please accept rules."
);


return;


}



createReview();


openStep(4);


});






function createReview(){



const review =
document.getElementById(
"reviewBox"
);



let members=[];



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


});





let events=[];



document
.querySelectorAll(
'input[name="events"]:checked'
)
.forEach(
(event)=>{


events.push(
event.value
);


});






review.innerHTML = `


<div class="review-section">

<h3>
TEAM DETAILS
</h3>


<p>
<strong>
Team:
</strong>

${teamName.value}

</p>


<p>
<strong>
School:
</strong>

${schoolName.value}

</p>


<p>
<strong>
Size:
</strong>

${teamSize.value}

Members

</p>


</div>




<div class="review-section">

<h3>
MEMBERS
</h3>


${
members.map(
(m,i)=>`

<p>

<strong>
Member ${i+1}
</strong>

${m.name}

(Class ${m.class})

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

${email.value}

</p>


<p>

${phone.value}

</p>


<p>

${mentor.value || "Not Provided"}

</p>


</div>


`;



}
// ================= FIREBASE SUBMISSION =================


const registrationForm =
document.getElementById(
"registrationForm"
);





registrationForm
?.addEventListener(
"submit",
async(e)=>{


e.preventDefault();




const submitBtn =
document.querySelector(
".registration-submit"
);



if(submitBtn){

submitBtn.disabled=true;

submitBtn.innerText=
"Submitting...";

}




let members=[];



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


});






let events=[];



document
.querySelectorAll(
'input[name="events"]:checked'
)
.forEach(
(event)=>{


events.push(
event.value
);


});







const registrationID =

"BOTXCEL-" +

Date.now()
.toString()
.slice(-6);







const data={


registrationID,


teamName:
teamName.value,


school:
schoolName.value,


teamSize:
teamSize.value,


members,


events,


email:
email.value,


phone:
phone.value,


mentor:
mentor.value || "Not Provided",


registeredAt:
new Date()
.toISOString()



};






try{



await set(

push(
ref(
database,
"registrations"
)

),

data

);






showSuccess(data);



}

catch(error){



console.error(error);


alert(
"Registration failed."
);



if(submitBtn){

submitBtn.disabled=false;

submitBtn.innerText=
"Submit Registration";

}


}



});








// ================= SUCCESS SCREEN =================


function showSuccess(data){



const form =
document.getElementById(
"registrationForm"
);



form.style.display="none";




const success =
document.getElementById(
"successScreen"
);



success.style.display="flex";





document
.getElementById(
"registrationID"
)
.innerText =
data.registrationID;





document
.getElementById(
"successTeamName"
)
.innerText =
data.teamName;





document
.getElementById(
"successEvents"
)
.innerText =
data.events.join(", ");




}






// ================= REQUIRED ELEMENTS =================


const teamName =
document.getElementById(
"teamName"
);


const schoolName =
document.getElementById(
"schoolName"
);


const teamSize =
document.getElementById(
"teamSize"
);


const email =
document.getElementById(
"email"
);


const phone =
document.getElementById(
"phone"
);


const mentor =
document.getElementById(
"mentor"
);





// ================= START =================


openStep(1);
