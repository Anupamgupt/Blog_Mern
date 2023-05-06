// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import "./post.css";

export default function Post({post}) {

  const PF= "http://localhost:5000/images/"

  return (
    <div className="post">
      {post.photo &&
       <img
       className="postImg"
       src={PF+post.photo}
       alt=""
     /> 
     }
     
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((categories)=>(
              <span className="postCat" key={categories._id}>
                {categories.name}
               </span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} style={{textDecoration:"none",color:"inherit"}}>
        <span className="postTitle">
          {post.title}
        </span>
        </Link>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
    </div>
  );
}