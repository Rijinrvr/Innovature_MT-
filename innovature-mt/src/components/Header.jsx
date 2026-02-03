import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import MediaItem from "./MediaItem";
import { HeaderLoader } from "../utils/Loader";


const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState([]);
  const [size, setSize] = useState("medium");
  const [loading, setLoading] = useState(true);

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
    const proxyUrl = "https://api.allorigins.win/raw?url=";
    const targetUrl = "https://mediafiles.innovaturelabs.net/assets1.json";

    setLoading(true);
    fetch(proxyUrl + encodeURIComponent(targetUrl))
      .then((res) => res.json())
      .then((data) => {
        setData(data.resources || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Media Dashboard</Typography>

          {/* Use HeaderLoader utility */}
          {loading && <HeaderLoader message="Loading media..." />}

          <Button color="inherit" onClick={handleClick}>
            Size: {size.charAt(0).toUpperCase() + size.slice(1)}
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {["small", "medium", "large"].map((s) => (
              <MenuItem key={s} onClick={() => handleSizeChange(s)}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>

      <MediaItem data={data} size={size} loading={loading} />
    </>
  );
};

export default Header;
