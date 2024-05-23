import {
  type DocumentData,
  type QuerySnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../main';

type HomeInputType = {
  description: string;
  roomNum: number;
  homePrice: number;
  squareMeters: number;
  homeAddress: string;
  postalCode: number;
  homeCity: string;
  landSquareMeters: number;
  homeBuildYear: number;
  homeEnergyClass: string;
  homeSpotlight: boolean;
  imageUrls: string[];
};

type HomeWithAgentType = HomeInputType & { agentEmail: string };

export type HomeType = HomeWithAgentType & { id: string };

const parseHomeData = (data: QuerySnapshot<DocumentData, DocumentData>) =>
  data.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as HomeWithAgentType),
  }));

export const saveHome = async (home: HomeInputType, id: string) => {
  const user = auth.currentUser;

  if (!user) {
    console.log('Error not signed in');
    return;
  }
  console.log({ user });

  const data: HomeWithAgentType = { ...home, agentEmail: user.email || '' };

  try {
    if (id !== 'new') {
      await updateDoc(doc(db, 'hus', id), data);
    } else {
      await addDoc(collection(db, 'hus'), data);
    }
    return true;
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export const fetchAllHomes = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'hus'));

    return parseHomeData(snapshot) as HomeType[];
  } catch (error) {
    console.error('Error fetching houses: ', error);
  }
};

export const fetchHouseById = async (id: string) => {
  try {
    const docRef = doc(db, 'hus', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as HomeType;
    } else {
      console.error('No such document!');
    }
  } catch (error) {
    console.error('Error fetching document: ', error);
  }
};

export const fetchSpotlightHomes = async () => {
  const q = query(collection(db, 'hus'), where('homeSpotlight', '==', true));
  const snapshot = await getDocs(q);

  return parseHomeData(snapshot) as HomeType[];
};
