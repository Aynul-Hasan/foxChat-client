import axios from 'axios';
import React,{useState} from 'react'
import useAuth from '../../customHook/useAuth'
import { ToastContainer, toast } from 'react-toastify';
const ChatNav = ({event,seletedChat,chatUser}) => {
    const {user:curUser,curChatBox,chats,callChats}=useAuth()
    const user= chats.filter((chat)=>seletedChat===chat._id)
    // const userData=user.users.filter((u)=>curUser.email!==u.email)
    const [groupName, setgroupName] = useState('');
    const [selectUsers, setselectUsers] = useState([]);
    const [searchResult, setserachResult] = useState([]);
    const [loading, setloading] = useState(false);
    const [search, setsearch] = useState('');
    // const [groupData, setgroupData] = useState(user)
    // console.log(chats)
    const handleSeach=async(data)=>{
        setsearch(data)
        if(!data){
            setserachResult([])
            return
        }
        try {
            setloading(true)
            const {data}=await axios.get(`http://localhost:8000/user/api?search=${search}`)
            setloading(false)
            const res= data.filter((d)=>d.email!== curUser.email)
            setserachResult(res)
            // console.log(res)    
        } catch (error) {
            console.log(error)
        }   

    }

    const handleGroup=(userTo)=>{
        if(selectUsers.includes(userTo)){
            return
        }
        setselectUsers([userTo])
    }
    const removeToSelect=(_id)=>{
        const remove=selectUsers.filter((u)=>u._id!==_id)
        setselectUsers(remove)
    }
    const changeGroupName=async()=>{
        if(!groupName){
            return
        }
        try {
            const info={
                    chatId:user[0]?._id,
                    chatName:groupName
            }
            // console.log('hi')
            const {data}= await axios.put(`http://localhost:8000/chat/rename`,info)
            setgroupName('')
            callChats(chatUser)
            
        } catch (error) {
            console.log(error)
        }
    }
    const AddMemberInGroup=async(_id)=>{
        try {
            console.log(_id)
            const info={
                groupId:user[0]?._id,
                newmemberId:_id
            }
            const {data}= await axios.put(`http://localhost:8000/chat/addmember`,info)
            setselectUsers([])
            callChats(chatUser)
            
        } catch (error) {
            
        }
    }
    const removeMemberIntoGroup=async(_id)=>{
        try {
            const info={
                groupId:user[0]?._id,
                removememberId:_id
            }
            const {data}= await axios.put(`http://localhost:8000/chat/removemember`,info)
            callChats(chatUser)
            if(data){
                toast.success(`remove a menber💚💚💚`, {
                    position: "top-center",
                    autoClose: 1500,
                    });
            }
            
        } catch (error) {
            
        }
    }
    // console.log(curChatBox)
    return (
        <>
            <div className="container d-flex align-items-center justify-content-between mt-4">
                <div className="d-flex align-items-center">
            <div onClick={()=>event(false)} className="me-3">
              
                <i className="fas bg-color fa-arrow-left"></i>
                </div>
                <div>
                    <img className="rounded-circle" src={curChatBox.image} width="50" alt="" />
                </div>
                <div className="ms-3">
                    <strong>{user[0]?.isGroupChat?user[0]?.chatName:curChatBox?.name}</strong>
                </div>
                {/* <div className="status-chatNav"></div> */}
                </div>
                {user[0]?.isGroupChat?(
                <div>
                   <button className="modal-btn" data-bs-toggle="modal" data-bs-target="#exampleModal3"> <img width=""   src="https://img.icons8.com/external-anggara-flat-anggara-putra/32/000000/external-Setting-user-interface-anggara-flat-anggara-putra-2.png" alt=""/></button>
                    {/* modal */}
                    <div className="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{user[0]?.chatName}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h6>Group Member</h6>
                            <div className="d-flex align-items-center">
                            {user[0].users.map((u)=><div key={u._id} className=' p-1 m-1 bg '>
                                <img src={u.image} width="30" alt="" />
                           {user[0]?.groupAdmin.email===curUser.email? <button onClick={()=>removeMemberIntoGroup(u._id)} type="button"
                            className="btn-close btn-sm"  aria-label="Close"></button>:''
                             }
                            </div>)}
                            </div>
                            {/* upadete the group name */}
                            <div className="d-flex mt-3">
                            <input type="text" onChange={(e)=>setgroupName(e.target.value)} value={groupName} className=" form-control" placeholder="Group name" />
                             <button className="btn bg text-white" onClick={changeGroupName}>Update</button>
                             </div>


                             {/* seleted users */}

                             <div className="d-flex my-3">
                      {selectUsers.map((u)=><div className="m-1 " key={u._id}>
                          <div className="d-flex p-1 bg align-items-center">
                          {/* <p className="m-0">{u.name}</p> */}
                          <img src={u.image} width="30" className="rounded-circle" alt="" />
                          <button onClick={()=>removeToSelect(u._id)} type="button" className="btn-close btn-sm"  aria-label="Close"></button>
                          </div>
                      </div>)}
                      </div>
                             {/* search input */}
                   {user[0]?.groupAdmin.email===curUser.email? <div className="mt-3 d-flex">
                    <input type="text" className="form-control"  onChange={(e)=>handleSeach(e.target.value)} placeholder="add group member" />
                    <button className="btn bg text-white" onClick={()=>AddMemberInGroup(selectUsers[0]._id)}>Add</button>
                    </div>:''}
                             {/* search result  */}
                             {loading?(<div className="text-center">Loading...</div>):(
                         searchResult?.slice(0,4).map((user)=><div className="pt-3" onClick={()=>handleGroup(user)} key={user._id} className="show-user-result">
                         <div className="d-flex align-items-center">
                             <img src={user?.image} width="40" className="rounded-circle" alt="" />
                             <p className="pt-2 ps-2">{user.name}</p>
                         </div>
                   </div>)
                          
                     )}
                             {/* add button */}
                             
                        </div>

                        <div className="modal-footer">
                            <button type="button" onClick={()=>removeMemberIntoGroup(chatUser)} className="btn btn-danger" data-bs-dismiss="modal">Leave Group</button>
                        </div>
                        </div>
                    </div>
                    </div>
              </div>
                ):''}
            </div>
        </>
    )
}

export default ChatNav
