document.addEventListener("DOMContentLoaded", () => {
    /*
     * =========================================================
     * 27 REASONS — INTERACTION / REVEAL SYSTEM
     * =========================================================
     */

    const sections = document.querySelectorAll(".reason");
    const revealItems = document.querySelectorAll(
        ".reason-glass, .flower, .memory-frame, .floating-memory, " +
        ".reason-number, .reason-label, .reason10-ending"
    );

    /*
     * ---------------------------------------------------------
     * SCROLL REVEAL
     * ---------------------------------------------------------
     */

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reason-visible");
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -8% 0px"
        }
    );

    revealItems.forEach((item) => {
        revealObserver.observe(item);
    });


    /*
     * ---------------------------------------------------------
     * REASON SECTION OBSERVER
     * ---------------------------------------------------------
     */

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reason-active");

                    const number = entry.target.dataset.reason;

                    if (number) {
                        document.body.dataset.activeReason = number;
                    }
                }
            });
        },
        {
            threshold: 0.35
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });


    /*
     * ---------------------------------------------------------
     * GLASS TILT
     * ---------------------------------------------------------
     */

    const glassCards = document.querySelectorAll(".reason-glass");

    glassCards.forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            if (window.innerWidth <= 768) {
                return;
            }

            const rect = card.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width - 0.5;

            const y =
                (event.clientY - rect.top) / rect.height - 0.5;

            const rotateX = y * -3;
            const rotateY = x * 3;

            card.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
        });
    });


    /*
     * ---------------------------------------------------------
     * GLASS SHINE
     * ---------------------------------------------------------
     */

    glassCards.forEach((card) => {
        const shine = card.querySelector(".glass-shine");

        if (!shine) {
            return;
        }

        card.addEventListener("mousemove", (event) => {
            if (window.innerWidth <= 768) {
                return;
            }

            const rect = card.getBoundingClientRect();

            const x =
                ((event.clientX - rect.left) / rect.width) * 100;

            const y =
                ((event.clientY - rect.top) / rect.height) * 100;

            shine.style.left = `${x - 35}%`;
            shine.style.top = `${y - 70}%`;
        });
    });


    /*
     * ---------------------------------------------------------
     * PARALLAX BACKGROUND
     * ---------------------------------------------------------
     */

    const background = document.querySelector(".reasons-background");

    if (background && window.innerWidth > 768) {
        window.addEventListener(
            "mousemove",
            (event) => {
                const x =
                    (event.clientX / window.innerWidth - 0.5) * 2;

                const y =
                    (event.clientY / window.innerHeight - 0.5) * 2;

                background.style.transform =
                    `translate3d(${x * -8}px, ${y * -8}px, 0)`;
            },
            { passive: true }
        );
    }


    /*
     * ---------------------------------------------------------
     * FLOWER PARALLAX
     * ---------------------------------------------------------
     */

    const flowers = document.querySelectorAll(".flower");

    if (window.innerWidth > 768) {
        flowers.forEach((flower) => {
            flower.addEventListener("mousemove", (event) => {
                const rect = flower.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) / rect.width - 0.5;

                const y =
                    (event.clientY - rect.top) / rect.height - 0.5;

                flower.style.marginLeft = `${x * 8}px`;
                flower.style.marginTop = `${y * 8}px`;
            });

            flower.addEventListener("mouseleave", () => {
                flower.style.marginLeft = "";
                flower.style.marginTop = "";
            });
        });
    }


    /*
     * ---------------------------------------------------------
     * SMOOTH INTERNAL NAVIGATION
     * ---------------------------------------------------------
     */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        });
    });


    /*
     * ---------------------------------------------------------
     * REASON COUNTER
     * ---------------------------------------------------------
     */

    const reasonCounter = document.querySelector("[data-reason-counter]");

    if (reasonCounter) {
        const updateCounter = () => {
            let closestSection = null;
            let closestDistance = Infinity;

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();

                const center =
                    rect.top + rect.height / 2;

                const distance =
                    Math.abs(center - window.innerHeight / 2);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestSection = section;
                }
            });

            if (closestSection) {
                const number =
                    closestSection.dataset.reason ||
                    closestSection.getAttribute("data-number");

                if (number) {
                    reasonCounter.textContent =
                        String(number).padStart(2, "0");
                }
            }
        };

        window.addEventListener(
            "scroll",
            updateCounter,
            { passive: true }
        );

        updateCounter();
    }


    /*
     * ---------------------------------------------------------
     * KEYBOARD NAVIGATION
     * ---------------------------------------------------------
     */

    let currentReason = 0;

    const getReasonIndex = () => {
        let closestIndex = 0;
        let closestDistance = Infinity;

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();

            const center =
                rect.top + rect.height / 2;

            const distance =
                Math.abs(center - window.innerHeight / 2);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        return closestIndex;
    };

    document.addEventListener("keydown", (event) => {
        if (
            event.key !== "ArrowDown" &&
            event.key !== "ArrowUp"
        ) {
            return;
        }

        if (!sections.length) {
            return;
        }

        currentReason = getReasonIndex();

        if (event.key === "ArrowDown") {
            currentReason = Math.min(
                currentReason + 1,
                sections.length - 1
            );
        }

        if (event.key === "ArrowUp") {
            currentReason = Math.max(
                currentReason - 1,
                0
            );
        }

        sections[currentReason].scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });


    /*
     * ---------------------------------------------------------
     * TOUCH / MOBILE POLISH
     * ---------------------------------------------------------
     */

    if (window.innerWidth <= 768) {
        glassCards.forEach((card) => {
            card.addEventListener(
                "touchstart",
                () => {
                    card.classList.add("glass-touch");
                },
                { passive: true }
            );

            card.addEventListener(
                "touchend",
                () => {
                    setTimeout(() => {
                        card.classList.remove("glass-touch");
                    }, 350);
                },
                { passive: true }
            );
        });
    }


    /*
     * ---------------------------------------------------------
     * PAGE LOADED
     * ---------------------------------------------------------
     */

    document.body.classList.add("reasons-page-ready");
});