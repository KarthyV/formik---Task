import { useContext, useEffect, useState } from "react";
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
import Login from "./Login";
import Signup from "./Signup";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { MyContext } from "./context";
import { API } from "./api";
import ForgetPass from "./ForgetPass";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole, user, setUser, setIsAuthenticated } = useContext(MyContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (res.status == 200) {
      setUser("");
      setIsAuthenticated(false);
      localStorage.clear();
      navigate("/login");
    }
  };
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
            {userRole == "Admin" &&
              !location.pathname.includes("add") &&
              !location.pathname.includes("edit") && (
                <Button onClick={() => navigate("/recipe/add")} color="inherit">
                  Add Recipe
                </Button>
              )}
            {user && (
              <Button onClick={handleLogout} color="inherit">
                Logout
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
          {userRole == "Admin" ||
            (userRole == "ReadOnly" && (
              <Route path="recipe/edit/:id" element={<EditRecipe />} />
            ))}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgetPass />} />
          {/* <Form /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
