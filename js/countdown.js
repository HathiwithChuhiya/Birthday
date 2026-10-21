/* ========================================
   OUR STORY — COUNTDOWN
   Birthday: November 3, 2026
======================================== */

const birthdayDate = new Date(
    2026,
    10, // November (0 = January)
    3,
    0,
    0,
    0
).getTime();


function updateCountdown() {

    const now = new Date().getTime();
    //alert(now);
    const difference = birthdayDate - now;


    // Find elements
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");


    // If birthday has arrived
    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;
    }


    // Calculate time
    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    // Display
    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");
}


// Run immediately
updateCountdown();


// Update every second
setInterval(updateCountdown, 1000);