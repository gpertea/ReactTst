import React from 'react';

export default function QInput(props) {
    let term=props.term;
    if (!term) term="omnibus";
    let data=term;

    function setTData(v) {
        data=v;
        console.log(`QInput data set to: <${data}>`);
    }

    function sendTData() {
      console.log(`Sending data <${data}> to sibling..`);
      if (props.onChange) props.onChange(data);
    }

    return (
        <>
          <label> Enter term: </label>
          <input defaultValue={term} onChange={ (e) => setTData(e.target.value) } />
          <button onClick={sendTData}>Send to sibling</button>
        </>
    )
}