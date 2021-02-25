import React, {useState, useRef, useEffect} from 'react'
import axios from 'axios'
import {useQCtx} from './QCtx'


function useFirstRender() {
  const isFirstRef = useRef(true);
  useEffect(() => {
    isFirstRef.current = false;
  }, []);
  return isFirstRef.current;
};

export default function QSearch( props ) {
    const [qresults, setQResults] = useState({ hits: [] });
    const [query, setQuery] = useState( 'qsearch' );
    const [qterm, qforceUpdate] = useQCtx();
    const isFirstRender=useFirstRender(); //only true for the first render!
    console.log(`QSearch: rendering with query=${query}, qterm=${qterm}`);
    
    let ignore=false;

    const resources = {};
    let cancel;
    async function fetchData(qry) {
        if (cancel) 
          cancel.cancel(); //cancel the previous request before making a new request
        // Create a new CancelToken
        cancel = axios.CancelToken.source();
        try {
          if (resources[qry]) { // return result if there
            if (!ignore) setQResults(resources[qry]);
            return resources[qry];
          }
          console.log(`QSearch: sending query "${qry}" through axios..`);
          const result = await axios('https://hn.algolia.com/api/v1/search?query=' + qry, 
                                     { cancelToken: cancel.token } );
          resources[qry] = result.data; // store response
          if (!ignore) setQResults(result.data);
          return result.data;
      } catch (error) {
          if (axios.isCancel(error)) {
            console.log("Request canceled", error.message);
          } else {
            console.log("Something went wrong: ", error.message);
          }
        }
    }
    
    useEffect(() => {
      console.log(`QSearch: query changed to: ${query}`);
      fetchData(query);
      return () => { ignore = true; }
    }, [query]);

    useEffect(() => {
       if (isFirstRender) return;
         console.log(`QSearch: qterm changed to: ${qterm}`);
        setQuery(qterm);
        //fetchData();    
        return () => { ignore = true; }
      }, [qterm, qforceUpdate]);
    
    return (
      <div style={{padding:"1em", border: "2px solid black", borderRadius: "8px 8px" }}> 
        <h3>QSearch component</h3>
        <input value={query} onChange={e => setQuery(e.target.value)} />
        <span> Here are the results for "<b>{query}</b>":</span>
        <div style={{ height: "16em", overflow: "scroll" }}>
        <ul>
          {qresults.hits.map(item => item.title ? (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li> ) : null
          )}
        </ul>
        </div>
      </div>
    );
  }
  