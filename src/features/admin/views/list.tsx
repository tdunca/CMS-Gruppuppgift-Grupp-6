import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, getStorage, ref } from 'firebase/storage'; // Add this impor
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../main';
import { fetchAllHomes, type Home } from '../../shared/firebase/home';

function List() {
  const [homes, setHomes] = useState<Home[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const onLoad = async () => {
      const data = await fetchAllHomes();
      if (data) setHomes(data);
    };
    onLoad();
  }, []);

  const deleteHome = async (id: string, imageUrls: string[]) => {
    try {
      const homeDoc = doc(db, 'hus', id);
      await deleteDoc(homeDoc);

      // Delete associated images from Firebase Storage
      const storage = getStorage();
      imageUrls.forEach(async (url) => {
        const fileRef = ref(storage, url);
        await deleteObject(fileRef);
      });

      // After deletion, update the home list to reflect the changes
      setHomes((prevHomes) => prevHomes.filter((home) => home.id !== id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const handleNavigate = (id: string) => {
    navigate(`/admin/home/edit/${id}`);
  };

  return (
    <main>
      <button onClick={() => handleNavigate('new')}>Add New Home</button>
      {homes.map((home) => (
        <article key={home.id}>
          <img
            src={home.coverImage}
            alt="Home"
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />

          <p>{`${home.homeAddress} ${home.homeCity}`}</p>
          <div>
            <button onClick={() => handleNavigate(home.id)}>Edit</button>
            <button
              onClick={() =>
                deleteHome(home.id, [...home.imageUrls, home.coverImage])
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
