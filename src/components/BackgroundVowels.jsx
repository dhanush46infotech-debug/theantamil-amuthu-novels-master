import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

/**
 * BackgroundVowels Component
 * Displays animated Tamil vowels floating in the background with proper alignment
 */
const BackgroundVowels = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationIdRef = useRef(null);
  const { currentLanguage } = useLanguage();

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

    // Language-based letters
    const getLetters = () => {
      switch(currentLanguage) {
        case 'TAMIL':
          const tamilVowels = ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ'];
          const tamilConsonants = ['க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப', 'ம', 'ய', 'ர', 'ல', 'வ', 'ழ', 'ள', 'ற', 'ன'];
          return [...tamilVowels, ...tamilConsonants];
        case 'ENGLISH':
          return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        case 'TELUGU':
          const teluguVowels = ['అ', 'ఆ', 'ఇ', 'ఈ', 'ఉ', 'ఊ', 'ఋ', 'ౠ', 'ఌ', 'ౡ', 'ఎ', 'ఏ', 'ఐ', 'ఒ', 'ఓ', 'ఔ'];
          const teluguConsonants = ['క', 'ఖ', 'గ', 'ఘ', 'ఙ', 'చ', 'ఛ', 'జ', 'ఝ', 'ఞ', 'ట', 'ఠ', 'డ', 'ఢ'];
          return [...teluguVowels, ...teluguConsonants];
        case 'HINDI':
          const hindiVowels = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ'];
          const hindiConsonants = ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न'];
          return [...hindiVowels, ...hindiConsonants];
        default:
          return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      }
    };
    const allChars = getLetters();

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
        ctx.fillStyle = '#DAA520';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#FFD700';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Apply rotation
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillText(this.char, 0, 0);
        ctx.restore();
      }
    }

    // Create 30 particles for all Tamil letters
    particlesRef.current = Array.from({ length: 30 }, () => new FloatingVowel());

    function animate() {
      // Clear canvas completely - no smoke effect
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
  }, [currentLanguage]);

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