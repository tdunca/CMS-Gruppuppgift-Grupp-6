import Style from './header.module.css';

function Header() {
  return (
    <header className={Style.header}>
      <div className={Style.logo}>
        <img
          src="../src/Assests/headerLogo.png"
          alt="Svensk Fastighetsförmedling"
        />
      </div>
      <div className={Style.buttonContainer}>
        <input className={Style.label} placeholder="Sök hus här!" type="text" />
        <button className={Style.button}>Sök</button>
      </div>
    </header>
  );
}

export default Header;
