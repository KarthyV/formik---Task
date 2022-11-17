import React, { useState, useEffect } from "react";
import RecipePreview from "./RecipePreview";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(`https://624e6fbb77abd9e37c86ffd1.mockapi.io/recipe`)
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <div className="recipeList_Container">
      {recipes.length > 0 &&
        recipes.map((recipe) => (
          <RecipePreview recipe={recipe} key={recipe.id} />
        ))}
    </div>
  );
};

export default RecipeList;
