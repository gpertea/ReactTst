import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function QSearch( props ) {
    const [qresults, setQResults] = useState({ hits: [] });
    const [query, setQuery] = useState( props.query );
    const resources = {};
    let cancel;
    let ignore=false;

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
          console.log(`sending query ${qry} through axios..`)
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
        setQuery(props.query);
        //fetchData();    
        return () => { ignore = true; }
      }, [props.query, props.forceUpdate]);
    
    return (
      <>
        <input value={query} onChange={e => setQuery(e.target.value)} />
        <span> Here are the results for "<b>{query}</b>":</span>
        <ul>
          {qresults.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      </>
    );
  }
  