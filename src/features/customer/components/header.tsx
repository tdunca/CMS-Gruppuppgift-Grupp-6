import { useState } from 'react';
import Style from './header.module.css';
import { searchHouse } from '../../firebase/home';

function Header() {
  const [search, setSearch] = useState('');
  const handleSearch = async () => {
    const result = await searchHouse(search);
    console.log(result);
  };

  return (
    <header className={Style.header}>
      <div className={Style.logo}>
        <img
          src="../src/Assests/headerLogo.png"
          alt="Svensk Fastighetsförmedling"
        />
      </div>
      <div className={Style.buttonContainer}>
        <input
          className={Style.label}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Sök hus här!"
          type="text"
        />
        <button className={Style.button} onClick={handleSearch}>
          Sök
        </button>
      </div>
    </header>
  );
}

export default Header;
