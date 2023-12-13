import { memo } from "react";
import "./FormField.scss";

const FormInput = (props) => {
  return (
    <div>
      <div className="formField">
        <label className="formInputLabel">{props.label}</label>
        <input
          id={props.id}
          name={props.name}
          type={props.type}
          placeholder={props.placeHolder}
          value={props.value}
          onChange={props.onChange}
          {...(props.type === "date" &&
            props.minDate && { min: props.minDate })}
        />
      </div>
      {props.error && <span className="error">{props.error}</span>}
    </div>
  );
};

export default memo(FormInput);
