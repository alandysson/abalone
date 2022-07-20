import { render, screen } from "@testing-library/react";
import React from "react"
import Navbar from "../../src/components/Navbar";

describe('Test in Navbar.tsx', () => {
   it('title', () => {
      render(<Navbar />)
      const title = screen.getByText("Abalone")
      expect(title).toBeInTheDocument()
   });
});