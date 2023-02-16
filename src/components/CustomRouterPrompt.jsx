import React from "react";
import ModalBack from "./ModalBack";

export const CustomRouterPrompt=(props)=> {
  const { showPrompt,handleCancel,handleOK,currentPath} = props;

  return (
    <ModalBack isOpen={showPrompt} handleCancel={handleCancel} handleOk={handleOK} currentPath={currentPath}/>
  )
}
