// Projects filtering functionality
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (!filterButtons.length || !projectCards.length) return;
  
  // Add click event to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get filter value
      const filterValue = button.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        // Get card category
        const category = card.getAttribute('data-category');
        
        // Hide card with smooth animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          // Show all cards if filter is 'all', otherwise filter by category
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'block';
            
            // Trigger reflow
            void card.offsetWidth;
            
            // Show card with animation
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        }, 300);
      });
    });
  });
});