import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { auth, db } from '../main';
import { useNavigate } from 'react-router-dom';
import FileUpload, { uploadFile } from './FileUpload';

interface Information {
  title: string;
  text: string;
  description: string;
}

// items/{newItem}

// users/{uid}/items/{newItem}

const AddItem = () => {
  const [information, setInformation] = useState<Information>({
    title: '',
    text: '',
    description: '',
  });

  const navigate = useNavigate(); // Get the navigation function

  const handleSave = async () => {
    const user = auth.currentUser;

    if (!user) {
      console.log('Error not signed in');
      return;
    }

    try {
      await addDoc(collection(db, 'users', user.uid, 'items'), information);
      setInformation({ title: '', text: '', description: '' }); // Clear input fields after saving
    } catch (error) {
      console.log(error);
    }
  };
  // Function to sign out the current user
  const signOutUser = async () => {
    try {
      await auth.signOut();
      console.log('signed out');
      navigate('/'); // Navigate to the SignIn page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  const handleFileUpload = async (file) => {
    await uploadFile(file);
  };

  return (
    <>
      <label>Title:</label>
      <input
        type="text"
        value={information.title}
        onChange={(e) =>
          setInformation({ ...information, title: e.target.value })
        }
      />
      <br />

      <label>Text:</label>
      <input
        type="text"
        value={information.text}
        onChange={(e) =>
          setInformation({ ...information, text: e.target.value })
        }
      />
      <br />

      <label>Description:</label>
      <input
        type="text"
        value={information.description}
        onChange={(e) =>
          setInformation({ ...information, description: e.target.value })
        }
      />
      <br />

      <button onClick={handleSave}>Save</button>

      {/* Conditional rendering of the Sign Out button */}
      {auth.currentUser && <button onClick={signOutUser}>Sign Out</button>}

      {/* File upload component */}
      <FileUpload onFileUpload={handleFileUpload} />
    </>
  );
};

export default AddItem;
