import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="outer font-Poppins bg-[#1a1d2e] flex justify-center items-center flex-col min-h-screen">
      <div className="options">
        <div
          className="opt1 opt bg-[#1a1d2e] m-[10px] text-[white] border-[3px] border-[solid] border-[white] px-[20px] py-[15px] text-center rounded-[15px] text-[1.3rem] font-medium cursor-pointer hover:bg-[white] hover:text-[#1a1d2e]"
          onClick={() => navigate("/addpost")}
        >
          Add Post
        </div>
        <div
          className="opt2 opt bg-[#1a1d2e] m-[10px] text-[white] border-[3px] border-[solid] border-[white] px-[20px] py-[15px] text-center rounded-[15px] text-[1.3rem] font-medium cursor-pointer hover:bg-[white] hover:text-[#1a1d2e]"
          onClick={() => navigate("/viewpost")}
        >
          View Post
        </div>
        <div
          className="opt3 opt bg-[#1a1d2e] m-[10px] text-[white] border-[3px] border-[solid] border-[white] px-[20px] py-[15px] text-center rounded-[15px] text-[1.3rem] font-medium cursor-pointer"
          onClick={() => navigate("/login")}
        >
          User Login
        </div>
      </div>
    </div>
  );
}
