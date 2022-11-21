import React, { useState, useEffect } from "react";
import { API } from "./api";
import RecipePreview from "./RecipePreview";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(`${API}/recipes`)
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <div className="recipeList_Container">
      {recipes.length > 0 &&
        recipes.map((recipe) => (
          <RecipePreview recipe={recipe} key={recipe._id} />
        ))}
    </div>
  );
};

export default RecipeList;
