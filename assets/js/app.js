/* ==========================================================
   PBDPC Website
   app.js

   Version : 1.1
   Purpose : Global website functionality
   ========================================================== */

"use strict";


/* ==========================================================
   CONFIGURATION
   ========================================================== */

const PBDPC_CONFIG = {

    basePath: "/PBDPC/",

    mobileBreakpoint: 768,

    scrollHeaderOffset: 80,

    scrollTopOffset: 300,

    revealThreshold: 0.15,

    counterThreshold: 0.5

};


/* ==========================================================
   DOM READY
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /*
     * Header
     */

    initStickyHeader();

    initMobileMenu();

    initDropdownMenu();

    initActiveNavigation();

    initScrollTop();

    initFooterYear();


    /*
     * Home / General
     */

    initCounter();

    initRevealAnimation();

    initSmoothScroll();

    initLazyImages();

    initGalleryLightbox();

    initHeroAnimation();


    /*
     * Extra Pages
     */

    initLoader();

    initContactForm();

    initLoadMore();

    initGalleryFilter();

    initStaticGalleryLightbox();

    initSponsorSearch();

    initScrollSpy();

});


/* ==========================================================
   STICKY HEADER
   ========================================================== */

function initStickyHeader() {

    const header =
        document.querySelector(".site-header");

    if (!header) return;


    const updateHeader = () => {

        if (window.scrollY >
            PBDPC_CONFIG.scrollHeaderOffset) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

}


/* ==========================================================
   MOBILE MENU
   ========================================================== */

function initMobileMenu() {

    const menuBtn =
        document.querySelector(".nav-toggle");

    const nav =
        document.querySelector(".main-nav");

    if (!menuBtn || !nav) return;


    menuBtn.addEventListener("click", () => {

        const isOpen =
            nav.classList.toggle("open");

        menuBtn.classList.toggle(
            "active",
            isOpen
        );

        menuBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    });


    /*
     * Close menu after normal navigation
     */

    nav.querySelectorAll(
        "a:not(.dropdown-toggle)"
    ).forEach(link => {

        link.addEventListener("click", () => {

            closeMobileMenu(
                nav,
                menuBtn
            );

        });

    });


    /*
     * Close menu when clicking outside
     */

    document.addEventListener(
        "click",
        event => {

            if (!nav.classList.contains("open")) {
                return;
            }


            const clickedInsideNav =
                nav.contains(event.target);

            const clickedMenuButton =
                menuBtn.contains(event.target);


            if (
                !clickedInsideNav &&
                !clickedMenuButton
            ) {

                closeMobileMenu(
                    nav,
                    menuBtn
                );

            }

        }
    );


    /*
     * Escape key
     */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                nav.classList.contains("open")
            ) {

                closeMobileMenu(
                    nav,
                    menuBtn
                );

            }

        }
    );


    /*
     * Reset menu on desktop resize
     */

    window.addEventListener(
        "resize",
        debounce(() => {

            if (
                window.innerWidth >
                PBDPC_CONFIG.mobileBreakpoint
            ) {

                closeMobileMenu(
                    nav,
                    menuBtn
                );

                closeAllDropdowns();

            }

        }, 150)
    );

}


/* ==========================================================
   CLOSE MOBILE MENU
   ========================================================== */

function closeMobileMenu(nav, menuBtn) {

    if (!nav || !menuBtn) return;


    nav.classList.remove("open");

    menuBtn.classList.remove("active");

    menuBtn.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.classList.remove(
        "menu-open"
    );

}


/* ==========================================================
   MOBILE DROPDOWN MENU
   ========================================================== */

function initDropdownMenu() {

    const dropdownItems =
        document.querySelectorAll(
            ".navbar li"
        );

    if (!dropdownItems.length) return;


    dropdownItems.forEach(item => {

        const submenu =
            item.querySelector(
                ":scope > .dropdown"
            );

        if (!submenu) return;


        const link =
            item.querySelector(
                ":scope > a"
            );

        if (!link) return;


        /*
         * Accessibility
         */

        link.setAttribute(
            "aria-haspopup",
            "true"
        );

        link.setAttribute(
            "aria-expanded",
            "false"
        );


        link.addEventListener(
            "click",
            event => {

                /*
                 * Desktop:
                 * allow normal navigation
                 */

                if (
                    window.innerWidth >
                    PBDPC_CONFIG.mobileBreakpoint
                ) {

                    return;

                }


                /*
                 * Mobile:
                 * toggle submenu
                 */

                event.preventDefault();

                const isOpen =
                    item.classList.toggle(
                        "open"
                    );


                link.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                /*
                 * Close other dropdowns
                 */

                dropdownItems.forEach(
                    otherItem => {

                        if (
                            otherItem !== item
                        ) {

                            otherItem.classList.remove(
                                "open"
                            );

                            const otherLink =
                                otherItem.querySelector(
                                    ":scope > a"
                                );

                            if (otherLink) {

                                otherLink.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                            }

                        }

                    }
                );

            }
        );

    });

}


/* ==========================================================
   CLOSE ALL DROPDOWNS
   ========================================================== */

function closeAllDropdowns() {

    document
        .querySelectorAll(
            ".navbar li.open"
        )
        .forEach(item => {

            item.classList.remove("open");

            const link =
                item.querySelector(
                    ":scope > a"
                );

            if (link) {

                link.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

}


/* ==========================================================
   ACTIVE NAVIGATION
   ========================================================== */

function initActiveNavigation() {

    const currentPath =
        window.location.pathname;


    let currentPage =
        currentPath
            .split("/")
            .pop();


    /*
     * Homepage
     */

    if (
        !currentPage ||
        currentPage === "/"
    ) {

        currentPage = "index.html";

    }


    document
        .querySelectorAll(
            ".main-nav a"
        )
        .forEach(link => {

            const href =
                link.getAttribute("href");


            if (!href) return;


            /*
             * Ignore:
             * anchors
             * external URLs
             * javascript links
             */

            if (
                href.startsWith("#") ||
                href.startsWith("http") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:") ||
                href.startsWith("javascript:")
            ) {

                return;

            }


            const cleanHref =
                href
                    .split("#")[0]
                    .split("?")[0]
                    .split("/")
                    .pop();


            if (
                cleanHref === currentPage
            ) {

                link.classList.add(
                    "active"
                );


                /*
                 * Also mark parent dropdown
                 */

                const parentItem =
                    link.closest(
                        "li"
                    );

                if (parentItem) {

                    const parentDropdown =
                        parentItem.closest(
                            ".dropdown"
                        );

                    if (parentDropdown) {

                        const parentLi =
                            parentDropdown.closest(
                                "li"
                            );

                        if (parentLi) {

                            parentLi
                                .querySelector(
                                    ":scope > a"
                                )
                                ?.classList
                                .add("active");

                        }

                    }

                }

            }

        });

}


/* ==========================================================
   SCROLL TO TOP
   ========================================================== */

function initScrollTop() {

    const btn =
        document.querySelector(
            ".scroll-top"
        );

    if (!btn) return;


    const updateButton = () => {

        if (
            window.scrollY >
            PBDPC_CONFIG.scrollTopOffset
        ) {

            btn.classList.add("active");

        } else {

            btn.classList.remove("active");

        }

    };


    updateButton();


    window.addEventListener(
        "scroll",
        updateButton,
        { passive: true }
    );


    btn.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* ==========================================================
   FOOTER YEAR
   ========================================================== */

function initFooterYear() {

    const year =
        document.getElementById(
            "currentYear"
        );

    if (!year) return;


    year.textContent =
        new Date().getFullYear();

}


/* ==========================================================
   COUNTER ANIMATION
   ========================================================== */

function initCounter() {

    const counters =
        document.querySelectorAll(
            ".counter"
        );

    if (!counters.length) return;


    /*
     * Fallback for old browsers
     */

    if (
        !("IntersectionObserver" in window)
    ) {

        counters.forEach(counter => {

            const target =
                parseInt(
                    counter.dataset.target,
                    10
                ) || 0;

            counter.textContent =
                target.toLocaleString();

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            (entries, obs) => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    const counter =
                        entry.target;


                    const target =
                        parseInt(
                            counter.dataset.target,
                            10
                        ) || 0;


                    const duration = 2000;


                    const startTime =
                        performance.now();


                    const animate = currentTime => {

                        const elapsed =
                            currentTime -
                            startTime;


                        const progress =
                            Math.min(
                                elapsed /
                                duration,
                                1
                            );


                        /*
                         * Ease-out
                         */

                        const eased =
                            1 -
                            Math.pow(
                                1 - progress,
                                3
                            );


                        const current =
                            Math.floor(
                                target * eased
                            );


                        counter.textContent =
                            current.toLocaleString();


                        if (
                            progress < 1
                        ) {

                            requestAnimationFrame(
                                animate
                            );

                        } else {

                            counter.textContent =
                                target.toLocaleString();

                        }

                    };


                    requestAnimationFrame(
                        animate
                    );


                    obs.unobserve(counter);

                });

            },
            {
                threshold:
                    PBDPC_CONFIG.counterThreshold
            }
        );


    counters.forEach(counter => {

        observer.observe(counter);

    });

}


/* ==========================================================
   SCROLL REVEAL
   ========================================================== */

function initRevealAnimation() {

    const elements =
        document.querySelectorAll(
            ".fade-up, .fade-left, .fade-right"
        );

    if (!elements.length) return;


    /*
     * Fallback
     */

    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(element => {

            element.classList.add(
                "show"
            );

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold:
                    PBDPC_CONFIG.revealThreshold
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* ==========================================================
   SMOOTH SCROLL
   ========================================================== */

function initSmoothScroll() {

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const selector =
                        anchor.getAttribute(
                            "href"
                        );


                    if (
                        !selector ||
                        selector === "#"
                    ) {

                        return;

                    }


                    let target;

                    try {

                        target =
                            document.querySelector(
                                selector
                            );

                    } catch (error) {

                        return;

                    }


                    if (!target) return;


                    event.preventDefault();


                    const header =
                        document.querySelector(
                            ".site-header"
                        );


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight -
                        15;


                    window.scrollTo({

                        top:
                            Math.max(
                                targetPosition,
                                0
                            ),

                        behavior:
                            "smooth"

                    });


                    /*
                     * Update URL hash
                     */

                    if (
                        history.pushState
                    ) {

                        history.pushState(
                            null,
                            "",
                            selector
                        );

                    }

                }
            );

        });

}


/* ==========================================================
   LAZY IMAGE LOADING
   ========================================================== */

function initLazyImages() {

    const images =
        document.querySelectorAll(
            "img[data-src]"
        );

    if (!images.length) return;


    /*
     * IntersectionObserver support
     */

    if (
        !("IntersectionObserver" in window)
    ) {

        images.forEach(loadLazyImage);

        return;

    }


    const observer =
        new IntersectionObserver(
            (entries, obs) => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    loadLazyImage(
                        entry.target
                    );


                    obs.unobserve(
                        entry.target
                    );

                });

            },
            {
                rootMargin: "150px 0px"
            }
        );


    images.forEach(image => {

        observer.observe(image);

    });

}


/* ==========================================================
   LOAD LAZY IMAGE
   ========================================================== */

function loadLazyImage(img) {

    if (!img) return;


    const source =
        img.dataset.src;


    if (!source) return;


    img.src = source;


    img.addEventListener(
        "load",
        () => {

            img.removeAttribute(
                "data-src"
            );

            img.classList.add(
                "loaded"
            );

        },
        {
            once: true
        }
    );

}


/* ==========================================================
   GALLERY LIGHTBOX
   ========================================================== */

function initGalleryLightbox() {

    /*
     * gallery.html has its own dedicated static
     * lightbox (#galleryLightbox) with captions and
     * Load More support — handled separately by
     * initStaticGalleryLightbox(). Skip this generic
     * one on that page to avoid double-binding.
     */

    if (
        document.getElementById(
            "galleryLightbox"
        )
    ) {
        return;
    }


    const images =
        document.querySelectorAll(
            ".gallery-grid img"
        );

    if (!images.length) return;


    /*
     * Don't create duplicate lightbox
     */

    let overlay =
        document.querySelector(
            ".pbdpc-lightbox"
        );


    if (!overlay) {

        overlay =
            document.createElement(
                "div"
            );

        overlay.className =
            "pbdpc-lightbox";


        overlay.innerHTML = `

            <button
                type="button"
                class="lightbox-close"
                aria-label="Close image preview"
            >
                &times;
            </button>

            <button
                type="button"
                class="lightbox-prev"
                aria-label="Previous image"
            >
                &#10094;
            </button>

            <img
                class="lightbox-image"
                src=""
                alt="Gallery preview"
            >

            <button
                type="button"
                class="lightbox-next"
                aria-label="Next image"
            >
                &#10095;
            </button>

        `;


        document.body.appendChild(
            overlay
        );

    }


    const preview =
        overlay.querySelector(
            ".lightbox-image"
        );

    const closeBtn =
        overlay.querySelector(
            ".lightbox-close"
        );

    const prevBtn =
        overlay.querySelector(
            ".lightbox-prev"
        );

    const nextBtn =
        overlay.querySelector(
            ".lightbox-next"
        );


    let currentIndex = 0;


    const visibleImages =
        () =>
            Array.from(
                document.querySelectorAll(
                    ".gallery-grid img"
                )
            );


    const showImage = index => {

        const currentImages =
            visibleImages();


        if (!currentImages.length) {
            return;
        }


        currentIndex =
            (
                index +
                currentImages.length
            ) %
            currentImages.length;


        const image =
            currentImages[
                currentIndex
            ];


        preview.src =
            image.currentSrc ||
            image.src;


        preview.alt =
            image.alt ||
            "Gallery preview";


        overlay.classList.add(
            "active"
        );


        document.body.classList.add(
            "lightbox-open"
        );

    };


    const closeLightbox = () => {

        overlay.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "lightbox-open"
        );


        preview.src = "";

    };


    images.forEach(
        (image, index) => {

            image.style.cursor =
                "pointer";


            image.addEventListener(
                "click",
                () => {

                    showImage(index);

                }
            );

        }
    );


    closeBtn?.addEventListener(
        "click",
        closeLightbox
    );


    prevBtn?.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            showImage(
                currentIndex - 1
            );

        }
    );


    nextBtn?.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            showImage(
                currentIndex + 1
            );

        }
    );


    overlay.addEventListener(
        "click",
        event => {

            if (
                event.target === overlay
            ) {

                closeLightbox();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                !overlay.classList.contains(
                    "active"
                )
            ) {

                return;

            }


            if (
                event.key === "Escape"
            ) {

                closeLightbox();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                showImage(
                    currentIndex - 1
                );

            }


            if (
                event.key === "ArrowRight"
            ) {

                showImage(
                    currentIndex + 1
                );

            }

        }
    );

}


/* ==========================================================
   HERO FADE ANIMATION
   ========================================================== */

function initHeroAnimation() {

    const hero =
        document.querySelector(
            ".hero-content"
        );

    if (!hero) return;


    /*
     * Respect reduced motion
     */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        hero.style.opacity = "1";

        hero.style.transform =
            "translateY(0)";

        return;

    }


    hero.animate(
        [
            {
                opacity: 0,

                transform:
                    "translateY(40px)"
            },

            {
                opacity: 1,

                transform:
                    "translateY(0)"
            }
        ],
        {
            duration: 1000,

            easing: "ease-out",

            fill: "forwards"
        }
    );

}


/* ==========================================================
   LOADER
   ========================================================== */

function initLoader() {

    const loader =
        document.querySelector(
            ".loader"
        );

    if (!loader) return;


    const hideLoader = () => {

        setTimeout(() => {

            loader.classList.add(
                "hidden"
            );

        }, 500);

    };


    /*
     * If page already loaded
     */

    if (
        document.readyState ===
        "complete"
    ) {

        hideLoader();

        return;

    }


    window.addEventListener(
        "load",
        hideLoader,
        {
            once: true
        }
    );

}


/* ==========================================================
   CONTACT FORM VALIDATION
   ========================================================== */

function initContactForm() {

    const forms =
        document.querySelectorAll(
            ".contact-form"
        );

    if (!forms.length) return;


    forms.forEach(form => {

        form.addEventListener(
            "submit",
            event => {

                let valid = true;


                const requiredFields =
                    form.querySelectorAll(
                        "[required]"
                    );


                requiredFields.forEach(
                    field => {

                        field.classList.remove(
                            "error"
                        );


                        const value =
                            field.value.trim();


                        if (!value) {

                            valid = false;

                            field.classList.add(
                                "error"
                            );

                        }


                        /*
                         * Email validation
                         */

                        if (
                            field.type ===
                                "email" &&
                            value
                        ) {

                            const emailPattern =
                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                            if (
                                !emailPattern.test(
                                    value
                                )
                            ) {

                                valid = false;

                                field.classList.add(
                                    "error"
                                );

                            }

                        }

                    }
                );


                if (!valid) {

                    event.preventDefault();


                    alert(
                        "Please fill all required fields correctly."
                    );

                }

            }
        );

    });

}


/* ==========================================================
   GALLERY FILTER
   ========================================================== */

function initGalleryFilter() {

    const buttons =
        document.querySelectorAll(
            ".filter-btn"
        );

    const items =
        document.querySelectorAll(
            ".gallery-item"
        );


    if (
        !buttons.length ||
        !items.length
    ) {

        return;

    }


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                buttons.forEach(
                    btn => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                const filter =
                    button.dataset.filter;

                window.PBDPC_GALLERY =
                    window.PBDPC_GALLERY || {};

                window.PBDPC_GALLERY.activeFilter =
                    filter;


                items.forEach(item => {

                    const category =
                        item.dataset.category;


                    const shouldShow =
                        filter === "all" ||
                        category === filter;


                    /*
                     * Use hidden instead of
                     * display:block so existing
                     * grid/flex CSS remains intact.
                     */

                    item.hidden =
                        !shouldShow;


                    item.classList.toggle(
                        "filtered-out",
                        !shouldShow
                    );

                });


                /*
                 * When a specific category is chosen,
                 * "Load More" pagination is bypassed
                 * (all matching items shown). When the
                 * user returns to "All", re-apply the
                 * paginated view.
                 */

                if (
                    window.PBDPC_GALLERY.applyLoadMore
                ) {

                    window.PBDPC_GALLERY.applyLoadMore(
                        filter !== "all"
                    );

                }

            }
        );

    });

}


/* ==========================================================
   SPONSOR SEARCH
   ========================================================== */

function initSponsorSearch() {

    const input =
        document.querySelector(
            "#sponsorSearch"
        );

    if (!input) return;


    const cards =
        document.querySelectorAll(
            ".sponsor-card"
        );

    if (!cards.length) return;


    input.addEventListener(
        "input",
        () => {

            const keyword =
                input.value
                    .trim()
                    .toLowerCase();


            cards.forEach(card => {

                const text =
                    card.textContent
                        .toLowerCase();


                const match =
                    text.includes(
                        keyword
                    );


                card.hidden =
                    !match;

            });

        }
    );

}


/* ==========================================================
   SCROLL SPY
   ========================================================== */

function initScrollSpy() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    if (!sections.length) return;


    const links =
        document.querySelectorAll(
            ".main-nav a[href^=\"#\"]"
        );

    if (!links.length) return;


    /*
     * IntersectionObserver gives
     * smoother ScrollSpy behavior.
     */

    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            const id =
                                entry.target.id;


                            links.forEach(
                                link => {

                                    link.classList.toggle(
                                        "active",
                                        link.getAttribute(
                                            "href"
                                        ) ===
                                        "#" + id
                                    );

                                }
                            );

                        }
                    );

                },
                {
                    rootMargin:
                        "-30% 0px -60% 0px",

                    threshold: 0
                }
            );


        sections.forEach(section => {

            observer.observe(
                section
            );

        });


        return;

    }


    /*
     * Fallback
     */

    window.addEventListener(
        "scroll",
        debounce(() => {

            let current = "";


            sections.forEach(
                section => {

                    const top =
                        section.offsetTop -
                        150;


                    if (
                        window.scrollY >=
                        top
                    ) {

                        current =
                            section.id;

                    }

                }
            );


            links.forEach(link => {

                link.classList.toggle(
                    "active",
                    link.getAttribute(
                        "href"
                    ) ===
                    "#" + current
                );

            });

        }, 100)
    );

}


/* ==========================================================
   DEBOUNCE
   ========================================================== */

function debounce(
    callback,
    delay = 250
) {

    let timer;


    return function (...args) {

        clearTimeout(timer);


        timer =
            setTimeout(
                () => {

                    callback.apply(
                        this,
                        args
                    );

                },
                delay
            );

    };

}


/* ==========================================================
   GLOBAL ERROR HANDLER
   ========================================================== */

window.addEventListener(
    "error",
    event => {

        console.error(
            "[PBDPC] Application Error:",
            event.message
        );

    }
);


/* ==========================================================
   SERVICE WORKER
   ========================================================== */

function registerServiceWorker() {

    /*
     * Service Worker is intentionally
     * not registered on localhost.
     *
     * This avoids unnecessary console
     * errors while testing with
     * VS Code Live Server.
     */

    const hostname =
        window.location.hostname;


    const isLocalhost =
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname === "::1";


    if (isLocalhost) {

        console.info(
            "[PBDPC] Service Worker skipped on localhost."
        );

        return;

    }


    if (
        !("serviceWorker" in navigator)
    ) {

        console.info(
            "[PBDPC] Service Worker is not supported."
        );

        return;

    }


    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register(
                    PBDPC_CONFIG.basePath +
                    "service-worker.js",
                    {
                        scope:
                            PBDPC_CONFIG.basePath
                    }
                )

                .then(
                    registration => {

                        console.info(
                            "[PBDPC] Service Worker registered:",
                            registration.scope
                        );

                    }
                )

                .catch(
                    error => {

                        console.error(
                            "[PBDPC] Service Worker registration failed:",
                            error
                        );

                    }
                );

        },
        {
            once: true
        }
    );

}


/* ==========================================================
   STATIC GALLERY LIGHTBOX
   (gallery.html / temple.html — #galleryLightbox)
   ========================================================== */

function initStaticGalleryLightbox() {

    const lightbox =
        document.getElementById(
            "galleryLightbox"
        );

    if (!lightbox) return;


    const imageEl =
        document.getElementById(
            "lightboxImage"
        );

    const captionEl =
        document.getElementById(
            "lightboxCaption"
        );

    const closeBtn =
        document.getElementById(
            "lightboxClose"
        );

    const prevBtn =
        document.getElementById(
            "lightboxPrev"
        );

    const nextBtn =
        document.getElementById(
            "lightboxNext"
        );


    let currentIndex = 0;


    function getVisibleCards() {

        return Array.from(
            document.querySelectorAll(
                ".gallery-item"
            )
        ).filter(item => !item.hidden)
            .map(item =>
                item.querySelector(
                    ".gallery-card"
                )
            )
            .filter(Boolean);

    }


    function openLightbox(card) {

        const cards =
            getVisibleCards();

        currentIndex =
            cards.indexOf(card);

        if (currentIndex === -1) {
            currentIndex = 0;
        }

        showSlide(currentIndex);

        lightbox.classList.add(
            "active"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "lightbox-open"
        );

    }


    function closeLightbox() {

        lightbox.classList.remove(
            "active"
        );

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "lightbox-open"
        );

    }


    function showSlide(index) {

        const cards =
            getVisibleCards();

        if (!cards.length) return;


        currentIndex =
            (index + cards.length) %
            cards.length;

        const card =
            cards[currentIndex];

        const img =
            card.querySelector("img");

        const titleEl =
            card.querySelector(
                ".gallery-overlay h3"
            );

        if (!img) return;


        imageEl.src = img.src;
        imageEl.alt =
            img.alt || "";

        if (captionEl) {

            captionEl.textContent =
                titleEl ?
                    titleEl.textContent.trim() :
                    "";

        }

    }


    document
        .querySelectorAll(
            ".gallery-card"
        )
        .forEach(card => {

            card.style.cursor =
                "pointer";

            card.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    openLightbox(card);

                }
            );

        });


    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            closeLightbox
        );

    }

    if (prevBtn) {

        prevBtn.addEventListener(
            "click",
            () =>
                showSlide(
                    currentIndex - 1
                )
        );

    }

    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            () =>
                showSlide(
                    currentIndex + 1
                )
        );

    }


    lightbox.addEventListener(
        "click",
        event => {

            if (event.target === lightbox) {

                closeLightbox();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox.classList.contains(
                    "active"
                )
            ) {
                return;
            }

            if (event.key === "Escape") {
                closeLightbox();
            }

            if (event.key === "ArrowLeft") {
                showSlide(currentIndex - 1);
            }

            if (event.key === "ArrowRight") {
                showSlide(currentIndex + 1);
            }

        }
    );

}


/* ==========================================================
   GALLERY — LOAD MORE PHOTOS
   ========================================================== */

function initLoadMore() {

    const loadMoreBtn =
        document.getElementById(
            "loadMore"
        );

    if (!loadMoreBtn) return;


    const items =
        Array.from(
            document.querySelectorAll(
                ".gallery-item"
            )
        );

    const perBatch = 6;

    let visibleCount = perBatch;


    function applyVisibility(filterActive) {

        /*
         * If a specific gallery filter is active,
         * pagination is suspended — the filter click
         * handler controls item.hidden instead, and
         * the button is simply hidden.
         */

        if (filterActive) {

            loadMoreBtn.hidden = true;

            return;

        }

        loadMoreBtn.hidden = false;


        items.forEach((item, index) => {

            item.hidden =
                index >= visibleCount;

        });


        if (visibleCount >= items.length) {

            loadMoreBtn.disabled = true;

            loadMoreBtn.innerHTML =
                '<i class="fas fa-check"></i> All Photos Loaded';

        } else {

            loadMoreBtn.disabled = false;

            loadMoreBtn.innerHTML =
                '<i class="fas fa-images"></i> Load More Photos';

        }

    }


    if (items.length > perBatch) {

        applyVisibility(false);

    } else {

        loadMoreBtn.disabled = true;

        loadMoreBtn.innerHTML =
            '<i class="fas fa-check"></i> All Photos Loaded';

    }


    loadMoreBtn.addEventListener(
        "click",
        () => {

            visibleCount += perBatch;

            applyVisibility(false);

        }
    );


    window.PBDPC_GALLERY =
        window.PBDPC_GALLERY || {};

    window.PBDPC_GALLERY.applyLoadMore =
        applyVisibility;

}


/* ==========================================================
   INITIALIZE SERVICE WORKER
   ========================================================== */

registerServiceWorker();


/* ==========================================================
   END OF APP.JS
   ========================================================== */