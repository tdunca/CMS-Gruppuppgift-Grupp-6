import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchHome, type Home } from '../../shared/firebase/home';
import logoUrl from '../assets/headerLogo.png';
import Style from './header.module.css';

type HeaderProps = {
  setResult: (result: Home[]) => void;
};

function Header({ setResult }: HeaderProps) {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    const result = await searchHome(search);
    if (!result.length) {
      return;
    }
    setResult(result);
    navigate('/result');
  };

  return (
    <header className={Style.header}>
      <div className={Style.logo}>
        <img src={logoUrl} alt="Svensk Fastighetsförmedling" />
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
