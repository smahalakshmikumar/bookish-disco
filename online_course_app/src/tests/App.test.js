import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

jest.mock("../__mocks__/SelectedCourse.mock.js");

test("renders", () => {
  const { container } = render(<App />);
  console.log(container.debug());
});
