// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
  // Header scroll effect
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger');
  const body = document.body;
  let mobileMenu;

  // Create mobile menu dynamically
  function createMobileMenu() {
    if (document.querySelector('.mobile-menu')) return;
    
    const menu = document.createElement('div');
    menu.className = 'mobile-menu';
    
    // Clone navigation
    const navClone = document.querySelector('.nav__list').cloneNode(true);
    menu.appendChild(navClone);
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'mobile-menu__close';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '2rem';
    closeBtn.style.right = '2rem';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.color = 'var(--color-white)';
    closeBtn.style.fontSize = '2.4rem';
    closeBtn.style.cursor = 'pointer';
    
    menu.appendChild(closeBtn);
    body.appendChild(menu);
    
    return menu;
  }

  // Handle scroll effect for header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      
      if (!mobileMenu) {
        mobileMenu = createMobileMenu();
      }
      
      mobileMenu.classList.toggle('active');
      
      // Prevent background scrolling when menu is open
      if (mobileMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });
  }

  // Handle mobile menu close button and link clicks
  document.addEventListener('click', (e) => {
    if (e.target.closest('.mobile-menu__close')) {
      if (mobileMenu) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        body.style.overflow = '';
      }
    }
    
    // Close menu when clicking a navigation link
    if (e.target.classList.contains('nav__link') && mobileMenu && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      hamburger.classList.remove('active');
      body.style.overflow = '';
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
      }
    });
  });

  // Update active nav link based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav__link');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  // Attach scroll event listener
  window.addEventListener('scroll', updateActiveNavLink);
  
  // Initialize active link
  updateActiveNavLink();
});