import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCTRhG41V8Lwl5q-vS_TM5s1X5j_c9i4SU",
  authDomain: "testimgup-494b0.firebaseapp.com",
  projectId: "testimgup-494b0",
  storageBucket: "testimgup-494b0.appspot.com",
  messagingSenderId: "616840028141",
  appId: "1:616840028141:web:c2e518fce8347f46b791e4",
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
