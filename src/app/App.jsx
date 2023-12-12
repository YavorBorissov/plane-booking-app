import { memo, useEffect } from "react";
import "./App.scss";
import HomePage from "../pages/HomePage";
import { useDispatch } from "react-redux";
import { setAirports } from "../slices/airportsSlice";
import { API_BASE_URL } from "../constants/env";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        console.log(API_BASE_URL);
        const response = await fetch(`${API_BASE_URL}/airports`);
        if (!response.ok) {
          throw new Error("Failed to fetch airports");
        }

        const data = await response.json();
        console.log(data);
        dispatch(setAirports(data));
      } catch (error) {
        console.error("Error fetching airports:", error.message);
        // Handle error (e.g., show a user-friendly message)
      }
    };

    fetchAirports();
  }, [dispatch]);

  return (
    <div className="App">
      <HomePage />
    </div>
  );
};

export default memo(App);
