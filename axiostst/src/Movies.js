import React from "react";

const MovieCard = props => {
  const { title, poster_path, vote_average } = props.item;

  return (
    <div>
      <div>
        <b> {title} </b> Score: {vote_average}  
      </div>
    </div>
  );
};

const Movies = ({ list }) => {
  let cards = <h3>Loading...</h3>;

  if (list) {
    cards = list.map((m, i) => <MovieCard key={i} item={m} />);
  }

  return (
    <div>
      {cards}
    </div>
  );
};

export default Movies;
