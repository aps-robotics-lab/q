/* =========================================================
   BOTXCEL 2026
   CONTACT FORM JAVASCRIPT
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



const app =
initializeApp(firebaseConfig);



const database =
getDatabase(app);






/* =========================================================
   CONTACT FORM
========================================================= */


const contactForm =
document.getElementById(
"contactForm"
);





if(contactForm){


contactForm.addEventListener(

"submit",

async(event)=>{


event.preventDefault();




const submitButton =
document.querySelector(
".contact-submit"
);



if(submitButton){

submitButton.disabled = true;

submitButton.innerText =
"Sending...";

}






const name =
document.getElementById(
"contactName"
).value.trim();




const email =
document.getElementById(
"contactEmail"
).value.trim();




const phone =
document.getElementById(
"contactPhone"
).value.trim();




const message =
document.getElementById(
"contactMessage"
).value.trim();







if(
name === "" ||
email === "" ||
message === ""
){


alert(
"Please fill required fields."
);


if(submitButton){

submitButton.disabled=false;

submitButton.innerText=
"Send Message";

}


return;


}








const messageID =
push(
ref(
database,
"contactMessages"
)

);








const contactData = {


name:name,


email:email,


phone:phone,


message:message,


submittedAt:
new Date().toISOString()


};








try{


await set(

messageID,

contactData

);





showContactSuccess();





contactForm.reset();




}

catch(error){


console.error(
error
);



alert(
"Message failed. Please try again."
);



}





if(submitButton){

submitButton.disabled=false;

submitButton.innerText=
"Send Message";

}




}


);


}








/* =========================================================
   SUCCESS MESSAGE
========================================================= */


function showContactSuccess(){



const success =
document.getElementById(
"contactSuccess"
);



if(success){


success.style.display =
"block";



success.innerHTML = `

<strong>
Message Sent Successfully!
</strong>

<br>

Thank you for contacting BOTXCEL 2026.
We will contact you soon.

`;



setTimeout(

()=>{


success.style.display =
"none";


},

5000

);


}



}
