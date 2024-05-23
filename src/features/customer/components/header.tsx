import Style from './header.module.css';

function Header() {
  return (
    <header className={Style.header}>
      <div className={Style.container}>
        <div className={Style.logo}>
          <img
            src="../src/Assests/logo.png"
            alt="Svensk Fastighetsförmedling"
          />
        </div>
        <div className={Style.buttonContainer}>
          <button className={Style.button}>Sök Bostad</button>
          <button className={Style.button}>Sök Mäklare</button>
          <button className={Style.button}>Nyproduktion</button>
          <button className={Style.button}>Fri Värdering</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
