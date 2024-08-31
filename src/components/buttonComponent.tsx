import React from "react";

type ButtonComponentProps = {
  title: string;
  disabled: boolean;
  onClick: any;
  type: any;
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({ title, disabled = false, onClick, type = "button" }) => {
  return (
    <button className="button" title={title} disabled={disabled} onClick={onClick} type={type}>
      {title}
    </button>
  );
};

export default ButtonComponent;
