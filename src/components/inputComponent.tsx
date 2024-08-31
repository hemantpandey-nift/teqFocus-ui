import React from "react";
import { Field, ErrorMessage } from "formik";

type InputComponentProps = {
  htmlFor: string;
  type: string;
  id: string;
  name: string;
  placeholder: string;
  component: string;
  title: string;
};

const InputComponent: React.FC<InputComponentProps> = ({ htmlFor, type, id, name, placeholder, component, title }) => {
  return (
    <div className="formGroup">
      <label htmlFor={htmlFor}>{title}</label>
      <Field type={type} id={id} name={name} placeholder={placeholder} />
      <ErrorMessage name={name} component="div" className="errorMessage" />
    </div>
  );
};

export default InputComponent;
