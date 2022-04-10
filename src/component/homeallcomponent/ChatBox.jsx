// import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../customHook/useAuth";
import GroupChat from "./GroupChat";
const ChatBox = ({ event, chatuser, userData, click, setseletedChat }) => {
  const [dataLoding, setdataLoding] = useState(false);
  // const color="#2ede83"

  // console.log(userData.email)
  const { setchats, chats } = useAuth();
  console.log(chats);
  useEffect(() => {
    const getData = async () => {
      setdataLoding(true);
      const { data } = await axios.get(
        `https://calm-plains-76927.herokuapp.com/chat/${userData?._id}`
      );
      // console.log(data)
      setchats(data);

      setdataLoding(false);
      // console.log(`hi`)
    };
    getData();
  }, [event, setchats, userData?._id, click]);
  // event,userData,click,chatuser,userData

  return (
    <>
      {/* {dataLoding?<div className="text-center"><ScaleLoader color={color}/></div>:""} */}
      {chats.map((chat) => (
        <ChatList
          key={chat._id}
          curuserId={userData?._id}
          chat={chat}
          event={event}
          setseletedChat={setseletedChat}
        />
      ))}
      <div className="">
        <GroupChat userId={userData._id} setchats={setchats} chats={chats} />
      </div>
    </>
  );
};
const ChatList = ({ event, chat, setseletedChat, curuserId }) => {
  const { user, setcurChatBox } = useAuth();
  const id = chat.users.filter((chatuser) => chatuser.email !== user.email);
  const setData = (_id, user) => {
    // console.log(chat)
    setseletedChat(_id);
    setcurChatBox(user);
    event(true);
  };
  return (
    <>
      <div
        onClick={() => setData(chat?._id, id[0])}
        className="container chat py-2 d-flex mt-1 align-items-center"
      >
        <div className="chat-img-div position-relative">
          <img
            src={id[0]?.image}
            width="50"
            className=" rounded-circle"
            alt=""
          />
          {/* <div className="status-i"> </div> */}
        </div>
        <div className=" ms-2 w-100 d-flex justify-content-between align-items-center">
          <div className="chat-contain">
            <strong>{chat.isGroupChat ? chat.chatName : id[0].name}</strong>
            <br />
            <p>
              {curuserId === chat?.latestMessage?.sender?._id
                ? "You"
                : chat?.latestMessage?.sender?.name}
              :{chat?.latestMessage?.content}
            </p>
          </div>
          {/* {chat?.latestMessage?.sender?.name}: */}
          <div className="chat-time">
            {/* <p className="text-end">20:40</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
