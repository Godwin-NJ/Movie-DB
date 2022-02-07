import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
// import dotenv from 'dotenv';

export default function App() {
  const api = 'https://api.themoviedb.org/3/movie/now_playing';
  const imageURL = 'https://image.tmdb.org/t/p/original';
  const [movies, setMovies] = useState([]);
  // const [sortData, setSortData] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get(api, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!data) {
        throw new Error('Error fetching data');
        return;
      }
      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjM3ZDQyMjk0MTA1Y2I0N2Q4MmZjMWJlOTgwMjZkMSIsInN1YiI6IjVmODk5NDc2ZjZmZDE4MDAzM2IxYmMxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d2PhAQfY88eaOS8DADQVaMMHlYdk1ymSgkCk0ndWPYo';

  // const imagePoster = 'https://image.tmdb.org/t/p/original';

  // const headers = { Authorization: `Bearer ${token}` };

  // const sortVoteAvg = (a, b) => {
  //   if (a > b) return 1;
  //   if (a < b) return -1;
  // };
  const voteAvgSort = () => {
    // const avgVote = movies.map((movie) => {
    //   const { vote_average } = movie;
    //   return vote_average;
    // });
    // const sortByAvg = avgVote.sort((a, b) => a - b).reverse();
    const avgSort = [...movies];
    avgSort.sort((a, b) => a.vote_average - b.vote_average);
    setMovies(avgSort);
    // return sortByAvg;
  };

  const releaseDateSort = () => {
    const releaseDate = [...movies];
    const sortByDate = releaseDate.sort(function (a, b) {
      return new Date(b.release_date) - new Date(a.release_date);
    });
    setMovies(sortByDate);
  };

  // console.log(movies);
  //  image, original_title, and release_date

  if (movies.length === 0) {
    return <h2>Fetching Movies, Pls wait;</h2>;
  }

  return (
    <div className="App">
      {/* btn onclick is throwing an error , and renders empty details  */}
      <button onClick={voteAvgSort}>Avg-Votes</button>
      <button onClick={releaseDateSort}>Date-Sort</button>
      <div className="container">
        {movies.map((movie) => {
          const { release_date, original_title, backdrop_path, poster_path } =
            movie;

          const imagePoster = `${imageURL}${poster_path}`;
          // let voteAvg = [vote_average];
          // const sortVote = (a, b) => {
          //   if (a > b) return 1;
          //   if (a < b) return -1;
          // };
          // const sortVoteAvg = () => {
          //   const voteAvg = [vote_average];

          //   console.log(voteAvg);
          // };
          // sortVoteAvg();

          return (
            <div className="movieGrid" key={movie.id}>
              <div className="movieInfo">
                <h1>{release_date}</h1>
                <h1>{original_title}</h1>
              </div>
              {/* <img src={imageURL}{backdrop_path} alt="back-dropIMG" /> */}
              <div>
                <img
                  className="movieImg"
                  src={imagePoster}
                  alt="poster-pathIMG"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* <button></button> */}
    </div>
  );
}
