import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
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
};

type HomeWithAgentType = HomeInputType & { agentEmail: string };

export type HomeType = HomeWithAgentType & { id: string };

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
      await addDoc(collection(db, 'hus', id), data);
    } else {
      await addDoc(collection(db, 'hus'), data);
    }
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export const fetchAllHomes = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'hus'));
    const houseData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as HomeWithAgentType),
    }));
    return houseData as unknown as HomeType[];
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
