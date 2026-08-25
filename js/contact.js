/* =========================================================
   BOTXCEL 2026
   CONTACT INQUIRY FIREBASE SYSTEM
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


const app = initializeApp(firebaseConfig);


const database = getDatabase(app);








/* =========================================================
   ELEMENTS
========================================================= */


const contactForm =

document.getElementById(
"contactForm"
);



const statusBox =

document.getElementById(
"contactFormStatus"
);



const submitButton =

document.getElementById(
"contactSubmit"
);









/* =========================================================
   SUBMIT INQUIRY
========================================================= */


if(contactForm){


contactForm.addEventListener(

"submit",

async(e)=>{


e.preventDefault();







const name =

document.getElementById(
"contactName"
)
.value
.trim();





const email =

document.getElementById(
"contactEmail"
)
.value
.trim();





const phone =

document.getElementById(
"contactPhone"
)
.value
.trim();





const subject =

document.getElementById(
"contactSubject"
)
.value;





const message =

document.getElementById(
"contactMessage"
)
.value
.trim();







const consent =

document.getElementById(
"contactConsent"
)
.checked;









// VALIDATION


if(

name === "" ||

email === "" ||

subject === "" ||

message === ""

){


showStatus(

"Please fill all required fields.",

"error"

);


return;

}



if(!consent){


showStatus(

"Please confirm the information.",

"error"

);


return;


}








if(

phone !== "" &&

phone.length !== 10

){


showStatus(

"Enter valid 10 digit mobile number.",

"error"

);


return;


}








// BUTTON LOADING


if(submitButton){


submitButton.disabled = true;


submitButton.querySelector("span").innerText =

"Sending...";


}








// DATABASE REFERENCE


const inquiryRef =

push(

ref(

database,

"inquiries"

)

);








const inquiryData = {


name:name,


email:email,


phone:phone,


subject:subject,


message:message,


status:"pending",


submittedAt:

new Date()
.toISOString()



};









try{


await set(

inquiryRef,

inquiryData

);





showStatus(

"Message sent successfully ✓ Our team will contact you soon.",

"success"

);





contactForm.reset();





}



catch(error){


console.error(

"Firebase Error:",

error

);



showStatus(

"Message failed. Please try again.",

"error"

);



}








finally{



if(submitButton){


submitButton.disabled=false;


submitButton.querySelector("span").innerText =

"SEND MESSAGE";


}



}





}

);


}









/* =========================================================
   STATUS MESSAGE
========================================================= */


function showStatus(

message,

type

){



if(!statusBox){

return;

}





statusBox.innerHTML =

message;



statusBox.className =

"contact-form-status " + type;





setTimeout(()=>{


statusBox.innerHTML="";


},

5000

);



}
