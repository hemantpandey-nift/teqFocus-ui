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
  disabled: boolean;
};

const InputComponent: React.FC<InputComponentProps> = ({ htmlFor, type, id, name, placeholder, component, title, disabled }) => {
  return (
    <div className="formGroup">
      <label htmlFor={htmlFor} className="labelText">
        {title}
      </label>
      <Field type={type} id={id} name={name} placeholder={placeholder} disabled={disabled} className="inputFeild" />
      <ErrorMessage name={name} component="div" className="errorMessage" />
    </div>
  );
};

export default InputComponent;
