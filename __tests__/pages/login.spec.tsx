import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react'
import Login from "../../src/pages/admin/login"
import axios from "axios"

const mockRequest = jest.fn()
jest.mock('axios')

describe('login.tsx', () => {
   it('if email or password was incorrect shut on alert', async () => {
      render(<Login />)
      const inputEmail = screen.getByTestId('email')
      const inputPassword = screen.getByTestId('password')
      const button = screen.getByRole('button')
      fireEvent.change(inputEmail, {
         target: {
            value: 'alan@alan.com',
         }
      })
      fireEvent.change(inputPassword, {
         target: {
            value: 'aa1122',
         }
      })
      fireEvent.click(button)
      await act(() => {
         expect(axios.post).toHaveBeenCalledWith(
            "http://localhost:8080/api/login",
            expect.objectContaining(
               { email: 'alan@alan.com', password: 'aa1122' })
         )
      })
      // await act(() => {
      //    mockRequest.mockResolvedValue('senha ou email inválido')
      //    const error = screen.getByText(/inválido/i)
      //    expect(error).toBeTruthy();
      // })
   });
});