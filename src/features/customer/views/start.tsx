import { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useNavigate } from 'react-router-dom';
import { fetchSpotlightHomes, type Home } from '../../shared/firebase/home';
import agneta from '../assets/agneta.jpg';
import videobg from '../assets/headervid.mp4';
import johanna from '../assets/johanna.jpg';
import matilda from '../assets/matilda.jpg';
import paul from '../assets/paul.jpg';
import { RealtorCard } from '../components/realtor-card-component';
import Style from './start.module.css';

function Start() {
  const [homes, setHomes] = useState<Home[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const onLoad = async () => {
      const data = await fetchSpotlightHomes();
      if (data) setHomes(data);
    };
    onLoad();
  }, []);

  return (
    <main className={Style.start}>
      <section className={Style.videobg}>
        <video src={videobg} autoPlay loop muted />
        <article className={Style.onTopText}>
          <h2>Går du i säljartankar?</h2>
          <h1>
            Ring oss på 0138 333 333 eller skicka ett mail på elite@home.com
          </h1>
        </article>
      </section>

      <section className={Style.spotlight}>
        <h2>Klicktoppen</h2>
        <Carousel
          className={Style.carouselWrapper}
          autoPlay={true}
					interval={6000}
          navButtonsAlwaysVisible={true}
          animation="fade"
          stopAutoPlayOnHover={true}
          cycleNavigation={true}
					changeOnFirstRender={true}
        >
          {homes.map((home) => (
            <article
              className={Style.imageBox}
              key={home.id}
              onClick={() => navigate('home/' + home.id)}
            >
              <img
                src={home.coverImage}
                className={Style.image}
                alt="Ett av våra hem"
              />
              <h3 className={Style.imageText}>{home.description}</h3>
            </article>
          ))}
        </Carousel>
      </section>
      <section className={Style.realtors}>
        <h2 className={Style.aboutheader}>
          Vi hjälper dig till ditt livs bästa affär
        </h2>
        <p className={Style.abouttext}>
          Ska du köpa, sälja eller hyra ut en bostad? Vi på Elite Homes
          Fastigheter förmedlar och värderar alla typer av bostäder och erbjuder
          dig som kund en helhetäckande mäklartjänst från start till mål. Som
          vinnare av årets bästa mäklarfirma 2023 kan vi stoltsera med en
          kundnöjdhet i världsklass. Kontaka någon av våra enastående mäklare
          nedan!{' '}
        </p>
        <div className={Style.realtorcards}>
          <RealtorCard
            name="Agneta Andersson"
            email="agneta@elitehomes.com"
            phoneNumber="0138-333 321"
            imageUrl={agneta}
          />
          <RealtorCard
            name="Paul Persson"
            email="paul@elitehomes.com"
            phoneNumber="0138-333 322"
            imageUrl={paul}
          />
          <RealtorCard
            name="Johanna Jakobsson"
            email="johanna@elitehomes.com"
            phoneNumber="0138-333 323"
            imageUrl={johanna}
          />
          <RealtorCard
            name="Matilda Martinsson"
            email="matilda@elitehomes.com"
            phoneNumber="0138-333 324"
            imageUrl={matilda}
          />
        </div>
      </section>
    </main>
  );
}

export default Start;
