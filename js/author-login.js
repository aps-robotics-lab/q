/* =====================================================
   BOTXCEL 2026
   AUTHOR LOGIN JAVASCRIPT
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

signInWithEmailAndPassword,

onAuthStateChanged

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";









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






const app =

initializeApp(firebaseConfig);



const auth =

getAuth(app);









// ===============================
// ELEMENTS
// ===============================


const emailInput =

document.getElementById(
"email"
);



const passwordInput =

document.getElementById(
"password"
);



const loginBtn =

document.getElementById(
"loginBtn"
);



const loginStatus =

document.getElementById(
"loginStatus"
);









// ===============================
// LOGIN
// ===============================


loginBtn.addEventListener(

"click",

async()=>{



const email =

emailInput.value.trim();



const password =

passwordInput.value.trim();






if(
email === "" ||
password === ""
){


loginStatus.innerText =

"Enter email and password";


return;


}








loginBtn.innerText =

"Checking...";







try{


await signInWithEmailAndPassword(

auth,

email,

password

);





loginStatus.innerText =

"Login Successful ✓";






setTimeout(()=>{


window.location.href =

"author.html";


},1000);




}

catch(error){



console.error(error);



loginStatus.innerText =

"Invalid Author account";



loginBtn.innerText =

"Login";



}



}

);









// ===============================
// IF ALREADY LOGIN
// ===============================


onAuthStateChanged(

auth,

(user)=>{


if(user){



// optional auto redirect


// window.location.href="author.html";



}



}

);
