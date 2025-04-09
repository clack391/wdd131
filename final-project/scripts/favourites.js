/**
 * Favorites functionality for Mountain Trails website
 * Allows users to save their favorite trails to local storage
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const favoriteButtons = document.querySelectorAll('.favorite-button');
    const favoritesList = document.getElementById('favorites-list');
    const noFavoritesMessage = document.getElementById('no-favorites-message');
    const clearFavoritesButton = document.getElementById('clear-favorites');
    
    // Load favorites from local storage
    let favorites = JSON.parse(localStorage.getItem('mountainTrailsFavorites')) || {};
    
    // Initialize favorite buttons
    favoriteButtons.forEach(button => {
        const trailId = button.dataset.trailId;
        
        // Update button text based on whether trail is already a favorite
        if (favorites[trailId]) {
            button.textContent = 'Remove from Favorites';
            button.classList.add('favorited');
        }
        
        // Add click event listener to toggle favorite status
        button.addEventListener('click', function() {
            const trailId = this.dataset.trailId;
            const trailName = this.dataset.trailName || 
                              this.closest('.trail-info').querySelector('h3').textContent ||
                              `Trail ${trailId}`;
            
            if (favorites[trailId]) {
                // Remove from favorites
                delete favorites[trailId];
                this.textContent = 'Add to Favorites';
                this.classList.remove('favorited');
            } else {
                // Add to favorites
                favorites[trailId] = {
                    name: trailName,
                    timestamp: new Date().toISOString()
                };
                this.textContent = 'Remove from Favorites';
                this.classList.add('favorited');
            }
            
            // Save to local storage
            localStorage.setItem('mountainTrailsFavorites', JSON.stringify(favorites));
            
            // Update favorites list if it exists on the page
            if (favoritesList) {
                displayFavorites();
            }
        });
    });
    
    // Display favorites list if it exists on the page
    if (favoritesList) {
        displayFavorites();
    }
    
    // Clear all favorites
    if (clearFavoritesButton) {
        clearFavoritesButton.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear all your favorite trails?')) {
                favorites = {};
                localStorage.setItem('mountainTrailsFavorites', JSON.stringify(favorites));
                displayFavorites();
                
                // Update all favorite buttons on the page
                favoriteButtons.forEach(button => {
                    button.textContent = 'Add to Favorites';
                    button.classList.remove('favorited');
                });
            }
        });
    }
    
    // Function to display favorites
    function displayFavorites() {
        if (favoritesList) {
            favoritesList.innerHTML = '';
            
            const favoritesArray = Object.entries(favorites);
            
            if (favoritesArray.length > 0) {
                // Show favorites list, hide "no favorites" message
                favoritesList.style.display = 'block';
                if (noFavoritesMessage) {
                    noFavoritesMessage.style.display = 'none';
                }
                if (clearFavoritesButton) {
                    clearFavoritesButton.style.display = 'block';
                }
                
                // Sort favorites by timestamp (newest first)
                favoritesArray.sort((a, b) => {
                    return new Date(b[1].timestamp) - new Date(a[1].timestamp);
                });
                
                // Create list items for each favorite
                favoritesArray.forEach(([trailId, trailData]) => {
                    const listItem = document.createElement('li');
                    listItem.className = 'favorite-item';
                    
                    const trailLink = document.createElement('a');
                    trailLink.href = `trails.html#${trailId}`;
                    trailLink.textContent = trailData.name;
                    
                    const removeButton = document.createElement('button');
                    removeButton.className = 'remove-favorite';
                    removeButton.textContent = '×';
                    removeButton.setAttribute('aria-label', `Remove ${trailData.name} from favorites`);
                    
                    removeButton.addEventListener('click', function(e) {
                        e.preventDefault();
                        delete favorites[trailId];
                        localStorage.setItem('mountainTrailsFavorites', JSON.stringify(favorites));
                        displayFavorites();
                        
                        // Update corresponding favorite button if it exists on the page
                        const trailButton = document.querySelector(`.favorite-button[data-trail-id="${trailId}"]`);
                        if (trailButton) {
                            trailButton.textContent = 'Add to Favorites';
                            trailButton.classList.remove('favorited');
                        }
                    });
                    
                    listItem.appendChild(trailLink);
                    listItem.appendChild(removeButton);
                    favoritesList.appendChild(listItem);
                });
            } else {
                // Show "no favorites" message, hide favorites list
                favoritesList.style.display = 'none';
                if (noFavoritesMessage) {
                    noFavoritesMessage.style.display = 'block';
                }
                if (clearFavoritesButton) {
                    clearFavoritesButton.style.display = 'none';
                }
            }
        }
    }
});