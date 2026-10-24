/* =========================================================
   BIRTHDAY LOCKING SYSTEM
   Step 8 — Home Navigation Protection
   Timezone: Asia/Kolkata
========================================================= */

(function () {
    "use strict";


    /* -----------------------------------------------------
       SETTINGS
    ----------------------------------------------------- */

    const BIRTHDAY_TIMEZONE = "Asia/Kolkata";

    const LOCK_TEST_MODE = false;
    const TEST_NOW = "2026-11-03T10:00:00";


    /* -----------------------------------------------------
       UNLOCK SCHEDULE
    ----------------------------------------------------- */

    const UNLOCKS = {

        birthday: {
            date: "2026-11-03",
            time: "00:00",
            title: "It's finally here…",
            message:
                "Happy 27th Birthday, my love. ❤️\n\nI've been waiting for this moment.\n\nThis is only the beginning."
        },

        morning: {
            date: "2026-11-03",
            time: "09:00",
            title: "Good morning, birthday girl.",
            message:
                "I hope your first morning of 27 feels a little extra special. ☀️\n\nBecause I have something waiting for you…"
        },

        story: {
            date: "2026-11-03",
            time: "11:00",
            title: "Now I want to tell you something.",
            message:
                "There are memories you know.\nThere are memories I remember differently.\n\nAnd there are things from my side that I've never really told you.\n\nSo today… let me tell you our story the way I remember it. ❤️"
        },

        memories: {
            date: "2026-11-03",
            time: "13:00",
            title: "Remember these?",
            message:
                "Some moments became memories without us even realizing it.\n\nSome made us laugh.\nSome changed us.\nAnd some… I wish I could go back and live again."
        },

        reasons: {
            date: "2026-11-03",
            time: "16:00",
            title: "27.",
            message:
                "A pretty important number today.\n\nSo I thought… why not give you 27 little reasons why you're so special to me?\n\nAnd yes… choosing only 27 was unfair. 😌"
        },

        letter: {
            date: "2026-11-03",
            time: "19:00",
            title: "This one is just from me to you.",
            message:
                "No game.\nNo countdown.\nNo guessing.\n\nJust words I've been wanting to put together for you.\n\nSo when you open this… take your time. 💌"
        },

        video: {
            date: "2026-11-03",
            time: "21:00",
            title: "Lights down. Volume up. 🔊",
            message:
                "For the next few minutes, forget everything else.\n\nJust watch.\n\nThis one is ours. ❤️"
        },

        final: {
            date: "2026-11-03",
            time: "23:00",
            title: "You made it this far.",
            message:
                "You've opened every little surprise…\n\nbut there's still one thing left.\n\nAnd this one… means the most to me. ❤️"
        },

        midnight: {
            date: "2026-11-03",
            time: "23:59",
            title: "Before today ends…",
            message:
                "Your 27th birthday is almost over.\n\nBut before today ends, I just want you to know one thing…\n\nI'm still here.\n\nAnd tomorrow?\nWe go back to being us. ❤️"
        }
    };


    /* -----------------------------------------------------
       PAGE → UNLOCK
    ----------------------------------------------------- */

    const PAGE_UNLOCKS = {
        memories: "memories",
        reasons: "reasons",
        letter: "letter",
        video: "video",
        final: "final"
    };


    for (let i = 1; i <= 13; i++) {

        PAGE_UNLOCKS[
            `chapter-${String(i).padStart(2, "0")}`
        ] = "story";

    }


    /* -----------------------------------------------------
       PLAYFUL MESSAGES
    ----------------------------------------------------- */

    const LOCK_MESSAGES = [

        {
            title: "Ohooo… nice try! 👀",
            message:
                "This one isn't ready yet.\n\nSome things are worth waiting for. ❤️"
        },

        {
            title: "Caught you! 😂",
            message:
                "You're definitely curious, aren't you?\n\nBut nope… not yet."
        },

        {
            title: "Not yet… 👀",
            message:
                "I know you're curious.\n\nBut you're going to have to wait for this one. ❤️"
        },

        {
            title: "You're checking again?",
            message:
                "Seriously? 😂\n\nOkay, okay… I'll give you a hint.\n\nSomething special is waiting here."
        },

        {
            title: "Fineee… 😭",
            message:
                "You found the locked door.\n\nBut I still have the key.\n\nAnd I'm not giving it to you yet. 😌"
        },

        {
            title: "Patience, birthday girl. 💕",
            message:
                "I promise this will be worth the wait.\n\nJust not yet."
        }
    ];


    let lockAttemptCount = 0;


    /* -----------------------------------------------------
       TIME HELPERS
    ----------------------------------------------------- */

    function getCurrentTime() {

        if (LOCK_TEST_MODE) {

            return new Date(
                TEST_NOW + "+05:30"
            );

        }

        return new Date();
    }


    function getUnlockDate(unlockKey) {

        const unlock =
            UNLOCKS[unlockKey];

        if (!unlock) {
            return null;
        }

        return new Date(
            `${unlock.date}T${unlock.time}:00+05:30`
        );
    }


    function isUnlocked(unlockKey) {

        const unlockDate =
            getUnlockDate(unlockKey);

        if (!unlockDate) {
            return true;
        }

        return (
            getCurrentTime().getTime() >=
            unlockDate.getTime()
        );
    }


    function getRemainingTime(unlockKey) {

        const unlockDate =
            getUnlockDate(unlockKey);

        if (!unlockDate) {
            return 0;
        }

        return Math.max(
            0,
            unlockDate.getTime() -
            getCurrentTime().getTime()
        );
    }


    function formatCountdown(milliseconds) {

        const totalSeconds =
            Math.floor(milliseconds / 1000);

        const days =
            Math.floor(totalSeconds / 86400);

        const hours =
            Math.floor(
                (totalSeconds % 86400) / 3600
            );

        const minutes =
            Math.floor(
                (totalSeconds % 3600) / 60
            );

        const seconds =
            totalSeconds % 60;

        return {
            days: String(days).padStart(2, "0"),
            hours: String(hours).padStart(2, "0"),
            minutes: String(minutes).padStart(2, "0"),
            seconds: String(seconds).padStart(2, "0")
        };
    }


    function formatUnlockTime(unlockKey) {

        const date =
            getUnlockDate(unlockKey);

        if (!date) {
            return "";
        }

        return date.toLocaleString(
            "en-IN",
            {
                timeZone: BIRTHDAY_TIMEZONE,
                day: "numeric",
                month: "long",
                hour: "numeric",
                minute: "2-digit",
                hour12: true
            }
        );
    }


    /* -----------------------------------------------------
       FIND PAGE FROM LINK
    ----------------------------------------------------- */

    function getPageKeyFromLink(link) {

        const href =
            link.getAttribute("href");

        if (!href) {
            return null;
        }


        /*
           Ignore:
           #home
           external links
           javascript:
           mailto:
           tel:
        */

        if (
            href.startsWith("#") ||
            href.startsWith("http") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:") ||
            href.startsWith("javascript:")
        ) {
            return null;
        }


        const filename =
            href.split("/").pop().split("?")[0].split("#")[0];


        /*
           Chapter
        */

        const chapterMatch =
            filename.match(
                /^chapter-(\d+)\.html$/i
            );

        if (chapterMatch) {

            return (
                "chapter-" +
                chapterMatch[1].padStart(2, "0")
            );

        }


        /*
           Main pages
        */

        if (filename === "memories.html") {
            return "memories";
        }

        if (filename === "reasons.html") {
            return "reasons";
        }

        if (filename === "letter.html") {
            return "letter";
        }

        if (filename === "video.html") {
            return "video";
        }

        if (filename === "final.html") {
            return "final";
        }


        return null;
    }


    /* -----------------------------------------------------
       CURRENT PAGE
    ----------------------------------------------------- */

    function getCurrentPageKey() {

        const path =
            window.location.pathname;


        const chapterMatch =
            path.match(
                /chapter-(\d+)\.html$/i
            );

        if (chapterMatch) {

            return (
                "chapter-" +
                chapterMatch[1].padStart(2, "0")
            );

        }


        if (
            path.endsWith(
                "/memories.html"
            )
        ) {
            return "memories";
        }


        if (
            path.endsWith(
                "/reasons.html"
            )
        ) {
            return "reasons";
        }


        if (
            path.endsWith(
                "/letter.html"
            )
        ) {
            return "letter";
        }


        if (
            path.endsWith(
                "/video.html"
            )
        ) {
            return "video";
        }


        if (
            path.endsWith(
                "/final.html"
            )
        ) {
            return "final";
        }


        return null;
    }


    /* -----------------------------------------------------
       HOME PATH
    ----------------------------------------------------- */

    function getHomePath() {

        if (
            window.location.pathname.includes(
                "/chapters/"
            )
        ) {
            return "../index.html";
        }

        return "index.html";
    }


    /* -----------------------------------------------------
       RANDOM MESSAGE
    ----------------------------------------------------- */

    function getPlayfulMessage() {

        const index =
            lockAttemptCount %
            LOCK_MESSAGES.length;

        return LOCK_MESSAGES[index];
    }


    /* -----------------------------------------------------
       CREATE LOCK SCREEN
    ----------------------------------------------------- */

    function createLockScreen() {

        if (
            document.getElementById(
                "birthday-lock-overlay"
            )
        ) {
            return;
        }


        const overlay =
            document.createElement("div");

        overlay.id =
            "birthday-lock-overlay";

        overlay.className =
            "birthday-lock-overlay";


        overlay.innerHTML = `
            <div
                class="birthday-lock-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="birthday-lock-title"
            >

                <div class="birthday-lock-icon">
                    🔒
                </div>

                <div class="birthday-lock-eyebrow">
                    Something is waiting here…
                </div>

                <h1
                    class="birthday-lock-title"
                    id="birthday-lock-title"
                >
                    Not yet… 👀
                </h1>

                <div
                    class="birthday-lock-message"
                    id="birthday-lock-message"
                ></div>

                <div class="birthday-lock-unlock-label">
                    Unlocks at
                </div>

                <div
                    class="birthday-lock-unlock-time"
                    id="birthday-lock-unlock-time"
                ></div>

                <div class="birthday-lock-countdown">

                    <div class="birthday-lock-time-box">
                        <span
                            class="birthday-lock-time-number"
                            id="lock-days"
                        >
                            00
                        </span>

                        <span class="birthday-lock-time-label">
                            Days
                        </span>
                    </div>


                    <div class="birthday-lock-time-box">
                        <span
                            class="birthday-lock-time-number"
                            id="lock-hours"
                        >
                            00
                        </span>

                        <span class="birthday-lock-time-label">
                            Hours
                        </span>
                    </div>


                    <div class="birthday-lock-time-box">
                        <span
                            class="birthday-lock-time-number"
                            id="lock-minutes"
                        >
                            00
                        </span>

                        <span class="birthday-lock-time-label">
                            Minutes
                        </span>
                    </div>


                    <div class="birthday-lock-time-box">
                        <span
                            class="birthday-lock-time-number"
                            id="lock-seconds"
                        >
                            00
                        </span>

                        <span class="birthday-lock-time-label">
                            Seconds
                        </span>
                    </div>

                </div>


                <button
                    type="button"
                    class="birthday-lock-close"
                    id="birthday-lock-close"
                >
                    Go back ♡
                </button>


                <span
                    class="birthday-lock-heart"
                    aria-hidden="true"
                >
                    ♡
                </span>

            </div>
        `;


        document.body.appendChild(
            overlay
        );


        document
            .getElementById(
                "birthday-lock-close"
            )
            .addEventListener(
                "click",
                goHome
            );


        overlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === overlay
                ) {
                    goHome();
                }

            }
        );
    }


    /* -----------------------------------------------------
       GO HOME
    ----------------------------------------------------- */

    function goHome() {

        const overlay =
            document.getElementById(
                "birthday-lock-overlay"
            );

        if (overlay) {

            overlay.classList.remove(
                "visible"
            );

        }


        document.body.classList.remove(
            "birthday-lock-active"
        );


        window.location.href =
            getHomePath();
    }


    /* -----------------------------------------------------
       SHOW LOCK SCREEN
    ----------------------------------------------------- */

    function showLockScreen(unlockKey) {

        const unlock =
            UNLOCKS[unlockKey];

        if (!unlock) {
            return;
        }


        lockAttemptCount++;


        createLockScreen();


        const playful =
            getPlayfulMessage();


        document.getElementById(
            "birthday-lock-title"
        ).textContent =
            playful.title;


        document.getElementById(
            "birthday-lock-message"
        ).textContent =
            playful.message;


        document.getElementById(
            "birthday-lock-unlock-time"
        ).textContent =
            formatUnlockTime(
                unlockKey
            );


        updateCountdown(
            unlockKey
        );


        document
            .getElementById(
                "birthday-lock-overlay"
            )
            .classList.add(
                "visible"
            );


        document.body.classList.add(
            "birthday-lock-active"
        );
    }


    /* -----------------------------------------------------
       COUNTDOWN
    ----------------------------------------------------- */

    function updateCountdown(unlockKey) {

        const countdown =
            formatCountdown(
                getRemainingTime(
                    unlockKey
                )
            );


        const ids = {
            days: "lock-days",
            hours: "lock-hours",
            minutes: "lock-minutes",
            seconds: "lock-seconds"
        };


        Object.keys(ids).forEach(
            function (key) {

                const element =
                    document.getElementById(
                        ids[key]
                    );

                if (element) {

                    element.textContent =
                        countdown[key];

                }

            }
        );
    }


    /* -----------------------------------------------------
       HOME LINK PROTECTION
    ----------------------------------------------------- */

    function protectHomeLinks() {

        document.addEventListener(
            "click",
            function (event) {

                const link =
                    event.target.closest(
                        "a"
                    );

                if (!link) {
                    return;
                }


                const pageKey =
                    getPageKeyFromLink(
                        link
                    );

                if (!pageKey) {
                    return;
                }


                const unlockKey =
                    PAGE_UNLOCKS[
                        pageKey
                    ];

                if (!unlockKey) {
                    return;
                }


                /*
                   If already unlocked,
                   allow normal navigation.
                */

                if (
                    isUnlocked(
                        unlockKey
                    )
                ) {
                    return;
                }


                /*
                   Locked:
                   stop navigation.
                */

                event.preventDefault();

                event.stopPropagation();


                showLockScreen(
                    unlockKey
                );

            },
            true
        );
    }


    /* -----------------------------------------------------
       CURRENT PAGE PROTECTION
    ----------------------------------------------------- */

    function protectCurrentPage() {

        const pageKey =
            getCurrentPageKey();


        /*
           Home is always accessible.
        */

        if (!pageKey) {
            return;
        }


        const unlockKey =
            PAGE_UNLOCKS[
                pageKey
            ];


        if (!unlockKey) {
            return;
        }


        /*
           Already unlocked.
        */

        if (
            isUnlocked(
                unlockKey
            )
        ) {
            return;
        }


        /*
           Current page is locked.
        */

        showLockScreen(
            unlockKey
        );


        const interval =
            setInterval(
                function () {

                    if (
                        isUnlocked(
                            unlockKey
                        )
                    ) {

                        clearInterval(
                            interval
                        );

                        window.location.reload();

                        return;
                    }


                    updateCountdown(
                        unlockKey
                    );

                },
                1000
            );
    }


    /* -----------------------------------------------------
       INITIALIZE
    ----------------------------------------------------- */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            protectHomeLinks();

            protectCurrentPage();

        }
    );


    /* -----------------------------------------------------
       GLOBAL API
    ----------------------------------------------------- */

    window.BirthdayLocking = {

        UNLOCKS,

        PAGE_UNLOCKS,

        isUnlocked,

        getRemainingTime,

        formatCountdown,

        formatUnlockTime,

        getCurrentPageKey

    };

})();