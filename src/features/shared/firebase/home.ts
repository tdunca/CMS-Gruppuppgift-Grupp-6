import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  or,
  query,
  updateDoc,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
  type QuerySnapshot,
  type SnapshotOptions,
} from 'firebase/firestore';
import { auth, db } from '../../../main';
import { AgentData } from './user';

type NewHome = {
  coverImage: string;
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

type FirestoreHome = NewHome & { agentId: string };

export type Home = FirestoreHome & { id: string };

const homeConverter = {
  toFirestore(home: FirestoreHome): DocumentData {
    return home;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): FirestoreHome {
    return snapshot.data(options) as FirestoreHome;
  },
};

const parseHomeData = (
  snapshot: QuerySnapshot<FirestoreHome, DocumentData>
): Home[] =>
  snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

const fetchAgentById = async (id: string) => {
  const agentSnapshot = await getDoc(doc(db, 'users', id));
  if (!agentSnapshot.exists()) {
    throw new Error('AgentData does not exist');
  }

  return agentSnapshot.data() as AgentData;
};

export const saveHome = async (home: NewHome, id: string) => {
  const user = auth.currentUser;

  if (!user) {
    console.log('Error not signed in');
    return;
  }
  console.log({ user });

  try {
    const data = { ...home, agentId: user.uid };

    if (id !== 'new') {
      await updateDoc(doc(db, 'hus', id).withConverter(homeConverter), data);
    } else {
      await addDoc(collection(db, 'hus').withConverter(homeConverter), data);
    }
    return true;
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export const updateHomeById = async (
  homeUpdate: Partial<FirestoreHome>,
  id: string
) => {
  try {
    await updateDoc(
      doc(db, 'hus', id).withConverter(homeConverter),
      homeUpdate
    );
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

export const fetchAllHomes = async () => {
  try {
    const snapshot = await getDocs(
      collection(db, 'hus').withConverter(homeConverter)
    );

    return parseHomeData(snapshot);
  } catch (error) {
    console.error('Error fetching homes: ', error);
  }
};

export const fetchHomeById = async (id: string) => {
  try {
    const docRef = doc(db, 'hus', id).withConverter(homeConverter);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const homeData = { ...docSnap.data(), id: docSnap.id } as Home;
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
  const q = query(
    collection(db, 'hus').withConverter(homeConverter),
    where('homeSpotlight', '==', true)
  );
  const snapshot = await getDocs(q);

  return parseHomeData(snapshot);
};

export const searchHome = async (searchTerm: string) => {
  const q = query(
    collection(db, 'hus').withConverter(homeConverter),
    or(
      where('roomNum', '==', parseInt(searchTerm)),
      where('homePrice', '<', parseInt(searchTerm)),
      where('homeCity', '==', searchTerm)
    )
  );
  const snapshot = await getDocs(q);

  return parseHomeData(snapshot);
};
