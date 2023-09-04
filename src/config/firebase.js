import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyAcQ8_YcLIZyjEBsdQ_L0SHh2h8euImBuE",

  authDomain: "twittelopes-a5620.firebaseapp.com",

  projectId: "twittelopes-a5620",

  storageBucket: "twittelopes-a5620.appspot.com",

  messagingSenderId: "17220167013",

  appId: "1:17220167013:web:ff8464f7c13e57046e6d8c"

};

const uploadToFirebase = async (uri, name) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();

  const imageRef = ref(getStorage(), `images/${name}`);
  const uploadTask = (uploadBytes(imageRef, theBlob));
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth, uploadToFirebase };