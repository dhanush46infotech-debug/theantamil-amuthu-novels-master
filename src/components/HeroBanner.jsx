
const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Images for Slider 1 - Auto-rotating carousel
  const carouselImages = [romanticBg, fantasyBg, thrillerBg, horrorBg];

  // Auto-rotate images every 4 seconds (Slider 1)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Slide navigation
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % 2);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + 2) % 2);
  const goToSlide = (index) => setCurrentSlide(index);

  // Touch handlers
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Zoom animation variants
  const imageVariants = {
    initial: {
      scale: 1,
      opacity: 1,
    },
    enter: {
      scale: [1, 1.2, 1.1],
      opacity: 1,
      transition: {
        duration: 4,
        times: [0, 0.5, 1],
        ease: 'easeInOut',
      },
    },
    exit: {
      scale: 1.1,
      opacity: 1,
      transition: {
        duration: 0,
      },
    },
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider 1: Carousel with zoom animation */}
      {currentSlide === 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
          }}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={currentImageIndex}
              variants={imageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${carouselImages[currentImageIndex]})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#000',
              }}
            />
          </AnimatePresence>

          {/* Dark overlay for Slider 1 */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%)',
              zIndex: 2,
            }}
          />
        </div>
      )}

      {/* Slider 2: Solid dark blue background */}
      {currentSlide === 1 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#001F4D',
            zIndex: 1,
          }}
        />
      )}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        onTouchStart={(e) => {
          e.stopPropagation();
          e.target.style.background = 'rgba(255, 255, 255, 0.4)';
        }}
        onTouchEnd={(e) => {
          e.stopPropagation();
          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
        }}
        style={{
          position: 'absolute',
          left: 'clamp(10px, 3vw, 40px)',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          borderRadius: '50%',
          width: 'clamp(40px, 10vw, 60px)',
          height: 'clamp(40px, 10vw, 60px)',
          color: 'white',
          fontSize: 'clamp(20px, 5vw, 28px)',
          cursor: 'pointer',
          zIndex: 20,
          transition: 'all 0.3s ease',
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitTapHighlightColor: 'transparent',
        }}
        onMouseEnter={(e) => (e.target.style.background = 'rgba(255, 255, 255, 0.3)')}
        onMouseLeave={(e) => (e.target.style.background = 'rgba(255, 255, 255, 0.2)')}
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        onTouchStart={(e) => {
          e.stopPropagation();
          e.target.style.background = 'rgba(255, 255, 255, 0.4)';
        }}
        onTouchEnd={(e) => {
          e.stopPropagation();
          e.target.style.background = 'rgba(255, 255, 255, 0.2)';
        }}
        style={{
          position: 'absolute',
          right: 'clamp(10px, 3vw, 40px)',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          borderRadius: '50%',
          width: 'clamp(40px, 10vw, 60px)',
          height: 'clamp(40px, 10vw, 60px)',
          color: 'white',
          fontSize: 'clamp(20px, 5vw, 28px)',
          cursor: 'pointer',
          zIndex: 20,
          transition: 'all 0.3s ease',
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitTapHighlightColor: 'transparent',
        }}
        onMouseEnter={(e) => (e.target.style.background = 'rgba(255, 255, 255, 0.3)')}
        onMouseLeave={(e) => (e.target.style.background = 'rgba(255, 255, 255, 0.2)')}
      >
        ›
      </button>

      {/* Pagination Dots */}
      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '12px',
          zIndex: 20,
        }}
      >
        {[0, 1].map((index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: currentSlide === index ? '40px' : '12px',
              height: '12px',
              borderRadius: '6px',
              border: 'none',
              background: currentSlide === index ? '#F4D233' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
