import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, getStorage, ref } from 'firebase/storage'; // Add this impor
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../main';
import { fetchAllHomes, type Home } from '../../firebase/home';

function List() {
  const [houses, setHouses] = useState<Home[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const onLoad = async () => {
      const data = await fetchAllHomes();
      if (data) setHouses(data);
    };
    onLoad();
  }, []);

  const deleteHouse = async (id: string, imageUrls: string[]) => {
    try {
      const houseDoc = doc(db, 'hus', id);
      await deleteDoc(houseDoc);

      // Delete associated images from Firebase Storage
      const storage = getStorage();
      imageUrls.forEach(async (url) => {
        const fileRef = ref(storage, url);
        await deleteObject(fileRef);
      });

      // After deletion, update the house list to reflect the changes
      setHouses((prevHouses) => prevHouses.filter((house) => house.id !== id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const handleNavigate = (id: string) => {
    navigate(`/admin/home/edit/${id}`);
  };

  return (
    <main>
      <button onClick={() => handleNavigate('new')}>Add New House</button>
      {houses.map((house) => (
        <article key={house.id}>
          <img
            src={house.coverImage}
            alt="House"
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />

          <p>{`${house.homeAddress} ${house.homeCity}`}</p>
          <div>
            <button onClick={() => handleNavigate(house.id)}>Edit</button>
            <button
              onClick={() =>
                deleteHouse(house.id, [...house.imageUrls, house.coverImage])
              }
            >
              Delete
            </button>
          </div>
        </article>
      ))}
    </main>
  );
}

export default List;
