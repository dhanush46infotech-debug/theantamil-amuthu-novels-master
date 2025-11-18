import { useEffect, useRef } from 'react';
import styles from '../styles/starEffect.module.scss';

const StarEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];

    // Set canvas size to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    // Create stars with responsive count based on screen size
    const initStars = () => {
      stars = [];
      const screenWidth = window.innerWidth;

      // Responsive star count:
      // Mobile (<=480px): 50 stars
      // Tablet (481-768px): 75 stars
      // Desktop (769-1439px): 150 stars
      // Wide/TV (1440-1919px): 200 stars
      // Ultra-wide (1920+): 250 stars
      let numberOfStars;
      if (screenWidth <= 480) {
        numberOfStars = 50; // Mobile - reduced for performance
      } else if (screenWidth <= 768) {
        numberOfStars = 75; // Tablet
      } else if (screenWidth <= 1439) {
        numberOfStars = 150; // Desktop
      } else if (screenWidth <= 1919) {
        numberOfStars = 200; // Wide/TV
      } else {
        numberOfStars = 250; // Ultra-wide/4K
      }

      for (let i = 0; i < numberOfStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.01
        });
      }
    };

    // Animate stars
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        // Update position
        star.x += star.speedX;
        star.y += star.speedY;

        // Wrap around screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Twinkle effect
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.3) {
          star.twinkleSpeed *= -1;
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.starCanvas} />;
};

export default StarEffect;
