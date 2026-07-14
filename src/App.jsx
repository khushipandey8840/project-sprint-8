import { useEffect, useState } from "react";
import { getPopularMovies } from "./services/tmdb";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies();
        console.log("Movies:", data);

        if (Array.isArray(data)) {
          setMovies(data);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div
      style={{
        background: "#141414",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
      }}
    >
      <h1>Netflix Lite</h1>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <p>Total Movies: {movies.length}</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {movies.length > 0 ? (
              movies.map((movie) => (
                <div
                  key={movie.id}
                  style={{
                    background: "#222",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width="100%"
                    loading="lazy"
                  />

                  <h3>{movie.title}</h3>

                  <p>⭐ {movie.vote_average}</p>

                  <p>{movie.release_date?.slice(0, 4)}</p>
                </div>
              ))
            ) : (
              <h2>No Movies Found</h2>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;