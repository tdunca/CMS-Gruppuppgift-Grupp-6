import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../main';
import { type User } from 'firebase/auth';

type HomeType = {
  name: string;
  description: string;
};

type HomeWithAgentType = HomeType & { agentEmail: User['email'] };

export const saveHome = async (home: HomeType) => {
  const user = auth.currentUser;

  if (!user) {
    console.log('Error not signed in');
    return;
  }
  console.log({ user });

  const data: HomeWithAgentType = { ...home, agentEmail: user.email };

  try {
    await addDoc(collection(db, 'hus'), data);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
