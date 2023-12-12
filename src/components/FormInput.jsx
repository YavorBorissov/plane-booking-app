import { memo } from "react";
import "./FormInput.scss";

const FormInput = (props) => {
  return (
    <div>
      <div className="formInput">
        <label className="formInputLabel">{props.label}</label>
        <input
          id={props.id}
          name={props.name}
          type={props.type}
          placeholder={props.placeHolder}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
      {props.error && <span className="error">{props.error}</span>}
    </div>
  );
};

export default memo(FormInput);
