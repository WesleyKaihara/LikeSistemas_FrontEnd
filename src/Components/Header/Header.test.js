import { render, screen } from '@testing-library/react';
import Header from '.';

describe('Header', () => {
  test('Titulo está sendo renderizado', () => {
    render(<Header
      title={"Teste"}
    />);
    expect(screen.getByText('Teste')).toBeInTheDocument();
  });

  test("Menu está sendo Carregado", () => {
    render(<Header />)

    expect(screen.getByText("Fazer Orçamento")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar Produto")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar subCategoria")).toBeInTheDocument();
  })


})