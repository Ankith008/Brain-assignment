import React, { useState, useContext } from "react";
import defaultImage from "../images/default.jpg";
import editingIcon from "../images/editing.png";
import axios from "axios";
import CreateContext from "../Context/CreateContext";
import { useNavigate } from "react-router-dom";

export default function Addpost() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const { setalerthead, setalertdesc, setshowalert } =
    useContext(CreateContext);
  const [userData, setuserData] = useState({
    title: "",
    desc: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) =>
        (document.querySelector(".imagespreview").src = e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile", image);
    formData.append("title", userData.title);
    formData.append("description", userData.desc);

    try {
      const response = await axios.post(
        "https://brain-assignment-back.onrender.com/post/createpost",
        formData,
        {
          headers: {
            braintoken: localStorage.getItem("BrainToken"),
          },
        }
      );
      const json = await response.data;
      if (json.success) {
        setalertdesc("Post Created Successfully");
        setalerthead("SUCCESS");
        setshowalert(true);
        navigate("/");
      } else {
        setalertdesc("Error in Creating Post");
        setalerthead("Error");
        setshowalert(true);
      }
    } catch (error) {
      setalertdesc("Error in Creating Post");
      setalerthead("Error");
      setshowalert(true);
    }
  };

  return (
    <div className="outer  flex justify-center items-center h-screen bg-[#1a1d2e] font-Poppins ">
      <p
        className="back absolute top-[30px] left-[30px] text-[white] underline text-[1.2rem] cursor-pointer"
        onClick={() => navigate("/")}
      >
        Home
      </p>
      <form
        onSubmit={handleSubmit}
        className="hloo w-[300px] max-w-[500px] p-[20px] rounded-[10px] items-center justify-center [box-shadow:2px_4px_rgba(0,_0,_0,_0.2),_-2px_-2px_4px_rgba(0,_0,_0,_0.2)] bg-[#ffffff6c] font-Poppins"
      >
        <div className="box w-56 h-56 border-2 border-black rounded-[20px] overflow-hidden m-auto mb-[20px] bg-[] ">
          <img
            src={defaultImage}
            className="imagespreview w-full h-full"
            alt="profile"
          />
        </div>
        <button
          src={editingIcon}
          alt="edit"
          onClick={() => document.querySelector("#inputprofile").click()}
          className="p-[10px] rounded-[9px] border-[1px] border-[solid] border-[#ccc] w-full bg-[#1a1d2e] text-[white] cursor-pointer "
        >
          Add Photo
        </button>
        <div className="title detail">
          <label htmlFor="title" className="block">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Title..."
            required
            onChange={handleChange}
            className="mt-1 p-2 block w-full border  rounded-md "
          />
        </div>
        <div className="desc detail">
          <label htmlFor="title" className="block">
            Description
          </label>
          <input
            type="text"
            name="desc"
            placeholder="Description..."
            required
            className="mt-1 p-2 block w-full border rounded-md "
            onChange={handleChange}
          />
        </div>
        <input
          type="file"
          name="profile"
          id="inputprofile"
          style={{ display: "none" }}
          onChange={handleImageChange}
          accept="image/*"
        />
        <button
          type="submit"
          className="p-[10px] rounded-[9px] border-[1px] border-[solid] border-[#ccc] w-full bg-[#1a1d2e] text-[white] cursor-pointer mt-4"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
