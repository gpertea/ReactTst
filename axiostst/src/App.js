import react, {useState} from 'react';
import { search } from './utils';

import Movies from "./Movies";
function App() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');

  const searchMovies = async val => {
    setLoading(true);
    const results = await search(
      `https://api.themoviedb.org/3/search/movie?query=${val}&api_key=dbc0a6d62448554c27b6167ef7dabb1b`
    );
    setMovies(results); 
    setLoading(false);
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
