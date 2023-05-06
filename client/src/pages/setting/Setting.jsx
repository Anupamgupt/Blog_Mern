import "./setting.css";
import Sidebar from "../../components/sidebar/Sidebar";
import gojo from "../../assets/images/gojo.jpeg"
import { FaUser } from "react-icons/fa";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {
  const { user,dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success,setSuccess]=useState(false)
  const PF="http://localhost:5000/images/"

  // console.log(user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    }
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (e) {
        console.log(e);
      }
    }
    try {
      const res=await axios.put(`/users/${user._id}`, updatedUser);
      dispatch({type:"UPDATE_SUCCESS",payload:res.data})
      setSuccess(true);
    } catch (e) {
      console.log(e);
      dispatch({type:"UPDATE_FAILURE"})
    }
  };
  const photo= user.profilePic ? PF+user.profilePic:gojo ;

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img src={file ? URL.createObjectURL(file): photo} alt="" />
            <label htmlFor="fileInput">
              <FaUser />
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            name="name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="*****"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {success && <span>Profile updated successfully</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
