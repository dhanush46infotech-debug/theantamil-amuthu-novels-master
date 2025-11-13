import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedBook = ({ type, position }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const romanticPages = [
    { title: "Love's First Whisper", content: "In the gentle breeze of spring, two hearts found their rhythm. Sarah walked through the garden, her heart beating faster as she saw him waiting by the old oak tree..." },
    { title: "Chapter 1: The Meeting", content: "Their eyes met across the crowded café. Time seemed to stop as Emma felt her world shift. The stranger with kind eyes smiled, and she knew her life would never be the same..." },
    { title: "Chapter 2: First Words", content: "\"I believe we've met before,\" he said softly. \"In my dreams,\" she whispered back. The conversation flowed like a gentle stream, carrying away all her fears and doubts..." },
    { title: "Chapter 3: Growing Close", content: "Days turned into weeks of stolen glances and shared laughter. Every moment together felt like a precious gift, wrapped in the golden light of new love..." },
    { title: "Chapter 4: True Love", content: "Under the starlit sky, he took her hand. \"You are my everything,\" he whispered. In that moment, she knew that love wasn't just a feeling—it was coming home..." }
  ];

  const crimePages = [
    { title: "கொலை மர்மம்", content: "இருண்ட இரவில் ஒரு கூக்குரல். துப்பறியும் ராஜ் அந்த வீட்டை நோக்கி ஓடினார். அங்கே கிடந்தது ஒரு உடல். யார் இந்த கொலையாளி?" },
    { title: "அத்தியாயம் 1: சூத்திரம்", content: "குற்றம் நடந்த இடத்தில் கிடைத்த ஒரே சூத்திரம் - ஒரு சிவப்பு ரோஜா. ராஜ் யோசித்தார். இது எதைக் குறிக்கிறது? கொலையாளியின் அடையாளமா?" },
    { title: "அத்தியாயம் 2: சந்தேகம்", content: "மூன்று சந்தேக நபர்கள். ஒவ்வொருவருக்கும் ஒரு காரணம். ஆனால் உண்மையான கொலையாளி யார்? ராஜ் ஆழமாக விசாரிக்க ஆரம்பித்தார்..." },
    { title: "அத்தியாயம் 3: திருப்பம்", content: "திடீரென்று கிடைத்த புதிய தகவல். பாதிக்கப்பட்டவரின் இரகசிய வாழ்க்கை வெளிவந்தது. இந்த மர்மம் இன்னும் ஆழமானது..." },
    { title: "அத்தியாயம் 4: உண்மை", content: "இறுதியாக உண்மை வெளிவந்தது. கொலையாளி யாரும் எதிர்பாராத நபர். ராஜ் அதிர்ச்சியில் நின்றார். இது எப்படி சாத்தியம்?" }
  ];

  const pages = type === 'romantic' ? romanticPages : crimePages;
  const bookTitle = type === 'romantic' ? 'Romantic Hearts' : 'கொலை மர்மம்';
  const coverColor = type === 'romantic' ? '#FF69B4' : '#CC0000';
  const coverIcon = type === 'romantic' ? '🌹' : '🔪';

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setIsOpen(false);
      setCurrentPage(0);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const bookStyle = {
    position: 'absolute',
    [position]: '3cm',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 15,
    cursor: 'pointer'
  };

  return (
    <div style={bookStyle}>
      <AnimatePresence>
        {!isOpen ? (
          // Closed Book
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 0 }}
            whileHover={{ scale: 1.05, rotateY: -5 }}
            onClick={() => setIsOpen(true)}
            style={{
              width: '180px',
              height: '240px',
              background: type === 'romantic' 
                ? `linear-gradient(135deg, ${coverColor} 0%, #FF1493 100%)`
                : `linear-gradient(135deg, ${coverColor} 0%, #8B0000 100%)`,
              borderRadius: '8px 12px 12px 8px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontFamily: 'Georgia, serif',
              position: 'relative',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Book Spine */}
            <div style={{
              position: 'absolute',
              left: '-8px',
              top: '0',
              width: '8px',
              height: '100%',
              background: `linear-gradient(180deg, ${coverColor} 0%, #B22222 100%)`,
              borderRadius: '4px 0 0 4px'
            }} />
            
            {/* Cover Icon */}
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>{coverIcon}</div>
            
            {/* Title */}
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              textAlign: 'center',
              margin: '0',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              padding: '0 20px'
            }}>
              {bookTitle}
            </h3>
            
            {/* Decorative Border */}
            <div style={{
              position: 'absolute',
              inset: '10px',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '4px',
              pointerEvents: 'none'
            }} />
          </motion.div>
        ) : (
          // Open Book
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            style={{
              width: '400px',
              height: '300px',
              background: '#FFF',
              borderRadius: '8px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
              display: 'flex',
              position: 'relative',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Left Page */}
            <div style={{
              width: '50%',
              padding: '20px',
              borderRight: '1px solid #ddd',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>
                {pages[currentPage]?.title}
              </h4>
              <p style={{ fontSize: '12px', lineHeight: '1.6', color: '#555', flex: 1 }}>
                {pages[currentPage]?.content}
              </p>
              <div style={{ fontSize: '10px', color: '#999', textAlign: 'center' }}>
                Page {currentPage + 1}
              </div>
            </div>

            {/* Right Page */}
            <div style={{
              width: '50%',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {currentPage < pages.length - 1 ? (
                <>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>
                    {pages[currentPage + 1]?.title}
                  </h4>
                  <p style={{ fontSize: '12px', lineHeight: '1.6', color: '#555', flex: 1 }}>
                    {pages[currentPage + 1]?.content.substring(0, 200)}...
                  </p>
                  <div style={{ fontSize: '10px', color: '#999', textAlign: 'center' }}>
                    Page {currentPage + 2}
                  </div>
                </>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>
                  <p>The End</p>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              style={{
                position: 'absolute',
                left: '10px',
                bottom: '10px',
                background: currentPage === 0 ? '#ccc' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '5px 10px',
                fontSize: '12px',
                cursor: currentPage === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              ← Prev
            </button>

            <button
              onClick={nextPage}
              style={{
                position: 'absolute',
                right: '10px',
                bottom: '10px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '5px 10px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              {currentPage >= pages.length - 2 ? 'Close' : 'Next →'}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                setIsOpen(false);
                setCurrentPage(0);
              }}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedBook;