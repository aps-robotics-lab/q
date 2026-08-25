/* =====================================================
   BOTXCEL 2026
   PUBLIC ANNOUNCEMENTS JAVASCRIPT
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









// ===============================
// INITIALIZE FIREBASE
// ===============================


const app =

initializeApp(firebaseConfig);



const database =

getDatabase(app);









// ===============================
// ANNOUNCEMENT CONTAINER
// ===============================


const announcementList =

document.getElementById(
"announcementList"
);









// ===============================
// READ FIREBASE DATA
// ===============================


const announcementsRef =

ref(

database,

"announcements"

);








onValue(

announcementsRef,

(snapshot)=>{



announcementList.innerHTML = "";





if(!snapshot.exists()){


announcementList.innerHTML = `

<div class="loading">

No announcements available.

</div>

`;

return;


}







const data = snapshot.val();






const announcements =

Object.values(data);







// Latest first

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


<h2>

${item.title}

</h2>



<p>

${item.message}

</p>




<div class="announcement-meta">


<span>

📅 ${item.date}

</span>



<span>

✍️ ${item.author}

</span>



<span class="priority">

${item.priority}

</span>



</div>


`;







announcementList.appendChild(card);



}



);




},

(error)=>{


console.error(error);



announcementList.innerHTML = `

<div class="loading">

Unable to load announcements.

</div>

`;


}

);
