/* =========================================
   BIRTHDAY WEBSITE — NAVIGATION
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const path = window.location.pathname;

    // -----------------------------------------
    // PAGE HELPERS
    // -----------------------------------------

    const goTo = (page) => {
        window.location.href = page;
    };

    // -----------------------------------------
    // STORY SEQUENCE
    // -----------------------------------------

    const storyPages = [
        "index.html",
        "chapters/chapter-01.html",
        "chapters/chapter-02.html",
        "chapters/chapter-03.html",
        "chapters/chapter-04.html",
        "chapters/chapter-05.html",
        "chapters/chapter-06.html",
        "chapters/chapter-07.html",
        "chapters/chapter-08.html",
        "chapters/chapter-09.html",
        "chapters/chapter-10.html",
        "chapters/chapter-11.html",
        "chapters/chapter-12.html",
        "chapters/chapter-13.html",
        "memories.html",
        "reasons.html",
        "letter.html",
        "video.html",
        "final.html"
    ];

    // -----------------------------------------
    // GLOBAL STORY LINKS
    // -----------------------------------------

    document.querySelectorAll("[data-page]").forEach(link => {

        link.addEventListener("click", (event) => {

            const page = link.getAttribute("data-page");

            if (!page) return;

            event.preventDefault();

            goTo(page);

        });

    });

    // -----------------------------------------
    // ESC KEY
    // -----------------------------------------

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            document.body.classList.remove("mobile-open");
        }

    });

});