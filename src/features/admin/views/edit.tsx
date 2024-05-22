import { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../../main';
import { doc, getDoc, setDoc, updateDoc, collection } from 'firebase/firestore';
import { uploadFile } from '../../firebase/upload';

function Edit() {
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== 'new') {
      fetchHouse();
    }
  }, [id]);

  const fetchHouse = async () => {
    try {
      const docRef = doc(db, 'hus', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const house = docSnap.data();
        setName(house.name);
        setDescription(house.description);
      } else {
        console.error('No such document!');
      }
    } catch (error) {
      console.error('Error fetching document: ', error);
    }
  };

  const handleClick = async () => {
    if (!description || !name) return; // TODO: better validation

    try {
      let houseDoc;
      if (id === 'new') {
        // Create a new document with an auto-generated ID
        const newDocRef = doc(collection(db, 'hus'));
        houseDoc = newDocRef;
        await setDoc(houseDoc, { name, description });
      } else {
        houseDoc = doc(db, 'hus', id);
        await updateDoc(houseDoc, { name, description });
      }

      navigate('/admin/home');
    } catch (error) {
      console.error('Error saving document: ', error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    uploadFile(e.target.files[0]);
  };

  return (
    <main>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleClick}>Save House</button>
      <input type="file" onChange={handleFileChange} />
    </main>
  );
}

export default Edit;
