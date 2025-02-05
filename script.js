let code = localStorage.getItem("seahorsePass") || "";
let points = parseInt(localStorage.getItem("points")) || 0;
let startTime = parseInt(localStorage.getItem("startTime")) || 0;
let interval;

function submitCode() {
    const inputCode = document.getElementById("codeInput").value;

    if (inputCode === "303483") {
        code = inputCode;
        localStorage.setItem("seahorsePass", code);

        if (!startTime) {
            startTime = Date.now();
            localStorage.setItem("startTime", startTime);
        }

        document.getElementById("login").style.display = "none";
        document.getElementById("dashboard").style.display = "block";

        calculateElapsedPoints();
        startPointCounter();
    } else {
        document.getElementById("errorMsg").innerText = "Invalid Code!";
    }
}

function calculateElapsedPoints() {
    if (startTime) {
        let elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Time in seconds
        points = elapsedTime;
        localStorage.setItem("points", points);
    }
    document.getElementById("points").innerText = points;
}

function startPointCounter() {
    interval = setInterval(() => {
        points++;
        document.getElementById("points").innerText = points;
        localStorage.setItem("points", points);
    }, 1000);
}

// Auto-load if code is already entered
if (code) {
    document.getElementById("login").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    calculateElapsedPoints();
    startPointCounter();
}
