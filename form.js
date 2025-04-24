// Contact form functionality
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
      showFormMessage('Please fill in all fields.', 'error');
      return;
    }
    
    // Simple email validation
    if (!isValidEmail(email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return;
    }
    
    // Normally, you would send this data to your server here
    // For now, we'll just show a success message
    
    // Clear form fields
    contactForm.reset();
    
    // Show success message
    showFormMessage('Thank you! Your message has been sent successfully.', 'success');
  });
  
  // Email validation helper
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  // Show form message
  function showFormMessage(text, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = text;
    
    // Style the message
    messageElement.style.padding = '1rem';
    messageElement.style.marginTop = '2rem';
    messageElement.style.borderRadius = '4px';
    messageElement.style.fontWeight = '500';
    
    if (type === 'success') {
      messageElement.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
      messageElement.style.color = 'var(--color-light-green)';
      messageElement.style.border = '1px solid var(--color-light-green)';
    } else {
      messageElement.style.backgroundColor = 'rgba(244, 67, 54, 0.2)';
      messageElement.style.color = '#f44336';
      messageElement.style.border = '1px solid #f44336';
    }
    
    // Add message to form
    contactForm.appendChild(messageElement);
    
    // Remove message after 5 seconds
    setTimeout(() => {
      messageElement.style.opacity = '0';
      messageElement.style.transition = 'opacity 0.5s ease';
      
      setTimeout(() => {
        messageElement.remove();
      }, 500);
    }, 5000);
  }
});