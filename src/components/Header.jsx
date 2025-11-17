import Logo from '../assets/TTM NOVRLS.png';

const Header = () => {
  return (
    <header
      style={{
        position: 'fixed',
        top: '20px',
        left: '30px',
        zIndex: 1000,
      }}
    >
      <img
        src={Logo}
        alt="TTM Novels Logo"
        style={{
          height: 'clamp(100px, 15vw, 150px)',
          width: 'auto',
          filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5))',
        }}
      />
    </header>
  );
};

export default Header;
