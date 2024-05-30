import { useOutletContext } from 'react-router-dom';
import { type Home } from '../../shared/firebase/home';
import ImageCard from '../../admin/components/imageCard';
import './result.css';

function Result() {
  const result = useOutletContext<Home[]>();

  return (
    <main className="result-container">
      {result.map((home) => (
        <ImageCard
          key={home.id}
          imageUrl={home.coverImage}
          title={home.homeAddress}
          description={home.description}
          className="result-image-card" // Pass custom class name
        />
      ))}
    </main>
  );
}

export default Result;
