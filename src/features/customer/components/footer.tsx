import instagramlogo from '../assets/instagramlogo.png';
import linkedinlogo from '../assets/linkedinlogo.png';
import twitterlogo from '../assets/twitterlogo.png';
import Style from './footer.module.css';

function Footer() {
  return (
    <footer className={Style.footer}>
      <p>0138 333 333 | info@elitehomes.com</p>
      <p>Mäklargatan 23 | Mäklarberg | Sverige </p>
      <div className={Style.socials}>
        <a className={Style.socialslink} href="https://www.instagram.com/">
          <img
            className={Style.socialspic}
            src={instagramlogo}
            alt="instagram"
          />
        </a>
        <a className={Style.socialslink} href="https://www.twitter.com/">
          <img className={Style.socialspic} src={twitterlogo} alt="twitter" />
        </a>
        <a className={Style.socialslink} href="https://www.linkedin.com/">
          <img className={Style.socialspic} src={linkedinlogo} alt="linkedin" />
        </a>
      </div>
      <p>© Elite Homes 2024</p>
    </footer>
  );
}

export default Footer;
