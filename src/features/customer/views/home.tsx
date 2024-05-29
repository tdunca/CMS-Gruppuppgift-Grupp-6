import { useEffect, useState } from 'react';
import { fetchSpotlightHomes, type Home } from '../../shared/firebase/home';
import Style from './home.module.css';

function Home() {
  const [houses, setHouses] = useState<Home[]>([]);

  useEffect(() => {
    const onLoad = async () => {
      const data = await fetchSpotlightHomes();
      if (data) setHouses(data);
    };
    onLoad();
  }, []);

  return (
    <main>
      {houses.map((house) => (
        <>
          <article>
            <figure className={Style.spotlight}>
              <img src={house.imageUrls[0]} />
            </figure>
            <h2>{house.homeCity} Test</h2>
            <p>{house.description}</p>
          </article>
        </>
      ))}
    </main>
  );
}

export default Home;
