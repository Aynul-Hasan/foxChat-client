import axios from "axios"
// import  {  useState } from 'react'
export const createChat=async(userId,logUserId)=>{
    try{
        const info={userId,logUserId}
        // console.log(info)
        const {data}= await  axios.post("https://calm-plains-76927.herokuapp.com/chat/",info)
        return data
    }catch(err){
        console.log(err)
    }
}
export const usegetAllChats=async(logUserId)=>{
    
    try{
        console.log(logUserId)
        const {data}= await axios.get(`https://calm-plains-76927.herokuapp.com/chat/${logUserId}`)

        return data
    }catch(err){

    }
}
export const isSameSender=(message,m,i,userId)=>{
    console.log( i < message.length - 1 &&
        (message[i + 1].sender._id !== m.sender._id ||
            message[ i + 1].sender._id === undefined) &&
            message[i].sender._id !==userId)
    return(
        i < message.length - 1 &&
        (message[i + 1].sender._id !== m.sender._id ||
            message[ i + 1].sender._id === undefined) &&
            message[i].sender._id !==userId
    );
};
export const islastmessage=(message,i,userId)=>{
    console.log( )
    return(
        i === message.length -1 &&
        message[message.length -1].sender._id !== userId &&
        message[message.length -1].sender._id
    );
};