import { Link } from "react-router-dom";
import "./register.css";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Register() {
  const [username , setUsername] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [error, setError] = useState(false);
  
  const {user,dispatch}=useContext(Context)

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      setError(false);
      dispatch({type:"REGISTER_START"})
      const  res= await axios.post("/auth/register", {
        username,
        email,
        password
      })
      dispatch({ type:"REGISTER_SUCCESS" ,payload: res.data}) ;
      // res.data && window.location.replace("/")

      // console.log(res)
    }catch(e){
      dispatch({type:"REGISTER_FAILURE"})
      console.log(e);
      setError(true)
    }
  }

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={(e)=>setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          onChange={(e)=>setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          autoComplete="on"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">Register</button>
        {error && <span>Something Went wrong</span>}
      </form>
      <button className="registerLoginButton">
        <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
          Login
        </Link>
      </button>
    </div>
  );
}
