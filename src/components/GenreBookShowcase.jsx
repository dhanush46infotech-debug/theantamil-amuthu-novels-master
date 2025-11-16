import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import crimeImage from '../assets/Crime.png';
import romanticImage from '../assets/Romantic.png';
import fantasyImage from '../assets/Fantasy.png';
import horrorImage from '../assets/Horror.png';

const GenreBookShowcase = () => {
  const [activeGenre, setActiveGenre] = useState(0);

  // Genre configuration - Images used for both book cover objects and background
  const genres = [
    {
      name: 'Crime-Thriller',
      tamilName: 'குற்ற திரில்லர்',
      image: crimeImage, // Objects shown in book, background in BG
      accentColor: '#ff0000',
      shadowColor: 'rgba(255, 0, 0, 0.5)',
    },
    {
      name: 'Romantic',
      tamilName: 'காதல் கதைகள்',
      image: romanticImage,
      accentColor: '#ff69b4',
      shadowColor: 'rgba(255, 105, 180, 0.5)',
    },
    {
      name: 'Fantasy',
      tamilName: 'கற்பனை கதைகள்',
      image: fantasyImage,
      accentColor: '#9933ff',
      shadowColor: 'rgba(153, 51, 255, 0.5)',
    },
    {
      name: 'Horror',
      tamilName: 'திகில் கதைகள்',
      image: horrorImage,
      accentColor: '#00ff00',
      shadowColor: 'rgba(0, 255, 0, 0.5)',
    },
  ];

  // Auto-cycle through genres every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGenre((prev) => (prev + 1) % genres.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentGenre = genres[activeGenre];

  // Background zoom animation (only background zooms)
  const backgroundVariants = {
    initial: {
      scale: 1,
      opacity: 0,
    },
    enter: {
      scale: [1, 1.3, 1.1], // Zoom in and settle
      opacity: [0, 0.8, 0.6], // Increased opacity for visibility
      transition: {
        duration: 4,
        times: [0, 0.5, 1],
        ease: 'easeInOut',
      },
    },
    exit: {
      scale: 1,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: 'easeIn',
      },
    },
  };

  // Book stays constant (no zoom, just fade in/out)
  const bookVariants = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Layer - ONLY background part of image, ZOOMING */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${activeGenre}`}
          variants={backgroundVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          style={{
            position: 'absolute',
            inset: '-20%',
            backgroundImage: `url(${currentGenre.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(15px) brightness(0.7)', // Blur background, darken it
            zIndex: 1,
          }}
        />
      </AnimatePresence>

      {/* Dark overlay for better contrast */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.2)', // Reduced from 0.5 to 0.2 for more visibility
          zIndex: 2,
        }}
      />

      {/* Book Container - NO ZOOM, stays constant */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(20px, 4vw, 40px)',
        }}
      >
        {/* Book with object/character image - NO ZOOM */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`book-${activeGenre}`}
            variants={bookVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            style={{
              position: 'relative',
            }}
          >
            {/* Book Cover showing objects/characters from image */}
            <div
              style={{
                width: 'clamp(200px, 40vw, 350px)',
                height: 'clamp(280px, 56vw, 490px)',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: `
                  0 20px 60px ${currentGenre.shadowColor},
                  0 0 40px ${currentGenre.shadowColor},
                  inset 0 0 20px rgba(0, 0, 0, 0.5)
                `,
                border: `2px solid ${currentGenre.accentColor}`,
                position: 'relative',
              }}
            >
              {/* Image showing objects/characters */}
              <img
                src={currentGenre.image}
                alt={`${currentGenre.name} Book Cover`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Shine effect overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(
                    135deg,
                    transparent 0%,
                    rgba(255, 255, 255, 0.1) 50%,
                    transparent 100%
                  )`,
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* 3D Book Spine Effect */}
            <div
              style={{
                position: 'absolute',
                left: '-8px',
                top: '0',
                width: '8px',
                height: '100%',
                background: `linear-gradient(90deg,
                  rgba(0, 0, 0, 0.5) 0%,
                  rgba(0, 0, 0, 0.3) 50%,
                  rgba(0, 0, 0, 0.5) 100%
                )`,
                transform: 'rotateY(-90deg)',
                transformOrigin: 'right',
                borderRadius: '2px 0 0 2px',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Genre Label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`label-${activeGenre}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            style={{
              textAlign: 'center',
              color: 'white',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(24px, 5vw, 42px)',
                fontWeight: '700',
                margin: '0 0 8px 0',
                color: currentGenre.accentColor,
                textShadow: `
                  0 0 20px ${currentGenre.shadowColor},
                  0 2px 10px rgba(0, 0, 0, 0.8)
                `,
                letterSpacing: '1px',
              }}
            >
              {currentGenre.name}
            </h2>
            <p
              style={{
                fontSize: 'clamp(18px, 3.5vw, 28px)',
                fontWeight: '500',
                margin: 0,
                color: '#ffffff',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
              }}
            >
              {currentGenre.tamilName}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicator Dots */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '20px',
          }}
        >
          {genres.map((genre, index) => (
            <div
              key={index}
              style={{
                width: activeGenre === index ? '40px' : '12px',
                height: '12px',
                borderRadius: '6px',
                background:
                  activeGenre === index
                    ? currentGenre.accentColor
                    : 'rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease',
                boxShadow:
                  activeGenre === index
                    ? `0 0 15px ${currentGenre.shadowColor}`
                    : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenreBookShowcase;
