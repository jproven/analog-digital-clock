const digitalClock = document.querySelector('.digital-clock');
const analogClock = document.querySelector('.analog-clock');
const toggleButton = document.querySelector('.toggle-button');
const modeButton = document.querySelector('.mode-button');

const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

let isDigital = true;

function updateDigitalClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    digitalClock.textContent = `${hours}:${minutes}:${seconds}`;
}

function updateAnalogClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    const hoursDegrees = ((hours % 12) / 12) * 360 + (minutes / 60) * 30 - 90;
    const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 - 90;

    // Calculamos la rotación de la manecilla de los segundos, pero evitamos reinicios bruscos
    const totalTime = (seconds + milliseconds / 1000) * 6;

    secondHand.style.transition = 'none'; // Eliminamos la transición para evitar saltos
    secondHand.style.transform = `rotate(${totalTime}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
}

function toggleClock() {
    isDigital = !isDigital;
    digitalClock.classList.toggle('hidden', !isDigital);
    analogClock.classList.toggle('hidden', isDigital);
    toggleButton.textContent = isDigital ? 'Switch to Analog' : 'Switch to Digital';
}

function toggleMode() {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
    const isLightMode = document.body.classList.contains('light-mode');
    modeButton.textContent = isLightMode ? 'Dark Mode' : 'Light Mode';
}

toggleButton.addEventListener('click', toggleClock);
modeButton.addEventListener('click', toggleMode);

setInterval(() => {
    if (isDigital) {
        updateDigitalClock();
    } else {
        updateAnalogClock();
    }
}, 1000);

updateDigitalClock();
updateAnalogClock();