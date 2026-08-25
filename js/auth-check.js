/* =====================================================
   BOTXCEL 2026
   ROLE CHECK SYSTEM
===================================================== */


import {

initializeApp

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";



import {

getAuth,

onAuthStateChanged

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



import {

getDatabase,

ref,

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
   CHECK USER ROLE
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





if(!snapshot.exists()){


alert(
"User role not found"
);


return;


}





const userData =
snapshot.val();





if(
userData.role === "author"
){


window.location.href =
"author-dashboard.html";


}






else if(

userData.role === "agent"

){


window.location.href =
"agent-dashboard.html";


}





else{


alert(
"Invalid account role"
);


}



}

);
