import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSpotlightHomes, type Home } from '../../shared/firebase/home';

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
    <main>
      {houses.map((house) => (
        <article key={house.id} onClick={() => navigate('home/' + house.id)}>
          <img src={house.coverImage} alt="Ett av våra hem för fan!" />
          <p>{house.description}</p>
        </article>
      ))}
    </main>
  );
}

export default Start;
