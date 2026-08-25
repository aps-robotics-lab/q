/* =====================================================
   BOTXCEL 2026
   RULES PAGE JAVASCRIPT
===================================================== */



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



});





nav.querySelectorAll("a")
.forEach(
(link)=>{


link.addEventListener(
"click",
()=>{


nav.classList.remove(
"nav-open"
);



menu.classList.remove(
"menu-open"
);



});


});



}



});









// ===============================
// CARD SCROLL ANIMATION
// ===============================


const cards =

document.querySelectorAll(
".rule-card"
);





const observer =

new IntersectionObserver(

(entries)=>{


entries.forEach(

(entry)=>{


if(entry.isIntersecting){


entry.target.classList.add(
"show"
);


}



}


);



},


{

threshold:0.15

}

);







cards.forEach(

(card)=>{


card.classList.add(
"hidden"
);


observer.observe(
card
);


}

);








// ===============================
// PDF BUTTON CHECK
// ===============================


document
.querySelectorAll(".pdf-btn")
.forEach(

(button)=>{


button.addEventListener(
"click",
()=>{


console.log(
"Opening rule PDF:",
button.href
);


}

);


}

);
