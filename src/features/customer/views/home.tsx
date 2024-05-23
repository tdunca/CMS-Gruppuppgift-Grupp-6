import { useEffect, useState } from 'react';
import { fetchSpotlightHomes, type HomeType } from '../../firebase/home';

function Home() {
  const [houses, setHouses] = useState<HomeType[]>([]);

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
        <article>
          <img src={house.imageUrls[0]} alt="Ett av våra hus för fan!" />
          <p>{house.description}</p>
        </article>
      ))}
    </main>
  );
}

export default Home;
