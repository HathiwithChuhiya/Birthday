/* ========================================
   OUR STORY — COUNTDOWN
   Birthday: November 3, 2026
   Timezone: Asia/Kolkata
======================================== */


const BIRTHDAY_TIMEZONE =
    "Asia/Kolkata";


const BIRTHDAY_YEAR =
    2026;


const BIRTHDAY_MONTH =
    11;


const BIRTHDAY_DAY =
    3;


/* ----------------------------------------
   BIRTHDAY DATE
---------------------------------------- */

const birthdayDate =
    new Date(
        `${BIRTHDAY_YEAR}-` +
        `${String(BIRTHDAY_MONTH).padStart(2, "0")}-` +
        `${String(BIRTHDAY_DAY).padStart(2, "0")}` +
        `T00:00:00+05:30`
    ).getTime();


/* ----------------------------------------
   UPDATE COUNTDOWN
---------------------------------------- */

function updateCountdown() {

    const now =
        Date.now();


    const difference =
        birthdayDate -
        now;


    const daysElement =
        document.getElementById(
            "days"
        );


    const hoursElement =
        document.getElementById(
            "hours"
        );


    const minutesElement =
        document.getElementById(
            "minutes"
        );


    const secondsElement =
        document.getElementById(
            "seconds"
        );


    /*
       If countdown doesn't exist
       on the current page, stop.
    */

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {

        return;

    }


    /*
       Birthday has started.
    */

    if (
        difference <= 0
    ) {

        daysElement.textContent =
            "00";

        hoursElement.textContent =
            "00";

        minutesElement.textContent =
            "00";

        secondsElement.textContent =
            "00";

        return;

    }


    /*
       Calculate time.
    */

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    /*
       Display.
    */

    daysElement.textContent =
        String(days)
            .padStart(2, "0");


    hoursElement.textContent =
        String(hours)
            .padStart(2, "0");


    minutesElement.textContent =
        String(minutes)
            .padStart(2, "0");


    secondsElement.textContent =
        String(seconds)
            .padStart(2, "0");

}


/* ----------------------------------------
   START
---------------------------------------- */

updateCountdown();


setInterval(
    updateCountdown,
    1000
);