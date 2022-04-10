import axios from "axios";
import React, { useState } from "react";
import useAuth from "../../customHook/useAuth";

const GroupChat = ({ userId }) => {
  const { user, setchats, chats } = useAuth();
  const [groupName, setgroupName] = useState("");
  const [selectUsers, setselectUsers] = useState([]);
  const [search, setsearch] = useState("");
  const [searchResult, setserachResult] = useState([]);
  const [loading, setloading] = useState(false);

  const handleSeach = async (data) => {
    setsearch(data);
    if (!data) {
      setserachResult([]);
      return;
    }
    try {
      setloading(true);
      const { data } = await axios.get(
        `https://calm-plains-76927.herokuapp.com/user/api?search=${search}`
      );
      setloading(false);
      const res = data.filter((d) => d.email !== user.email);
      setserachResult(res);
      // console.log(res)
    } catch (error) {
      console.log(error);
    }
  };
  const handleGroup = (userTo) => {
    if (selectUsers.includes(userTo)) {
      return;
    }
    setselectUsers([...selectUsers, userTo]);
  };
  const removeToSelect = (_id) => {
    const remove = selectUsers.filter((u) => u._id !== _id);
    setselectUsers(remove);
  };
  const createGroup = async () => {
    if (!groupName || !selectUsers) {
      return;
    }
    try {
      const info = {
        name: groupName,
        users: JSON.stringify(selectUsers.map((u) => u._id)),
      };
      const { data } = await axios.post(
        `https://calm-plains-76927.herokuapp.com/chat/group/${userId}`,
        info
      );
      // console.log(data)
      setchats([data, ...chats]);
      setgroupName("");
      setselectUsers([]);
      setserachResult([]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <button
          className="group-btn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal1"
          data-bs-placement="top"
          title="Create a group"
        >
          <img
            src="https://img.icons8.com/fluency/96/000000/add-user-group-man-man.png"
            width="40px"
            alt=""
          />
        </button>
      </div>
      {/* <!-- Modal --> */}
      <div
        className="modal fade modal-in"
        id="exampleModal1"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Group{" "}
                <img
                  src="https://img.icons8.com/color/96/000000/group.png"
                  width="60"
                />
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <input
                  type="text"
                  placeholder="Group Name"
                  className="chat-input"
                  value={groupName}
                  onChange={(e) => setgroupName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Group members: "
                  className="chat-input"
                  onChange={(e) => handleSeach(e.target.value)}
                />
              </div>

              {/* show selected user */}
              <div className="d-flex mb-3">
                {selectUsers.map((u) => (
                  <div className="m-1 " key={u._id}>
                    <div className="d-flex p-1 bg align-items-center">
                      {/* <p className="m-0">{u.name}</p> */}
                      <img
                        src={u.image}
                        width="30"
                        className="rounded-circle"
                        alt=""
                      />
                      <button
                        onClick={() => removeToSelect(u._id)}
                        type="button"
                        className="btn-close btn-sm"
                        aria-label="Close"
                      ></button>
                    </div>
                  </div>
                ))}
              </div>
              {/* show serach */}
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : (
                searchResult?.slice(0, 4).map((user) => (
                  <div
                    onClick={() => handleGroup(user)}
                    key={user._id}
                    className="show-user-result"
                  >
                    <div className="d-flex align-items-center ">
                      <img
                        src={user?.image}
                        width="40"
                        className="rounded-circle"
                        alt=""
                      />
                      <p className="pt-2 ps-2">{user.name}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="modal-footer">
              <button
                onClick={createGroup}
                type="button"
                data-bs-dismiss="modal"
                className="btn bg"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupChat;
