// DOM Elements
const hamburgerMenu = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const adoptionForm = document.getElementById('adoption-form');
const inquirySuccess = document.getElementById('inquiry-success');
const storyForm = document.getElementById('story-form');
const storySuccess = document.getElementById('story-success');
const favoriteBtns = document.querySelectorAll('.favorite-btn');
const filterButton = document.getElementById('filter-button');
const petTypeSelect = document.getElementById('pet-type');
const petAgeSelect = document.getElementById('pet-age');
const petsContainer = document.getElementById('pets-container');
const viewFavoritesBtn = document.getElementById('view-favorites');
const favoritesCount = document.getElementById('favorites-count');
const noPetsMessage = document.getElementById('no-pets-message');

// Sample pet data for the Available Pets page
const petsData = [
    {
        id: 'pet1',
        name: 'Buddy',
        type: 'dog',
        breed: 'Golden Retriever',
        age: 'young',
        ageText: '3 years old',
        description: 'Friendly and energetic companion who loves long walks',
        image: 'images/dog1.jpeg',
        smallImage: 'images/dog1.jpeg'
    },
    {
        id: 'pet2',
        name: 'Luna',
        type: 'cat',
        breed: 'Domestic Shorthair',
        age: 'young',
        ageText: '2 years old',
        description: 'Sweet and gentle cat who enjoys quiet cuddle time',
        image: 'images/cat1.jpeg',
        smallImage: 'images/cat1.jpeg'
    },
    {
        id: 'pet3',
        name: 'Max',
        type: 'dog',
        breed: 'Border Collie Mix',
        age: 'baby',
        ageText: '1 year old',
        description: 'Intelligent and playful pup looking for an active family',
        image: 'images/dog2.jpeg',
        smallImage: 'images/dog2.jpeg'
    },
    {
        id: 'pet4',
        name: 'Oliver',
        type: 'cat',
        breed: 'Tabby',
        age: 'adult',
        ageText: '5 years old',
        description: 'Calm and independent cat who loves sunny window spots',
        image: 'images/cat2.jpeg',
        smallImage: 'images/cat2.jpeg'
    },
    {
        id: 'pet5',
        name: 'Bailey',
        type: 'dog',
        breed: 'Labrador Mix',
        age: 'senior',
        ageText: '9 years old',
        description: 'Sweet senior dog who still has lots of love to give',
        image: 'images/dog3.jpeg',
        smallImage: 'images/dog3.jpeg'
    },
    {
        id: 'pet6',
        name: 'Whiskers',
        type: 'other',
        breed: 'Bunny',
        age: 'young',
        ageText: '1 year old',
        description: 'Curious and gentle rabbit who enjoys hopping around',
        image: 'images/bunny1.jpeg',
        smallImage: 'images/bunny1.jpeg'
    },
    {
        id: 'pet7',
        name: 'Charlie',
        type: 'dog',
        breed: 'Beagle',
        age: 'adult',
        ageText: '4 years old',
        description: 'Friendly beagle who loves to explore and sniff everything',
        image: 'images/dog4.jpeg',
        smallImage: 'images/dog4.jpeg'
    },
    {
        id: 'pet8',
        name: 'Mittens',
        type: 'cat',
        breed: 'Maine Coon Mix',
        age: 'baby',
        ageText: '8 months old',
        description: 'Playful kitten with a fluffy coat and curious personality',
        image: 'images/cat3.jpeg',
        smallImage: 'images/cat3.jpeg'
    }
];

// Initialize favorite pets from localStorage
let favorites = JSON.parse(localStorage.getItem('favoritePets')) || [];
let showingFavorites = false;

// Event Listener for Mobile Navigation Menu
if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('show') && 
        !e.target.closest('#nav-menu') && 
        e.target !== hamburgerMenu) {
        navMenu.classList.remove('show');
    }
});

// Form validation function
function validateForm(form, errorIds) {
    let isValid = true;
    
    // Clear previous error messages
    errorIds.forEach(id => {
        document.getElementById(id).textContent = '';
    });
    
    // Check each required field
    form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
            const errorId = field.id + '-error';
            document.getElementById(errorId).textContent = 'This field is required';
            isValid = false;
        } else if (field.type === 'email' && !validateEmail(field.value)) {
            const errorId = field.id + '-error';
            document.getElementById(errorId).textContent = 'Please enter a valid email address';
            isValid = false;
        }
    });
    
    return isValid;
}

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Contact Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const errorIds = ['name-error', 'email-error', 'message-error'];
        if (validateForm(contactForm, errorIds)) {
            // Simulating form submission
            contactForm.reset();
            formSuccess.classList.remove('hidden');
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.add('hidden');
            }, 5000);
        }
    });
}

// Adoption Inquiry Form Submission
if (adoptionForm) {
    adoptionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const errorIds = ['inquiry-name-error', 'inquiry-email-error', 'pet-interest-error', 'inquiry-message-error'];
        if (validateForm(adoptionForm, errorIds)) {
            // Simulating form submission
            adoptionForm.reset();
            inquirySuccess.classList.remove('hidden');
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                inquirySuccess.classList.add('hidden');
            }, 5000);
        }
    });
}

// Story Form Submission
if (storyForm) {
    storyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const errorIds = ['story-name-error', 'pet-name-error', 'adoption-date-error', 'your-story-error'];
        if (validateForm(storyForm, errorIds)) {
            // Simulating form submission
            storyForm.reset();
            storySuccess.classList.remove('hidden');
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                storySuccess.classList.add('hidden');
            }, 5000);
        }
    });
}

// Handle favorite buttons on the homepage
if (favoriteBtns.length > 0) {
    favoriteBtns.forEach(btn => {
        const petId = btn.dataset.id;
        
        // Update button appearance if already in favorites
        if (favorites.includes(petId)) {
            btn.classList.add('active');
            btn.textContent = '❤ Favorited';
        }
        
        btn.addEventListener('click', () => {
            toggleFavorite(petId, btn);
        });
    });
}

// Toggle favorite status
function toggleFavorite(petId, btn) {
    const index = favorites.indexOf(petId);
    
    if (index === -1) {
        // Add to favorites
        favorites.push(petId);
        if (btn) {
            btn.classList.add('active');
            btn.textContent = '❤ Favorited';
        }
    } else {
        // Remove from favorites
        favorites.splice(index, 1);
        if (btn) {
            btn.classList.remove('active');
            btn.textContent = '♡ Favorite';
        }
    }
    
    // Update localStorage and UI
    localStorage.setItem('favoritePets', JSON.stringify(favorites));
    updateFavoritesCount();
    
    // If on Pets page and currently showing favorites, refresh the display
    if (showingFavorites && petsContainer) {
        filterPets(true);
    }
}

// Update favorites count in UI
function updateFavoritesCount() {
    if (favoritesCount) {
        favoritesCount.textContent = favorites.length;
    }
}

// Initialize favorites count
updateFavoritesCount();

// Filter pets on Pets page
if (filterButton) {
    filterButton.addEventListener('click', () => {
        showingFavorites = false;
        viewFavoritesBtn.classList.remove('active');
        filterPets();
    });
}

// Toggle favorites view
if (viewFavoritesBtn) {
    viewFavoritesBtn.addEventListener('click', () => {
        showingFavorites = !showingFavorites;
        viewFavoritesBtn.classList.toggle('active');
        
        if (showingFavorites) {
            viewFavoritesBtn.textContent = `Back to All Pets`;
        } else {
            viewFavoritesBtn.textContent = `View My Favorites (${favorites.length})`;
        }
        
        filterPets(showingFavorites);
    });
}

// Filter and display pets
function filterPets(favoritesOnly = false) {
    if (!petsContainer) return;
    
    const type = favoritesOnly ? 'all' : petTypeSelect.value;
    const age = favoritesOnly ? 'all' : petAgeSelect.value;
    
    // Filter pets based on criteria
    let filteredPets = petsData.filter(pet => {
        const typeMatch = type === 'all' || pet.type === type;
        const ageMatch = age === 'all' || pet.age === age;
        const favoriteMatch = !favoritesOnly || favorites.includes(pet.id);
        
        return typeMatch && ageMatch && (favoritesOnly ? favoriteMatch : true);
    });
    
    // Display filtered pets
    displayPets(filteredPets);
}

// Display pets in the UI
function displayPets(pets) {
    if (!petsContainer) return;
    
    // Clear current pets
    petsContainer.innerHTML = '';
    
    if (pets.length === 0) {
        noPetsMessage.classList.remove('hidden');
    } else {
        noPetsMessage.classList.add('hidden');
        
        // Create pet cards
        pets.forEach(pet => {
            const petCard = document.createElement('article');
            petCard.className = 'pet-card';
            
            const isFavorite = favorites.includes(pet.id);
            
            petCard.innerHTML = `
                <img src="${pet.smallImage}" alt="${pet.name} - ${pet.breed}" loading="lazy" 
                     data-src="${pet.image}" class="lazy-image">
                <div class="pet-info">
                    <h3>${pet.name}</h3>
                    <p>${pet.breed} • ${pet.ageText}</p>
                    <p>${pet.description}</p>
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${pet.id}">
                        ${isFavorite ? '❤ Favorited' : '♡ Favorite'}
                    </button>
                </div>
            `;
            
            petsContainer.appendChild(petCard);
            
            // Add event listener to the new favorite button
            const favoriteBtn = petCard.querySelector('.favorite-btn');
            favoriteBtn.addEventListener('click', () => {
                toggleFavorite(pet.id, favoriteBtn);
            });
        });
    }
}

// Initialize pets display on page load
if (petsContainer) {
    displayPets(petsData);
}

// Lazy loading images
function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-image');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver support
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy-image');
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Close nav menu with Escape key
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
    }
});

// Make favorite buttons accessible with keyboard
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.classList.contains('favorite-btn')) {
        const petId = e.target.dataset.id;
        toggleFavorite(petId, e.target);
    }
});