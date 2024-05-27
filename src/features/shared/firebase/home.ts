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

type HomeFirestoreInput = {
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

type HomeFirestoreOutput = HomeFirestoreInput & { agentId: string };

export type Home = HomeFirestoreOutput & { id: string };

const homeConverter = {
  toFirestore(home: HomeFirestoreOutput): DocumentData {
    return home;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): HomeFirestoreOutput {
    return snapshot.data(options) as HomeFirestoreOutput;
  },
};

const parseHomeData = (
  snapshot: QuerySnapshot<HomeFirestoreOutput, DocumentData>
): Home[] =>
  snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

export const saveHome = async (home: HomeFirestoreInput, id: string) => {
  const user = auth.currentUser;

  if (!user) {
    console.log('Error not signed in');
    return;
  }
  console.log({ user });

  const data: HomeFirestoreOutput = { ...home, agentId: '' };

  try {
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
  homeUpdate: Partial<HomeFirestoreInput>,
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
      return docSnap.data();
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
