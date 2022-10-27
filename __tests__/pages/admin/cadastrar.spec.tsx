import { fireEvent, render, screen } from "@testing-library/react";
import Cadastrar from "../../../src/pages/admin/cadastrar";
describe('Cadastrar.tsx', () => {
   it("Inputs should be required", () => {
      render(<Cadastrar />)
      const inputNome = screen.getByTestId('nome')
      const button = screen.getByRole('button')
      fireEvent.click(button)
      expect(inputNome).toBeRequired()

      const inputCategoria = screen.getByTestId('categoria')
      fireEvent.change(inputNome, {
         target: {
            value: "Colar de ouro"
         }
      })
      fireEvent.click(button)
      expect(inputCategoria).toBeRequired()

      const inputValor = screen.getByTestId('valor')
      fireEvent.change(inputCategoria, {
         target: {
            value: "Colar"
         }
      })
      fireEvent.click(button)
      expect(inputValor).toBeRequired()

      const inputQtd = screen.getByTestId('qtd')
      fireEvent.change(inputValor, {
         target: {
            value: "100"
         }
      })
      expect(inputQtd).toBeRequired()
   });
});