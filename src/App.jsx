import { useState } from "react";
import AddRecipe from "./AddRecipe";
import "./App.css";
import Form from "./Form";
import { Routes, Route, useNavigate } from "react-router-dom";
import RecipeList from "./RecipeList";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <nav>
        <h2>Recipe App</h2>
        <button onClick={() => navigate("/recipe/add")}>Add Recipe</button>
      </nav>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/add" element={<AddRecipe />} />
        {/* <Form /> */}
      </Routes>
    </div>
  );
}

export default App;
