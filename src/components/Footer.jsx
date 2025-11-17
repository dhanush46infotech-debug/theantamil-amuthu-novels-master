const Footer = () => {
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
          <div style={{ display: 'flex', gap: '15px' }}>
            <a href="#" style={{
              width: '40px', height: '40px', borderRadius: '50%',
              border: '2px solid white', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'white', textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}>
              📺
            </a>
            <a href="#" style={{
              width: '40px', height: '40px', borderRadius: '50%',
              border: '2px solid white', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'white', textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}>
              📷
            </a>
            <a href="#" style={{
              width: '40px', height: '40px', borderRadius: '50%',
              border: '2px solid white', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'white', textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}>
              💬
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
    </footer>
  );
};

export default Footer;