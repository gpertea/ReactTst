import React, { useState, createContext, useContext } from 'react'

const QCtx = createContext();
const QCtxUpdate = createContext();

export function useQCtx() { 
    const ctx=useContext(QCtx);
    //making sure this is not used outside a provider
    if (ctx === undefined) {
        throw new Error(`useQCtx must be used within QCtxProvider!`)
    }
    return ctx; 
}
export function useQCtxUpdate() { 
    const ctx=useContext(QCtxUpdate);  
    //making sure this is not used outside a provider
    if (ctx === undefined) {
        throw new Error(`useQCtxUpdate must be used within QCtxProvider!`)
    }
    return ctx; 
}

export default function QCtxProvider (props) {
    const [ qPayload, setPayload] = useState(['context', false])

    return (
     <QCtx.Provider value={qPayload}>
         <QCtxUpdate.Provider value={setPayload}>
             {props.children}
         </QCtxUpdate.Provider>
     </QCtx.Provider>
    )
}
