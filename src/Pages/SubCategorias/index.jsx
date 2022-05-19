import { useEffect, useState } from 'react';
import Header from '../../Components/Header';
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

  function deleteSubCategoria(item) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idSubCategoria: item.target.id
      })
    };
    fetch('/subCategorias', requestOptions)
      .then(response => response.json())

    item.target.style.color = 'red';
    let itens = document.getElementsByName(item.target.id);
    itens.forEach((item, index) => {
      item.style.color = 'red';
    })

  }

  return (
    <section className={style.subCategorias}>

      <Header
        title="Lista de SubCategorias"
      />

      <form
        action="/subcategorias"
        method="POST"
        className={style.form}
        autoComplete="off"
      >
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
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {((typeof serverData === 'undefined') ? (
              <tr><td> Loading ...</td><td></td></tr>
            ) : (
              serverData.response.map((item) => (
                <tr key={item.ID} className={style.tableRow}>
                  <td name={item.ID}>{item.ID}</td>
                  <td name={item.ID}>{item.NOME}</td>
                  <td
                    onClick={item => deleteSubCategoria(item)}
                    className={style.deletarBtn}
                    id={item.ID}
                  >X</td>
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