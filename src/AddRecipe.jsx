import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { API } from "./api";
import { MyContext } from "./context";
import NotAuth from "./NotAuth";

const formValidationSchema = yup.object({
  recipeName: yup.string().required("Recipe Name must be provided"),
  recipePoster: yup.string().url().required("Kindly upload poster link"),
  cookingTime: yup.number().min(1).required("Cooking Time must be provided"),
  steps: yup.array().of(yup.string().required("Cannot be empty")).required(),
  ingName: yup.string().required("Ingredient Name must be provided"),
  ingQty: yup.number().required("Ingredient Qty must be provided"),
  recipeType: yup.string().required("Recipe type must be provided"),
});

const AddRecipe = () => {
  const [inputFields, setInputFields] = useState([""]);
  const [steps, setSteps] = useState([]);
  const { userRole, isAuthenticated, user } = useContext(MyContext);
  const navigate = useNavigate();
  // const step = new Array();
  // step.length = inputFields.length;

  // useEffect(() => {
  //   if (!isAuthenticated || userRole == "ReadOnly") {
  //     alert("Not Authorized");
  //     navigate("/");
  //   }
  // }, [isAuthenticated]);

  const { values, handleChange, handleBlur, touched, handleSubmit, errors } =
    useFormik({
      initialValues: {
        recipeName: "",
        recipePoster: "",
        cookingTime: "",
        steps: steps,
        ingName: "",
        ingQty: "",
        recipeType: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        const data = {
          recipeName: values.recipeName,
          recipeType: values.recipeType,
          recipePoster: values.recipePoster,
          cookingTime: values.cookingTime,
          ingName: values.ingName,
          ingQty: values.ingQty,
          step: values.steps,
        };
        const res = await fetch(`${API}/recipes`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(data),
        });
        console.log(res);
        navigate("/");
      },
    });
  function addInputField(e) {
    e.preventDefault();
    setInputFields((inputFields) => [...inputFields, ""]);
    setSteps((steps) => [...steps, ""]);
  }

  function removeInputField(index, e) {
    e.preventDefault();
    const copyInputField = [...inputFields];
    copyInputField.splice(index, 1);
    const stepsCopy = [...steps];
    values.steps.splice(index, 1);
    stepsCopy.splice(index, 1);
    setSteps(stepsCopy);
    setInputFields(copyInputField);
  }
  if (userRole !== "Admin") return <NotAuth />;
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
              values={values.recipePoster}
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
              values={values.cookingTime}
            />
            <p>
              {errors.cookingTime && touched.cookingTime
                ? errors.cookingTime
                : null}
            </p>
          </div>
          <div className="fieldBox">
            <label>Steps for Cooking</label>
            {inputFields.map((input, index) => {
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
            <div className="ingField">
              <input
                type="text"
                name="ingName"
                placeholder="Ingredient Name"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values.ingName}
              />
              <p>{errors.ingName && touched.ingName ? errors.ingName : null}</p>
              <input
                type="number"
                name="ingQty"
                placeholder="Ingredient Quantity"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values.ingQty}
              />
              <p>{errors.ingQty && touched.ingQty ? errors.ingQty : null}</p>
            </div>
          </div>
          <div className="fieldBox">
            <h3>Recipe Type</h3>
            <div className="recipeTypeField">
              <label htmlFor="veg">Veg</label>
              <input
                className="inputField"
                type="radio"
                name="recipeType"
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
                id="nonVeg"
              />{" "}
            </div>
            <p>
              {errors.recipeType && touched.recipeType
                ? errors.recipeType
                : null}
            </p>
          </div>
          <button type="submit">Add Recipe</button>
        </form>
      </div>
    );
};

export default AddRecipe;
