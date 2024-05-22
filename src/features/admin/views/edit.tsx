import { doc, getDoc } from 'firebase/firestore';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../main';
import { saveHome } from '../../firebase/home';
import { uploadFile } from '../../firebase/upload';
import Input from '../components/input';

function Edit() {
  const [description, setDescription] = useState('');
  const [roomNum, setRoomNum] = useState(3);
  const [homePrice, setHomePrice] = useState(30000000);
  const [squareMeters, setSquareMeters] = useState(80);
  const [homeAddress, setHomeAddress] = useState('');
  const [postalCode, setPostalCode] = useState(12345);
  const [homeCity, setHomeCity] = useState('');
  const [landSquareMeters, setLandSquareMeters] = useState(500);
  const [homeBuildYear, setHomeBuildYear] = useState(1980);
  const [homeEnergyClass, setHomeEnergyClass] = useState('');
  const [homeSpotlight, setHomeSpotlight] = useState(false);

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

        setDescription(house.description);
        // TODO: Add all data fields
      } else {
        console.error('No such document!');
      }
    } catch (error) {
      console.error('Error fetching document: ', error);
    }
  };

  const handleClick = async () => {
    if (!id) return;

    // if (!description || !name) return; // TODO: better validation
    const houseData = {
      description,
      roomNum,
      homePrice,
      squareMeters,
      homeAddress,
      postalCode,
      homeCity,
      landSquareMeters,
      homeBuildYear,
      homeEnergyClass,
      homeSpotlight,
    };

    saveHome(houseData, id);

    navigate('/admin/home');
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    uploadFile(e.target.files[0]);
  };

  return (
    <main>
      <Input
        name="homeAddress"
        label="Adress"
        type="text"
        value={homeAddress}
        onChange={(e) => setHomeAddress(e.target.value)}
      />
      <Input
        name="postalCode"
        label="Postnummer"
        type="number"
        value={postalCode}
        onChange={(e) => setPostalCode(parseInt(e.target.value))}
      />
      <Input
        name="homeCity"
        label="Ort"
        type="text"
        value={homeCity}
        onChange={(e) => setHomeCity(e.target.value)}
      />
      <Input
        name="roomNum"
        label="Antal rum"
        type="number"
        value={roomNum}
        onChange={(e) => setRoomNum(parseInt(e.target.value))}
      />
      <Input
        name="homePrice"
        label="Pris"
        type="number"
        value={homePrice}
        onChange={(e) => setHomePrice(parseInt(e.target.value))}
      />
      <Input
        name="squareMeters"
        label="Boarea"
        type="number"
        value={squareMeters}
        onChange={(e) => setSquareMeters(parseInt(e.target.value))}
      />
      <Input
        name="landSquareMeters"
        label="Tomtarea"
        type="number"
        value={landSquareMeters}
        onChange={(e) => setLandSquareMeters(parseInt(e.target.value))}
      />
      <Input
        name="homeBuildYear"
        label="Byggnadsår"
        type="number"
        value={homeBuildYear}
        onChange={(e) => setHomeBuildYear(parseInt(e.target.value))}
      />
      <Input
        name="homeEnergyClass"
        label="Energiklass"
        type="text"
        value={homeEnergyClass}
        onChange={(e) => setHomeEnergyClass(e.target.value)}
      />
      <Input
        name="description"
        label="Beskrivning"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        name="homeSpotlight"
        label="Spotlight"
        type="checkbox"
        checked={homeSpotlight}
        onChange={() => setHomeSpotlight((val: boolean) => !val)}
      />
      <button onClick={handleClick}>Spara</button>
      <input type="file" onChange={handleFileChange} />;
    </main>
  );
}

export default Edit;
