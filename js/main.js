/* BOTXCEL TEST MAIN.JS */

document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("site-ready");

    const loader = document.getElementById("pageLoader");

    if (loader) {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        loader.style.pointerEvents = "none";
    }

});
