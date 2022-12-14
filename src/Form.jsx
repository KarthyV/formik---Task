import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const formValidationSchema = yup.object({
  name: yup.string().required("Name is mandatory"),
  email: yup.string().email().required("Email Required"),
  pin: yup.string().required("Pin Required"),
  eventDate: yup.date().required("Please provide a valid date"),
  seats: yup
    .number()
    .min(5)
    .max(50)
    .required("Provide number of seats required"),
  proof: yup
    .mixed()
    .required("ID proof is required")
    .test("fileFormat", "Upload PDF file format.", (value) => {
      value && ["application/pdf"].includes(value.type);
    }),
  location: yup.string().url().required("Please share event location link"),
  checked: yup.array().min(1).of(yup.string().required()).required(),
  gender: yup.string().required("Please select gender"),
});

const Form = () => {
  const { values, handleChange, handleSubmit, errors, handleBlur, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        pin: "",
        eventDate: "",
        seats: "",
        gender: "female",
        checked: ["drink", "snacks"],
        proof: "",
        location: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: function (values) {
        console.log(values);
      },
    });
  return (
    <div className="formContainer">
      <h1>Form Task using Formik</h1>
      <form onSubmit={handleSubmit}>
        <div className="fieldBox">
          <label>Host Name</label>
          <input
            className="inputField"
            type="text"
            name="name"
            placeholder="Enter your name"
            values={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p>{errors.name && touched.name ? errors.name : null}</p>
        </div>

        <div className="fieldBox">
          <label>Email</label>
          <input
            className="inputField"
            type="email"
            name="email"
            placeholder="Enter your email"
            values={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p>{errors.email && touched.email ? errors.email : null}</p>
        </div>

        <div className="fieldBox">
          <label>Secret Pin</label>
          <input
            className="inputField"
            type="password"
            name="pin"
            placeholder="Enter your password"
            values={values.pin}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p>{errors.pin && touched.pin ? errors.pin : null}</p>
        </div>

        <div className="fieldBox">
          <label>Event Date</label>
          <input
            className="inputField"
            type="date"
            name="eventDate"
            placeholder="Enter availability date"
            values={values.eventDate}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p>
            {errors.eventDate && touched.eventDate ? errors.eventDate : null}
          </p>
        </div>

        <div className="fieldBox">
          <label>Number of seats</label>
          <input
            className="inputField"
            type="number"
            name="seats"
            placeholder="Enter number of seats"
            values={values.seats}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p>{errors.seats && touched.seats ? errors.seats : null}</p>
        </div>

        <div className="fieldBox">
          <h3>Host Gender</h3>
          <div>
            <label htmlFor="male">Male</label>
            <input
              className="inputField"
              type="radio"
              name="gender"
              defaultChecked={values.gender.includes("male")}
              values={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              id="male"
            />{" "}
            <label htmlFor="female">Female</label>
            <input
              className="inputField"
              type="radio"
              name="gender"
              onChange={handleChange}
              onBlur={handleBlur}
              values={values.gender}
              defaultChecked={values.gender.includes("female")}
              id="female"
            />{" "}
          </div>
          <p>{errors.gender && touched.gender ? errors.gender : null}</p>
        </div>
        <div className="fieldBox">
          <label>Upload ID Proof :</label>
          <input
            className="inputField"
            type="file"
            name="proof"
            values={values.proof}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p>{errors.proof && touched.proof ? errors.proof : null}</p>
        </div>
        <div className="fieldBox">
          <label>Event Location Link : </label>
          <input
            className="inputField"
            type="url"
            name="location"
            values={values.location}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p>{errors.location && touched.location ? errors.location : null}</p>
        </div>
        <div>
          <h3>Compliments</h3>
          <label>Drink</label>
          <input
            className="inputField"
            type="checkbox"
            name="checked"
            value="drink"
            defaultChecked={values.checked.includes("drink")}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label>Snacks</label>
          <input
            className="inputField"
            type="checkbox"
            name="checked"
            value="snacks"
            onChange={handleChange}
            defaultChecked={values.checked.includes("snacks")}
            onBlur={handleBlur}
          />
          <label>Lunch</label>
          <input
            className="inputField"
            type="checkbox"
            name="checked"
            value="lunch"
            onChange={handleChange}
            defaultChecked={values.checked.includes("lunch")}
            onBlur={handleBlur}
          />

          <p>{errors.checked && touched.checked ? errors.checked : null}</p>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
