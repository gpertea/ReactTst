import React, {useRef} from 'react'
import {useQCtx, useQCtxUpdate} from './QCtx'

// This component needs the ability to send data (the input term) to the QSearch component

export default function QInput() {
    
    let [term, forceUpdate]=useQCtx();
    if (!term) term="omnibus";
    const sendTerm=useQCtxUpdate();

    const inputRef=useRef();
    console.log(`QInput: rendering with term=<${term}>`);
    
    /*
    function setTData(v) { //this is silly, we don't need this onChange handler for the input
        data=v;
        console.log(`QInput data set to: <${data}>`);
    }
    */

    function sendTData() {
      let input=inputRef.current.value;
      console.log(`QInput: sending term <${input}> to sibling..`);
      sendTerm([input, !forceUpdate]);
    }

    return (
        <div style={{padding:"1em", border: "2px solid black", borderRadius: "8px 8px" }}> 
          <h3>QInput component</h3>
          <label> Enter term </label><br/>
          <input defaultValue={term} ref={inputRef} />
          <button onClick={sendTData}>Send to sibling</button>
        </div>
    )
}