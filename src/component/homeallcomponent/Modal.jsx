import axios from 'axios';
import React,{useEffect,useState} from 'react';
import useAuth from '../../customHook/useAuth';

const Modal = ({userData}) => {
  const [dataImage, setdataImage] = useState([])
  const [image, setimage] = useState('')
  const callAvater=async()=>{
    var imgs=[]
    try {
        for(let i=0;i<4;i++){
            const images = await `https://api.multiavatar.com/${Math.round(Math.random()*1000000)}.png`
            imgs.push(images)
        }
        setdataImage(imgs) 
    } catch (error) {
        
    }

  }
  // console.log(userData._id)
  useEffect(() => {
    callAvater()
  }, [])
  
  const changeAvater=async()=>{
    try {
      const {data}=await axios.put(`http://localhost:8000/user/${userData._id}`,{image} )
      // console.log(data)
      window.location.reload()
    } catch (error) {
      
    }
  }
  const {logout}=useAuth()
  return (
      <>
      {/* <!-- Modal --> */}
           <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
             <div className="modal-dialog">
               <div className="modal-content">
                 <div className="modal-header">
                   <h5 className="modal-title" id="exampleModalLabel">My Profile</h5>
                   <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                 </div>
                 <div className="modal-body text-center">
                 <div className="mt-3">
                    <img className="rounded-circle" width="130" src={userData?.image} alt="" />
                 </div>
                 <div>
                 <h4>{userData?.name}</h4>
                 {/* <p></p> */}
                </div>
                 </div>
                    {/*  */}
                    <div className="accordion accordion-flush" id="accordionExample"> 
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                          Edit Profile <img width="40" src="./img/edit-user.png" alt="" />
                        </button>
                      </h2>
                      <div id="flush-collapseOne" className="accordion-collapse collapse text-center" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                              <div className="my-4">
                              <div className="d-flex align-items-center justify-content-center mb-3">
                                  {dataImage.map((img)=> <div className={image===img? "avatar-border m-3" :"rounded-circle m-3"} onClick={()=>setimage(img)}  key={img}>
                                     <img src={img} width="50" alt='avater' /></div>)}
                              </div>
                              <button type="button" className="chat-btn" data-bs-toggle="tooltip" data-bs-dismiss="modal" onClick={changeAvater}>Change your profile picture </button>
                              </div>
                      </div>
                    </div>
                    </div>
                 <div className="modal-footer">
                 <button onClick={logout} className="modal-btns" data-bs-toggle="tooltip" data-bs-dismiss="modal" data-bs-placement="top" title="Logout"> <img src="./img/icons8-web-secure-session-sign-out-internet-logoff-36.png" alt="" /></button>
                 </div>
               </div>
             </div>
           </div>


      
      </>
  )
};

export default Modal;
