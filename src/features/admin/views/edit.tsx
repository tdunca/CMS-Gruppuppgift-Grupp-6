import 'firebase/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../../../main';

function Edit() {
  const { name } = useParams();

  async function handleClick() {
    try {
      await addDoc(collection(db, 'hus'), {
        name: name,
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  return (
    <>
      <button onClick={handleClick}>Lägg till hus för fan!</button>
    </>
  );
}

export default Edit;
