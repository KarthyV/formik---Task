import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

const RecipePreview = ({ recipe }) => {
  return (
    <Card sx={{ minWidth: 300, minHeight: 200 }}>
      <CardMedia
        component="img"
        height="140"
        image={recipe.recipePoster}
        alt={recipe.recipeName}
      />
      <CardContent className="preview_content">
        <Typography gutterBottom variant="h5" component="div">
          {recipe.recipeName}
        </Typography>
        <Typography className="cookingTime" variant="span" component="span">
          🕒{recipe.cookingTime}m
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecipePreview;
