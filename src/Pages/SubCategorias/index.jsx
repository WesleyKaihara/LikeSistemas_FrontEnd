import { useEffect, useState } from 'react';
import style from './style.module.scss';

export default function SubCategorias() {

  const [serverData, setServerData] = useState();

  useEffect(() => {
    fetch("/subCategorias")
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
      <h1>Lista de SubCategorias</h1>

      <form action="/subcategorias" method="POST">
        <input
          type="text"
          name="nome"
          id="nome"
          placeholder='Nome da subCategoria'
          required />
        <button type="submit">Adicionar subCategoria</button>
      </form>

      {((typeof serverData === 'undefined') ? (
        <p>Loading ...</p>
      ) : (
        serverData.response.map((item) => (
          <p key={item.ID}>{item.NOME}</p>
        ))
      )
      )}
    </section>
  )
}