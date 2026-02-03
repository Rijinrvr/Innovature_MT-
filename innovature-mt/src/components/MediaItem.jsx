import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import {
  Image as ImageIcon,
  VideoLibrary as VideoIcon,
  Description as DocumentIcon,
} from "@mui/icons-material";

const MediaItem = ({ data, size }) => {
  // Define grid columns based on size
  const getGridColumns = () => {
    switch (size) {
      case "small":
        return { xs: 6, sm: 4, md: 3, lg: 2 };
      case "medium":
        return { xs: 12, sm: 6, md: 4, lg: 3 };
      case "large":
        return { xs: 12, sm: 12, md: 6, lg: 4 };
      default:
        return { xs: 12, sm: 6, md: 4, lg: 3 };
    }
  };

  // Define card height based on size
  const getCardHeight = () => {
    switch (size) {
      case "small":
        return 150;
      case "medium":
        return 250;
      case "large":
        return 350;
      default:
        return 250;
    }
  };

  // Get icon based on media type
  const getMediaIcon = (type) => {
    switch (type) {
      case "image":
        return <ImageIcon />;
      case "video":
        return <VideoIcon />;
      case "document":
        return <DocumentIcon />;
      default:
        return null;
    }
  };

  // Get color based on media type
  const getTypeColor = (type) => {
    switch (type) {
      case "image":
        return "primary";
      case "video":
        return "secondary";
      case "document":
        return "success";
      default:
        return "default";
    }
  };

  // Fix URLs with double 'h' (hhttps)
  const fixUrl = (url) => {
    return url.replace(/^hhttps/, "https");
  };

  // Render media preview
  const renderMediaPreview = (item) => {
    const fixedUrl = fixUrl(item.url);

    if (item.type === "image") {
      return (
        <CardMedia
          component="img"
          height={getCardHeight()}
          image={fixedUrl}
          alt={item.name}
          sx={{ objectFit: "cover" }}
        />
      );
    } else if (item.type === "video") {
      return (
        <CardMedia
          component="video"
          height={getCardHeight()}
          src={fixedUrl}
          controls
          sx={{ objectFit: "cover", backgroundColor: "#000" }}
        />
      );
    } else if (item.type === "document") {
      return (
        <Box
          sx={{
            height: getCardHeight(),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <DocumentIcon sx={{ fontSize: 80, color: "#757575" }} />
        </Box>
      );
    }
  };

  // If no data, show message
  if (!data || data.length === 0) {
    return (
      <Box sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          No media files available
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid item {...getGridColumns()} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 6,
                },
              }}
            >
              {renderMediaPreview(item)}
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" noWrap>
                    {item.name}
                  </Typography>
                  <Chip
                    icon={getMediaIcon(item.type)}
                    label={item.type}
                    size="small"
                    color={getTypeColor(item.type)}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MediaItem;
