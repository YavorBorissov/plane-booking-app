import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, updateForm } from "../slices/formSlice";
import {
  setValidationError,
  clearValidationError,
} from "../slices/validationSlice";
import FormInput from "./FormInput";
import "./Form.scss";

const Form = () => {
  const dispatch = useDispatch();

  const formData = useSelector((state) => state.form);
  const validationErrors = useSelector((state) => state.validation);

  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch(updateForm({ [name]: value }));
    dispatch(clearValidationError({ fieldName: name }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      // Handle form submission, e.g., make an API call
      // dispatch(resetForm());
    } else {
      Object.entries(validationErrors).forEach(([fieldName, errorMessage]) => {
        dispatch(setValidationError({ fieldName, errorMessage }));
      });
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!data.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!data.departureAirport.trim()) {
      errors.departureAirport = "Departure airport is required";
    }

    if (!data.destinationAirport.trim()) {
      errors.destinationAirport = "Destination airport is required";
    }

    if (!data.departureDate.trim()) {
      errors.departureDate = "Departure date is required";
    }

    if (!data.dateOfReturn.trim()) {
      errors.dateOfReturn = "Date of return is required";
    }

    return errors;
  };
  return (
    <div>
      <h2>Booking Form</h2>
      <div className="formContainer">
        <form onSubmit={handleSubmit} className="form">
          <FormInput
            name="firstName"
            id="firstName"
            type="text"
            placeHolder="First name"
            label="First name:"
            value={formData.firstName}
            onChange={handleChange}
            error={validationErrors.firstName}
          />
          <FormInput
            name="lastName"
            type="text"
            id="lastName"
            placeHolder="Last name"
            label="Last name:"
            value={formData.lastName}
            onChange={handleChange}
            error={validationErrors.lastName}
          />
          <FormInput
            name="departureAirport"
            type="text"
            id="departureAirport"
            placeHolder="Departure airport"
            label="Departure airport:"
            value={formData.departureAirport}
            onChange={handleChange}
            error={validationErrors.departureAirport}
          />
          <FormInput
            name="destinationAirport"
            type="text"
            id="destinationAirport"
            placeHolder="Destination airport"
            label="Destination airport:"
            value={formData.destinationAirport}
            onChange={handleChange}
            error={validationErrors.destinationAirport}
          />
          <FormInput
            name="departureDate"
            type="date"
            id="departureDate"
            placeHolder="Departure date"
            label="Departure date:"
            value={formData.departureDate}
            onChange={handleChange}
            error={validationErrors.departureDate}
          />
          <FormInput
            name="dateOfReturn"
            id="dateOfReturn"
            type="date"
            placeHolder="Date of return"
            label="Date of return:"
            value={formData.dateOfReturn}
            onChange={handleChange}
            error={validationErrors.dateOfReturn}
          />

          <div className="submitButtonContainer">
            <button type="submit" className="submitButton">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(Form);
