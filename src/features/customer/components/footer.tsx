import { db } from '../../../main';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { useState } from 'react';

function Footer() {
  const [houses, setHouses] = useState([]);
  const [search, setSearch] = useState('');

  async function handleClick() {
    const q = query(collection(db, 'hus'), where('description', '==', search));
    const snapshot = await getDocs(q);
    const houses = snapshot.docs.map((doc) => doc.data());
    setHouses(houses);
  }

  return (
    <>
      <input
        placeholder="Sök hus här!"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleClick}>Sök hus för fan!</button>
      {houses &&
        houses.map((house, index) => <div key={index}>{house.name}</div>)}
      FOOTER FÖR FAN!
    </>
  );
}

export default Footer;
