import { render, screen } from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom'
import Home from "../../src/pages";

describe('Testing index.tsx', () => {
   it('should be have Abalone name', () => {
      render(<Home
         items={[]}
         pageable={{ currentPage: 1, totalPages: 1 }}
      />)
      const title = screen.getByText('Abalone')
      expect(title).toBeInTheDocument()
   });
});