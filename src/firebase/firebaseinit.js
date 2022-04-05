import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseconfig.js";
const firebaseInitapp=()=>{
    initializeApp(firebaseConfig)
}
export default firebaseInitapp;