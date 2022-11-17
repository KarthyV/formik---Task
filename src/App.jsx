import { useState } from "react";
import AddRecipe from "./AddRecipe";
import "./App.css";
import Form from "./Form";
import {
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import RecipeList from "./RecipeList";
import ViewRecipe from "./ViewRecipe";
import EditRecipe from "./EditRecipe";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              className="app_title"
            >
              Recipe App
            </Typography>
            {!location.pathname.includes("add") &&
              !location.pathname.includes("edit") && (
                <Button onClick={() => navigate("/recipe/add")} color="inherit">
                  Add Recipe
                </Button>
              )}
          </Toolbar>
        </AppBar>
      </Box>
      <div className="App">
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/add" element={<AddRecipe />} />
          <Route path="/recipe/:id" element={<ViewRecipe />} />
          <Route path="recipe/edit/:id" element={<EditRecipe />} />
          {/* <Form /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
