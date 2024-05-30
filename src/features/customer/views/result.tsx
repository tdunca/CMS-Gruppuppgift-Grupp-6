import { useNavigate, useOutletContext } from 'react-router-dom';
import { type Home } from '../../shared/firebase/home';
import ImageCard from '../../shared/components/imageCard';
import './result.css';

function Result() {
  const result = useOutletContext<Home[]>();
  const navigate = useNavigate();

  return (
    <main className="result-container">
      {result.map((home) => (
        <ImageCard
          key={home.id}
          imageUrl={home.coverImage}
          title={home.homeAddress}
          description={home.description}
          className="result-image-card" // Pass custom class name
          onClick={() => navigate(`/home/${home.id}`)}
        />
      ))}
    </main>
  );
}

export default Result;
