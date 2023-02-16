
import ModalInitTransactionContext from "./context";
import React, { useState } from "react";
import ModalTransaction from "../ModalTransaction";
import { Toaster } from "react-hot-toast";

const ModalTransactionProvider = ({ children }) => {
  const [open,setOpen] = useState(false);
  const [blockExec,setBlockExec] = useState(false);

  return (
    <ModalInitTransactionContext.Provider value={{open:open ,setOpen:setOpen ,setBlockExec:setBlockExec }}>
      <ModalTransaction isOpen={open} setOpen={setOpen} blockExec={blockExec}/>
      <Toaster
        reverseOrder={false}
        position="bottom-center"
        toastOptions={{
          success: {
            style: {
              color: "white",
              background: "black",
            },
          },
          error: {
            style: {
              color: "white",
              background: "black",
            },
          },
        }}
      />
      {children}
    </ModalInitTransactionContext.Provider>
  );
} 

export default ModalTransactionProvider