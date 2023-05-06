// import { Link } from "react-router-dom";
import "./sidebar.css";
import anime from '../../assets/images/anime.jpg'
import {
    FaFacebookSquare,
    FaTwitterSquare,
    FaPinterest,
    FaInstagramSquare,
  } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {

  const [cats,setCats]=useState([])
  useEffect(()=>{
    try{
      const getCats= async()=>{
        const res =await axios.get("/categories")
        setCats(res.data)
      }
      getCats();
    }catch(e){
      console.log(e);
    }
  },[])
  
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src={anime}
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((cat)=>(
             <li className="sidebarListItem" key={cat._id}>

            <Link className="link" to={`/?cat=${cat.name}`} style={{textDecoration:"none",color:"inherit"}}>  
                {cat.name}
             </Link>
           </li>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          {/* <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i> */}
             <FaFacebookSquare />
            <FaTwitterSquare />
            <FaPinterest />
            <FaInstagramSquare />
        </div>
      </div>
    </div>
  );
}