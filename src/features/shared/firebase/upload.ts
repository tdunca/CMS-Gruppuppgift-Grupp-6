import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../main';

export const uploadFile = async (file: File) => {
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};
