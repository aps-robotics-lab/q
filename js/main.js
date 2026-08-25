/* =========================================================
   BOTXCEL 2026
   MAIN JAVASCRIPT
========================================================= */



document.addEventListener(
"DOMContentLoaded",
function(){



/* =========================================================
   FAST PRELOADER
========================================================= */


const preloader =
document.getElementById("preloader");



if(preloader){


window.addEventListener(
"load",
()=>{


setTimeout(
()=>{


preloader.classList.add("hide");


document.body.classList.remove(
"loading"
);



},
700
);


});


}









/* =========================================================
   SCROLL REVEAL
========================================================= */


const revealElements =
document.querySelectorAll(
".home-reveal"
);



const revealObserver =
new IntersectionObserver(
(entries)=>{


entries.forEach(
(entry)=>{


if(entry.isIntersecting){


entry.target.classList.add(
"show"
);



revealObserver.unobserve(
entry.target
);



}



});


},
{

threshold:0.15

}
);





revealElements.forEach(
(element)=>{


revealObserver.observe(
element
);



}
);









/* =========================================================
   HEADER BACKGROUND ON SCROLL
========================================================= */


const header =
document.querySelector(
".site-header"
);



window.addEventListener(
"scroll",
()=>{


if(!header) return;



if(window.scrollY > 50){


header.classList.add(
"header-scrolled"
);



}

else{


header.classList.remove(
"header-scrolled"
);



}



});





});
