import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchHouseById } from '../../firebase/home';

function Details() {
  const { id } = useParams();

  useEffect(() => {
    const onLoad = async () => {
      if (!id) return;
      const house = await fetchHouseById(id);
      console.log({ house });
    };
    onLoad();
  }, [id]);

  return <main>DETAILS FÖR FAN!</main>;
}

export default Details;
