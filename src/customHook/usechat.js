import  { useEffect, useState } from 'react'
import axios from 'axios'
const useChat=(url,condition)=>{
    // console.log(url)
    const [chats, setChats] = useState([])
    const [dataLoding, setdataLoding] = useState(false)
    // const [chats, setchats] = useState([]);
   useEffect(() => {
        const getData=async()=>{
            setdataLoding(true)
            const res= await axios.get(url)
            // console.log(res.data)
            setChats(res.data)
            setdataLoding(false)
        }
        getData()
   }, [condition])
   return [chats,dataLoding]
}
export default useChat
