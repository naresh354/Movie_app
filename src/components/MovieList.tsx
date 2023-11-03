import { Grid } from "@mui/material";
import MovieCard from "./MovieCard";

const MovieList = ({
  movies,
  favorites,
  onFavoriteToggle,
  onAddToFavorites,
  onRemoveFromFavorites,
}: any) => {
  return (
    <Grid
      container
      spacing={1}
      gap={1}
      justifyContent="center"
      alignItems="center"
    >
      {movies?.map((movie: any) => (
        <Grid item key={movie.id} xs={12} sm={6} md={3} lg={3}>
          <MovieCard
            movie={movie}
            isFavorite={favorites.includes(movie.imdbID)}
            onAddToFavorites={onAddToFavorites}
            onRemoveFromFavorites={onRemoveFromFavorites}
            onFavoriteToggle={onFavoriteToggle}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
