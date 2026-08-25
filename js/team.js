/* =====================================================
   BOTXCEL 2026
   TEAM PAGE JAVASCRIPT
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
// TEAM CARD ANIMATION
// ===============================


const teamCards =

document.querySelectorAll(
".team-card"
);





const teamObserver =

new IntersectionObserver(

(entries)=>{


entries.forEach(

(entry)=>{


if(entry.isIntersecting){


entry.target.classList.add(
"team-show"
);


}



}


);



},

{

threshold:0.15

}

);







teamCards.forEach(

(card)=>{


card.classList.add(
"team-hidden"
);


teamObserver.observe(
card
);


}

);
