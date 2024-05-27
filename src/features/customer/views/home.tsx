import { useEffect, useState } from 'react';
import { fetchSpotlightHomes, type Home } from '../../firebase/home';

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
        <article key={house.id}>
          <img src={house.coverImage} alt="Ett av våra hus för fan!" />
          <p>{house.description}</p>
        </article>
      ))}
    </main>
  );
}

export default Home;
