import axios from "axios";
import { useContext, useRef,useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [message, setMessage] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const api = axios.create({
        baseURL:'https://kp-blogpostapp.herokuapp.com/'
      })
      const res = await api.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      setMessage("Wrong credentials!")
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  const handletclogin = async(e)=>{
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const api = axios.create({
        baseURL:'https://kp-blogpostapp.herokuapp.com/'
      })
      const res = await api.post("/auth/login", {
        username: 'User1',
        password: '1234',
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      setMessage("Wrong credentials!")
      dispatch({ type: "LOGIN_FAILURE" });
    }
  }

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <div>{message}</div>
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
        <button className="loginButton" onClick={handletclogin} disabled={isFetching}>
          Login with test credentials
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
