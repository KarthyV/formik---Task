import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

const ViewRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState("");
  const [dense, setDense] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://624e6fbb77abd9e37c86ffd1.mockapi.io/recipe/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, [id]);

  const handleDelete = () => {
    fetch(`https://624e6fbb77abd9e37c86ffd1.mockapi.io/recipe/${id}`, {
      method: "DELETE",
    }).then(() => {
      alert("Recipe Deleted Successfully");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    });
  };

  console.log(id);
  if (!recipe) return <div>Loading...</div>;
  else {
    return (
      <div className="viewContainer">
        <Card className="viewRecipe">
          <CardMedia
            component="img"
            height="240"
            image={recipe.recipePoster}
            alt={recipe.recipeName}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {recipe.recipeName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cooking Time : 🕒 {recipe.cookingTime} mins
            </Typography>
          </CardContent>
          <CardContent>
            <List dense={dense}>
              {recipe.step.map((step) => {
                return (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <DoubleArrowIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={step} />
                  </ListItem>
                );
              })}
            </List>
          </CardContent>

          <CardActions className="viewPage_actions">
            <Button
              onClick={() => navigate(`/recipe/edit/${recipe.id}`)}
              variant="contained"
            >
              EDIT
            </Button>
            <Button onClick={handleDelete} variant="contained" color="error">
              DELETE
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
};

export default ViewRecipe;
