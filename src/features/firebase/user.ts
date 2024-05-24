import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type UserCredential,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../main';

export type SignInType = {
  email: string;
  password: string;
};

export type AgentType = {
  name: string;
  phoneNum: number;
  workEmail: string;
};

export const createUser = async (newUser: SignInType & AgentType) => {
  const { email, password, name, phoneNum, workEmail } = newUser;

  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential: UserCredential) => {
      console.log('User registered and logged in', { userCredential });
      const newAgent = await setDoc(doc(db, 'users', userCredential.user.uid), {
        name, // TODO: add inputs
        phoneNum,
        workEmail,
      });
      console.log({ newAgent });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signInUser = async (user: SignInType) => {
  await signInWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential: UserCredential) => {
      console.log('User logged in', userCredential);
    })
    .catch((error) => {
      console.log(error);
    });
};
