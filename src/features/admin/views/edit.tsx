import { useState, type ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { saveHome } from '../../firebase/home';
import { uploadFile } from '../../firebase/upload';

function Edit() {
  const [description, setDescription] = useState('');

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
    <main>
      <label>Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleClick}>Lägg till hus för fan!</button>
      <input type="file" onChange={handleFileChange} />;
    </main>
  );
}

export default Edit;
