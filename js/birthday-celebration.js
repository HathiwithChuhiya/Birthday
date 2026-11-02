/* =========================================================
   BIRTHDAY MIDNIGHT CELEBRATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const countdown =
        document.getElementById("countdown");

    const countdownDate =
        document.querySelector(".countdown-date");

    const lockedMessage =
        document.querySelector(".locked-message");

    const enterStoryButton =
        document.querySelector(".hero-button");

    if (!countdown) return;


    /* =====================================================
       BIRTHDAY TIME
       November 3, 2026 — 12:00 AM
       ===================================================== */

    const birthdayTime =
        new Date(
            2026,
            10,
            3,
            0,
            0,
            0
        ).getTime();


    let celebrationStarted = false;


    /* =====================================================
       START BIRTHDAY CELEBRATION
       ===================================================== */

    function startBirthdayCelebration() {

        if (celebrationStarted) return;

        celebrationStarted = true;


        /* ---------------------------------------------
           Hide countdown
        --------------------------------------------- */

        countdown.classList.add(
            "birthday-finished"
        );


        /* ---------------------------------------------
           Hide countdown date
        --------------------------------------------- */

        if (countdownDate) {

            countdownDate.classList.add(
                "birthday-hide-after"
            );

        }


        /* ---------------------------------------------
           Hide locked message
           BUT KEEP ENTER OUR STORY BUTTON
        --------------------------------------------- */

        if (lockedMessage) {

            lockedMessage.classList.add(
                "birthday-hide-after"
            );

        }


        /* =================================================
           CREATE BIRTHDAY CARD
           ================================================= */

        const celebration =
            document.createElement("div");

        celebration.className =
            "birthday-celebration is-active";


        celebration.innerHTML = `

            <div class="birthday-message">

                <span class="birthday-small">
                    Today is your day ♡
                </span>


                <h2 class="birthday-title">

                    Happy Birthday,

                    <br>

                    <span>
                        My Little Princess
                    </span>

                </h2>


                <div class="birthday-cake">

                    <div class="birthday-cake-body">
                    </div>


                    <div class="birthday-candle">

                        <div class="birthday-wick">
                        </div>

                    </div>


                    <div class="birthday-flame">
                    </div>

                </div>


                <p class="birthday-subtitle">

                    May your smile always be
                    as beautiful as you are. ❤️

                </p>

            </div>

        `;


        /* ---------------------------------------------
           Add birthday card
        --------------------------------------------- */

        countdown.parentElement.appendChild(
            celebration
        );


        /* ---------------------------------------------
           Move Enter Our Story below birthday card
        --------------------------------------------- */

        if (enterStoryButton) {

            celebration.parentElement.insertBefore(
                enterStoryButton,
                celebration.nextSibling
            );

        }


        /* =================================================
           START ANIMATIONS
           ================================================= */

        createBalloons();

        createHearts();

        createSparkles();


        /* =================================================
           CANDLE GOES OUT
           After 8 seconds
           ================================================= */

        setTimeout(() => {

            const flame =
                document.querySelector(
                    ".birthday-flame"
                );


            if (flame) {

                flame.classList.add(
                    "extinguished"
                );

            }

        }, 8000);

    }


    /* =====================================================
       FLOATING BALLOONS
       ===================================================== */

    function createBalloons() {

        const colors = [

            "#df7898",
            "#dca96b",
            "#b87491",
            "#e58aa6",
            "#c993a8"

        ];


        function spawnBalloon() {

            const balloon =
                document.createElement("div");


            balloon.className =
                "birthday-floating-balloon";


            /* -----------------------------------------
               Random position
            ----------------------------------------- */

            const left =
                Math.random() * 100;


            /* -----------------------------------------
               Random duration
            ----------------------------------------- */

            const duration =
                9 + Math.random() * 5;


            /* -----------------------------------------
               Random movement
            ----------------------------------------- */

            const drift1 =
                -40 + Math.random() * 80;

            const drift2 =
                -70 + Math.random() * 140;

            const drift3 =
                -100 + Math.random() * 200;

            const drift4 =
                -130 + Math.random() * 260;


            /* -----------------------------------------
               CSS variables
            ----------------------------------------- */

            balloon.style.setProperty(
                "--x",
                `${left}%`
            );

            balloon.style.setProperty(
                "--duration",
                `${duration}s`
            );

            balloon.style.setProperty(
                "--balloon-color",
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ]
            );

            balloon.style.setProperty(
                "--drift-1",
                `${drift1}px`
            );

            balloon.style.setProperty(
                "--drift-2",
                `${drift2}px`
            );

            balloon.style.setProperty(
                "--drift-3",
                `${drift3}px`
            );

            balloon.style.setProperty(
                "--drift-4",
                `${drift4}px`
            );


            /* -----------------------------------------
               Add balloon
            ----------------------------------------- */

            document.body.appendChild(
                balloon
            );


            /* -----------------------------------------
               Remove after animation
            ----------------------------------------- */

            setTimeout(() => {

                balloon.remove();

            }, (duration + 1) * 1000);

        }


        /* ---------------------------------------------
           Initial balloons
        --------------------------------------------- */

        for (
            let i = 0;
            i < 10;
            i++
        ) {

            setTimeout(
                spawnBalloon,
                i * 350
            );

        }


        /* ---------------------------------------------
           Continuously create balloons
        --------------------------------------------- */

        setInterval(() => {

            spawnBalloon();

        }, 1600);

    }


    /* =====================================================
       FLOATING HEARTS
       ===================================================== */

    function createHearts() {


        function spawnHeart() {

            const heart =
                document.createElement("div");


            heart.className =
                "birthday-floating-heart";


            /* -----------------------------------------
               Heart character
            ----------------------------------------- */

            heart.textContent =
                Math.random() > 0.35
                    ? "♥"
                    : "♡";


            /* -----------------------------------------
               Random position
            ----------------------------------------- */

            const left =
                Math.random() * 100;


            /* -----------------------------------------
               Random size
            ----------------------------------------- */

            const size =
                14 + Math.random() * 16;


            /* -----------------------------------------
               Random duration
            ----------------------------------------- */

            const duration =
                6 + Math.random() * 4;


            /* -----------------------------------------
               Random movement
            ----------------------------------------- */

            const drift1 =
                -35 + Math.random() * 70;

            const drift2 =
                -70 + Math.random() * 140;

            const drift3 =
                -100 + Math.random() * 200;


            /* -----------------------------------------
               CSS variables
            ----------------------------------------- */

            heart.style.setProperty(
                "--x",
                `${left}%`
            );

            heart.style.setProperty(
                "--size",
                `${size}px`
            );

            heart.style.setProperty(
                "--duration",
                `${duration}s`
            );

            heart.style.setProperty(
                "--drift-1",
                `${drift1}px`
            );

            heart.style.setProperty(
                "--drift-2",
                `${drift2}px`
            );

            heart.style.setProperty(
                "--drift-3",
                `${drift3}px`
            );


            /* -----------------------------------------
               Add heart
            ----------------------------------------- */

            document.body.appendChild(
                heart
            );


            /* -----------------------------------------
               Remove after animation
            ----------------------------------------- */

            setTimeout(() => {

                heart.remove();

            }, (duration + 1) * 1000);

        }


        /* ---------------------------------------------
           Initial hearts
        --------------------------------------------- */

        for (
            let i = 0;
            i < 12;
            i++
        ) {

            setTimeout(
                spawnHeart,
                i * 300
            );

        }


        /* ---------------------------------------------
           Continuously create hearts
        --------------------------------------------- */

        setInterval(() => {

            spawnHeart();

        }, 1100);

    }


    /* =====================================================
       SPARKLES
       ===================================================== */

    function createSparkles() {

        const sparkleCount = 16;


        for (
            let i = 0;
            i < sparkleCount;
            i++
        ) {

            const sparkle =
                document.createElement("span");


            sparkle.className =
                "birthday-sparkle";


            /* -----------------------------------------
               Position
            ----------------------------------------- */

            sparkle.style.left =
                `${15 + Math.random() * 70}%`;

            sparkle.style.top =
                `${25 + Math.random() * 55}%`;


            /* -----------------------------------------
               Duration
            ----------------------------------------- */

            const duration =
                1.5 + Math.random() * 2;


            sparkle.style.setProperty(
                "--sparkle-duration",
                `${duration}s`
            );


            sparkle.style.animationDelay =
                `${Math.random() * 3}s`;


            document.body.appendChild(
                sparkle
            );


            setTimeout(() => {

                sparkle.remove();

            }, (duration + 4) * 1000);

        }

    }


    /* =====================================================
       CHECK BIRTHDAY
       ===================================================== */

    function checkBirthday() {

        const now =
            Date.now();


        if (now >= birthdayTime) {

            startBirthdayCelebration();

            return true;

        }


        return false;

    }


    /* =====================================================
       CHECK IMMEDIATELY
       ===================================================== */

    if (checkBirthday()) {

        return;

    }


    /* =====================================================
       KEEP CHECKING UNTIL MIDNIGHT
       ===================================================== */

    const timer =
        setInterval(() => {

            if (checkBirthday()) {

                clearInterval(timer);

            }

        }, 250);

});