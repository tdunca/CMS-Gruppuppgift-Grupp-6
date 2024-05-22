import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../main';
import { type User } from 'firebase/auth';

type HomeType = {
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

type HomeWithAgentType = HomeType & { agentEmail: User['email'] };

export const saveHome = async (home: HomeType, id: string) => {
  const user = auth.currentUser;

  if (!user) {
    console.log('Error not signed in');
    return;
  }
  console.log({ user });

  const data: HomeWithAgentType = { ...home, agentEmail: user.email };

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
