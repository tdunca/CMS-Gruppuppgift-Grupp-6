import { db } from '../../../main';
import { getDocs, collection } from 'firebase/firestore';
import { useState } from 'react';

function List() {
  const [houses, setHouses] = useState<string[]>([]);

  async function handleClick() {
    const snapshot = await getDocs(collection(db, 'hus'));

    setHouses(snapshot.docs.map((doc) => doc.data().name));
    console.log(houses);
  }

  return (
    <main>
      <button onClick={handleClick}>Hämta hus för fan!</button>
      {houses && houses.map((house, index) => <div key={index}>{house}</div>)}
    </main>
  );
}

export default List;
