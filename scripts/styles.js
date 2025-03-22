// Footer information
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Wind Chill Calculation
function calculateWindChill(temp, windSpeed) {
    return (13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16)).toFixed(1);
}

// Get DOM elements
const tempElement = document.getElementById('temp');
const windElement = document.getElementById('wind');
const chillElement = document.getElementById('chill');

// Get values
const temperature = parseFloat(tempElement.textContent);
const windSpeed = parseFloat(windElement.textContent);

// Calculate wind chill if conditions are met
if (temperature <= 10 && windSpeed > 4.8) {
    const windChill = calculateWindChill(temperature, windSpeed);
    chillElement.textContent = `${windChill}°C`;
} else {
    chillElement.textContent = "N/A";
}