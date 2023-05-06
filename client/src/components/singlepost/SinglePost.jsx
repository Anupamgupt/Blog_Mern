import "./singlepost.css";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";
import { useContext } from "react";

function SinglePost() {
  const location = useLocation();
  const { user } = useContext(Context);
  const path = location.pathname.split("/")[2];
  const PF = "http://localhost:5000/images/";
  // console.log(path)
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    try {
      const getPost = async () => {
        const res = await axios.get("/posts/" + path);
        console.log(res)
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        // console.log(post)
      };
      getPost();
    } catch (e) {
      console.log(e);
    }
  }, [path]);
  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (e) {
      console.log(e);
    }
  }

  const handleUpdate = async () =>{
    try{
      await axios.put("/posts/" + path,{
        username:user.username,
        title,
        desc
      })
      // window.location.reload();
      setUpdateMode(false)
    }catch(e){
      console.log(e);
    }
  
  }
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        )}

        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {user.username === post.username && (
              <div className="singlePostEdit">
                <FaEdit onClick={() => setUpdateMode(true)} />
                <AiOutlineDelete onClick={handleDelete} />
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link
                className="link"
                to={`/?user=${post.username}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode &&<button className="singlePostButton" onClick={handleUpdate}>Update</button>}
        
      </div>
    </div>
  );
}

export default SinglePost;
