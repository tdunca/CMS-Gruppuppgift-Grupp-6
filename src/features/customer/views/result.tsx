import { useOutletContext } from 'react-router-dom';
import { HomeType } from '../../firebase/home';

function Result() {
  const result = useOutletContext<HomeType[]>();

  return (
    <main>
      {result.map((home) => (
        <div key={home.id}>
          <img src={home.imageUrls[0]} alt="Ett av våra hus för fan!" />
          <p>{home.description}</p>
        </div>
      ))}
    </main>
  );
}

export default Result;
