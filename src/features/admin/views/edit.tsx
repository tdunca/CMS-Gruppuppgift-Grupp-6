import { useState, type ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { saveHome } from '../../firebase/home';
import { uploadFile } from '../../firebase/upload';
import Input from '../components/input';

function Edit() {
  const [description, setDescription] = useState('');
  const [roomNum, setRoomNum] = useState(3);
  const [homePrice, setHomePrice] = useState(30000000);
  const [squareMeters, setSquareMeters] = useState(80);
  const [homeAdress, setHomeAdress] = useState('');
  const [postalCode, setPostalCode] = useState(12345);
  const [homeCity, setHomeCity] = useState('');
  const [landSquareMeters, setLandSquareMeters] = useState(500);
  const [homeBuildYear, setHomeBuildYear] = useState(1980);
  const [homeEnergyClass, setHomeEnergyClass] = useState('');
  const [homeSpotlight, setHomeSpotlight] = useState(false);
  const { name } = useParams();

  const handleClick = () => {
    if (!name || !description) return; // TODO: better validation

    saveHome({ name, description });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    uploadFile(e.target.files[0]);
  };

  return (
    <section>
      <Input
        name="homeAdress"
        label="Adress"
        type="text"
        value={homeAdress}
        onChange={(e) => setHomeAdress(e.target.value)}
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
        label="Spotlight:"
        type="checkbox"
        checked={homeSpotlight}
        onChange={() => setHomeSpotlight((val: boolean) => !val)}
      />
      <button onClick={handleClick}>Lägg till hus för fan!</button>
      <input type="file" onChange={handleFileChange} />;
    </section>
  );
}

export default Edit;
