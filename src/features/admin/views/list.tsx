import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, getStorage, ref } from 'firebase/storage'; // Add this impor
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../main';
import { fetchAllHomes, type Home } from '../../shared/firebase/home';
import ImageCard from '../../shared/components/imageCard';
import './list.css';

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
      <div className="home-list">
        {homes.map((home) => (
          <ImageCard
            key={home.id}
            imageUrl={home.coverImage}
            title={`${home.homeAddress} ${home.homeCity}`}
            description={`Price: ${home.homePrice}`}
            onEdit={() => handleNavigate(home.id)}
            onDelete={() =>
              deleteHome(home.id, [...home.imageUrls, home.coverImage])
            }
          />
        ))}
      </div>
    </main>
  );
}

export default List;
