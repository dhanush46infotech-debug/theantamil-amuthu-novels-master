import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedBook = ({ type, position }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [animationPhase, setAnimationPhase] = useState('closed');

  const romanticPages = [
    { title: "Love's First Whisper", content: "In the gentle breeze of spring, two hearts found their rhythm. Sarah walked through the garden, her heart beating faster as she saw him waiting by the old oak tree..." },
    { title: "Chapter 1: The Meeting", content: "Their eyes met across the crowded café. Time seemed to stop as Emma felt her world shift. The stranger with kind eyes smiled, and she knew her life would never be the same..." },
    { title: "Chapter 2: First Words", content: "\"I believe we've met before,\" he said softly. \"In my dreams,\" she whispered back. The conversation flowed like a gentle stream, carrying away all her fears and doubts..." },
    { title: "Chapter 3: Growing Close", content: "Days turned into weeks of stolen glances and shared laughter. Every moment together felt like a precious gift, wrapped in the golden light of new love..." },
    { title: "Chapter 4: True Love", content: "Under the starlit sky, he took her hand. \"You are my everything,\" he whispered. In that moment, she knew that love wasn't just a feeling—it was coming home..." }
  ];

  const crimePages = [
    { title: "Murder Mystery", content: "A scream pierced the dark night. Detective Raj rushed towards the house. There lay a body. Who was this killer?" },
    { title: "Chapter 1: The Clue", content: "The only clue at the crime scene - a red rose. Raj pondered. What does this signify? Is it the killer's signature?" },
    { title: "Chapter 2: Suspicion", content: "Three suspects. Each with a motive. But who is the real killer? Raj began his deep investigation..." },
    { title: "Chapter 3: The Twist", content: "Suddenly, new information emerged. The victim's secret life was revealed. This mystery runs even deeper..." },
    { title: "Chapter 4: Truth", content: "Finally, the truth came out. The killer was someone no one expected. Raj stood in shock. How was this possible?" }
  ];

  const pages = type === 'romantic' ? romanticPages : crimePages;
  const bookTitle = type === 'romantic' ? 'Romantic Novels' : 'Crime-Thriller Novels';
  const coverGradient = 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)';

  // Automatic animation loop
  useEffect(() => {
    const startAnimation = () => {
      setTimeout(() => {
        setAnimationPhase('opening');
        setIsOpen(true);
        
        setTimeout(() => {
          setAnimationPhase('reading');
          
          const pageInterval = setInterval(() => {
            setCurrentPage(prev => {
              if (prev < pages.length - 1) {
                return prev + 1;
              } else {
                clearInterval(pageInterval);
                setTimeout(() => {
                  setAnimationPhase('closing');
                  setIsOpen(false);
                  setCurrentPage(0);
                  
                  setTimeout(() => {
                    setAnimationPhase('closed');
                    startAnimation();
                  }, 2000);
                }, 1000);
                return prev;
              }
            });
          }, 2000);
        }, 1000);
      }, 2000);
    };

    startAnimation();
  }, [pages.length]);

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
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 0 }}
            whileHover={{ scale: 1.05, rotateY: -5 }}
            style={{
              width: '120px',
              height: '160px',
              background: 'linear-gradient(135deg, #8B4513 0%, #654321 50%, #8B4513 100%)',
              borderRadius: '6px 8px 8px 6px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,215,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFD700',
              fontFamily: 'serif',
              position: 'relative',
              transformStyle: 'preserve-3d',
              border: '3px solid #8B4513'
            }}
          >
            {/* Book Spine */}
            <div style={{
              position: 'absolute',
              left: '-10px',
              top: '0',
              width: '10px',
              height: '100%',
              background: 'linear-gradient(180deg, #654321 0%, #3E2723 100%)',
              borderRadius: '4px 0 0 4px',
              boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.3)'
            }} />
            
            {/* Ornate Golden Border */}
            <div style={{
              position: 'absolute',
              inset: '8px',
              border: '1px solid #FFD700',
              borderRadius: '3px',
              pointerEvents: 'none',
              boxShadow: 'inset 0 0 5px rgba(255,215,0,0.3)'
            }} />
            
            {/* Corner Decorations */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              width: '8px',
              height: '8px',
              border: '1px solid #FFD700',
              borderRight: 'none',
              borderBottom: 'none',
              borderRadius: '2px 0 0 0'
            }} />
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '8px',
              height: '8px',
              border: '1px solid #FFD700',
              borderLeft: 'none',
              borderBottom: 'none',
              borderRadius: '0 2px 0 0'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              width: '8px',
              height: '8px',
              border: '1px solid #FFD700',
              borderRight: 'none',
              borderTop: 'none',
              borderRadius: '0 0 0 2px'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              width: '8px',
              height: '8px',
              border: '1px solid #FFD700',
              borderLeft: 'none',
              borderTop: 'none',
              borderRadius: '0 0 2px 0'
            }} />
            
            {/* Central Ornate Design */}
            <div style={{
              width: '30px',
              height: '30px',
              border: '1px solid #FFD700',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '5px',
              background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)',
              boxShadow: 'inset 0 0 5px rgba(255,215,0,0.3)'
            }}>
              <div style={{
                width: '18px',
                height: '18px',
                border: '1px solid #FFD700',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                textShadow: '0 0 4px #FFD700'
              }}>
                ✦
              </div>
            </div>
            
            {/* Book Title */}
            <h3 style={{
              fontSize: '8px',
              fontWeight: 'bold',
              textAlign: 'center',
              margin: '0',
              textShadow: '0 0 3px #FFD700, 0 1px 1px rgba(0,0,0,0.8)',
              padding: '0 5px',
              letterSpacing: '0.3px',
              lineHeight: '1.1'
            }}>
              {bookTitle}
            </h3>
            
            {/* Decorative Lines */}
            <div style={{
              width: '50px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, #FFD700 50%, transparent 100%)',
              marginTop: '3px',
              boxShadow: '0 0 2px #FFD700'
            }} />
            
            {/* Vintage Texture Overlay */}
            <div style={{
              position: 'absolute',
              inset: '0',
              background: 'radial-gradient(circle at 30% 20%, rgba(255,215,0,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.1) 0%, transparent 50%)',
              borderRadius: '6px 8px 8px 6px',
              pointerEvents: 'none'
            }} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            style={{
              width: '240px',
              height: '160px',
              background: '#FFF',
              borderRadius: '8px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
              display: 'flex',
              position: 'relative',
              transformStyle: 'preserve-3d'
            }}
          >
            <div style={{
              width: '50%',
              padding: '10px',
              borderRight: '1px solid #ddd',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h4 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                {pages[currentPage]?.title}
              </h4>
              <p style={{ fontSize: '9px', lineHeight: '1.4', color: '#555', flex: 1 }}>
                {pages[currentPage]?.content}
              </p>
              <div style={{ fontSize: '8px', color: '#999', textAlign: 'center' }}>
                Page {currentPage + 1}
              </div>
            </div>

            <div style={{
              width: '50%',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {currentPage < pages.length - 1 ? (
                <>
                  <h4 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                    {pages[currentPage + 1]?.title}
                  </h4>
                  <p style={{ fontSize: '9px', lineHeight: '1.4', color: '#555', flex: 1 }}>
                    {pages[currentPage + 1]?.content.substring(0, 150)}...
                  </p>
                  <div style={{ fontSize: '8px', color: '#999', textAlign: 'center' }}>
                    Page {currentPage + 2}
                  </div>
                </>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>
                  <p style={{ fontSize: '10px' }}>The End</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedBook;