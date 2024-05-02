import React, { useEffect, useRef } from "react";
import { useContext } from "react";
import CreateContext from "../Context/CreateContext";

export default function Alert() {
  const { alerthead, alertdesc, showalert, setshowalert } =
    useContext(CreateContext);
  useEffect(() => {
    if (showalert) {
      setTimeout(() => {
        alertRef.current.style.top = "-50%";
        setTimeout(() => {
          setshowalert(false);
        }, 2000);
      }, 3000);
    }
  }, [showalert]);
  const alertRef = useRef(null);
  return (
    <div className="parent [transition:all_ease_0.5s] font-Poppins">
      {showalert && (
        <div
          className="alert fixed w-[300px] text-center p-[10px] text-[black] [box-shadow:0_4px_8px_0_rgba(0,_0,_0,_0.2)] animate-[slideDown_1s_ease-in-out] bg-[white] rounded-[4px] left-2/4 -translate-x-1/2 h-auto top-[10px] [transition:all_linear_1s]"
          ref={alertRef}
        >
          <div className="alerthead text-[1.5rem] font-semibold uppercase mb-[10px] border-b-[2px_solid_#c0bfbf]">
            {alerthead}
          </div>
          <div className="alertdesc">{alertdesc}</div>
        </div>
      )}
    </div>
  );
}
