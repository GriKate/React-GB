// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { getDatabase, ref } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBEQFDl9RYfBYy35QRm2c6Cd-ReBCk6Ix4',
  authDomain: 'gb-react-prj.firebaseapp.com',
  projectId: 'gb-react-prj',
  storageBucket: 'gb-react-prj.appspot.com',
  messagingSenderId: '49059111988',
  appId: '1:49059111988:web:340f2287c4a0d5b9849661',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase реализовал аутентификацию в feature getAuth()
export const firebaseAuth = getAuth(app);

export const signUp = async (email, password) => {
  await createUserWithEmailAndPassword(firebaseAuth, email, password);
};

export const signIn = async (email, password) => {
  await signInWithEmailAndPassword(firebaseAuth, email, password);
};

export const logOut = async () => {
  await signOut(firebaseAuth);
};

// подключение к БД firebase
const db = getDatabase(app);

// по каким ссылкам будет срабатывать
export const userRef = ref(db, 'user');
export const chatsRef = ref(db, 'chats');
export const getChatById = (chatId) => ref(db, `chats/${chatId}`);
export const messagesRef = ref(db, 'messages');
