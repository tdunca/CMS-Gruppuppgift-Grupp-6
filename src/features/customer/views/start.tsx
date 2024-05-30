import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSpotlightHomes, type Home } from '../../shared/firebase/home';
import Style from './start.module.css';
import Carousel from 'react-material-ui-carousel';
import { RealtorCard } from '../components/realtor-card-component';
import videobg from '../assets/headervid.mp4';
import agneta from '../assets/agneta.jpg';
import paul from '../assets/paul.jpg';
import johanna from '../assets/johanna.jpg';
import matilda from '../assets/matilda.jpg';

function Start() {
  const [houses, setHouses] = useState<Home[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const onLoad = async () => {
      const data = await fetchSpotlightHomes();
      if (data) setHouses(data);
    };
    onLoad();
  }, []);

  return (
    <main className={Style.start}>
      <article className={Style.videobg}>
        {<video src={videobg} autoPlay loop muted />}
        <article className={Style.onTopText}>
          <h2>Går du i säljartankar?</h2>
          <h4>
            Ring oss på 0138 333 333 eller skicka ett mail på elite@home.com
          </h4>
        </article>
      </article>

      <article className={Style.spotlight}>
        <p>Klicktoppen</p>
        <Carousel
          className={Style.carouselWrapper}
          autoPlay={true}
          navButtonsAlwaysVisible={true}
          animation="fade"
          stopAutoPlayOnHover={true}
          cycleNavigation={true}
        >
          {houses.map((house, i) => (
            <article
              className={Style.imageBox}
              key={i}
              onClick={() => navigate('home/' + house.id)}
            >
              <img
                src={house.coverImage}
                className={Style.image}
                alt="Ett av våra hem"
              />
              <p className={Style.imageText}>{house.description}</p>
            </article>
          ))}
        </Carousel>
      </article>
      <article className={Style.realtors}>
        <p className={Style.aboutheader}>
          Vi hjälper dig till ditt livs bästa affär
        </p>
        <p className={Style.abouttext}>
          Ska du köpa, sälja eller hyra ut en bostad? Vi på Elite Homes
          Fastigheter förmedlar och värderar alla typer av bostäder och erbjuder
          dig som kund en helhetäckande mäklartjänst från start till mål. Som
          vinnare av årets bästa mäklarfirma 2023 kan vi stoltsera med en
          kundnöjdhet i världsklass. Kontaka någon av våra enastående mäklare
          nedan!{' '}
        </p>
        <article className={Style.realtorcards}>
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
        </article>
      </article>
    </main>
  );
}

export default Start;
