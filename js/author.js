/* =====================================================
   BOTXCEL 2026
   AUTHOR DASHBOARD JAVASCRIPT
===================================================== */


// ===============================
// FIREBASE IMPORTS
// ===============================


import {

initializeApp

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";



import {

getAuth,
onAuthStateChanged,
signOut

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



import {

getDatabase,
ref,
push,
set

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";







// ===============================
// FIREBASE CONFIG
// ===============================


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







// ===============================
// INITIALIZE FIREBASE
// ===============================


const app =
initializeApp(firebaseConfig);



const auth =
getAuth(app);



const database =
getDatabase(app);








// ===============================
// AUTHOR LOGIN CHECK
// ===============================


onAuthStateChanged(

auth,

(user)=>{


if(!user){


window.location.href =
"author-login.html";


}


}

);









// ===============================
// ELEMENTS
// ===============================


const publishBtn =
document.getElementById(
"publishBtn"
);



const status =
document.getElementById(
"status"
);



const logoutBtn =
document.getElementById(
"logoutBtn"
);









// ===============================
// LOGOUT
// ===============================


if(logoutBtn){


logoutBtn.addEventListener(

"click",

async()=>{


await signOut(auth);


window.location.href =
"author-login.html";


}

);


}









// ===============================
// PUBLISH ANNOUNCEMENT
// ===============================


if(publishBtn){



publishBtn.addEventListener(

"click",

async()=>{



const title =

document.getElementById(
"title"
).value.trim();





const message =

document.getElementById(
"message"
).value.trim();





const date =

document.getElementById(
"date"
).value;





const priority =

document.getElementById(
"priority"
).value;








if(

title === "" ||

message === "" ||

date === ""

){


status.innerText =
"Please fill all fields";


return;


}








const announcementRef =

push(

ref(
database,
"announcements"

)

);









const announcementData = {


title:title,


message:message,


date:date,


priority:priority,


author:"BOTXCEL Author",


createdAt:

new Date().toISOString()


};









try{


await set(

announcementRef,

announcementData

);





status.innerText =

"Announcement Published Successfully ✓";






document.getElementById(
"title"
).value="";



document.getElementById(
"message"
).value="";



document.getElementById(
"date"
).value="";




}

catch(error){



console.error(error);



status.innerText =

"Publishing Failed";


}



}


);



}
