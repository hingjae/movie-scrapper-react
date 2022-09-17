import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setLoading((current) => !current);
    setMovie(json.data.movie);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <div>
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          <img
            src={movie.background_image_original}
            alt={movie.background_image_original}
          />
          <div>
            <div>
              <img
                src={movie.medium_cover_image}
                alt={movie.medium_cover_image}
              />
              <div>
                <h1>{movie.title}</h1>
                <div>
                  <span>{movie.year}년 • </span>
                  <span>{movie.runtime}분</span>
                </div>
              </div>
            </div>
            <div>
              <div>rate: {movie.rating} </div>
              <div>downloed: {movie.download_count}</div>
              <div>like: {movie.like_count} </div>
            </div>
          </div>
          <div>
            <div>{movie.description_full}</div>
            <div>
              {movie.genres.map((g) => (
                <span key={g}>{g} </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
