import { useEffect, useState } from "react";
import styles from "./MoviesList.module.css";
import Movie from "./Movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function MoviesList() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovie(data.results))
      .catch((error) => console.error("Une erreur s'est produite", error));
    }, []);;

  const filterReleaseDate = ()=>{
    const releaseDateMovie = [...movie].sort((a,b) => a.release_date.localeCompare(b.release_date));
    setMovie(releaseDateMovie);
  };
  const filterReleaseDateInverse =() =>{
    const releaseDateMovieInverse = [...movie].sort((a,b) => b.release_date.localeCompare(a.release_date));
    setMovie(releaseDateMovieInverse);
  }

  return (
    <>
      <div>
        <h1>Movielist</h1>
        <div className={styles.moviesContainer}>
        {movie.map((movie) => (
          <Movie movie={movie} key={movie.id} />
        ))}</div>
<button onClick={filterReleaseDate} type="submit">Du plus vieux au plus récent</button>
<button onClick={filterReleaseDateInverse} type="submit">Du plus récent au plus vieux</button>
      </div>
    </>
  );
}
