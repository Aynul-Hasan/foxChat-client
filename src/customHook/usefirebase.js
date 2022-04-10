import axios from 'axios';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseInitapp from "../firebase/firebaseinit.js";

// import { useLocation, useNavigate } from "react-router-dom";
firebaseInitapp();
const useFirebase=()=>{
    const [user, setUser] = useState(null)
    const [admin, setadmin] = useState()
    const [chats, setchats] = useState([]);
    const [curChatBox, setcurChatBox] = useState({});
    const [isLoading, setisLoading] = useState(true)
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    
    const singIngoogle=async(location,navigate)=>{
        try{
            setisLoading(true)
            const res= await signInWithPopup(auth, googleProvider)
            usersaveinDatabase(res.user.displayName,res.user.email,res.user.photoURL)
            if(res.user.email){
                navigate(location?.state?.from||"/")
             }
            setisLoading(false)
           return res

        }catch(err){
                setUser(null)
        }
       
    }
    const pushusername=async(name)=>{
        const res=await  updateProfile(auth.currentUser, {
              displayName: name
            })
            console.log(res)
      }
      const usersaveinDatabase=async(name,email,image)=>{
          try{
            //   console.log(name,email,iamge)
              
              const data={name,email,image}
                const res= await axios.post('https://calm-plains-76927.herokuapp.com/user/',data)

          }catch(err){

          }
      }
    const createnewAccount=async(email,password,name,image)=>{
        setisLoading(true)
        try{
            console.log(name,email,password,image)
            const res=await createUserWithEmailAndPassword(auth, email, password)
            pushusername(name)
            usersaveinDatabase(name,res.user.email,image)
            setUser(res.user)
             setisLoading(false)
             return res.user
        }catch(err){
            setUser(null)
        }

    }

    const loginwithEmail=async(email,password)=>{
        try{
           const res=await  signInWithEmailAndPassword(auth, email, password)
           setUser(res.user)
           setisLoading(false)
           return res.user
        }catch(err){
            // console.log(err)
            setUser(null)
            return 400
        }

    }

    useEffect(() => {
       const unsubcribe= onAuthStateChanged(auth, (user) => {
           setisLoading(true)
            if (user) {
             setUser(user)
              
            } else {
             setUser(null)
            }
            setTimeout(() => {
                setisLoading(false)
            }, 1500);
           
          });
          return ()=> unsubcribe
    }, [])
   const callChats=async(id)=>{
       try {
        const {data}= await axios.get(`https://calm-plains-76927.herokuapp.com/chat/${id}`)
        setchats(data)
       } catch (error) {
           
       }
   }
    const logout=async()=>{
        try{
            setisLoading(true)
            const res=signOut(auth)
            setUser(null)
            setisLoading(false)
            // document.getElementsByClassName("modal-backdrop").classList.remove("modal-backdrop");
            // window.location.reload()
        }catch(err){

        }
    }

    return{chats,setchats,curChatBox,setcurChatBox,user,admin,logout,singIngoogle,createnewAccount
        ,loginwithEmail ,isLoading ,setUser,setisLoading,callChats}
}
export default useFirebase;