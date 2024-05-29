import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSpotlightHomes, type Home } from '../../shared/firebase/home';
import Style from './start.module.css';
import Carousel from 'react-material-ui-carousel';
// import videobg from '../assets/headervid.mp4';

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
        {/* <video src={videobg} autoPlay loop muted /> */}
        <article className={Style.onTopText}>
          <h1>Går du i säljartankar?</h1>
          <h2>
            Ring oss på 0138 333 333 eller skicka ett mail på elite@home.com
          </h2>
        </article>
      </article>

      <article className={Style.spotlight}>
        <p>
          Klicktoppen - fattar fan inte varför karuselljäveln vägrar centrera
          bilderna.
        </p>
        <Carousel
          className={Style.carouselWrapper}
          autoPlay={false}
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
        <h3>Våra mäklare</h3>
        <h5>Lite text om oss blablabla</h5>
        <h5>Tänker typ en contact card component här för mäklarna bara?</h5>
      </article>
    </main>
  );
}

export default Start;
