import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyD6T9JhGrAlgGpJbwNE5Ahyvxwoma8xLRI",
  authDomain: "cosmos-16de1.firebaseapp.com",
  projectId: "cosmos-16de1",
  storageBucket: "cosmos-16de1.appspot.com",
  messagingSenderId: "605832186824",
  appId: "1:605832186824:web:d5942c1aed0de2d9d48efd",
  measurementId: "G-SBRKJGGCZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imDB = getStorage(app)
const analytics = getAnalytics(app);

export {imDB};