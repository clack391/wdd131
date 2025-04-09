/**
 * JavaScript for the gear page
 * Handles tab switching and gear preferences
 */

document.addEventListener('DOMContentLoaded', function() {
    // Tab switching for gear categories
    const tabButtons = document.querySelectorAll('.tab-button');
    const gearContents = document.querySelectorAll('.gear-content');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all tabs and content
                tabButtons.forEach(btn => btn.classList.remove('active'));
                gearContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to current tab and content
                const category = this.dataset.category;
                this.classList.add('active');
                document.getElementById(category).classList.add('active');
            });
        });
    }
    
    // Gear checklist download functionality
    const downloadButton = document.getElementById('download-checklist');
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            // In a real application, this would generate and download a PDF
            // For this demo, we'll show an alert
            alert('In a production environment, this would download a PDF checklist. This is a demonstration.');
        });
    }
    
    // Save gear preferences functionality
    const savePreferencesButton = document.getElementById('save-preferences');
    const savedMessage = document.getElementById('saved-preferences-message');
    
    if (savePreferencesButton && savedMessage) {
        savePreferencesButton.addEventListener('click', function() {
            // Get all displayed gear items
            const gearItems = document.querySelectorAll('.gear-card h4');
            let gearPreferences = [];
            
            // Store gear items from the currently active tab
            gearItems.forEach(item => {
                if (item.closest('.gear-content').classList.contains('active')) {
                    gearPreferences.push(item.textContent);
                }
            });
            
            // Save to local storage
            localStorage.setItem('mountainTrailsGearPreferences', JSON.stringify(gearPreferences));
            
            // Show saved message
            savedMessage.classList.remove('hidden');
            setTimeout(() => {
                savedMessage.classList.add('hidden');
            }, 3000);
        });
    }
});