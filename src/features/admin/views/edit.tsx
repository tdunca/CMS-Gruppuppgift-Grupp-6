import { deleteObject, getStorage, ref } from 'firebase/storage'; // Import Firebase Storage methods
import { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchHomeById,
  saveHome,
  updateHomeById,
  type Home,
} from '../../shared/firebase/home';
import { uploadFile } from '../../shared/firebase/upload';
import Input from '../components/input';

function Edit() {
  const [coverImage, setCoverImage] = useState('');
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
  const [imageUrls, setImageUrls] = useState<Home['imageUrls']>([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || id === 'new') return;

    const onLoad = async () => {
      const home = await fetchHomeById(id);
      if (!home) return;

      setCoverImage(home.coverImage);
      setDescription(home.description);
      setRoomNum(home.roomNum);
      setHomePrice(home.homePrice);
      setSquareMeters(home.squareMeters);
      setHomeAddress(home.homeAddress);
      setPostalCode(home.postalCode);
      setHomeCity(home.homeCity);
      setLandSquareMeters(home.landSquareMeters);
      setHomeBuildYear(home.homeBuildYear);
      setHomeEnergyClass(home.homeEnergyClass);
      setHomeSpotlight(home.homeSpotlight);
      setImageUrls(home.imageUrls);
    };
    onLoad();
  }, [id]);

  const handleSave = async () => {
    if (!id) return;

    // if (!description || !name) return; // TODO: better validation

    const homeData = {
      coverImage,
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
      imageUrls,
    };

    const success = await saveHome(homeData, id);

    if (success) navigate('/admin/home');
  };

  const handleDeleteImage = async (
    imageUrlToDelete: string,
    isCoverImage: boolean
  ) => {
    const updatedImages = imageUrls.filter((url) => url !== imageUrlToDelete);
    setImageUrls(updatedImages); // Update the state with the new image URLs
    if (isCoverImage) {
      setCoverImage('');
    }

    try {
      // Create a reference to the file to delete
      const storage = getStorage();
      const fileRef = ref(storage, imageUrlToDelete);

      // Delete the file
      await deleteObject(fileRef);
      console.log('Image deleted successfully from storage.');

      if (id && id !== 'new') {
        // Update Firestore
        await updateHomeById(
          isCoverImage ? { coverImage } : { imageUrls: updatedImages },
          id
        );
        console.log('Image reference deleted successfully from Firestore.');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleCoverImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const url = await uploadFile(e.target.files[0]);
    setCoverImage(url);
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
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
      {coverImage ? (
        <div>
          <img src={coverImage} alt={`Home Cover Image`} />
          <button onClick={() => handleDeleteImage(coverImage, true)}>
            Delete
          </button>
        </div>
      ) : (
        <Input
          name="coverImage"
          label="Omslagsbild"
          type="file"
          onChange={handleCoverImageUpload}
        />
      )}
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
      {imageUrls.length > 0 && (
        <div>
          {imageUrls.map((url) => (
            <div key={url}>
              <img src={url} alt={`Home Image`} />
              <button onClick={() => handleDeleteImage(url, false)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      <Input
        name="imageUrls"
        label="Övriga bilder"
        type="file"
        multiple
        onChange={handleImageUpload}
      />

      <button onClick={handleSave}>Spara</button>
    </main>
  );
}

export default Edit;
