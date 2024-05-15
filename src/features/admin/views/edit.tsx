import { useParams } from 'react-router-dom';

function Edit() {
  const { name } = useParams();

  return <>EDIT FÖR FAN! {name}</>;
}

export default Edit;
