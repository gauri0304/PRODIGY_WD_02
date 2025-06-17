let startTime;
let elapsed = 0;
let timerInterval = null;
let lapCount = 1;

const display = document.getElementById("display");
const message = document.getElementById("message");

// Create lap container if not present
let lapsContainer = document.getElementById("laps");
if (!lapsContainer) {
    lapsContainer = document.createElement("div");
    lapsContainer.id = "laps";
    document.querySelector(".stopwatch").appendChild(lapsContainer);
}

function updateDisplay() {
    let time = elapsed;
    let hours = Math.floor(time / 3600000);
    time %= 3600000;
    let minutes = Math.floor(time / 60000);
    time %= 60000;
    let seconds = Math.floor(time / 1000);

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    display.innerText = `${h}:${m}:${s}`;
}

function showMessage(text) {
    message.innerText = text;
    message.style.opacity = 1;

    setTimeout(() => {
        message.style.opacity = 0;
    }, 3000);
}

function start() {
    if (timerInterval !== null) return;

    startTime = Date.now() - elapsed;
    timerInterval = setInterval(() => {
        elapsed = Date.now() - startTime;
        updateDisplay();
    }, 1000);

    showMessage("Stopwatch started!");
}

function stop() {
    clearInterval(timerInterval);
    timerInterval = null;
    showMessage("Stopwatch paused!");
}

function reset() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsed = 0;
    lapCount = 1;
    updateDisplay();
    lapsContainer.innerHTML = ""; // clear laps
    showMessage("Stopwatch reset! Start again.");
}

function lap() {
    if (timerInterval === null) {
        showMessage("Start the stopwatch before recording laps.");
        return;
    }

    const lapTime = display.innerText;
    const lapEntry = document.createElement("div");
    lapEntry.classList.add("lap-entry");

    // Create text span
    const lapText = document.createElement("span");
    lapText.textContent = `Lap ${lapCount++}: ${lapTime}`;

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => lapEntry.remove();

    // Append both to lap entry
    lapEntry.appendChild(lapText);
    lapEntry.appendChild(deleteBtn);

    // Add to the laps container
    lapsContainer.appendChild(lapEntry);
}

