import React, {useRef} from 'react';

export default function QInput(props) {
    let term=props.term;
    if (!term) term="omnibus";
    //let data=term;
    const inputRef=useRef();
    console.log("QInput: rendering with term="+term);
    
    /*
    function setTData(v) { //this is silly, we don't need this onChange handler for the input
        data=v;
        console.log(`QInput data set to: <${data}>`);
    }
    */

    function sendTData() {
      let input=inputRef.current.value;
      console.log(`QInput: sending term <${input}> to sibling..`);
      if (props.onChange) props.onChange(input);
    }

    return (
        <>
          <label> Enter term: </label>
          <input defaultValue={term} ref={inputRef} />
          <button onClick={sendTData}>Send to sibling</button>
        </>
    )
}