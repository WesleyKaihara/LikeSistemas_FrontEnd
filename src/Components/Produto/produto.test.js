import { getByTestId, render, screen } from '@testing-library/react';

import Produto from '.';

//tipo de dados não precisa ser testado pois na criação da query tudo vira String

const produto = {
  ID: 1,
  NOME: 'Coxinha',
  VALOR: 1.5,
  SUBCATEGORIA: 'Subcategoria'
}


describe('Componente Produto', () => {
  test('Nome está sendo renderizado', () => {
    render(<Produto
      produto={produto}
    />)
    expect(screen.getByText('Coxinha')).toBeInTheDocument();
  });

  test('Subcategoria está sendo renderizada', () => {
    render(<Produto
      produto={produto}
    />)
    expect(screen.getByText('Subcategoria')).toBeInTheDocument();
  });

  test('Valor está sendo renderizado', () => {
    render(<Produto
      produto={produto}
    />)
    expect(screen.getByText(1.5)).toBeInTheDocument();
  });

  test('Botão Acrescentar quantidade está sendo renderizado', () => {
    render(<Produto
      produto={produto}
    />)
    expect(screen.getByText('+')).toBeInTheDocument();
  });

  test('Botão Decrementar quantidade está sendo renderizado', () => {
    render(<Produto
      produto={produto}
    />)
    expect(screen.getByText('-')).toBeInTheDocument();
  });

})