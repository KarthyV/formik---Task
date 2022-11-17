import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

const RecipePreview = ({ recipe }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={recipe.recipePoster}
        alt={recipe.recipeName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {recipe.recipeName}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecipePreview;
