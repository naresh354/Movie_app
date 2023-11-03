"use client";
import React, { useState, useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import Image from "next/image";
import MovieList from "@/components/MovieList";
import axiosService from "@/network";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loader from "../components/Loader"
import { addMovieToFavorites, removeMovieFromFavorites } from "../../lib/db";

type MovieID = string;

export default function Home() {
  const [favorites, setFavorites] = useState<MovieID[]>([]);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("harry`");
  const [loading, setLoading] = useState(false)

  const handleFavoriteToggle = (movieId: MovieID) => {
    if (favorites.includes(movieId)) {
      setFavorites(favorites.filter((id) => id !== movieId));
    } else {
      setFavorites([...favorites, movieId]);
    }
  };

  console.log(axiosService, "axiosService");

  const handleSearch = async () => {
    try {
      axiosService
        .getSetupServices(`&s=${searchTerm}`)
        .then((res: any) => {
          console.log(res, "response");
          setMovies(res?.data?.Search);
        })
        .catch((err) => {
          console.log(err, "error");
          // Handle the error if needed
        });
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    setLoading(true)
    
   if(searchTerm === "") {
    setSearchTerm("harry")
   }
    if (searchTerm) {
      const delayDebounce = setTimeout(() => { handleSearch(); setLoading(false) }, 300); // Debounce search
      return () => clearTimeout(delayDebounce);
    }
  }, [searchTerm]);

  console.log(favorites, "movies");

  const handleAddToFavorites = async (movie: any, userId: any) => {
    // Call the Firebase function to add to favorites
    await addMovieToFavorites(userId, movie);
  };

  const handleRemoveFromFavorites = async (movie: any, userId: any) => {
    // Call the Firebase function to remove from favorites
    await removeMovieFromFavorites(userId, movie);
  };

  return (
    <>
      <ToastContainer />
      {loading === true ? <Loader></Loader> : null}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search Movie"
          placeholder="Search Movie"
          variant="outlined"
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3, mt: 3, width: "40%" }}
          InputLabelProps={{ style: { color: "#ffffff" } }} // Change placeholder color
          InputProps={{
            style: { color: "#ffffff" },
            sx: {
              "& fieldset.MuiOutlinedInput-notchedOutline": {
                borderColor: "#1976d2",
              },
              "&:hover fieldset.MuiOutlinedInput-notchedOutline": {
                borderColor: "#1976d2", // Change border color on hover
              },
            },
          }}
        />
        <MovieList
          movies={movies}
          favorites={favorites}
          onFavoriteToggle={handleFavoriteToggle}
          onAddToFavorites={handleAddToFavorites}
          onRemoveFromFavorites={handleRemoveFromFavorites}
        ></MovieList>
      </Box>
    </>
  );
}
