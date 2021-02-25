import React from 'react'
import QSearch from './QSearch'
import QInput from './QInput'
import QCtxProvider from './QCtx'

function App() {
  //const [qterm, setQTerm] =useState("heading");
  //const [fupd, setFupd] =useState(false);
  return (
  <>
   <h2>Search here </h2>
   <table><tbody><tr>
   <QCtxProvider>  
   <td><QSearch/></td>
   <td>&nbsp;&nbsp;&nbsp;</td>
   <td><QInput/></td>
   </QCtxProvider>
   </tr></tbody></table>
  </>
  )
}

export default App;

