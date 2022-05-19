import { render, screen } from '@testing-library/react';

import SubCategorias from '.';


describe("Página de Cadastro de SubCategorias", () => {
  test("Coluna de IDs está sendo carregada", () => {
    render(<SubCategorias />)

    expect(screen.getByText(/ID/i)).toBeInTheDocument();
  })

  test("Coluna para deletar subCategorias está sendo carregada", () => {
    render(<SubCategorias />)

    expect(screen.getByText(/Deletar/i)).toBeInTheDocument();
  })

})