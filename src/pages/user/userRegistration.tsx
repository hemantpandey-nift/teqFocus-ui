import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputComponent from "../../components/inputComponent";
import CONSTANTS from "../../constants/constants";
import { UserType } from "../../constants/types";

const UserRegistrationForm = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, `First Name ${CONSTANTS.MESSAGES.ERRORS.minCharError}`)
      .max(50, `First Name ${CONSTANTS.MESSAGES.ERRORS.maxCharError}`)
      .required(`First Name ${CONSTANTS.MESSAGES.ERRORS.requiredError}`),
    middleName: Yup.string()
      .min(3, `Middle Name ${CONSTANTS.MESSAGES.ERRORS.minCharError}`)
      .max(50, `Middle Name ${CONSTANTS.MESSAGES.ERRORS.maxCharError}`)
      .optional(),
    lastName: Yup.string()
      .min(3, `Last Name ${CONSTANTS.MESSAGES.ERRORS.minCharError}`)
      .max(50, `Last Name ${CONSTANTS.MESSAGES.ERRORS.maxCharError}`)
      .required(`Last Name ${CONSTANTS.MESSAGES.ERRORS.requiredError}`),
    userEmail: Yup.string().email(CONSTANTS.MESSAGES.ERRORS.invalidEmail).required(`Email ${CONSTANTS.MESSAGES.ERRORS.requiredError}`),
  });

  // Initial form values
  const initialValues: UserType = {
    firstName: "",
    middleName: "",
    lastName: "",
    userEmail: "",
  };

  // Form submission handler
  const onSubmit = (values: any, { setSubmitting }: any) => {
    console.log("Form data", values);
    setSubmitting(false);
  };

  return (
    <div className="formContainer">
      <h2>User Registration</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <InputComponent
              htmlFor="firstName"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your First name"
              component="div"
              title="First Name"
            />

            <InputComponent
              htmlFor="middleName"
              type="text"
              id="middleName"
              name="middleName"
              placeholder="Enter your Middle Name"
              component="div"
              title="Middle Name"
            />

            <InputComponent htmlFor="lastName" type="text" id="lastName" name="lastName" placeholder="Enter your Last Name" component="div" title="Last Name" />

            <InputComponent htmlFor="userEmail" type="text" id="userEmail" name="userEmail" placeholder="Enter your email" component="div" title="Email" />

            <button type="submit" className="submitButton" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserRegistrationForm;
