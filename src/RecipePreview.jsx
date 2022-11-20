import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Brightness1Icon from "@mui/icons-material/Brightness1";

const RecipePreview = ({ recipe }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${recipe._id}`);
  };

  return (
    <Card onClick={handleClick} sx={{ minWidth: 300, minHeight: 200 }}>
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
      <Typography
        className={`recipeType ${recipe.recipeType == "veg" ? "green" : "red"}`}
        variant="p"
        component="p"
      >
        <Brightness1Icon />
      </Typography>
    </Card>
  );
};

export default RecipePreview;
