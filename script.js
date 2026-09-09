/* =========================================================
   SaCha Creative Portfolio
   script.js
   ========================================================= */


/* =========================================================
   1. PAGE LOADED
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("SaCha Creative Portfolio loaded successfully.");

});


/* =========================================================
   2. NAVBAR SCROLL EFFECT
   ========================================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =========================================================
   3. ACTIVE NAVIGATION LINK
   ========================================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);

updateActiveNavigation();


/* =========================================================
   4. SMOOTH SCROLLING
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   5. SCROLL REVEAL ANIMATION
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-text, .stat, .service-card, .project-card, .contact-content, .contact-details"
);


/*
   Initial state
*/

revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform = "translateY(40px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

});


/*
   Observer
*/

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   6. STAGGER CARD ANIMATIONS
   ========================================================= */

const cardGroups = [
    ".services-grid .service-card",
    ".projects-grid .project-card",
    ".about-stats .stat"
];


cardGroups.forEach((selector) => {

    const cards = document.querySelectorAll(selector);

    cards.forEach((card, index) => {

        card.style.transitionDelay = `${index * 0.1}s`;

    });

});


/* =========================================================
   7. HERO CARD PARALLAX
   ========================================================= */

const heroCard = document.querySelector(".hero-card");

if (heroCard && window.innerWidth > 700) {

    window.addEventListener("mousemove", (event) => {

        const x = (window.innerWidth / 2 - event.clientX) / 50;

        const y = (window.innerHeight / 2 - event.clientY) / 50;

        heroCard.style.transform =
            `rotate(3deg) translate(${x}px, ${y}px)`;

    });


    heroCard.addEventListener("mouseleave", () => {

        heroCard.style.transform = "rotate(3deg)";

    });

}


/* =========================================================
   8. PROJECT CARD INTERACTION
   ========================================================= */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.cursor = "pointer";

    });

});


/* =========================================================
   9. BUTTON CLICK EFFECT
   ========================================================= */

const buttons = document.querySelectorAll(".btn, .nav-button");

buttons.forEach((button) => {

    button.addEventListener("click", () => {

        button.classList.add("clicked");

        setTimeout(() => {

            button.classList.remove("clicked");

        }, 250);

    });

});


/* =========================================================
   10. SCROLL PROGRESS
   ========================================================= */


/*
   Create progress bar
*/

const progressBar = document.createElement("div");

progressBar.className = "scroll-progress";

document.body.appendChild(progressBar);


/*
   Style progress bar using JavaScript
*/

progressBar.style.position = "fixed";

progressBar.style.top = "0";

progressBar.style.left = "0";

progressBar.style.width = "0%";

progressBar.style.height = "3px";

progressBar.style.background = "#f97316";

progressBar.style.zIndex = "9999";

progressBar.style.transition = "width 0.1s linear";


/*
   Update progress
*/

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const scrollPercentage =
        (scrollTop / documentHeight) * 100;

    progressBar.style.width = `${scrollPercentage}%`;

});


/* =========================================================
   11. DYNAMIC FOOTER YEAR
   ========================================================= */

const footerText = document.querySelector(".footer p");

if (footerText) {

    const currentYear = new Date().getFullYear();

    footerText.innerHTML =
        `© ${currentYear} Sala Charles. All rights reserved.`;

}


/* =========================================================
   12. TYPING EFFECT
   ========================================================= */

const typingElement = document.querySelector(".hero-small-text");

if (typingElement) {

    const words = [
        "CREATIVE DESIGNER",
        "WEB DESIGNER",
        "DIGITAL CREATOR",
        "VISUAL STORYTELLER"
    ];

    let wordIndex = 0;

    let characterIndex = 0;

    let deleting = false;


    function typeEffect() {

        const currentWord = words[wordIndex];


        if (!deleting) {

            typingElement.textContent =
                currentWord.slice(0, characterIndex + 1);

            characterIndex++;


            if (characterIndex === currentWord.length) {

                deleting = true;

                setTimeout(typeEffect, 1500);

                return;

            }

        } else {

            typingElement.textContent =
                currentWord.slice(0, characterIndex - 1);

            characterIndex--;


            if (characterIndex === 0) {

                deleting = false;

                wordIndex++;

                if (wordIndex >= words.length) {

                    wordIndex = 0;

                }

            }

        }


        const speed = deleting ? 50 : 90;

        setTimeout(typeEffect, speed);

    }


    typeEffect();

}


/* =========================================================
   GLOBAL PAGE TRANSITION LOADER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const loader = document.getElementById("page-loader");

    if (!loader) {
        console.log("Page loader not found.");
        return;
    }


    /* -----------------------------------------
       SHOW PAGE
    ----------------------------------------- */

    window.addEventListener("load", function () {

        setTimeout(function () {

            loader.classList.add("loaded");

        }, 800);

    });


    /* -----------------------------------------
       PAGE-TO-PAGE LINKS
    ----------------------------------------- */

    document.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function (event) {

            const href = link.getAttribute("href");


            /* No link */

            if (!href) {
                return;
            }


            /* Same-page links such as #projects */

            if (href.startsWith("#")) {
                return;
            }


            /* Email links */

            if (href.startsWith("mailto:")) {
                return;
            }


            /* Phone links */

            if (href.startsWith("tel:")) {
                return;
            }


            /* External websites */

            if (
                href.startsWith("http://") ||
                href.startsWith("https://")
            ) {
                return;
            }


            /* Open in new tab */

            if (link.target === "_blank") {
                return;
            }


            /* Stop normal navigation */

            event.preventDefault();


            /* Show loader */

            loader.classList.remove("loaded");


            /* Wait for loader animation */

            setTimeout(function () {

                window.location.href = href;

            }, 700);

        });

    });

});