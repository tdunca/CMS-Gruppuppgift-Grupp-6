import { useEffect, useState } from 'react';
import { fetchSpotlightHomes, type Home } from '../../firebase/home';

function Home() {
  const [homes, setHomes] = useState<Home[]>([]);

  useEffect(() => {
    const onLoad = async () => {
      const data = await fetchSpotlightHomes();
      if (data) setHomes(data);
    };
    onLoad();
  }, []);

  return (
    <main>
      {homes.map((home) => (
        <article key={home.id}>
          <img src={home.coverImage} alt="Ett av våra hem för fan!" />
          <p>{home.description}</p>
        </article>
      ))}
    </main>
  );
}

export default Home;
