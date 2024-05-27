import { useOutletContext } from 'react-router-dom';
import { type Home } from '../../shared/firebase/home';

function Result() {
  const result = useOutletContext<Home[]>();

  return (
    <main>
      {result.map((home) => (
        <div key={home.id}>
          <img src={home.coverImage} alt="Ett av våra hus för fan!" />
          <p>{home.description}</p>
        </div>
      ))}
    </main>
  );
}

export default Result;
