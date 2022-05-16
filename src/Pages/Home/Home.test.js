import { render, screen } from '@testing-library/react';
import Home from '.';

//getByText -> Lança erro
//queryByText -> retorna null
//findByText -> retorna promise

describe('Pagina Orçamentos', () => {
  test('Iniciar com titulo orçamento', () => {
    render(<Home />);

    const orcamentoTitle = screen.getByText('Orçamento');
    expect(orcamentoTitle).toBeInTheDocument();
  });

  test('Iniciar com titulo Lista de Produtos', () => {
    render(<Home />);
    expect(screen.getByText(/Lista de Produtos/i)).toBeInTheDocument();
  });

  test('Iniciar com valor total igual a 0', () => {
    render(<Home />);
    expect(screen.getByText(/Valor total: 0/i)).toBeInTheDocument();
  });

  test('Botão de finalizar orçamento está sendo renderizado', () => {
    render(<Home />)
    expect(screen.getByRole('button', { name: /Finalizar orçamento/i })).toBeInTheDocument();
  });


});