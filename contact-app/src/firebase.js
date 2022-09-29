
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRd0OdZtsOEMxpsXyW9HcgFgWVlTxYA6g",
    authDomain: "uploading-file-4f802.firebaseapp.com",
    projectId: "uploading-file-4f802",
    storageBucket: "uploading-file-4f802.appspot.com",
    messagingSenderId: "133199340690",
    appId: "1:133199340690:web:b31202bae117b63a8bf24b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);