import  { useEffect, useState } from 'react'
import axios from 'axios'
const useData=(url)=>{
    // console.log(url)
    const [userData, setcardData] = useState([])
    const [dataLoding, setdataLoding] = useState(false)
    // const [chats, setchats] = useState([]);
   useEffect(() => {
        const getData=async()=>{
            setdataLoding(true)
            const res= await axios.get(url)
            // console.log(res.data)
            setcardData(res.data)
            setdataLoding(false)
        }
        getData()
   }, [url])
//    const getallChat=async(logUserId)=>{
       
//     const {data}= await axios.get()
//     return data
//    }
//    console.log(userData)
   return [userData,dataLoding]
}
export default useData
