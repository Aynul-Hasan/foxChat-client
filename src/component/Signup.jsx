import React,{useState,useEffect} from 'react'
import { Link,  useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../customHook/useAuth'
import { ToastContainer, toast } from 'react-toastify';
// import axios from 'axios';
const Signup = () => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [image, setimage] = useState('');
    const [islodding, setislodding] = useState(false);
    const [dataImage, setdataImage] = useState([])
    const {singIngoogle,createnewAccount}=useAuth();
    const [isOff, setisOff] = useState(false)
    let navigate = useNavigate();
        const location= useLocation()
    // console.log(dataImage)  
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
    const moreAvater=()=>{
        callAvater()
        setisOff(true)
    }
  
    useEffect(() => {
        callAvater()
    }, [])
    console.log(image)
    // const postDetails=(e)=>{
    //     setislodding(true)
    //     if(e.type=== "image/jpeg"||e.type==="image/jpg"|| e.type=== "image/png"){
    //         if(e.size<1100000){
    //         const data =new FormData();
    //         data.append("file",e)
    //         data.append("upload_preset","foxchat")
    //         data.append("cloud_name",'do5vj0zgw')
    //         fetch("https://api.cloudinary.com/v1_1/do5vj0zgw/image/upload",{
    //             method:"post",
    //             body:data
    //         }).then((res)=>res.json())
    //         .then((r)=>{
    //             setimage(r.url.toString())
    //             setislodding(false)
    //         })
    //         .catch((err)=>console.log(err))
    //     }
    //     else{
    //         console.log('hi')
    //     }
    //     }
    // }
    const sentData=async()=>{
        if(!email||!password||!name){
            return toast.error('Please fill the all field😡😡😡', {
                    position: "top-center",
                    autoClose: 3000,
                    });
        }else{
        setislodding(true)
         const data= await createnewAccount(email,password,name,image)
         console.log(data)
         if(data?.email){
            toast.success(`Welcome ${data?.displayName}💚💚💚`, {
                position: "top-center",
                autoClose: 1500,
                });
          setTimeout(() => {
           navigate(location?.state?.from||"/")
          }, 1500); 
          setislodding(false)
         }else{
            return toast.error('wrong information😡😡😡', {
                position: "top-center",
                autoClose: 3000,
                });
         }
        }
    }
    return (
        <>
             <div className="container-fluid login">
                <div className="d-flex justify-content-center align-items-center">
                    <img src="./img/logo.png" alt="" />
                    <h2>Foxchat</h2>
                </div>
                <div className="container">
                    <h3 className="text-center">Signup</h3>
                    <div className="text-center">
                        <input className="chat-input" value={name} onChange={(e)=>setname(e.target.value)} placeholder="Name*" type="text" /><br />
                        <input className="chat-input" value={email} onChange={(e)=>setemail(e.target.value)} placeholder="Email*" type="text" /><br />
                        <input className="chat-input" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder="password*" type="password" /><br />
                       <div className="d-flex justify-content-center align-items-center"> { dataImage.map((img)=>(
                       <div className={image===img? "avatar-border m-3" :"rounded-circle m-3"} onClick={()=>setimage(img)}  key={img}>
                           <img  src={img} width="50" alt="avater" />
                           </div>))} <div className={isOff?"d-none":"d-block"}><button onClick={moreAvater} className="btn btn-sm">More</button></div> </div>
                       
                        <p className="text-danger">Note:Fill in the input fields marked with a star.</p>
                       {islodding?(
                           <div className="spinner-border bg-color" role="status">
                           {/* <span className="visually-hidd>en">Loading...</span */}
                         </div>
                         
                       ) : <button onClick={sentData} className="chat-btn">Sing Up</button>}
                       <ToastContainer/>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <p>Signup with</p>
                    <span onClick={singIngoogle}><img width="50" src="./img/google.png" alt="" /></span>
                </div>                                                                  
                <div className="pb-4 text-center">
                    <p>Already have an account ?  <Link to="/login"> Login now</Link></p>
                </div>
                <div className="pt-3 pb-3 text-center">
                    <p>© 2022 Foxchat. Aynul &#128525;</p>
                </div>
            </div>
        </>
    )
}

export default Signup
 {/* <input className="chat-input" placeholder="Avater" type="file" accept="image"
                         onChange={(e)=>setdataImage(e.target.files[0])} /><br /> */}