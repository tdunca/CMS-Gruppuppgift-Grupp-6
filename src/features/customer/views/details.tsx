import { useParams } from 'react-router-dom';

function Details() {
  const { name } = useParams();

  return <>DETAILS FÖR FAN! {name}</>;
}

export default Details;
