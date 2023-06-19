import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBwf71WhyetB40YwNwoWWb2t-RhHul_Y6s',
  authDomain: 'telegram2-4f465.firebaseapp.com',
  projectId: 'telegram2-4f465',
  storageBucket: 'telegram2-4f465.appspot.com',
  messagingSenderId: '1063822022951',
  appId: '1:1063822022951:web:53f8b502b8d6407d9fb102',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let db = getFirestore(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
