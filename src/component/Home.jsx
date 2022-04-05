import React,{useState} from 'react'
import ChatBox from './homeallcomponent/ChatBox'
import ChatNav from './homeallcomponent/ChatNav'
import MsgBox from './homeallcomponent/MsgBox'
import Navbar from './homeallcomponent/Navbar'
import ProfileModal from './homeallcomponent/ProfileModal'
import useData from '../customHook/useData';
import useAuth from '../customHook/useAuth'
// import useChat from '../customHook/usechat'

const Home = () => {
    // const [chats, setchats] = useState([]);
    const [addMsgbox, setaddMsgbox] = useState(false)
    const [click, setclick] = useState(false);
    const [seletedChat, setseletedChat] = useState();
    const{user}= useAuth()
    const [userData]=useData(`http://localhost:8000/user/${user.email}`)
    const [chatUser, setchatUser] = useState(0);
    const [curChatBox, setcurChatBox] = useState({});
    // console.log(seletedChat)
    
    return (
        <>
        <div className="container-fluid p-0 home">
            <div className="chat-intro">
            
                <Navbar userData={userData} event={setclick}/>
                <div className={click?"d-block":"d-none"}>
                    <ProfileModal logUserId={userData?._id} setchatUser={setchatUser}
                     setaddMsgbox={setaddMsgbox}
                     event={setclick}   />
                </div>
                <div className="mt-5 chat-box">
                    <ChatBox userData={userData} chatUser={chatUser} 
                      event={setaddMsgbox}
                      setseletedChat={setseletedChat} setcurChatBox={setcurChatBox}
                       click={click}/>
                {/* {dataLoading? <div className="text-center">  <ScaleLoader color={color} /></div>:""} */}
                {/* {chats.map((chat)=><ChatBox key={chat._id} chat={chat} event={setaddMsgbox} />)  } */}
               
                </div>
            
            </div>
            <div  className={addMsgbox?"chat-main show-msg-box":"chat-main"}>
               <ChatNav setchatUser={setchatUser} chatUser={userData?._id} seletedChat={seletedChat} curChatBox={curChatBox} 
                event={setaddMsgbox} /><hr className="" />
               <MsgBox seletedChat={seletedChat} chatUser={userData?._id} />
            </div>
        </div>
        </>
    )
}

export default Home
