import Style from './footer.module.css';
import instagramlogo from '../assets/instagramlogo.png';
import facebooklogo from '../assets/facebooklogo.png';
import twitterlogo from '../assets/twitterlogo.png';
import linkedinlogo from '../assets/linkedinlogo.png';

function Footer() {
  return (
    <>
      <footer className={Style.footer}>
        <section className={Style.footerSection}>
          <p>0138 333 333 | info@elitehomes.com</p>
          <p>Mäklargatan 23 | Mäklarberg | Sverige </p>
          <a className={Style.socialslink} href="https://www.instagram.com/">
            <img
              className={Style.socialspic}
              src={instagramlogo}
              alt="instagram"
            />
          </a>
          <a className={Style.socialslink} href="https://www.facebook.com/">
            <img
              className={Style.socialspic}
              src={facebooklogo}
              alt="facebook"
            />
          </a>
          <a className={Style.socialslink} href="https://www.twitter.com/">
            <img className={Style.socialspic} src={twitterlogo} alt="twitter" />
          </a>
          <a className={Style.socialslink} href="https://www.linkedin.com/">
            <img
              className={Style.socialspic}
              src={linkedinlogo}
              alt="linkedin"
            />
          </a>
          <p>© Elite Homes 2024</p>
        </section>
      </footer>
    </>
  );
}

export default Footer;
