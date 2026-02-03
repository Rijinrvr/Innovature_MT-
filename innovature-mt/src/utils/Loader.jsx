import React from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";

// Centered Loader
export const CenteredLoader = ({ message = "Loading...", size = 60 }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <CircularProgress size={size} />
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

// Header Loader (inline loader for AppBar)
export const HeaderLoader = ({ message = "Loading..." }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <CircularProgress size={20} color="inherit" />
      <Typography variant="body2">{message}</Typography>
    </Box>
  );
};

// Skeleton Grid Loader
export const SkeletonGridLoader = ({
  count = 12,
  gridColumns,
  cardHeight = 250,
}) => {
  return (
    <Grid container spacing={2}>
      {Array.from(new Array(count)).map((_, index) => (
        <Grid item {...gridColumns} key={index}>
          <Card sx={{ height: "100%" }}>
            <Skeleton variant="rectangular" height={cardHeight} />
            <CardContent>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

// Empty State
export const EmptyState = ({ message = "No data found" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

// Simple inline loader (for buttons, small sections)
export const InlineLoader = ({ size = 24, color = "primary" }) => {
  return <CircularProgress size={size} color={color} />;
};
