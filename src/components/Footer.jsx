import { useState } from 'react';
import gmailLogo from '../assets/gmail-logo.png';
import facebookLogo from '../assets/facebook-logo.png';
import instagramLogo from '../assets/instagram-logo.png';
import youtubeLogo from '../assets/youtube-logo.png';

const Footer = () => {
  const [showYouTubeModal, setShowYouTubeModal] = useState(false);

  const handleYouTubeClick = (e) => {
    e.preventDefault();
    setShowYouTubeModal(true);
  };

  const youtubeChannels = [
    {
      name: 'YouTube(Thenmozhi)',
      url: 'https://www.youtube.com/@thenthuzhinovels'
    },
    {
      name: 'YouTube(MohanaMozhi)',
      url: 'https://www.youtube.com/@mohanaamozhi_novels'
    },
    {
      name: 'YouTube(Swetha swe)',
      url: 'https://youtube.com/@swethaa_swe?si=GqKD38Gj9YAa6mhw'
    }
  ];

  return (
    <footer style={{
      background: 'linear-gradient(135deg, rgba(10, 42, 67, 0.95) 0%, rgba(15, 60, 87, 0.98) 100%)',
      borderTop: '1px solid rgba(255, 215, 0, 0.2)',
      color: '#FFFFFF',
      padding: '40px 40px 30px',
      marginTop: '0'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Follow Us - Centered */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '30px'
        }}>
          <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#FFD700' }}>Follow Us</h3>
          <div style={{ display: 'flex', gap: '1.5cm', alignItems: 'center' }}>
            <a href="mailto:thentamizhamuzhunovels@gmail.com" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              opacity: 0.9
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}>
              <img src={gmailLogo} alt="Gmail" style={{ width: '40px', height: '40px' }} />
            </a>

            <a href="https://www.facebook.com/share/g/1FKze6xJV1/" target="_blank" rel="noopener noreferrer" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              opacity: 0.9
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}>
              <img src={facebookLogo} alt="Facebook" style={{ width: '40px', height: '40px' }} />
            </a>

            <a href="https://www.instagram.com/thentamizhamuzhunovels?igsh=MTVmZ3p6dTlzZDEzeA" target="_blank" rel="noopener noreferrer" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              opacity: 0.9
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}>
              <img src={instagramLogo} alt="Instagram" style={{ width: '40px', height: '40px' }} />
            </a>

            <a href="#" onClick={handleYouTubeClick} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              opacity: 0.9,
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}>
              <img src={youtubeLogo} alt="YouTube" style={{ width: '40px', height: '40px' }} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.2)',
          paddingTop: '20px',
          textAlign: 'center',
          fontSize: '14px',
          opacity: 0.8
        }}>
          © 2025 தேன்தமிழமுது. All rights reserved.
        </div>
      </div>

      {/* YouTube Modal */}
      {showYouTubeModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setShowYouTubeModal(false)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '30px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{ color: '#0a2a43', margin: 0, fontSize: '24px' }}>YouTube Channels</h2>
              <button
                onClick={() => setShowYouTubeModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '28px',
                  cursor: 'pointer',
                  color: '#666',
                  padding: 0,
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {youtubeChannels.map((channel, index) => (
                <a
                  key={index}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    padding: '15px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: '#0a2a43',
                    transition: 'all 0.3s ease',
                    border: '2px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e8f4f8';
                    e.currentTarget.style.borderColor = '#1e90ff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  <img src={youtubeLogo} alt="YouTube" style={{ width: '40px', height: '40px' }} />
                  <span style={{ fontSize: '16px', fontWeight: '500' }}>{channel.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;