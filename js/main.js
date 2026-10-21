/* ========================================
   OUR STORY — MAIN JAVASCRIPT
   Navigation & Global Interactions
======================================== */


/* ========================================
   MOBILE MENU
======================================== */

const mobileMenuButton =
    document.querySelector(".mobile-menu-button");

const desktopNav =
    document.querySelector(".desktop-nav");


if (mobileMenuButton && desktopNav) {

    mobileMenuButton.addEventListener("click", () => {

        desktopNav.classList.toggle("mobile-open");

        mobileMenuButton.classList.toggle("active");

    });

}


/* ========================================
   CLOSE MENU AFTER CLICK
======================================== */

const navigationLinks =
    document.querySelectorAll(".desktop-nav a");


navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        desktopNav.classList.remove("mobile-open");

        mobileMenuButton.classList.remove("active");

    });

});


/* ========================================
   MOBILE BOTTOM NAV
======================================== */

const bottomNavLinks =
    document.querySelectorAll(
        ".mobile-bottom-nav a"
    );


bottomNavLinks.forEach((link) => {

    link.addEventListener("click", () => {

        bottomNavLinks.forEach((item) => {

            item.classList.remove("active");

        });

        link.classList.add("active");

    });

});


/* ========================================
   HEADER SCROLL EFFECT
======================================== */

const header =
    document.querySelector(".site-header");


if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}


/* ========================================
   PAGE LOADED
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("page-loaded");

});