/* =====================================================
   BOTXCEL 2026
   ANNOUNCEMENTS FIREBASE JAVASCRIPT
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

getDatabase,

ref,

onValue

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








const app =

initializeApp(firebaseConfig);



const database =

getDatabase(app);









// ===============================
// LOAD ANNOUNCEMENTS
// ===============================


const announcementList =

document.getElementById(
"announcementList"
);






const announcementsRef =

ref(
database,
"announcements"
);









onValue(

announcementsRef,

(snapshot)=>{



if(!announcementList)
return;





announcementList.innerHTML = "";






if(!snapshot.exists()){


announcementList.innerHTML = `

<div class="loading">

No announcements available.

</div>

`;

return;


}







let announcements = [];






snapshot.forEach(

(child)=>{


announcements.push({

id:child.key,

...child.val()

});


}

);









// newest first


announcements.reverse();









announcements.forEach(

(item)=>{





const card =

document.createElement(
"div"
);



card.className =
"announcement-card";






card.innerHTML = `


<div class="announcement-top">


<div class="announcement-title">

${item.title || "Announcement"}

</div>



<div class="announcement-date">

${item.date || ""}

</div>


</div>





<div class="announcement-message">

${item.message || ""}

</div>





<span class="priority ${

(item.priority || "normal").toLowerCase()

}">

${item.priority || "NORMAL"}

</span>


`;







announcementList.appendChild(card);





});



},



(error)=>{


console.error(
"Firebase Error:",
error
);



announcementList.innerHTML = `

<div class="loading">

Unable to load announcements.

</div>

`;



}

);









// ===============================
// MOBILE MENU
// ===============================


document.addEventListener(

"DOMContentLoaded",

()=>{



const menu =

document.getElementById(
"menuToggle"
);



const nav =

document.getElementById(
"mainNav"
);





if(menu && nav){



menu.addEventListener(

"click",

()=>{


menu.classList.toggle(
"menu-open"
);


nav.classList.toggle(
"nav-open"
);


}

);





}



}

);
