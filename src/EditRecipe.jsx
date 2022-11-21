import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "./api";

const formValidationSchema = yup.object({
  recipeName: yup.string().required("Recipe Name must be provided"),
  recipePoster: yup.string().url().required("Kindly upload poster link"),
  cookingTime: yup.number().min(1).required("Cooking Time must be provided"),
  steps: yup.array().of(yup.string().required("Cannot be empty")).required(),
  ingName: yup.string().required("Ingredient Name must be provided"),
  ingQty: yup.number().required("Ingredient Qty must be provided"),
  recipeType: yup.string().required("Recipe type must be provided"),
});

const EditRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState("");
  const [inputFields, setInputFields] = useState([]);
  const [steps, setSteps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        const numberOfInputFields = [];
        numberOfInputFields.length = data.step.length;
        numberOfInputFields.fill("");
        setInputFields(numberOfInputFields);
        setSteps(data.step);
      });
  }, []);

  const { values, handleChange, handleBlur, touched, handleSubmit, errors } =
    useFormik({
      initialValues: {
        recipeName: recipe.recipeName,
        recipePoster: recipe.recipePoster,
        cookingTime: recipe.cookingTime,
        steps: steps,
        ingName: recipe.ingName,
        ingQty: recipe.ingQty,
        recipeType: recipe.recipeType,
      },
      validationSchema: formValidationSchema,
      enableReinitialize: true,
      onSubmit: (values) => {
        const updatedData = {
          recipeName: values.recipeName,
          recipePoster: recipe.recipePoster,
          cookingTime: recipe.cookingTime,
          step: values.steps,
          ingName: recipe.ingName,
          ingQty: recipe.ingQty,
          recipeType: recipe.recipeType,
        };
        fetch(`${API}/recipes/${id}`, {
          method: "PATCH",
          body: JSON.stringify(updatedData),
          headers: { "Content-Type": "application/json" },
        }).then(() => navigate("/"));
        console.log(updatedData);
      },
    });
  function addInputField(e) {
    e.preventDefault();
    setInputFields((inputFields) => [...inputFields, ""]);
    setSteps((steps) => [...steps, ""]);
    console.log(steps);
  }

  function removeInputField(index, e) {
    console.log(index);
    e.preventDefault();
    const copyInputField = [...inputFields];
    copyInputField.splice(index, 1);
    const stepsCopy = [...steps];
    values.steps.splice(index, 1);
    stepsCopy.splice(index, 1);
    setSteps(stepsCopy);
    setInputFields(copyInputField);
  }
  //   console.log(steps);
  console.log(values.steps);

  if (!recipe) return <div>Loading...</div>;
  else
    return (
      <div className="formContainer">
        {/* <pre>{JSON.stringify(values)}</pre> */}
        <form onSubmit={handleSubmit}>
          <div className="fieldBox">
            <label>Recipe Name</label>
            <input
              type="text"
              name="recipeName"
              placeholder="Enter Recipe Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.recipeName}
            />
            <p>
              {errors.recipeName && touched.recipeName
                ? errors.recipeName
                : null}
            </p>
          </div>
          <div className="fieldBox">
            <label>Poster Link</label>
            <input
              type="url"
              name="recipePoster"
              placeholder="Enter Recipe Poster"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.recipePoster}
            />
            <p>
              {errors.recipePoster && touched.recipePoster
                ? errors.recipePoster
                : null}
            </p>
          </div>
          <div className="fieldBox">
            <label>Cooking Time</label>
            <input
              type="number"
              name="cookingTime"
              placeholder="Enter Cooking Time"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.cookingTime}
            />
            <p>
              {errors.cookingTime && touched.cookingTime
                ? errors.cookingTime
                : null}
            </p>
          </div>
          <div className="fieldBox">
            <label>Steps for Cooking</label>
            {values.steps &&
              inputFields.map((input, index) => {
                return (
                  <div key={index}>
                    <input
                      name={`steps[${index}]`}
                      placeholder="Add Step"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.steps[index]}
                      required
                    />
                    <button
                      type="button"
                      onClick={(e) => removeInputField(index, e)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <p>{errors.steps && touched.steps ? errors.steps : null}</p>
                  </div>
                );
              })}
            <button onClick={addInputField} type="button">
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div className="fieldBox">
            <label>Ingredients</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                name="ingName"
                placeholder="Ingredient Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ingName}
              />
              <p>{errors.ingName && touched.ingName ? errors.ingName : null}</p>
              <input
                type="number"
                name="ingQty"
                placeholder="Ingredient Quantity"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ingQty}
              />
              <p>{errors.ingQty && touched.ingQty ? errors.ingQty : null}</p>
            </div>
          </div>
          <div className="fieldBox">
            <h3>Recipe Type</h3>
            <div>
              <label htmlFor="veg">Veg</label>
              <input
                className="inputField"
                type="radio"
                name="recipeType"
                defaultChecked={values?.recipeType?.includes("veg")}
                value="veg"
                onChange={handleChange}
                onBlur={handleBlur}
                id="veg"
              />{" "}
              <label htmlFor="nonVeg">Non Veg</label>
              <input
                className="inputField"
                type="radio"
                name="recipeType"
                onChange={handleChange}
                onBlur={handleBlur}
                value="nonVeg"
                defaultChecked={values?.recipeType?.includes("nonVeg")}
                id="nonVeg"
              />{" "}
            </div>
            <p>
              {errors.recipeType && touched.recipeType
                ? errors.recipeType
                : null}
            </p>
          </div>
          <button type="submit">Edit Recipe</button>
        </form>
      </div>
    );
};

export default EditRecipe;
