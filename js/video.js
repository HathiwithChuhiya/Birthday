document.addEventListener("DOMContentLoaded", () => {

    const video = document.getElementById("ourStoryVideo");
    const overlay = document.getElementById("videoOverlay");
    const playButton = document.getElementById("playButton");

    if (!video || !overlay || !playButton) return;


    /* =====================================================
       CUSTOM PLAY BUTTON
    ====================================================== */

    const startVideo = () => {

        if (video.paused) {
            video.play()
                .then(() => {
                    overlay.classList.add("hidden");
                })
                .catch(() => {
                    overlay.classList.remove("hidden");
                });
        }

    };


    overlay.addEventListener("click", startVideo);
    playButton.addEventListener("click", startVideo);


    /* =====================================================
       VIDEO PLAY / PAUSE STATE
    ====================================================== */

    video.addEventListener("play", () => {
        overlay.classList.add("hidden");
    });

    video.addEventListener("pause", () => {

        if (!video.ended) {
            overlay.classList.remove("hidden");
        }

    });

    video.addEventListener("ended", () => {
        overlay.classList.remove("hidden");
    });


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements = document.querySelectorAll(
        ".before-card, .movie-heading, .movie-frame, " +
        ".film-heading, .video-message, .video-power, " +
        ".video-ending"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("video-visible");
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("video-reveal");
            observer.observe(element);
        });

    }


    /* =====================================================
       SUBTLE PARALLAX
    ====================================================== */

    const powerWord = document.querySelector(".power-bg-word");

    if (powerWord && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

        window.addEventListener("scroll", () => {

            const rect = powerWord.parentElement.getBoundingClientRect();

            const offset =
                (window.innerHeight / 2 - rect.top) * 0.025;

            powerWord.style.transform =
                `translate(-50%, calc(-50% + ${offset}px))`;

        }, { passive: true });

    }

});