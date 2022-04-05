import React,{useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../customHook/useAuth'
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const {singIngoogle,loginwithEmail}=useAuth();
        const [email, setemail] = useState('');
        const [password, setpassword] = useState('');
        let navigate = useNavigate();
        const location= useLocation()
        const loginData=async()=>{
            if(!email||!password){
               return toast.error('Please fill the all field😡😡😡', {
                    position: "top-center",
                    autoClose: 3000,
                    });
                // return
            }
             const data=await loginwithEmail(email,password)
            //  console.log(data)
             if(data===400){
                return toast.error('Worng information 🤬🤬🤬', {
                    position: "top-center",
                    autoClose: 3000,
                    });
             }
            if(data.email){
                toast.success(`Welcome ${data.displayName}💚💚💚`, {
                    position: "top-center",
                    autoClose: 1500,
                    });
              setTimeout(() => {
               navigate(location?.state?.from||"/")
              }, 1500);      
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
                    <h3 className="text-center">Login</h3>
                    <div className="text-center">
                        <input className="chat-input" value={email}    onChange={(e)=>setemail(e.target.value)} placeholder="Email" type="text" /><br />
                        <input className="chat-input" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder="password**" type="password" /><br />
                        <button onClick={loginData} className="chat-btn">Login</button>
                        <ToastContainer/>
                    </div>
                </div>
                <div className="text-center mt-3">
                    <p>Login with</p>
                    <span onClick={()=>singIngoogle(location,navigate)}><img width="50" src="./img/google.png" alt="" /></span>
                </div>   
                <div className="pb-5 text-center">
                    <p>Don't have an account ? <Link to="/signup"> Signup now</Link></p>
                </div>
                <div className="pt-5 pb-3 text-center">
                    <p>© 2022 Foxchat. Aynul &#128525;</p>
                </div>
            </div>
        </>
    )
}

export default Login
