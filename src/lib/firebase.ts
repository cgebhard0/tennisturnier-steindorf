import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDpI-0rnr8Z-DW9jW3ebfuXjSPKksb81mc",
  authDomain: "steindorf-turnier.firebaseapp.com",
  projectId: "steindorf-turnier",
  databaseURL: "https://steindorf-turnier-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "steindorf-turnier.firebasestorage.app",
  messagingSenderId: "467666979224",
  appId: "1:467666979224:web:92cd770d9f5b70db1fc3ed",
  measurementId: "G-PMMLNFY1H2"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

export { ref, onValue, set, get };
