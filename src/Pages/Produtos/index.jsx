import { useEffect, useState } from 'react';
import style from './style.module.scss';

export default function SubCategorias() {

  const [serverData, setServerData] = useState();

  useEffect(() => {
    fetch("/produtos")
      .then(
        res => res.json()
      ).then(
        data => {
          setServerData(data);
        }
      )
  }, []);

  return (
    <section>

      <h1>Lista de Produtos</h1>

      <form action="/produtos" method="POST" autoComplete="off">
        <input
          type="text"
          name="nome"
          id="nome"
          placeholder='Nome do produto'
          required />
        <input
          type="number"
          name="valor"
          id="valor"
          placeholder='Valor do Produto'
          required />
        <input
          type="number"
          name="idSubCategoria"
          id="idSubCategoria"
          placeholder='Id da subCategoria'
          required />

        <button type="submit">Adicionar produto</button>
      </form>

      {((typeof serverData === 'undefined') ? (
        <p>Loading ...</p>
      ) : (
        serverData.response.map((item) => (
          <div key={item.ID}>
            <p>{item.NOME}</p>
            <p>{item.VALOR}</p>
          </div>

        ))
      )
      )}

    </section>
  )
}