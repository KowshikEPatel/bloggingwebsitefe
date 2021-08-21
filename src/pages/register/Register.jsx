import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    const newUser = {
      username,
      email,
      password,
    }
    if (file) {
      const data =new FormData();
      let filename = Date.now() + file.name;
      data.append("name",filename)
      data.append("file",file)
      try {
        const api = axios.create({
          baseURL:'https://kp-blogpostapp.herokuapp.com/'
        })
        let res = await api.post("api/upload", data);  
        console.log(res)      
        newUser.photo = res.data["filename"];
      } catch (err) {}
    }
    try {
      const api = axios.create({
        baseURL:'https://kp-blogpostapp.herokuapp.com/'
      })
      const res = await api.post("auth/register",newUser);
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fileInput">
              Upload Profile Image
              <i className="fas fa-user-edit"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  );
}
