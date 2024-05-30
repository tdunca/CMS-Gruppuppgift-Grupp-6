import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchHome, type Home } from '../../shared/firebase/home';
import logoUrl from '../assets/headerLogoVit.png';
import Style from './header.module.css';

type HeaderProps = {
  setResult: (result: Home[]) => void;
};

function Header({ setResult }: HeaderProps) {
  const [search, setSearch] = useState('');
  const [headerBg, setHeaderBg] = useState(false);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    console.log('useLayoutEffect', window.scrollY);
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = 200;
      console.log(scrollY);

      if (scrollY < offset && headerBg) setHeaderBg(false);
      if (scrollY >= offset && !headerBg) setHeaderBg(true);
    };

    window.addEventListener('scroll', () => handleScroll());

    return window.removeEventListener('scroll', () => handleScroll());
  }, [headerBg]);

  const handleSearch = async () => {
    const result = await searchHome(search);
    if (!result.length) {
      return;
    }
    setResult(result);
    navigate('/result');
  };

  return (
    <header className={`${Style.header} ${headerBg ? Style.headerBg : ''}`}>
      <img
        src={logoUrl}
        className={Style.logopic}
        alt="Elite Home Fastigheter"
      />
      <div className={Style.buttonContainer}>
        <input
          className={Style.label}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Sök efter bostad... "
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
