import { render, screen } from '@testing-library/react';
import Produtos from '.';



describe("Página de Cadastro de Produtos", () => {
  test("Coluna IDs dos produtos esta sendo carregada", () => {
    render(<Produtos />)
    expect(screen.getByText("Id")).toBeInTheDocument();
  })

  test("Coluna Nomes dos produtos esta sendo carregada", () => {
    render(<Produtos />)
    expect(screen.getByText("Nome")).toBeInTheDocument();
  })

  test("Coluna para Deletar os produtos esta sendo carregada", () => {
    render(<Produtos />)
    expect(screen.getByText("Deletar")).toBeInTheDocument();
  })

})