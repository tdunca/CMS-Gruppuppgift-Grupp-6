import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../main';

export const uploadFile = async (file: File) => {
  const storageRef = ref(storage, `images/${file.name}`);
  try {
    const snapshot = await uploadBytes(storageRef, file);
    console.log('Uploaded a blob or file!', snapshot);
  } catch (error) {
    console.error('Upload failed', error);
  }
};
