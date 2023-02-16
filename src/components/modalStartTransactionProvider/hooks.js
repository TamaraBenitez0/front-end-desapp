import { useContext } from "react"
import ModalInitTransactionContext from "./context"

export const useModalTransaction=()=>{
    const {setBlockExec} = useContext(ModalInitTransactionContext)

    const block=()=>{
        setBlockExec(true)
    }

    const unblock=()=>{
        setBlockExec(false)
    }
    return {block,unblock}
}