// Custom cursor
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');

  if (!cursor || !cursorFollower) return;

  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;

  function animate() {
    // Calculate lag effect for follower
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    // Update positions
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;

    // Continue animation
    requestAnimationFrame(animate);
  }

  // Initialize animation
  animate();

  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Show cursor once mouse moves
    if (cursor.style.opacity === '0' || cursor.style.opacity === '') {
      cursor.style.opacity = '1';
      cursorFollower.style.opacity = '0.5';
    }
  });

  // Handle cursor over interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, .project-card, .video-container');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
      cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) scale(1.5)`;
      cursorFollower.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
      cursorFollower.style.borderColor = 'var(--color-light-green)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) scale(1)`;
      cursorFollower.style.backgroundColor = 'transparent';
      cursorFollower.style.borderColor = 'var(--color-light-green)';
    });
  });

  // Hide cursor when leaving the window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
  });

  // Show cursor when entering the window
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '0.5';
  });
});