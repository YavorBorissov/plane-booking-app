import { memo } from "react";
import "./FormField.scss";

const FormSelect = (props) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value;

    props.onChange &&
      props.onChange({ name: props.name, value: selectedValue });
  };
  return (
    <div>
      <div className="formField">
        <label className="formFieldLabel">{props.label}</label>
        <select
          value={props.value}
          id={props.id}
          name={props.name}
          placeholder={props.placeHolder}
          onChange={handleChange}
        >
          <option key="" value=""></option>
          {props.values.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      {props.error && <span className="error">{props.error}</span>}
    </div>
  );
};

export default memo(FormSelect);
