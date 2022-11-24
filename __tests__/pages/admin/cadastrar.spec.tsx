import { fireEvent, render, screen } from "@testing-library/react";
import Cadastrar from "../../../src/pages/admin/cadastrar";
describe('Cadastrar.tsx', () => {
   it("Inputs should be required", () => {
      render(<Cadastrar />)
      const inputNome = screen.getByTestId('nome')
      const button = screen.getByRole('button')
      const inputCategoria = screen.getByTestId('categoria')
      const inputValor = screen.getByTestId('valor')
      const inputQtd = screen.getByTestId('qtd')
      
      fireEvent.click(button)
      expect(inputNome).toBeRequired()

      fireEvent.change(inputNome, {
         target: {
            value: "Colar de ouro"
         }
      })
      fireEvent.click(button)
      expect(inputCategoria).toBeRequired()
      fireEvent.change(inputCategoria, {
         target: {
            value: "Colar"
         }
      })
      fireEvent.click(button)
      expect(inputValor).toBeRequired()

      fireEvent.change(inputValor, {
         target: {
            value: "100"
         }
      })
      expect(inputQtd).toBeRequired()
   });
   it("Button should be available after fill in fields form", () => {
      render(<Cadastrar />)
      const inputNome = screen.getByTestId('nome')
      const inputCategoria = screen.getByTestId('categoria')
      const inputValor = screen.getByTestId('valor')
      const inputQtd = screen.getByTestId('qtd')
      const button = screen.getByRole('button')
      fireEvent.change(inputNome, {
         target: {
            value: "Colar de ouro"
         }
      })
      fireEvent.change(inputCategoria, {
         target: {
            value: "Colar"
         }
      })
      fireEvent.change(inputValor, {
         target: {
            value: "100"
         }
      })
      fireEvent.change(inputQtd, {
         target: {
            value: "2"
         }
      })
      expect(button).not.toBeDisabled()
   })
});