import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { API } from "./api";
import { MyContext } from "./context";
import RecipePreview from "./RecipePreview";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const { userRole, user } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    else {
      fetch(`${API}/recipes`)
        .then((res) => res.json())
        .then((data) => setRecipes(data));
    }
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
