import { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, selectForm, updateForm } from "../slices/formSlice";
import {
  setValidationError,
  clearValidationError,
  selectValidationErrors,
} from "../slices/validationSlice";
import FormInput from "./FormInput";
import "./Form.scss";
import { selectAirports } from "../slices/airportsSlice";
import FormSelect from "./FormSelect";
import { createBooking } from "../actions/createBooking";
import {
  resetBookings,
  selectBookings,
  setShouldFetchBookings,
} from "../slices/bookingsSlice";
import GoIcon from "../icons/GoIcon";

const Form = () => {
  const dispatch = useDispatch();

  const formData = useSelector(selectForm);
  const validationErrors = useSelector(selectValidationErrors);
  const airports = useSelector(selectAirports);

  const bookings = useSelector(selectBookings);
  const shouldFetchBookings = useMemo(
    () => bookings.shouldFetchBookings,
    [bookings.shouldFetchBookings]
  );

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      dispatch(updateForm({ [name]: value }));
      dispatch(clearValidationError({ fieldName: name }));
    },
    [dispatch]
  );

  const handleSelectChange = useCallback(
    ({ name, value }) => {
      dispatch(updateForm({ [name]: value }));
      dispatch(clearValidationError({ fieldName: name }));
    },
    [dispatch]
  );

  const validateForm = useCallback((data) => {
    const errors = {};

    if (!data.firstName.trim()) {
      errors.firstName = "Field is required";
    }

    if (!data.lastName.trim()) {
      errors.lastName = "Field required";
    }

    if (!data.departureAirport.trim()) {
      errors.departureAirport = "Field is required";
    }

    if (!data.destinationAirport.trim()) {
      errors.destinationAirport = "Field is required";
    }

    if (!data.departureDate.trim()) {
      errors.departureDate = "Field is required";
    }

    if (!data.dateOfReturn.trim()) {
      errors.dateOfReturn = "Field is required";
    }

    if (
      data.departureAirport.trim() === data.destinationAirport.trim() &&
      data.departureAirport.trim() !== ""
    ) {
      errors.destinationAirport = "Departure and destination must be different";
    }

    if (new Date(data.departureDate) > new Date(data.dateOfReturn)) {
      errors.dateOfReturn = "You can't travel back in time :)";
    }

    if (
      new Date().setHours(0, 0, 0, 0) >
      new Date(data.departureDate).setHours(0, 0, 0, 0)
    ) {
      errors.departureDate = "Date is invalid";
    }

    return errors;
  }, []);

  const getAirportIdFromSelectString = useCallback(
    (str) => {
      return airports.find((ap) => ap.code === str.slice(0, 3)).id;
    },
    [airports]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const validationErrors = validateForm(formData);

      if (Object.keys(validationErrors).length === 0) {
        await dispatch(
          createBooking({
            firstName: formData.firstName,
            lastName: formData.lastName,
            departureAirportId: getAirportIdFromSelectString(
              formData.departureAirport
            ),
            arrivalAirportId: getAirportIdFromSelectString(
              formData.destinationAirport
            ),
            departureDate: new Date(formData.departureDate),
            returnDate: new Date(formData.dateOfReturn),
          })
        );

        dispatch(resetForm());
        dispatch(resetBookings());
        dispatch(setShouldFetchBookings(shouldFetchBookings));
      } else {
        Object.entries(validationErrors).forEach(
          ([fieldName, errorMessage]) => {
            dispatch(setValidationError({ fieldName, errorMessage }));
          }
        );
      }
    },
    [
      dispatch,
      formData,
      getAirportIdFromSelectString,
      shouldFetchBookings,
      validateForm,
    ]
  );

  return (
    <div>
      <div className="formContainer">
        <form onSubmit={handleSubmit} className="form">
          <FormInput
            name="firstName"
            id="firstName"
            type="text"
            placeHolder="Your first name"
            label="First name:"
            value={formData.firstName}
            onChange={handleInputChange}
            error={validationErrors.firstName}
          />
          <FormInput
            name="lastName"
            type="text"
            id="lastName"
            placeHolder="Your last name"
            label="Last name:"
            value={formData.lastName}
            onChange={handleInputChange}
            error={validationErrors.lastName}
          />
          <FormSelect
            name="departureAirport"
            id="departureAirport"
            placeHolder="Departure airport"
            label="Departure airport:"
            value={formData.departureAirport}
            values={airports.map(
              (airport) => `${airport.code} | ${airport.title}`
            )}
            onChange={handleSelectChange}
            error={validationErrors.departureAirport}
          />
          <FormSelect
            name="destinationAirport"
            id="destinationAirport"
            placeHolder="Destination airport"
            label="Destination airport:"
            value={formData.destinationAirport}
            values={airports.map(
              (airport) => `${airport.code} | ${airport.title}`
            )}
            onChange={handleSelectChange}
            error={validationErrors.destinationAirport}
          />
          <FormInput
            name="departureDate"
            type="date"
            id="departureDate"
            placeHolder="Departure date"
            label="Departure date:"
            value={formData.departureDate}
            onChange={handleInputChange}
            error={validationErrors.departureDate}
          />
          <FormInput
            name="dateOfReturn"
            id="dateOfReturn"
            type="date"
            placeHolder="Date of return"
            label="Date of return:"
            value={formData.dateOfReturn}
            onChange={handleInputChange}
            error={validationErrors.dateOfReturn}
          />

          <div className="submitButtonContainer">
            <button type="submit" className="submitButton">
              <GoIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(Form);
