import { deleteDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../main';
import { type HomeType, fetchAllHomes } from '../../firebase/home';

function List() {
  const [houses, setHouses] = useState<HomeType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const onLoad = async () => {
      const data = await fetchAllHomes();
      if (data) setHouses(data);
    };
    onLoad();
  }, []);

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
