import React, { useState, useEffect } from 'react';
import BackgroundVowels from './BackgroundVowels';
import AnimatedBook from './AnimatedBook';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const authors = [
    {
      name: 'Swetha swe',
      image: '🌸',
      link: 'https://tamil.pratilipi.com/user/%F0%9F%92%99swetha%F0%9F%92%99-8cuvz20w13'
    },
    {
      name: 'Thenmozhi',
      image: '📚',
      link: 'https://tamil.pratilipi.com/user/%E2%9C%8D%EF%B8%8F%E0%AE%A4%E0%AF%87%E0%AE%A9%E0%AF%8D%E0%AE%AE%E0%AF%8A%E0%AE%B4%E0%AE%BF-%E2%9C%8D%EF%B8%8F-34-thenmozhi-34-u0958h9i3f?utm_campaign=authorprofile_share&utm_source=ios'
    },
    {
      name: 'Mohanaamozhi',
      image: '✨',
      link: 'https://tamil.pratilipi.com/user/%E2%9C%8D%EF%B8%8F-%E0%AE%AE%E0%AF%8B%E0%AE%95%E0%AE%A9%E0%AE%BE-%E2%9C%8D%EF%B8%8F-697n99g2nt'
    }
  ];

  const socialLinks = [
    { name: 'Gmail', icon: '✉️', url: 'mailto:thentamizhamuzhunovels@gmail.com' },
    { name: 'Facebook', icon: '👥', url: 'https://www.facebook.com/share/g/1FKze6xJV1/' },
    { name: 'Instagram', icon: '📷', url: 'https://instagram.com/' },
    { name: 'WhatsApp', icon: '💬', url: 'https://whatsapp.com/channel/0029VbB0Wxt65yDK3ZTYCC1D' },
    { name: 'YouTube - Thenmozhi', icon: '📺', url: 'https://www.youtube.com/@thenthuzhinovels' },
    { name: 'YouTube - Mohanaamozhi', icon: '🎬', url: 'https://www.youtube.com/@mohanaamozhi_novels' },
    { name: 'YouTube - Swetha', icon: '🎥', url: 'https://youtube.com/@swethaa_swe?si=GqKD38Gj9YAa6mhw' }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % 3);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + 3) % 3);
  const goToSlide = (index) => setCurrentSlide(index);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderSlide = () => {
    switch (currentSlide) {
      case 0:
        return (
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '32px', filter: 'drop-shadow(0 0 8px #FF4D79)' }}>❤️</span>
                <span style={{ fontSize: '32px', filter: 'drop-shadow(0 0 8px #FF4D79)' }}>❤️</span>
                <span style={{ fontSize: '32px', filter: 'drop-shadow(0 0 8px #FF4D79)' }}>❤️</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', margin: 0, fontWeight: '600', color: '#FFFFFF', textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', lineHeight: '1.3' }}>தேன்தமிழமுது தேடிப்படி</h1>
                <h2 style={{ fontSize: 'clamp(18px, 3vw, 26px)', margin: '6px 0', fontWeight: '400', color: '#E0E0E0', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)', lineHeight: '1.4' }}>அள்ளி அள்ளி பருக ஆசை பெருகுமே!</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '32px', filter: 'drop-shadow(0 0 8px #FF4D79)' }}>❤️</span>
                <span style={{ fontSize: '32px', filter: 'drop-shadow(0 0 8px #FF4D79)' }}>❤️</span>
                <span style={{ fontSize: '32px', filter: 'drop-shadow(0 0 8px #FF4D79)' }}>❤️</span>
              </div>
            </div>
            <h1 style={{ fontSize: 'clamp(36px, 8vw, 64px)', color: '#F4D233', fontWeight: '700', fontFamily: 'Georgia, serif', textShadow: '0 2px 8px rgba(244, 210, 51, 0.4)', margin: '20px 0', letterSpacing: '1px' }}>Welcome</h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', fontStyle: 'italic', opacity: 0.9, color: '#FFFFFF', textShadow: '0 1px 3px rgba(0,0,0,0.3)', margin: '0', letterSpacing: '0.3px' }}>Countless words to find in endless worlds.</p>
          </div>
        );
      case 1:
        return (
          <div style={{ textAlign: 'center', color: 'white' }}>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', marginBottom: '30px', color: '#F4D233' }}>Follow us on Pratilipi for more stories!</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(15px, 5vw, 40px)', flexWrap: 'wrap' }}>
              {authors.map((author, index) => (
                <a key={index} href={author.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                    <div style={{ width: 'clamp(80px, 15vw, 120px)', height: 'clamp(80px, 15vw, 120px)', borderRadius: '50%', background: 'linear-gradient(135deg, #FF69B4, #FF1493)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(40px, 8vw, 60px)', boxShadow: '0 8px 20px rgba(255, 105, 180, 0.4)' }}>
                      {author.image}
                    </div>
                    <h3 style={{ fontSize: 'clamp(14px, 3vw, 18px)', fontWeight: '600', margin: 0 }}>{author.name}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div style={{ textAlign: 'center', color: 'white' }}>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', marginBottom: '10px', color: '#F4D233' }}>Let's build a world together!</h2>
            <p style={{ fontSize: 'clamp(18px, 3vw, 24px)', marginBottom: '30px', opacity: 0.9 }}>Join our community</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(150px, 40vw, 200px), 1fr))', gap: 'clamp(10px, 3vw, 20px)', maxWidth: '800px', margin: '0 auto' }}>
              {socialLinks.map((social, index) => (
                <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white', padding: 'clamp(8px, 2vw, 15px)', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.2)', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: 'clamp(6px, 2vw, 12px)' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <span style={{ fontSize: 'clamp(18px, 4vw, 24px)' }}>{social.icon}</span>
                  <span style={{ fontSize: 'clamp(12px, 3vw, 16px)', fontWeight: '500' }}>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight: '60vh', width: '100vw', background: 'linear-gradient(135deg, #1a0033 0%, #000000 100%)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 'clamp(15px, 4vw, 30px) clamp(10px, 3vw, 20px)' }} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <BackgroundVowels />
      
      {/* Animated Books - Only on first slide */}
      {currentSlide === 0 && (
        <>
          <AnimatedBook type="romantic" position="left" />
          <AnimatedBook type="crime" position="right" />
        </>
      )}
      
      <div style={{ zIndex: 10, position: 'relative', width: '100%', maxWidth: '1200px' }}>
        {renderSlide()}
      </div>
      
      {/* Navigation Arrows - Enhanced Touch Support */}
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
          left: 'clamp(10px, 5vw, 60px)', 
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
          WebkitTapHighlightColor: 'transparent'
        }} 
        onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'} 
        onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
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
          right: 'clamp(10px, 5vw, 60px)', 
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
          WebkitTapHighlightColor: 'transparent'
        }} 
        onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'} 
        onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
      >
        ›
      </button>
      
      {/* Pagination Dots */}
      <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '12px', zIndex: 20 }}>
        {[0, 1, 2].map((index) => (
          <button key={index} onClick={() => goToSlide(index)} style={{ width: currentSlide === index ? '40px' : '12px', height: '12px', borderRadius: '6px', border: 'none', background: currentSlide === index ? '#F4D233' : 'rgba(255, 255, 255, 0.5)', cursor: 'pointer', transition: 'all 0.3s ease' }} />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;