import { useState } from "react";
import CreateContext from "./CreateContext";

const ContextState = (props) => {
  const [alerthead, setalerthead] = useState("");
  const [alertdesc, setalertdesc] = useState("");
  const [showalert, setshowalert] = useState(false);

  return (
    <CreateContext.Provider
      value={{
        alerthead,
        setalerthead,
        alertdesc,
        setalertdesc,
        showalert,
        setshowalert,
      }}
    >
      {props.children}
    </CreateContext.Provider>
  );
};
export default ContextState;
