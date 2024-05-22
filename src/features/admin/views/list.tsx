import { db } from '../../../main';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function List() {
  const [houses, setHouses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'hus'));
      const houseData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHouses(houseData);
    } catch (error) {
      console.error('Error fetching houses: ', error);
    }
  };

  const deleteHouse = async (id) => {
    try {
      const houseDoc = doc(db, 'hus', id);
      await deleteDoc(houseDoc);
      // After deletion, update the house list to reflect the changes
      setHouses((prevHouses) => prevHouses.filter((house) => house.id !== id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const handleNavigate = (id) => {
    navigate(`/admin/home/edit/${id}`);
  };

  return (
    <main>
      <button onClick={() => handleNavigate('new')}>Add New House</button>
      {houses.map((house, index) => (
        <div key={house.id}>
          <div>{house.name}</div>
          <button onClick={() => handleNavigate(house.id)}>Edit</button>
          <button onClick={() => deleteHouse(house.id)}>Delete</button>
        </div>
      ))}
    </main>
  );
}

export default List;
