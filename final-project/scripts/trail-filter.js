/**
 * Trail filtering functionality for the trails page
 * Allows users to filter trails by difficulty, length, and elevation gain
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get filter elements
    const difficultyFilter = document.getElementById('difficulty-filter');
    const lengthFilter = document.getElementById('length-filter');
    const elevationFilter = document.getElementById('elevation-filter');
    const resetButton = document.getElementById('reset-filters');
    const trailCards = document.querySelectorAll('.trail-card');
    
    // Add event listeners to filters
    if (difficultyFilter) {
        difficultyFilter.addEventListener('change', filterTrails);
    }
    
    if (lengthFilter) {
        lengthFilter.addEventListener('change', filterTrails);
    }
    
    if (elevationFilter) {
        elevationFilter.addEventListener('change', filterTrails);
    }
    
    // Reset filters
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            if (difficultyFilter) difficultyFilter.value = 'all';
            if (lengthFilter) lengthFilter.value = 'all';
            if (elevationFilter) elevationFilter.value = 'all';
            
            // Show all trails
            trailCards.forEach(card => {
                card.style.display = 'flex';
            });
        });
    }
    
    // Filter trails based on selected criteria
    function filterTrails() {
        const selectedDifficulty = difficultyFilter ? difficultyFilter.value : 'all';
        const selectedLength = lengthFilter ? lengthFilter.value : 'all';
        const selectedElevation = elevationFilter ? elevationFilter.value : 'all';
        
        trailCards.forEach(card => {
            const difficulty = card.dataset.difficulty;
            const length = parseFloat(card.dataset.length);
            const elevation = parseFloat(card.dataset.elevation);
            
            // Check if trail matches all selected filters
            const matchesDifficulty = selectedDifficulty === 'all' || difficulty === selectedDifficulty;
            
            let matchesLength = true;
            if (selectedLength === 'short') {
                matchesLength = length < 3;
            } else if (selectedLength === 'medium') {
                matchesLength = length >= 3 && length <= 6;
            } else if (selectedLength === 'long') {
                matchesLength = length > 6;
            }
            
            let matchesElevation = true;
            if (selectedElevation === 'low') {
                matchesElevation = elevation < 500;
            } else if (selectedElevation === 'medium') {
                matchesElevation = elevation >= 500 && elevation <= 1500;
            } else if (selectedElevation === 'high') {
                matchesElevation = elevation > 1500;
            }
            
            // Show or hide the trail based on filter matches
            if (matchesDifficulty && matchesLength && matchesElevation) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
});