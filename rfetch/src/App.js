import React, {useState} from 'react';
import QSearch from './QSearch';
import QInput from './QInput';

function App() {

  const [qterm, setQTerm] =useState("heading");

  function onTermChange(v) {
    console.log(`App received term change to: [${v}]`)
    setQTerm(v);
  }

  return (
  <>
   <h2>Searching: {qterm} </h2>
   <table><tbody><tr>
   <td><QSearch query={qterm}/></td>
   <td><QInput term={qterm} onChange={onTermChange} /></td>
   </tr></tbody></table>
  </>
  )
}

export default App;

