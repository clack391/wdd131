// Get current year
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

// Get last modified date
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;