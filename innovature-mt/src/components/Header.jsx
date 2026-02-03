import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  LinearProgress,
} from "@mui/material";
import MediaItem from "./MediaItem"
import Loader from "../utils/Loader";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState([]);
  const [size, setSize] = useState("medium");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSizeChange = (selectedSize) => {
    setSize(selectedSize);
    handleClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const proxyUrl = "https://api.allorigins.win/get?url=";
        const targetUrl = "https://mediafiles.innovaturelabs.net/assets1.json";

        const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
        
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        
        const result = await response.json();
        const parsedData = JSON.parse(result.contents);
        setData(parsedData);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Media Dashboard</Typography>

          {/* Toggle Button */}
          <div>
            <Button 
              color="inherit" 
              onClick={handleClick}
              disabled={loading}
            >
              Size: {size.charAt(0).toUpperCase() + size.slice(1)}
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleSizeChange("small")}>
                Small
              </MenuItem>
              <MenuItem onClick={() => handleSizeChange("medium")}>
                Medium
              </MenuItem>
              <MenuItem onClick={() => handleSizeChange("large")}>
                Large
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
        {/* Linear Progress Bar in Header */}
        {loading && <LinearProgress />}
      </AppBar>

      {/* Show error message if there's an error */}
      {error && (
        <Typography 
          variant="h6" 
          color="error" 
          sx={{ textAlign: "center", padding: 4 }}
        >
          Error: {error}
        </Typography>
      )}

      {/* Show loader while loading */}
      {loading && !error && (
        <Loader message="Loading media files..." size={60} />
      )}

      {/* Show media items when loaded */}
      {!loading && !error && <MediaItem data={data} size={size} />}
    </>
  );
};

export default Header;