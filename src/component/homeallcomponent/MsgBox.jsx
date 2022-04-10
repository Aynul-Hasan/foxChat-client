import axios from 'axios'
import React,{useState,useEffect} from 'react'
import Lottie from 'react-lottie'
import animationData from "../../animations/typing.json"
import animationDatas from "../../animations/robot-says-hello"

// import { islastmessage, isSameSender } from '../../customHook/logics'
import {io} from "socket.io-client"
import SingleChat from './SingleChat'
const ENDPOINT='http://localhost:8000'
 let socket, selectetChatCompare
const MsgBox = ({seletedChat,chatUser}) => {
   
    const [isloding, setisloding] = useState(false)
    const [allMessage, setallMessage] = useState([])
    const [newMessage, setnewMessage] = useState('')
    const [socketcon, setsocketcon] = useState(false)
    const [typeing, settypeing] = useState(false)
    const [isTypeing, setisTypeing] = useState('')

    const defaultOptions={
        loop:true,
        autoplay:true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    }
    const defaultOptionsSecond={
        loop:true,
        autoplay:true,
        animationData: animationDatas,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    }    
    useEffect(() => {
        socket=io(ENDPOINT)
        socket.emit('setup',chatUser)
        socket.on('connected',()=>setsocketcon(true))
        socket.on('typeing',()=>setisTypeing(true))
        socket.on('stop typeing',()=>setisTypeing(false))

    }, []) 
    
    useEffect(() => {
        getallmessage()
        selectetChatCompare=seletedChat
    }, [seletedChat])
    const msgRecieved=()=>{
        socket.on("message recieved",(newMessageRecieved)=>{
            if(!selectetChatCompare || selectetChatCompare !== newMessageRecieved.chat._id){
                console.log('he')
            }
            else{
                setallMessage([...allMessage,newMessageRecieved])
            }
        })
    }
   useEffect(() => {
        // console.log('ji')
        msgRecieved()
   }) 
    const sendMessage=async()=>{
        if(!newMessage){
            return
        }
        socket.emit("stop typeing", seletedChat)
        const info={
            sender:chatUser,
            content:newMessage,
            chatId:seletedChat
        }
        try {
            const {data}=await axios.post(`http://localhost:8000/message`,info)
            // console.log(data)
            setnewMessage('')
            socket.emit("new message",data)
            setallMessage([...allMessage,data])
           

        } catch (error) {
            
        }
      
    }
    
    const getallmessage=async()=>{
        if(!seletedChat)return
        setisloding(true)
        try {
            const {data}=await axios.get(`http://localhost:8000/message/${seletedChat}`)
            setallMessage(data)
            setisloding(false)
            socket.emit('join chat',seletedChat)
        } catch (error) {
            
        }
    }

  

   const typingHandler=(e)=>{
    setnewMessage(e.target.value)
    if(!socketcon){return}
    if(!typeing){
        settypeing(true);
        socket.emit('typeing',seletedChat)
    }
    let lastTypingTime=new Date().getTime()
    var timelength=3000
    setTimeout(() => {
        var timeNow= new Date().getTime()
        var timeDiff= timeNow - lastTypingTime;
        if(timeDiff>= timelength && typeing){
            socket.emit("stop typeing",seletedChat)
            settypeing(false)
        }
    }, timelength );
}
   
    // console.log(allMessage)
    
    return ( 
        <>{seletedChat?
            <div>
                <div className="msg-container">
                    {isloding?(<div className="text-center m-auto">
                        <div className="spinner-grow" role="status">
                        </div>
                      </div>):(
                          <SingleChat allMessage={allMessage} chatUser={chatUser}/>
                      )}
                     {isTypeing ?(<div className="typing-div text-center"><Lottie options={defaultOptions} height={30}></Lottie></div>):(<></>)}
                </div>
                
            <div className="container-fluid d-flex justify-content-evenly align-items-center">
                <textarea className="msg-input" value={newMessage} onChange={typingHandler} placeholder="Enter your Message...."></textarea>
               
                <div>
                    <button onClick={sendMessage} className="send-msg-btn"><i className="fas fa-2x fa-paper-plane"></i></button>
                </div>
            </div>
            </div>
   : <div className="text-center"><Lottie options={defaultOptionsSecond} height={170} width={200}></Lottie><br />
     <h5> Please select a chat to start messageing.</h5>
     </div> }
        </>
    )
}

export default MsgBox

