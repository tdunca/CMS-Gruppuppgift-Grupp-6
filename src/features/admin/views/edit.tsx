import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HomeType, fetchHouseById, saveHome } from '../../firebase/home';
import { uploadFile } from '../../firebase/upload';
import { getStorage, ref, deleteObject } from 'firebase/storage'; // Import Firebase Storage methods
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
  const [imageUrls, setImageUrls] = useState<HomeType['imageUrls']>([]);

  const { id }: { id?: string } = useParams(); // Specify the type of id as string
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || id === 'new') return;

    const onLoad = async () => {
      const house = await fetchHouseById(id);
      if (!house) return;

      setDescription(house.description);
      setRoomNum(house.roomNum);
      setHomePrice(house.homePrice);
      setSquareMeters(house.squareMeters);
      setHomeAddress(house.homeAddress);
      setPostalCode(house.postalCode);
      setHomeCity(house.homeCity);
      setLandSquareMeters(house.landSquareMeters);
      setHomeBuildYear(house.homeBuildYear);
      setHomeEnergyClass(house.homeEnergyClass);
      setHomeSpotlight(house.homeSpotlight);
      setImageUrls(house.imageUrls);
    };
    onLoad();
  }, [id]);

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
      imageUrls, // Include image URL
    };

    const success = await saveHome(houseData, id);

    if (success) navigate('/admin/home');
  };

  const handleDeleteImage = async (imageUrlToDelete: string) => {
    const updatedImages = imageUrls.filter((url) => url !== imageUrlToDelete);
    setImageUrls(updatedImages); // Update the state with the new image URLs

    try {
      // Create a reference to the file to delete
      const storage = getStorage();
      const fileRef = ref(storage, imageUrlToDelete);

      // Delete the file
      await deleteObject(fileRef);
      console.log('Image deleted successfully from storage.');

      // Update Firestore
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
        imageUrls: updatedImages, // Include the updated image URLs
      };
      await saveHome(houseData, id!);
      console.log('Image reference deleted successfully from Firestore.');
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const files = Array.from(e.target.files);
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const url = await uploadFile(file);
        console.log('Uploaded Image URL:', url); // Log uploaded image URL
        return url;
      })
    );

    setImageUrls((prevUrls) => [...prevUrls, ...uploadedImages]); // Add new URLs to existing array
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
      <div>
        {imageUrls.map((url) => (
          <div key={url}>
            <img src={url} alt={`House Image`} />
            <button onClick={() => handleDeleteImage(url)}>Delete</button>
          </div>
        ))}
      </div>

      <button onClick={handleClick}>Spara</button>
      <input type="file" onChange={handleFileChange} />
    </main>
  );
}

export default Edit;
