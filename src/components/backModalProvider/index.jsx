
import Context from "./context";
import { CustomRouterPrompt } from "../CustomRouterPrompt";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


const ModalProvider = ({ children }) => {
  const [active, setActive] = useState(false);
  const history = useHistory();
  const [showPrompt, setShowPrompt] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");
  const onOk=true
  const onCancel=false

  useEffect(() => {
   
    if (active) {
      console.log("active detector")
      setShowPrompt(true);
    }
  }, [active,history,currentPath]);

  const handleOK = useCallback(async (path) => {
        if(onOk){
        setCurrentPath(path)
        setShowPrompt(false);
        setActive(false)
        history.push(path);
        }
        else{
            setActive(false)
            setShowPrompt(false);
        }
  }, [ history, onOk]);

  const handleCancel = useCallback(async () => {
    if (onCancel) { 
        history.push(currentPath);
      }
    setActive(false)  
    setShowPrompt(false);
  }, [currentPath, history, onCancel]);


  return (
    <Context.Provider value={{ active:active, setActive:setActive,setCurrentPath:setCurrentPath, }}>
        <CustomRouterPrompt showPrompt={showPrompt} handleCancel={handleCancel} handleOK={handleOK} currentPath={currentPath} />
      {children}
    </Context.Provider>
  );
} 

export default ModalProvider