import { useEffect, useRef } from 'react';

/**
 * BackgroundVowels Component
 * Displays animated Tamil vowels floating in the background with proper alignment
 */
const BackgroundVowels = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    // Tamil vowels and consonants for variety
    const vowels = ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ'];
    const consonants = ['க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப', 'ம', 'ய', 'ர'];
    const allChars = [...vowels, ...consonants];

    class FloatingVowel {
      constructor() {
        this.reset();
      }

      reset() {
        // Create grid-based distribution for better alignment
        const gridX = Math.floor(Math.random() * 12);
        const gridY = Math.floor(Math.random() * 8);
        const cellWidth = canvas.width / 12;
        const cellHeight = canvas.height / 8;

        this.x = gridX * cellWidth + Math.random() * cellWidth * 0.8;
        this.y = gridY * cellHeight + Math.random() * cellHeight * 0.8;
        this.char = allChars[Math.floor(Math.random() * allChars.length)];
        this.speed = 0.15 + Math.random() * 0.35;
        this.size = 18 + Math.random() * 28;
        this.opacity = 0.08 + Math.random() * 0.15;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.rotation = 0;
      }

      update() {
        this.y -= this.speed;
        this.x += Math.sin(this.angle) * 0.3;
        this.angle += 0.008;
        this.rotation += this.rotationSpeed;

        // Reset when vowel goes off-screen
        if (this.y < -100 || this.x < -100 || this.x > canvas.width + 100) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.size}px 'Segoe UI', sans-serif`;
        ctx.fillStyle = '#00f0ff';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Apply rotation
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillText(this.char, 0, 0);
        ctx.restore();
      }
    }

    // Create particles with proper distribution
    particlesRef.current = Array.from({ length: 25 }, () => new FloatingVowel());

    function animate() {
      // Clear canvas with slight fade for trail effect
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationIdRef.current = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{
        background: 'transparent',
        zIndex: 0,
        display: 'block',
      }}
    />
  );
};

export default BackgroundVowels;