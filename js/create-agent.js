/* =====================================================
   BOTXCEL 2026
   CREATE AGENT SYSTEM
===================================================== */


/* ===============================
   FIREBASE IMPORTS
=============================== */


import {

initializeApp

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";



import {

getAuth,

onAuthStateChanged,

createUserWithEmailAndPassword

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



import {

getDatabase,

ref,

set,

get

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";







/* ===============================
   FIREBASE CONFIG
=============================== */


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






/* ===============================
   INITIALIZE
=============================== */


const app =
initializeApp(firebaseConfig);


const auth =
getAuth(app);


const database =
getDatabase(app);









/* ===============================
   ELEMENTS
=============================== */


const form =

document.getElementById(
"createAgentForm"
);



const statusText =

document.getElementById(
"agentStatus"
);





const button =

document.getElementById(
"createAgentBtn"
);








/* ===============================
   CHECK AUTHOR
=============================== */


onAuthStateChanged(

auth,

async(user)=>{


if(!user){


window.location.href =
"author-login.html";


return;


}




const userRef =

ref(

database,

"users/" + user.uid

);




const snapshot =

await get(
userRef
);





if(
!snapshot.exists() ||

snapshot.val().role !== "author"

){


alert(
"Only Author can create agents."
);



window.location.href =
"author-dashboard.html";


}



}

);









/* ===============================
   CREATE AGENT
=============================== */


form.addEventListener(

"submit",

async(e)=>{


e.preventDefault();





const name =

document.getElementById(
"agentName"
)
.value
.trim();




const email =

document.getElementById(
"agentEmail"
)
.value
.trim();




const password =

document.getElementById(
"agentPassword"
)
.value
.trim();









if(
name === "" ||
email === "" ||
password === ""
){


statusText.innerText =
"Fill all fields";


return;


}








button.disabled=true;


button.innerText=
"CREATING...";








try{



const result =

await createUserWithEmailAndPassword(

auth,

email,

password

);





const uid =

result.user.uid;









await set(

ref(

database,

"users/" + uid

),

{


name:name,


email:email,


role:"agent",


createdAt:

new Date()
.toISOString()


}

);








statusText.innerText =

"Agent created successfully ✓";





form.reset();






}



catch(error){



console.error(error);



statusText.innerText =

error.message;



}





button.disabled=false;


button.innerText=

"CREATE AGENT";



}

);
