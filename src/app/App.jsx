import { memo } from "react";
import "./App.scss";
import HomePage from "pages/HomePage";

const App = () => {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
};

export default memo(App);
