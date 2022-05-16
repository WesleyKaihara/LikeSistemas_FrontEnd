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
    <section className={style.subCategorias}>
      <header>
        <h1 className={style.title}>Lista de SubCategorias</h1>
      </header>

      <section className={style.subMenu}>
        <ul>
          <li><a href="/produtos"><p>Cadastrar Produto</p></a></li>
          <li><a href="/"><p>Fazer Orçamento</p></a></li>
        </ul>
      </section>

      <form action="/subcategorias" method="POST" className={style.form} autocomplete="off">
        <input
          type="text"
          name="nome"
          id="nome"
          placeholder='Nome da subCategoria'
          required />
        <button type="submit">Adicionar subCategoria</button>
      </form>

      <main className={style.subCategoriasContainer}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>SubCategoria</th>
            </tr>
          </thead>
          <tbody>
            {((typeof serverData === 'undefined') ? (
              <tr><td> Loading ...</td><td></td></tr>
            ) : (
              serverData.response.map((item) => (
                <tr key={item.ID} className={style.tableRow}>
                  <td>{item.ID}</td>
                  <td>{item.NOME}</td>
                </tr>

              ))
            )
            )}
          </tbody>
        </table>
      </main>

    </section>
  )
}