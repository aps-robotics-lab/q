/* =========================================================
   BOTXCEL 2026
   HOME JAVASCRIPT
========================================================= */



document.addEventListener(
"DOMContentLoaded",
function(){



/* =========================================================
   EVENT COUNTDOWN
   03 SEPTEMBER 2026
========================================================= */


const eventDate =
new Date(
"September 3, 2026 09:00:00"
).getTime();





const eventTimer =
setInterval(
function(){



const now =
new Date().getTime();



const distance =
eventDate - now;





if(distance <= 0){


clearInterval(eventTimer);



document.getElementById(
"eventDays"
).innerHTML = "00";


document.getElementById(
"eventHours"
).innerHTML = "00";


document.getElementById(
"eventMinutes"
).innerHTML = "00";


document.getElementById(
"eventSeconds"
).innerHTML = "00";



return;


}






const days =
Math.floor(
distance /
(1000 * 60 * 60 * 24)
);



const hours =
Math.floor(
(distance %
(1000 * 60 * 60 * 24))
/
(1000 * 60 * 60)
);



const minutes =
Math.floor(
(distance %
(1000 * 60 * 60))
/
(1000 * 60)
);



const seconds =
Math.floor(
(distance %
(1000 * 60))
/
1000
);






document.getElementById(
"eventDays"
).innerHTML =
String(days).padStart(2,"0");



document.getElementById(
"eventHours"
).innerHTML =
String(hours).padStart(2,"0");



document.getElementById(
"eventMinutes"
).innerHTML =
String(minutes).padStart(2,"0");



document.getElementById(
"eventSeconds"
).innerHTML =
String(seconds).padStart(2,"0");




},
1000
);









/* =========================================================
   REGISTRATION DEADLINE COUNTDOWN
   31 AUGUST 2026
========================================================= */


const registrationDate =
new Date(
"August 31, 2026 23:59:59"
).getTime();






const registrationTimer =
setInterval(
function(){



const now =
new Date().getTime();



const distance =
registrationDate - now;






const output =
document.getElementById(
"registrationTimer"
);




if(!output)
return;






if(distance <= 0){


output.innerHTML =
"REGISTRATION CLOSED";



clearInterval(
registrationTimer
);



return;


}





const days =
Math.floor(
distance /
(1000 * 60 * 60 * 24)
);



const hours =
Math.floor(
(distance %
(1000 * 60 * 60 * 24))
/
(1000 * 60 * 60)
);



const minutes =
Math.floor(
(distance %
(1000 * 60 * 60))
/
(1000 * 60)
);






output.innerHTML =

days +
" Days " +

hours +
" Hours " +

minutes +
" Minutes";





},
1000
);





});
