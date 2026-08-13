/* ==========================================================
   PBDPC Website
   components.js
   Dynamic HTML Component Loader
   Version : 1.0
========================================================== */

"use strict";

/* ==========================================================
   LOAD HTML COMPONENT
========================================================== */

async function loadComponent(selector, file) {

    const element = document.querySelector(selector);

    if (!element) return;

    try {

        const response = await fetch(file);

        if (!response.ok) {

            throw new Error(`Unable to load ${file}`);

        }

        const html = await response.text();

        element.innerHTML = html;

    }

    catch (error) {

        console.error(error);

        element.innerHTML = `
            <div style="
                padding:20px;
                background:#ffe5e5;
                color:#b00020;
                border:1px solid #ffb5b5;
                border-radius:8px;
                margin:20px;">
                Failed to load component:
                <strong>${file}</strong>
            </div>
        `;

    }

}

/* ==========================================================
   LOAD ALL COMPONENTS
========================================================== */

async function loadComponents() {

    await Promise.all([

        loadComponent(
            "#announcement",
            "components/announcement.html"
        ),

        loadComponent(
            "#header",
            "components/header.html"
        ),

        loadComponent(
            "#footer",
            "components/footer.html"
        )

    ]);

    initializeAfterLoad();

}

/* ==========================================================
   AFTER COMPONENTS LOADED
========================================================== */

function initializeAfterLoad() {

    if (typeof initStickyHeader === "function") {

        initStickyHeader();

    }

    if (typeof initMobileMenu === "function") {

        initMobileMenu();

    }

    if (typeof initDropdownMenu === "function") {

        initDropdownMenu();

    }

    if (typeof initActiveNavigation === "function") {

        initActiveNavigation();

    }

    if (typeof initScrollTop === "function") {

        initScrollTop();

    }

    if (typeof initFooterYear === "function") {

        initFooterYear();

    }

}

/* ==========================================================
   AUTO LOAD
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadComponents();

});


/* ==========================================================
   RELOAD COMPONENT
========================================================== */

async function reloadComponent(selector, file) {

    await loadComponent(selector, file);

}


/* ==========================================================
   RELOAD ALL
========================================================== */

async function reloadAllComponents() {

    await loadComponents();

}


/* ==========================================================
   EXPORT
========================================================== */

window.loadComponent = loadComponent;

window.reloadComponent = reloadComponent;

window.reloadAllComponents = reloadAllComponents;


/* ==========================================================
   END OF FILE
========================================================== */

document.addEventListener("click", function (e) {

    const backToTop = e.target.closest("#backToTop");

    if (!backToTop) return;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


window.addEventListener("scroll", function () {

    const button = document.getElementById("backToTop");

    if (!button) return;

    if (window.scrollY > 400) {
        button.classList.add("show");
    } else {
        button.classList.remove("show");
    }

});