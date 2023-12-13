import { memo, useEffect } from "react";
import "./App.scss";
import HomePage from "../pages/HomePage";
import { useDispatch } from "react-redux";
import { fetchAirports } from "../actions/fetchAirports";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAirports());
  }, [dispatch]);

  return (
    <div className="App">
      <HomePage />
    </div>
  );
};

export default memo(App);
