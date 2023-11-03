import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { Box, Grid } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";

const MovieCard = ({
  movie,
  onFavoriteToggle,
  isFavorite,
  onRemoveFromFavorites,
  onAddToFavorites,
}: any) => {
  const handleFavoriteClick = () => {
    onFavoriteToggle(movie?.imdbID);
    if (isFavorite) {
      toast.warning("Remove Favourite Item");
      onRemoveFromFavorites(movie); // Call remove function
    } else {
      toast.success("Added Favourite Item");
      onAddToFavorites(movie); // Call add function
    }
  };

  console.log(isFavorite, "favourite");

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`${movie.Poster}`}
        title={`${movie?.Title}`}
      />
      <CardContent>
        <Typography sx={{ margin: "5px 0" }}>
          {movie?.Title}{" "}
          <span style={{ fontSize: "1rem", fontWeight: "700" }}>
            {movie?.Year}
          </span>
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "0.9rem", fontWeight: "700" }}>IMDB ID :</Typography>
            <Typography
              sx={{
                fontSize: "0.9rem",
                fontWeight: "700",
                color: "#1976d2",
                ml: 1,
              }}
            >
              {movie?.imdbID}
            </Typography>
          </Box>

          <Box>
            <IconButton
              onClick={handleFavoriteClick}
              sx={{ color: isFavorite ? "red" : "" }}
              aria-label="add to favorites"
            >
              <FavoriteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
