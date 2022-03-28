import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const MockedApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

test("renders learn react link", () => {
  render(<MockedApp />);
});
