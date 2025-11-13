const Footer = () => {
  return (
    <footer style={{
      background: '#0A2230',
      borderTop: '1px solid #1B3B55',
      color: '#FFFFFF',
      padding: '50px 40px 30px',
      marginTop: '0'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '30px' }}>
          
          {/* About Section */}
          <div>
            <h3 style={{ fontSize: '22px', marginBottom: '8px', fontWeight: 'bold', lineHeight: '1.3' }}>
              தேன்தமிழமுது தேடிப்படி ....
            </h3>
            <h4 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: 'bold', lineHeight: '1.3' }}>
              அள்ளி அள்ளி பருக ஆசை பெருகுமே!!...
            </h4>
            <p style={{ fontSize: '15px', lineHeight: '1.5', opacity: 0.85 }}>
              Discover countless Tamil novels and stories.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: '18px', marginBottom: '15px', color: '#FFD700' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Home</a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>About Us</a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Contact</a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
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