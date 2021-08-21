import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(category.toLowerCase().split(', '))
    const newPost = {
      author: user["username"],
      title,
      content:desc,
      categories:category.toLowerCase().split(', ').map(e=>{return {"name":e}}),
    };
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
        newPost.photo = res.data["filename"];
      } catch (err) {}
    }
    try {
      const api = axios.create({
        baseURL:'https://kp-blogpostapp.herokuapp.com/'
      })
      const res = await api.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
            
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
          <input 
          type="text"
          placeholder="Category"
          className="writeInput"
          autoFocus={true}
          onChange={e=>setCategory(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Write your article..."
            type="text"
            className="writeInput writeText"
            onChange={e=>setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
