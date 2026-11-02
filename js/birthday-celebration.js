/* =========================================================
   BIRTHDAY MIDNIGHT CELEBRATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const countdown = document.getElementById("countdown");
    const countdownDate = document.querySelector(".countdown-date");
    const lockedMessage = document.querySelector(".locked-message");
    const enterButton = document.querySelector(".hero-button");

    if (!countdown) return;


    /* -----------------------------------------
       Birthday moment
       Local time: November 3, 2026 at 00:00:00
    ----------------------------------------- */

    const birthdayTime = new Date(
        2026,
        10,
        3,
        0,
        0,
        0
    ).getTime();


    let celebrationStarted = false;


    /* -----------------------------------------
       Create celebration
    ----------------------------------------- */

    function startBirthdayCelebration() {

        if (celebrationStarted) return;

        celebrationStarted = true;


        /* Hide countdown */
        countdown.classList.add("birthday-finished");


        if (countdownDate) {
            countdownDate.classList.add(
                "birthday-hide-after"
            );
        }


        if (lockedMessage) {
            lockedMessage.classList.add(
                "birthday-hide-after"
            );
        }


        if (enterButton) {
            enterButton.classList.add(
                "birthday-hide-after"
            );
        }


        /* Create birthday message */
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
                    <span>My Little Princess</span>
                </h2>

                <span class="birthday-cake">
                    🎂
                </span>

                <p class="birthday-subtitle">
                    May your smile always be as beautiful as you are. ❤️
                </p>

            </div>

        `;


        countdown.parentElement.appendChild(
            celebration
        );


        /* -----------------------------------------
           Create floating balloons
        ----------------------------------------- */

        createBalloons();
    }


    /* -----------------------------------------
       Balloons
    ----------------------------------------- */

    function createBalloons() {

        const balloonCount = 14;

        for (let i = 0; i < balloonCount; i++) {

            const balloon =
                document.createElement("span");

            balloon.className =
                "birthday-balloon";


            const left =
                4 + Math.random() * 92;

            const duration =
                7 + Math.random() * 5;

            const delay =
                Math.random() * 4;

            const drift =
                -35 + Math.random() * 70;


            balloon.style.left =
                `${left}%`;

            balloon.style.setProperty(
                "--balloon-duration",
                `${duration}s`
            );

            balloon.style.setProperty(
                "--balloon-drift",
                `${drift}px`
            );

            balloon.style.animationDelay =
                `${delay}s`;


            document.body.appendChild(
                balloon
            );


            setTimeout(() => {

                balloon.remove();

            }, (duration + delay + 1) * 1000);
        }
    }


    /* -----------------------------------------
       Check time
    ----------------------------------------- */

    function checkBirthday() {

        const now = Date.now();

        if (now >= birthdayTime) {

            startBirthdayCelebration();

            return true;
        }

        return false;
    }


    /* Check immediately */
    if (checkBirthday()) return;


    /* Check frequently around midnight */
    const timer = setInterval(() => {

        if (checkBirthday()) {
            clearInterval(timer);
        }

    }, 250);

});