import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'

const SingleChat = ({allMessage,chatUser}) => {
  return (
    <>
        <ScrollableFeed>
                          { allMessage.map((m,i)=>(
                              <div className="d-flex ps-3 mb-1" key={m?._id}>
                                 { 
                                    // (  isSameSender(allMessage,m,i,chatUser)|| islastmessage(allMessage,i,chatUser))
                                    (<>
                                       <div className={m.sender._id===chatUser?'d-none':"d-block"}> <img width="37" src={m.sender.image} alt="" /> </div> 
                                       <div className={m.sender._id===chatUser?"owner-msg":"user-msg ms-2"}>
                                           <p className="mb-0 mt-1">{m.content}</p>
                                        </div>
                                     

                                        </>
                                    )
                                 }
                              </div>
                              
                          ))}
                           
                          </ScrollableFeed>
    </>
  )
}

export default SingleChat