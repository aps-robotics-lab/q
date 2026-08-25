/* =========================================================
   BOTXCEL 2026
   REGISTRATION JAVASCRIPT
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
set,
get,
child

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";








/* =========================================================
   FIREBASE CONFIG
========================================================= */


const firebaseConfig = {


apiKey: "YOUR_API_KEY",

authDomain: "YOUR_PROJECT.firebaseapp.com",

databaseURL: "YOUR_DATABASE_URL",

projectId: "YOUR_PROJECT_ID",

storageBucket: "YOUR_STORAGE_BUCKET",

messagingSenderId: "YOUR_SENDER_ID",

appId: "YOUR_APP_ID"


};





const app =
initializeApp(firebaseConfig);



const database =
getDatabase(app);









/* =========================================================
   FORM
========================================================= */


const form =
document.getElementById(
"registrationForm"
);










form.addEventListener(
"submit",
async function(e){


e.preventDefault();







// SELECTED EVENTS


const events = 
Array.from(
document.querySelectorAll(
'input[name="events"]:checked'
)

)

.map(
item => item.value
);






if(events.length === 0){


alert(
"Please select at least one event."
);


return;


}










// MEMBERS ARRAY


const members = [];





for(let i=1;i<=5;i++){


const name =
form[`member${i}`].value.trim();



const studentClass =
form[`class${i}`].value;




if(name !== ""){


members.push({


name:name,


class:studentClass,


role:
i===1
?
"Team Leader"
:
"Member"



});


}


}









// TEAM DATA


const registrationData = {


teamName:
form.teamName.value,


school:
form.schoolName.value,



events:events,



members:members,



contact:{


email:
form.email.value,


phone:
form.phone.value,


mentor:
form.mentor.value


},




registeredAt:
new Date()
.toISOString()



};









try{



const registrationRef =
push(
ref(database,"registrations")
);





await set(
registrationRef,
registrationData
);






alert(
"BOTXCEL 2026 Registration Successful!"
);





form.reset();






}

catch(error){



console.error(error);



alert(
"Registration failed. Please try again."
);



}



});
