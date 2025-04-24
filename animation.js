// Animations
document.addEventListener('DOMContentLoaded', () => {
  // Initialize scroll animations
  function initScrollAnimations() {
    // Elements to animate on scroll
    const fadeElements = document.querySelectorAll('.section-header, .about__image, .about__text, .contact__info, .contact__form');
    
    // Add the necessary classes
    fadeElements.forEach(el => {
      if (!el.classList.contains('fade-in')) {
        el.classList.add('fade-in');
      }
    });
    
    // Skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Project cards for staggered animation
    const projectCards = document.querySelectorAll('.project-card');
    
    // Function to check if element is in viewport
    function isInViewport(el, offset = 0) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
        rect.bottom >= 0
      );
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
      // Fade in elements
      fadeElements.forEach(el => {
        if (isInViewport(el, 150)) {
          el.classList.add('visible');
        }
      });
      
      // Animate skill bars when in viewport
      if (skillBars.length > 0) {
        const skillsSection = document.querySelector('.about__skills');
        
        if (skillsSection && isInViewport(skillsSection, 100)) {
          skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
              bar.style.transition = 'width 1.5s ease-in-out';
              bar.style.width = width;
            }, 200);
          });
        }
      }
      
      // Stagger project card animations
      projectCards.forEach((card, index) => {
        if (isInViewport(card, 100)) {
          setTimeout(() => {
            card.classList.add('visible');
          }, 100 * index);
        }
      });
    }
    
    // Run on load
    handleScrollAnimations();
    
    // Attach scroll event listener
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Handle resize events
    window.addEventListener('resize', handleScrollAnimations);
  }
  
  // Initialize animations
  initScrollAnimations();
});