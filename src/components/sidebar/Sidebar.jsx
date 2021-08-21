import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const api = axios.create({
      baseURL:'https://kp-blogpostapp.herokuapp.com/'
    })
    const getCats = async () => {
      const res = await api.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c,index) => (
            <li className="sidebarListItem">
              <Link to={`/?cat=${c.name}`} className="link" key={index}>
            {(c.name).toUpperCase()}
            </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
