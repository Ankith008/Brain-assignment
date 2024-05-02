import React from "react";
import defaults from "../images/default.jpg";
// import "../css/Card.css";

export default function Card(props) {
  return (
    <div className="cardout w-[300px] !h-[400px] overflow-hidden [box-shadow:4px_4px_10px_0_rgba(0,_0,_0,_0.1),_-4px_-4px_10px_0_rgba(0,_0,_0,_0.1)] rounded-[10px] bg-[rgba(240,_248,_255,_0.49)] p-[20px]">
      <img
        src={props.profile ? props.profile : defaults}
        alt="default"
        className="defaul w-[250px] h-[250px] rounded-[20px] mb-[10px]"
      />
      <p className="he">
        <span className="text-[1.2rem] font-medium">Title : </span>
        {`${props.title}`.slice(0, 10) + "..."}
      </p>
      <p className="para h-[70px]">
        <span className="text-[1.2rem] font-medium">Description : </span>
        {`${props.dec}`.slice(0, 70) + "..."}
      </p>
    </div>
  );
}
