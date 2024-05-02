import React, { useState, useContext } from "react";
// import "../css/Signup.css";
import defaultImage from "../images/default.jpg";
import editingIcon from "../images/editing.png";
import axios from "axios";
import CreateContext from "../Context/CreateContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const { setalerthead, setalertdesc, setshowalert } =
    useContext(CreateContext);

  const [mode, setMode] = useState("signup");

  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

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

  const handleModeChange = () => {
    setMode((prevMode) => (prevMode === "signup" ? "login" : "signup"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "signup") {
        const { name, email, password } = userData;
        if (!image) {
          setalerthead("Error");
          setalertdesc("Please Select Image");
          setshowalert(true);
          return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profile", image);

        const response = await axios.post(
          "https://brain-assignment-back.onrender.com/auth/createuser",
          formData
        );
        setalerthead("Notification");
        setalertdesc("Verification Link Sent to Your Email");
        setshowalert(true);
        const json = response.data;
        if (json.success) {
          setalerthead("Success");
          setalertdesc("User Signup Successfully");
          setshowalert(true);
          localStorage.setItem("BrainToken", json.BrainToken);
          navigate("/");
        } else {
          setalerthead("Error");
          setalertdesc(json.error);
          setshowalert(true);
        }
      } else {
        const { email, password } = userData;
        const response = await axios.post(
          "https://brain-assignment-back.onrender.com/auth/login",
          {
            email,
            password,
          }
        );
        const json = response.data;
        if (json.success) {
          setalerthead("Success");
          setalertdesc("User Login Successfully");
          setshowalert(true);
          localStorage.setItem("BrainToken", json.BrainToken);
          navigate("/");
        } else {
          setalerthead("Error");
          setalertdesc(json.error);
          setshowalert(true);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlesubmitclick = async()=>{
    if(mode === "signup"){
      setalerthead("Notice");
          setalertdesc("Verification Code Send To Your Gmail");
          setshowalert(true);
  }
  }

  return (
    <>
      <div className="outer flex justify-center items-center h-screen bg-[#1a1d2e] font-Poppins ">
        <p
          className="back absolute top-[30px] left-[30px] text-[white] underline text-[1.2rem] cursor-pointer"
          onClick={() => navigate("/")}
        >
          Home
        </p>
        <p
          className="which absolute top-[30px] right-[30px] text-[white] text-[20px]  underline cursor-pointer "
          onClick={handleModeChange}
        >
          {mode === "signup" ? "Login" : "Signup"}
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-[300px] max-w-[500px] p-[20px] rounded-[10px] items-center justify-center [box-shadow:2px_4px_rgba(0,_0,_0,_0.2),_-2px_-2px_4px_rgba(0,_0,_0,_0.2)] bg-[#ffffff6c] font-Poppins"
        >
          <h3 className="head text-center mb-[20px] text-[20px] underline text-[#1a1d2e] uppercase font-Poppins ">
            {mode}
          </h3>
          {mode === "signup" && (
            <>
              <div className="box w-[100px] h-[100px] border-[2px] border-[solid] border-[black] m-auto rounded-[50%] overflow-hidden relative">
                <img
                  src={defaultImage}
                  className="imagespreview w-full h-full"
                  alt="profile"
                />
              </div>
              <img
                src={editingIcon}
                className="editing w-[30px] flex m-auto"
                alt="edit"
                onClick={() => document.querySelector("#inputprofile").click()}
              />

              <div className="name detail flex flex-col mb-[10px]">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="p-[10px] rounded-[5px] border-[1px] border-[solid] border-[#ccc] w-full"
                  required
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
            </>
          )}
          <div className="email detail flex flex-col mb-[10px]">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-[10px] rounded-[5px] border-[1px] border-[solid] border-[#ccc] w-full"
              required
              onChange={handleChange}
            />
          </div>
          <div className="password detail flex flex-col mb-[10px]">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="p-[10px] rounded-[5px] border-[1px] border-[solid] border-[#ccc] w-full"
              required
              onChange={handleChange}
            />
          </div>
          {mode === "signup" && (
            <div className="checkbox flex gap-[10px] m-[10px] justify-center">
              <input type="checkbox" required />
              <p>Terms & Conditions</p>
            </div>
          )}
          <div className="buttons flex flex-col gap-[10px]">
            <button
              type="submit" onclick={()=>handlesubmitclick()}
              className="p-[10px] rounded-[9px] border-[1px] border-[solid] border-[#ccc] w-full bg-[#1a1d2e] text-[white] cursor-pointer"
            >
              {mode === "signup" ? "Sign Up" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
