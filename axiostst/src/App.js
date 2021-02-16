import react, {useState} from 'react';
//import { search } from './utils';
import axios from "axios";
import Movies from "./Movies";

const resources = {};
let cancel;

async function getAxiosData(query) {
    if (cancel) {
      // Cancel the previous request before making a new request
      cancel.cancel();
    }
    // Create a new CancelToken
    cancel = axios.CancelToken.source();
    try {
      if (resources[query]) {
        // Return result if it exists
        return resources[query];
      }
      const res = await axios(query, { cancelToken: cancel.token });

      const result = res.data.results;
      // Store response
      resources[query] = result;

      return result;
    } catch (error) {
      if (axios.isCancel(error)) {
        // Handle if request was cancelled
        console.log("Request canceled", error.message);
      } else {
        // Handle usual errors
        console.log("Something went wrong: ", error.message);
      }
    }
};

function App() {
  const [movies, setMovies] = useState(null);
  //const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');

  const searchMovies = async val => {
    //setLoading(true);
    // const results = await search(
    const results = await getAxiosData(
      `https://api.themoviedb.org/3/search/movie?query=${val}&api_key=dbc0a6d62448554c27b6167ef7dabb1b`
    );
    setMovies(results); 
    //setLoading(false);
  };

  const onChangeHandler = async (e) => {
    searchMovies(e.target.value);
    setValue(e.target.value);
  };

  function renderMovies() {
    let rmovies = <h1>There's no movies</h1>;
    if (movies) {
      rmovies = <Movies list={movies} />;
    }
    return rmovies;
  }

  return (
      <div>
        <input value={value}
          onChange={ (e) => onChangeHandler(e) }
          placeholder="Type something to search"
        />
        {renderMovies()}
      </div>
   );
  
}

export default App;
