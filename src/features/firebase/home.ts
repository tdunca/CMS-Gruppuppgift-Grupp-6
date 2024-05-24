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
  or,
} from 'firebase/firestore';
import { auth, db } from '../../main';
import { type AgentType } from './user';

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

type HomeWithAgentType = HomeInputType & { agentId: string };

export type HomeType = HomeWithAgentType & { id: string };

const parseHomeData = (data: QuerySnapshot<DocumentData, DocumentData>) =>
  data.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as HomeWithAgentType),
  }));

const fetchAgentById = async (id: string) => {
  const agentSnapshot = await getDoc(doc(db, 'users', id));
  if (!agentSnapshot.exists()) {
    throw new Error('Agent does not exist');
  }

  return agentSnapshot.data() as AgentType;
};

export const saveHome = async (home: HomeInputType, id: string) => {
  const user = auth.currentUser;

  if (!user) {
    console.log('Error not signed in');
    return;
  }
  console.log({ user });

  const data: HomeWithAgentType = { ...home, agentId: user.uid };

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
      const homeData = docSnap.data() as HomeType;
      const agentData = await fetchAgentById(homeData.agentId);
      return { homeData, agentData };
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

export const searchHouse = async (searchTerm: string) => {
  const q = query(
    collection(db, 'hus'),
    or(
      where('roomNum', '==', parseInt(searchTerm)),
      where('homePrice', '<', parseInt(searchTerm)),
      where('homeCity', '==', searchTerm)
    )
  );
  const snapshot = await getDocs(q);

  return parseHomeData(snapshot) as HomeType[];
};
