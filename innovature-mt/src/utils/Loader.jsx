// components/Loader.jsx
import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = ({ message = "Loading...", size = 40, fullScreen = false }) => {
  if (fullScreen) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          gap: 2,
        }}
      >
        <CircularProgress size={size} />
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        gap: 2,
      }}
    >
      <CircularProgress size={size} />
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default Loader;
