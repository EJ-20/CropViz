import { render, screen } from "@testing-library/react";
import Sidebar from "../components/Sidebar";
import userEvent from "@testing-library/user-event";

test("renders crop filter dropdown", () => {
  render(<Sidebar filters={{ crop: "", year: "" }} setFilters={() => {}} />);
  const label = screen.getByText(/Crop Type/i);
  expect(label).toBeInTheDocument();
});
