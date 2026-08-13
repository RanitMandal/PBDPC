/* ==========================================================
   PBDPC Website
   Global Configuration
   Version : 1.0
========================================================== */

"use strict";

const CONFIG = {

    /* ======================================================
       WEBSITE
    ====================================================== */

    website: {

        name: "Protappur Baroari Durga Puja Committee",

        shortName: "PBDPC",

        tagline: "Faith • Tradition • Heritage",

        established: 1948,

        language: "en",

        timezone: "Asia/Kolkata"

    },



    /* ======================================================
       CONTACT
    ====================================================== */

    contact: {

        address:
            "Protappur, Hariharpara, Murshidabad, West Bengal, India",

        phone: "+91 9876543210",

        whatsapp: "919876543210",

        email: "info@pbdpc.org",

        support: "support@pbdpc.org"

    },



    /* ======================================================
       SOCIAL MEDIA
    ====================================================== */

    social: {

        facebook:
            "https://facebook.com/pbdpc",

        instagram:
            "https://instagram.com/pbdpc",

        youtube:
            "https://youtube.com/@pbdpc",

        x:
            "https://x.com/pbdpc",

        linkedin:
            "https://linkedin.com/company/pbdpc"

    },



    /* ======================================================
       GOOGLE MAP
    ====================================================== */

    map: {

        embed:
            "https://www.google.com/maps/embed?pb=YOUR_MAP_EMBED"

    },



    /* ======================================================
       DONATION
    ====================================================== */

    donation: {

        upi: "pbdpc@upi",

        accountName:
            "Protappur Baroari Durga Puja Committee",

        bank:
            "State Bank of India",

        ifsc:
            "SBIN0000000"

    },



    /* ======================================================
       FESTIVAL
    ====================================================== */

    festival: {

        title:
            "Durga Puja 2026",

        startDate:
            "2026-10-16",

        endDate:
            "2026-10-21"

    },



    /* ======================================================
       SPONSORSHIP
    ====================================================== */

    sponsor: {

        email:
            "sponsor@pbdpc.org",

        phone:
            "+91 9876543210"

    },



    /* ======================================================
       HERO SLIDER
    ====================================================== */

    heroImages: [

        "assets/images/home/hero1.jpg",

        "assets/images/home/hero2.jpg",

        "assets/images/home/hero3.jpg"

    ],



    /* ======================================================
       GALLERY
    ====================================================== */

    gallery: {

        previewLimit: 9

    },



    /* ======================================================
       ANIMATION
    ====================================================== */

    animation: {

        duration: 800,

        delay: 100

    },



    /* ======================================================
       PAGINATION
    ====================================================== */

    pagination: {

        gallery: 12,

        sponsors: 8,

        events: 6

    },



    /* ======================================================
       SEO
    ====================================================== */

    seo: {

        author: "PBDPC",

        keywords: [

            "Protappur",

            "Durga Puja",

            "Murshidabad",

            "Temple",

            "Festival",

            "Heritage"

        ],

        description:

            "Official website of Protappur Baroari Durga Puja Committee."

    },



    /* ======================================================
       COPYRIGHT
    ====================================================== */

    copyright: {

        company:
            "Protappur Baroari Durga Puja Committee",

        developer:
            "Capacious Emporium",

        year:
            new Date().getFullYear()

    }

};


/* ==========================================================
   SHORTCUTS
========================================================== */

const WEBSITE = CONFIG.website;

const CONTACT = CONFIG.contact;

const SOCIAL = CONFIG.social;

const DONATION = CONFIG.donation;

const FESTIVAL = CONFIG.festival;

const SPONSOR = CONFIG.sponsor;

const SEO = CONFIG.seo;



/* ==========================================================
   HELPER FUNCTIONS
========================================================== */

function getWebsiteName() {

    return WEBSITE.name;

}

function getPhone() {

    return CONTACT.phone;

}

function getWhatsAppLink() {

    return `https://wa.me/${CONTACT.whatsapp}`;

}

function getYouTube() {

    return SOCIAL.youtube;

}

function getCurrentYear() {

    return new Date().getFullYear();

}



/* ==========================================================
   FREEZE CONFIG
========================================================== */

Object.freeze(CONFIG);



/* ==========================================================
   EXPORT
========================================================== */

window.CONFIG = CONFIG;

window.WEBSITE = WEBSITE;

window.CONTACT = CONTACT;

window.SOCIAL = SOCIAL;

window.DONATION = DONATION;

window.FESTIVAL = FESTIVAL;

window.SPONSOR = SPONSOR;

window.SEO = SEO;


/* ==========================================================
   END OF FILE
========================================================== */

