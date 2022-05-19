import { render, screen, waitFor } from '@testing-library/react';
import Clientes from '.';

describe('Componente de Clientes', () => {
  test('Titulo está sendo carregado', () => {
    render(<Clientes />)

    expect(screen.getByText(/Lista de Clientes/i)).toBeInTheDocument();
  });

  test("Botão do formulario está sendo carregado", () => {
    render(<Clientes />)

    expect(screen.getByText(/Adicionar Cliente/i)).toBeInTheDocument();

  });


});

