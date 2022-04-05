import axios from 'axios';
import React ,{useState} from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";
import useAuth from '../../customHook/useAuth';
import {createChat} from '../../customHook/logics.js'

const ProfileModal = ({event,logUserId,setaddMsgbox}) => {
    const [Search, setSearch] = useState("");
    const [users, setusers] = useState([]);
    const [loading, setloading] = useState(false);
    const {user,setchats,chats}=useAuth()
    
    const color="#2ede83"
    const searchUsers=async()=>{

            try{
               if(!Search){
                   return
               }else{
                setloading(true)
                setusers([])
                const {data}=await axios.get(`http://localhost:8000/user/api?search=${Search}`)
                const res= data.filter((d)=>d.email!== user.email)
                setusers(res)
                // console.log(data)
                setloading(false)
                // setchatUser(true)
            }

            }catch(error){

            }
    }
    const chatcreate=async(userId)=>{
       const data=await createChat(userId,logUserId)
    //    console.log(data)
       setchats([...chats,data])
        // setnum(num+1)
        event(false)
        setaddMsgbox(true)
    }

  return (
      <>
         <div className="profile-modal text-center">
            <div onClick={()=>event(false)} className="text-end mt-1">
            <i className="fas fa-2x fa-times"></i>
            </div> 
             <div className="mt-3 d-flex">
             <input  className="search-input" onChange={(e)=>setSearch(e.target.value)} value={Search} placeholder="Search New user" type="text" />
             <button onClick={searchUsers} className="modal-btns pb-3"><img width="45" src="https://img.icons8.com/external-dreamstale-green-shadow-dreamstale/64/000000/external-search-seo-media-dreamstale-green-shadow-dreamstale.png"/></button>
               
             </div>
             <div>
                {loading? <ScaleLoader color={color}/>:""}
               {users?.map((user)=> <div key={user._id} onClick={()=>chatcreate(user._id)} className="d-flex user-display align-items-center px-4">
                    <img className="rounded-circle" width="40" src={user?.image} alt="" />
                    <strong className="ms-3 ">{user?.name}</strong>
                </div>)}
             </div>
           
         </div>
      </>
  )
};

export default ProfileModal;
