import { useContext } from "react";
import Context from "./context";


export const useModalBack=()=>{
    const {setActive,setCurrentPath}=useContext(Context);

const activeDetectorBack=(active)=>{
    setActive(active)
}

const pathRedirect=(path)=>{
    setCurrentPath(path)
}

return{activeDetectorBack,pathRedirect}
}