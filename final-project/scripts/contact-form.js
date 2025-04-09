/**
 * Contact form validation and submission
 */

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const sendAnotherButton = document.getElementById('send-another');
  
  if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
          event.preventDefault();
          
          // Reset error messages
          const errorMessages = document.querySelectorAll('.error-message');
          errorMessages.forEach(error => {
              error.textContent = '';
          });
          
          // Get form fields
          const name = document.getElementById('name');
          const email = document.getElementById('email');
          const phone = document.getElementById('phone');
          const subject = document.getElementById('subject');
          const message = document.getElementById('message');
          
          // Validate form
          let isValid = true;
          
          // Name validation
          if (!name.value.trim()) {
              document.getElementById('name-error').textContent = 'Please enter your name';
              isValid = false;
          }
          
          // Email validation
          if (!email.value.trim()) {
              document.getElementById('email-error').textContent = 'Please enter your email address';
              isValid = false;
          } else if (!isValidEmail(email.value)) {
              document.getElementById('email-error').textContent = 'Please enter a valid email address';
              isValid = false;
          }
          
          // Phone validation (only if provided)
          if (phone.value.trim() && !isValidPhone(phone.value)) {
              document.getElementById('phone-error').textContent = 'Please use the format 123-456-7890';
              isValid = false;
          }
          
          // Subject validation
          if (!subject.value) {
              document.getElementById('subject-error').textContent = 'Please select a subject';
              isValid = false;
          }
          
          // Message validation
          if (!message.value.trim()) {
              document.getElementById('message-error').textContent = 'Please enter your message';
              isValid = false;
          }
          
          // If form is valid, proceed with submission
          if (isValid) {
              // In a real application, this would send data to a server
              // For this demo, we'll just show the success message
              
              // Hide form and show success message
              contactForm.classList.add('hidden');
              if (formSuccess) {
                  formSuccess.classList.remove('hidden');
              }
              
              // Log form data (would be sent to server in real app)
              const formData = {
                  name: name.value,
                  email: email.value,
                  phone: phone.value,
                  subject: subject.value,
                  message: message.value,
                  subscribe: document.getElementById('subscribe').checked,
                  referral: document.querySelector('input[name="referral"]:checked')?.value
              };
              
              console.log('Form submission data:', formData);
          }
      });
  }
  
  // Send another message button
  if (sendAnotherButton && contactForm && formSuccess) {
      sendAnotherButton.addEventListener('click', function() {
          // Reset and show the form
          contactForm.reset();
          formSuccess.classList.add('hidden');
          contactForm.classList.remove('hidden');
      });
  }
  
  // Email validation helper function
  function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }
  
  // Phone validation helper function
  function isValidPhone(phone) {
      const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
      return phoneRegex.test(phone);
  }
});