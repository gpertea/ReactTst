import React, {useState} from 'react';
import QSearch from './QSearch';
import QInput from './QInput';

function App() {

  const [qterm, setQTerm] =useState("heading");
  const [fupd, setFupd] =useState(false);

  function onTermChange(v) {
    console.log(`App received term change to: [${v}]`)
    setQTerm(v);
    setFupd( v => !v );
  }

  return (
  <>
   <h2>Searching: {qterm} </h2>
   <table><tbody><tr>
   <td><QSearch query={qterm} forceUpdate={fupd}/></td>
   <td><QInput term={qterm} onChange={onTermChange} /></td>
   </tr></tbody></table>
  </>
  )
}

export default App;

