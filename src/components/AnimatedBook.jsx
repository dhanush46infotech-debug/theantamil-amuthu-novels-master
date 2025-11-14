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
                }, 1500);
                return prev;
              }
            });
          }, 2000);
        }, 1000);
      }, 3000);
    };

    startAnimation();
  }, [pages.length]);

  const bookStyle = {
    position: 'absolute',
    [position]: 'clamp(10px, 8vw, 3cm)',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 15,
    cursor: 'pointer',
    '@media (max-width: 768px)': {
      display: 'none'
    }
  };

  return (
    <div style={bookStyle}>
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 0 }}
            whileHover={{ scale: 1.02, rotateY: -2 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              width: '150px',
              height: '200px',
              background: 'linear-gradient(135deg, #DAA520 0%, #FFD700 20%, #B8860B 40%, #FFD700 60%, #DAA520 80%, #FFD700 100%)',
              borderRadius: '6px 8px 8px 6px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.5), inset 0 3px 0 rgba(255,255,255,0.6), inset 0 -2px 0 rgba(184,134,11,0.8), 0 0 25px rgba(218,165,32,0.8)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontFamily: 'serif',
              position: 'relative',
              transformStyle: 'preserve-3d',
              border: '3px solid #B8860B',
              overflow: 'hidden'
            }}
          >
            {/* Book Spine */}
            <div style={{
              position: 'absolute',
              left: '-10px',
              top: '0',
              width: '10px',
              height: '100%',
              background: 'linear-gradient(180deg, #DAA520 0%, #B8860B 30%, #FFD700 50%, #B8860B 70%, #DAA520 100%)',
              borderRadius: '4px 0 0 4px',
              boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.3), 0 0 10px rgba(255,215,0,0.5)'
            }} />
            
            {/* Ornate Golden Border */}
            <div style={{
              position: 'absolute',
              inset: '8px',
              border: '2px solid #DAA520',
              borderRadius: '3px',
              pointerEvents: 'none',
              boxShadow: 'inset 0 0 8px rgba(218,165,32,0.5), inset 0 2px 0 rgba(255,255,255,0.4)'
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
              width: '40px',
              height: '40px',
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
                width: '24px',
                height: '24px',
                border: '2px solid #FFFFFF',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                background: 'radial-gradient(circle, #FFFFFF 0%, rgba(255,255,255,0.8) 100%)',
                boxShadow: 'inset 0 0 8px rgba(218,165,32,0.6)'
              }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Necklace Chain */}
                  <div style={{
                    position: 'absolute',
                    width: '12px',
                    height: '2px',
                    background: '#DAA520',
                    borderRadius: '1px',
                    top: '2px'
                  }} />
                  {/* Pendant */}
                  <div style={{
                    width: '6px',
                    height: '8px',
                    background: 'linear-gradient(45deg, #FFD700, #DAA520)',
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    border: '0.5px solid #B8860B',
                    marginTop: '4px'
                  }} />
                  {/* Small gems */}
                  <div style={{
                    position: 'absolute',
                    width: '2px',
                    height: '2px',
                    background: '#FFFFFF',
                    borderRadius: '50%',
                    top: '8px',
                    left: '7px',
                    boxShadow: '0 0 2px rgba(255,255,255,0.8)'
                  }} />
                </div>
              </div>
            </div>
            
            {/* Book Title */}
            <h3 style={{
              fontSize: '12px',
              fontWeight: 'bold',
              textAlign: 'center',
              margin: '0',
              textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 6px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.7), 1px 1px 0 rgba(0,0,0,1)',
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
            
            {/* Corner Shiny Effects */}
            <div style={{
              position: 'absolute',
              top: '5px',
              left: '5px',
              width: '30px',
              height: '30px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              width: '20px',
              height: '20px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '5px',
              right: '5px',
              width: '25px',
              height: '25px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
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
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              <h4 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                {pages[currentPage]?.title}
              </h4>
              <p style={{ fontSize: '9px', lineHeight: '1.4', color: '#555', flex: 1, overflow: 'hidden', wordWrap: 'break-word' }}>
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
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              {currentPage < pages.length - 1 ? (
                <>
                  <h4 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                    {pages[currentPage + 1]?.title}
                  </h4>
                  <p style={{ fontSize: '9px', lineHeight: '1.4', color: '#555', flex: 1, overflow: 'hidden', wordWrap: 'break-word' }}>
                    {pages[currentPage + 1]?.content.substring(0, 120)}...
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