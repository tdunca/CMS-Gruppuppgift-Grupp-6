import { useParams } from 'react-router-dom';

function Details() {
  const { name } = useParams();

  return <main>DETAILS FÖR FAN! {name}</main>;
}

export default Details;
