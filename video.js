// Video player functionality
document.addEventListener('DOMContentLoaded', () => {
  const videoContainers = document.querySelectorAll('.video-container');
  
  videoContainers.forEach(container => {
    const video = container.querySelector('video');
    const playBtn = container.querySelector('.play-btn');
    const overlay = container.querySelector('.video-overlay');
    
    if (!video || !playBtn || !overlay) return;
    
    // Toggle play/pause
    container.addEventListener('click', () => {
      if (video.paused) {
        // Play video
        video.play()
          .then(() => {
            // Hide overlay when video starts playing
            overlay.style.opacity = '0';
            setTimeout(() => {
              overlay.style.display = 'none';
            }, 300);
          })
          .catch(error => {
            console.error('Error playing video:', error);
            
            // Show "Add video source" message if no video source
            if (video.src === '' || video.src === window.location.href) {
              const noSourceMsg = document.createElement('div');
              noSourceMsg.textContent = 'Please add a video source.';
              noSourceMsg.style.position = 'absolute';
              noSourceMsg.style.top = '50%';
              noSourceMsg.style.left = '50%';
              noSourceMsg.style.transform = 'translate(-50%, -50%)';
              noSourceMsg.style.color = 'var(--color-white)';
              noSourceMsg.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
              noSourceMsg.style.padding = '1rem 2rem';
              noSourceMsg.style.borderRadius = '4px';
              
              overlay.appendChild(noSourceMsg);
              
              // Remove message after 3 seconds
              setTimeout(() => {
                noSourceMsg.remove();
              }, 3000);
            }
          });
      } else {
        // Pause video
        video.pause();
        
        // Show overlay when video is paused
        overlay.style.display = 'flex';
        setTimeout(() => {
          overlay.style.opacity = '1';
        }, 10);
      }
    });
    
    // Show controls when video ends
    video.addEventListener('ended', () => {
      overlay.style.display = 'flex';
      setTimeout(() => {
        overlay.style.opacity = '1';
      }, 10);
    });
  });
});